<i18n>
{
  "en": {
    "search": "Search"
  },
  "fr": {
    "search": "Chercher"
  }
}
</i18n>

<template>
<aeris-catalog-ui-icon-button icon="fa-search" theme="primary" :title="$t('search')" @click="handleSearch"></aeris-catalog-ui-icon-button>
</template>

<script>
import store from '../../store/index.js'

export default {

  name: 'aeris-catalogue-search-button',

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
    console.log("aeris-catalogue-search-button creation")
    this.$i18n.locale = this.lang

  },

  data() {
    return {
      progress: false
    }
  },

  methods: {
    handleSearch: function() {

      store.commit('startSearch');
    }
  }
}
</script>
