<i18n>
{
  "en": {
    "reset": "Reset"
  },
  "fr": {
    "reset": "Réinitialiser"
  }
}
</i18n>

<template>
  <aeris-ui-icon-button
    :title="$t('reset')"
    :theme="theme"
    icon="fa-eraser"
    type="icon-button"
    @click="handleReset"
  ></aeris-ui-icon-button>
</template>

<script>
import { AerisUiIconButton } from "aeris-commons-components-vjs";

export default {
  name: "aeris-catalogue-reset-button",

  components: { AerisUiIconButton },

  props: {
    language: {
      type: String,
      default: "en"
    },
    theme: {
      type: Object,
      default: null
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

  methods: {
    handleReset() {
      this.$emit("catalogueReset");
    }
  }
};
</script>
