export default {
  state: {
    selectedCriteria: {}
  },

  getters: {
    getSelectedCriteria: state => state.selectedCriteria
  },

  mutations: {
    setSelectedCriteria(state, selectedCriteria) {
      let type = selectedCriteria.type;
      if (type && state.selectedCriteria[type]) {
        if (
          selectedCriteria.thesaurusItem.checked &&
          !state.selectedCriteria[type].includes(selectedCriteria.thesaurusItem.search)
        ) {
          state.selectedCriteria[type].push(selectedCriteria.thesaurusItem.search);
        } else if (
          !selectedCriteria.thesaurusItem.checked &&
          state.selectedCriteria[type].includes(selectedCriteria.thesaurusItem.search)
        ) {
          state.selectedCriteria[type].splice(
            state.selectedCriteria[type].indexOf(selectedCriteria.thesaurusItem.search),
            1
          );
        }
      } else if (type && selectedCriteria.thesaurusItem.checked) {
        state.selectedCriteria[type] = [];
        state.selectedCriteria[type].push(selectedCriteria.thesaurusItem.search);
      }
    },

    clearSelectedCriteria(state) {
      state.selectedCriteria = {};
    }
  }
};
