<template>
  <div style="padding:40px">
    <aeris-catalogue-search-text-button
      :range="{ min: 0, max: 24 }"
      :theme="theme"
      language="fr"
      @catalogueSearchStart="getEmitParameter"
    ></aeris-catalogue-search-text-button>
    <span v-if="max !== null && min !== null">
      paramètre de la requête search start : min = {{ min }} et max={{ max }}
    </span>
  </div>
</template>

<script>
import AerisCatalogueSearchTextButton from "../../../../lib/modules/aeris-catalog-buttons/aeris-catalogue-search-text-button/components/aeris-catalogue-search-text-button.vue";

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
    getEmitParameter(emitParameter) {
      this.min = emitParameter.min;
      this.max = emitParameter.max;
    }
  }
};
</script>
