<i18n>
{
  "en": {
    "levels": "Levels"
  },
  "fr": {
	"levels": "Niveaux"
  }
}
</i18n>

<template>
<div data-aeris-level-search-criteria>
  <aeris-catalog-search-box id="box" :title="$t('levels')" header-icon-class="fa fa-cogs" :deployed="deployed">
    <aeris-level-search-criteria-content></aeris-level-search-criteria-content>
  </aeris-catalog-search-box>
</div>
</template>

<script>
export default {

  name: 'aeris-level-search-criteria',

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
