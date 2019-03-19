<template>
  <div>
    <aeris-catalog-cart cart-service="https://sedoo.aeris-data.fr/catalogue/rest/shoppingcart"></aeris-catalog-cart>
    <aeris-catalog-summaries
      :theme="theme"
      :item-ids-in-cart="getItemIdsInCart"
      @showMore="showMore"
      @addItemCart="addItemCart"
      @removeItemCart="removeItemCart"
    ></aeris-catalog-summaries>
    <aeris-metadata-single-file-download
      :metadata="singleFileDownloadMetadata"
      :is-in-cart="isInCart(singleFileDownloadMetadata.identifier)"
      :theme="theme"
      @addItemCart="addItemCart"
    >
    </aeris-metadata-single-file-download>
    <aeris-metadata-year-select-download
      :theme="theme"
      :metadata="yearSelectDownloadMetadata"
      :selected-item-cart="selectedItemCart(yearSelectDownloadMetadata.identifier)"
      @addItemCart="addItemCart"
      @removeItemCart="removeItemCart"
    ></aeris-metadata-year-select-download>
    <aeris-notifier></aeris-notifier>
  </div>
</template>

<script>
import { AerisCatalogCart, AerisCatalogSummaries } from "../../../lib/modules/aeris-catalogue-components";
import { AerisNotifier } from "aeris-commons-components-vjs";
import { AerisMetadataSingleFileDownload, AerisMetadataYearSelectDownload } from "aeris-metadata-components-vjs";
export default {
  name: "aeris-catalog-cart-test",
  components: {
    AerisCatalogCart,
    AerisCatalogSummaries,
    AerisNotifier,
    AerisMetadataSingleFileDownload,
    AerisMetadataYearSelectDownload
  },
  data() {
    return {
      criteria: {
        keywords: ["gmos 97bbabf2-1644-e71f-2f94-e4fe13c648ac"],
        searchOperator: "",
        temporal: { from: "", to: "" },
        userLanguage: "en"
      },
      yearSelectDownloadMetadata: {
        resourceTitle: {
          en: "Continuous measurements of atmospheric mercury at Amsterdam Island",
          fr: "Continuous measurements of atmospheric mercury at Amsterdam Island"
        },
        identifier: "bcb74d91-d6ea-4f83-a897-f98f8edc044c",
        links: [
          {
            type: "OPENSEARCH_LINK",
            url: "https://services.sedoo.fr/gmos-datacenter-rest/rest/data/",
            name: "Open search link",
            description: null
          }
        ],
        dataLevel: "L2"
      },
      singleFileDownloadMetadata: {
        resourceTitle: {
          en: "AERONET_CIMEL, SURF_FIXE",
          fr: "AERONET_CIMEL, SURF_FIXE"
        },
        identifier: "97bbabf2-1644-e71f-2f94-e4fe13c648ac",
        links: [
          {
            type: "OPENSEARCH_LINK",
            url: "https://services.sedoo.fr/oldcamp-rest/rest/data",
            name: "AERONET_CIMEL, SURF_FIXE, ESCOMPTE",
            description: null
          }
        ]
      },
      theme: {
        primaryColor: "#0b6bb3",
        secondaryColor: "#fff"
      },
      service: "https://sedoo.aeris-data.fr/catalogue/rest/metadatarecette/request"
    };
  },
  computed: {
    getSummariesFromStore() {
      return this.$store.getters.getSummaries;
    },
    getItemIdsInCart() {
      let itemIds = [];
      this.$store.getters.getCartContent.forEach(itemCart => {
        itemIds.push(itemCart.identifier);
      });
      return itemIds;
    },
    isInCart() {
      return idenfitier => {
        return this.getItemIdsInCart.includes(idenfitier);
      };
    },
    selectedItemCart() {
      return identifier => {
        let currentItem;
        if (!this.getItemIdsInCart.includes(identifier)) {
          currentItem = {
            identifier: identifier,
            items: {
              elements: []
            }
          };
        }
        return currentItem;
      };
    }
  },
  mounted() {
    this.getSummaries();
  },
  methods: {
    showMore() {
      this.getSummaries();
    },
    getSummaries() {
      let range = this.$store.getters.getRange;
      if (range) {
        let data = {
          url: `${this.service}?range=${range.min}-${range.max}`,
          criteria: this.criteria
        };
        this.$store.dispatch("getSummaries", data);
      }
    },
    addItemCart(metadataDownload) {
      this.$store.dispatch("addCollectionToCart", metadataDownload);
    },
    removeItemCart(metadataDownload) {
      this.$store.commit("removeItemFromCartContent", metadataDownload);
    }
  }
};
</script>
