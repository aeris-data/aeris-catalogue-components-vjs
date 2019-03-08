<template>
  <aeris-platform-search-criteria :theme="theme"> </aeris-platform-search-criteria>
</template>

<script>
import { AerisPlatformSearchCriteria } from "../../../../lib/modules/aeris-catalogue-components";
export default {
  name: "aeris-platform-search-criteria-test",
  components: { AerisPlatformSearchCriteria },
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
