export default {
  state: {
    keywords
  },

  getters: {
    getKeywordse: state => state.keywords
  },

  mutations: {
    setKeywords(state, keywords) {
      state.keywords = keywords;
    }
  }
};