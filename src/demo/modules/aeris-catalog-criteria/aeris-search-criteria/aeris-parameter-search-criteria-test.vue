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
        primaryColor: "#0b6bb3",
        secondaryColor: "#fff"
      }
    };
  }
};
</script>
