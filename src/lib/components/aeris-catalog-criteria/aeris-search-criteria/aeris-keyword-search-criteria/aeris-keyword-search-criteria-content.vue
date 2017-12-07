<i18n>
{
  "en": {
    "keywords": "Keywords"
  },
  "fr": {
    "keywords": "Mots-clés"
  }
}
</i18n>

<template>
<div data-aeris-keyword-search-criteria>
  <aeris-catalog-ui-input name="keywords" :placeholder="$t('keywords')" :value="current" @input="current = $event.target.value" @keypress="inputKeyword"></aeris-catalog-ui-input>
  <aeris-cartouche edit="true" v-for="keyword in keywords" :key="keyword" :itemref="keyword">{{keyword}}</aeris-cartouche>
</div>
</template>

<script>
export default {

  name: 'aeris-keyword-search-criteria-content',

  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value
    }
  },

  destroyed: function() {
    document.removeEventListener('aerisCartoucheItemDeleted', this.keywordDeletionListener);
    this.keywordDeletionListener = null;
    document.removeEventListener('aerisCatalogueResetEvent', this.catalogueResetListener);
    this.catalogueResetListener = null;
    document.removeEventListener('aerisCatalogueSearchEvent', this.catalogueSearchListener);
    this.catalogueSearchListener = null;

  },

  created: function() {

    this.$i18n.locale = this.lang
    this.keywordDeletionListener = this.handleKeywordDeletion.bind(this)
    document.addEventListener('aerisCartoucheItemDeleted', this.keywordDeletionListener);
    this.catalogueSearchListener = this.handleCatalogueSearch.bind(this)
    document.addEventListener('aerisCatalogueSearchEvent', this.catalogueSearchListener);
    this.catalogueResetListener = this.handleCatalogueReset.bind(this)
    document.addEventListener('aerisCatalogueResetEvent', this.catalogueResetListener);
  },

  mounted: function() {
    console.log('Aeris keywords search criteria content - mounted');
  },

  computed: {

  },

  data() {
    return {
      keywords: [],
      current: '',
      keywordDeletionListener: null,
      catalogueResetListener: null,
      catalogueSearchListener: null
    }
  },

  updated: function() {},

  methods: {

    handleKeywordDeletion: function(e) {
      console.log(e.detail.itemref)
      var itemref = e.detail.itemref;
      var index = this.keywords.indexOf(itemref)
      if (index > -1) {
        this.keywords.splice(index, 1);
      }
      e.stopPropagation()
    },

    handleCatalogueReset: function() {
      this.keywords.splice(0, this.keywords.length)
      this.current = ""
    },

    handleCatalogueSearch: function(e) {
      if (this.current.length > 0) {
        var aux = this.current;
        this.keywords.push(aux);
        this.current = ""
      }
      e.detail.keywords = this.keywords;
    },

    inputKeyword: function(e) {
      var withComma = this.current.trim();
      if (withComma.length < 2) return;
      var keyCode = e.keyCode ? e.keyCode : e.charCode;
      if (withComma.endsWith(',') || keyCode === 13 || keyCode === 32) {
        var withoutComma = (withComma.endsWith(',')) ? withComma.substring(0, (withComma.length - 1)) : withComma;
        if (!this.keywords) this.keywords = [];
        this.keywords.push(withoutComma);
        this.current = '';
      }
    }

  }
}
</script>

<style>
[data-aeris-keyword-search-criteria] aeris-cartouche .aeris-cartouche-container  {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  margin-top: 8px;
}
</style>
