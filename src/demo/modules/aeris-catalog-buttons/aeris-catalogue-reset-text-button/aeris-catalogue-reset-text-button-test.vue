<template>
    <div style="padding:40px">
        <aeris-catalogue-reset-text-button :theme="theme" language="en" @catalogueReset="visible=!visible"></aeris-catalogue-reset-text-button>
        <p v-if="visible">emit : reset des criteres effectué </p>
    </div>
</template>

<script>
import AerisCatalogueResetTextButton from "../../../../lib/modules/aeris-catalog-buttons/aeris-catalogue-reset-text-button/components/aeris-catalogue-reset-text-button";
export default {
  components: { AerisCatalogueResetTextButton },

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

