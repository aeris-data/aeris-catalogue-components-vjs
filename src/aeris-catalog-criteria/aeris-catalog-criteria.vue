<template>
<div data-aeris-catalog-criteria>
  <div class="criteria-bar">
    <div class="criteria-content">
      <slot></slot>
    </div>
  </div>

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
  width: 300px;
  height: 100%;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.3);
}

.criteria-content {
  width: 100%;
  height: 100%;
  overflow: auto
}
</style>
