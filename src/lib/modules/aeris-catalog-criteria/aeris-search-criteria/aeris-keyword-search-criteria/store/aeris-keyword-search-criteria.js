export default {
  state: {
    keywords: [],
    inputValue: ""
  },

  getters: {
    getInputValue: state => state.inputValue,
    getKeywords: state => state.keywords
  },

  mutations: {
    setKeywords(state, keywords) {
      state.keywords = keywords;
    },
    setInputValueKeyword(state, value) {
      state.inputValue = value;
    },
    resetKeywords(state) {
      state.keywords = [];
      state.inputValue = "";
    }
  }
};
