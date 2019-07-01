<i18n>
{
  "en": {
    "message": "Please make a search to access the content",
    "nometadata": "No metadata sheet found",
    "showMore": "Show more",
    "resultsFound": "Results found"
  },
  "fr": {
    "message": "Veuillez faire une recherche pour accéder au contenu",
    "nometadata": "Aucune fiche de métadonnées trouvée",
    "showMore": "Voir plus",
    "resultsFound": "Résultats trouvés"
  }
}
</i18n>

<template>
  <section :class="visibilityClass" aeris-catalog-summaries-bar class="always-visible">
    <article v-if="getSummaries">
      <section v-if="getSummaries.length > 0">
        <div>{{ $t("resultsFound") }}{{ ": " + getTotal }}</div>
        <article>
          <div v-for="summary in getSummaries" :key="summary.id">
            <aeris-catalog-default-summary
              :summary="summary"
              :max-length="summaryMaxLength"
              :theme="theme"
              :is-in-cart="isInCart(summary.id)"
              @displayMetadata="setSelectedSummaryId"
              @addItemCart="addItemCart"
              @removeItemCart="removeItemCart"
            ></aeris-catalog-default-summary>
          </div>
        </article>
        <button v-if="hasMore" @click="showMore"><i class="fa fa-arrow-down" />{{ $t("showMore") }}</button>
      </section>
      <p v-else>
        {{ $t("nometadata") }}
      </p>
    </article>
    <p v-else>
      {{ message ? message : $t("message") }}
    </p>
    <slot />
  </section>
</template>

<script>
import AerisCatalogDefaultSummary from "./aeris-catalog-default-summary";
export default {
  name: "aeris-catalog-summaries",

  components: { AerisCatalogDefaultSummary },

  props: {
    language: {
      type: String,
      default: "en"
    },
    summaryMaxLength: {
      type: Number,
      default: 150
    },
    message: {
      type: String,
      required: false,
      default: null
    },
    itemIdsInCart: {
      type: Array,
      default: () => {
        return [];
      }
    },
    theme: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },

  computed: {
    visibilityClass() {
      if (!this.getSummaries || this.getSummaries.length == 0) {
        return "invisible";
      } else {
        return "visible";
      }
    },
    getSummaries() {
      return this.$store.getters.getSummaries;
    },
    getTotal() {
      return this.$store.getters.getTotal;
    },
    hasMore() {
      return this.$store.getters.hasMore;
    },
    isInCart() {
      return function(identifier) {
        return this.itemIdsInCart.includes(identifier);
      };
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
    showMore() {
      let range = this.$store.dispatch("getNextRange");
      this.$emit("showMore", range);
    },
    setSelectedSummaryId(id) {
      this.$store.commit("setSelectedSummaryId", id);
    },
    addItemCart(metadataDownload) {
      this.$emit("addItemCart", metadataDownload);
    },

    removeItemCart(metadataDownload) {
      this.$emit("removeItemCart", metadataDownload);
    }
  }
};
</script>

<style scoped>
[aeris-catalog-summaries-bar] {
  box-sizing: border-box;
  display: block;
  overflow: auto;
  padding: 0 10px;
}

[aeris-catalog-summaries-bar] > div:first-child {
  position: absolute;
  top: -25px;
}

[aeris-catalog-summaries-bar] > header input {
  color: #555;
}

[aeris-catalog-summaries-bar] button {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 4px 4px 0 0;
  font-size: 1.1rem;
  cursor: pointer;
  color: #333;
  background: #ccc;
}

[aeris-catalog-summaries-bar] button:hover {
  filter: brightness(80%);
}

[aeris-catalog-summaries-bar] button i {
  margin-right: 8px;
  color: #555;
}
</style>
