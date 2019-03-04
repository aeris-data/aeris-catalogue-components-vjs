<template>
  <div style="padding:40px">
    <aeris-catalogue-maximize-button
      lang="en"
      @catalogueMaximize="maximize = true"
      @catalogueMinimize="minimize = true"
    ></aeris-catalogue-maximize-button>
    <p v-if="maximize">emit maximize: des pouvoirs cosmique phénoménaux</p>
    <p v-if="minimize">emit minimize: dans un vrais mouchoir de poche</p>
  </div>
</template>
<script>
import AerisCatalogueMaximizeButton from "../../../../lib/modules/aeris-catalog-buttons/aeris-catalogue-maximize-button/components/aeris-catalogue-maximize-button";
export default {
  components: { AerisCatalogueMaximizeButton },
  data() {
    return {
      maximize: false,
      minimize: false
    };
  }
};
</script>
