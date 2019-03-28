<template>
  <div data-aeris-keyword-search-criteria>
      <aeris-keyword-search-criteria-content></aeris-keyword-search-criteria-content>
  </div>
</template>

<script>
import AerisCatalogSearchBox from "../../../../../../lib/modules/aeris-catalog-layouts/aeris-search-criteria-layout/components/aeris-catalog-search-box"
import AerisKeywordSearchCriteriaContent from "./aeris-keyword-search-criteria-content"
export default {
  name: "aeris-keyword-search-criteria",
  components:{AerisCatalogSearchBox,AerisKeywordSearchCriteriaContent},
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

  watch: {
    language(value) {
      this.$i18n.locale = value;
    }
  },

  created() {
   this.$i18n.locale = this.language;
  },

};
</script>


