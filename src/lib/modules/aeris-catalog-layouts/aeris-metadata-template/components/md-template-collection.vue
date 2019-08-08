<i18n>
  {
    "en": {
      "citations": "Citations",
      "contacts": "Contacts",
      "data-links": "Data links",
      "datapolicy": "Data Policy",
      "description": "Abstract",
      "formats": "Formats",
      "information-links": "Information links",
      "information": "Other informations",
      "instruments": "Instruments",
      "parameters": "Parameters",
      "platforms": "Platforms",
      "publications": "Publications",
      "quicklook-gallery": "Gallery",
      "single-file-download": "Download",
      "spatial-extents": "Spatial extents",
      "temporal-extents": "Temporal extents",
      "year-select-download": "Download",
      "download": "Download",
      "dataset": "Dataset"
    },
    "fr": {
      "citations": "Citations",
      "contacts": "Contacts",
      "data-links": "Liens d'information",
      "datapolicy": "Charte de données",
      "description": "Description",
      "formats": "Formats",
      "information-links": "Liens d'information",
      "information": "Autres informations",
      "instruments": "Instruments",
      "parameters": "Paramètres",
      "platforms": "Plateformes",
      "publications": "Publications",
      "quicklook-gallery": "Galerie",
      "single-file-download": "Téléchargement",
      "spatial-extents": "Extension spatiale",
      "temporal-extents": "Extensions temporelles",
      "year-select-download": "Téléchargement",
      "download": "Téléchargement",
      "dataset": "Métadonnées"
    }
  }
</i18n>

<template>
  <nav :style="applyTheme" class="tabs" role="tablist" data-template="metadata-panel">
    <div>
      <!-- TAB 1 -->
      <input id="dataset" type="radio" name="tabs" checked />
      <label id="label-dataset" for="dataset" role="tab" aria-controls="panel-dataset">{{ $t("dataset") }}</label>
      <article id="panel-dataset" role="tabpanel" aria-labelledby="label-dataset" aeris-metadatasheet-dataset>
        <div>
          <aside>
            <a
              v-for="(link, index) in visibleLinks"
              :class="{ active: active === link.anchor }"
              :href="`#${link.anchor}`"
              :key="index"
              @click="setCurrentAnchor(link)"
            >{{ $t(link.anchor) }}</a
            >
          </aside>
          <div id="component-list" ref="component-list">
            <aeris-metadata-description
              id="description"
              ref="description"
              :markdown="true"
              :language="language"
              :theme="theme"
              :resource-abstract="metadata.resourceAbstract"
              :show-title="false"
            ></aeris-metadata-description>
            <aeris-metadata-spatial-extents
              id="spatial-extents"
              ref="spatial-extents"
              :language="language"
              :spatial-extents="metadata.spatialExtents"
              :theme="theme"
            ></aeris-metadata-spatial-extents>
            <aeris-metadata-temporal-extents
              id="temporal-extents"
              ref="temporal-extents"
              :language="language"
              :temporal-extents="metadata.temporalExtents"
              :theme="theme"
            ></aeris-metadata-temporal-extents>
            <aeris-metadata-contacts
              id="contacts"
              ref="contacts"
              :language="language"
              :contacts="metadata.contacts"
              :theme="theme"
            ></aeris-metadata-contacts>
            <aeris-metadata-information-links
              id="information-links"
              ref="information-links"
              :language="language"
              :links="metadata.links"
              :theme="theme"
            ></aeris-metadata-information-links>
            <aeris-metadata-parameters
              id="parameters"
              ref="parameters"
              :language="language"
              :parameters="metadata.parameters"
              :theme="theme"
            ></aeris-metadata-parameters>
            <aeris-metadata-platforms
              id="platforms"
              ref="platforms"
              :language="language"
              :platforms="metadata.platforms"
              :theme="theme"
            ></aeris-metadata-platforms>
            <aeris-metadata-instruments
              id="instruments"
              ref="instruments"
              :language="language"
              :instrument="metadata.instruments"
              :theme="theme"
            ></aeris-metadata-instruments>
            <aeris-metadata-publications
              id="publications"
              ref="publications"
              :language="language"
              :publications="metadata.publications"
              :theme="theme"
            ></aeris-metadata-publications>
            <aeris-metadata-quicklook-gallery
              id="quicklook-gallery"
              ref="quicklook-gallery"
              :language="language"
              :theme="theme"
              :quicklooks="metadata.quicklooks"
            ></aeris-metadata-quicklook-gallery>
            <aeris-metadata-information
              id="information"
              ref="information"
              :language="language"
              :items="metadata"
              :theme="theme"
            ></aeris-metadata-information>
          </div>
        </div>
      </article>
    </div>
    <div>
      <!-- TAB 2 -->
      <input id="download" type="radio" name="tabs" />
      <label id="label-download" for="download" role="tab" aria-controls="panel-download">{{ $t("download") }}</label>
      <article id="panel-download" role="tabpanel" aria-labelledby="label-download" aeris-metadatasheet-download>
        <div>
          <section class="download">
            <div v-if="loading" class="loader" />
            <aeris-metadata-single-file-download
              v-if="getDownloadType === 'single'"
              :metadata="metadata"
              :is-in-cart="isInCart(metadata.identifier)"
              :theme="theme"
              :language="language"
              @addItemCart="addItemCart"
              @removeItemCart="removeItemCart"
            ></aeris-metadata-single-file-download>
            <aeris-metadata-year-select-download
              v-if="getDownloadType === 'year'"
              :theme="theme"
              :language="language"
              :metadata="metadata"
              :years="getYearlyFilters(metadata.identifier)"
              @addItemCart="addItemCart"
              @removeItemCart="removeItemCart"
            ></aeris-metadata-year-select-download>
            <aeris-metadata-data-links
              :language="language"
              :links="metadata.links"
              :theme="theme"
            ></aeris-metadata-data-links>
          </section>
          <aeris-metadata-citations
            :language="language"
            :identifiers="metadata.identifiers"
            :theme="theme"
          ></aeris-metadata-citations>
          <section aeris-metadatasheet-distribution>
            <h3 v-if="checkFormat">Distribution</h3>
            <!-- here format component : h4 ul -->
            <aeris-metadata-formats
              ref="formats"
              :language="language"
              :formats="metadata.formats"
              :theme="theme"
            ></aeris-metadata-formats>
            <!-- <section aeris-metadatasheet-distribution-licences ref="licences"> -->
            <!-- here licences component : h4 p -->
            <!-- </section> -->
            <!-- here datapolicy component : h4 p  -->
            <aeris-metadata-datapolicy
              ref="datapolicy"
              :language="language"
              :distribution-information="metadata.distributionInformation"
              :theme="theme"
            ></aeris-metadata-datapolicy>
          </section>
        </div>
      </article>
    </div>
  </nav>
</template>

<script>
import moment from "moment";

import {
  AerisMetadataCitations,
  AerisMetadataContacts,
  AerisMetadataDataLinks,
  AerisMetadataDatapolicy,
  AerisMetadataDescription,
  AerisMetadataFormats,
  AerisMetadataInformation,
  AerisMetadataInformationLinks,
  AerisMetadataInstruments,
  AerisMetadataModifications,
  AerisMetadataParameters,
  AerisMetadataPlatforms,
  AerisMetadataPublications,
  AerisMetadataQuicklookGallery,
  AerisMetadataSpatialExtents,
  AerisMetadataTemporalExtents,
  AerisMetadataSingleFileDownload,
  AerisMetadataYearSelectDownload,
  AerisMetadataServices
} from "aeris-metadata-components-vjs";

import { AerisNotifier, AerisTheme, Aerislanguage } from "aeris-commons-components-vjs";

export default {
  metaInfo() {
    return {
      script: [
        {
          type: "application/ld+json",
          json: this.datasetJson
        }
      ]
    };
  },
  name: "md-template-collection",
  components: {
    AerisMetadataCitations,
    AerisMetadataContacts,
    AerisMetadataDataLinks,
    AerisMetadataDatapolicy,
    AerisMetadataDescription,
    AerisMetadataFormats,
    AerisMetadataInformation,
    AerisMetadataInformationLinks,
    AerisMetadataInstruments,
    AerisMetadataModifications,
    AerisMetadataParameters,
    AerisMetadataPlatforms,
    AerisMetadataPublications,
    AerisMetadataQuicklookGallery,
    AerisMetadataSpatialExtents,
    AerisMetadataSingleFileDownload,
    AerisMetadataYearSelectDownload,
    AerisMetadataTemporalExtents,
    AerisMetadataServices,
    AerisNotifier,
    AerisTheme,
    Aerislanguage
  },
  props: {
    language: {
      type: String,
      default: "en"
    },
    metadata: {
      type: Object,
      default: () => {}
    },
    theme: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      datasetJson: null,
      downloadType: "",
      years: [],
      allLinks: [
        { anchor: "description", fr: this.$t("description", "fr"), en: this.$t("description", "en") },
        { anchor: "spatial-extents", fr: this.$t("spatial-extents", "fr"), en: this.$t("spatial-extents", "en") },
        { anchor: "temporal-extents", fr: this.$t("temporal-extents", "fr"), en: this.$t("temporal-extents", "en") },
        { anchor: "contacts", fr: this.$t("contacts", "fr"), en: this.$t("contacts", "en") },
        { anchor: "information-links", fr: this.$t("information-links", "fr"), en: this.$t("information-links", "en") },
        { anchor: "parameters", fr: this.$t("parameters", "fr"), en: this.$t("parameters", "en") },
        { anchor: "platforms", fr: this.$t("platforms", "fr"), en: this.$t("platforms", "en") },
        { anchor: "instruments", fr: this.$t("instruments", "fr"), en: this.$t("instruments", "en") },
        { anchor: "publications", fr: this.$t("publications", "fr"), en: this.$t("publications", "en") },
        { anchor: "quicklook-gallery", fr: this.$t("quicklook-gallery", "fr"), en: this.$t("quicklook-gallery", "en") },
        { anchor: "information", fr: this.$t("information", "fr"), en: this.$t("information", "en") }
      ],
      // trick to use $refs in computed properties
      isMounted: false,
      active: "description",
      loading: false
    };
  },
  watch: {
    language(value) {
      this.$i18n.locale = value;
    },
    metadata: {
      handler(newMetadata, oldMetadata) {
        if (newMetadata !== oldMetadata) {
          this.getDownloadFilter();
          this.getJson();
        }
      },
      deep: true
    }
  },
  mounted() {
    this.isMounted = true;
    this.getJson();
  },
  created() {
    this.$i18n.locale = this.language;
    this.getDownloadFilter();
  },
  computed: {
    checkFormat() {
      if (!this.isMounted) {
        return;
      }

      if (this.$refs.formats || this.$refs.datapolicy) {
        return this.$refs.formats.isVisible || this.$refs.datapolicy.isVisible;
      }
    },
    visibleLinks() {
      if (!this.isMounted) {
        return;
      }

      const visibleComponents = [];
      for (let c in this.$refs) {
        if (this.$refs[c].isVisible) {
          visibleComponents.push(c);
        }
      }

      return this.allLinks.filter(link => {
        return visibleComponents.indexOf(link.anchor) >= 0;
      });
    },
    getDownloadType() {
      return this.downloadType;
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
    },
    getYearlyFilters() {
      return identifier => {
        let currentYears = [...this.years];
        this.$store.getters.getCartContent.forEach(itemCart => {
          if (itemCart.identifier === identifier) {
            let yearsInCart = itemCart.items.elements;
            currentYears.forEach(year => {
              if (yearsInCart.indexOf(year.year) > -1) {
                year.selected = true;
              }
            });
          }
        });
        // this.loading = false;
        return currentYears;
      };
    },
    getItemIdsInCart() {
      return this.$store.getters.getItemIdsInCart;
    },
    applyTheme() {
      return this.theme && this.theme.primaryColor ? { "--primaryColor": this.theme.primaryColor } : "";
    }
  },
  methods: {
    getJson() {
      this.$http
        .get("https://services.aeris-data.fr/schemaOrg/" + this.metadata.identifier, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => (this.datasetJson = response.data), error => console.log(error));
    },
    addItemCart(metadataDownload) {
      this.$store.dispatch("addCollectionToCart", metadataDownload);
    },
    removeItemCart(metadataDownload) {
      this.$store.commit("removeItemFromCartContent", metadataDownload);
    },
    setCurrentAnchor(link) {
      this.active = link.anchor;
    },
    getDownloadFilter() {
      this.downloadType = "";
      let links = this.metadata ? this.metadata.links : "";
      if (links) {
        let link = links.filter(link => link.type == "OPENSEARCH_LINK");
        let url = null;
        if (link !== null && link.length > 0) {
          url = link[0].url.endsWith("/") ? link[0].url.substring(0, link[0].url.length - 1) : link[0].url;
          url = url + "/request?collection=" + this.metadata.identifier;
          this.loading = true;
          this.$http.get(url).then(response => {
            let entries = response.data.entries;
            if (entries.length > 1) {
              this.downloadType = "year";
              let years = [];
              for (let i = 0; i < entries.length; i++) {
                let date = moment(entries[i].date);
                let item = {};
                item.year = date.year();
                item.selected = false;
                item.totalSize = entries[i].totalSize;
                item.fileNumber = entries[i].fileNumber;
                years.push(item);
              }
              this.years = years;
              this.loading = false;
            } else if (entries.length === 1) {
              this.downloadType = "single";
              this.loading = false;
            }
          });
        }
      }
    }
  }
};
</script>

<style scoped>
[aeris-metadata-single-file-download] {
  padding: 20px;
}

* {
  transition: all 0.4s ease;
  font-family: "Open sans", sans-serif;
  font-weight: 400;
}

/*--------------------------------------------------------------
# TABS
--------------------------------------------------------------*/

.tabs {
  max-width: 1024px;
  height: 100%;
  margin: 0 auto;
  list-style-type: none;
  position: relative;
}

.tabs > div {
  display: inline-block;
  margin-left: -5px;
}

.tabs > div:first-of-type {
  margin-left: 0;
}

.tabs label {
  padding: 5px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #ddd;
  cursor: pointer;
}

[type="radio"]:checked + label {
  border-radius: 5px 5px 0 0;
  background: #fff;
}

.tabs label:hover {
  background: #aaa;
  color: #fff;
}

.tabs article,
[type="radio"] {
  display: none;
  padding: 20px;
}

.tabs article {
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 0 0 5px 5px;
  background: #fff;
  color: #333;
}

[type="radio"]:checked ~ article {
  display: block;
}

article[id="panel-dataset"] h3:not(:first-of-type) {
  margin-top: 40px;
}

h3 {
  border-bottom: 1px solid #333;
  padding-bottom: 10px;
}

@media (min-width: 400px) {
  .tabs label {
    display: inline-block;
    border-radius: 5px 5px 0 0;
    margin-top: 0;
    margin-right: 1px;
  }

  .tabs article {
    clear: both;
    position: absolute;
    top: 29px;
    left: 0;
    right: 0;
    border-radius: 0 5px 5px 5px;
    margin-bottom: 0;
  }
}

/*----------------------------
# TAB DATASET / DOWNLOAD
------------------------------*/
.tabs article[aeris-metadatasheet-dataset] > div > aside > a:hover,
.tabs article[aeris-metadatasheet-dataset] > div > aside > a.active {
  border-left: 2px solid var(--primaryColor, #000);
  color: var(--primaryColor, #000);
}

.tabs article[aeris-metadatasheet-dataset] > div > div,
.tabs article[aeris-metadatasheet-download] > div {
  flex: 1;
  max-height: 768px;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.tabs article[aeris-metadatasheet-dataset] > div > div::-webkit-scrollbar,
.tabs article[aeris-metadatasheet-download] > div::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
  border-radius: 50%;
  margin-left: 4px;
}

.tabs article[aeris-metadatasheet-dataset] > div > div::-webkit-scrollbar-thumb,
.tabs article[aeris-metadatasheet-download] > div::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #333;
}

.tabs article[aeris-metadatasheet-dataset] > div > div::-webkit-scrollbar-track,
.tabs article[aeris-metadatasheet-download] > div::-webkit-scrollbar-track {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

/*----------------------------
# TAB DATASET
------------------------------*/
.tabs article[aeris-metadatasheet-dataset] > div {
  display: flex;
}

.tabs article[aeris-metadatasheet-dataset] > div > aside {
  margin-right: 20px;
}

.tabs article[aeris-metadatasheet-dataset] > div > aside > a {
  display: block;
  padding: 10px;
  border-left: 2px solid #e0e0e0;
  text-decoration: none;
  font-size: 14px;
  color: #333;
}

.tabs article[aeris-metadatasheet-dataset] > div > div > * {
  max-width: 600px;
  margin: auto;
  line-height: 1.7;
  padding-top: 0;
}

/*----------------------------
# TAB DOWNLOAD
------------------------------*/
.tabs article[aeris-metadatasheet-download] > div > section {
  padding: 0 20px;
}

.tabs article[aeris-metadatasheet-download] > div > section > * {
  padding-bottom: 0;
  margin-bottom: 0;
}

.tabs article[aeris-metadatasheet-download] button {
  padding: 15px 20px;
}

.loader {
  border: 6px solid #f5f5f5;
  border-top: 6px solid var(--primaryColor);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
  text-align: center;
  margin: 20px auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
