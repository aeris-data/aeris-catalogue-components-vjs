import i18n from "../language/aeris-catalog-cart-i18n";

export default {
  state: {
    cartContent: [],
    language: "en"
  },
  getters: {
    getCartContent: state => state.cartContent,
    isCollectionInCart(state, collection) {
      state.cartContent.forEach(item => {
        return item.metadataIdentifier === collection.identifier;
      });
    },
    getItemIdsInCart: state => {
      let itemIds = [];
      state.cartContent.forEach(item => {
        itemIds.push(item.metadataIdentifier);
      });
      return itemIds;
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
      const index = state.cartContent.findIndex(i => i.metadataIdentifier === item.metadataIdentifier);
      index != -1 ? state.cartContent.splice(index, 1, item) : state.cartContent.push(item);
    },
    removeItemFromCartContent(state, identifier) {
      const index = state.cartContent.findIndex(i => i.metadataIdentifier === identifier);
      index != -1 ? state.cartContent.splice(index, 1) : null;
    }
  },
  actions: {
    addCollectionToCart({ commit }, metadataDownload) {
      commit("addItemToCartContent", metadataDownload);
    }
  }
};
