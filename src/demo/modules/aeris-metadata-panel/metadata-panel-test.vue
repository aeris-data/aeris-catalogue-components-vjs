<template>
  <div class="container">
    <div class="nav">
      <input v-model="keyword_request" type="text" placeholder=" ECCAD " />
      <aeris-catalogue-search-button
        :range="{ min: 0, max: 24 }"
        :theme="theme"
        language="fr"
        @click="getParameter"
        @catalogueSearchStart="getEmitParameter"
      ></aeris-catalogue-search-button>
    </div>

    <div v-if="currentSummary" class="core">
      <div class="metadatapanel">
        <aeris-catalogue-metadata-panel
          :summary="currentSummary"
          :theme="theme"
          language="fr"
          icon-class="aeris-icon aeris-icon-unknown"
          metadata-service="https://sedoo.aeris-data.fr/catalogue/rest/metadatarecette/id/"
        >
          <slot name="buttons-metadata" />
        </aeris-catalogue-metadata-panel>
      </div>
      <div class="info">
        <h3>Summary first item (json)</h3>
        <ul v-if="result">
          <li><span> Template : </span>{{ result.clientTemplateName }}</li>
          <li v-if="result.dataProcessingLevel != null"><span>Niveau : </span>{{ result.dataProcessingLevel }}</li>
          <li v-if="result.description != null"><span>Description : </span>{{ result.description.en }}</li>
          <li v-if="result.downloadable != null"><span>Downloadable : </span>{{ result.downloadable }}</li>
          <li v-if="result.id != null"><span>Id : </span>{{ result.id }}</li>
          <li v-if="result.plateformType != null"><span>Plateform Type : </span>{{ result.plateformType }}</li>
          <li v-if="result.projectList != null">
            <span> Project List : </span>
            <ul>
              <li v-for="project in result.projectList" :key="'project' + project">
                UUID = {{ project.aerisProjectUuid }},<br />
                Project name = {{ project.projectName }}
              </li>
            </ul>
          </li>
          <li v-if="result.title != null"><span>Title :</span>{{ result.title.en }}</li>
          <li><span>Type :</span>{{ result.type }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import AerisCatalogueMetadataPanel from "../../../lib/modules/aeris-catalog-metadata-panel/components/aeris-catalog-metadata-panel.vue";
import AerisCatalogueSearchButton from "../../../lib/modules/aeris-catalog-buttons/aeris-catalogue-search-button/components/aeris-catalogue-search-button";
export default {
  name:"metadata-panel-test",
  components: {
    AerisCatalogueMetadataPanel,
    AerisCatalogueSearchButton
  },
  data() {
    return {
      keyword_request: null,
      url: "https://sedoo.aeris-data.fr/catalogue/rest/metadatarecette/request",
      currentSummary: null,
      range: () => {},
      theme: {
        primaryColor: "#0b6bb3",
        secondaryColor: "#f39c12"
      },

      result: {
        clientTemplateName: "",
        dataProcessingLevel: "",
        description: "",
        downloadable: "",
        id: "",
        plateformType: "",
        projectList: null,
        title: "",
        type: ""
      }
    };
  },
  methods: {
    getParameter(value) {
      this.axios
        .post(`${this.url}?range=${this.range.min}-${this.range.max}`, {
          keywords: [this.keyword_request],
          searchOperator: "",
          temporal: { from: "", to: "" },
          userLanguage: "en"
        })
        .then(
          response => {
            console.log("sucess", response);
            this.currentSummary = response.data.results[0];
          },
          response => {
            console.log("error", response);
          }
        );
    },
    getEmitParameter(emitParameter) {
      this.range.min = emitParameter.min;
      this.range.max = emitParameter.max;
      this.getParameter(this.keyword_request);
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  margin: 50px;
}

.nav {
  display: flex;
  align-items: start;
}

input[type="text"] {
  margin-right: 20px;
}

.core {
  display: flex;
  margin: 0 30px;
}
.metadatapanel {
  width: 1100px;
  height: 2000px;
}
.info {
  width: 300px;
  font-size: 10px;
}
h3 {
  height: 30px;
}
span {
  font-weight: bold;
}
</style>
