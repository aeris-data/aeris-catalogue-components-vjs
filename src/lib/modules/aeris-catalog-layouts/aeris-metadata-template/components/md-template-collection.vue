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
      "modifications": "Modifications",
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
      "modifications": "Modifications",
      "parameters": "Paramètres",
      "platforms": "Plateformes",
      "publications": "Publications",
      "quicklook-gallery": "Galerie",
      "single-file-download": "Téléchargement",
      "spatial-extents": "Extensions spatiales",
      "temporal-extents": "Extensions temporelles",
      "year-select-download": "Téléchargement"
    }
  }
</i18n>

<template>
  <nav class="tabs" role="tablist" data-template="metadata-panel">
    <div>
      <!-- TAB 1 -->
      <input id="dataset" type="radio" name="tabs" checked />
      <label id="label-dataset" for="dataset" role="tab" aria-controls="panel-dataset">Dataset</label>
      <article id="panel-dataset" role="tabpanel" aria-labelledby="label-dataset" aeris-metadatasheet-dataset>
        <div>
          <aside>
            <!-- links to the components -->
            <!-- TODO: make it dynamic -->
            <a v-for="link in dynamicLinks" :href="`#${link}`" :key="link">{{ $t(link) }}</a>
          </aside>
          <div id="component-list">
            <aeris-metadata-description
              id="description"
              :markdown="true"
              :language="language"
              :show-title="false"
              :theme="theme"
              :resource-abstract="metadata.resourceAbstract"
              @visibility="renderLinks"
            ></aeris-metadata-description>
            <section>
              <aeris-metadata-spatial-extents
                id="spatial-extents"
                :language="language"
                :spatial-extents="metadata.spatialExtents"
                :theme="theme"
                @visibility="renderLinks"
              ></aeris-metadata-spatial-extents>
              <aeris-metadata-temporal-extents
                id="temporal-extents"
                :language="language"
                :temporal-extents="metadata.temporalExtents"
                :theme="theme"
                @visibility="renderLinks"
              ></aeris-metadata-temporal-extents>
            </section>
            <aeris-metadata-contacts
              id="contacts"
              :language="language"
              :contacts="metadata.contacts"
              :theme="theme"
              @visibility="renderLinks"
            ></aeris-metadata-contacts>
            {{ metadata.links }}
            <aeris-metadata-information-links
              id="information-links"
              :language="language"
              :links="metadata.links"
              :theme="theme"
              @visibility="renderLinks"
            ></aeris-metadata-information-links>
            <aeris-metadata-parameters
              id="parameters"
              :language="language"
              :parameters="metadata.parameters"
              :theme="theme"
              @visibility="renderLinks"
            ></aeris-metadata-parameters>
            <aeris-metadata-platforms
              id="platforms"
              :language="language"
              :platforms="metadata.platforms"
              :theme="theme"
              @visibility="renderLinks"
            ></aeris-metadata-platforms>
            <aeris-metadata-instruments
              id="instruments"
              :language="language"
              :instrument="metadata.instruments"
              :theme="theme"
              @visibility="renderLinks"
            ></aeris-metadata-instruments>
            <aeris-metadata-publications
              id="publications"
              :language="language"
              :publications="metadata.publications"
              :theme="theme"
              @visibility="renderLinks"
            ></aeris-metadata-publications>
            <aeris-metadata-quicklook-gallery
              id="quicklook-gallery"
              :language="language"
              :theme="theme"
              :quicklooks="metadata.quicklooks"
              @visibility="renderLinks"
            ></aeris-metadata-quicklook-gallery>
            <aeris-metadata-information
              id="information"
              :language="language"
              :items="metadata"
              :theme="theme"
              @visibility="renderLinks"
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
      links: []
    };
  },
  watch: {
    language(value) {
      this.$i18n.locale = value;
    },
    dynamicLinks(value) {
      this.links = value;
    }
  },
  created() {
    this.$i18n.locale = this.language;
  },
  computed: {
    dynamicLinks() {
      return this.sortLinks(this.links);
    },
    getDownloadType() {
      let links = this.metadata ? this.metadata.links : "";
      console.log("link", links);
      if (links) {
        return links.filter(link => {
          console.log(link.type);
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
    }
  },
  methods: {
    addItemCart(metadataDownload) {
      this.$store.dispatch("addCollectionToCart", metadataDownload);
    },
    removeItemCart(metadataDownload) {
      this.$store.commit("removeItemFromCartContent", metadataDownload);
    },
    renderLinks(component) {
      let name = component.name.replace("aeris-metadata-", "");
      if (component.isVisible && this.links.indexOf(name) === -1) {
        this.links.push(name);
      } else if (!component.isVisible && this.links.indexOf(name) !== -1) {
        this.links = this.links.filter(link => link !== name);
      }
    },
    sortLinks(links) {
      let sortedLinks = [
        "description",
        "spatial-extents",
        "temporal-extents",
        "contacts",
        "information-links",
        "parameters",
        "platforms",
        "instruments",
        "publications",
        "quicklook-gallery",
        "information"
      ];
      links.sort((a, b) => {
        return sortedLinks.indexOf(a) - sortedLinks.indexOf(b);
      });
      return links;
    }
  }
};
</script>

<style scoped>
[aeris-metadata-single-file-download] {
  padding: 20px;
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
  width: 400px;
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
  max-height: 768px;
  overflow: scroll;
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
