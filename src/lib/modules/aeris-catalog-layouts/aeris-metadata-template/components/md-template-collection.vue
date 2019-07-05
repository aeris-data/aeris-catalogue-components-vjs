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
      "year-select-download": "Download"
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
      "year-select-download": "Téléchargement"
    }
  }
</i18n>

<template>
  <nav :style="applyTheme" class="tabs" role="tablist" data-template="metadata-panel">
    <div>
      <!-- TAB 1 -->
      <input id="dataset" type="radio" name="tabs" checked />
      <label id="label-dataset" for="dataset" role="tab" aria-controls="panel-dataset">Dataset</label>
      <article id="panel-dataset" role="tabpanel" aria-labelledby="label-dataset" aeris-metadatasheet-dataset>
        <div>
          <aside>
            <!-- links to the components -->
            <a v-for="link in visibleLinks" :href="`#${link.anchor}`" :key="link.anchor">{{ $t(link.anchor) }}</a>
          </aside>
          <div id="component-list">
            <aeris-metadata-description
              id="description"
              ref="description"
              :markdown="true"
              :language="language"
              :theme="theme"
              :resource-abstract="metadata.resourceAbstract"
            ></aeris-metadata-description>
            <section>
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
            </section>
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
      <label id="label-download" for="download" role="tab" aria-controls="panel-download">Download</label>
      <article id="panel-download" role="tabpanel" aria-labelledby="label-download" aeris-metadatasheet-download>
        <div>
          <section v-if="getDownloadType" aeris-metadatasheet-downloadcomponent>
            <!-- here download component : h3 p button-->
            <aeris-metadata-single-file-download
              v-if="getDownloadType.type === 'OPENSEARCH_LINK'"
              :metadata="metadata"
              :is-in-cart="isInCart(metadata.identifier)"
              :theme="theme"
              @addItemCart="addItemCart"
            ></aeris-metadata-single-file-download>
            <aeris-metadata-year-select-download
              v-else-if="getDownloadType.type === 'yearfilter'"
              :theme="theme"
              :metadata="metadata"
              :selected-item-cart="selectedItemCart(metadata.identifier)"
              @addItemCart="addItemCart"
              @removeItemCart="removeItemCart"
            ></aeris-metadata-year-select-download>
          </section>
          <section aeris-metadatasheet-downloadlink>
            <!-- here download link : h3 p blockquote -->
            <aeris-metadata-data-links
              :language="language"
              :links="metadata.links"
              :theme="theme"
            ></aeris-metadata-data-links>
          </section>
        </div>
        <section aeris-metadatasheet-citation>
          <!-- here citation component : h3 blockquote -->
          <aeris-metadata-citations
            :language="language"
            :identifiers="metadata.identifiers"
            :theme="theme"
          ></aeris-metadata-citations>
        </section>
        <section aeris-metadatasheet-distribution>
          <h3>Distribution</h3>
          <section aeris-metadatasheet-distribution-format>
            <!-- here format component : h4 ul -->
            <aeris-metadata-formats
              :language="language"
              :formats="metadata.formats"
              :theme="theme"
            ></aeris-metadata-formats>
          </section>
          <section aeris-metadatasheet-distribution-licences>
            <!-- here licences component : h4 p -->
          </section>
          <section aeris-metadatasheet-distribution-datapolicy>
            <!-- here datapolicy component : h4 p  -->
            <aeris-metadata-datapolicy
              :language="language"
              :distribution-information="metadata.distributionInformation"
              :theme="theme"
            ></aeris-metadata-datapolicy>
          </section>
        </section>
      </article>
    </div>
  </nav>
</template>

<script>
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
      isMounted: false
    };
  },
  watch: {
    language(value) {
      this.$i18n.locale = value;
    }
  },
  mounted() {
    this.isMounted = true;
  },
  created() {
    this.$i18n.locale = this.language;
  },
  computed: {
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
      let links = this.metadata ? this.metadata.links : "";
      if (links) {
        return links.filter(link => {
          return link.type == "OPENSEARCH_LINK";
        });
      }
      return "";
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
    getItemIdsInCart() {
      return this.$store.getters.getItemIdsInCart;
    },
    applyTheme() {
      return this.theme && this.theme.primaryColor ? { "--primaryColor": this.theme.primaryColor } : "";
    }
  },
  methods: {
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
[aeris-metadata-single-file-download] {
  padding: 20px;
}

* {
  transition: all 0.4s ease;
  font-family: Arial, sans-serif;
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

.tabs article[aeris-metadatasheet-dataset] > div,
.tabs article[aeris-metadatasheet-download] > div {
  display: flex;
}

/*----------------------------
# TAB DATASET
------------------------------*/

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

.tabs article[aeris-metadatasheet-dataset] > div > aside > a:hover {
  border-left: 2px solid #000;
}

.tabs article[aeris-metadatasheet-dataset] > div > div {
  flex: 1;
  max-height: 768px;
  overflow-x: hidden;
  scroll-behavior: smooth;
  padding-right: 40px;
}

.tabs article[aeris-metadatasheet-dataset] > div > div::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
  border-radius: 50%;
  margin-left: 4px;
}

.tabs article[aeris-metadatasheet-dataset] > div > div::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #333;
}

.tabs article[aeris-metadatasheet-dataset] > div > div::-webkit-scrollbar-track {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

.tabs article[aeris-metadatasheet-dataset] > div > div > * {
  max-width: 500px;
  margin: auto;
  line-height: 1.7;
}

/*----------------------------
# TAB DOWNLOAD
------------------------------*/

.tabs article[aeris-metadatasheet-download] > div {
  flex-flow: row wrap;
  justify-content: space-between;
}

.tabs article[aeris-metadatasheet-download] > div > section {
  flex: 1 1 300px;
  margin-bottom: 20px;
  padding: 0 20px 20px;
}

.tabs article[aeris-metadatasheet-download] button {
  padding: 15px 20px;
}

.tabs article[aeris-metadatasheet-download] [aeris-metadatasheet-distribution] h3 ~ section {
  margin: 20px;
}

@media (min-width: 681px) {
  .tabs article[aeris-metadatasheet-download] > div > section:first-child {
    margin-right: 20px;
  }
}
</style>
