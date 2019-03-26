import Vue from "vue";
import VueI18n from "vue-i18n";
Vue.use(VueI18n);

const messages = {
  en: { years: "Year(s):", addingToCart: "Addition in progress" },
  fr: { years: "Année(s):", addingToCart: "Ajout en cours" }
};

const i18n = new VueI18n({ locale: "en", messages });

export default i18n;
