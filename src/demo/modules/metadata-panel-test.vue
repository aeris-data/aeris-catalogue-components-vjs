<template>
<div class="container">
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
    </template>
 <script>
     
import AerisCatalogueMetadataPanel from "../../lib/modules/aeris-catalog-metadata-panel/components/aeris-catalog-metadata-panel.vue";
export default {
  components: {
    AerisCatalogueMetadataPanel
  },
  data() {
    return {
      currentIconClass: null,
      currentUuid: null,
      currentType: null,
      currentMetadata: null,
      currentTemplate: null,
      currentProjects: null,
      visibleMetadataPanel: false,
      editMetadataPanel: false,
      project:'[{"aerisProjectUuid":"546c0188-772c-4f03-987d-e229f95cb599","projectName":"IAGOS"},{"aerisProjectUuid":"546c0188-772c-4f03-987d-e229f95cb599","projectName":"IAGOS2"},{"aerisProjectUuid":"546c0188-772c-4f03-987d-e229f95cb599","projectName":"IAGOS3"}]' ,

      theme: {
                emphasis: "#F5F5F5",
                color: "#0b6bb3",
              },
    };
  }
};
</script>
data (){

}

