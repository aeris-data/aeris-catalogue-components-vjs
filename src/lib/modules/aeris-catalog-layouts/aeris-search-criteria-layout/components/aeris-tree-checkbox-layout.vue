<template>
  <div :style="applyTheme" class="aeris-tree-checkbox-layout">
    <div v-for="(item, index) of items" :key="item.name">
      <div class="first-level">
        <div>
          <input :id="`${name}${item.name}`" :checked="item.checked" type="checkbox" @change="checkFirstLevel(index)" />
          <label :for="`${name}${item.name}`">{{ item.label }}</label>
        </div>
        <aside>
          <span v-if="item.subitems.length > 0" class="badge">{{ item.subitems.length }}</span>
          <i
            v-if="item.subitems.length > 0"
            v-show="item.deployed"
            class="far fa-minus-square deployed"
            @click="toggle(index)"
          />
          <i
            v-if="item.subitems.length > 0"
            v-show="!item.deployed"
            class="far fa-plus-square deployed"
            @click="toggle(index)"
          />
        </aside>
      </div>
      <div v-if="item.deployed">
        <div v-for="(subitem, indexSubitem) of item.subitems" :key="subitem.name" class="second-level">
          <input
            :id="`${name}${item.name}${subitem.name}`"
            :checked="subitem.checked"
            type="checkbox"
            @change="checkSecondLevel(index, indexSubitem)"
          />
          <label :for="`${name}${item.name}${subitem.name}`">{{ subitem.label }}</label>
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
      this.items.forEach(element => {
        element.checked = false;
        element.subitems.forEach(element => {
          element.checked = false;
        });
      });
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
<style>
.aeris-tree-checkbox-layout {
  color: grey;
}

.first-level {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
}

.second-level {
  margin-left: 24px;
  padding: 5px 0;
}

input {
  margin-right: 15px;
}

.first-level aside {
  display: flex;
  align-items: center;
}

.badge {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin: 0 8px;
  padding: 2px 6px;
  font-size: 0.6em;
  font-weight: 700;
  line-height: 1;
  background-color: var(--primaryColor);
  color: var(--secondaryColor);
}

.deployed {
  cursor: pointer;
}
</style>
