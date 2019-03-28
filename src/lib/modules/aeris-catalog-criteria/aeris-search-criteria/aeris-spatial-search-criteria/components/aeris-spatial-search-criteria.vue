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
    <aeris-catalog-search-box
      :theme="theme"
      id="box"
      :title="$t('spatial-extents')"
      :deployed="deployed"
      header-icon-class="fa fa-globe"
    >
      <aeris-spatial-search-criteria-content lang="fr" :theme="theme"></aeris-spatial-search-criteria-content>
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
    },
    theme:{
      type:Object,
      default:()=>{}
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value;
    }
  },

  created() {
    this.$i18n.locale = this.lang;
  },

  data() {
    return {};
  },

};
</script>

<style></style>
