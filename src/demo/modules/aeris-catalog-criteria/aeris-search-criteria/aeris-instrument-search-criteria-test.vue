<template>
  <aeris-instrument-search-criteria :theme="theme"> </aeris-instrument-search-criteria>
</template>

<script>
import { AerisInstrumentSearchCriteria } from "../../../../lib/modules/aeris-catalogue-components";
export default {
  name: "aeris-instrument-search-criteria-test",
  components: { AerisInstrumentSearchCriteria },
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
