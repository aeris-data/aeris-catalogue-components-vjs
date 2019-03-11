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
  <aeris-ui-icon-button
    :title="$t('search')"
    :theme="theme"
    icon="fa-search"
    type="icon-button"
    @click="handleSearch"
  ></aeris-ui-icon-button>
</template>

<script>
import { AerisUiIconButton } from "aeris-commons-components-vjs";

export default {
  name: "aeris-catalogue-search-button",

  components: { AerisUiIconButton },

  props: {
    language: {
      type: String,
      default: "en"
    },
    theme: {
      type: Object,
      default: null
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

  data() {
    return {
      progress: false
    };
  },

  methods: {
    handleSearch() {
      this.$emit("catalogueSearchStart", this.range);
    }
  }
};
</script>
