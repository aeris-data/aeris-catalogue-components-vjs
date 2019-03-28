<template>
  <div data-aeris-keyword-search-criteria>
    <aeris-keyword-search-criteria-content :language="language"></aeris-keyword-search-criteria-content>
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
  }
};
</script>
