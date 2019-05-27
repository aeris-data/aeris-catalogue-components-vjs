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
      v-if="getDownloadType"
      :metadata="metadata"
      :is-in-cart="isInCart(metadata.identifier)"
      :theme="theme"
      @addItemCart="addItemCart"
    >
    </aeris-metadata-single-file-download>
    <aeris-metadata-year-select-download
      v-else-if="getDownloadType.downloadType === 'yearfilter'"
      :theme="theme"
      :metadata="metadata"
      :selected-item-cart="selectedItemCart(metadata.identifier)"
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
      default: () => {}
    },
    theme: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    getDownloadType() {
      let links = this.metadata ? this.metadata.links : "";
      if (links) {
        let link = links.filter(link => link.type == "OPENSEARCH_LINK");
        return link;
      } else {
        return "";
      }
    },
    isInCart() {
      return idenfitier => {
        return this.getItemIdsInCart.includes(idenfitier);
      };
    },
    selectedItemCart() {
      return identifier => {
        let currentItem;
        this.$store.getters.getCartContent.forEach(itemCart => {
          if (itemCart.idenfitier === identifier) {
            currentItem = itemCart;
          }
        });
        return currentItem;
      };
    },
    getItemIdsInCart() {
      return this.$store.getters.getItemIdsInCart;
    }
  },
  methods: {
    addItemCart(metadataDownload) {
      this.$store.dispatch("addCollectionToCart", metadataDownload);
    },
    removeItemCart(metadataDownload) {
      this.$store.commit("removeItemFromCartContent", metadataDownload);
    }
  }
};
</script>
