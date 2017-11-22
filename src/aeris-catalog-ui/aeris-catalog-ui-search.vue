<template>
<div data-aeris-catalog-ui-search>
  <div ref="selected" class="input-container">
    <i v-if="icon" class="fa fa-search icon" aria-hidden="true" />
    <input type="text" :placeholder="text" @input="typeText" :value="value" @click="openList" @keyup.enter="closeList" />
  </div>
  <aeris-catalog-ui-dropdown v-show="openedList" :value="value" :visible='openedList' :items='JSON.stringify(visibleItems)' @close='closeList' @valueSelected='selectValue'></aeris-catalog-ui-dropdown>
</div>
</template>

<script>
export default {

  name: 'aeris-catalog-ui-search',

  props: {
    items: {
      required: true
    },
    value: {
      required: true
    },
    text: {
      required: true
    },
    icon: {
      required: false,
      default: true
    }
  },

  data() {
    return {
      openedList: false
    }
  },

  computed: {
    list() {
      return JSON.parse(this.items);
    },
    visibleItems() {
      return this.list.filter(item => item.includes(this.value));
    }
  },

  methods: {

    typeText(e) {
      this.openList();
      this.$emit('input', e.target.value);
    },

    openList() {
      this.openedList = true;
    },

    closeList() {
      this.openedList = false;
    },

    selectValue(e) {
      this.closeList();
      this.$emit('valueSelected', e.detail[0]);
    },

  }
}
</script>

<style>
[data-aeris-catalog-ui-search] {
  position: relative;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  user-select: none;
  cursor: default;
}

[data-aeris-catalog-ui-search] .input-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dfdfdf;
}

[data-aeris-catalog-ui-search] input {
  width: 100%;
  box-shadow: none;
  border: none;
  padding: 12px 6px;
  margin: 0;
  font-size: 1rem;
  background: transparent;
  color: #FAFAFA;
}

[data-aeris-catalog-ui-search] input:focus {
  outline: none;
}

[data-aeris-catalog-ui-search] i {
  padding-left: 8px;
  color: #AAA;
}
</style>
