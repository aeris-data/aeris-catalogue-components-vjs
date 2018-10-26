<i18n>
{
  "en": {
    "reset": "Reset",
    "reset_tooltip": "Reset selection"
  },
  "fr": {
    "reset": "Effacer",
    "reset_tooltip": "Effacer la sélection"
  }
}
</i18n>

<template>
<aeris-catalog-ui-button icon="fa-trash" theme="primary" :title="$t('reset_tooltip')" :text="$t('reset')" @click="handleReset"></aeris-catalog-ui-button>
</template>

<script>
export default {

  name: 'aeris-catalogue-reset-text-button',

  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value
    }
  },

  created: function() {
    console.log("aeris-catalogue-reset-button creation")
    this.$i18n.locale = this.lang
  },

  data() {
    return {
      progress: false
    }
  },

  methods: {
    handleReset: function() {
      document.dispatchEvent(new CustomEvent("aerisCatalogueResetEvent"));
    }
  }
}
</script>
