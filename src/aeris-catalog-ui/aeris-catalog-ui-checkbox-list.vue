<template>
<div data-aeris-catalog-ui-checkbox-list>
  <aeris-catalog-ui-checkbox v-for="(value, index) of JSON.parse(items)" :key="typeIndex(index)" :id="typeIndex(index)" :name="value" :label="value"></aeris-catalog-ui-checkbox>
</div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    items: {
      required: true
    }
  },

  methods: {
    typeIndex: function(index) {
      return `${this.name}-${index}`;
    }
  }
}
</script>

<style>
[data-aeris-catalog-ui-checkbox-list] aeris-catalog-ui-checkbox {
  display: flex;
  align-items: center;
  padding: 5px 0;
}
</style>
