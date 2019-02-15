<i18n>
{
  "en": {
    "help": "Help"
  },
  "fr": {
    "help": "Aide"
  }
}
</i18n>

<template>
  <aeris-ui-icon-button
    :text="$t('help')"
    :theme="theme"
    icon="fa-question"
    @click="handleHelp"
  ></aeris-ui-icon-button>
</template>

<script>
import { AerisUiIconButton } from "aeris-commons-components-vjs";

export default {
  name: "aeris-catalogue-help-button",
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
    handleHelp: function() {
      this.$emit("AskForHelp");
    }
  }
};
</script>
