<i18n>
{
  "en": {
    "maximize": "Full screen mode",
    "minimize": "Normal screen mode"
  },
  "fr": {
    "maximize": "Mode plein ecran",
    "minimize": "Mode écran normal"
  }
}
</i18n>

<template>
  <div>
    <aeris-ui-icon-button
      v-if="maximize"
      :title="computeTitle"
      icon="fa-expand"
      type="icon-button"
      @click="handleMaximize"
    ></aeris-ui-icon-button>

    <aeris-ui-icon-button
      v-else
      :title="computeTitle"
      icon="fa-compress"
      type="icon-button"
      @click="handleMaximize"
    ></aeris-ui-icon-button>
  </div>
</template>

<script>
import { AerisUiIconButton } from "aeris-commons-components-vjs";

export default {
  name: "aeris-catalogue-maximize-button",

  components: { AerisUiIconButton },

  props: {
    language: {
      type: String,
      default: "en"
    }
  },

  watch: {
    language(value) {
      this.$i18n.locale = value;
    }
  },

  created() {
    this.$i18n.locale = this.language;
  },

  computed: {
    computeTitle: function() {
      if (this.maximize) {
        return this.$i18n.t("maximize");
      } else {
        return this.$i18n.t("minimize");
      }
    }
  },

  data() {
    return {
      maximize: true
    };
  },

  methods: {
    handleMaximize() {
      if (this.maximize) {
        this.maximize = false;
        this.$emit("CatalogueMaximize");
      } else {
        this.maximize = true;
        this.$emit("CatalogueMinimize");
      }
    }
  }
};
</script>
