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
    <aeris-metadata-single-file-download
      v-if="metadata && downloadType === 'nofilter'"
      :metadata="metadata"
      :is-in-cart="isInCart(metadata.identifier)"
      :file-number="fileNumber"
      :total-size="totalSize"
      :theme="theme"
      :language="language"
      @addItemCart="addItemCart"
    >
    </aeris-metadata-single-file-download>
    <aeris-metadata-year-select-download
      v-else-if="metadata && downloadType === 'yearfilter'"
      :theme="theme"
      :language="language"
      :metadata="metadata"
      :is-in-cart="isInCart(metadata.identifier)"
      :years="years"
      @addItemCart="addItemCart"
      @removeItemCart="removeItemCart"
    ></aeris-metadata-year-select-download>
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
      years: [],
      files: [],
      fileNumber: 0,
      fileSize: 0
    };
  },

  computed: {
    isInCart() {
      return identifier => {
        return this.getItemIdsInCart.includes(identifier);
      };
    },
    getItemIdsInCart() {
      return this.$store.getters.getItemIdsInCart;
    }
  },

  watch: {
    metadata: {
      handler(newMetadata, oldMetadata) {
        if (newMetadata !== oldMetadata) {
          this.setDownloadFilter();
        }
      },
      deep: true
    }
  },

  created() {
    this.setDownloadFilter();
  },

  methods: {
    addItemCart(item) {
      this.$store.dispatch("addCollectionToCart", item);
    },
    removeItemCart(item) {
      this.$store.commit("removeItemFromCartContent", item);
    },
    setDownloadFilter() {
      if (this.metadata.links && this.metadata.links.length > 0) {
        const service = this.metadata.links.find(m => m.type === "OPENSEARCH_LINK").url;
        if (service) {
          this.axios
            .get(`${service.replace(/\/$/, "")}/request?collection=${this.metadata.identifier}`)
            .then(response => {
              if (response.data.entries.length > 0) {
                this.downloadType = response.data.entries[0].type || "nofilter";
                if (this.downloadType === "yearfilter") {
                  this.years = response.data.entries.map(entry => ({
                    year: moment(entry.date).year(),
                    totalSize: entry.totalSize,
                    fileNumber: entry.fileNumber
                  }));
                } else {
                  this.fileNumber = response.data.entries[0].fileNumber;
                  this.totalSize = response.data.entries[0].totalSize;
                }
              }
            });
        }
      }
    }
  }
};
</script>
