export default {
  state: {
    date: { from: "", to: "" }
  },
  getters: {
    getDate: state => state.date
  },
  mutations: {
    setDate(state, date) {
      state.date = date;
    },
    setFromDate(state, fromDate) {
      state.date.from = fromDate;
    },
    setToDate(state, toDate) {
      state.date.to = toDate;
    },
    resetDate(state) {
      state.date = { from: "", to: "" };
    }
  }
};
