<template>
  <aeris-catalog-summaries
    :theme="theme"
    :item-ids-in-cart="itemIdsInCart"
    @showMore="showMore"
    @addItemCart="addItemCart"
    @removeItemCart="removeItemCart"
  ></aeris-catalog-summaries>
</template>

<script>
import { AerisCatalogSummaries } from "../../../lib/modules/aeris-catalogue-components";
export default {
  name: "aeris-catalog-summaries-test",
  components: { AerisCatalogSummaries },
  data() {
    return {
      criteria: {
        keywords: ["eccad iagos gmos"],
        searchOperator: "",
        temporal: { from: "", to: "" },
        userLanguage: "en"
      },
      theme: {
        primaryColor: "#0b6bb3",
        secondaryColor: "#fff",
        contentPrimaryColor: "grey"
      },
      itemIdsInCart: [],
      service: "https://sedoo.aeris-data.fr/catalogue/rest/metadatarecette/request"
    };
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
    addItemCart(collectionId) {
      console.log("addItemCart: ", collectionId);
      this.itemIdsInCart.push(collectionId);
    },
    removeItemCart(collectionId) {
      console.log("removeItemCart: ", collectionId);
      this.itemIdsInCart.splice(this.itemIdsInCart.indexOf(collectionId), 1);
    }
  }
};
</script>

<style scoped></style>
