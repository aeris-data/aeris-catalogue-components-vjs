import Vue from "vue";
import VueI18n from "vue-i18n";
Vue.use(VueI18n);

const messages = {
  en: {
    searching: "Searching...",
    noresult: "No result corresponding to your request",
    nocriteria: "No criteria selected"
  },
  fr: {
    searching: "Recherche...",
    noresult: "Aucun résultat ne correspond à votre requête",
    nocriteria: "Aucun critère sélectionné"
  }
};

const i18n = new VueI18n({ locale: "en", messages });

export default i18n;
