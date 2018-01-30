<i18n>
{
  "en": {
    "reset": "Reset"
  },
  "fr": {
    "reset": "Réinitialiser"
  }
}
</i18n>

<template>
<aeris-catalog-ui-icon-button icon="fa-eraser" :title="$t('reset')" @click="handleReset"></aeris-catalog-ui-icon-button>
</template>

<script>
export default {

  name: 'aeris-catalogue-reset-button',

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
