<template>
  <div>
    <aeris-catalogue-select-map-button
      :theme="theme"
      :is-active="visible"
      @extendedMapMode="visible = !visible"
    ></aeris-catalogue-select-map-button>
    <p v-if="visible">emit : select mode actived</p>
    <p v-else>emit : select mode desactived</p>
  </div>
</template>

<script>
import AerisCatalogueSelectMapButton from "../../../../lib/modules/aeris-catalog-buttons/aeris-catalogue-select-map-button/components/aeris-catalogue-select-map-button";
export default {
  components: { AerisCatalogueSelectMapButton },
  data() {
    return {
      theme: {
        primaryColor: "#f39c12",
        secondaryColor: "grey"
      },
      visible: false
    };
  }
};
</script>
