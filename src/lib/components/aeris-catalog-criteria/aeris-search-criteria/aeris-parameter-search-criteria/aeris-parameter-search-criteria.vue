<i18n>
{
  "en": {
    "parameters": "Parameters"
  },
  "fr": {
    "parameters": "Paramètres"
  }
}
</i18n>

<template>
<div data-aeris-parameter-search-criteria>
  <aeris-catalog-search-box id="box" :title="$t('parameters')" header-icon-class="fa fa-thermometer-half" :deployed="deployed">
    <aeris-parameter-search-criteria-content></aeris-parameter-search-criteria-content>
  </aeris-catalog-search-box>
</div>
</template>

<script>
export default {

  name: 'aeris-parameter-search-criteria',

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
