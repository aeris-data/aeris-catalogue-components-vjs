<template>
<div data-aeris-catalog-ui-button>
  <button type="button" :class='[theme]'>
    <i v-if="icon" :class='["fa", icon]' :aria-hidden="true"></i>
    {{text}}
  </button>
</div>
</template>

<script>
export default {

  name: 'aeris-catalog-ui-button',

  props: {
    icon: {
      type: String
    },
    theme: {
      type: String
    },
    text: {
      type: String
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
    }
  }
}
</script>

<style>
[data-aeris-catalog-ui-button] button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  border-radius: 0.5rem;
  padding: 16px;
  background: #ddd;
  color: #444;
  font-size: 1rem;
  cursor: pointer;
}

[data-aeris-catalog-ui-button] button i {
  margin-right: 10px;
}

[data-aeris-catalog-ui-button] .primary {
  color: #FAFAFA;
}

[data-aeris-catalog-ui-button] .accent {
  background: #333;
  color: #FFF;
}

[data-aeris-catalog-ui-button] button::-moz-focus-inner {
  border: 0;
}

[data-aeris-catalog-ui-button] button:hover {
  filter: brightness(80%);
}
</style>
