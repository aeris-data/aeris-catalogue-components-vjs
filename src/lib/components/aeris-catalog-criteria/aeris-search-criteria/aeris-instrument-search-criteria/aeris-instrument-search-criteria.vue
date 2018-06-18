<i18n>
{
  "en": {
    "instruments": "Instruments"
  },
  "fr": {
    "instruments": "Instruments"
  }
}
</i18n>

<template>
<div data-aeris-instrument-search-criteria>
  <aeris-catalog-search-box id="box" :title="$t('instruments')" header-icon-class="fa fa-rocket" :deployed="deployed">
    <aeris-instrument-search-criteria-content></aeris-instrument-search-criteria-content>
  </aeris-catalog-search-box>
</div>
</template>

<script>
export default {

  name: 'aeris-instrument-search-criteria',

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
