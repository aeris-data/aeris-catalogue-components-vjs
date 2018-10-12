<i18n>
{
  "en": {
    "addingToCart": "Adding to cart",
    "removeToCart": "Remove from cart"
  },
  "fr": {
    "addingToCart": "Ajouter au panier",
    "removeToCart": "Retirer du panier"
  }
}
</i18n>

<template>
<div data-template="summary" v-bind:class="{ showBody: deployed }"  @click="displayDetails">
  <div v-if="downloadable" class="cartButton">
    <i v-if="!isInCart" @click.stop="addToCart" class="cartouche fa fa-download addToCartButton" :title='$t("addingToCart")' key="Add"></i>
    <i v-else @click.stop="removeCartItem(collectionId)" class="fa fa-check removeToCartButton" :title='$t("removeToCart")' key="Remove"></i>
  </div>
  <main>
    <aeris-international-field class="title" html="true" :lang="lang" :value="title" :maxLength="maxLength"></aeris-international-field> 
  </main>
  <footer>
    <div v-if="projectList" class="cartouche" v-for="project in projectList" :key="project.projectName">{{project.projectName}}</div>
  </footer>
</div>
</template>

<script>
export default {
  name: "aeris-catalog-default-summary",

  props: {
    lang: {
      type: String,
      default: "en"
    },

    maxLength: {
      type: Number,
      default: 2000
    },

    deployed: {
      type: Boolean,
      default: false
    },

    openIconClass: {
      type: String,
      default: "fa fa-chevron-down"
    },

    value: {
      type: String,
      default: ""
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value;
    }
  },

  destroyed: function() {
    document.removeEventListener("aerisTheme", this.aerisThemeListener);
    this.aerisThemeListener = null;    
  },

  created: function() {
    console.log("aeris-default-summary-criteria - Creating");
    this.aerisThemeListener = this.handleTheme.bind(this)
    document.addEventListener('aerisTheme', this.aerisThemeListener);
    this.cartContentResponseListener = this.cartContentResponse.bind(this);
    document.addEventListener('cartContentResponse', this.cartContentResponseListener);
    this.removeListener = this.removeCartItemFromEvent.bind(this);
    document.addEventListener('deleteItemFromCartEvent', this.removeListener);
  },

  mounted: function() {
    let event = new CustomEvent("aerisThemeRequest", {});
    document.dispatchEvent(event);
    if (this.lang) {
      this.$i18n.locale = this.lang;
    }
  },

  computed: {
    title: function() {
      let aux = JSON.parse(this.value);
      if (aux.title) {
        return JSON.stringify(aux.title);
      } else {
        return "";
      }
    },

    description: function() {
      let aux = JSON.parse(this.value);
      if (aux.description) {
        return JSON.stringify(aux.description);
      } else {
        return "";
      }
    },

    headerIconClass: function() {
      let aux = JSON.parse(this.value);
      if (aux.plateformType) {
        return "aeris-icon aeris-icon-" + aux.plateformType;
      } else {
        return "aeris-icon aeris-icon-unknown";
      }
    },

    type: function() {
      let aux = JSON.parse(this.value);
      if (aux.type) {
        return aux.type;
      } else {
        return "";
      }
    },

    clientTemplateName: function() {
      let aux = JSON.parse(this.value);
      if (aux.clientTemplateName) {
        return aux.clientTemplateName;
      } else {
        return "";
      }
    },


    projectList: function() {
      let aux = JSON.parse(this.value);
      if (aux.projectList) {
        return aux.projectList;
      } else {
        return "";
      }
    },

    downloadable: function() {
      let aux = JSON.parse(this.value)
      if (aux.downloadable) {
        return aux.downloadable;
      } else {
        return "";
      }
    },

    collectionId: function() {
      let aux = JSON.parse(this.value);
      if (aux.id) {
        return aux.id;
      } else {
        return "";
      }
    },
},
    data() {
      return {
        theme: null,
        aerisThemeListener: null,
        isInCart: false,
        cartContent :null
      };
    },

  updated: function() {
    this.ensureTheme();
  },

  methods: {

    cartContentResponse: function (e) {
      this.isInCart = false;
      this.cartContent = e.detail.cartContent;

      if (this.cartContent) {
        for (let i =0; i <this.cartContent.length; i++) {
          let cartItem = this.cartContent[i];
          if (cartItem.collectionId== this.collectionId) {
            this.isInCart = true;
          }
        }
      }
    },

    removeCartItem: function(collectionId) {
      let cartClone = this.cartContent;

      cartClone.forEach(function(collection, ind) {
        if (collection.collectionId === collectionId) {
          cartClone.splice(ind, 1);
        }
      });
      this.dispatchContent();
    },

    dispatchContent: function() {
      let event = new CustomEvent('cartContentResponse', {detail: {cartContent: this.cartContent}});
      document.dispatchEvent(event);
    },

    removeCartItemFromEvent: function(e) {
      let result = [];
      let item = e.detail;
      let collection = null;

      for (let j = 0; j < this.cartContent.length; j++) {
          collection = this.cartContent[j];
          if (collection.collectionId === item.collectionId) {
            for (let i = 0; i < item.elements.length; i++) {
              let index = collection.items.elements.indexOf(item.elements[i])
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

    handleSuccess: function(response) {
      let downloadEntries = response.body.entries;

      if (downloadEntries.length > 0) {
        let downloadEntry = downloadEntries[0];
        let url_download_service = this.downloadable;
        let obj = {
          collectionName: this.title,
          url: url_download_service,
          collectionId: this.collectionId,
          id: this.collectionId,
          data: "",
          fileNumber: downloadEntry.fileNumber,
          totalSize: downloadEntry.totalSize,
          type: "nofilter"
        }
        let event = new CustomEvent("addItemToCartEvent", {detail: obj,lang: this.lang});
        document.dispatchEvent(event);
        document.dispatchEvent(new CustomEvent("aerisLongActionStopEvent", {detail: { message: this.$t("addingToCart") }}));
      }
    },

    handleTheme: function(theme) {
      this.theme = theme.detail;
      this.ensureTheme();
    },

    ensureTheme: function() {
      if (this.theme) {
        let listCartouche = this.$el.querySelectorAll(".cartouche");
        for (let cartouche of listCartouche) {
          cartouche.style.background = this.$colorLuminance(this.theme.emphasis);
        }
      }
    },

    displayDetails: function(e) {
      let event = new CustomEvent("aerisCatalogueDisplayMetadata", {
        detail: {
          type: this.type,
          uuid: this.collectionId,
          title: this.title,
          iconClass: this.headerIconClass,
          clientTemplateName: this.clientTemplateName,
          projects: JSON.stringify(this.projectList),
          downloadable: this.downloadable
        }
      });
      document.dispatchEvent(event);   
    },
    
    addToCart: function() {

      let rootUrlServiceCartInfo = this.downloadable;
      
      if (!this.isInCart) {
        // Show notification
        document.dispatchEvent(
          new CustomEvent("aerisLongActionStartEvent", {
            detail: { message: this.$t("addingToCart") }
          })
        );
        // search the informations for the cart
        if (this.downloadable && this.collectionId) {
          if (this.downloadable.endsWith("/")) {
          rootUrlServiceCartInfo =this.downloadable.slice(0, -1);
        } 
        let url = rootUrlServiceCartInfo + "/request?collection=" + this.collectionId;
        this.$http.get(url).then(response => {this.handleSuccess(response);}, response => {this.handleError(response);});
        }
      }
    }
  }
};
</script>

<style>
.addToCartButton,.removeToCartButton {
  float:right;
  padding: 3px 5px;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 400;
  color: #FAFAFA;
}
.removeToCartButton {
  background:green;
}
.cartButton {
  height: 20px;
}
</style>
