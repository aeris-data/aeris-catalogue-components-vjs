<template>
  <div style="padding:40px">
    <aeris-catalogue-reset-button
      :theme="theme"
      language="en"
      @catalogueReset="visible = !visible"
    ></aeris-catalogue-reset-button>
    <p v-if="visible">emit : reset des criteres éffectué</p>
  </div>
</template>
<script>
import AerisCatalogueResetButton from "../../../../lib/modules/aeris-catalog-buttons/aeris-catalogue-reset-button/components/aeris-catalogue-reset-button";

export default {
  components: { AerisCatalogueResetButton },

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
