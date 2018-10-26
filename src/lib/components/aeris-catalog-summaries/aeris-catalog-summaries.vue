<i18n>
{
  "en": {
    "message": "Please make a search to access the content",
    "nometadata": "No metadata sheet found",
    "showMore": "Show more",
    "resultsFound": "Results found"
  },
  "fr": {
    "message": "Veuillez faire une recherche pour accéder au contenu",
    "nometadata": "Aucune fiche de métadonnées trouvée",
    "showMore": "Voir plus",
    "resultsFound": "Résultats trouvés"
  }
}
</i18n>

<template>
<div data-aeris-catalog-summaries-bar class="always-visible" :class="visibilityClass">
  <template v-if="summaries">
    <template v-if="summaries.length > 0">
      <div>
        {{$t('resultsFound')}}{{': '+this.total}}
      </div>
      <section>
        <div v-for="summary in summaries" :key="summary.id">
          <aeris-catalog-default-summary :value="JSON.stringify(summary)" deployed="true" v-if="isDefaultSummary(summary)" :max-length="summaryMaxLength"></aeris-catalog-default-summary>
          <aeris-catalog-proxy-summary :value="JSON.stringify(summary)" :name="getCustomNodeName(summary)" v-else></aeris-catalog-proxy-summary>
        </div>
      </section>
      <button v-if="summaries.length !== total" @click="showMore"><i class="fa fa-arrow-down"/>{{$t("showMore")}}</button>
    </template>
    <p v-else>
      {{$t("nometadata")}}
    </p>
  </template>
  <p v-else>
    {{message ? message : $t("message")}}
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
      default: 150
    },
    message: {
      type: String,
      required: false,
      default: null
    }
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
  },

  created: function() {
    this.aerisSummariesListener = this.handleSummaries.bind(this)
    document.addEventListener('aerisSummaries', this.aerisSummariesListener);
    this.aerisCatalogueResetListener = this.handleReset.bind(this)
    document.addEventListener('aerisCatalogueResetEvent', this.aerisCatalogueResetListener);
  },

  mounted: function() {
    if (this.lang) {
      this.$i18n.locale = this.lang
    }
    var event = new CustomEvent('aerisThemeRequest', {});
    document.dispatchEvent(event);
  },


  computed: {

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
      range: {
        min: 0,
        max: 24
      },
      step: 25,
      total: 0
    }
  },

  updated: function() {},

  methods: {

    handleReset: function() {
      this.range = {
        min: 0,
        max: 24
      };
      this.total = 0;
      this.summaries = null;
    },

    handleSummaries: function(response) {
      this.range = response.detail.range;
      this.summaries = this.range.min === 0 ? response.detail.search.results : [...this.summaries, ...response.detail.search.results];
      this.total = response.detail.search.total;
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

    },

    showMore() {
      this.range = {
        min: this.range.min + this.step,
        max: this.range.max + this.step
      };
      document.dispatchEvent(new CustomEvent("aerisCatalogueSearchStartEvent", {
        detail: {
          range: this.range
        }
      }));
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

[data-aeris-catalog-summaries-bar] > div:first-child{
  position: absolute;
  top: -25px;
}

[data-aeris-catalog-summaries-bar]>header input {
  color: #555;
}

[data-aeris-catalog-summaries-bar]>button {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 4px 4px 0 0;
  font-size: 1.1rem;
  cursor: pointer;
  color: #333;
  background: #ccc;
}

[data-aeris-catalog-summaries-bar]>button:hover {
  filter: brightness(80%);
}

[data-aeris-catalog-summaries-bar]>button i {
  margin-right: 8px;
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

[data-template="summary"]>div>i:hover {
  cursor: pointer;
  filter : brightness(120%) ;
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

[data-template="summary"] footer {
  margin-top: 5px;
}
[data-template="summary"] footer .cartouche {
  display: inline-block;
  padding: 3px 5px;
  border-radius: 5px;
  font-size: 0.55rem;
  font-weight: 400;
  color: #FAFAFA;
  margin-left: 5px;
  font-weight: bold
}

[data-template="summary"] footer .cartouche .fa {
  margin-right: 5px;
}

[data-template="summary"] main {
  padding-left: 5px;
  
}
</style>
