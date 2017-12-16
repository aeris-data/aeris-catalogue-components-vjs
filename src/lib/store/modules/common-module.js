export default {

  state: {
    theme: null
  },

  mutations: {

    updateTheme(state, payload) {
      state.theme = payload.theme;
    },

    startLongAction(state, payload) {
      document.dispatchEvent(new CustomEvent('aerisLongActionStartEvent', {
        'detail': {
          message: payload.message
        }
      }));
    },

    stopLongAction(state, payload) {
      document.dispatchEvent(new CustomEvent('aerisLongActionStopEvent', {
        'detail': {
          message: payload.message
        }
      }));
    },

    notifyMessage(state, payload) {
      document.dispatchEvent(new CustomEvent('aerisNotificationMessageEvent', {
        'detail': {
          message: payload.message
        }
      }))
    }
  }
};
