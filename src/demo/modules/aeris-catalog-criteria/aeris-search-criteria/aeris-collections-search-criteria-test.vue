<template>
  <aeris-collection-search-criteria :theme="theme"> </aeris-collection-search-criteria>
</template>

<script>
import { AerisCollectionSearchCriteria } from "../../../../lib/modules/aeris-catalogue-components";
export default {
  name: "aeris-collection-search-criteria-test",
  components: { AerisCollectionSearchCriteria },
  data() {
    return {
      theme: {
        primaryColor: "#0b6bb3",
        secondaryColor: "#fff"
      }
    };
  }
};
</script>
