<template>
  <div>
    <aeris-ui-icon-button
      :theme="getTheme"
      :icon-theme="getThemeIcon"
      icon="fa-mouse-pointer"
      type="icon-button"
      @click="handleClick"
    ></aeris-ui-icon-button>
  </div>
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

  data() {
    return {
      extendedMapMode: false,
      aerisSpatialExtentMapModeListener: null
    };
  },

  methods: {
    handleClick() {
      this.extendedMapMode = true;
      this.$emit("extendedMapMode");
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
