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
    :icon-theme="getThemeIcon"
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
    lang: {
      type: String,
      default: "en"
    },
    theme: {
      type: Object,
      default: null
    }
  },
  computed: {
    getTheme() {
      if (this.isActive) {
        return {
          emphasis: "#f39c12",
          color: "grey"
        };
      } else {
        return {};
      }
    },
    getThemeIcon() {
      if (this.isActive) {
        return {
          color: "white"
        };
      } else {
        return {
          color: "white"
        };
      }
    }
  },
  watch: {
    lang(value) {
      this.$i18n.locale = value;
    }
  },

  created() {
    this.$i18n.locale = this.lang;
  },

  methods: {
    handleHelp: function() {
      this.$emit("AskForHelp");
    }
  }
};
</script>
