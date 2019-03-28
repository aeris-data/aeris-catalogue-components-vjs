import Vue from "vue";
import Vuex from "vuex";

import AerisTemporalSearchCriteria from "./components/aeris-temporal-search-criteria";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    AerisTemporalSearchCriteria: AerisTemporalSearchCriteria
  }
});

Vue.use(AerisTemporalSearchCriteria, {
  store: store
});
