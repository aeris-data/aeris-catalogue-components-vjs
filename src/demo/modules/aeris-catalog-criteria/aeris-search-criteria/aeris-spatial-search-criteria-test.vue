<template>
  <aeris-spatial-search-criteria :theme="theme" language="fr"></aeris-spatial-search-criteria>
</template>

<script>
import AerisSpatialSearchCriteria from "../../../../lib/modules/aeris-catalog-criteria/aeris-search-criteria/aeris-spatial-search-criteria/components/aeris-spatial-search-criteria";
export default {
  components: {
    AerisSpatialSearchCriteria
  },
  data() {
    return {
      theme: {
        primaryColor: "#f39c12",
        secondaryColor: "grey"
      }
    };
  }
};
</script>
