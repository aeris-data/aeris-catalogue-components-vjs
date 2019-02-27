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
        primaryColor: "#F5F5F5",
        emphasis: "#0b6bb3",
        secondaryColor: "#a7a7a7",
        iconColor: "#818181",
        contentPrimaryColor: "grey"
      }
    };
  }
};
</script>
