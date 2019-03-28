<i18n>
{
    "en": {
    "loading": "Loading..."
    },
    "fr": {
    "loading": "Chargement..."
    }
}
</i18n>

<template>
  <section aeris-thesaurus-item-tree-checkbox-layout>
    <div v-if="isLoading" class="loading-bar">
      <i class="fas fa-circle-notch fa-spin fa-fw" />
      <span>{{ $t("loading") }}</span>
    </div>
    <div>
      <aeris-thesaurus-item-checkbox-layout
        v-for="(thesaurusItem, index) in items"
        :key="index"
        :thesaurus-item="thesaurusItem"
        :theme="theme"
        :thesaurus-type="type"
        :ref="'thesaurusItemTreeCheckbox' + type"
      ></aeris-thesaurus-item-checkbox-layout>
    </div>
  </section>
</template>

<script>
import AerisThesaurusItemCheckboxLayout from "./aeris-thesaurus-item-checkbox-layout";
export default {
  name: "aeris-thesaurus-item-tree-checkbox-layout",

  components: { AerisThesaurusItemCheckboxLayout },

  props: {
    language: {
      type: String,
      default: "en"
    },
    theme: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: ""
    },
    service: {
      type: String,
      default: ""
    }
  },

  watch: {
    language(value) {
      this.$i18n.locale = value;
    }
  },

  created() {
    this.$i18n.locale = this.language;
    this.loadThesaurusItem();
  },

  computed: {
    isLoading() {
      return this.loading;
    }
  },

  data() {
    return {
      loading: false,
      items: []
    };
  },

  methods: {
    loadThesaurusItem() {
      if (this.service) {
        this.loading = true;
        let language = this.language;
        this.$http
          .get(this.service, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          })
          .then(response => {
            this.handleResponse(response, language);
          })
          .catch(() => {
            this.handleError();
          });
      }
    },

    handleResponse(response, language) {
      this.loading = false;
      let itemsArray = response.data.map(item => {
        return this.createThesaurusItemsArray(item, language);
      });

      this.items = itemsArray.sort(function(a, b) {
        return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
      });
    },

    handleError() {
      this.loading = false;
    },
    createThesaurusItemsArray(thesaurusItem, language) {
      let thesaurusItemTmp = {
        checked: false,
        deployed: false,
        name: thesaurusItem.name,
        label:
          language == "fr"
            ? thesaurusItem.translation.fr
              ? thesaurusItem.translation.fr
              : thesaurusItem.translation.en
            : thesaurusItem.translation.en,
        search: thesaurusItem.searchConcat,
        thesaurusItems: []
      };

      if (thesaurusItem.thesaurusItems.length > 0) {
        thesaurusItemTmp.thesaurusItems = thesaurusItem.thesaurusItems
          .map(item => {
            return this.createThesaurusItemsArray(item, language);
          })
          .sort(function(a, b) {
            return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
          });
      }
      return thesaurusItemTmp;
    },
    resetChecked() {
      this.$refs["thesaurusItemTreeCheckbox" + this.type].forEach(thesaurusItem => {
        thesaurusItem.resetChecked();
      });
    }
  }
};
</script>
<style scoped>
[aeris-thesaurus-item-tree-checkbox-layout] .loading-bar {
  padding: 8px 0;
}
</style>
