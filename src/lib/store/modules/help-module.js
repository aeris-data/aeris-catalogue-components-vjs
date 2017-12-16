export default {

  state: {
    isVisible: false
  },

  mutations: {
    openHelp(state) {
      state.isVisible = true;
    },
    closeHelp(state) {
      state.isVisible = false;
    }
  }
}
