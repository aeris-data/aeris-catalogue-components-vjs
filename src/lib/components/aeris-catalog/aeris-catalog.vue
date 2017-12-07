7<i18n>
{
  "en": {
    "searching": "Searching...",
    "foundresults": "Found results: ",
    "noresult": "No result corresponding to your request",
    "nometadata": "No metadata sheet displayed"
  },
  "fr": {
    "searching": "Recherche...",
    "foundresults": "Résultat trouvés: ",
    "noresult": "Aucun résultat ne correspond à votre requête",
    "nometadata": "Aucune fiche de métadonnées affichée"
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
    Your shopping cart
    <aeris-catalog-cart :cart-service="cartService" :cart-token="cartToken"></aeris-catalog-cart>
  </section>

  <aeris-catalogue-metadata-panel data-sheet="content" v-if="visibleMetadataPanel" :edit="editMetadataPanel" :resourcetitle="currentTitle" :icon-class="currentIconClass" :metadata-service="metadataService" :uuid="currentUuid" :type="currentType" :metadata="currentMetadata"
    :client-template="currentTemplate">
    <slot name="buttons-metadata"></slot>
  </aeris-catalogue-metadata-panel>

  <section v-else data-sheet="placeholder">
    <p>{{$t('nometadata')}}</p>
    <slot name="buttons-no-metadata"></slot>
  </section>

</div>
</template>

<script>
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

    program: {
      type: String,
      default: null
    },

    cartService: {
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
  },

  destroyed: function() {
    document.removeEventListener('aerisCatalogueMaximizeEvent', this.aerisCatalogueMaximizeEventListener);
    this.aerisCatalogueMaximizetEventListener = null;

    document.removeEventListener('aerisCatalogueMinimizeEvent', this.aerisCatalogueMinimizeEventListener);
    this.aerisCatalogueMinimizetEventListener = null;

    document.removeEventListener('aerisCatalogueSearchStartEvent', this.aerisCatalogueSearchStartEventListener);
    this.aerisCatalogueSearchStartEventListener = null;

    document.removeEventListener('aerisCatalogueSearchStartEvent', this.aerisCatalogueSearchStartEventListener);
    this.aerisCatalogueSearchStartEventListener = null;

    document.removeEventListener('aerisCatalogueDisplayMetadata', this.aerisCatalogueDisplayMetadataEventListener);
    this.aerisCatalogueDisplayMetadataEventListener = null;

    document.removeEventListener('aerisCatalogueHideMetadata', this.aerisCatalogueHideMetadataEventListener);
    this.aerisCatalogueHideMetadataEventListener = null;

    document.removeEventListener('aerisCatalogueEditMetadata', this.aerisCatalogueEditMetadataEventListener);
    this.aerisCatalogueEditMetadataEventListener = null;

    document.removeEventListener('aerisCatalogueResetEvent', this.aerisCatalogueResetEventListener);
    this.aerisCatalogueResetEventListener = null;


    document.removeEventListener('currentEditedMetadataRequest', this.aerisCurrentEditedMetadataRequestListener);
    this.aerisCurrentEditedMetadataRequestListener = null;
  },

  created: function() {
    console.log("Aeris aeris-catalog creation")

    this.aerisCatalogueSearchStartEventListener = this.handleCatalogueSearchStart.bind(this)
    document.addEventListener('aerisCatalogueSearchStartEvent', this.aerisCatalogueSearchStartEventListener);

    this.aerisCatalogueMinimizeEventListener = this.handleMinimize.bind(this)
    document.addEventListener('aerisCatalogueMinimizeEvent', this.aerisCatalogueMinimizeEventListener);

    this.aerisCatalogueMaximizeEventListener = this.handleMaximize.bind(this)
    document.addEventListener('aerisCatalogueMaximizeEvent', this.aerisCatalogueMaximizeEventListener);

    this.aerisCatalogueDisplayMetadataEventListener = this.handleDisplayMetadata.bind(this)
    document.addEventListener('aerisCatalogueDisplayMetadata', this.aerisCatalogueDisplayMetadataEventListener);

    this.aerisCatalogueHideMetadataEventListener = this.handleHideMetadata.bind(this)
    document.addEventListener('aerisCatalogueHideMetadata', this.aerisCatalogueHideMetadataEventListener);

    this.aerisCatalogueEditMetadataEventListener = this.handleEditMetadata.bind(this)
    document.addEventListener('aerisCatalogueEditMetadata', this.aerisCatalogueEditMetadataEventListener);

    this.aerisCatalogueResetEventListener = this.handleReset.bind(this)
    document.addEventListener('aerisCatalogueResetEvent', this.aerisCatalogueResetEventListener);

    this.aerisCurrentEditedMetadataRequestListener = this.handleCurrentEditedMetadataRequest.bind(this)
    document.addEventListener('currentEditedMetadataRequest', this.aerisCurrentEditedMetadataRequestListener);
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
    }
  },

  data() {
    return {
      aerisCatalogueSearchStartEventListener: null,
      aerisCatalogueDisplayMetadataEventListener: null,
      aerisCatalogueEditMetadataEventListener: null,
      aerisCatalogueHideMetadataEventListener: null,
      aerisCatalogueResetEventListener: null,
      aerisCatalogueMaximizeEventListener: null,
      aerisCatalogueMinimizeEventListener: null,
      currentEditedMetadata: null,
      currentTitle: null,
      currentIconClass: null,
      currentUuid: null,
      currentType: null,
      currentMetadata: null,
      currentTemplate: null,
      visibleMetadataPanel: false,
      editMetadataPanel: false
    }
  },

  updated: function() {},

  methods: {

    handleReset: function(e) {
      this.hideMetadataPanel()
    },

    handleDisplayMetadata: function(e) {
      this.hideMetadataPanel();

      if (e.detail.uuid) {
        this.currentUuid = e.detail.uuid
      } else {
        this.currentUuid = ""
      }
      if (e.detail.title) {
        this.currentTitle = e.detail.title
      } else {
        this.currentTitle = ""
      }
      if (e.detail.iconClass) {
        this.currentIconClass = e.detail.iconClass
      } else {
        this.currentIconClass = ''
      }
      if (e.detail.type) {
        this.currentType = e.detail.type
      } else {
        this.currentType = ''
      }
      if (e.detail.clientTemplateName) {
        this.currentTemplate = e.detail.clientTemplateName
      } else {
        this.currentTemplate = ''
      }
      this.visibleMetadataPanel = true;
    },

    handleHideMetadata: function() {
      this.hideMetadataPanel();
    },

    handleEditMetadata: function(e) {
      this.hideMetadataPanel();
      this.currentEditedMetadata = e.detail
      if (e.detail.type) {
        this.currentType = e.detail.type
      } else {
        this.currentType = ''
      }
      this.currentMetadata = e.detail.metadata ? e.detail.metadata : null;
      this.currentUuid = e.detail.metadata ? e.detail.metadata.uuid : null;
      this.visibleMetadataPanel = true;
      this.editMetadataPanel = true;
    },

    hideMetadataPanel: function() {
      this.visibleMetadataPanel = false;
      this.editMetadataPanel = false;
      this.currentMetadata = null;
      this.currentTitle = "";
      this.currentUuid = ""
      this.currentType = ""
      this.currentIconClass = ''
      this.currentEditedMetadata = null
    },

    handleCatalogueSearchStart: function() {
      this.hideMetadataPanel()
      var e = new CustomEvent("aerisCatalogueSearchEvent", {
        detail: {}
      })
      document.dispatchEvent(e);
      //console.log(e)
      console.log("Connecting with metadata server")

      if (!(this.metadataService)) {
        console.error("AerisCatalogueSearcEvent detected but metadataService not provided in props...")
        return
      }

      var url = this.metadataService + '/request';
      if (this.metadataService.endsWith('/')) {
        url = this.metadataService + 'request';
      }

      if (this.program) {
        url = url + "?program=" + this.program;
      }

      document.dispatchEvent(new CustomEvent('aerisLongActionStartEvent', {
        'detail': {
          message: this.$t('searching')
        }
      }))

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

    handleCurrentEditedMetadataRequest: function() {
      document.dispatchEvent(new CustomEvent('currentEditedMetadataResponse', {
        'detail': this.currentEditedMetadata
      }))
    },


    handleSuccess: function(response) {
      document.dispatchEvent(new CustomEvent('aerisLongActionStopEvent', {
        'detail': {
          message: this.$t('searching')
        }
      }))
      console.log("SUCCESS: Response")
      console.log(response)
      var summaries = response.body
      if (summaries) {
        document.dispatchEvent(new CustomEvent('aerisNotificationMessageEvent', {
          'detail': {
            message: this.$t('foundresults') + summaries.length
          }
        }))
      } else {
        document.dispatchEvent(new CustomEvent('aerisNotificationMessageEvent', {
          'detail': {
            message: this.$t('noresult') + summaries.length
          }
        }))
      }
      document.dispatchEvent(new CustomEvent('aerisSummaries', {
        'detail': {
          summaries: summaries
        }
      }))
    },

    handleError: function(response) {
      document.dispatchEvent(new CustomEvent('aerisLongActionStopEvent', {
        'detail': {
          message: this.$t('searching')
        }
      }))
      console.log("ERROR: Response")
      console.log(response)
      document.dispatchEvent(new CustomEvent('aerisSummaries', {
        'detail': {
          summaries: []
        }
      }))
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