<i18n>
{
  "en": {
    "close": "Close",
    "json": "Show JSON",
    "save": "Save",
    "maximize": "Full screen mode",
    "minimize": "Normal screen mode",
    "saving": "Save in progress..."
  },
  "fr": {
    "close": "Fermer",
    "json": "Montrer le JSON",
    "save": "Sauver",
    "maximize": "Mode plein écran",
    "minimize": "Mode écran normal",
    "saving": "Sauvegarde en cours..."
  }
}
</i18n>

<template>
<span class="aeris-catalog-metadata-panel-host">


  <aside id="metadataPanel" class="metadata-panel" :class="{maximize: maximize, minimize: minimize}">

    <aeris-ui-confirmation></aeris-ui-confirmation>

    <nav class="metadata-panel-header">
      <span class="metadata-panel-title">
          <span  :class="iconClass"   v-show="iconClass"></span>
      <h2 class="metadata-panel-title">
            <aeris-international-field html="true" :lang="lang" :value="resourcetitle"></aeris-international-field>
          </h2>
      </span>
      <i class="fa fa-times" @click="broadcastCloseEvent" :title="$t('close')"></i>
    </nav>
    <div id="metadataPanelContent" class="metadata-panel-content">

      <aeris-metadata :identifier="uuid" lang="fr" :service="idservice" v-if="!edit"></aeris-metadata>
      <md-template-proxy :type="type" :edit="edit" :client-template-name="clientTemplate"></md-template-proxy>
    </div>
    <footer class="metadata-panel-footer">
      <i class="fa fa-expand metadata-footer-icon" @click="switchmode" :title="$t('maximize')" v-if="minimize"></i>
      <i class="fa fa-times metadata-footer-icon" @click="broadcastCloseEvent" :title="$t('close')"></i>
      <i class="fa fa-compress metadata-footer-icon" @click="switchmode" :title="$t('minimize')" v-if="maximize"></i>
      <i class="fa fa-code metadata-footer-icon" @click="showJson" :title="$t('json')" v-show="!edit"></i>
      <i class="fa fa-floppy-o metadata-footer-icon" :title="$t('save')" v-show="edit" @click="sendSaveEvent()"></i>
      <slot></slot>
    </footer>
  </aside>
</span>
</template>

<script>
export default {
  props:
  {
    lang: {
      type: String,
      default: 'en'
    },
    edit: {
      type: Boolean,
      default: false
    },
    resourcetitle: {
      type: String,
      default: ""
    },
    iconClass: {
      type: String,
      default: ""
    },
    uuid: {
      type: String,
      default: ""
    },
    metadataService: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    metadata: {
      required: true
    },
    clientTemplate: {
        type: String,
    	default: ""
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value
    }
  },

  created() {
    this.eurochampDataBlockInitListener = this.initDataBlock.bind(this);
    document.addEventListener('eurochampDataBlockInitEvent', this.eurochampDataBlockInitListener);
    this.eurochampDataBlockSetListener = this.setDataBlock.bind(this);
    document.addEventListener('eurochampDataBlockSetEvent', this.eurochampDataBlockSetListener);
    this.aerisOrcidListener = this.handleOrcidResponse.bind(this);
    document.addEventListener('aerisOrcidResponse', this.aerisOrcidListener);

    this.$nextTick(function() {
      document.dispatchEvent(new CustomEvent('aerisCatalogueMetadataRendered', {
        detail: {
          uuid: this.uuid,
          edit: this.edit
        }
      }));
    })
  },

  mounted: function() {
    if (this.lang) {
      this.$i18n.locale = this.lang
    }
    document.dispatchEvent(new CustomEvent('aerisOrcidRequest', {}));
  },

  destroyed() {
    document.removeEventListener('eurochampDataBlockInitEvent', this.eurochampDataBlockInitListener);
    this.eurochampDataBlockInitListener = null;
    document.removeEventListener('eurochampDataBlockSetEvent', this.eurochampDataBlockSetListener);
    this.eurochampDataBlockSetListener = null;
    document.removeEventListener('aerisOrcidResponse', this.aerisOrcidListener);
    this.aerisOrcidListener = null;
  },

  computed: {
    idservice: function() {
      var result = this.metadataService;
      if (this.metadataService.endsWith("/")) {
        result = result + "id"
      } else {
        result = result + "/id"
      }
      return result;
    },

    minimize: function() {
      return !this.maximize
    }
  },

  data() {
    return {
      orcid: '',
      maximize: false,
      eurochampDataBlockInitListener: null,
      eurochampDataBlockSetListener: null,
      dataBlocks: new Map()
    }
  },

  updated: function() {},

  methods: {

    handleOrcidResponse(e) {
      e.detail.user ? this.orcid = e.detail.user.orcid : null;
    },

    showJson: function() {
      var baseUrl = 'http://www.jsoneditoronline.org/?url=';
      var url = baseUrl + this.metadataService + "id/" + this.uuid;
      window.open(url, '_blank', 'toolbar=no, status=no, scrollbars=no, menubar=no, width=1000, height=800');
    },

    broadcastCloseEvent: function() {
      this.forceNormalMode()
      console.log("aerisCatalogueHideMetadata event")
      var event = new CustomEvent('aerisCatalogueHideMetadata', {
        detail: {}
      });
      document.dispatchEvent(event);
    },

    forceNormalMode: function() {
      this.maximize = false;
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

    switchmode: function() {
      if (this.minimize) {
        this.maximize = true;
        var elem = this.$el;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        }
      } else {
        this.forceNormalMode();
      }
    },

    sendSaveEvent() {
      document.dispatchEvent(new CustomEvent('eurochampSaveEvent', {
        detail: {
          metadata: {}
        }
      }));
    },

    initDataBlock(e) {
      this.dataBlocks = this.dataBlocks.set(e.detail.name, undefined);
    },

    setDataBlock(e) {

      this.dataBlocks = this.dataBlocks.set(e.detail.name, e.detail);
      delete e.detail.name;
      Array.from(this.dataBlocks.values()).every(value => value != undefined) ? this.handleSave() : null;
    },

    handleSave() {

      let newMetadata = Array.from(this.dataBlocks.values()).reduce((acc, current) => Object.assign({}, acc, current.metadata), JSON.parse(this.metadata));
      let existingFiles = Array.from(this.dataBlocks.values()).reduce((acc, current) => current.existingFiles ? acc.concat(current.existingFiles) : acc, new Array());
      let newFiles = Array.from(this.dataBlocks.values()).reduce((acc, current) => current.newFiles ? acc.concat(current.newFiles) : acc, new Array());

      let formData = new FormData();
      formData.append("metadata", JSON.stringify(newMetadata));
      existingFiles.forEach(file => formData.append("existingfiles", file));
      newFiles.forEach((file, index) => formData.append("newfiles", file, file.name));

      document.dispatchEvent(new CustomEvent('aerisLongActionStartEvent', {
        'detail': {
          message: this.$t('saving')
        }
      }));

      this.$http.post(`${this.metadataService}save?orcid=${this.orcid}`, formData)
        .then(response => {
          document.dispatchEvent(new CustomEvent('aerisLongActionStopEvent', {
            'detail': {
              message: this.$t('saving')
            }
          }));
          this.broadcastCloseEvent();
        }, response => document.dispatchEvent(new CustomEvent('aerisLongActionStopEvent', {
          'detail': {
            message: this.$t('saving')
          }
        })));
    }
  }
}
</script>

<style>
.aeris-catalog-metadata-panel-host .metadata-panel.minimize {
  width: 800px;
}

.aeris-catalog-metadata-panel-host .metadata-panel.maximize {
  width: 100%;
}

.aeris-catalog-metadata-panel-host .metadata-panel {
  display: flex;
  flex-direction: column;
  z-index: 100;
  background-color: #fafafa;
  overflow: hidden;
  cursor: default;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.6);
  transform: translate3d(0, 0, 0);
  transition: opacity 0.4s, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1), width 0.3s ease-in-out 0.3s, height 0.3s ease-in-out 0.3s;
}

.aeris-catalog-metadata-panel-host .metadata-panel.fullscreen {
  z-index: 12;
  width: 100vw;
  max-width: 100vw;
  height: 100%;
  transform: translate3d(320px, -5vh, 0);
}

.aeris-catalog-metadata-panel-host .metadata-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 10px;
  border-bottom: 1px solid #ddd;
  height: 4rem;
}

.aeris-catalog-metadata-panel-host .metadata-panel-header i {
  cursor: pointer;
  color: #888;
  opacity: 0.5;
}

.aeris-catalog-metadata-panel-host .metadata-panel-header i:hover {
  opacity: 1;
}

.aeris-catalog-metadata-panel-host .metadata-panel-header .metadata-panel-title {
  display: flex;
  align-items: center;
  color: #000
}

.aeris-catalog-metadata-panel-host .metadata-panel-header .metadata-panel-title h2 {
  display: inline;
  margin: 0 10px;
  padding: 5px 0;
}

.aeris-catalog-metadata-panel-host .metadata-panel-content {
  max-height: calc(100vh - 13rem);
  padding: 10px 10px 0px 10px;
  overflow-y: auto;
  overflow-x: hidden;
  transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1) 0s;
}

.aeris-catalog-metadata-panel-host .metadata-panel-footer {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4rem;
  border-top: 1px solid #ddd;
  background-color: #fafafa;
}

.aeris-catalog-metadata-panel-host h2.metadata-panel-title {
  font-weight: normal
}

.aeris-catalog-metadata-panel-host .metadata-panel-footer div{
  display: flex;
  flex-direction: row;
}

.aeris-catalog-metadata-panel-host .metadata-panel-footer .metadata-footer-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin: 0 5px;
  border: 1px solid;
  border-radius: 50%;
  color: #bbb;
  cursor: pointer;
}

.aeris-catalog-metadata-panel-host .metadata-panel-footer .metadata-footer-icon:hover {
  animation-name: pop;
  animation-duration: 0.3s;
}
</style>
