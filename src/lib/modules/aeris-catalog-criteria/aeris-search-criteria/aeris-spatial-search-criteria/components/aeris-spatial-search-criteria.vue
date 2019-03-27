<i18n>
{
  "en": {
    "spatial-extents": "Spatial extents"
  },
  "fr": {
    "spatial-extents": "Zones géographiques"
  }
}
</i18n>

<template>
  <div data-aeris-spatial-extents-search-criteria>
    lol
    <aeris-catalog-search-box
      id="box"
      :box_title="$t('spatial-extents')"
      :deployed="deployed"
      header-icon-class="fa fa-globe"
    >
      <aeris-spatial-search-criteria-content></aeris-spatial-search-criteria-content>
    </aeris-catalog-search-box>
  </div>
</template>

<script>
import AerisSpatialSearchCriteriaContent from "./aeris-spatial-search-criteria-content"
import AerisCatalogSearchBox from "../../../../aeris-catalog-layouts/aeris-search-criteria-layout/components/aeris-catalog-search-box"
export default {
  name: "aeris-spatial-search-criteria",
  components:{
    AerisCatalogSearchBox,
    AerisSpatialSearchCriteriaContent
  },
  props: {
    lang: {
      type: String,
      default: "en"
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
  },

  destroyed: function() {},

  created: function() {
    this.$i18n.locale = this.lang;
  },

  mounted: function() {},

  computed: {},

  data() {
    return {};
  },

  updated: function() {},

  methods: {}
};
</script>

<style></style>
