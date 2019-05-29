export default {
  state: {
    checkBoxCriteria: []
  },

  getters: {
    getSelectedCheckBoxCriteria: state => { return state.checkBoxCriteria }
  },

  mutations: {
    setSelectedCheckBoxCriteria(state, criteria) {
      let type = criteria.type;
      let items = criteria.value.filter(element => element.checked == true);

      let subitems = criteria.value.map(element => element.subitems.filter(criteria => criteria.checked == true));
      subitems = [].concat.apply([], subitems);

      state.checkBoxCriteria[type] = items.map(criteria => criteria.storeValue);
      subitems = subitems.map(criteria => criteria.storeValue);

      state.checkBoxCriteria[type] = state.checkBoxCriteria[type].concat(subitems);
    },
    resetSelectedCheckBoxCriteria(state) {
      state.checkBoxCriteria = [];
    }
  }
};
