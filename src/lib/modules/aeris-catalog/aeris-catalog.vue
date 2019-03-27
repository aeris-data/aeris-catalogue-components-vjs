<i18n>
{
  "en": {
    "searching": "Searching...",
    "foundresults": "Found results: ",
    "noresult": "No result corresponding to your request",
    "nometadata": "No metadata sheet displayed",
    "shoppingCart": "Your downloads",
    "nocriteria": "No criteria selected"
  },
  "fr": {
    "searching": "Recherche...",
    "foundresults": "Résultat trouvés: ",
    "noresult": "Aucun résultat ne correspond à votre requête",
    "nometadata": "Aucune fiche de métadonnées affichée",
    "shoppingCart": "Vos téléchargements",
    "nocriteria": "Aucun critère sélectionné"
  }
}
</i18n>
<template>
  <div aeris-catalog>
    <aeris-notifier></aeris-notifier>

    <aeris-catalog-criteria data-criteria="container">
      <section data-criteria="buttons">
        <slot name="buttons-criteria" />
      </section>
      <section data-criteria="content">
        <slot name="criteria" />
      </section>
    </aeris-catalog-criteria>

    <aeris-catalog-summaries
      :theme="theme"
      :language="language"
      :message="messageSummaries"
      :item-ids-in-cart="getItemIdsInCart"
      data-summaries
      @showMore="showMore"
      @addItemCart="addItemCart"
      @removeItemCart="removeItemCart"
    >
    </aeris-catalog-summaries>

    <section data-cart>
      <div>{{ $t("shoppingCart") }}</div>
      <aeris-catalog-cart
        :theme="theme"
        :language="language"
        :cart-service="cartService"
        :cart-token="cartToken"
      ></aeris-catalog-cart>
    </section>

    <aeris-catalog-metadata-panel
      v-if="getSelectedSummary"
      :summary="getSelectedSummary"
      :theme="theme"
      :language="language"
      :metadata-service="metadataService + 'id/'"
      icon-class="aeris-icon aeris-icon-unknown"
      data-sheet="content"
    >
      <slot name="buttons-metadata" />
    </aeris-catalog-metadata-panel>

    <section v-else data-sheet="placeholder">
      <p>{{ $t(message) }}</p>
      <slot name="buttons-no-metadata" />
    </section>
  </div>
</template>

<script>
import AerisCatalogMetadataPanel from "../../../lib/modules/aeris-catalog-metadata-panel/components/aeris-catalog-metadata-panel";
import AerisCatalogCriteria from "../../../lib/modules/aeris-catalog-criteria/aeris-catalog-criteria";
import AerisCatalogCart from "../../../lib/modules/aeris-catalog-cart/components/aeris-catalog-cart";
import AerisCatalogSummaries from "../../../lib/modules/aeris-catalog-summaries/components/aeris-catalog-summaries";
import { AerisNotifier } from "aeris-commons-components-vjs";
export default {
  name: "aeris-catalog",

  components: {
    AerisCatalogMetadataPanel,
    AerisCatalogCart,
    AerisCatalogSummaries,
    AerisCatalogCriteria,
    AerisNotifier
  },

  props: {
    language: {
      type: String,
      default: "en"
    },
    theme: {
      type: Object,
      default: () => {
        return {};
      }
    },
    metadataService: {
      type: String,
      default: null
    },
    program: {
      type: String,
      default: null
    },
    cartService: {
      type: String,
      default: null
    },
    cartToken: {
      type: String,
      default: null
    },
    message: {
      type: String,
      default: "nometadata"
    },
    messageSummaries: {
      type: String,
      required: false,
      default: null
    }
  },

  data() {
    return {
      visibleMetadataPanel: false
    };
  },

  computed: {
    getSelectedThesaurusCriteria() {
      return this.$store.getters.getSelectedCriteria;
    },
    getSelectedSummaryId() {
      return this.$store.getters.getSelectedSummaryId;
    },
    getSelectedSummary() {
      let selectedSummary;
      let selectedSummaryId = this.$store.getters.getSelectedSummaryId;
      let summaries = this.$store.getters.getSummaries;
      if (selectedSummaryId && summaries) {
        summaries.forEach(summary => {
          if (summary.id === selectedSummaryId) {
            selectedSummary = summary;
          }
        });
      }
      return selectedSummary;
    },
    getItemIdsInCart() {
      let itemIds = [];
      this.$store.getters.getCartContent.forEach(itemCart => {
        itemIds.push(itemCart.identifier);
      });
      return itemIds;
    },
    isInCart() {
      return idenfitier => {
        return this.getItemIdsInCart.includes(idenfitier);
      };
    },
    selectedItemCart() {
      return identifier => {
        let currentItem;
        this.$store.getters.getCartContent.forEach(itemCart => {
          if (itemCart.idenfitier === identifier) {
            currentItem = itemCart;
          }
        });
        return currentItem;
      };
    }
  },

  watch: {
    language(value) {
      this.$i18n.locale = value;
    }
  },

  created() {
    this.$i18n.locale = this.language;

    this.aerisCatalogueDisplayMetadataEventListener = this.handleDisplayMetadata.bind(this);
    document.addEventListener("aerisCatalogueDisplayMetadata", this.aerisCatalogueDisplayMetadataEventListener);

    this.aerisCatalogueHideMetadataEventListener = this.handleHideMetadata.bind(this);
    document.addEventListener("aerisCatalogueHideMetadata", this.aerisCatalogueHideMetadataEventListener);

    this.aerisCatalogueResetEventListener = this.handleReset.bind(this);
    document.addEventListener("aerisCatalogueResetEvent", this.aerisCatalogueResetEventListener);
  },

  methods: {
    handleReset(e) {
      this.hideMetadataPanel();
    },

    handleDisplayMetadata(e) {
      this.hideMetadataPanel();
      if (e.detail.uuid) {
        this.currentUuid = e.detail.uuid;
      } else {
        this.currentUuid = "";
      }
      if (e.detail.title) {
        this.currentTitle = e.detail.title;
      } else {
        this.currentTitle = "";
      }
      if (e.detail.iconClass) {
        this.currentIconClass = e.detail.iconClass;
      } else {
        this.currentIconClass = "";
      }
      if (e.detail.type) {
        this.currentType = e.detail.type;
      } else {
        this.currentType = "";
      }
      if (e.detail.clientTemplateName) {
        this.currentTemplate = e.detail.clientTemplateName;
      } else {
        this.currentTemplate = "";
      }
      if (e.detail.projects) {
        this.currentProjects = e.detail.projects;
      } else {
        this.currentProjects = "";
      }
      this.visibleMetadataPanel = true;
    },

    handleHideMetadata() {
      this.hideMetadataPanel();
    },

    handleCatalogueSearchStart(event) {
      this.hideMetadataPanel();

      var e = new CustomEvent("aerisCatalogueSearchEvent", {
        detail: {}
      });
      document.dispatchEvent(e);

      if (!this.metadataService) {
        console.error("AerisCatalogueSearcEvent detected but metadataService not provided in props...");
        return;
      }

      var url = this.metadataService + "/request";
      if (this.metadataService.endsWith("/")) {
        url = this.metadataService + "request";
      }

      if (this.program) {
        url = url + "?program=" + this.program;
      }

      document.dispatchEvent(
        new CustomEvent("aerisLongActionStartEvent", {
          detail: {
            message: this.$t("searching")
          }
        })
      );
      // do not search if there's no criteria
      e.detail.userLanguage = this.language;
      if (
        !this.program &&
        ((!e.detail.collections || e.detail.collections.length < 1) &&
          (!e.detail.keywords || e.detail.keywords.length < 1) &&
          (!e.detail.box || e.detail.box.north == "") &&
          (!e.detail.temporal || e.detail.temporal.from == "") &&
          !e.detail.platforms &&
          !e.detail.sublevels &&
          !e.detail.instruments &&
          !e.detail.parameters &&
          !e.detail.projects)
      ) {
        document.dispatchEvent(
          new CustomEvent("aerisLongActionStopEvent", {
            detail: {
              message: this.$t("searching")
            }
          })
        );
        // tell the user
        document.dispatchEvent(
          new CustomEvent("aerisErrorNotificationMessageEvent", { detail: { message: this.$t("nocriteria") } })
        );
      } else {
        let range = event.detail.range;
        this.$http
          .post(
            this.program ? `${url}&range=${range.min}-${range.max}` : `${url}?range=${range.min}-${range.max}`,
            e.detail
          )
          .then(
            response => {
              this.handleSuccess(response, range);
            },
            response => {
              this.handleError(response);
            }
          );
      }
    },

    handleSuccess(response, range) {
      document.dispatchEvent(
        new CustomEvent("aerisLongActionStopEvent", {
          detail: {
            message: this.$t("searching")
          }
        })
      );

      var search = response.body;

      if (search.total === 0) {
        document.dispatchEvent(
          new CustomEvent("aerisNotificationMessageEvent", {
            detail: {
              message: this.$t("noresult")
            }
          })
        );
      }
      // do not display project on specific catalogue
      if (this.program != null) {
        search.results.map(summary => {
          summary.projectList = null;
        });
      }
      document.dispatchEvent(
        new CustomEvent("aerisSummaries", {
          detail: {
            search: search,
            range: range
          }
        })
      );
    },

    startSearch() {
      let criteria = {
        keywords: [],
        searchOperator: "",
        temporal: { from: "", to: "" },
        userLanguage: this.language
      };
      this.getSummaries({ ...criteria, ...this.getSelectedThesaurusCriteria });
    },

    resetSearch() {},

    showMore() {
      this.getSummaries(this.getSelectedThesaurusCriteria);
    },
    getSummaries(criteria) {
      let url = this.metadataService.endsWith("/")
        ? this.metadataService + "request"
        : this.metadataService + "/request";
      if (this.program) {
        url = url + "?program=" + this.program;
      }
      let range = this.$store.getters.getRange;
      if (range) {
        let data = {
          url: this.program ? `${url}&range=${range.min}-${range.max}` : `${url}?range=${range.min}-${range.max}`,
          criteria: criteria
        };
        this.$store.dispatch("getSummaries", data);
      }
    },
    addItemCart(metadataDownload) {
      this.$store.dispatch("addCollectionToCart", metadataDownload);
    },
    removeItemCart(metadataDownload) {
      this.$store.commit("removeItemFromCartContent", metadataDownload);
    }
  }
};
</script>

<style scoped>
[aeris-catalog] {
  display: grid;
  grid-template-columns: 20% 20% 60%;
  grid-template-rows: 60px 1fr 1fr;
  grid-template-areas:
    "criteria cart sheet"
    "criteria summaries sheet"
    "criteria summaries sheet";
  width: 100%;
  height: 100vh;
  background-color: #eee;
  position: relative;
}

[aeris-catalog] [data-criteria="container"] {
  grid-area: criteria;
  position: relative;
}

[aeris-catalog] [data-criteria="content"] {
  overflow-y: auto;
}

[aeris-catalog] [data-criteria="buttons"] {
  grid-area: buttons-criteria;
}

[aeris-catalog] [data-criteria="buttons"] > div {
  display: flex;
  flex-flow: wrap;
  justify-content: flex-start;
  align-items: center;
}
[aeris-catalog] [data-criteria="buttons"] > div > * {
  margin: 5px;
}

[aeris-catalog] [data-summaries] {
  grid-area: summaries;
  position: relative;
}

[aeris-catalog] [data-cart] {
  grid-area: cart;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

[aeris-catalog] [data-sheet="content"] {
  grid-area: sheet;
  width: 100%;
  position: relative;
  overflow: hidden;
}

[aeris-catalog] [data-sheet="placeholder"] {
  grid-area: sheet;
  background: #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 2.2rem;
  font-weight: 300;
}

[aeris-catalog] [data-sheet="placeholder"] > div {
  padding: 20px 0;
}

/* Customised style */

[data-aeris-catalog] [data-criteria] {
  background: var(--criteriaBackgroundColor, #21242b);
}
[data-aeris-catalog] [data-layout="search-criteria"] .box-heading {
  background: var(--criteriaHeaderBackgroundColor, transparent);
}
[data-aeris-catalog] [data-layout="search-criteria"] .box-heading h3,
[data-aeris-catalog] [data-layout="search-criteria"] .box-heading i {
  color: var(--criteriaHeaderIconColor, #fafafa);
}
[data-aeris-catalog] [data-layout="search-criteria"] .box-body .content {
  background: var(--criteriaContentBackgroundColor, transparent);
}
[data-aeris-catalog] [data-layout="search-criteria"] .box-body .content .aeris-cartouche-container,
[data-aeris-catalog] [data-layout="search-criteria"] .box-body .content i,
[data-aeris-catalog] [data-layout="search-criteria"] .box-body .content input,
[data-aeris-catalog] [data-layout="search-criteria"] .box-body .content label {
  color: var(--criteriaContentPrimaryColor, #fafafa);
}
[data-aeris-catalog] [data-layout="search-criteria"] .box-body .content .input-container,
[data-aeris-catalog] [data-layout="search-criteria"] .box-body .content ::placeholder {
  color: var(--criteriaContentSecondaryColor, #888);
}
[data-aeris-catalog] [data-layout="search-criteria"] .box-body .content .aeris-cartouche-container {
  background: transparent;
}
[data-aeris-catalog] [data-layout="search-criteria"] .box-body .content .badge {
  color: var(--criteriaBackgroundColor, #21242b);
}
</style>
