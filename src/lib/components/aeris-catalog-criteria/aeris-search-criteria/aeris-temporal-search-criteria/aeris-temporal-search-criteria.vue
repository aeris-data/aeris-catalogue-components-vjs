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
  <aeris-catalog-search-box id="box" :title="$t('temporal-extents')" header-icon-class="fa fa-calendar" :deployed="deployed">
    <aeris-temporal-search-criteria-content></aeris-temporal-search-criteria-content>
  </aeris-catalog-search-box>
</div>
</template>

<script>
export default {

  name: 'aeris-temporal-search-criteria',

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
