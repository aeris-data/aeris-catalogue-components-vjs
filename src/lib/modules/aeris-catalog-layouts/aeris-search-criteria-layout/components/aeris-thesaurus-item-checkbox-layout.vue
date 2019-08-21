<template>
  <article v-if="isVisible" :style="applyTheme" class="aeris-thesaurus-item-checkbox-layout">
    <section>
      <aside v-if="sublevelLength > 0">
        <i v-show="getThesaurusItem.deployed" class="far fa-minus-square deployed" @click="toggleLevel()" />
        <i v-show="!getThesaurusItem.deployed" class="far fa-plus-square deployed" @click="toggleLevel()" />
      </aside>
      <label :class="{ checked: getIsChecked }" :for="`${name}${getThesaurusItem.name}${getThesaurusItem.search}`">
        {{ getThesaurusItem.label }}
      </label>
      <span v-if="sublevelLength > 0" class="badge">{{ sublevelLength }}</span>
      <input
        :id="`${name}${getThesaurusItem.name}${getThesaurusItem.search}`"
        :checked="getIsChecked"
        type="checkbox"
        @click="check()"
      />
    </section>

    <article
      v-show="getThesaurusItem.deployed && getThesaurusItem.thesaurusItems && getThesaurusItem.thesaurusItems.length"
      class="thesaurusItemChild"
    >
      <aeris-thesaurus-item-checkbox-layout
        v-for="thesaurusItemChild of getThesaurusItem.thesaurusItems"
        :key="thesaurusItemChild.search"
        :thesaurus-item="thesaurusItemChild"
        :is-checked="getThesaurusItem.checked"
        :thesaurus-type="thesaurusType"
        :ref="thesaurusItemChild.search"
      ></aeris-thesaurus-item-checkbox-layout>
    </article>
  </article>
</template>

<script>
export default {
  name: "aeris-thesaurus-item-checkbox-layout",

  props: {
    name: {
      type: String,
      default: ""
    },
    theme: {
      type: Object,
      default: () => {}
    },
    thesaurusItem: {
      type: Object,
      default: () => {}
    },
    thesaurusType: {
      type: String,
      default: ""
    },
    isChecked: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    isVisible() {
      return this.thesaurusItem && this.thesaurusItem.name && this.thesaurusType;
    },
    sublevelLength() {
      return this.thesaurusItem && this.thesaurusItem.thesaurusItems ? this.thesaurusItem.thesaurusItems.length : 0;
    },
    getThesaurusItem() {
      return this.thesaurusItem;
    },
    getIsChecked() {
      return this.thesaurusItem.checked;
    },
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
    thesaurusItem(thesaurusItem) {
      this.thesaurusItem = thesaurusItem;
    },
    isChecked(isChecked) {
      this.thesaurusItem.checked = isChecked;
      this.thesaurusItem.deployed = isChecked;
    },
    "thesaurusItem.checked"() {
      this.updateStoreThesaurusItemState();
    }
  },

  created() {
    this.thesaurusItem.checked = this.isChecked;
    this.thesaurusItem.deployed = this.isChecked;
    if (
      this.thesaurusType &&
      this.thesaurusItem.search &&
      !this.$store.getters.getSelectedCriteria[this.thesaurusType] &&
      this.thesaurusItem.checked
    ) {
      this.updateStoreThesaurusItemState();
    }
  },

  methods: {
    check() {
      this.thesaurusItem.checked = !this.thesaurusItem.checked;
      this.thesaurusItem.deployed = this.thesaurusItem.checked;
    },
    toggleLevel() {
      this.thesaurusItem.deployed = !this.thesaurusItem.deployed;
    },
    updateStoreThesaurusItemState() {
      let thesaurusItem = { search: this.thesaurusItem.search, checked: this.thesaurusItem.checked };
      this.$store.commit("setSelectedCriteria", { type: this.thesaurusType, thesaurusItem: thesaurusItem });
    },
    resetChecked() {
      this.thesaurusItem.checked = false;
      this.thesaurusItem.deployed = this.thesaurusItem.checked;
      this.resetThesaurusItemChilds();
    },
    resetThesaurusItemChilds() {
      Object.keys(this.$refs).forEach(key => {
        this.$refs[key].forEach(child => {
          child.resetChecked();
        });
      });
    }
  }
};
</script>

<style scoped>
.aeris-thesaurus-item-checkbox-layout {
  padding: 4px 0;
}

section {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

section aside {
  display: flex;
  align-items: center;
  margin: auto 0;
  margin-right: 10px;
}

.thesaurusItemChild {
  margin-left: 15px;
}

.aeris-thesaurus-item-checkbox-layout .badge {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin: auto 0;
  padding: 6px;
  font-size: 0.6em;
  font-weight: 700;
  line-height: 0.6em;
  background-color: var(--primaryColor);
  color: #fff;
  margin-right: 5px;
}

label {
  flex: 1;
  overflow-wrap: break-word;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
}

section:hover > label,
label.checked {
  color: var(--primaryColor);
}

.aeris-thesaurus-item-checkbox-layout aside {
  display: inline-flex;
}

label,
input,
aside > i:hover {
  cursor: pointer;
}
label,
.far {
  color: grey;
}

input {
  margin: auto 0;
}
</style>
