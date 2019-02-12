<i18n>
    {
    "en": {
            "keywords": "Full text search",
            "titleHelp" : "To perform a search you can use the following operators:\\n '-' to exclude a term from the search\\n '+' to obtain results that must contain the terms\\nIf no operator is used, then the 'or' operator will be used\\nExample query: iagos+mistral -Menorca is equal to +iagos +mistral -Menorca"

          },
    "fr": {
            "keywords": "Recherche texte libre",
            "titleHelp" :"Pour effectuer une recherche vous pouvez utiliser les opérateurs suivant:\\n '-' pour exclure un terme de la recherche\\n '+' pour avoir des résultats qui contiennent obligatoirement les termes\\nSi aucun opérateur n'est utilisé, alors l'opérateur 'ou' sera utilisé\\nExemple de requête : iagos+mistral -Menorca est équivalent a +iagos +mistral -Menorca"
          }
    }
</i18n>

<template>
  <div data-aeris-keyword-search-criteria>
    <aeris-catalog-ui-input
      :title="$t('titleHelp')"
      :value="current"
      :placeholder="$t('keywords')"
      icon="fa fa-pencil"
      name="keywords"
      @input="current = $event.target.value"
      @keyup.enter="inputKeyword"
    ></aeris-catalog-ui-input>
  </div>
</template>

<script>
export default {
  name: "aeris-keyword-search-criteria-content",

  props: {
    lang: {
      type: String,
      default: "en"
    },
    isShowOperators: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value;
    },
    isShowOperators(value) {
      if (value) {
        this.operator = "";
      }
    }
  },

  destroyed: function() {
    document.removeEventListener("aerisCartoucheItemDeleted", this.keywordDeletionListener);
    this.keywordDeletionListener = null;
    document.removeEventListener("aerisCatalogueResetEvent", this.catalogueResetListener);
    this.catalogueResetListener = null;
    document.removeEventListener("aerisCatalogueSearchEvent", this.catalogueSearchListener);
    this.catalogueSearchListener = null;
  },

  created: function() {
    this.$i18n.locale = this.lang;
    this.keywordDeletionListener = this.handleKeywordDeletion.bind(this);
    document.addEventListener("aerisCartoucheItemDeleted", this.keywordDeletionListener);
    this.catalogueSearchListener = this.handleCatalogueSearch.bind(this);
    document.addEventListener("aerisCatalogueSearchEvent", this.catalogueSearchListener);
    this.catalogueResetListener = this.handleCatalogueReset.bind(this);
    document.addEventListener("aerisCatalogueResetEvent", this.catalogueResetListener);
  },

  mounted: function() {
    console.log("Aeris keywords search criteria content - mounted");
  },

  computed: {},

  data() {
    return {
      keywords: [],
      current: "",
      keywordDeletionListener: null,
      catalogueResetListener: null,
      catalogueSearchListener: null,
      operator: ""
    };
  },

  updated: function() {},

  methods: {
    handleKeywordDeletion: function(e) {
      let itemref = e.detail.itemref;
      let index = this.keywords.indexOf(itemref);
      if (index > -1) {
        this.keywords.splice(index, 1);
      }
      e.stopPropagation();
    },

    handleCatalogueReset: function() {
      this.keywords.splice(0, this.keywords.length);
      this.current = "";
    },

    handleCatalogueSearch: function(e) {
      this.parseKeyword(this.current.trim());
      e.detail.keywords = this.keywords;
      e.detail.searchOperator = this.operator;
    },

    handleSearch: function() {
      var e = new CustomEvent("aerisCatalogueSearchStartEvent", {
        detail: {
          range: {
            min: 0,
            max: 24
          }
        }
      });
      document.dispatchEvent(e);
    },

    inputKeyword: function(e) {
      let inputValue = this.current.trim();
      this.parseKeyword(inputValue);
      this.handleSearch(e);
    },

    typeIndex: function(index) {
      return `${this.name}-${index}`;
    },

    parseKeyword(value) {
      let finalQuery = "";
      let keyword = value.split(" ");
      let andKeyword = [];
      keyword.forEach(element => {
        if (this.checkSpecialWord(element)) {
          element = '"' + element + '"';
        }
        if (element.includes("+")) {
          andKeyword = element.split("+");
          andKeyword.forEach(quotedword => {
            if (quotedword != "") {
              quotedword = '"' + quotedword + '"';
              finalQuery = finalQuery + " " + quotedword;
            }
          });
        } else {
          finalQuery = finalQuery + " " + element;
        }
      });
      finalQuery = finalQuery.split(" ");
      this.keywords = finalQuery.filter(Boolean);
    },

    checkSpecialWord(value) {
      let specialWordRegex = /[a-zA-Z0-9]+([-._;():][a-zA-Z0-9]+)+/;
      return specialWordRegex.test(value);
    }
  }
};
</script>

<style>
[data-aeris-keyword-search-criteria] aeris-cartouche .aeris-cartouche-container {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  margin-top: 8px;
}

[data-aeris-keyword-search-criteria] .operator {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

[data-aeris-keyword-search-criteria] input[value="and"] {
  margin-left: 30px;
}
</style>
