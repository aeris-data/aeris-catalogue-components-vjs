export default {

  listen(store) {

    document.addEventListener('aerisCatalogueDisplayMetadata', (e) => {
      store.commit('displayMetadata', {
        uuid: e.detail.uuid,
        title: e.detail.title,
        type: e.detail.type,
        template: e.detail.clientTemplateName,
        content: e.detail.content
      });
    });

    document.addEventListener('aerisCatalogueHideMetadata', (e) => {
      store.commit('hideMetadata');
    });

    document.addEventListener('aerisCatalogueEditMetadata', (e) => {
      store.commit('editMetadata', {
        uuid: e.detail.uuid,
        title: e.detail.resourceTitle,
        type: e.detail.type,
        template: e.detail.clientTemplateName,
        content: e.detail.content
      });
    });
  }
}
