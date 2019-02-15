<template>
  <div style="padding: 40px">
    <aeris-catalogue-edit-button
      :theme="theme"
      @startEditEvent="visible = !visible"
      @stopEditEvent="visible=false"
      language="en"
    ></aeris-catalogue-edit-button>
    <p v-if="visible">emit : edit mode actived</p>
    <p v-else>emit : edit mode desactived</p>
  </div>
</template>

<script>
import AerisCatalogueEditButton from "../../lib/modules/aeris-catalog-buttons/aeris-catalogue-edit-button/components/aeris-catalogue-edit-button";
export default {
  components: { AerisCatalogueEditButton },
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