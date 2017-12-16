export default {

  state: {
    services: null,
    program: null,
    search: false,
    minimize: false,
    maximize: false
  },

  mutations: {
    updateServices(state, payload) {
      state.services = {
        metadata: payload.services.metadata && !payload.services.metadata.endsWith('/') ? `${payload.services.metadata}/` : payload.services.metadata,
        orcid: payload.services.orcid && !payload.services.orcid.endsWith('/') ? `${payload.services.orcid}/` : payload.services.orcid,
        download: payload.services.download && !payload.services.download.endsWith('/') ? `${payload.services.download}/` : payload.services.download,
        preview: payload.services.preview && !payload.services.preview.endsWith('/') ? `${payload.services.preview}/` : payload.services.preview
      };
      document.dispatchEvent(new CustomEvent('aerisCatalogueServices', {
        detail: state.services
      }))
    },

    updateProgram(state, payload) {
      state.program = payload.program;
      document.dispatchEvent(new CustomEvent('aerisCatalogueProgram', {
        detail: state.program
      }));
    },

    startSearch(state) {
      state.search = true;
    },

    minimize(state) {
      state.minimize = true;
      state.maximize = false;
    },

    maximize(state) {
      state.maximize = true;
      state.minimize = false;
    },

    updateSummaries(state, payload) {
      document.dispatchEvent(new CustomEvent('aerisSummaries', {
        'detail': {
          summaries: payload.summaries
        }
      }));
    }
  }
};
