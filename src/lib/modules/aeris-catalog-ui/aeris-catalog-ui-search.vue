<template>
  <div data-aeris-catalog-ui-search>
    <aeris-catalog-ui-input
      ref="selected"
      :aria-label="ariaLabel"
      :placeholder="text"
      :value="value"
      type="text"
      @input="typeText"
      @click="openList"
      @keyup.enter="closeList"
    ></aeris-catalog-ui-input>
    <aeris-catalog-ui-dropdown
      v-show="openedList"
      :value="value"
      :visible="openedList"
      :items="JSON.stringify(visibleItems)"
      @close="closeList"
      @valueSelected="selectValue"
    ></aeris-catalog-ui-dropdown>
  </div>
</template>

<script>
export default {
  name: "aeris-catalog-ui-search",

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
    },
    ariaLabel: {
      required: true
    }
  },

  data() {
    return {
      openedList: false
    };
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
      this.$emit("input", e.target.value);
    },

    openList() {
      this.openedList = true;
    },

    closeList() {
      this.openedList = false;
    },

    selectValue(e) {
      this.closeList();
      this.$emit("valueSelected", e.detail[0]);
    }
  }
};
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
</style>
