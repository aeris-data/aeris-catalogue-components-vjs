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
    <aeris-ui-input
      :title="$t('titleHelp')"
      :value="current"
      :placeholder="$t('keywords')"
      icon="fa fa-pencil"
      name="keywords"
      @input="current = $event.target.value"
      @keyup.enter="inputKeyword"
    ></aeris-ui-input>
  </div>
</template>

<script>
import { AerisUiInput } from "aeris-commons-components-vjs";
export default {
  name: "aeris-keyword-search-criteria-content",
  components:{AerisUiInput},
  props: {
    language: {
      type: String,
      default: "en"
    },
    isShowOperators: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    language(value) {
      this.$i18n.locale = value;
    },
    isShowOperators(value) {
      if (value) {
        this.operator = "";
      }
    }
  },

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

  methods: {
    handleKeywordDeletion(e) {
      let itemref = e.detail.itemref;
      let index = this.keywords.indexOf(itemref);
      if (index > -1) {
        this.keywords.splice(index, 1);
      }
      e.stopPropagation();
    },

    handleCatalogueReset() {
      this.keywords.splice(0, this.keywords.length);
      this.current = "";
    },

    handleCatalogueSearch(e) {
      this.parseKeyword(this.current.trim());
      e.detail.keywords = this.keywords;
      e.detail.searchOperator = this.operator;
    },

    inputKeyword(e) {
      let inputValue = this.current.trim();
      this.parseKeyword(inputValue);
      this.handleSearch(e);
    },

    typeIndex(index) {
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
