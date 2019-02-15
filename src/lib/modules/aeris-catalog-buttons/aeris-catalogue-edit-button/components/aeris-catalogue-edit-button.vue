<i18n>
{
  "en": {
    "draw": "Draw"
  },
  "fr": {
    "draw": "Tracer"
  }
}
</i18n>

<template>
  <aeris-ui-icon-button
    icon="fa-pencil-square-o"
    :theme="getTheme"
    :iconTheme="getThemeIcon"
    type="icon-button"
    @click="handleClick"
    language="en"
  ></aeris-ui-icon-button>
</template>

<script>
import { AerisUiIconButton } from "aeris-commons-components-vjs";
export default {
  name: "aeris-catalogue-edit-button",

  components: { AerisUiIconButton },

  props: {
    language: {
      type: String,
      default: "en"
    },
    theme: {
      type: Object,
      default: {}
    },
    
  },

  watch: {
    language(value) {
      this.$i18n.locale = value;
    }
  },

  computed: {
    getTheme() {
      if (this.editing) {
        return {
          emphasis: "#f39c12",
          color: "grey"
        };
      } else {
        return {};
      }
    },
    getThemeIcon() {
      if (this.editing) {
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
      editing: false,
    };
  },

  methods: {
    handleStartEdit() {
      this.editing = true;
    },

    handleStopEdit() {
      this.editing = false;
    },

    handleClick() {
      if (!this.editing) {
        this.handleStartEdit();
        this.$emit("startEditEvent");
      } else {
        this.handleStopEdit();
        this.$emit("stopEditEvent");
      }
    }
  }
};
</script>
