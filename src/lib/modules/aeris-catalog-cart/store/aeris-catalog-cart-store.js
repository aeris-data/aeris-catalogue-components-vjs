function filterDescription(item) {
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
}

export default {
  state: {
    cartContent: []
  },
  getters: {
    getCartContent: state => state.cartContent,
    isItemInCart(state, item) {
      state.cartContent.forEach(itemCart => {
        return itemCart.collectionId === item.collectionId;
      });
    }
  },
  mutations: {
    clearCartContent: state => {
      state.cartContent = [];
    },
    addCartContent(state, cartContent) {
      state.cartContent = cartContent;
    }
  },
  actions: {
    addItemToCart({ state }, item) {
      let alreadyAdded = false;

      for (let j = 0; j < state.cartContent.length; j++) {
        let collection = state.cartContent[j];
        if (collection.collectionId === item.collectionId) {
          for (let i = 0; i < item.elements.length; i++) {
            const index = collection.items.elements.indexOf(item.elements[i]);
            if (index < 0) {
              collection.items.elements.push(item.elements[i]);
            }
            collection.fileNumber += item.fileNumber;
            collection.fileSize += item.totalSize;
          }
          collection.filterDescription = filterDescription(collection);
          alreadyAdded = true;
        }
      }

      if (!alreadyAdded) {
        let collection = {
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
        collection.filterDescription = filterDescription(collection);
        state.cartContent.push(collection);
      }
    }
  }
};
