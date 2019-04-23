<i18n>
{
	  "en": {
		  "L0": "Level 0",
		  "L0A": "Level 0A",
		  "L1": "Level 1",
		  "L10": "Level 10",
		  "L15": "Level 15",
		  "L1A": "Level 1A",
		  "L1B": "Level 1B",
		  "L2": "Level 2",
		  "L20": "Level 20",
		  "L2A": "Level 2A",
		  "L2B": "Level 2B",
		  "L3": "Level 3",
		  "L4": "Level 4",
		  "UNKNOWN": "Unknown",
      "levels" : "Levels"
	  },
	  "fr": {
		  "L0": "Niveau 0",
		  "L1": "Niveau 1",
		  "L1A": "Niveau 1A",
		  "L1B": "Niveau 1B",
		  "L2": "Niveau 2",
		  "L2A": "Niveau 2A",
		  "L2B": "Niveau 2B",
		  "L3": "Niveau 3",
		  "L4": "Niveau 4",
		  "UNKNOWN": "Inconnu",
      "levels" : "Niveaux"
	  }
}

</i18n>

<template>
  <div aeris-levels-search-criteria>
    <aeris-catalog-search-box
      :title="$t('levels')"
      :deployed="deployed"
      :theme="theme"
      header-icon-class="fa fa-calculator"
    >
      <aeris-thesaurus-item-tree-checkbox-layout
        ref="levelsSearchCriteria"
        :theme="theme"
        :service="service"
        :language="language"
        type="levels"
      ></aeris-thesaurus-item-tree-checkbox-layout>
    </aeris-catalog-search-box>
  </div>
</template>

<script>
import AerisCatalogSearchBox from "../../../../aeris-catalog-layouts/aeris-search-criteria-layout/components/aeris-catalog-search-box";
import AerisThesaurusItemTreeCheckboxLayout from "../../../../aeris-catalog-layouts/aeris-search-criteria-layout/components/aeris-thesaurus-item-tree-checkbox-layout";

export default {
  name: "aeris-level-search-criteria",

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
  },

  methods: {
    resetSelection() {
      this.$refs.levelsSearchCriteria.resetChecked();
    }
  }
};
</script>
