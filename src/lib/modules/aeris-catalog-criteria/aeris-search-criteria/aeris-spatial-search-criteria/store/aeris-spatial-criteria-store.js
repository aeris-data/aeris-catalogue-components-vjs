export default {
  state: {
    coordinate: {
      north: "",
      south: "",
      east: "",
      west: ""
    }
  },

  getters: {
    getCoordinate: state => state.coordinate
  },

  mutations: {
    setCoordinate(state, coordinate) {
      state.coordinate = coordinate;
    },
    resetCoordinate(state) {
      state.coordinate = {
        north: "",
        south: "",
        east: "",
        west: ""
      };
    }
  }
};
