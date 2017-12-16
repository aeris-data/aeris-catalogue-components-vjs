export default {

  listen(store) {
    document.addEventListener('aerisAskForHelp', (e) => {
      store.commit('openHelp');
    });
  }
}
