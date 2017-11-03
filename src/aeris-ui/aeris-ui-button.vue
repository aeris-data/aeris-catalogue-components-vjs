<template>
<div class="aeris-ui-button-host">
  <button type="button" :class='["button", theme]'>
    {{text}}
  </button>
</div>
</template>

<script>
export default {

  name: 'aeris-ui-button',

  props: {
    theme: {
      type: String
    },
    text: {
      type: String
    }
  }
}
</script>

<style>
.aeris-ui-button-host .button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  border-radius: 0.3rem;
  width: 8rem;
  height: 2.5rem;
  background: #ddd;
  color: #444;
  font-size: 1rem;
  cursor: pointer;
}

.aeris-ui-button-host .accent {
  background: #F39C12;
  color: #FFF;
}

.aeris-ui-button-host .button::-moz-focus-inner {
  border: 0;
}
</style>
