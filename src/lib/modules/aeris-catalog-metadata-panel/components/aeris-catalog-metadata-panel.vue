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
    <aeris-metadata-services
      :identifier="summary.id"
      :service="idService"
      :language="language"
      @metadata="updateMetadata"
    ></aeris-metadata-services>
    <header>
      <h2 class="metadata-panel-title">
        <aeris-international-field
          v-if="summary.title"
          :language="language"
          :value="summary.title"
          :html="true"
          :max-length="100"
        ></aeris-international-field>
        <div v-else>{{ $t("addTitle") }}</div>
      </h2>
      <div class="data-aeris-metadata-panel-project-list">
        <div
          v-for="project in summary.projectList"
          :style="getCartoucheTheme"
          :key="project.projectName"
          class="cartouche"
        >
          <a :href="projectLandingPage(project.aerisProjectUuid)" target="_blank">{{ project.projectName }}</a>
        </div>
      </div>
      <aside>
        <aeris-ui-icon-button
          v-if="minimize"
          :title="$t('maximize')"
          :theme="theme"
          icon="fa-expand"
          type="icon-button"
          @click="switchmode"
        ></aeris-ui-icon-button>
        <aeris-ui-icon-button
          v-if="maximize"
          :title="$t('minimize')"
          :theme="theme"
          icon="fa-compress"
          type="icon-button"
          @click="switchmode"
        ></aeris-ui-icon-button>
        <aeris-ui-icon-button
          :title="$t('close')"
          :theme="theme"
          icon="fa-times"
          type="icon-button"
          @click="broadcastCloseEvent"
        ></aeris-ui-icon-button>
        <aeris-ui-icon-button
          :title="$t('json')"
          :theme="theme"
          icon="fa-code"
          type="icon-button"
          @click="showJson"
        ></aeris-ui-icon-button>
        <slot />
      </aside>
    </header>
    <main>
      <component
        v-if="metadataValue"
        :is="getTemplate"
        :metadata="metadataValue"
        :theme="theme"
        :language="language"
      ></component>
    </main>
  </div>
</template>

<script>
import MdTemplateCollection from "../../aeris-catalog-layouts/aeris-metadata-template/components/md-template-collection";
import { AerisUiIconButton } from "aeris-commons-components-vjs";
import { AerisMetadataServices } from "aeris-metadata-components-vjs";
import AerisInternationalField from "../../aeris-international-field/components/aeris-international-field.vue";

export default {
  name: "aeris-catalogue-metadata-panel",

  components: {
    AerisUiIconButton,
    AerisMetadataServices,
    AerisInternationalField,
    MdTemplateCollection
  },

  props: {
    language: {
      type: String,
      default: "en"
    },
    summary: {
      type: Object,
      default: () => {}
    },
    iconClass: {
      type: String,
      default: ""
    },
    metadataService: {
      type: String,
      default: ""
    },

    theme: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      template: null,
      maximize: false,
      metadataValue: null
    };
  },
  watch: {
    language(value) {
      this.$i18n.locale = value;
    }
  },

  mounted() {
    if (this.language) {
      this.$i18n.locale = this.language;
    }
  },

  computed: {
    getTemplate() {
      return this.template;
    },
    getCartoucheTheme() {
      if (this.theme) {
        return {
          background: this.theme.primaryColor
        };
      } else {
        return "";
      }
    },
    idService() {
      return this.metadataService;
    },

    minimize() {
      return !this.maximize;
    }
  },

  methods: {
    updateMetadata(metadata) {
      this.updateTemplate();
      this.metadataValue = metadata;
    },
    showJson() {
      let baseUrl = "http://jsoneditoronline.org/?url=";
      let url = baseUrl + this.metadataService + this.summary.id;
      window.open(url, "_blank", "toolbar=no, status=no, scrollbars=no, menubar=no, width=1000, height=800");
    },

    broadcastCloseEvent() {
      this.$store.commit("setSelectedSummaryId", null);
    },

    forceNormalMode() {
      this.maximize = false;
      if (document.mozCancelFullScreen) {
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
        let elem = this.$el;
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

    updateTemplate() {
      let templateName;
      if (this.type !== "COLLECTION") {
        templateName = "Md-template-" + this.summary.type.toLowerCase();
        templateName = templateName.replace(/_/g, "-");
        templateName = templateName.replace(/-([a-z])/g, g => {
          return g[1].toUpperCase();
        });
      }

      if (!this.$options.components[templateName]) {
        templateName = MdTemplateCollection;
      }

      this.template = templateName;
    },

    projectLandingPage(projectId) {
      return "https://www.aeris-data.fr/project/" + projectId;
    }
  }
};
</script>

<style scoped>
.data-aeris-catalog-metadata-panel {
  --gap: 0px;
  --heightHeader: 80px;
  height: 100%;
  width: 100%;
  background: #ddd;
  padding: 10px;
  box-sizing: border-box;
}

.data-aeris-catalog-metadata-panel > header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
  background: #fff;
  color: #333;
  height: var(--heightHeader, 80px);
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 20px;
}

.data-aeris-catalog-metadata-panel > header .data-aeris-metadata-panel-project-list {
  display: flex;
  flex-direction: row;
}

.data-aeris-catalog-metadata-panel > header .cartouche {
  display: inline-block;
  margin-bottom: 5px;
  border-radius: 5px;
  color: red;
}
.data-aeris-catalog-metadata-panel > header .cartouche a {
  color: #fafafa;
  text-decoration: none;
  border-radius: 5px;
  padding: 3px 10px;
  font-size: 0.85rem;
}

.data-aeris-catalog-metadata-panel > header .cartouche {
  margin-left: 5px;
}

.data-aeris-catalog-metadata-panel > header h2 {
  font-weight: 400;
  font-size: 22px;
}

.data-aeris-catalog-metadata-panel > header aside {
  display: flex;
  flex-direction: row;
}

.data-aeris-catalog-metadata-panel > header aside * {
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
