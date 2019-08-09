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
  <div>
    <aeris-ui-input
      ref="uiInput"
      :title="$t('titleHelp')"
      :placeholder="$t('keywords')"
      :value="value"
      icon="fas fa-pencil-alt"
      name="keywords"
      @keyup.enter.native="handleEnter"
      @input="handleChange"
    ></aeris-ui-input>
  </div>
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

  computed: {
    keywords() {
      return this.$store.getters.getKeywords;
    },
    value() {
      return this.$store.getters.getInputValue;
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

  mounted() {
    this.$i18n.locale = this.language;
  },

  methods: {
    handleChange(value) {
      this.$store.commit("setInputValueKeyword", value);
      this.parseKeyword(value);
    },

    parseKeyword(value) {
      value = value.trim();
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
      let keywords = finalQuery.filter(Boolean);

      this.$store.commit("setKeywords", keywords);
    },

    handleEnter() {
      this.$emit("startSearch");
    },

    checkSpecialWord(value) {
      let specialWordRegex = /[a-zA-Z0-9]+([-._;():][a-zA-Z0-9]+)+/;
      return specialWordRegex.test(value);
    }
  }
};
</script>
