<i18n>
{
	  "en": {
		  "collections": "Collections"
	  },
	  "fr": {
		  "collections": "Collections"
	  }
}
</i18n>

<template>
  <div data-aeris-collection-search-criteria-content>
    <aeris-catalog-search-box
      :title="$t('collections')"
      :deployed="deployed"
      :theme="theme"
      header-icon-class="fa fas fa-cubes"
    >
      <aeris-tree-checkbox-layout ref="collectionCriteria" :elements="items" type="collections">
      </aeris-tree-checkbox-layout>
    </aeris-catalog-search-box>
  </div>
</template>

<script>
import AerisCatalogSearchBox from "../../../../aeris-catalog-layouts/aeris-search-criteria-layout/components/aeris-catalog-search-box";
import AerisTreeCheckboxLayout from "../../../../aeris-catalog-layouts/aeris-search-criteria-layout/components/aeris-tree-checkbox-layout";

export default {
  name: "aeris-collection-search-criteria",

  components: { AerisCatalogSearchBox, AerisTreeCheckboxLayout },

  props: {
    language: {
      type: String,
      default: "en"
    },
    program: {
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
      default: "https://sedoo.aeris-data.fr/catalogue/rest/metadatarecette/collections/?program=ACTRIS-FR"
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
  },

  methods: {
    resetCollection() {
      this.$store.commit("resetSelectedCheckBoxCriteria");
      this.$refs.collectionCriteria.resetChecked();
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
          let it = response.data;
          it = it[0].collections;
          this.items = it.map(item => {
            return {
              checked: false,
              deployed: false,
              name: item.name,
              storeValue: { name: item.name, program: this.program },
              label: this.$i18n.te(item.name) ? this.$i18n.t(item.name) : item.name,
              subitems: []
            };
          });
        });
    }
  }
};
</script>
