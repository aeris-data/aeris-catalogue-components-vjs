<template>
  <aeris-level-search-criteria :theme="theme"> </aeris-level-search-criteria>
</template>

<script>
import { AerisLevelSearchCriteria } from "../../../../lib/modules/aeris-catalogue-components";
export default {
  name: "aeris-level-search-criteria-test",
  components: { AerisLevelSearchCriteria },
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
