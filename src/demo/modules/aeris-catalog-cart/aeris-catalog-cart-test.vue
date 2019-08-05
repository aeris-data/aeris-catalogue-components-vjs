<template>
  <div>
    <aeris-catalog-cart cart-service="https://sedoo.aeris-data.fr/catalogue/rest/shoppingcart"></aeris-catalog-cart>
    <aeris-metadata-single-file-download
      :metadata-title="metadata2.resourceTitle"
      :is-in-cart="isInCart(metadata2.identifier)"
      :file-number="fileNumber"
      :total-size="totalSize"
      :theme="theme"
      :metadata-identifier="metadata2.identifier"
      :url="metadata2.links[0].url"
      @addItemCart="addItemCart"
    >
    </aeris-metadata-single-file-download>
    <aeris-metadata-year-select-download
      v-if="years"
      :theme="theme"
      :metadata-title="metadata1.resourceTitle"
      :years="years"
      :years-in-cart="yearsInCart(metadata1.identifier)"
      :metadata-identifier="metadata1.identifier"
      :url="metadata1.links[0].url"
      @addItemCart="addItemCart"
      @removeItemCart="removeItemCart"
    ></aeris-metadata-year-select-download>
    <aeris-notifier></aeris-notifier>
  </div>
</template>

<script>
import moment from "moment";
import { AerisCatalogCart } from "../../../lib/modules/aeris-catalogue-components";
import { AerisNotifier } from "aeris-commons-components-vjs";
import { AerisMetadataSingleFileDownload, AerisMetadataYearSelectDownload } from "aeris-metadata-components-vjs";

export default {
  name: "aeris-catalog-cart-test",
  components: {
    AerisCatalogCart,
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
      metadata1: {
        resourceTitle: {
          en: "Continuous measurements of atmospheric mercury at Amsterdam Island",
          fr: "Continuous measurements of atmospheric mercury at Amsterdam Island"
        },
        identifier: "bcb74d91-d6ea-4f83-a897-f98f8edc044c",
        links: [
          {
            type: "OPENSEARCH_LINK",
            url: "https://services.sedoo.fr/gmos-datacenter-rest/rest/data",
            name: "Open search link",
            description: null
          }
        ]
      },
      metadata2: {
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
      years: [],
      fileNumber: 0,
      totalSize: 0,
      theme: {
        primaryColor: "#0b6bb3",
        secondaryColor: "#fff"
      },
      resourceTitle: {
        en: "Continuous measurements of atmospheric mercury at Amsterdam Island",
        fr: "Continuous measurements of atmospheric mercury at Amsterdam Island"
      }
    };
  },
  computed: {
    getItemIdsInCart() {
      let itemIds = [];
      this.$store.getters.getCartContent.forEach(itemCart => {
        itemIds.push(itemCart.metadataIdentifier);
      });
      return itemIds;
    },
    getCartContent() {
      return this.$store.getters.getCartContent;
    },
    yearsInCart() {
      return identifier => {
        return this.getItemIdsInCart.includes(identifier)
          ? this.getCartContent.find(i => i.metadataIdentifier === identifier).years
          : [];
      };
    },
    isInCart() {
      return identifier => {
        return this.getItemIdsInCart.includes(identifier);
      };
    }
  },
  created() {
    this.setYearsDownloadInput(this.metadata1);
    this.setSingleDownloadInput(this.metadata2);
  },
  methods: {
    setYearsDownloadInput(metadata) {
      this.axios.get(`${metadata.links[0].url}/request?collection=${metadata.identifier}`).then(response => {
        this.years = response.data.entries.map(entry => ({
          year: moment(entry.date).year(),
          totalSize: entry.totalSize,
          fileNumber: entry.fileNumber
        }));
      });
    },
    setSingleDownloadInput(metadata) {
      this.axios
        .get(`${metadata.links[0].url}/request?collection=${metadata.identifier}`)
        .then(response => {
          this.fileNumber = response.data.entries[0].fileNumber;
          this.totalSize = response.data.entries[0].totalSize;
        })
        .catch(() => {
          dispatch("deleteNotification", identifier);
        });
    },

    addItemCart(metadataDownload) {
      this.$store.dispatch("addCollectionToCart", metadataDownload);
    },
    removeItemCart(identifier) {
      this.$store.commit("removeItemFromCartContent", identifier);
    }
  }
};
</script>
