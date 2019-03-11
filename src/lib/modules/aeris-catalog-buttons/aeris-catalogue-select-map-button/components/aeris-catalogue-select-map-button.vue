<template>
  <aeris-ui-icon-button
    :theme="getTheme"
    :icon-theme="getThemeIcon"
    icon="fa-mouse-pointer"
    type="icon-button"
    @click="handleClick"
  ></aeris-ui-icon-button>
</template>

<script>
import { AerisUiIconButton } from "aeris-commons-components-vjs";
export default {
  name: "aeris-catalogue-select-map-button",

  components: { AerisUiIconButton },

  props: {
    theme: {
      type: Object,
      default: null
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      extendedMapMode: false
    };
  },

  computed: {
    getTheme() {
      return this.isActive ? { emphasis: this.theme.primaryColor, color: this.theme.secondaryColor } : "";
    },
    getThemeIcon() {
      return {
        color: "white"
      };
    }
  },

  methods: {
    handleClick() {
      this.extendedMapMode = true;
      this.$emit("extendedMapMode");
    }
  }
};
</script>
