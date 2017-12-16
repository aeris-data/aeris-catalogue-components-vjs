export default {

  listen(store) {

    document.addEventListener('aerisCatalogueSearchStartEvent', (e) => {
      store.commit('startSearch');
    });

    document.addEventListener('aerisCatalogueResetEvent', (e) => {
      store.commit('hideMetadata');
    });

    document.addEventListener('aerisCatalogueMinimizeEvent', (e) => {
      store.commit('minimize');
    });

    document.addEventListener('aerisCatalogueMaximizeEvent', (e) => {
      store.commit('maximize');
    });
  }
};
