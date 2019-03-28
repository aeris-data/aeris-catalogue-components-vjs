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
  <aeris-ui-input
    :title="$t('titleHelp')"
    :placeholder="$t('keywords')"
    icon="fas fa-pencil-alt"
    name="keywords"
    @input="inputKeyword"
  ></aeris-ui-input>
</template>

<script>
import { AerisUiInput } from "aeris-commons-components-vjs";
export default {
  name: "aeris-keyword-search-criteria-content",
  components: { AerisUiInput },
  props: {
    language: {
      type: String,
      default: "en"
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
      keywords: []
    };
  },

  methods: {
    keywordsReset() {
      this.keywords = [];
      this.$store.commit("resetKeywords");
    },

    inputKeyword(e) {
      let inputValue = e.trim();
      this.parseKeyword(inputValue);
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
      this.$store.commit("setKeywords", this.keywords);
    },

    checkSpecialWord(value) {
      let specialWordRegex = /[a-zA-Z0-9]+([-._;():][a-zA-Z0-9]+)+/;
      return specialWordRegex.test(value);
    }
  }
};
</script>
