<i18n>
{
  "en": {
    "draw": "Draw"
  },
  "fr": {
    "draw": "Tracer"
  }
}
</i18n>

<template>
<aeris-catalog-ui-icon-button icon="fa-pencil-square-o" theme="primary" @click="handleClick"></aeris-catalog-ui-icon-button>
</template>

<script>
export default {

  name: 'aeris-catalogue-edit-button',

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

  destroyed: function() {
    document.removeEventListener('aerisCatalogueStartEditEvent', this.aerisCatalogueStartEditListener);
    this.aerisCatalogueStartEditListener = null;
    document.removeEventListener('aerisCatalogueStopEditEvent', this.aerisCatalogueStopEditListener);
    this.aerisCatalogueStopEditListener = null;
  },

  created: function() {
    console.log("aeris-catalogue-edit-button creation")
    this.$i18n.locale = this.lang
    this.aerisCatalogueStopEditListener = this.handleStopEdit.bind(this)
    document.addEventListener('aerisCatalogueStopEditEvent', this.aerisCatalogueStopEditListener);
    this.aerisCatalogueStartEditListener = this.handleStartEdit.bind(this)
    document.addEventListener('aerisCatalogueStartEditEvent', this.aerisCatalogueStartEditListener);
  },

  computed: {

  },

  data() {
    return {
      progress: false,
      editing: false,
      aerisCatalogueStopEditListener: null,
      aerisCatalogueStartEditListener: null
    }
  },

  updated: function() {},

  methods: {

    handleStartEdit: function() {
      this.editing = true;
    },

    handleStopEdit: function() {
      this.editing = false;
    },


    handleClick: function() {
      if (!this.editing) {
        this.handleStartEdit()
        document.dispatchEvent(new CustomEvent("aerisCatalogueStartEditEvent"));

      } else {
        this.handleStopEdit()
        document.dispatchEvent(new CustomEvent("aerisCatalogueStopEditEvent"));
      }
    }
  }
}
</script>
