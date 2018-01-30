<i18n>
{
  "en": {
    "searching": "Searching...",
    "foundresults": "Found results: ",
    "noresult": "No result corresponding to your request",
    "nometadata": "No metadata sheet displayed",
    "shoppingCart": "Cart"
  },
  "fr": {
    "searching": "Recherche...",
    "foundresults": "Résultat trouvés: ",
    "noresult": "Aucun résultat ne correspond à votre requête",
    "nometadata": "Aucune fiche de métadonnées affichée",
    "shoppingCart": "Panier"
  }
}
</i18n>
<template>
<div data-aeris-catalog :style="{'--heightMap': heightMap, '--heightSheet': heightSheet}" :class="{'withMap': !hidemap}">

  <header>
    <h1>Database of atmospheric simulation chamber studies</h1>
    <div class="commons">
      <section class="cart">
        <div>{{$t('shoppingCart')}}</div>
        <aeris-catalog-cart :cart-service="cartService" :cart-token="cartToken"></aeris-catalog-cart>
      </section>
      <div class="buttons">
        <slot name="buttons-commons"></slot>
      </div>
    </div>
  </header>

  <aeris-notifier></aeris-notifier>

  <div class="criteria" :lang="lang" :style="{'--criteriaBackgroundColor': criteriaBackgroundColor, '--criteriaContentPrimaryColor': criteriaContentPrimaryColor, '--criteriaContentSecondaryColor': criteriaContentSecondaryColor, '--criteriaHeaderBackgroundColor': criteriaHeaderBackgroundColor, '--criteriaContentBackgroundColor': criteriaContentBackgroundColor, '--criteriaHeaderIconColor': criteriaHeaderIconColor}">
    <aeris-catalog-criteria>
      <slot name="criteria"></slot>
    </aeris-catalog-criteria>
    <div class="buttons">
      <slot name="buttons-criteria"></slot>
    </div>
  </div>

  <aeris-catalog-map class="map" v-if="!hidemap" :hidemap="hidemap">
    <slot name="buttons-map"></slot>
  </aeris-catalog-map>

  <aeris-catalog-summaries class="summaries">
  </aeris-catalog-summaries>

  <aeris-catalogue-metadata-panel class="metadata" v-if="visibleMetadataPanel" :edit="editMetadataPanel" :resourcetitle="currentTitle" :icon-class="currentIconClass" :metadata-service="metadataService" :uuid="currentUuid" :type="currentType" :metadata="currentMetadata"
    :client-template="currentTemplate">
    <slot name="buttons-metadata"></slot>
  </aeris-catalogue-metadata-panel>

  <section v-else class="metadata-placeholder">
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
      let metadataParsed = JSON.parse(e.detail.metadata);
      this.currentTitle = metadataParsed.resourceTitle ? JSON.stringify(metadataParsed.resourceTitle) : null;
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
  position: relative;
  display: grid;
  grid-template-columns: 20% 20% 60%;
  grid-template-rows: 48px calc(100% - 48px);
  grid-template-areas:  "header header header"
                        "criteria summaries sheet";
  width: 100%;
  height: 100vh;
  padding: 0;
  background-color: #FAFAFA;
}


[data-aeris-catalog].withMap {
  grid-template-columns: 20% 20% 60%;
  grid-template-rows: 48px var(--heightMap) var(--heightSheet);
  grid-template-areas:    "header header header"
  "criteria summaries map"
  "criteria summaries sheet";
}

[data-aeris-catalog]>header {
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #EEE;
  border-bottom: 1px solid #EEE;
  background: #FFF;
  color: #333;
}

[data-aeris-catalog]>header>h1 {
  font-weight: 400;
  font-size: 1.1em;
  margin: 8px;
}

[data-aeris-catalog] .commons {
  grid-area: commons;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

[data-aeris-catalog] .commons .buttons>div {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}

[data-aeris-catalog] .cart {
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 8px;
  font-weight: 300;
  color: #333;
}

[data-aeris-catalog] .criteria {
    grid-area: criteria;
    position: relative;
}

[data-aeris-catalog] .criteria .buttons {
  grid-area: buttons-criteria;
  position: absolute;
  top: 4px;
  right: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

[data-aeris-catalog] .criteria .buttons>div {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

[data-aeris-catalog] .buttons>div>* {
  margin: 5px;
}

[data-aeris-catalog] .summaries {
    grid-area: summaries;
    position: relative;
}

[data-aeris-catalog] .map {
    grid-area: map;
}

[data-aeris-catalog] .metadata {
    grid-area: sheet;
    width: 100%;
    position: relative;
    overflow: none;
}

[data-aeris-catalog] .metadata-placeholder {
  grid-area: sheet;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 2.2rem;
  font-weight: 300;
}

/* Customised style */

[data-aeris-catalog] .criteria {
  background: var(--criteriaBackgroundColor, #333);
}

[data-aeris-catalog] .aeris-criterion header {
  background: var(--criteriaHeaderBackgroundColor, transparent);
}

[data-aeris-catalog] .aeris-criterion header h4,
[data-aeris-catalog] .aeris-criterion header i {
  color: var(--criteriaHeaderIconColor, #FAFAFA);
}

[data-aeris-catalog] .aeris-criterion article {
  background: var(--criteriaContentBackgroundColor, transparent);
}

[data-aeris-catalog] .aeris-criterion article .aeris-cartouche-container,
[data-aeris-catalog] .aeris-criterion article i,
[data-aeris-catalog] .aeris-criterion article input,
[data-aeris-catalog] .aeris-criterion article label {
  color: var(--criteriaContentPrimaryColor, #FAFAFA);
}

[data-aeris-catalog] .aeris-criterion article .input-container,
[data-aeris-catalog] .aeris-criterion article ::placeholder {
   color: var(--criteriaContentSecondaryColor, #888);
}

[data-aeris-catalog] .aeris-criterion article .aeris-cartouche-container {
  background: transparent;
}

[data-aeris-catalog] .aeris-criterion article .badge {
  color: var(--criteriaBackgroundColor, #21242b);
}
 </style>
