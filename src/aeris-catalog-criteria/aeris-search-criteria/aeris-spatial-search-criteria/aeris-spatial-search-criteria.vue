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
  <aeris-catalog-search-box id="box" :title="$t('spatial-extents')" header-icon-class="fa fa-globe" :deployed="deployed">
    <aeris-spatial-search-criteria-content></aeris-spatial-search-criteria-content>
  </aeris-catalog-search-box>
</div>
</template>

<script>
export default {
  props: {
    lang: {
      type: String,
      default: 'en'
    },
    deployed: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value
    }
  },

  destroyed: function() {},

  created: function() {
    this.$i18n.locale = this.lang
  },

  mounted: function() {},

  computed: {

  },

  data() {
    return {}
  },

  updated: function() {},

  methods: {

  }
}
</script>

<style>

 </style>
