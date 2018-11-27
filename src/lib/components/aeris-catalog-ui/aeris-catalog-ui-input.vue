<template>
<div data-aeris-catalog-ui-input class="input-container">
  <i v-if="icon" :class="icon"></i>
  <input type="text" :name="name" :aria-label="ariaLabel" :placeholder="placeholder" :value="value" @input="updateValue($event.target.value)" autofocus/>
</div>
</template>

<script>
export default {

  name: 'aeris-catalog-ui-input',

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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid;
}

[data-aeris-catalog-ui-input] input {
  width: 100%;
  border-style: none;
  border: none;
  outline: none;
  padding: 12px;
  font-size: 1rem;
  background: transparent;
}

[data-aeris-catalog-ui-input] input:focus {
  outline: none;
}

[data-aeris-catalog-ui-input] i {
  padding: 10px;
  font-size: 1.1rem;
}
</style>
