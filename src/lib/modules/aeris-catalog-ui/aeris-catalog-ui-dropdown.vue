<template>
  <div data-aeris-catalog-ui-dropdown>
    <ul ref="list" :style="listStyle" @wheel="scrollList">
      <li v-for="item in list" :class="{ active: item == value }" @click="selectValue($event, item)">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "aeris-catalog-ui-dropdown",

  props: ["items", "visible", "value"],

  data() {
    return {
      listStyle: null
    };
  },

  computed: {
    list() {
      return JSON.parse(this.items);
    }
  },

  watch: {
    visible(value) {
      if (value) {
        document.dispatchEvent(new CustomEvent("click", this.close));
        document.addEventListener("click", this.close);
        document.addEventListener("wheel", this.close);
        let toggleElement = this.$el.parentNode.previousSibling.previousSibling;
        this.listStyle = !(window.innerHeight - toggleElement.getBoundingClientRect().top > window.innerHeight / 2)
          ? {
              width: `${toggleElement.clientWidth}px`,
              bottom: `${toggleElement.clientHeight}px`
            }
          : {
              width: `${toggleElement.clientWidth}px`
            };
      }
    }
  },

  methods: {
    selectValue(e, value) {
      this.$emit("valueSelected", value);
    },

    scrollList(e) {
      e.stopPropagation();
      (e.deltaY < 0 && this.$refs.list.scrollTop == 0) ||
      (e.deltaY > 0 && this.$refs.list.scrollTop + this.$refs.list.clientHeight == this.$refs.list.scrollHeight)
        ? e.preventDefault()
        : null;
    },

    close() {
      this.$emit("close");
      document.removeEventListener("click", this.close);
      document.removeEventListener("wheel", this.close);
    }
  }
};
</script>

<style>
[data-aeris-catalog-ui-dropdown] ul {
  padding: 0;
  margin: 0;
}

[data-aeris-catalog-ui-dropdown] li {
  list-style-type: none;
}

[data-aeris-catalog-ui-dropdown] > ul {
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 200;
  width: 100%;
  max-height: 300px;
  box-shadow: 0px 0px 5px 0px #ccc;
  overflow-y: auto;
  background: white;
  hyphens: auto;
}

[data-aeris-catalog-ui-dropdown] ul li {
  padding: 8px 16px;
}

[data-aeris-catalog-ui-dropdown] ul li:hover {
  background: #eee;
  cursor: pointer;
}

[data-aeris-catalog-ui-dropdown] ul li.active,
[data-aeris-catalog-ui-dropdown] ul li.active:hover {
  background: #333;
  color: #ddd;
}
</style>
