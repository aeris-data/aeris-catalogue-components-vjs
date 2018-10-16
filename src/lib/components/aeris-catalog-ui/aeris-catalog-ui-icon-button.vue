<template>
<div data-aeris-catalog-ui-icon-button>
  <button type="button" :class='[theme, type, "tooltip"]' :title="title" aria-hidden="true" @click="handleClick">
    <i :class='["fa", icon]'></i>
  </button>
</div>
</template>

<script>
export default {

  name: 'aeris-catalog-ui-icon-button',

  props: {
    title: {
      type: String
    },
    icon: {
      type: String
    },
    theme: {
      type: String
    },
    type: {
      type: String,
      default: "normal"
    }
  },

  data() {
    return {
      aerisThemeListener: null
    }
  },

  created() {
    this.aerisThemeListener = this.handleTheme.bind(this);
    document.addEventListener('aerisTheme', this.aerisThemeListener);
  },

  mounted() {
    document.dispatchEvent(new CustomEvent('aerisThemeRequest', {}));
  },

  destroyed() {
    document.removeEventListener('aerisTheme', this.aerisThemeListener);
    this.aerisThemeListener = null;
  },

  methods: {

    handleTheme: function(theme) {
      if (this.theme == "primary") {
        this.$el.querySelector("button").style.background = theme.detail.emphasis;
      }
    },
    handleClick(e) {
      window.registredAerisElements.includes("aeris-catalog-ui-icon-button") ? null : this.$emit("click");
    }
  }
}
</script>

<style>
[data-aeris-catalog-ui-icon-button] button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  background: #E2E2E2;
  color: #333;
  font-size: 1rem;
  cursor: pointer;
}

[data-aeris-catalog-ui-icon-button] .primary {
  color: #FAFAFA;
}

[data-aeris-catalog-ui-icon-button] .accent {
  background: #F39C12;
  color: #FFF;
}

[data-aeris-catalog-ui-icon-button] button::-moz-focus-inner {
  border: 0;
}

[data-aeris-catalog-ui-icon-button] button:hover {
  filter: brightness(80%);
}
</style>
