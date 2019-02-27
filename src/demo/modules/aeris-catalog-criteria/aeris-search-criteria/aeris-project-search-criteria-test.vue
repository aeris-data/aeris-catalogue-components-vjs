<template>
  <aeris-project-search-criteria :theme="theme"> </aeris-project-search-criteria>
</template>

<script>
import { AerisProjectSearchCriteria } from "../../../../lib/modules/aeris-catalogue-components";
export default {
  name: "aeris-platform-search-criteria-test",
  components: { AerisProjectSearchCriteria },
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
