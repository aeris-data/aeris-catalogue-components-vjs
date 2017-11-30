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
<div data-aeris-catalog-metadata-panel>
  <aeris-catalog-ui-confirmation></aeris-catalog-ui-confirmation>
  <header>
    <h2 class="metadata-panel-title">
      <aeris-international-field html="true" :lang="lang" :value="resourcetitle"></aeris-international-field>
    </h2>
  </header>
  <main>
    <aeris-metadata :identifier="uuid" lang="fr" :service="idservice" v-if="!edit"></aeris-metadata>
    <md-template-proxy :type="type" :edit="edit" :client-template-name="clientTemplate"></md-template-proxy>
    <aside>
      <aeris-catalog-ui-icon-button icon="fa-expand" @click="switchmode" :title="$t('maximize')" v-if="minimize"></aeris-catalog-ui-icon-button>
      <aeris-catalog-ui-icon-button icon="fa-compress" @click="switchmode" :title="$t('minimize')" v-if="maximize"></aeris-catalog-ui-icon-button>
      <aeris-catalog-ui-icon-button icon="fa-times" :title="$t('close')" @click="broadcastCloseEvent"></aeris-catalog-ui-icon-button>
      <aeris-catalog-ui-icon-button v-show="!edit" icon="fa-code" :title="$t('json')" @click="showJson"></aeris-catalog-ui-icon-button>
      <aeris-catalog-ui-icon-button v-show="edit" icon="fa-floppy-o" theme="primary" @click="sendSaveEvent"></aeris-catalog-ui-icon-button>
      <slot></slot>
    </aside>
  </main>
</div>
</template>

<script>
export default {
  props: {
    lang: {
      type: String,
      default: 'en'
    },
    edit: {
      type: Boolean,
      default: false,
      required: true
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
    },
    uuid(value) {
      this.$el.scrollTop = 0;
    },
    edit(value) {
      document.dispatchEvent(new CustomEvent('aerisCatalogueInfoMetadata', {
        detail: {
          uuid: this.uuid,
          edit: value ? value : false
        }
      }));
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
      document.dispatchEvent(new CustomEvent('aerisCatalogueInfoMetadata', {
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
[data-aeris-catalog-metadata-panel] {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  background: #FAFAFA;
}

[data-aeris-catalog-metadata-panel]>header {
  display: flex;
  align-items: center;
  padding: 24px;
}

[data-aeris-catalog-metadata-panel]>header h2 {
  font-weight: 600;
}

[data-aeris-catalog-metadata-panel]>main>aside {
  position: absolute;
  top: 8%;
  right: 4%;
  display: flex;
  flex-direction: row;
}

[data-aeris-catalog-metadata-panel]>main>aside>* {
  margin: 5px;
}
</style>
