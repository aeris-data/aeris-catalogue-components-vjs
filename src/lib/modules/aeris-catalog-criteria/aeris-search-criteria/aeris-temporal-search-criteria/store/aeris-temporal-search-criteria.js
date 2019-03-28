export default {
  state: {
    date: "1970-01-01"
  },
  getters: {
    getDate: state => state.date
  },
  mutations: {
    setDate(state, date) {
      state.date = date;
    }
  }
};
