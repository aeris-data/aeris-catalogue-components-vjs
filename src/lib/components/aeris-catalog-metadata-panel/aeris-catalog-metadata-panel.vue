<i18n>
{
  "en": {
    "close": "Close",
    "json": "Show JSON",
    "save": "Save",
    "maximize": "Full screen mode",
    "minimize": "Normal screen mode",
    "saving": "Save in progress...",
    "addTitle": "Add a new metadata sheet"
  },
  "fr": {
    "close": "Fermer",
    "json": "Montrer le JSON",
    "save": "Sauver",
    "maximize": "Mode plein écran",
    "minimize": "Mode écran normal",
    "saving": "Sauvegarde en cours...",
    "addTitle": "Ajouter une nouvelle fiche de métadonnées"
  }
}
</i18n>

<template>
<div data-aeris-catalog-metadata-panel>
  <aeris-catalog-ui-confirmation></aeris-catalog-ui-confirmation>
  <aside>
    <aeris-catalog-ui-icon-button icon="fa-expand" @click="switchmode" :title="$t('maximize')" theme="primary" v-if="minimize"></aeris-catalog-ui-icon-button>
    <aeris-catalog-ui-icon-button icon="fa-compress" @click="switchmode" :title="$t('minimize')" theme="primary" v-if="maximize"></aeris-catalog-ui-icon-button>
    <aeris-catalog-ui-icon-button icon="fa-times" :title="$t('close')" @click="broadcastCloseEvent"></aeris-catalog-ui-icon-button>
    <aeris-catalog-ui-icon-button v-show="!edit" icon="fa-code" :title="$t('json')" @click="showJson"></aeris-catalog-ui-icon-button>
    <aeris-catalog-ui-icon-button v-show="edit" icon="fa-floppy-o" theme="primary" @click="sendSaveEvent"></aeris-catalog-ui-icon-button>
    <slot></slot>
  </aside>

  <aeris-catalog-metadata-panel-nav :edit="edit"></aeris-catalog-metadata-panel-nav>

  <section>
    <header>
      <h2>
        <aeris-international-field v-if="resourcetitle" html="true" :lang="lang" :value="resourcetitle"></aeris-international-field>
        <div v-else>{{$t('addTitle')}}</div>
      </h2>
    </header>
    <aeris-metadata :identifier="uuid" lang="fr" :service="idservice" v-if="!edit"></aeris-metadata>
    <md-template-proxy :type="type" :edit="edit" :client-template-name="clientTemplate"></md-template-proxy>
  </section>

</div>
</template>

<script>
export default {

  name: 'aeris-catalogue-metadata-panel',

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
      default: null
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
    this.aerisThemeListener = this.handleTheme.bind(this);
    document.addEventListener('aerisTheme', this.aerisThemeListener);
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
    var event = new CustomEvent('aerisThemeRequest', {});
    document.dispatchEvent(event);

  },

  destroyed() {
    document.removeEventListener('aerisTheme', this.aerisThemeListener);
    this.aerisThemeListener = null;
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
      theme: null,
      aerisThemeListener: null,
      orcid: '',
      maximize: false,
      eurochampDataBlockInitListener: null,
      eurochampDataBlockSetListener: null,
      dataBlocks: new Map()
    }
  },

  updated: function() {},

  methods: {

    handleTheme: function(event) {
      this.theme = event.detail;
      this.ensureTheme();
    },

    ensureTheme: function() {
      if (this.$el && this.$el.querySelectorAll("[data-aeris-catalog-metadata-panel] [class*='aeris-metadata-block'] header>h4>i").length > 0) {
        this.$el.querySelectorAll("[data-aeris-catalog-metadata-panel] [class*='aeris-metadata-block'] header>h4>i").forEach(el => el.style.color = this.theme.primary);
      }
    },

    handleOrcidResponse(e) {
      e.detail.user ? this.orcid = e.detail.user.orcid : null;
    },

    showJson: function() {
      var baseUrl = 'http://jsoneditoronline.org/?url=';
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
  overflow-y: auto;
  padding: 12px;
}

[data-aeris-catalog-metadata-panel]>header {
  color: #333;
  margin-left: 16em;
}

[data-aeris-catalog-metadata-panel]>section>header>h2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  font-size: 1.7em;
  font-weight: 300;
  color: #777;
}

[data-aeris-catalog-metadata-panel]>section {
  padding-left: 17em;
  margin-top: 50px;
}

[data-aeris-catalog-metadata-panel]>aside {
  position: absolute;
  display: flex;
  flex-direction: row;
}

[data-aeris-catalog-metadata-panel]>aside>* {
  margin: 5px;
}

[data-aeris-catalog-metadata-panel] [class*=aeris-metadata-panel] {
  display: flex;
  flex-direction: row;
}

[data-aeris-catalog-metadata-panel] [class*="aeris-metadata-block"] h4 {
  display: flex;
  align-items: center;
  margin: 8px;
  font-weight: 400;
  font-size: 1.1em;
  color: #555;
}

[data-aeris-catalog-metadata-panel] [class*="aeris-metadata-block"] header>h4>i {
  font-size: 2.5em;
  margin-right: 24px;
}

[data-aeris-catalog-metadata-panel] [class*="aeris-metadata-block"] p {
  max-width: 42em;
  font-size: 1em;
  font-weight: 400;
  line-height: 1.6em;
}
</style>
