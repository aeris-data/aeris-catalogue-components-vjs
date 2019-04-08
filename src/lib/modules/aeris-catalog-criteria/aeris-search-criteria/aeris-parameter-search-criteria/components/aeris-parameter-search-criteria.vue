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
        ref="parameterSearchCriteria"
        :theme="theme"
        :service="service"
        :language="language"
        type="parameters"
      ></aeris-thesaurus-item-tree-checkbox-layout>
    </aeris-catalog-search-box>
  </div>
</template>

<script>
import AerisCatalogSearchBox from "../../../../aeris-catalog-layouts/aeris-search-criteria-layout/components/aeris-catalog-search-box";
import AerisThesaurusItemTreeCheckboxLayout from "../../../../aeris-catalog-layouts/aeris-search-criteria-layout/components/aeris-thesaurus-item-tree-checkbox-layout";

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
  },

  methods: {
    resetSelection() {
      this.$refs.parameterSearchCriteria.resetChecked();
    }
  }
};
</script>

<style></style>
