<i18n>
    {
    "en": {
    "items": "Items",
    "item": "Item",
    "yourShoppingCart": "Your downloads",
    "emptyCart": "Empty",
    "validate": "Validate",
    "downloadScript": "Download script",
    "loading": "Loading",
    "downloadingFiles": "Downloading files...",
    "removeFromDownload": "Remove from download list",
    "download": "Download",
    "copy": "Copy script to the clipboard",
    "files": "File(s)"
    },
    "fr": {
    "items": "Items",
    "item": "Item",
    "yourShoppingCart": "Vos téléchargements",
    "emptyCart": "Vider",
    "validate": "Valider",
    "downloadScript": "Script de téléchargement",
    "loading": "Chargement",
    "downloadingFiles": "Téléchargement en cours...",
    "removeFromDownload": "Supprimer de la liste de téléchargement",
    "download": "Télécharger",
    "copy": "Copier le script dans le presse-papier",
    "files": "Fichier(s)"
    }
    }
</i18n>

<template>
  <section :style="applyTheme" aeris-catalog-cart>
    <article class="cart-container">
      <section class="cart-panel-trigger">
        <span v-if="cartContent.length > 0" id="cartState" :class="cartColor">
          {{ cartContent.length }} {{ $t(cartLabel) }}
        </span>
        <i :class="cartColor" class="fa fa-download" />
      </section>

      <section class="cart-panel">
        <header class="cart-panel-header">
          <h5>{{ $t("yourShoppingCart") }}:</h5>
        </header>

        <ul class="item-list">
          <section v-for="item in cartContent" id="cartTemplate" :key="item.identifier">
            <li class="cart-line">
              <i :title="$t('removeFromDownload')" class="fa fa-times" @click="removeCartItem(item.identifier)" />
              <div>
                <aeris-metadata-international-field
                  :content="item.collectionName"
                  :language="language"
                  class="cart-collection-name"
                  no-label-float
                ></aeris-metadata-international-field>
                <span>
                  <span :title="item.fileNumber + ' ' + $t('files')" class="file_description">{{
                    item.fileNumber
                  }}</span>
                  <i
                    :title="item.fileNumber + ' ' + $t('files')"
                    class="fileIcon fa fa-file file_description"
                    style="{color:--primaryColor;}"
                  />
                  <span class="files-size file_description">({{ computeFileSize(item.fileSize) }})</span>
                </span>
              </div>
            </li>
            <div v-if="item.filterDescription" class="filter-description">
              {{ item.filterDescription }}
            </div>
          </section>
        </ul>

        <footer class="cart-panel-footer">
          <div>
            <button type="button" class="cart-button" @click="removeAll">
              <i class="fa fa-trash" />
              {{ $t("emptyCart") }}
            </button>
            <button type="button" class="cart-button green checkout-button" @click="checkout">
              <i class="fa fa-check" />
              {{ $t("validate") }}
            </button>
          </div>

          <div v-if="getTotalFiles > 0" class="total-files-size">
            {{ getTotalFiles }}<i class="fileIcon fa fa-file" /> ({{ getTotalFilesSize }})
          </div>
        </footer>
      </section>

      <section v-if="isPopupOpen" class="cart-popup">
        <article class="popup-title">
          <h3>{{ $t("downloadScript") }}</h3>
          <div @click="togglePopup">
            <i class="fa fa-times" />
          </div>
        </article>

        <article class="popup-content">
          <pre class="text-to-copy language-bash">{{ downloadScript }}</pre>
          <div class="popup-buttons">
            <div :title="$t('download')" class="map-rounded-button catalog-round-button" @click="downloadFile">
              <i class="fa fa-download" />
            </div>
            <div :title="$t('copy')" class="map-rounded-button catalog-round-button" @click="copyToClipBoard">
              <i class="fa fa-clipboard" />
            </div>
          </div>
        </article>
      </section>
    </article>
  </section>
</template>

<script>
import { AerisMetadataInternationalField } from "aeris-metadata-components-vjs";
import { computeUuid } from "aeris-commons-components-vjs/src/lib/modules/aeris-notification/utils/utils";

export default {
  name: "aeris-catalog-cart",

  components: { AerisMetadataInternationalField },

  props: {
    language: {
      type: String,
      default: "en"
    },
    cartService: {
      type: String,
      default: ""
    },
    cartToken: {
      type: String,
      default: ""
    },
    theme: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },

  data() {
    return {
      cartName: "",
      downloadScript: null,
      isPopupOpen: false
    };
  },

  computed: {
    cartColor() {
      return this.cartContent.length > 0 ? "hasItems" : "noItems";
    },
    cartLabel() {
      return this.cartContent.length > 1 ? "items" : "item";
    },
    getTotalFiles() {
      let totalFiles = 0;
      this.cartContent.forEach(collection => {
        totalFiles += collection.fileNumber;
      });
      return totalFiles;
    },
    getTotalFilesSize() {
      let filesSize = 0;
      this.cartContent.forEach(collection => {
        filesSize += collection.fileSize;
      });
      return this.computeFileSize(filesSize);
    },
    applyTheme() {
      return this.theme && this.theme.primaryColor ? { "--primaryColor": this.theme.primaryColor } : {};
    },
    cartContent() {
      return this.$store.getters.getCartContent;
    }
  },

  watch: {
    language(value) {
      this.$i18n.locale = value;
    },
    cartContent() {
      this.saveCart();
    }
  },

  created() {
    this.$i18n.locale = this.language;
    this.cartToken ? (this.cartName = "AerisCatalogCart-" + this.cartToken) : (this.cartName = "AerisCatalogCart");
    this.loadCartContentFromStorage();
  },

  methods: {
    togglePopup() {
      this.isPopupOpen = !this.isPopupOpen;
      return this.isPopupOpen;
    },

    saveCart() {
      if (localStorage) {
        localStorage.setItem(this.cartName, JSON.stringify(this.cartContent));
      }
    },

    loadCartContentFromStorage() {
      if (localStorage) {
        let cartContent = JSON.parse(localStorage.getItem(this.cartName)) || [];
        this.$store.commit("addCartContent", cartContent);
      }
    },

    removeCartItem(identifier) {
      this.$store.commit("removeItemFromCartContent", { identifier: identifier });
    },

    removeAll() {
      this.$store.commit("clearCartContent");
    },

    handleSuccessScript(response) {
      this.downloadScript = response.data;
    },

    handleErrorScript(response, uuid) {
      this.$store.dispatch("deleteNotification", uuid);
    },

    handleSuccessDownload(response, uuid) {
      const blob = new Blob([response.data], {
        type: "octet/stream"
      });
      const randomId = Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
      const fileName = "download-" + randomId + ".zip";
      saveAs(blob, fileName);
      this.$store.dispatch("deleteNotification", uuid);
      this.removeAll();
      this.togglePopup();
    },

    handleErrorDownload(response, uuid) {
      this.$store.dispatch("deleteNotification", uuid);
    },

    computeFileSize(size) {
      if (size === 0) {
        return 0;
      }
      size = Math.abs(parseInt(size, 10));
      const def = [
        [1, "octets"],
        [1024, "ko"],
        [1024 * 1024, "Mo"],
        [1024 * 1024 * 1024, "Go"],
        [1024 * 1024 * 1024 * 1024, "To"]
      ];
      for (let i = 0; i < def.length; i++) {
        if (size < def[i][0]) {
          return (size / def[i - 1][0]).toFixed(2) + def[i - 1][1];
        }
      }
    },

    checkout() {
      this.togglePopup();
      const url = this.cartService + "/toscript";
      this.$http.post(url, this.cartContent).then(
        response => {
          this.handleSuccessScript(response);
        },
        error => {
          this.handleErrorScript(error);
        }
      );
    },

    downloadFile() {
      let uuid = computeUuid();
      let notification = {
        message: this.$t("downloadingFiles"),
        type: "wait",
        uuid: uuid
      };
      this.$store.dispatch("addNewNotification", notification);
      const url = this.cartService + "/download";
      this.$http
        .post(url, this.cartContent, {
          headers: {
            "Content-Type": "application/zip",
            Accept: "application/zip"
          },
          responseType: "blob"
        })
        .then(response => {
          this.handleSuccessDownload(response, uuid);
        })
        .catch(error => {
          this.handleErrorDownload(error, uuid);
        });
    },

    copyToClipBoard() {
      const selection = window.getSelection();
      const copyTextarea = this.$el.querySelector(".text-to-copy");
      const range = document.createRange();
      range.selectNodeContents(copyTextarea);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      selection.removeAllRanges();
    }
  }
};
</script>

<style scoped>
[aeris-catalog-cart] {
  box-sizing: border-box;
  display: block;
  background: transparent;
}
[aeris-catalog-cart] .cart-container {
  position: relative;
  display: flex;
  align-items: center;
}
[aeris-catalog-cart] .cart-container .nb-items {
  position: relative;
  display: inline-block;
  padding: 3px 5px;
  background-color: #f39c12;
  border-radius: 3px;
  color: #fff;
  font-size: 12px;
}
[aeris-catalog-cart] .cart-container .nb-items:after {
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 0 5px 5px;
  border-color: transparent transparent transparent #f39c12;
}
[aeris-catalog-cart] .cart-container.hidden {
  display: none;
}
[aeris-catalog-cart] .fa {
  margin: 0 5px;
}
[aeris-catalog-cart] .cart-panel-trigger {
  padding: 3px 5px;
  color: #ddd;
}
[aeris-catalog-cart] .cart-panel-trigger .fa-shopping-cart {
  margin-left: 3px;
}
[aeris-catalog-cart] .cart-panel {
  display: none;
  position: absolute;
  top: 99%;
  z-index: 9999;
  max-height: 500px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
}
[aeris-catalog-cart] .cart-panel * {
  white-space: nowrap;
}
.cart-panel:hover,
.cart-panel-trigger:hover + .cart-panel {
  display: inline-block;
}
[aeris-catalog-cart] .item-list {
  margin: 10px;
  padding: 0;
  list-style: none;
  line-height: 1.2em;
}
[aeris-catalog-cart] .item-list .files-size {
  font-size: 10px;
}
[aeris-catalog-cart] .item-list .fa-times {
  margin-right: 10px;
  cursor: pointer;
  color: #e74c3c;
  transition: color 0.3s;
}
[aeris-catalog-cart] .item-list .fa-times:hover {
  color: firebrick;
}
[aeris-catalog-cart] .item-list li {
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  padding: 3px 0;
}
[aeris-catalog-cart] .item-list li div {
  width: 100%;
  justify-content: space-between;
}
[aeris-catalog-cart] .item-list li span {
  display: flex;
  min-width: 50px;
  justify-content: flex-end;
}
[aeris-catalog-cart] .item-list li .file_description {
  flex: 1;
  text-align: left;
}
[aeris-catalog-cart] .item-list li .file_description:nth-child(1) {
  text-align: right;
}
[aeris-catalog-cart] .item-list li * {
  display: flex;
  flex-flow: row nowrap;
}
[aeris-catalog-cart] .item-list li:not(:last-of-type) {
  border-bottom: 1px solid rgba(221, 221, 221, 0.5);
}
[aeris-catalog-cart] .cart-panel-header {
  border-bottom: 1px solid #ddd;
}
[aeris-catalog-cart] .cart-panel-header h5 {
  margin: 5px 0;
}
[aeris-catalog-cart] .cart-panel-footer {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  border-top: 1px solid #ddd;
}
[aeris-catalog-cart] .cart-panel-footer .cart-button {
  display: inline-flex;
  align-items: center;
  margin: 5px;
  padding: 3px 5px 3px 0;
  color: #4765a0;
  background-color: #fff;
  border: 1px solid;
}
[aeris-catalog-cart] .cart-panel-footer .cart-button:hover {
  cursor: pointer;
  background-color: #4765a0;
  color: #fff;
  border-color: #4765a0;
}
[aeris-catalog-cart] .cart-panel-footer .cart-button.green {
  background-color: #fff;
  color: #2eb872;
  border-color: #2eb872;
}
[aeris-catalog-cart] .cart-panel-footer .cart-button.green:hover {
  background-color: #2eb872;
  color: #fff;
  border-color: #2eb872;
}
[aeris-catalog-cart] .cart-panel-footer .total-files-size {
  font-size: 10px;
  padding-right: 10px;
}
[aeris-catalog-cart] .cart-collection-name {
  font-weight: bold;
}
[aeris-catalog-cart] .cart-collection-name:hover {
  cursor: pointer;
  opacity: 0.8;
}
[aeris-catalog-cart] .cart-popup {
  display: inline-block;
  position: fixed;
  z-index: 9999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
}
[aeris-catalog-cart] .cart-popup .popup-title,
[aeris-catalog-cart] .cart-popup h3 {
  margin: 0;
  padding: 0;
  width: 100%;
}
[aeris-catalog-cart] .cart-popup .popup-title {
  display: flex;
  justify-content: space-between;
}
[aeris-catalog-cart] .cart-popup .popup-title i {
  cursor: pointer;
  color: #888;
  opacity: 0.5;
}
[aeris-catalog-cart] .cart-popup .popup-title i:hover {
  opacity: 1;
}
[aeris-catalog-cart] .cart-popup .popup-content {
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
}
[aeris-catalog-cart] .cart-popup pre {
  margin: 20px 10px;
  padding: 5px;
  resize: none;
  min-width: 600px;
  max-width: 600px;
  min-height: 300px;
  max-height: 300px;
  word-wrap: break-word;
  border-radius: 5px;
}
[aeris-catalog-cart] .cart-popup .popup-buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px 10px;
  padding: 5px;
}
[aeris-catalog-cart] .cart-popup .catalog-round-button {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 10px;
  width: 50px;
  height: 50px;
  margin: 10px 0;
  border: 2px solid;
  border-radius: 50%;
  color: #fff;
  font-size: 18px;
  background-color: #4765a0;
  transition: background-color 0.3s;
}
[aeris-catalog-cart] .cart-popup .catalog-round-button:hover {
  cursor: pointer;
  background-color: #4765a0;
  color: var(--primaryColor, #f39c12);
}

[aeris-catalog-cart] .cart-popup .catalog-round-button :active {
  vertical-align: top;
  padding: 8px 8px 6px;
}
[aeris-catalog-cart] .filter-description {
  font-size: smaller;
}

.hasItems {
  color: var(--primaryColor, #f39c12);
}
.noItems {
  color: #555;
}

.fileIcon {
  color: var(--primaryColor);
}
</style>
