<i18n>
{
  "en": {
    "temporal-extents": "Temporal extents"
  },
  "fr": {
    "temporal-extents": "Intervalle temporel"
  }
}
</i18n>

<template>
  <div data-aeris-temporal-extents-search-criteria>
    <aeris-catalog-search-box
      id="box"
      :title="$t('temporal-extents')"
      :deployed="deployed"
      header-icon-class="fa fa-calendar"
    >
      <aeris-temporal-search-criteria-content></aeris-temporal-search-criteria-content>
    </aeris-catalog-search-box>
  </div>
</template>

<script>
import AerisCatalogSearchBox from "../../../../aeris-catalog-layouts/aeris-search-criteria-layout/components/aeris-catalog-search-box";
import AerisTemporalSearchCriteriaContent from "./aeris-temporal-search-criteria-content";
export default {
  name: "aeris-temporal-search-criteria",
  components: { AerisCatalogSearchBox, AerisTemporalSearchCriteriaContent },
  props: {
    lang: {
      type: String,
      default: "fr"
    },
    deployed: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value;
    }
  }
};
</script>

