<template>
  <div>
    <aeris-ui-icon-button
      :theme="getTheme"
      :icon-theme="getThemeIcon"
      icon="fa-edit"
      type="icon-button"
      @click="handleClick"
    ></aeris-ui-icon-button>
  </div>
</template>

<script>
import { AerisUiIconButton } from "aeris-commons-components-vjs";
export default {
  name: "aeris-catalogue-draw-map-button",

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

  computed: {
    getTheme() {
      return this.isActive ? { emphasis: "#f39c12", color: "grey" } : {};
    },
    getThemeIcon() {
      return { color: "white" };
    }
  },

  data() {
    return {
      drawModeSelected: false
    };
  },

  methods: {
    handleClick() {
      this.drawModeSelected = true;
      this.$emit("drawModeSelected");
    }
  }
};
</script>

<style scoped>
.selected {
  background-color: #fafafa;
  color: white;
}
</style>
