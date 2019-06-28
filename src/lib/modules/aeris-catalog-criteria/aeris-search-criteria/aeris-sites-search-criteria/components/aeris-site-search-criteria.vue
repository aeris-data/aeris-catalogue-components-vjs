<i18n>
{
  "en": {
    "sites": "Sites",
    "allsites" : "All sites"
  },
  "fr": {
    "sites": "Sites",
    "allsites" : "Tous les sites"
  }
}
</i18n>

<template>
  <div>
    <aeris-catalog-search-box
      :title="$t('sites')"
      :deployed="deployed"
      :theme="theme"
      header-icon-class="fa fas fa-map-marker-alt"
    >
      <aeris-tree-checkbox-layout
        ref="sites"
        :elements="items"
        :theme="theme"
        type="sites"
      ></aeris-tree-checkbox-layout>
    </aeris-catalog-search-box>
  </div>
</template>

<script>
import AerisCatalogSearchBox from "../../../../aeris-catalog-layouts/aeris-search-criteria-layout/components/aeris-catalog-search-box";
import AerisTreeCheckboxLayout from "../../../../aeris-catalog-layouts/aeris-search-criteria-layout/components/aeris-tree-checkbox-layout";

export default {
  name: "aeris-site-search-criteria",

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
      default: "http://localhost:9080/catalogue/rest/metadatarecette/sites?program=GMOS"
    }
  },
  data() {
    return {
      selected: [],
      selectedAll: null,
      values: null,
      items: null
    };
  },
  watch: {
    language(value) {
      this.$i18n.locale = value;
    },
    selected(value) {
      this.$store.commit("setSelectedCheckBoxCriteria", value);
    },
    selectedAll(value) {
      if (value) {
        this.values.forEach((element, index) => {
          this.selected[index] = element.name;
        });
      } else {
        this.selected = [];
      }
      this.$store.commit("setSelectedCheckBoxCriteria", this.selected);
    }
  },
  computed: {
    sites() {
      return this.$store.getters.getSites;
    }
  },
  created() {
    this.$i18n.locale = this.language;
    this.loadSites();
  },

  methods: {
    sitesReset() {
      this.$store.commit("resetSelectedCheckBoxCriteria");
      this.$refs.sites.resetChecked();
    },

    loadSites() {
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
              subitems: []
            };
          });
        });
    }
  }
};
</script>
<style scoped>
input {
  margin-right: 15px;
  margin-bottom: 10px;
}

label {
  overflow-wrap: break-word;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
}

.siteItems {
  margin-left: 20px;
}

label,
.far {
  color: grey;
}
</style>
