<template>
  <div>
    <aeris-catalog-cart cart-service="https://sedoo.aeris-data.fr/catalogue/rest/shoppingcart"></aeris-catalog-cart>
    <aeris-metadata-single-file-download
      :metadata="singleFileDownloadMetadata"
      :is-in-cart="isInCart(singleFileDownloadMetadata.identifier)"
      :file-number="fileNumber"
      :total-size="totalSize"
      :theme="theme"
      @addItemCart="addItemCart"
    >
    </aeris-metadata-single-file-download>
    <aeris-metadata-tree-view-download
      v-if="files"
      :metadata="treeViewDownloadMetadata"
      :files="files"
      :theme="theme"
      :is-in-cart="isInCart(treeViewDownloadMetadata.identifier)"
      @addItemCart="addItemCart"
      @removeItemCart="removeItemCart"
    >
    </aeris-metadata-tree-view-download>
    <aeris-metadata-year-select-download
      v-if="years"
      :theme="theme"
      :metadata="yearSelectDownloadMetadata"
      :years="years"
      :is-in-cart="isInCart(yearSelectDownloadMetadata.identifier)"
      @addItemCart="addItemCart"
      @removeItemCart="removeItemCart"
    ></aeris-metadata-year-select-download>
    <aeris-notifier></aeris-notifier>
  </div>
</template>

<script>
import moment from "moment";
import { AerisCatalogCart } from "../../../lib/modules/aeris-catalogue-components";
import { AerisNotifier } from "aeris-commons-components-vjs";
import {
  AerisMetadataSingleFileDownload,
  AerisMetadataYearSelectDownload,
  AerisMetadataTreeViewDownload
} from "aeris-metadata-components-vjs";

export default {
  name: "aeris-catalog-cart-test",
  components: {
    AerisCatalogCart,
    AerisNotifier,
    AerisMetadataSingleFileDownload,
    AerisMetadataYearSelectDownload,
    AerisMetadataTreeViewDownload
  },
  data() {
    return {
      criteria: {
        keywords: ["gmos 97bbabf2-1644-e71f-2f94-e4fe13c648ac"],
        searchOperator: "",
        temporal: { from: "", to: "" },
        userLanguage: "en"
      },
      yearSelectDownloadMetadata: {
        resourceTitle: {
          en: "Continuous measurements of atmospheric mercury at Amsterdam Island",
          fr: "Continuous measurements of atmospheric mercury at Amsterdam Island"
        },
        identifier: "bcb74d91-d6ea-4f83-a897-f98f8edc044c",
        links: [
          {
            type: "OPENSEARCH_LINK",
            url: "https://services.sedoo.fr/gmos-datacenter-rest/rest/data",
            name: "Open search link",
            description: null
          }
        ],
        dataLevel: "L2"
      },
      years: [],
      singleFileDownloadMetadata: {
        resourceTitle: {
          en: "AERONET_CIMEL, SURF_FIXE",
          fr: "AERONET_CIMEL, SURF_FIXE"
        },
        identifier: "97bbabf2-1644-e71f-2f94-e4fe13c648ac",
        links: [
          {
            type: "OPENSEARCH_LINK",
            url: "https://services.sedoo.fr/oldcamp-rest/rest/data",
            name: "AERONET_CIMEL, SURF_FIXE, ESCOMPTE",
            description: null
          }
        ]
      },
      fileNumber: 0,
      totalSize: 0,
      treeViewDownloadMetadata: {
        resourceTitle: {
          en: "Continuous measurements of atmospheric mercury at Amsterdam Island",
          fr: "Continuous measurements of atmospheric mercury at Amsterdam Island"
        },
        identifier: "38d09eb8-25b2-4561-b0d4-b49f36e056cd",
        links: [
          {
            type: "OPENSEARCH_LINK",
            url: "http://localhost:8080/datacenter-rest/rest/data/chamberexperiments",
            name: "AERONET_CIMEL, SURF_FIXE, ESCOMPTE",
            description: null
          }
        ]
      },
      files: [
        {
          id: "example.edf",
          type: "FILE",
          name: "example.edf",
          size: 15,
          path: "example.edf"
        },
        {
          id: "2010",
          type: "FOLDER",
          name: "2010",
          path: "2010",
          children: [
            {
              id: "file1.txt",
              type: "FILE",
              path: "2010/file1.txt",
              size: 1555,
              name: "file1.txt"
            },
            {
              type: "FILE",
              id: "file2.txt",
              name: "file2.txt",
              size: 2045,
              path: "2010/file2.txt"
            },
            {
              type: "FOLDER",
              id: "May",
              name: "May",
              path: "2010/May",
              children: [
                {
                  type: "FILE",
                  id: "file3",
                  name: "file3",
                  size: 3681,
                  path: "2010/May/file3"
                },
                {
                  type: "FILE",
                  id: "file4",
                  name: "file4",
                  size: 98745,
                  path: "2010/May/file4"
                }
              ]
            }
          ]
        }
      ],
      theme: {
        primaryColor: "#0b6bb3",
        secondaryColor: "#fff"
      },
      resourceTitle: {
        en: "Continuous measurements of atmospheric mercury at Amsterdam Island",
        fr: "Continuous measurements of atmospheric mercury at Amsterdam Island"
      }
    };
  },
  computed: {
    getItemIdsInCart() {
      let itemIds = [];
      this.$store.getters.getCartContent.forEach(itemCart => {
        itemIds.push(itemCart.metadataIdentifier);
      });
      return itemIds;
    },
    isInCart() {
      return identifier => {
        return this.getItemIdsInCart.includes(identifier);
      };
    }
  },
  created() {
    this.setYearsDownloadInput(this.yearSelectDownloadMetadata);
    this.setSingleDownloadInput(this.singleFileDownloadMetadata);
  },
  methods: {
    setYearsDownloadInput(metadata) {
      this.axios.get(`${metadata.links[0].url}/request?collection=${metadata.identifier}`).then(response => {
        this.years = response.data.entries.map(entry => ({
          year: moment(entry.date).year(),
          totalSize: entry.totalSize,
          fileNumber: entry.fileNumber
        }));
      });
    },
    setSingleDownloadInput(metadata) {
      this.axios
        .get(`${metadata.links[0].url}/request?collection=${metadata.identifier}`)
        .then(response => {
          this.fileNumber = response.data.entries[0].fileNumber;
          this.totalSize = response.data.entries[0].totalSize;
        })
        .catch(() => {
          dispatch("deleteNotification", identifier);
        });
    },

    addItemCart(metadataDownload) {
      this.$store.dispatch("addCollectionToCart", metadataDownload);
    },
    removeItemCart(identifier) {
      this.$store.commit("removeItemFromCartContent", identifier);
    }
  }
};
</script>
