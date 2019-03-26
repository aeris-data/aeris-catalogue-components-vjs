import axios from "axios";
import i18n from "../language/aeris-catalog-cart-i18n";

function filterDescription(item) {
  if (item.items && item.items.type.toLowerCase() == "yearfilter") {
    const aux = item.items.elements;
    aux.sort();
    let result = i18n.t("years") + " ";
    for (let i = 0; i < aux.length; i++) {
      result = result + aux[i];
      if (i < aux.length - 1) {
        result = result + ", ";
      }
    }
    return result;
  }
  return null;
}

export default {
  state: {
    cartContent: [],
    language: "en"
  },
  getters: {
    getCartContent: state => state.cartContent,
    isCollectionInCart(state, collection) {
      state.cartContent.forEach(itemCart => {
        return itemCart.identifier === collection.identifier;
      });
    }
  },
  mutations: {
    setLanguage: (state, language) => {
      if (language) {
        state.language = language;
        i18n.locale = language;
      }
    },
    clearCartContent: state => {
      state.cartContent = [];
    },
    addCartContent(state, cartContent) {
      state.cartContent = cartContent;
    },
    addItemToCartContent(state, item) {
      let alreadyAdded = false;
      for (let j = 0; j < state.cartContent.length; j++) {
        let collection = state.cartContent[j];
        if (collection.identifier === item.identifier) {
          for (let i = 0; i < item.items.elements.length; i++) {
            const index = collection.items.elements.indexOf(item.items.elements[i]);
            if (index < 0) {
              collection.items.elements.push(item.items.elements[i]);
            }
            collection.fileNumber += item.fileNumber;
            collection.fileSize += item.totalSize;
          }
          collection.items.type = "yearfilter";
          collection.id = collection.identifier;
          collection.filterDescription = filterDescription(collection);
          alreadyAdded = true;
        }
      }

      if (!alreadyAdded) {
        let collection = {
          identifier: item.identifier,
          collectionName: item.collectionName,
          url: item.url,
          fileNumber: item.fileNumber,
          fileSize: item.totalSize,
          items: {
            type: item.items.type,
            elements: item.items.elements
          },
          id: item.identifier
        };
        collection.filterDescription = filterDescription(collection);
        state.cartContent.push(collection);
      }
    },
    removeItemFromCartContent(state, itemCart) {
      for (let j = 0; j < state.cartContent.length; j++) {
        let collection = state.cartContent[j];
        if (collection.identifier === itemCart.identifier && itemCart.items && itemCart.items.elements) {
          for (let i = 0; i < itemCart.items.elements.length; i++) {
            let index = collection.items.elements.indexOf(itemCart.items.elements[i]);
            if (index >= 0) {
              collection.items.elements.splice(index, 1);
            }
            collection.filterDescription = filterDescription(collection);
            collection.fileNumber -= itemCart.fileNumber;
            collection.fileSize -= itemCart.totalSize;
          }
          if (collection.items.elements.length === 0) {
            let cartItems = state.cartContent;
            cartItems.forEach((collection, index) => {
              if (collection.identifier === itemCart.identifier) {
                state.cartContent.splice(index, 1);
              }
            });
          }
        } else if (collection.identifier === itemCart.identifier) {
          let cartItems = state.cartContent;
          cartItems.forEach((collection, index) => {
            if (collection.identifier === itemCart.identifier) {
              state.cartContent.splice(index, 1);
            }
          });
        }
      }
    }
  },
  actions: {
    addCollectionToCart({ dispatch, commit }, metadataDownload) {
      if (metadataDownload.service && metadataDownload.identifier && metadataDownload.collectionName) {
        let url = null;
        let identifier = metadataDownload.identifier;
        let notification = {
          message: i18n.t("addingToCart"),
          type: "wait",
          uuid: identifier
        };
        dispatch("addNewNotification", notification);

        url = metadataDownload.service.endsWith("/")
          ? metadataDownload.service.substring(0, metadataDownload.service.length - 1)
          : metadataDownload.service;
        url = url + "/request?collection=" + identifier;
        axios
          .get(url)
          .then(response => {
            let downloadEntries = response.data.entries;
            if (downloadEntries.length > 0) {
              let downloadEntry = downloadEntries[0];
              let cartItem = {
                collectionName: metadataDownload.collectionName,
                url: metadataDownload.service,
                identifier: identifier,
                id: identifier,
                data: "",
                fileNumber: downloadEntry.fileNumber,
                totalSize: downloadEntry.totalSize,
                items: {
                  type: "nofilter",
                  elements: []
                }
              };

              commit("addItemToCartContent", cartItem);
              dispatch("deleteNotification", identifier);
            }
          })
          .catch(() => {
            dispatch("deleteNotification", identifier);
          });
      } else if (metadataDownload.url && metadataDownload.identifier && metadataDownload.items.type) {
        commit("addItemToCartContent", metadataDownload);
      }
    }
  }
};
