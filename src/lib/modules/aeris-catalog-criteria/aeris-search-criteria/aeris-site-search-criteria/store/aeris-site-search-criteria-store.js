export default {
    state: {
      sites: []
    },
  
    getters: {
      getSites: state => state.sites
    },
  
    mutations: {
      setSites(state, sites) {
        state.sites = sites;
      },
      resetSites(state) {
        console.log("resetSites : ", state.sites)
        state.sites = [];
      }
    }
  };
  