import axios from "axios";
import { computeUuid } from "aeris-commons-components-vjs/src/lib/modules/aeris-notification/utils/utils";
import i18n from "../language/aeris-catalog-summaries-i18n";

function isEmpty(object) {
  let empty = true;
  let keys = Object.keys(object);
  if (keys.length > 0) {
    keys.forEach(key => {
      let currentObject = object[key];
      if (currentObject !== null && currentObject === Object(currentObject)) {
        if (
          (Array.isArray(currentObject) && currentObject.length > 0) ||
          (!Array.isArray(currentObject) && Object.keys(currentObject).length > 0)
        ) {
          empty = empty && isEmpty(currentObject);
        } else {
          empty = empty && true;
        }
      } else if (currentObject) {
        empty = empty && false;
      } else {
        empty = empty && true;
      }
    });
  } else {
    empty = object !== null || object !== "";
  }
  return empty;
}

export default {
  state: {
    summaries: null,
    selectedSummaryId: null,
    range: {
      min: 0,
      max: 24
    },
    step: 25,
    total: 0,
    language: "en"
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
    setLanguage: (state, language) => {
      if (language) {
        state.language = language;
        i18n.locale = language;
      }
    },
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
    resetSummariesToDefaultValues(state) {
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
      if (!isEmpty(data.criteria)) {
        let uuid = computeUuid();
        let notification = {
          message: i18n.t("searching"),
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

            if (response.data.total < 1) {
              dispatch("addNewNotification", {
                message: i18n.t("noresult"),
                type: "notification"
              });
            }
          })
          .catch(() => {
            commit("resetToDefaultValues");
            dispatch("deleteNotification", uuid);
          });
      } else {
        dispatch("addNewNotification", {
          message: i18n.t("nocriteria"),
          type: "error"
        });
      }
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
