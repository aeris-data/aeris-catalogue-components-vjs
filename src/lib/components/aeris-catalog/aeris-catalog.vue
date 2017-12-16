<i18n>
{
  "en": {
    "searching": "Searching...",
    "foundresults": "Found results: ",
    "noresult": "No result corresponding to your request",
    "nometadata": "No metadata sheet displayed",
    "shoppingCart": "Your shopping cart"
  },
  "fr": {
    "searching": "Recherche...",
    "foundresults": "Résultat trouvés: ",
    "noresult": "Aucun résultat ne correspond à votre requête",
    "nometadata": "Aucune fiche de métadonnées affichée",
    "shoppingCart": "Votre panier"
  }
}
</i18n>
<template>
<div :style="{'--heightMap': heightMap, '--heightSheet': heightSheet}" data-aeris-catalog :class="{'withMap': !hidemap}">
  <aeris-notifier></aeris-notifier>
  <section data-criteria="buttons" :style="{'--criteriaBackgroundColor': criteriaBackgroundColor}">
    <slot name="buttons-criteria"></slot>
  </section>

  <aeris-catalog-criteria data-criteria="container" :lang="lang" :style="{'--criteriaBackgroundColor': criteriaBackgroundColor, '--criteriaContentPrimaryColor': criteriaContentPrimaryColor, '--criteriaContentSecondaryColor': criteriaContentSecondaryColor, '--criteriaHeaderBackgroundColor': criteriaHeaderBackgroundColor, '--criteriaContentBackgroundColor': criteriaContentBackgroundColor, '--criteriaHeaderIconColor': criteriaHeaderIconColor}">
    <section data-criteria="content">
      <slot name="criteria"></slot>
    </section>
  </aeris-catalog-criteria>

  <aeris-catalog-map data-map v-if="!hidemap" :hidemap="hidemap">
    <slot name="buttons-map"></slot>
  </aeris-catalog-map>

  <aeris-catalog-summaries data-summaries>
  </aeris-catalog-summaries>

  <section data-cart>
    <div>{{$t('shoppingCart')}}</div>
    <aeris-catalog-cart :cart-service="cartService" :cart-token="cartToken"></aeris-catalog-cart>
  </section>

  <aeris-catalogue-metadata-panel data-sheet="content" v-if="visibleMetadataPanel">
    <slot name="buttons-metadata"></slot>
  </aeris-catalogue-metadata-panel>

  <section v-else data-sheet="placeholder">
    <p>{{$t('nometadata')}}</p>
    <slot name="buttons-no-metadata"></slot>
  </section>

</div>
</template>

<script>
import store from '../../store/index.js'

export default {

  name: 'aeris-catalog',

  props: {
    lang: {
      type: String,
      default: 'en'
    },
    hidemap: {
      type: Boolean,
      default: false
    },

    metadataService: {
      type: String,
      default: null
    },

    cartService: {
      type: String,
      default: null
    },

    downloadService: {
      type: String,
      default: null
    },

    orcidService: {
      type: String,
      default: null
    },

    previewService: {
      type: String,
      default: null
    },

    program: {
      type: String,
      default: null
    },

    cartToken: {
      type: String,
      default: null
    },
    edit: {
      type: Boolean,
      default: false
    },
    ratioMapSheet: {
      type: String,
      default: "1:3"
    },
    criteriaBackgroundColor: {
      required: false
    },
    criteriaHeaderBackgroundColor: {
      required: false
    },
    criteriaHeaderIconColor: {
      required: false
    },
    criteriaContentBackgroundColor: {
      required: false
    },
    criteriaContentPrimaryColor: {
      required: false
    },
    criteriaContentSecondaryColor: {
      required: false
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value
    },
    search(value) {
      this.handleCatalogueSearchStart();
    },
    maximize(value) {
      this.handleMaximize();
    },
    minimize(value) {
      this.handleMinimize();
    }
  },

  created: function() {
    console.log("Aeris aeris-catalog creation")

    store.commit('updateServices', {
      services: this.services
    })

    store.commit('updateProgram', {
      program: this.program
    });
  },

  mounted: function() {
    if (this.lang) {
      this.$i18n.locale = this.lang
    }
  },

  computed: {
    heightMap() {
      return `${this.ratioMapSheet.split(":")[0]}fr`;
    },
    heightSheet() {
      return `${this.ratioMapSheet.split(":")[1]}fr`;
    },
    services() {
      return {
        metadata: this.metadataService,
        orcid: this.orcidService,
        download: this.downloadService,
        preview: this.previewService
      };
    },
    search() {
      return store.state.catalogue.search;
    },
    minimize() {
      return store.state.catalogue.minimize;
    },
    maximize() {
      return store.state.catalogue.maximize;
    },
    visibleMetadataPanel() {
      return store.state.metadata.isVisible;
    }
  },

  updated: function() {},

  methods: {

    handleCatalogueSearchStart: function() {

      store.commit('hideMetadata');

      console.log("Connecting with metadata server")

      var e = new CustomEvent("aerisCatalogueSearchEvent", {
        detail: {}
      })
      document.dispatchEvent(e);

      if (!(this.metadataService)) {
        console.error("AerisCatalogueSearcEvent detected but metadataService not provided in props...")
        return
      }

      let url = `${this.metadataService}request`;

      if (this.program) {
        url = url + "?program=" + this.program;
      }

      store.commit('startLongAction', {
        message: this.$t('searching')
      });

      this.$http.post(url, e.detail).then(response => {
        this.handleSuccess(response)
      }, response => {
        this.handleError(response)
      });


    },

    handleMaximize: function() {
      var elem = this.$el;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    },

    handleMinimize: function() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    },

    handleSuccess: function(response) {
      store.commit('stopLongAction', {
        message: this.$t('searching')
      });

      console.log("SUCCESS: Response")
      console.log(response)
      var summaries = response.body
      if (summaries) {
        store.commit('notifyMessage', {
          message: this.$t('foundresults') + summaries.length
        });
      } else {
        store.commit('notifyMessage', {
          message: this.$t('noresult') + summaries.length
        });
      }
      store.commit('updateSummaries', {
        summaries: summaries
      });
    },

    handleError: function(response) {
      store.commit('stopLongAction', {
        message: this.$t('searching')
      });

      console.log("ERROR: Response")
      console.log(response)

      store.commit('updateSummaries', {
        summaries: []
      });

      //		  var statusMessage = e.detail.error.message;
      //	        if(!navigator.onLine) statusMessage = 'You are not connected to internet';
      //	        var errorMessage = this._localize('error_occured', this.lang);
      //	        if(statusMessage) errorMessage = errorMessage + ':<p>' + statusMessage + '</p>';
      //	        this.fire('longActionStopEvent', {
      //	          message: this._localize('loading', this.lang) + '...'
      //	        });
      //	        this.fire('errorNotificationMessageEvent', {
      //	          message: errorMessage
      //	        });
    }

  }
}
</script>

<style>

[data-aeris-catalog] {
  display: grid;
  grid-template-columns: 20% 20% 60%;
  grid-template-rows: 60px 1fr 1fr;
  grid-template-areas:  "buttons-criteria cart sheet"
                        "criteria summaries sheet"
                        "criteria summaries sheet";
  width: 100%;
  height: 100vh;
  background-color: #EEE;
  position: relative;
}

[data-aeris-catalog].withMap {
  grid-template-columns: 20% 20% 1fr;
  grid-template-rows: 60px var(--heightMap) var(--heightSheet);
  grid-template-areas:    "buttons-criteria cart map"
                          "criteria summaries map"
                          "criteria summaries sheet";
}

[data-aeris-catalog] [data-criteria="container"] {
    grid-area: criteria;
    position: relative;
}

[data-aeris-catalog] [data-summaries] {
    grid-area: summaries;
    position: relative;
}

[data-aeris-catalog] [data-criteria="buttons"] {
  grid-area: buttons-criteria;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

[data-aeris-catalog] [data-criteria="buttons"]>div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
[data-aeris-catalog] [data-criteria="buttons"]>div>* {
    margin: 5px;
}

[data-aeris-catalog] [data-map] {
    grid-area: map;
}

[data-aeris-catalog] [data-cart] {
  grid-area: cart;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

[data-aeris-catalog] [data-sheet="content"] {
    grid-area: sheet;
    width: 100%;
    position: relative;
    overflow: hidden;
}

[data-aeris-catalog] [data-sheet="placeholder"] {
  grid-area: sheet;
  background: #DDD;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 2.2rem;
  font-weight: 300;
}

[data-aeris-catalog] [data-sheet="placeholder"]>div {
  padding: 20px 0;
}

/* Customised style */

[data-aeris-catalog] [data-criteria],
[data-aeris-catalog] [data-criteria="buttons"] {
  background: var(--criteriaBackgroundColor, #21242b);
}

[data-aeris-catalog] [data-layout="search-criteria"] .box-heading {
  background: var(--criteriaHeaderBackgroundColor, transparent);
}

[data-aeris-catalog] [data-layout="search-criteria"] .box-heading h3,
[data-aeris-catalog] [data-layout="search-criteria"] .box-heading i {
  color: var(--criteriaHeaderIconColor, #FAFAFA);
}

[data-aeris-catalog] [data-layout="search-criteria"] .box-body .content {
  background: var(--criteriaContentBackgroundColor, transparent);
}

[data-aeris-catalog] [data-layout="search-criteria"] .box-body .content .aeris-cartouche-container,
[data-aeris-catalog] [data-layout="search-criteria"] .box-body .content i,
[data-aeris-catalog] [data-layout="search-criteria"] .box-body .content input,
[data-aeris-catalog] [data-layout="search-criteria"] .box-body .content label {
  color: var(--criteriaContentPrimaryColor, #FAFAFA);
}

[data-aeris-catalog] [data-layout="search-criteria"] .box-body .content .input-container,
[data-aeris-catalog] [data-layout="search-criteria"] .box-body .content ::placeholder {
   color: var(--criteriaContentSecondaryColor, #888);
}

[data-aeris-catalog] [data-layout="search-criteria"] .box-body .content .aeris-cartouche-container {
  background: transparent;
}

[data-aeris-catalog] [data-layout="search-criteria"] .box-body .content .badge {
  color: var(--criteriaBackgroundColor, #21242b);
}
 </style>
