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
  <div class="data-aeris-catalog-metadata-panel">
    <header>
      <h2 class="metadata-panel-title">
        <aeris-international-field
          v-if="resourcetitle"
          :language="language"
          :value="resourcetitle"
          :html="true"
        ></aeris-international-field>
        <div v-else>{{ $t("addTitle") }}</div>
      </h2>
      <div class="data-aeris-metadata-panel-project-list">
       
          <div class="cartouche" :style="getCartoucheTheme" v-for="project in projectsList"  :key="project.projectName">
            
           <a :href="projectLandingPage(project.aerisProjectUuid)" target="_blank">
            <span> {{ project.projectName }}</span></a>
          </div>
       
      </div>
      <aside >
        <aeris-ui-icon-button
          v-if="minimize"
          :title="$t('maximize')"
          icon="fa-expand"
          @click="switchmode"
          type="icon-button"
           :theme="theme"
        ></aeris-ui-icon-button>
        <aeris-ui-icon-button
          v-if="maximize"
          :title="$t('minimize')"
          icon="fa-compress"
          @click="switchmode"
          type="icon-button"
           :theme="theme"
        ></aeris-ui-icon-button>
        <aeris-ui-icon-button
          :title="$t('close')"
          icon="fa-times"
          @click="broadcastCloseEvent"
          type="icon-button"
           :theme="theme"
        ></aeris-ui-icon-button>
        <aeris-ui-icon-button
          v-show="!edit"
          :title="$t('json')"
          icon="fa-code"
          @click="showJson"
          type="icon-button"
           :theme="theme"
        ></aeris-ui-icon-button>
        <aeris-ui-icon-button
          v-show="edit"
          icon="fa-floppy-o"
          @click="sendSaveEvent"
          type="icon-button"
           :theme="theme"
        ></aeris-ui-icon-button>
        <slot/>
      </aside>
    </header>
    <main>

 <aeris-metadata-services v-if="!edit" :identifier="uuid" :service="idservice" language="fr" @metadata ="updateMetadata"></aeris-metadata-services>
 <!--  <component  :is="template" :metadata="metadataValue"></component>
   <md-template-proxy :type="type" :edit="edit" :client-template-name="clientTemplate" :metadata="metadataValue"></md-template-proxy>  -->

  <template >
    <md-template-gmos-time-series-metadata></md-template-gmos-time-series-metadata>
  </template>
   </main>
  </div>
</template>

<script>
import {AerisUiIconButton} from "aeris-commons-components-vjs"
import {AerisMetadataServices} from "aeris-metadata-components-vjs"
import {EurochampComponents} from "gmos-metadata-components-vjs"
import MdTemplateProxy from '../../aeris-catalog-layouts/aeris-metadata-template/components/md-template-proxy.vue'
import AerisInternationalField from "../../aeris-international-field/components/aeris-international-field.vue"
import MdTemplateCollection from "../../aeris-catalog-layouts/aeris-metadata-template/components/md-template-collection"

export default {
  name: "aeris-catalogue-metadata-panel",

components:{AerisUiIconButton,
            AerisMetadataServices,
            MdTemplateProxy,
            AerisInternationalField,
            MdTemplateCollection},

  props: {
    language: {
      type: String,
      default: "en"
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
    },
    theme:{
      type:Object,
      default:()=>{}
    }
  },

  watch: {
    language(value) {
      this.$i18n.locale = value;
    },
    uuid(value) {
      this.$el.scrollTop = 0;
    },
    edit(value) {
      document.dispatchEvent(
        new CustomEvent("aerisCatalogueInfoMetadata", {
          detail: {
            uuid: this.uuid,
            edit: value ? value : false
          }
        })
      );
    }
  },


  created() {
    this.$nextTick(() => {
      document.dispatchEvent(
        new CustomEvent("aerisCatalogueInfoMetadata", {
          detail: {
            uuid: this.uuid,
            edit: this.edit
          }
        })
      );
    });
  },

  mounted() {
  

    if (this.language) {
      this.$i18n.locale = this.language;
    }
  },

  computed: {
    getCartoucheTheme(){
      if (true) {
      
        return {
          background: "blue"
        };
      } else {
        return "";
      }
    },
    idservice() {
      var result = this.metadataService;
      /* if (this.metadataService.endsWith("/")) {
        result = result + "id";
      } else {
        result = result + "/id";
      } */
      console.log("service url metadata",result)
      return result;
    },

    minimize() {
      return !this.maximize;
    },

      projectsList() {
        console.log("this.project  :" , this.projects)
      let toto=  this.projects ? JSON.parse(this.projects) : "";
      console.log("toto", toto)
      return toto
    }
  },

  data() {
    return {
      template: MdTemplateCollection,
      maximize: false,
      metadataValue:null,
      
    };
  },

  methods: {
    
      updateMetadata(metadata) {
        console.log ("update metadata : ", metadata)
      this.metadataValue = metadata;
      this.updateTemplate()
    },
    displayValue(value){
      console.log("v-for :", value)
    },
    showJson() {
      var baseUrl = "http://jsoneditoronline.org/?url=";
      var url = baseUrl + this.metadataService  + this.uuid;
      console.log("url json : ", url)
      window.open(url, "_blank", "toolbar=no, status=no, scrollbars=no, menubar=no, width=1000, height=800");
    },

    broadcastCloseEvent() {
      this.forceNormalMode();
      console.log("aerisCatalogueHideMetadata event");
      var event = new CustomEvent("aerisCatalogueHideMetadata", {
        detail: {}
      });
      document.dispatchEvent(event);
    },

    forceNormalMode() {
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

    switchmode() {
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
      document.dispatchEvent(
        new CustomEvent("eurochampSaveEvent", {
          detail: {
            loadingMessage: this.$i18n.t("saving")
          }
        })
      );
    },
    updateTemplate(){
      if(this.metadataValue){
        let templateName= "md-template-" + this.metadataValue.type.toLowerCase()
       templateName = templateName.replace(/_/g, '-');
        console.log("template name : ", "<"+templateName+"></"+templateName+">")
        return "<"+templateName+"></"+templateName+">"
      }
    },
   

    projectLandingPage: function(projectId) {
      console.log("projectId",projectId)
      return "https://www.aeris-data.fr/project/" + projectId;
    }
  }
};
</script>

<style scoped>
.data-aeris-catalog-metadata-panel {
  --gap: 12px;
  --heightHeader: 80px;
  height: 100%;
  background: #ddd;
}

.data-aeris-catalog-metadata-panel > header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
  background: #fafafa;
  color: #333;
}

.data-aeris-catalog-metadata-panel > header .data-aeris-metadata-panel-project-list {
  display: flex;
  flex-direction: row;
}

.data-aeris-catalog-metadata-panel > header .cartouche  {
  display: inline-block;
  margin-bottom: 5px;
  padding: 4px 5px 3px;
  border-radius: 5px;
  color: red;
}
.data-aeris-catalog-metadata-panel > header .cartouche a {
  color: #fafafa;
}

.data-aeris-catalog-metadata-panel > header .cartouche{
  margin-left: 5px;
}

.data-aeris-catalog-metadata-panel > header h2 {
  font-weight: 300;
}

.data-aeris-catalog-metadata-panel > header  aside {
  display: flex;
  flex-direction: row;
  
}

 .data-aeris-catalog-metadata-panel  > header  aside *{
  margin: 5px;
}
 
.data-aeris-catalog-metadata-panel > main {
  height: calc(100% - var(--heightHeader));
  overflow-y: auto;
}

.data-aeris-catalog-metadata-panel [data-template^="metadata-panel"] {
  padding: var(--gap) var(--gap) 0 var(--gap);
}

.data-aeris-catalog-metadata-panel [data-template^="metadata-panel"] [data-template^="metadata-block"] {
  border-radius: 2px;
  margin-bottom: var(--gap);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: #fafafa;
}

.data-aeris-catalog-metadata-panel [data-template="metadata-panel"] {
  column-count: 2;
  column-gap: var(--gap);
  column-fill: balance;
  -moz-column-fill: balance;
}

.data-aeris-catalog-metadata-panel [data-template="metadata-panel"] [data-template="metadata-block"] {
  break-inside: avoid;
}
</style>
