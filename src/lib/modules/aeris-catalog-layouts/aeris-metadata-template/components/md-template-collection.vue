<template>
  <div data-template="metadata-panel">
    <aeris-metadata-description
      :markdown="true"
      :language="language"
      :show-title="false"
      :theme="theme"
      :resource-abstract="metadata.resourceAbstract"
    ></aeris-metadata-description>
    <aeris-metadata-contacts
      :language="language"
      :contacts="metadata.contacts"
      :theme="theme"
    ></aeris-metadata-contacts>
    <aeris-metadata-spatial-extents
      :language="language"
      :spatial-extents="metadata.spatialExtents"
      :theme="theme"
    ></aeris-metadata-spatial-extents>
    <aeris-metadata-temporal-extents
      :language="language"
      :temporal-extents="metadata.temporalExtents"
      :theme="theme"
    ></aeris-metadata-temporal-extents>
    <aeris-metadata-year-select-download
      v-show="getDownloadType === 'yearfilter'"
      :theme="theme"
      :language="language"
      :metadata="metadata"
      :years="getYearlyFilters(metadata.identifier)"
      @addItemCart="addItemCart"
      @removeItemCart="removeItemCart"
    ></aeris-metadata-year-select-download>
    <aeris-metadata-single-file-download
      v-show="getDownloadType === 'nofilter'"
      :metadata="metadata"
      :is-in-cart="isInCart(metadata.identifier)"
      :theme="theme"
      :language="language"
      @addItemCart="addItemCart"
    >
    </aeris-metadata-single-file-download>
    <aeris-metadata-information-links
      :language="language"
      :links="metadata.links"
      :theme="theme"
    ></aeris-metadata-information-links>
    <aeris-metadata-information :language="language" :items="metadata" :theme="theme"></aeris-metadata-information>
    <aeris-metadata-datapolicy
      :language="language"
      :distribution-information="metadata.distributionInformation"
      :theme="theme"
    ></aeris-metadata-datapolicy>
    <aeris-metadata-data-links :language="language" :links="metadata.links" :theme="theme"></aeris-metadata-data-links>
    <aeris-metadata-citations
      :language="language"
      :identifiers="metadata.identifiers"
      :theme="theme"
    ></aeris-metadata-citations>
    <aeris-metadata-platforms
      :language="language"
      :platforms="metadata.platforms"
      :theme="theme"
    ></aeris-metadata-platforms>
    <aeris-metadata-instruments
      :language="language"
      :instruments="metadata.instruments"
      :theme="theme"
    ></aeris-metadata-instruments>
    <aeris-metadata-formats :language="language" :formats="metadata.formats" :theme="theme"></aeris-metadata-formats>
    <aeris-metadata-parameters
      :language="language"
      :parameters="metadata.parameters"
      :theme="theme"
    ></aeris-metadata-parameters>
    <aeris-metadata-publications
      :language="language"
      :publications="metadata.publications"
      :theme="theme"
    ></aeris-metadata-publications>
    <aeris-metadata-quicklook-gallery
      :language="language"
      :theme="theme"
      :quicklooks="metadata.quicklooks"
    ></aeris-metadata-quicklook-gallery>
  </div>
</template>

<script>
import moment from "moment";

import {
  AerisMetadataCitations,
  AerisMetadataContacts,
  AerisMetadataDataLinks,
  AerisMetadataDatapolicy,
  AerisMetadataDescription,
  AerisMetadataFormats,
  AerisMetadataInformation,
  AerisMetadataInformationLinks,
  AerisMetadataInstruments,
  AerisMetadataModifications,
  AerisMetadataParameters,
  AerisMetadataPlatforms,
  AerisMetadataPublications,
  AerisMetadataQuicklookGallery,
  AerisMetadataSpatialExtents,
  AerisMetadataTemporalExtents,
  AerisMetadataSingleFileDownload,
  AerisMetadataYearSelectDownload,
  AerisMetadataServices
} from "aeris-metadata-components-vjs";

import { AerisNotifier, AerisTheme, Aerislanguage } from "aeris-commons-components-vjs";

export default {
  name: "md-template-collection",
  components: {
    AerisMetadataCitations,
    AerisMetadataContacts,
    AerisMetadataDataLinks,
    AerisMetadataDatapolicy,
    AerisMetadataDescription,
    AerisMetadataFormats,
    AerisMetadataInformation,
    AerisMetadataInformationLinks,
    AerisMetadataInstruments,
    AerisMetadataModifications,
    AerisMetadataParameters,
    AerisMetadataPlatforms,
    AerisMetadataPublications,
    AerisMetadataQuicklookGallery,
    AerisMetadataSpatialExtents,
    AerisMetadataSingleFileDownload,
    AerisMetadataYearSelectDownload,
    AerisMetadataTemporalExtents,
    AerisMetadataServices,
    AerisNotifier,
    AerisTheme,
    Aerislanguage
  },
  props: {
    language: {
      type: String,
      default: "en"
    },
    metadata: {
      type: Object,
      default: () => {
        return {};
      }
    },
    theme: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      downloadType: "",
      years: []
    };
  },

  computed: {
    isInCart() {
      return idenfitier => {
        return this.getItemIdsInCart.includes(idenfitier);
      };
    },
    getYearlyFilters() {
      return identifier => {
        let currentYears = [...this.years];
        this.$store.getters.getCartContent.forEach(itemCart => {
          if (itemCart.identifier === identifier) {
            let yearsInCart = itemCart.items.elements;
            currentYears.forEach(year => {
              if (yearsInCart.indexOf(year.year) > -1) {
                year.selected = true;
              }
            });
          }
        });
        return currentYears;
      };
    },
    getItemIdsInCart() {
      return this.$store.getters.getItemIdsInCart;
    },
    getDownloadType() {
      return this.downloadType;
    }
  },

  watch: {
    metadata: {
      handler(newMetadata, oldMetadata) {
        if (newMetadata !== oldMetadata) {
          this.getDownloadFilter();
        }
      },
      deep: true
    }
  },

  methods: {
    addItemCart(metadataDownload) {
      this.$store.dispatch("addCollectionToCart", metadataDownload);
    },
    removeItemCart(metadataDownload) {
      this.$store.commit("removeItemFromCartContent", metadataDownload);
    },
    getDownloadFilter() {
      this.downloadType = "";
      let links = this.metadata ? this.metadata.links : "";
      if (links) {
        let link = links.filter(link => link.type == "OPENSEARCH_LINK");
        let url = null;
        if (link !== null && link.length > 0) {
          url = link[0].url.endsWith("/") ? link[0].url.substring(0, link[0].url.length - 1) : link[0].url;
          url = url + "/request?collection=" + this.metadata.identifier;
          this.$http.get(url).then(response => {
            let entries = response.data.entries;
            this.downloadType = entries.length > 1 ? "yearfilter" : "nofilter";
            if (this.downloadType === "yearfilter") {
              let years = [];
              for (let i = 0; i < entries.length; i++) {
                let date = moment(entries[i].date);
                let item = {};
                item.year = date.year();
                item.selected = false;
                item.totalSize = entries[i].totalSize;
                item.fileNumber = entries[i].fileNumber;
                years.push(item);
              }
              this.years = years;
            }
          });
        }
      }
    }
  }
};
</script>
