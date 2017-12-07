<template>
<div data-aeris-catalog-criteria>
  <slot></slot>
</div>
</template>

<script>
export default {

  name: 'aeris-catalog-criteria',

  props: {
    lang: {
      type: String,
      default: 'en'
    },
    visible: {
      type: Boolean,
      default: true
    },
  },

  watch: {},

  destroyed: function() {},

  created: function() {},

  mounted: function() {},

  computed: {},

  data() {
    return {}
  },

  updated: function() {},

  methods: {}
}
</script>

<style>
[data-aeris-catalog-criteria] {
  box-sizing: border-box;
  display: block;
  height: 100%;
  overflow-y: auto;
}

[data-aeris-catalog-criteria] span {
  font-weight: 300;
}

[data-aeris-catalog-criteria] h3 {
  font-size: 1rem;
  font-weight: 400;
}
</style>
