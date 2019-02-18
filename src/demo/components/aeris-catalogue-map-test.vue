<template>
<div class="container">
    <aeris-catalogue-map :hidemap="false"></aeris-catalogue-map>
</div>
</template>

<script>
import AerisCatalogueMap from "../../lib/modules/aeris-catalog-map/components/aeris-catalog-map.vue";
export default {
  components: { AerisCatalogueMap }
};
</script>
<style scoped>
.container {
  height: 600px;
  width: 1000px;
  margin-right: auto;
  margin-left: auto;
}
</style>
