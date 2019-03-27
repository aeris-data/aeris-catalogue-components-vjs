<template>
  <div class="container">
    <div class="coordinate">
      <h3>Coordonnées</h3>
      <span>Nord</span> <input v-model="map.coordinate.north" type="text" /> <span>Sud </span>
      <input v-model="map.coordinate.south" type="text" /> <span>Est </span>
      <input v-model="map.coordinate.east" type="text" /> <span>Ouest</span>
      <input v-model="map.coordinate.west" type="text" />
    </div>
    <div class="map">
      <aeris-catalogue-map
        :hidemap="false"
        :theme="theme"
        v-bind="map"
        @selectionDrawEvent="getSelection"
      ></aeris-catalogue-map>
    </div>
  </div>
</template>

<script>
import AerisCatalogueMap from "../../../lib/modules/aeris-catalog-map/components/aeris-catalog-map";
import AerisCatalogueDrawMapButton from "../../../lib/modules/aeris-catalog-buttons/aeris-catalogue-draw-map-button/components/aeris-catalogue-draw-map-button";
import AerisCatalogueSelectMapButton from "../../../lib/modules/aeris-catalog-buttons/aeris-catalogue-select-map-button/components/aeris-catalogue-select-map-button";
export default {
  components: { AerisCatalogueMap, AerisCatalogueDrawMapButton, AerisCatalogueSelectMapButton },
  data() {
    return {
      theme: {
        primaryColor: "#f39c12",
        secondaryColor: "grey"
      },
      drawIsActive: false,
      selectMapIsActive: true,
      map: {
        coordinate: {
          north: 61.43876749368283,
          south: -24.527134822597787,
          east: 125.77148437500001,
          west: -97.11914062499999
        }
      }
    };
  },

  methods: {
    getSelection(selection) {
      this.map.coordinate.north = selection.north;
      this.map.coordinate.south = selection.south;
      this.map.coordinate.east = selection.east;
      this.map.coordinate.west = selection.west;
    },
    drawMode() {
      (this.drawIsActive = true), (this.selectMapIsActive = false);
    },
    selectMap() {
      (this.drawIsActive = false), (this.selectMapIsActive = true);
    }
  }
};
</script>
<style scoped>
.container {
  display: flex;
  justify-content: space-around;
}
.coordinate {
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.map {
  width: 1200px;
}
</style>
