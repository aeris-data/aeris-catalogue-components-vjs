<template>
  <div :class="[getSelectedClass]">
    <aeris-catalog-ui-icon-button
      :theme="getTheme"
      :key="select - map - button"
      icon="fa-mouse-pointer"
      @click="handleClick"
    ></aeris-catalog-ui-icon-button>
  </div>
</template>

<script>
export default {
  name: "aeris-catalogue-select-map-button",

  destroyed: function() {
    document.removeEventListener("aerisSpatialExtentMapMode", this.aerisSpatialExtentMapModeListener);
    this.aerisSpatialExtentMapModeListener = null;
  },

  created: function() {
    console.log("aeris-catalogue-select-map-button creation");
    this.aerisSpatialExtentMapModeListener = this.aerisSpatialExtentMapModeHandle.bind(this);
    document.addEventListener("aerisSpatialExtentMapMode", this.aerisSpatialExtentMapModeListener);
  },

  computed: {
    getSelectedClass() {
      if (!this.drawModeSelected) {
        return "selected";
      } else {
        return "";
      }
    },
    getTheme() {
      if (!this.drawModeSelected) {
        return "primary";
      } else {
        return "disabled";
      }
    }
  },

  data() {
    return {
      drawModeSelected: false,
      aerisSpatialExtentMapModeListener: null
    };
  },

  updated: function() {},

  methods: {
    handleClick() {
      this.drawModeSelected = false;
      document.dispatchEvent(new CustomEvent("aerisSpatialExtentMapMode", { detail: false }));
    },
    aerisSpatialExtentMapModeHandle(e) {
      this.drawModeSelected = e.detail;
    }
  }
};
</script>

<style scoped>
div {
  padding: 2px;
}
.selected {
  border-radius: 50%;
  background-color: #fafafa;
}
</style>
