<template>
<div class="container">
  
<div class="nav">
 <input type="text" placeholder="full text"/>
 <aeris-catalogue-search-button  @click="getParameter" :range="{min:0,max:24}" :theme="theme" language="fr" @catalogueSearchStart="getEmitParameter" ></aeris-catalogue-search-button>
</div>

<div class="side">
<div class="metadatapanel">
    <aeris-catalogue-metadata-panel
      language="fr"
      :edit="editMetadataPanel"
      :resourcetitle="'{&quot;en&quot;:&quot;IAGOS Climatologies&quot;,&quot;fr&quot;:&quot;Climatologies IAGOS&quot;}'"
      icon-class="aeris-icon aeris-icon-unknown"
      metadata-service="https://sedoo.aeris-data.fr/catalogue/rest/metadatarecette/id/"
      uuid="de8bd81e-5025-4153-b0d0-bbdd35771b99"
      
      :metadata="currentMetadata"
      client-template=""
      :projects="project"
      data-sheet="content"
    >
      <slot name="buttons-metadata" />
    </aeris-catalogue-metadata-panel>
</div>

<h3>  Response first item</h3>
<ul v-if="result" >

  <li><h5> template : </h5>{{result.clientTemplateName}}</li>
  <li><h5>Niveau : </h5>{{result.dataProcessingLevel}}</li>
  <li><h5>Description : </h5>{{result.description.fr}}</li>
  <li><h5>Downloadable : </h5>{{result.downloadable}}</li>
  <li><h5>Id :</h5>{{result.id}}</li>
  <li><h5>Plateform Type : </h5>{{result.plateformType}}
  </li>
  <li><h5> Project List : </h5>
     <ul>
      <li v-for="project in result.projectList" :key="'project'+project"> UUID = {{project.aerisProjectUuid}},<br> Project name = {{project.projectName}}</li>
    </ul>
  </li>
  <li><h5>Title :</h5>{{result.title.fr}}</li>
  <li><h5>Type :</h5>{{result.type}}</li>
</ul>

    
</div>
</div>
    </template>
 <script>
     
import AerisCatalogueMetadataPanel from "../../lib/modules/aeris-catalog-metadata-panel/components/aeris-catalog-metadata-panel.vue";
import AerisCatalogueSearchButton from "../../lib/modules/aeris-catalog-buttons/aeris-catalogue-search-button/components/aeris-catalogue-search-button"
export default {
  components: {
    AerisCatalogueMetadataPanel,
    AerisCatalogueSearchButton
    
  },
  data() {
    return {
      result: null,
      url:"https://sedoo.aeris-data.fr/catalogue/rest/metadatarecette/request",
      currentIconClass: null,
      currentUuid: null,
      currentType: null,
      currentMetadata: null,
      currentTemplate: null,
      currentProjects: null,
      visibleMetadataPanel: false,
      editMetadataPanel: false,
      project:'[{"aerisProjectUuid":"546c0188-772c-4f03-987d-e229f95cb599","projectName":"IAGOS"},{"aerisProjectUuid":"546c0188-772c-4f03-987d-e229f95cb599","projectName":"IAGOS2"},{"aerisProjectUuid":"546c0188-772c-4f03-987d-e229f95cb599","projectName":"IAGOS3"}]' ,
      range: ()=>{},
      theme: {
                emphasis: "#F5F5F5",
                color: "#0b6bb3",
              },
    };
  },
  methods:{
    getParameter() {
      console.log("getparameter")
      this.axios.post(
            `${this.url}?range=${this.range.min}-${this.range.max}`,{"keywords":["iagos"],"searchOperator":"","temporal":{"from":"","to":""},"userLanguage":"fr"}
          )
          .then(
            response => {
              console.log("sucess",response) //this.handleSuccess(response, range);
             this.result= response.data.results[0]
            },
            response => {
             console.log("error",response) //this.handleError(response);
            }
          );
    },
    getEmitParameter(emitParameter){
      console.log("emit")
        this.range.min = emitParameter.min
        this.range.max = emitParameter.max
        this.getParameter()
        }
  }
};
</script>

<style scoped>
.container {
  display :flex;
  justify-content: space-between
  
}
.nav {
  width: 200px;
  height: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: start;
}

button {
 border: 0;
 font-weight: bold;
 font-size:15px;
 padding: 5px;
 width:120px;
 border-radius: 10%;
 height:40px;
 background: #efefef;
 box-shadow: none;
 border-radius: 0px;
}
.side{
  display:flex;
  width:2000px;
}
 .metadatapanel {
   width:1000px;
   height: 1000px;
   margin: 0 auto;
 } 
 ul{
   width:500px;
 }
 h3 {
   height:30px;
 }
</style>


