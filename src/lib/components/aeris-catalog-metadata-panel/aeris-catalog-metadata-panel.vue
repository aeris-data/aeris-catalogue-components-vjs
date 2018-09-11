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
  <header>
    <h2 class="metadata-panel-title">
      <aeris-international-field v-if="resourcetitle" html="true" :lang="lang" :value="resourcetitle"></aeris-international-field>
      <div v-else>{{$t('addTitle')}}</div>
    </h2>
    <div data-aeris-metadata-panel-project-list>
      <ul class="cartouche">
        <li v-for="project in projectsList" :key="project.projectName">
          <component :is="project.aerisProjectUuid?'a':'span'" :href="projectLandingPage(project.aerisProjectUuid) || ''" target="_blank">{{project.projectName}}</component>
        </li>  
      </ul>
    </div>
    <aside>
      <aeris-catalog-ui-icon-button icon="fa-expand" @click="switchmode" :title="$t('maximize')" v-if="minimize"></aeris-catalog-ui-icon-button>
      <aeris-catalog-ui-icon-button icon="fa-compress" @click="switchmode" :title="$t('minimize')" v-if="maximize"></aeris-catalog-ui-icon-button>
      <aeris-catalog-ui-icon-button icon="fa-times" :title="$t('close')" @click="broadcastCloseEvent"></aeris-catalog-ui-icon-button>
      <aeris-catalog-ui-icon-button v-show="!edit" icon="fa-code" :title="$t('json')" @click="showJson"></aeris-catalog-ui-icon-button>
      <aeris-catalog-ui-icon-button v-show="edit" icon="fa-floppy-o" theme="primary" @click="sendSaveEvent"></aeris-catalog-ui-icon-button>
      <slot></slot>
    </aside>
  </header>
  <main>
    <aeris-metadata :identifier="uuid" lang="fr" :service="idservice" v-if="!edit"></aeris-metadata>
    <md-template-proxy :type="type" :edit="edit" :client-template-name="clientTemplate"></md-template-proxy>
  </main>
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
    },
    projects: {
      type: String,
      default: null
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

  destroyed: function() {
    document.removeEventListener('aerisTheme', this.aerisThemeListener);
    this.aerisThemeListener = null;
  },

  created() {    
    this.aerisThemeListener = this.handleTheme.bind(this)
    document.addEventListener('aerisTheme', this.aerisThemeListener);
    
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
    var event = new CustomEvent('aerisThemeRequest', {});
    document.dispatchEvent(event);

    if (this.lang) {
      this.$i18n.locale = this.lang
    }
  },

  updated: function() {
    this.ensureTheme()
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
    },

    projectsList: function() {
      return this.projects ? JSON.parse(this.projects) : "";
    }
  },

  data() {
    return {
      theme: null,
      maximize: false
    }
  },

  methods: {

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
          loadingMessage: this.$i18n.t('saving')
        }
      }));
    },

    handleTheme: function(theme) {
      this.theme = theme.detail
      this.ensureTheme()
    },

    ensureTheme: function() {
      if (this.theme) {
        let cartoucheList = document.querySelectorAll("[data-aeris-catalog-metadata-panel]>header .cartouche li");
        cartoucheList.forEach(element => {
          element.style.background = this.theme.primary;
        });
      }
    },

    projectLandingPage: function(projectId) {
      return "https://www.aeris-data.fr/project/" + projectId;
    }
  }
}
</script>

<style>
[data-aeris-catalog-metadata-panel] {
  --gap: 12px;
  --heightHeader: 80px;
  height: 100%;
  background: #DDD;
}

[data-aeris-catalog-metadata-panel]>header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
  background: #FAFAFA;
  color: #333;
}

[data-aeris-catalog-metadata-panel]>header [data-aeris-metadata-panel-project-list] {
  display: flex;
  flex-direction: row;
}

[data-aeris-catalog-metadata-panel]>header .cartouche li {
  	display: inline-block;
    margin-bottom: 5px;
    padding: 4px 5px 3px;
    border-radius: 5px;
    color: #FAFAFA;
}
[data-aeris-catalog-metadata-panel]>header .cartouche li a {
  color: #FAFAFA;
}

[data-aeris-catalog-metadata-panel]>header .cartouche li + li {
    margin-left: 5px;
}

[data-aeris-catalog-metadata-panel]>header h2 {
  font-weight: 300;
}

[data-aeris-catalog-metadata-panel]>header>aside {
  display: flex;
  flex-direction: row;
}

[data-aeris-catalog-metadata-panel]>header>aside>* {
  margin: 5px;
}

[data-aeris-catalog-metadata-panel]>main {
  height: calc(100% - var(--heightHeader));
  overflow-y: auto;
}

[data-aeris-catalog-metadata-panel] [data-template^="metadata-panel"] {
  padding: var(--gap) var(--gap) 0 var(--gap);
}

[data-aeris-catalog-metadata-panel] [data-template^="metadata-panel"] [data-template^="metadata-block"] {
  border-radius: 2px;
  margin-bottom: var(--gap);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: #FAFAFA;
}

[data-aeris-catalog-metadata-panel] [data-template="metadata-panel"] {
  column-count: 2;
  column-gap: var(--gap);
  column-fill: balance;
  -moz-column-fill: balance;
}

[data-aeris-catalog-metadata-panel] [data-template="metadata-panel"] [data-template="metadata-block"] {
  break-inside: avoid;
}
</style>
