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
	  "years": "Year(s):",
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
	  "years": "Année(s):",
	  "download": "Télécharger",
	  "copy": "Copier le script dans le presse-papier",
    "files": "Fichier(s)"
  }
}
</i18n>

<template>
<div data-aeris-catalog-cart>
  <div class="cart-container">
    <div class="cart-panel-trigger">
      <span id="cartState" :style="{color:cartColor}" :v-if="calcCollNb"> {{ nbItems }} {{ cartLabel }} </span>
      <i class="fa fa-download" :style="{color:cartColor}"></i>
    </div>

    <div class="cart-panel">
      <header class="cart-panel-header">
        <h5>{{$t('yourShoppingCart')}}:</h5>
      </header>

      <ul class="item-list">
        <template id="cartTemplate" v-for="item in this.cartContent">
          <li class="cart-line" :key="item.id">
            <i class="fa fa-times" @click="removeCartItem(item.collectionId)" :title="$t('removeFromDownload')"></i>
            <div>
              <aeris-metadata-international-field class="cart-collection-name" :content="item.collectionName" :lang="lang" no-label-float></aeris-metadata-international-field>
              <span>
                <span class="file_description" :title="item.fileNumber + ' ' + $t('files')">{{item.fileNumber}}</span>
                <i class="fileIcon fa fa-file-o file_description" :title="item.fileNumber + ' ' + $t('files')"></i>
                <span class="files-size file_description">({{computeFileSize(item.fileSize)}})</span>
              </span>
            </div>
          </li>
          <div class="filter-description" v-if="item.filterDescription" :key="item.id">
            {{item.filterDescription}}
          </div>
        </template>
      </ul>

      <footer class="cart-panel-footer">
        <div>
          <button type="button" class="cart-button" @click="removeAll">
            <i class="fa fa-trash"></i>
            {{$t('emptyCart')}}
          </button>
          <button type="button" class="cart-button green checkout-button" @click="checkout">
            <i class="fa fa-check"></i>
            {{$t('validate')}}
          </button>
        </div>

        <div class="total-files-size" :v-if="calcFiles">
          {{ totalFiles }}<i class="fa fa-file-o"></i> ({{ totalFilesSize }})
        </div>
      </footer><!-- cart-panel-footer -->
    </div><!-- cart-panel -->

    <div class="cart-popup" v-if="isPopupOpen">
      <div class="popup-title">
        <h3>{{$t('downloadScript')}}</h3>
        <div @click="togglePopup">
          <i class="fa fa-times"></i>
        </div>
      </div><!-- popup-title -->

      <div class="popup-content">
        <pre class="text-to-copy language-bash">{{downloadScript}}</pre>
        <div class='popup-buttons'>
          <div class="map-rounded-button catalog-round-button" @click="downloadFile" :title="$t('download')">
            <i class="fa fa-download"></i>
          </div>
          <div class="map-rounded-button catalog-round-button" @click="copyToClipBoard" :title="$t('copy')">
            <i class="fa fa-clipboard"></i>
          </div>
        </div>
      </div><!-- popup-content -->
    </div><!-- cart-popup -->
  </div> <!-- cart-container -->
</div>
</template>
<script>
export default {
  name: "aeris-catalog-cart",

  props: {
    lang: {
      type: String,
      default: "en"
    },
    cartService: String,
    cartToken: String
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value;
    }
  },

  destroyed() {
    document.removeEventListener("addItemToCartEvent", this.addListener);
    this.addListener = null;
    document.removeEventListener(
      "deleteItemFromCartEvent",
      this.removeListener
    );
    this.removeListener = null;
    document.removeEventListener(
      "cartContentRequest",
      this.contentRequestListener
    );
    this.contentRequestListener = null;
  },

  created() {
    console.log("Aeris catalog cart - Creating");
    this.$i18n.locale = this.lang;

    this.addListener = this.addItemToCart.bind(this);
    document.addEventListener("addItemToCartEvent", this.addListener);

    this.removeListener = this.removeCartItemFromEvent.bind(this);
    document.addEventListener("deleteItemFromCartEvent", this.removeListener);

    this.contentRequestListener = this.contentRequestHandler.bind(this);
    document.addEventListener(
      "cartContentRequest",
      this.contentRequestListener
    );

    // separated carts
    this.cartToken
      ? (this.cartName = "AerisCatalogCart-" + this.cartToken)
      : (this.cartName = "AerisCatalogCart");
    this.loadCart();
  },

  computed: {
    cartColor() {
      if (this.cartContent.length > 0) {
        return "#f39c12";
      } else {
        return "#555";
      }
    },

    calcCollNb() {
      if (this.cartContent.length > 0) {
        this.nbItems = this.cartContent.length;
        if (this.cartContent.length > 1) {
          this.cartLabel = this.$i18n.t("items", this.lang);
        } else {
          this.cartLabel = this.$i18n.t("item", this.lang);
        }
      } else {
        this.nbItems = null;
        this.cartLabel = null;
      }
      return this.nbItems > 0 ? true : false;
    },

    calcFiles() {
      let filesNumber = 0;
      let filesSize = 0;
      this.cartContent.forEach(function(collection) {
        filesNumber += collection.fileNumber;
        filesSize += collection.fileSize;
      });
      this.totalFiles = filesNumber;
      this.totalFilesSize = this.computeFileSize(filesSize);
      return this.totalFiles > 0;
    }
  },

  data() {
    return {
      nbItems: null,
      cartContent: [],
      cartName: "",
      cartLabel: null,
      totalFiles: null,
      totalFilesSize: null,
      downloadScript: null,
      isPopupOpen: false,
      addListener: null,
      removeListener: null,
      contentRequestListener: null
    };
  },

  methods: {
    /**
     * Open/close the popup but does not empty the cart
     */
    togglePopup() {
      this.isPopupOpen = !this.isPopupOpen;
      return this.isPopupOpen;
    },

    contentRequestHandler() {
      this.dispatchContent();
    },

    dispatchContent() {
      const event = new CustomEvent("cartContentResponse", {
        detail: {
          cartContent: this.cartContent
        }
      });
      document.dispatchEvent(event);
    },

    filterDescription(item) {
      if (item.items) {
        if (item.items.type.toLowerCase() == "yearfilter") {
          const aux = item.items.elements;
          aux.sort();
          let result = this.$i18n.t("years") + " ";
          for (let i = 0; i < aux.length; i++) {
            result = result + aux[i];
            if (i < aux.length - 1) {
              result = result + ", ";
            }
          }
          return result;
        }
      }
      return null;
    },

    // catch event when an item is added
    addItemToCart(ev) {
      const item = ev.detail;
      let alreadyAdded = false;

      /* If corresponding collection is already present in the cart, add the item to it */
      for (let j = 0; j < this.cartContent.length; j++) {
        let collection = this.cartContent[j];
        if (collection.collectionId === item.collectionId) {
          for (let i = 0; i < item.elements.length; i++) {
            const index = collection.items.elements.indexOf(item.elements[i]);
            if (index < 0) {
              collection.items.elements.push(item.elements[i]);
            }
            collection.fileNumber += item.fileNumber;
            collection.fileSize += item.totalSize;
          }
          collection.filterDescription = this.filterDescription(collection);
          this.$set(this.cartContent, j, collection);
          alreadyAdded = true;
        }
      }

      /* If collection is not already present in the cart, create it and add item */
      if (!alreadyAdded) {
        let coll = {
          collectionId: item.collectionId,
          id: item.collectionId,
          collectionName: item.collectionName,
          url: item.url,
          fileNumber: item.fileNumber,
          fileSize: item.totalSize,
          items: {
            type: item.type,
            elements: item.elements
          }
        };
        coll.filterDescription = this.filterDescription(coll);
        this.cartContent.push(coll);
      }
      this.saveCart();
      this.dispatchContent();
    },

    /**
     * Save cart into localStorage
     */
    saveCart() {
      if (localStorage)
        localStorage.setItem(this.cartName, JSON.stringify(this.cartContent));
    },

    /**
     * Load cart from localStorage
     */
    loadCart() {
      if (localStorage)
        this.cartContent =
          JSON.parse(localStorage.getItem(this.cartName)) || [];
    },

    removeCartItemFromEvent(e) {
      let result = [];
      let item = e.detail;
      for (let j = 0; j < this.cartContent.length; j++) {
        let collection = this.cartContent[j];
        if (collection.collectionId === item.collectionId) {
          for (let i = 0; i < item.elements.length; i++) {
            let index = collection.items.elements.indexOf(item.elements[i]);
            if (index >= 0) {
              collection.items.elements.splice(index, 1);
            }
            collection.filterDescription = this.filterDescription(collection);
            collection.fileNumber -= item.fileNumber;
            collection.fileSize -= item.totalSize;
          }
        }
        if (collection.items.elements.length > 0) {
          result.push(collection);
        }
      }
      this.cartContent = result;
      this.dispatchContent();
    },

    /**
     * Remove an item from cart content using the cart remove button
     */
    removeCartItem(collectionId) {
      let cartClone = this.cartContent;
      cartClone.forEach(function(collection, ind) {
        if (collection.collectionId === collectionId) {
          cartClone.splice(ind, 1);
        }
      });
      this.saveCart();
      this.dispatchContent();
    },

    /**
     * Empty the whole cart
     */
    removeAll() {
      this.cartContent = [];
      this.saveCart();
      this.dispatchContent();
    },

    handleSuccessScript(response) {
      this.downloadScript = response.data;
    },

    handleErrorScript(response) {
      console.log("Cart - Error while accessing server:");
      let error = response.status;
      let message = response.statusText;
      if (!error) message = "Can't connect to the server";
      console.log("Error " + error + ": " + message);
    },

    handleSuccessDownload(response) {
      const blob = new Blob([response.body], {
        type: "octet/stream"
      });
      const randomId = Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
      const fileName = "download-" + randomId + ".zip";

      saveAs(blob, fileName);
      /* Hide notification */
      document.dispatchEvent(
        new CustomEvent("aerisLongActionStopEvent", {
          detail: {
            message: this.$t("downloadingFiles")
          }
        })
      );
      this.removeAll();
      this.togglePopup();
    },

    handleErrorDownload(response) {
      console.log("Cart - Error while accessing server:");
      document.dispatchEvent(
        new CustomEvent("aerisLongActionStopEvent", {
          detail: {
            message: this.$t("downloadingFiles")
          }
        })
      );
      const error = response.status;
      let message = response.statusText;
      if (!error) {
        message = "Can't connect to the server";
      }
      console.log("Error " + error + ": " + message);
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
        try {
          if (size < def[i][0]) {
            return (size / def[i - 1][0]).toFixed(2) + def[i - 1][1];
          }
        } catch (e) {
          console.log(e);
        }
      }
    },

    checkout() {
      this.togglePopup();
      const url = this.cartService + "/toscript";
      this.$http.post(url, JSON.stringify(this.cartContent)).then(
        response => {
          this.handleSuccessScript(response);
        },
        response => {
          this.handleErrorScript(response);
        }
      );
    },

    downloadFile() {
      /* Show notification */
      document.dispatchEvent(
        new CustomEvent("aerisLongActionStartEvent", {
          detail: {
            message: this.$t("downloadingFiles")
          }
        })
      );
      const url = this.cartService + "/download";
      this.$http
        .post(url, JSON.stringify(this.cartContent), {
          headers: {
            "Content-Type": "application/zip",
            Accept: "application/zip"
          },
          responseType: "blob"
        })
        .then(
          response => {
            this.handleSuccessDownload(response);
          },
          response => {
            this.handleErrorDownload(response);
          }
        );
    },

    handleError(response) {
      console.log("Cart checkout - Error while accessing server:");
      const error = response.status;
      let message = response.statusText;
      if (!error) {
        message = "Can't connect to the server";
      }
      console.log("Error " + error + ": " + message);
    },

    copyToClipBoard() {
      const selection = window.getSelection();
      const copyTextarea = this.$el.querySelector(".text-to-copy");
      const range = document.createRange();

      range.selectNodeContents(copyTextarea);
      selection.removeAllRanges();
      selection.addRange(range);

      try {
        const successful = document.execCommand("copy");
        selection.removeAllRanges();
      } catch (err) {
        console.log("Unable to copy");
      }
    },

    refreshComponents(e) {
      const collectionId = e.detail.collectionId;
      let currentColl;
      let collectionExists = false;

      this.cartContent.forEach(
        function(collection) {
          if (collection.collectionId === collectionId) {
            currentColl = collection;
            collectionExists = true;
          }
        }.bind(this)
      );

      var event = null;
    }
  }
};
</script>

<style>
[data-aeris-catalog-cart] {
  box-sizing: border-box;
  display: block;
  background: transparent;
}

[data-aeris-catalog-cart] .cart-container {
  position: relative;
  display: flex;
  align-items: center;
}

[data-aeris-catalog-cart] .cart-container .nb-items {
  position: relative;
  display: inline-block;
  padding: 3px 5px;
  background-color: #f39c12;
  border-radius: 3px;
  color: #fff;
  font-size: 12px;
}

[data-aeris-catalog-cart] .cart-container .nb-items:after {
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

[data-aeris-catalog-cart] .cart-container.hidden {
  display: none;
}

[data-aeris-catalog-cart] .fa {
  margin: 0 5px;
}

[data-aeris-catalog-cart] .cart-panel-trigger {
  padding: 3px 5px;
  color: #ddd;
}

[data-aeris-catalog-cart] .cart-panel-trigger .fa-shopping-cart {
  margin-left: 3px;
}

[data-aeris-catalog-cart] .cart-panel {
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

[data-aeris-catalog-cart] .cart-panel * {
  white-space: nowrap;
}

.cart-panel:hover,
.cart-panel-trigger:hover + .cart-panel {
  display: inline-block;
}

[data-aeris-catalog-cart] .item-list {
  margin: 10px;
  padding: 0;
  list-style: none;
  line-height: 1.2em;
}

[data-aeris-catalog-cart] .item-list .files-size {
  font-size: 10px;
}

[data-aeris-catalog-cart] .item-list .fa-times {
  margin-right: 10px;
  cursor: pointer;
  color: #e74c3c;
  transition: color .3s;
}

[data-aeris-catalog-cart] .item-list .fa-times:hover {
  color: firebrick;
}

[data-aeris-catalog-cart] .item-list li {
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  padding: 3px 0;
}

[data-aeris-catalog-cart] .item-list li div {
  width: 100%;
  justify-content: space-between;
}

[data-aeris-catalog-cart] .item-list li span {
  display: flex;
  min-width: 50px;
  justify-content: flex-end;
}

[data-aeris-catalog-cart] .item-list li .file_description {
  flex: 1;
  text-align: left;
}

[data-aeris-catalog-cart] .item-list li .file_description:nth-child(1){
  text-align: right;
}

[data-aeris-catalog-cart] .item-list li * {
  display: flex;
  flex-flow: row nowrap;  
}

[data-aeris-catalog-cart] .item-list li:not(:last-of-type) {
  border-bottom: 1px solid rgba(221, 221, 221, 0.5);
}

[data-aeris-catalog-cart] .cart-panel-header {
  border-bottom: 1px solid #ddd;
}

[data-aeris-catalog-cart] .cart-panel-header h5 {
  margin: 5px 0;
}

[data-aeris-catalog-cart] .cart-panel-footer {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  border-top: 1px solid #ddd;
}

[data-aeris-catalog-cart] .cart-panel-footer .cart-button {
  display: inline-flex;
  align-items: center;
  margin: 5px;
  padding: 3px 5px 3px 0;
  color: var(--main-color, #4765a0);
  background-color: #fff;
  border: 1px solid;
}

[data-aeris-catalog-cart] .cart-panel-footer .cart-button:hover {
  cursor: pointer;
  background-color: var(--main-color, #4765a0);
  color: #fff;
  border-color: var(--main-color, #4765a0);
}

[data-aeris-catalog-cart] .cart-panel-footer .cart-button.green {
  background-color: #fff;
  color: #2eb872;
  border-color: #2eb872;
}

[data-aeris-catalog-cart] .cart-panel-footer .cart-button.green:hover {
  background-color: #2eb872;
  color: #fff;
  border-color: #2eb872;
}

[data-aeris-catalog-cart] .cart-panel-footer .total-files-size {
  font-size: 10px;
  padding-right: 10px;
}

[data-aeris-catalog-cart] .cart-collection-name {
  font-weight: bold;
}

[data-aeris-catalog-cart] .cart-collection-name:hover {
  cursor: pointer;
  opacity: 0.8;
}

[data-aeris-catalog-cart] .cart-popup {
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

[data-aeris-catalog-cart] .cart-popup .popup-title,
[data-aeris-catalog-cart] .cart-popup h3 {
  margin: 0;
  padding: 0;
  width: 100%;
}

[data-aeris-catalog-cart] .cart-popup .popup-title {
  display: flex;
  flex: space-between;
}

[data-aeris-catalog-cart] .cart-popup .popup-title i {
  cursor: pointer;
  color: #888;
  opacity: 0.5;
}

[data-aeris-catalog-cart] .cart-popup .popup-title i:hover {
  opacity: 1;
}

[data-aeris-catalog-cart] .cart-popup .popup-content {
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
}

[data-aeris-catalog-cart] .cart-popup pre {
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

[data-aeris-catalog-cart] .cart-popup .popup-buttons {
  width: 100%;
  display: flex;
  flex: flex-start;
  flex-direction: column;
  margin: 20px 10px;
  padding: 5px;
}

[data-aeris-catalog-cart] .cart-popup .catalog-round-button {
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
  background-color: var(--search-button-color, #4765a0);
  transition: background-color 0.3s;
}

[data-aeris-catalog-cart] .cart-popup .catalog-round-button:hover {
  cursor: pointer;
  background-color: var(--search-button-hover-color, #4765a0);
}

[data-aeris-catalog-cart] .cart-popup .catalog-round-button :active {
  vertical-align: top;
  padding: 8px 8px 6px;
}

[data-aeris-catalog-cart] .filter-description {
  font-size: smaller;
}
</style>
