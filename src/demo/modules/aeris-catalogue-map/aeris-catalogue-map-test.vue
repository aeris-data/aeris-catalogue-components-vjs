
<template>

<div class="container">

    <aeris-catalogue-map :hidemap="false">
      <aeris-catalogue-draw-map-button :theme="theme"
      :is-active="drawIsActive"
      @drawModeSelected="drawMode" slot="draw" ></aeris-catalogue-draw-map-button>
          <aeris-catalogue-select-map-button :theme="theme"
      :is-active="selectMapIsActive"
      @extendedMapMode="selectMap" slot="select"></aeris-catalogue-select-map-button>
    </aeris-catalogue-map>
</div>
</template>

<script>
import AerisCatalogueMap from "../../../lib/modules/aeris-catalog-map/components/aeris-catalog-map";
import AerisCatalogueDrawMapButton from "../../../lib/modules/aeris-catalog-buttons/aeris-catalogue-draw-map-button/components/aeris-catalogue-draw-map-button"
import AerisCatalogueSelectMapButton from "../../../lib/modules/aeris-catalog-buttons/aeris-catalogue-select-map-button/components/aeris-catalogue-select-map-button"
export default {
  components: { AerisCatalogueMap,AerisCatalogueDrawMapButton,AerisCatalogueSelectMapButton },
  data() {
    return {
      theme: {
        primaryColor: "#f39c12",
        secondaryColor: "grey"
      },
      drawIsActive: false,
      selectMapIsActive:true
      
    };
  },
  methods :{
    
    drawMode(){
    this.drawIsActive=true,
    this.selectMapIsActive=false
  },
   selectMap(){
     this.drawIsActive=false,
     this.selectMapIsActive=true
   }
  
  }
};
</script>
<style scoped>
.container {
  height: 600px;
  width: 1000px;
  margin-right: auto;
  margin-left: auto;
}
</style>
