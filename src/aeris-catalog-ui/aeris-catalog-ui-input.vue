<template>
<div data-aeris-catalog-ui-input>
  <i v-if="icon" :class="icon"></i>
  <input type="text" :name="name" :aria-label="ariaLabel" :placeholder="placeholder" :value="value" @input="updateValue($event.target.value)" />
</div>
</template>

<script>
export default {

  props: {
    icon: {
      type: String
    },
    name: {
      type: String
    },
    placeholder: {
      type: String
    },
    value: {
      required: true
    },
    ariaLabel: {
      required: true
    }
  },

  methods: {
    updateValue(value) {
      this.$emit('input', value);
    }
  }
}
</script>

<style>
[data-aeris-catalog-ui-input] {
  border-bottom: 1px solid #dfdfdf;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

[data-aeris-catalog-ui-input] input {
  width: 100%;
  border-style: none;
  border: none;
  outline: none;
  padding: 12px;
  font-size: 1rem;
  color: white;
  background: transparent;
}

[data-aeris-catalog-ui-input] i {
  padding: 10px;
  color: #555;
  font-size: 1.1rem;
}
</style>
