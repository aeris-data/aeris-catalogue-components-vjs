export default {
  state: {
    keywords: []
  },

  getters: {
    getKeywords: state => state.keywords
  },

  mutations: {
    setKeywords(state, keywords) {
      state.keywords = keywords;
    },
    resetKeywords(state) {
      state.keywords = [];
    }
  }
};
