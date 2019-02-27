<i18n>
{
  "en": {
    "parameters": "Parameters"
  },
  "fr": {
    "parameters": "Paramètres"
  }
}
</i18n>

<template>
  <div aeris-parameter-search-criteria>
    <aeris-catalog-search-box
      :title="$t('parameters')"
      :deployed="deployed"
      :theme="theme"
      header-icon-class="fa fa-thermometer-half"
    >
      <aeris-thesaurus-item-tree-checkbox-layout
        :theme="theme"
        :service="service"
        :language="language"
        type="parameters"
      ></aeris-thesaurus-item-tree-checkbox-layout>
    </aeris-catalog-search-box>
  </div>
</template>

<script>
import { AerisCatalogSearchBox, AerisThesaurusItemTreeCheckboxLayout } from "../../../../aeris-catalogue-components";

export default {
  name: "aeris-parameter-search-criteria",

  components: { AerisThesaurusItemTreeCheckboxLayout, AerisCatalogSearchBox },

  props: {
    language: {
      type: String,
      default: "en"
    },
    deployed: {
      type: Boolean,
      default: false
    },
    theme: {
      type: Object,
      default: () => {}
    },
    service: {
      type: String,
      default: "https://sedoo.aeris-data.fr/catalogue/rest/metadatarecette/parameters/"
    }
  },

  watch: {
    language(value) {
      this.$i18n.locale = value;
    }
  },

  created() {
    this.$i18n.locale = this.language;
  }
};
</script>

<style></style>
