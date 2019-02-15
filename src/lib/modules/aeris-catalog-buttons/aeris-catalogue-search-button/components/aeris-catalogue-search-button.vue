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
    icon="fa-search"
    :theme="theme"
    type="icon-button"
    @click="handleSearch"
  ></aeris-ui-icon-button>
</template>
<script>
import {AerisUiIconButton} from "aeris-commons-components-vjs"

export default {

  name: "aeris-catalogue-search-button",
  
  components :{AerisUiIconButton},
  
  props: {
    language: {
      type: String,
      default: "en"
    },
    theme: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
    };
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
      this.$emit("CatalogueSearchStart", 0,24);
    
    }
  }
};
</script>
