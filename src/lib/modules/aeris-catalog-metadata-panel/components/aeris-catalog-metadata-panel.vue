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
  <div :style="getCartoucheTheme" class="data-aeris-catalog-metadata-panel">
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
          :max-length="100"
        ></aeris-international-field>
        <div v-else>{{ $t("addTitle") }}</div>
      </h2>
      <nav class="data-aeris-metadata-panel-project-list">
        <a
          v-for="project in summary.projectList"
          :key="project.projectName"
          :href="projectLandingPage(project.aerisProjectUuid)"
          class="cartouche"
          target="_blank"
        >
          {{ project.projectName }}
        </a>
      </nav>
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
      return this.theme ? { "--bg-cartouche": this.theme.primaryColor } : "";
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
* {
  box-sizing: border-box;
}
.data-aeris-catalog-metadata-panel {
  --heightHeader: 67.5px;
  height: 100%;
  width: 100%;
  background: #ddd;
  padding: 10px;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
  background: #fff;
  color: #333;
  height: var(--heightHeader, 67.5px);
  width: 100%;
}

header h2 {
  font-weight: 400;
  font-size: 22px;
}

.data-aeris-metadata-panel-project-list {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.cartouche {
  display: inline-block;
  margin: 2px;
  background-color: var(--bg-cartouche, #0b6bb3);
  color: #fafafa;
  text-decoration: none;
  border-radius: 5px;
  padding: 3px 10px;
  font-size: 0.85rem;
}

.cartouche:hover {
  background: #222;
  color: #fff;
}

main {
  height: calc(100% - var(--heightHeader));
  padding: 20px 10px;
}
</style>
