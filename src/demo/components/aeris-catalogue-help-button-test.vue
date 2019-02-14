<template>
<div>
    <aeris-catalogue-help-button :theme="theme" @AskForHelp="visible = !visible" lang="en"></aeris-catalogue-help-button>
    <p v-if="visible">emit : please help</p>
    </div>
</template>
<script>
import AerisCatalogueHelpButton from "../../lib/modules/aeris-catalog-buttons/aeris-catalogue-help-button/components/aeris-catalogue-help-button.vue";
export default {
  components: { AerisCatalogueHelpButton },

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
