<template>
<div data-aeris-catalog-criteria>
  <slot></slot>
</div>
</template>

<script>
export default {
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
  overflow-y: scroll;
  background: #21242b;
}

[data-aeris-catalog-criteria] span {
  font-weight: 300;
  color: white;
}

[data-aeris-catalog-criteria] .aeris-datepicker-host,
[data-aeris-catalog-criteria] .aeris-datepicker-host span {
  color: #333;
}

[data-aeris-catalog-criteria] h3 {
  font-size: 1rem;
  font-weight: 400;
}
</style>
