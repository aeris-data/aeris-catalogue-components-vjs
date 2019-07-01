<template>
  <div :style="applyTheme" class="aeris-tree-checkbox-layout">
    <div v-for="(item, index) of items" :key="item.name">
      <div class="first-level">
        <aside>
          <i
            v-if="item.subitems.length > 0"
            :class="{ 'fa-minus-square': item.deployed, 'fa-plus-square': !item.deployed }"
            class="far deployed"
            @click="toggle(index)"
          />
        </aside>
        <label :class="{ checked: item.checked }" :for="`${name}${item.name}`">{{ item.label }}</label>
        <span v-if="item.subitems.length > 0" class="badge">{{ item.subitems.length }}</span>
        <input :id="`${name}${item.name}`" :checked="item.checked" type="checkbox" @change="checkFirstLevel(index)" />
      </div>
      <div v-if="item.deployed">
        <div v-for="(subitem, indexSubitem) of item.subitems" :key="subitem.name" class="second-level">
          <label :class="{ checked: subitem.checked }" :for="`${name}${item.name}${subitem.name}`">
            {{ subitem.label }}
          </label>
          <input
            :id="`${name}${item.name}${subitem.name}`"
            :checked="subitem.checked"
            type="checkbox"
            @change="checkSecondLevel(index, indexSubitem)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "aeris-tree-checkbox-layout",

  props: {
    name: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    nameSubitems: {
      type: String,
      default: null
    },
    elements: {
      type: Array,
      default: () => []
    },
    theme: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    applyTheme() {
      return this.theme && this.theme.primaryColor
        ? {
            "--primaryColor": this.theme.primaryColor,
            "--secondaryColor": this.theme.secondaryColor
          }
        : "";
    }
  },

  watch: {
    elements(value) {
      this.items = value;
    },
    items(value) {
      if (value) {
        this.$store.commit("setSelectedCheckBoxCriteria", { type: this.type, value: value });
      }
    }
  },

  created() {
    this.items = this.elements;
  },

  data() {
    return {
      parentService: null,
      items: [],
      loading: false,
      existing: false
    };
  },

  methods: {
    resetChecked() {
      if (this.items) {
        this.items.forEach(element => {
          element.checked = false;
          element.subitems.forEach(element => {
            element.checked = false;
          });
        });
      }
    },

    checkFirstLevel(index) {
      this.items[index].checked = !this.items[index].checked;
      this.items[index].deployed = this.items[index].checked;
      this.items[index].subitems.forEach(item => (item.checked = this.items[index].checked));
      this.items = this.items.slice(0, this.items.length);
    },

    checkSecondLevel(index, indexSubitem) {
      this.items[index].subitems[indexSubitem].checked = !this.items[index].subitems[indexSubitem].checked;
      this.items = this.items.slice(0, this.items.length);
    },

    toggle(index) {
      this.items[index].deployed = !this.items[index].deployed;
      this.items = this.items.slice(0, this.items.length);
    }
  }
};
</script>
<style scoped>
.aeris-tree-checkbox-layout {
  color: grey;
}

.badge {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin: 0;
  padding: 6px;
  font-size: 0.6em;
  font-weight: 700;
  line-height: 0.6em;
  background-color: var(--primaryColor);
  color: var(--secondaryColor);
}

.deployed {
  cursor: pointer;
}

.first-level,
.second-level {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.first-level aside {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.second-level {
  padding: 4px 0;
  padding-left: 44px;
}

label {
  flex: 1;
  overflow-wrap: break-word;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
}

.first-level:hover > label,
.second-level:hover > label,
label.checked {
  color: var(--primaryColor);
}
</style>
