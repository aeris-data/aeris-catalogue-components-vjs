<template>
    <div style="padding:40px">
        <aeris-catalogue-search-text-button :theme="theme" lang="en" @CatalogueSearchStart="getEmitParameter"></aeris-catalogue-search-text-button>
        <span v-if="max !== null && min !== null">parametre de la requete search start : min = {{min}}  et max={{max}}</span>
    </div>
</template>

<script>
import AerisCatalogueSearchTextButton from "../../lib/modules/aeris-catalog-buttons/aeris-catalogue-search-text-button/components/aeris-catalogue-search-text-button.vue";

export default {
  components: { AerisCatalogueSearchTextButton },

  data() {
    return {
      min: null,
      max: null,
      theme: {
        emphasis: "#f39c12",
        color: "#fff"
      },
      visible: false
    };
  },

  methods: {
    getEmitParameter(emitParametermin, emitParametermax) {
      this.min = emitParametermin;
      this.max = emitParametermax;
    }
  }
};
</script>