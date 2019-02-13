<template>
  <div>
    <aeris-ui-icon-button
      :theme="getTheme"
      :icon-theme="getThemeIcon"
      icon="fa-pencil-square-o"
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
    iconTheme: {
      color: "green"
    },
    isActive: {
      type: Boolean,
      default: false
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
        return "";
      }
    },
    getThemeIcon() {
      if (this.isActive) {
        return {
          color: "grey"
        };
      } else {
        return {
          color: "white"
        };
      }
    }
  },

  data() {
    return {
      drawModeSelected: false,
      aerisSpatialExtentMapModeListener: null,
      themevalue: null,
      iconThemeValue: null
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
