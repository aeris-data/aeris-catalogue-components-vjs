export default {

  listen(store) {
    document.addEventListener('aerisTheme', (e) => { 
      store.commit('updateTheme', {
        theme: e.detail
      })
    });
  }
}
