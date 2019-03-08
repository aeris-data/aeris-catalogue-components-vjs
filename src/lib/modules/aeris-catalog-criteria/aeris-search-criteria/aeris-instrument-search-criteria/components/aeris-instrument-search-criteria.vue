<i18n>
{
  "en": {
    "instruments": "Instruments"
  },
  "fr": {
    "instruments": "Instruments"
  }
}
</i18n>

<template>
  <div aeris-instrument-search-criteria>
    <aeris-catalog-search-box
      :title="$t('instruments')"
      :deployed="deployed"
      :theme="theme"
      header-icon-class="fa fa-calculator"
    >
      <aeris-thesaurus-item-tree-checkbox-layout
        :theme="theme"
        :service="service"
        :language="language"
        type="instruments"
      ></aeris-thesaurus-item-tree-checkbox-layout>
    </aeris-catalog-search-box>
  </div>
</template>

<script>
import AerisCatalogSearchBox from "../../../../aeris-catalog-layouts/aeris-search-criteria-layout/components/aeris-catalog-search-box";
import AerisThesaurusItemTreeCheckboxLayout from "../../../../aeris-catalog-layouts/aeris-search-criteria-layout/components/aeris-thesaurus-item-tree-checkbox-layout";

export default {
  name: "aeris-instrument-search-criteria",

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
      default: "https://sedoo.aeris-data.fr/catalogue/rest/metadatarecette/instruments/"
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
