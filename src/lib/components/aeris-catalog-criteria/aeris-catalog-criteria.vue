<template>
<div data-aeris-catalog-criteria>
  <figure>
    <figcaption>
      Criteria
    </figcaption>
    <slot></slot>
  </figure>
</div>
</template>

<script>
export default {

  name: 'aeris-catalog-criteria',

  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },

  data() {
    return {
      aerisThemeListener: null,
      theme: null
    }
  },

  created: function() {
    console.log("aeris-keyword-search-criteria - Creating");
    this.aerisThemeListener = this.handleTheme.bind(this)
    document.addEventListener('aerisTheme', this.aerisThemeListener);
  },

  mounted: function() {
    var event = new CustomEvent('aerisThemeRequest', {});
    document.dispatchEvent(event);
  },

  destroyed: function() {
    document.removeEventListener('aerisTheme', this.aerisThemeListener);
    this.aerisThemeListener = null;
  },

  methods: {
    handleTheme(e) {
      this.theme = e.detail;
      if (this.theme && document.querySelectorAll('[data-aeris-catalog-criteria] .aeris-criterion header h4').length > 0) {
        document.querySelectorAll('[data-aeris-catalog-criteria] .aeris-criterion header h4').forEach(el => el.style.color = this.theme.primary);
      }
    }
  }
}
</script>

<style>
[data-aeris-catalog-criteria] {
  box-sizing: border-box;
  display: block;
  height: 100%;
  overflow-y: auto;
}

[data-aeris-catalog-criteria] figure {
  margin: 0;
  padding: 0;
}

[data-aeris-catalog-criteria] figure figcaption {
  font-weight: 300;
  font-size: 1.2rem;
  margin: 12px;
  color: #FAFAFA;
}

[data-aeris-catalog-criteria] .aeris-criterion {
  padding: 5px;
  width: 100%;
}

[data-aeris-catalog-criteria] .aeris-criterion header {
  display: flex;
  align-items: center;
  margin: 8px;
  cursor: pointer;
  font-weight: 300;
  font-size: 1em;
}

[data-aeris-catalog-criteria] .aeris-criterion header aside {
  display: flex;
  flex-flow: row nowrap;
}

[data-aeris-catalog-criteria] .aeris-criterion header aside i {
  margin-right: 8px;
  transition: 0.3s;
}

[data-aeris-catalog-criteria] .aeris-criterion.showBody header aside i {
  transform: rotate(90deg);
}

[data-aeris-catalog-criteria] .aeris-criterion header h4 {
  margin: 8px;
  font-weight: 300;
  font-size: 1.2em;
  line-height: 1.2;
}

[data-aeris-catalog-criteria] .aeris-criterion header h4 i {
  margin-right: 8px;
}

[data-aeris-catalog-criteria] .aeris-criterion article {
  display: none;
  padding: 10px;
  word-wrap: break-word;
}

[data-aeris-catalog-criteria] .aeris-criterion.showBody article {
  display: block;
  height: 100%;
}
</style>
