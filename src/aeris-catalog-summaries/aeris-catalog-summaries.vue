<i18n>
{
  "en": {
    "filter": "Filter"
  },
  "fr": {
    "filter": "Filtre"
  }
}
</i18n>

<template>
<div data-aeris-catalog-summaries-bar class="always-visible" :class="visibilityClass">
  <div class="collection-bar">
    <header class="aeris-catalog-summaries-bar-header">
      <input class="filter-field" type="text" :placeholder="$t('filter')" v-model="filter">
      <i class="fa fa-filter"></i>
    </header>
    <section v-if="summaries">
      <span v-for="summary in filteredsummaries" :key="summary.id">

<aeris-catalog-default-summary :value="JSON.stringify(summary)" deployed="true" v-if="isDefaultSummary(summary)" :max-length="summaryMaxLength"></aeris-catalog-default-summary>
<aeris-catalog-proxy-summary :value="JSON.stringify(summary)" :name="getCustomNodeName(summary)" v-else></aeris-catalog-proxy-summary>
<div class="filler"></div>
</span>
    </section>
  </div>
</div>
</template>

<script>
import Diacritics from './diacritics.js'

export default {
  props: {
    lang: {
      type: String,
      default: 'en'
    },
    barWidth: {
      type: String,
      default: "500px"
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
    document.removeEventListener('aerisTheme', this.aerisThemeListener);
    this.aerisThemeListener = null;
    document.removeEventListener('aerisSummaries', this.aerisSummariesListener);
    this.aerisSummariesListener = null;
    document.removeEventListener('aerisCatalogueResetEvent', this.aerisCatalogueResetListener);
    this.aerisCatalogueResetListener = null;
    document.removeEventListener('aerisCatalogueSearchEvent', this.aerisCatalogueSearchEventListener);
    this.aerisCatalogueSearchEventListener = null;


  },

  created: function() {
    this.aerisThemeListener = this.handleTheme.bind(this)
    document.addEventListener('aerisTheme', this.aerisThemeListener);
    this.aerisSummariesListener = this.handleSummaries.bind(this)
    document.addEventListener('aerisSummaries', this.aerisSummariesListener);
    this.aerisCatalogueResetListener = this.handleReset.bind(this)
    document.addEventListener('aerisCatalogueResetEvent', this.aerisCatalogueResetListener);
    this.aerisCatalogueSearchEventListener = this.handleSearch.bind(this)
    document.addEventListener('aerisCatalogueSearchEvent', this.aerisCatalogueSearchEventListener);
  },

  mounted: function() {
    if (this.$el) {
      this.$el.style.width = this.barWidth;
    }
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
      aerisThemeListener: null,
      aerisSummariesListener: null,
      aerisCatalogueResetListener: null,
      aerisCatalogueSearchEventListener: null,
      summaries: null,
      filter: ''
    }
  },

  updated: function() {},

  methods: {

    handleTheme: function(theme) {
      this.theme = theme.detail
      this.ensureTheme()
    },

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

    ensureTheme: function() {
      if (this.theme) {
        this.$el.querySelector("header").style.color = this.theme.primary
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

      for (var i = 0; i < defaultDiacriticsRemovalMap.length; i++) {
        str = str.replace(Diacritics[i].letters, Diacritics[i].base);
      }

      return str;

    }
  }
}
</script>

<style>
[data-aeris-catalog-summaries-bar] {
  top: 40px;
  height: 100%;
  right: 0px;
  position: absolute;
  z-index: 11;
  box-sizing: border-box;
  display: block;
  padding: 10px;
  background-color: #F5F5F5;
  overflow: scroll;
}

[data-aeris-catalog-summaries-bar].invisible {
  transform: translate3d(100%, 0, 0);
  transition-duration: 500ms;
}

[data-aeris-catalog-summaries-bar].visible {
  transform: translate3d(0%, 0, 0);
  transition-duration: 500ms;
}

[data-aeris-catalog-summaries-bar] .aeris-catalog-summaries-bar-header {
  position: relative;
  width: 100%;
  margin: 1Opx;
  border: 1px solid black;
  background-color: #FFF;
  border-radius: 2px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

[data-aeris-catalog-summaries-bar] header i {
  padding-right: 5px;
}

[data-aeris-catalog-summaries-bar] header input {
  background-color: transparent;
  width: 100%;
  height: 25px;
  line-height: 100%;
  border: none;
  outline: none;
  padding-left: 5px;
}

[data-aeris-catalog-summaries-bar] .filler {
  height: 5px;
}

.always-visible.ps>.ps__scrollbar-x-rail,
.always-visible.ps>.ps__scrollbar-y-rail {
  opacity: 0.9;
}
</style>
