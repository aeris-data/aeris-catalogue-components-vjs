<template>
  <div data-aeris-keyword-search-criteria>
    <aeris-keyword-search-criteria-content
      ref="keywordSearchCriteria"
      :language="language"
      @startSearch="startSearch"
    ></aeris-keyword-search-criteria-content>
  </div>
</template>

<script>
import AerisCatalogSearchBox from "../../../../../../lib/modules/aeris-catalog-layouts/aeris-search-criteria-layout/components/aeris-catalog-search-box";
import AerisKeywordSearchCriteriaContent from "./aeris-keyword-search-criteria-content";
export default {
  name: "aeris-keyword-search-criteria",

  components: { AerisCatalogSearchBox, AerisKeywordSearchCriteriaContent },

  props: {
    language: {
      type: String,
      default: "en"
    },
    deployed: {
      type: Boolean,
      default: true
    },
    isShowOperators: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    resetEmptyValue() {
      this.$refs.keywordSearchCriteria.resetEmptyValue();
    },
    startSearch() {
      this.$emit("startSearch");
    }
  }
};
</script>

<style>
[data-aeris-keyword-search-criteria] {
  margin: 10px 20px;
}
</style>
