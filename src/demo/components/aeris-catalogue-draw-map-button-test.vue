<template>
  <div>
    <aeris-catalogue-draw-map-button
      :theme="theme"
      :is-active="visible"
      :icon-theme="iconTheme"
      @drawModeSelected="visible = !visible"
    ></aeris-catalogue-draw-map-button>
    <p v-if="visible">emit : draw mode actived</p>
    <p v-else>emit : draw mode desactived</p>
  </div>
</template>

<script>
import AerisCatalogueDrawMapButton from "../../lib/modules/aeris-catalog-buttons/aeris-catalogue-draw-map-button/components/aeris-catalogue-draw-map-button.vue";
export default {
  components: { AerisCatalogueDrawMapButton },
  data() {
    return {
      theme: {
        emphasis: "#f39c12",
        color: "#fff"
      },
      iconTheme: {
        color: "green"
      },
      visible: false
    };
  }
};
</script>
