<i18n>
{
  "en": {
    "search": "Search",
    "search_tooltip": "Start a research"
  },
  "fr": {
    "search": "Rechercher",
    "search_tooltip": "Lancer la recherche"
  }
}
</i18n>

<template>
  <aeris-catalog-ui-button
    :title="$t('search_tooltip')"
    :text="$t('search')"
    icon="fa-search"
    theme="primary"
    @click="handleSearch"
  ></aeris-catalog-ui-button>
</template>

<script>
export default {
  name: "aeris-catalogue-search-text-button",

  props: {
    lang: {
      type: String,
      default: "en"
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value;
    }
  },

  created: function() {
    console.log("aeris-catalogue-search-button creation");
    this.$i18n.locale = this.lang;
  },

  data() {
    return {
      progress: false
    };
  },

  methods: {
    handleSearch: function() {
      var e = new CustomEvent("aerisCatalogueSearchStartEvent", {
        detail: {
          range: {
            min: 0,
            max: 24
          }
        }
      });
      document.dispatchEvent(e);
    }
  }
};
</script>
