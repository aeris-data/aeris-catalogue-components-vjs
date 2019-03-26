import axios from "axios";
import { computeUuid } from "aeris-commons-components-vjs/src/lib/modules/aeris-notification/utils/utils";

export default {
  state: {
    summaries: null,
    selectedSummaryId: null,
    range: {
      min: 0,
      max: 24
    },
    step: 25,
    total: 0
  },

  getters: {
    getSummaries: state => state.summaries,
    getSelectedSummaryId: state => state.selectedSummaryId,
    getRange: state => state.range,
    getTotal: state => state.total,
    hasMore: state => {
      return state.range.max < state.total;
    }
  },

  mutations: {
    setSummaries(state, summaries) {
      if (state.summaries) {
        state.summaries = state.range.min === 0 ? summaries : [...state.summaries, ...summaries];
      } else {
        state.summaries = summaries;
      }
    },
    setSelectedSummaryId(state, selectedSummaryId) {
      state.selectedSummaryId = selectedSummaryId;
    },
    setRange(state, range) {
      if (range.min && range.max) {
        state.range.min = range.min;
        state.range.max = range.max;
      }
    },
    setStep(state, step) {
      state.step = step;
    },
    resetToDefaultValues(state) {
      state.summaries = null;
      state.selectedSummaryId = null;
      state.range = {
        min: 0,
        max: 24
      };
      state.step = 25;
    },
    setTotal(state, total) {
      state.total = total;
    }
  },
  actions: {
    getSummaries({ commit, dispatch }, data) {
      let uuid = computeUuid();
      let notification = {
        message: "searching",
        type: "wait",
        uuid: uuid
      };
      dispatch("addNewNotification", notification);
      axios
        .post(data.url, data.criteria)
        .then(response => {
          commit("setSummaries", response.data.results);
          commit("setTotal", response.data.total);
          dispatch("deleteNotification", uuid);
        })
        .catch(() => {
          commit("resetToDefaultValues");
          dispatch("deleteNotification", uuid);
        });
    },
    getNextRange({ state }) {
      let max = state.range.max + state.step;
      if (max >= state.total) {
        max = state.total;
      }
      state.range.min = state.range.min + state.step;
      state.range.max = max;
      return state.range;
    }
  }
};
