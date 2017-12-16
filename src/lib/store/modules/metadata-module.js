export default {

  state: {
    isEdited: false,
    isVisible: false,
    uuid: null,
    title: null,
    type: null,
    template: null,
    content: null
  },

  mutations: {
    displayMetadata(state, payload) {
      this.commit('endEditionMetadata');
      this.commit('showMetadata');
      this.commit('updateMetadata', payload);
    },

    editMetadata(state, payload) {
      this.commit('startEditionMetadata');
      this.commit('showMetadata');
      this.commit('updateMetadata', payload);
    },

    hideMetadata(state, payload) {
      this.commit('endEditionMetadata');
      this.commit('hideMetadata');
      this.commit('updateMetadata', {
        uuid: "",
        title: "",
        type: "",
        template: "",
        content: ""
      });
    },

    updateMetadata(state, payload) {
      state.uuid = payload.uuid;
      state.title = payload.title;
      state.type = payload.type;
      state.template = payload.template;
      state.content = payload.content;
      document.dispatchEvent(new CustomEvent('aerisCatalogueMetadataUpdated', {
        detail: {
          uuid: state.uuid,
          isEdited: state.isEdited
        }
      }));
    },
    startEditionMetadata(state) {
      state.isEdited = true;
    },
    endEditionMetadata(state) {
      state.isEdited = false;
    },
    showMetadata(state) {
      state.isVisible = true;
    },
    hideMetadata(state) {
      state.isVisible = false;
    }
  }
};
