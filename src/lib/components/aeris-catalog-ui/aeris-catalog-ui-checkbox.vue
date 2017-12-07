<template>
<div data-aeris-catalog-ui-checkbox>
  <input type="checkbox" :id="id" :name="name" :value="value" @change="$emit('change', $event.target.value)">
  <label :for="id" class="program-name-row">{{label}}</label>
</div>
</template>

<script>
export default {

  name: 'aeris-catalog-ui-checkbox',

  props: {
    value: {
      default: false
    },
    label: {
      required: true
    },
    id: {
      type: String
    },
    name: {
      type: String
    }
  }
}
</script>

<style>
[data-aeris-catalog-ui-checkbox] input {
  margin-right: 15px;
}
</style>
