<template>
  <div>
    <aeris-catalogue-select-map-button
      :theme="theme"
      :isActive="visible"
      @extendedMapMode="visible = !visible"
    ></aeris-catalogue-select-map-button>
    <p v-if="visible">emit : select mode actived</p>
    <p v-else>emit : select mode desactived</p>
  </div>
</template>

<script>
import AerisCatalogueSelectMapButton from "../../lib/modules/aeris-catalog-buttons/aeris-catalogue-select-map-button/components/aeris-catalogue-select-map-button.vue";
export default {
  components: { AerisCatalogueSelectMapButton },
  data() {
    return {
      theme: {
        emphasis: "#f39c12",
        color: "#fff"
      },
      visible: false
    };
  }
};
</script>