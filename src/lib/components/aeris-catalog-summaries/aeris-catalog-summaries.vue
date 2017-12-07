<i18n>
{
  "en": {
    "filter": "Filter",
    "nometadata": "No metadata sheet found"
  },
  "fr": {
    "filter": "Filtre",
    "nometadata": "Aucune fiche de métadonnées trouvée"
  }
}
</i18n>

<template>
<div data-aeris-catalog-summaries-bar class="always-visible" :class="visibilityClass">
  <header>
    <aeris-catalog-ui-input icon="fa fa-filter" aria-label="filterSummaries" :placeholder="$t('filter')" :value="filter" @input="filter = $event.target.value"></aeris-catalog-ui-input>
  </header>
  <section v-if="summaries">
    <div v-for="summary in filteredsummaries" :key="summary.id">
      <aeris-catalog-default-summary :value="JSON.stringify(summary)" deployed="true" v-if="isDefaultSummary(summary)" :max-length="summaryMaxLength"></aeris-catalog-default-summary>
      <aeris-catalog-proxy-summary :value="JSON.stringify(summary)" :name="getCustomNodeName(summary)" v-else></aeris-catalog-proxy-summary>
    </div>
  </section>
  <p v-else>
    {{$t('nometadata')}}
  </p>
  <slot></slot>
</div>
</template>

<script>
import Diacritics from './diacritics.js'

export default {

  name: 'aeris-catalog-summaries',

  props: {
    lang: {
      type: String,
      default: 'en'
    },
    summaryMaxLength: {
      type: Number,
      default: "150"
    },
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value
    }
  },

  destroyed: function() {
    document.removeEventListener('aerisSummaries', this.aerisSummariesListener);
    this.aerisSummariesListener = null;
    document.removeEventListener('aerisCatalogueResetEvent', this.aerisCatalogueResetListener);
    this.aerisCatalogueResetListener = null;
    document.removeEventListener('aerisCatalogueSearchEvent', this.aerisCatalogueSearchEventListener);
    this.aerisCatalogueSearchEventListener = null;


  },

  created: function() {
    this.aerisSummariesListener = this.handleSummaries.bind(this)
    document.addEventListener('aerisSummaries', this.aerisSummariesListener);
    this.aerisCatalogueResetListener = this.handleReset.bind(this)
    document.addEventListener('aerisCatalogueResetEvent', this.aerisCatalogueResetListener);
    this.aerisCatalogueSearchEventListener = this.handleSearch.bind(this)
    document.addEventListener('aerisCatalogueSearchEvent', this.aerisCatalogueSearchEventListener);
  },

  mounted: function() {
    if (this.lang) {
      this.$i18n.locale = this.lang
    }
    var event = new CustomEvent('aerisThemeRequest', {});
    document.dispatchEvent(event);
  },


  computed: {

    filteredsummaries: function() {
      if (this.filter.trim().length == 0) {
        return this.summaries;
      } else {
        var filter = this.filter;
        var self = this;
        return this.summaries.filter(function(summary) {
          console.log(self.removeDiacritics(JSON.stringify(summary).toLowerCase()))
          return self.removeDiacritics(JSON.stringify(summary).toLowerCase()).indexOf(self.removeDiacritics(filter.toLowerCase())) >= 0
        })
      }
    },

    visibilityClass: function() {
      if ((!this.summaries) || (this.summaries.length == 0)) {
        return "invisible"
      } else {
        return "visible"
      }
    }
  },

  data() {
    return {
      aerisSummariesListener: null,
      aerisCatalogueResetListener: null,
      aerisCatalogueSearchEventListener: null,
      summaries: null,
      filter: ''
    }
  },

  updated: function() {},

  methods: {

    handleReset: function() {
      this.summaries = []
    },

    handleSearch: function() {
      this.handleReset();
    },

    handleSummaries: function(summaries) {
      if (summaries.detail) {
        this.summaries = summaries.detail.summaries
        console.log(this.summaries)
      } else {
        this.summaries = null
      }
    },

    isDefaultSummary: function(summary) {
      if (window.registredAerisElements.indexOf(this.getCustomNodeName(summary)) < 0) {
        return true
      } else {
        return false
      }
    },

    getCustomNodeName: function(summary) {
      var result = summary.type.toLowerCase();
      result = result.replace(/_/g, '-');
      return result + "-summary";
    },

    removeDiacritics: function(str) {

      for (var i = 0; i < Diacritics.length; i++) {
        str = str.replace(Diacritics[i].letters, Diacritics[i].base);
      }

      return str;

    }
  }
}
</script>

<style>
[data-aeris-catalog-summaries-bar] {
  box-sizing: border-box;
  display: block;
  height: 100%;
  overflow: auto;
  padding: 0 10px;
}

[data-aeris-catalog-summaries-bar]>header input {
  color: #555;
}

[data-template="summary"] {
  height: 100%;
  width: 100%;
  margin: 10px 0;
  border-radius: 2px;
  box-sizing: border-box;
  padding: 10px;
  background: #E1E1E1;
  color: #333;
}

[data-template="summary"]:hover {
  cursor: pointer;
  filter: brightness(90%);
}

[data-template="summary"] header .cartouche {
  display: inline-block;
  padding: 3px 5px;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 400;
  color: #FAFAFA;
}

[data-template="summary"] header .cartouche .fa {
  margin-right: 5px;
}

[data-template="summary"] main {
  padding: 10px;
}
</style>