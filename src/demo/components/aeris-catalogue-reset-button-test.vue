<template>
<div>
    <aeris-catalogue-reset-button lang="en" :theme="theme" @CatalogueReset="visible= !visible"></aeris-catalogue-reset-button>
    <p v-if="visible">emit : draw mode actived</p>
</div>
</template>

<script>

import AerisCatalogueResetButton from "../../lib/modules/aeris-catalog-buttons/aeris-catalogue-reset-button/components/aeris-catalogue-reset-button.vue";

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
