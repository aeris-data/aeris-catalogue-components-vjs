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
  <aeris-ui-icon-button
    :title="$t('search_tooltip')"
    :text="$t('search')"
    :theme="theme"
    icon="fa-search"
    @click="handleSearch"
  ></aeris-ui-icon-button>
</template>
<script>
import { AerisUiIconButton } from "aeris-commons-components-vjs";

export default {
  name: "aeris-catalogue-search-text-button",

  components: { AerisUiIconButton },

  props: {
    language: {
      type: String,
      default: "en"
    },
    theme: {
      type: Object,
      default: () => {
        return {};
      }
    },
    range: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },

  watch: {
    language(value) {
      this.$i18n.locale = value;
    }
  },

  created() {
    this.$i18n.locale = this.language;
  },

  methods: {
    handleSearch() {
      this.$emit("catalogueSearchStart", this.range);
    }
  }
};
</script>
