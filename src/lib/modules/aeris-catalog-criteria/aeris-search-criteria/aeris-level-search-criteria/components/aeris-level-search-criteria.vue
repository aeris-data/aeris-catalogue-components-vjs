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
      "L0A" : "Niveau 0A",
		  "L1": "Niveau 1",
      "L10": "Niveau 10",
		  "L15": "Niveau 15",
		  "L1A": "Niveau 1A",
		  "L1B": "Niveau 1B",
		  "L2": "Niveau 2",
      "L20" : "Niveau 20",
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
      header-icon-class="fa fas fa-cogs"
    >
      <aeris-tree-checkbox-layout
        ref="levelCriteria"
        :elements="items"
        type="sublevels"
        name="levels"
        name-subitems="sublevels"
        search-first-level="true"
      ></aeris-tree-checkbox-layout>
    </aeris-catalog-search-box>
  </div>
</template>

<script>
import AerisCatalogSearchBox from "../../../../aeris-catalog-layouts/aeris-search-criteria-layout/components/aeris-catalog-search-box";
import AerisTreeCheckboxLayout from "../../../../aeris-catalog-layouts/aeris-search-criteria-layout/components/aeris-tree-checkbox-layout";

export default {
  name: "aeris-level-search-criteria",

  components: { AerisCatalogSearchBox, AerisTreeCheckboxLayout },

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
      default: "https://sedoo.aeris-data.fr/catalogue/rest/metadatarecette/levels/?program=ACTRIS"
    }
  },
  data() {
    return {
      items: null
    };
  },
  watch: {
    language(value) {
      this.$i18n.locale = value;
    }
  },

  created() {
    this.load();
    this.$i18n.locale = this.language;
    console.log("parent = ", this);
  },

  methods: {
    resetLevels() {
      this.$store.commit("resetSelectedCheckBoxCriteria");
      this.$refs.levelCriteria.resetChecked();
    },
    load() {
      this.axios
        .get(this.service, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        })
        .then(response => {
          this.items = response.data;

          this.items = this.items.map(item => {
            return {
              checked: false,
              deployed: false,
              name: item.name,
              storeValue: item.name,
              label: this.$i18n.te(item.name) ? this.$i18n.t(item.name) : item.name,
              subitems: item.sublevels.map(subitem => {
                return {
                  checked: false,
                  name: subitem.name,
                  label: this.$i18n.te(subitem.name) ? this.$i18n.t(subitem.name) : subitem.name
                };
              })
            };
          });
        });
    }
  }
};
</script>
