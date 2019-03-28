import Vue from "vue";
import VueI18n from "vue-i18n";
Vue.use(VueI18n);

const messages = {
  en: { searching: "Searching..." },
  fr: { searching: "Recherche..." }
};

const i18n = new VueI18n({ locale: "en", messages });

export default i18n;
