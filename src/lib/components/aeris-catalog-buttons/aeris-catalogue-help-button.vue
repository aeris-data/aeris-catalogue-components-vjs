<i18n>
{
  "en": {
    "help": "Help"
  },
  "fr": {
    "help": "Aide"
  }
}
</i18n>

<template>
<aeris-catalog-ui-icon-button icon="fa-question" theme="primary" :title="$t('help')" @click="handleHelp"></aeris-catalog-ui-icon-button>
</template>

<script>
import store from '../../store/index.js'

export default {

  name: 'aeris-catalogue-help-button',

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
    console.log("aeris-catalogue-help-button creation")
    this.$i18n.locale = this.lang
  },

  methods: {

    handleHelp: function() {
      store.commit('openHelp');
    }
  }
}
</script>
