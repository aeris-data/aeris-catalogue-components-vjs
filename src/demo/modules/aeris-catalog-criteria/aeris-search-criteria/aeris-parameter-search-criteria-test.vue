<template>
  <aeris-parameter-search-criteria :theme="theme"> </aeris-parameter-search-criteria>
</template>

<script>
import { AerisParameterSearchCriteria } from "../../../../lib/modules/aeris-catalogue-components";
export default {
  name: "aeris-parameter-search-criteria-test",
  components: { AerisParameterSearchCriteria },
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
