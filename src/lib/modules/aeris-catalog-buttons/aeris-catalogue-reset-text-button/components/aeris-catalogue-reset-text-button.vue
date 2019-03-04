<i18n>
{
  "en": {
    "reset": "Reset",
    "reset_tooltip": "Reset selection"
  },
  "fr": {
    "reset": "Effacer",
    "reset_tooltip": "Effacer la sélection"
  }
}
</i18n>

<template>
  <aeris-ui-icon-button
    :title="$t('reset_tooltip')"
    :text="$t('reset')"
    icon="fa-trash"
    :theme="theme"
    @click="handleReset"
  ></aeris-ui-icon-button>
</template>
<script>

import {AerisUiIconButton} from "aeris-commons-components-vjs"

export default {

  name: "aeris-catalogue-reset-text-button",

  components:{AerisUiIconButton},

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
