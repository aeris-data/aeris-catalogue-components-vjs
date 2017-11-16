<i18n>
{
  "en": {
    "searching": "Searching...",
    "foundresults": "Found results: ",
    "noresult": "No result corresponding to your request"
  },
  "fr": {
    "searching": "Recherche...",
    "foundresults": "Résultat trouvés: ",
    "noresult": "Aucun résultat ne correspond à votre requête"
  }
}
</i18n>
<template>
<div class="aeris-catalog-host" style="background:white">
  <div class="app-container">
    <aeris-notifier></aeris-notifier>
    <aeris-catalog-criteria :lang="lang">
      <slot name="criteria"></slot>
    </aeris-catalog-criteria>
    <aeris-catalog-map :hidemap="hidemap">
      <slot name="buttons"></slot>
    </aeris-catalog-map>
    <span class="cart-bar" :style="{width:summaryBarWidth}">
			Your shopphing cart:
			<aeris-catalog-cart :cart-service="cartService" :cart-token="cartToken" ></aeris-catalog-cart>
		</span>
    <aeris-catalog-summaries :bar-width="summaryBarWidth" :summary-max-length="summaryMaxLength"></aeris-catalog-summaries>
    <div class="subpanel" style="position:absolute;z-index:10;" :style="{marginRight: summaryBarWidth, right:metadataPanelRightMargin, top:metadataPanelTopMargin}">
      <aeris-catalogue-metadata-panel v-if="visibleMetadataPanel" :edit="editMetadataPanel" :resourcetitle="currentTitle" :icon-class="currentIconClass" :metadata-service="metadataService" :uuid="currentUuid" :type="currentType" :metadata="currentMetadata"
        :client-template="currentTemplate">
        <slot name="metadatafooter"></slot>
      </aeris-catalogue-metadata-panel>
    </div>
  </div>
</div>
</template>

<script>
export default {
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

    summaryBarWidth: {
      type: String,
      default: "400px"
    },

    summaryMaxLength: {
      type: Number,
      default: "150"
    },

    metadataPanelTopMargin: {
      type: String,
      default: "10px"

    },

    metadataPanelRightMargin: {
      type: String,
      default: "10px"

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

  computed: {},

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
      this.editMetadataPanel = true;
      this.currentEditedMetadata = e.detail
      if (e.detail.type) {
        this.currentType = e.detail.type
      } else {
        this.currentType = ''
      }
      this.currentMetadata = e.detail.metadata ? e.detail.metadata : null;
      this.currentUuid = e.detail.metadata ? e.detail.metadata.uuid : null;
      this.visibleMetadataPanel = true;
    },

    hideMetadataPanel: function() {
      this.visibleMetadataPanel = false;
      this.editMetadataPanel = false;
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

..aeris-vcal-day.month-calendar {
    display: inline-block;
    width: 30px;
    text-align: center;
    vertical-align: top;
    cursor: pointer;
    position: relative;
    z-index: 100;
}

.aeris-catalog-host {
	/*box-sizing: border-box;*/
	position: relative;
	display: block;
	width: 100%;
	height: 100vh;
	margin: 0;
	font-family: 'Open Sans', sans-serif;
	line-height: 1.2;
	overflow: hidden;
}

.aeris-catalog-host * {
	/*box-sizing: border-box;*/
}

@keyframes pop {
	0% {
		transform: scale(1);
	}

	70% {
		transform: scale(1.2);
	}

	100% {
		transform: scale(1);
	}
}

.aeris-catalog-host aeris-catalog-criteria,
.aeris-catalog-host aeris-catalog-map{
	position: absolute;
	z-index: 10;
}

.aeris-catalog-host aeris-catalog-criteria,
.aeris-catalog-host aeris-catalog-map {
	top: 0;
	height: 100vh;
}

.aeris-catalog-host aeris-catalog-criteria {
	left: 0;
	box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
}

.aeris-catalog-host .search-criteria-content {
	position: relative;
	height: 100vh;
	padding-right: 20px;
	overflow: auto;
}

.aeris-catalog-host aeris-catalog-map {
	left: 300px;
	width: calc(100% - 300px);
}


.aeris-catalog-host .flex-summaries {
	display: flex;
}


.aeris-catalog-host .catalog-search-button:hover,
.aeris-catalog-host .catalog-reset-button:hover,
.aeris-catalog-host .catalog-more-button:hover,
.aeris-catalog-host .catalog-collapse-button:hover,
.aeris-catalog-host .catalog-fullscreen-button:hover,
.aeris-catalog-host .catalog-help-button:hover,
.aeris-catalog-host .catalog-draw-button:hover {
	cursor: pointer;
	background-color: var(--search-button-hover-color, #4765a0);
}

.aeris-catalog-host .catalog-search-button {
	top: 10px;
}

.aeris-catalog-host .catalog-search-button .mask {
	display: none;
	cursor: initial;
}

.aeris-catalog-host .catalog-search-button.disabled .mask {
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(120, 120, 120, 0.8);
	border-radius: 50%;
}

.aeris-catalog-host .catalog-reset-button {
	top: 70px;
}

.aeris-catalog-host .catalog-more-button {
	top: 150px;
}

.aeris-catalog-host .catalog-draw-button {
	top: 210px;
}

.aeris-catalog-host .more-button:hover .catalog-collapse-button,
.aeris-catalog-host .more-button:hover .catalog-fullscreen-button,
.aeris-catalog-host .more-button:hover .catalog-help-button {
	z-index: 12;
	transform: translateY(0);
	transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0s, z-index 0s ease 0.3s;
}

.aeris-catalog-host .catalog-collapse-button,
.aeris-catalog-host .catalog-fullscreen-button,
.aeris-catalog-host .catalog-help-button {
	z-index: 10;
	top: 160px;
	width: 25px;
	height: 25px;
	font-size: 12px;
	background-color: var(--search-button-color, #4765a0);
	transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.8s, background-color 0.3s;
}

.aeris-catalog-host .catalog-collapse-button:hover,
.aeris-catalog-host .catalog-fullscreen-button:hover,
.aeris-catalog-host .catalog-help-button:hover {
	background-color: var(--search-button-hover-color, #4765a0);
	transform: translateX(0);
}

.aeris-catalog-host .catalog-collapse-button {
	left: 75px;
	transform: translateX(-50px);
}

.aeris-catalog-host .catalog-collapse-button:hover {
	transform: translateX(0);
}

.aeris-catalog-host .catalog-collapse-button i {
	transition: transform 0.3s;
}

.aeris-catalog-host .catalog-collapse-button i.rotate {
	transform: rotate(180deg);
}

.aeris-catalog-host .catalog-help-button {
	left: 110px;
	transform: translateX(-85px);
}

.aeris-catalog-host .catalog-fullscreen-button {
	left: 145px;
	transform: translateX(-120px);
}


.aeris-catalog-host .cart-bar {
	position: relative;
	/*top: 0;
	right: 0;*/
	float: right;
	z-index: 12;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 0px;
	height: 40px;
	width: 300px;
background-color: #f5f5f5;
}

@media screen and (max-height: 800px) {
	.aeris-catalog-host aeris-catalog-criteria,
  .aeris-catalog-host aeris-catalog-map {
		top: 0;
		height: 100vh;
	}

	.aeris-catalog-host .search-criteria-content {
		height: 100vh;
	}

	.aeris-catalog-host .metadata-panel {
		height: 90vh;
	}
}
 </style>
