<i18n>
{
  "en": {
    "addToCart": "Add to cart",
    "removeToCart": "Remove from cart"
  },
  "fr": {
    "addToCart": "Ajouter au panier",
    "removeToCart": "Retirer du panier"
  }
}
</i18n>

<template>
  <section
    v-if="collectionId"
    :style="applyTheme"
    aeris-catalog-default-summary
    data-template="summary"
    @click="displayDetails"
  >
    <article v-if="filter && filter === 'nofilter'" class="cartButton">
      <i
        v-if="!isInCart"
        key="Add"
        :title="$t('addToCart')"
        class="fas fa-download cartouche addToCartButton"
        @click.stop="addToCart"
      />
      <i
        v-else
        key="Remove"
        :title="$t('removeToCart')"
        class="fas fa-check removeToCartButton"
        @click.stop="removeFromCart"
      />
    </article>
    <article>
      <aeris-international-field
        :language="language"
        :value="title"
        :max-length="maxLength"
        :html="true"
        class="title"
      ></aeris-international-field>
    </article>
    <footer v-if="projectList">
      <div v-for="project in projectList" :key="project.projectName" class="cartouche">
        {{ project.projectName }}
      </div>
    </footer>
  </section>
</template>

<script>
import AerisInternationalField from "../../aeris-international-field/components/aeris-international-field";
export default {
  name: "aeris-catalog-default-summary",

  components: { AerisInternationalField },

  props: {
    language: {
      type: String,
      default: "en"
    },
    maxLength: {
      type: Number,
      default: 2000
    },
    summary: {
      type: Object,
      default: () => {
        return {};
      }
    },
    isInCart: {
      type: Boolean,
      default: false
    },
    theme: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },

  computed: {
    title() {
      return this.summary.title ? this.summary.title : "";
    },

    projectList() {
      return this.summary.projectList ? this.summary.projectList : "";
    },

    collectionId() {
      return this.summary.id ? this.summary.id : "";
    },
    applyTheme() {
      return this.theme && this.theme.primaryColor
        ? {
            "--primaryColor": this.theme.primaryColor
          }
        : "";
    },
    filter() {
      return this.summary && this.summary.downloadable && this.summary.downloadable["filter"]
        ? this.summary.downloadable["filter"]
        : "";
    }
  },

  watch: {
    language(value) {
      this.$i18n.locale = value;
    }
  },

  mounted() {
    if (this.language) {
      this.$i18n.locale = this.language;
    }
  },

  methods: {
    displayDetails() {
      this.$emit("displayMetadata", this.collectionId);
    },

    addToCart() {
      if (!this.isInCart && this.collectionId) {
        this.$emit("addItemCart", this.getMetadataDownload());
      }
    },

    removeFromCart() {
      if (this.isInCart) {
        this.$emit("removeItemCart", this.getMetadataDownload());
      }
    },

    getMetadataDownload() {
      return {
        service: this.summary.downloadable,
        collectionName: this.summary.title,
        identifier: this.collectionId
      };
    }
  }
};
</script>

<style scoped>
.addToCartButton,
.removeToCartButton {
  float: right;
  padding: 3px 5px;
  border-radius: 5px;
  font-size: 0.9rem;
  color: #fafafa;
}
.removeToCartButton {
  background: green;
}
.cartButton {
  height: 20px;
}

.cartouche {
  background: var(--primaryColor);
}

[data-template="summary"] {
  height: 100%;
  width: 100%;
  margin: 10px 0;
  border-radius: 2px;
  box-sizing: border-box;
  padding: 10px;
  background: #e1e1e1;
  color: #333;
}

[data-template="summary"] > article:first-child > i:hover {
  cursor: pointer;
  filter: brightness(120%);
}
[data-template="summary"]:hover {
  cursor: pointer;
  filter: brightness(90%);
}
[data-template="summary"] header .cartouche {
  display: inline-block;
  padding: 3px 5px;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 400;
  color: #fafafa;
}
[data-template="summary"] header .cartouche .fa {
  margin-right: 5px;
}

[data-template="summary"] footer {
  margin-top: 5px;
}
[data-template="summary"] footer .cartouche {
  display: inline-block;
  padding: 3px 5px;
  border-radius: 5px;
  font-size: 0.55rem;
  font-weight: 400;
  color: #fafafa;
  margin-left: 5px;
  font-weight: bold;
}

[data-template="summary"] footer .cartouche .fa {
  margin-right: 5px;
}

[data-template="summary"] article:nth-child(2) {
  padding-left: 5px;
}
</style>
