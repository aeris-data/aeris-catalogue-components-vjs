<i18n>
{
  "en": {
    "keywords": "Keywords"
  },
  "fr": {
    "keywords": "Mots-clés"
  }
}
</i18n>

<template>
<div data-aeris-keyword-search-criteria>
  <aeris-catalog-search-box id="box" :title="$t('keywords')" header-icon-class="fa fa-terminal" :deployed="deployed">
    <aeris-keyword-search-criteria-content></aeris-keyword-search-criteria-content>
  </aeris-catalog-search-box>
</div>
</template>

<script>
export default {
  props: {
    lang: {
      type: String,
      default: 'en'
    },
    deployed: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value
    }
  },

  destroyed: function() {},

  created: function() {
    this.$i18n.locale = this.lang
  },

  mounted: function() {},

  computed: {

  },

  data() {
    return {}
  },

  updated: function() {},

  methods: {

  }
}
</script>

<style>
[data-aeris-keyword-search-criteria] {
        display: block
    }
    [data-aeris-keyword-search-criteria] .program {
        margin-bottom: 5px
    }
    [data-aeris-keyword-search-criteria] .program .program-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5px
    }
    [data-aeris-keyword-search-criteria] .program .program-header label {
        display: inline-flex;
        justify-content: flex-start;
        align-items: center;
        margin: 2px
    }
    [data-aeris-keyword-search-criteria] .program .program-header .fa {
        cursor: pointer
    }
    [data-aeris-keyword-search-criteria] .collection {
        margin-left: 20px
    }
    [data-aeris-keyword-search-criteria] .icon-input {
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        width: 100%;
        margin-bottom: 10px;
        color: #999
    }

    [data-aeris-keyword-search-criteria] .keyword-input {
    	width: 100%;
    }
 </style>
