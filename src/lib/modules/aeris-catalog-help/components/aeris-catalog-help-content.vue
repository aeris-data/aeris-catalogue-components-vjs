<i18n>
{
  "en": {
    "help": "Help",
    "helpMessage": "To search for data, select criterias in the column at the left of your screen, then click on the search button :",
    "warningMessage": "This catalogue is still in development: we are working on improving both its features and its content. If you detect some bugs or if you have ideas for evolutions, please contact us with this <a href='https://en.aeris-data.fr/contact/' target='_blank'>form</a>.",
    "doNotDisplay": "Do not display this message again"
  },
  "fr": {
    "help": "Aide",
    "helpMessage": "Pour effectuer une recherche, sélectionnez vos critères dans la colonne à gauche de votre écran, puis cliquez sur le bouton rechercher :",
    "doNotDisplay": "Ne plus afficher ce message",
    "warningMessage": "Ce catalogue est toujours en développement: nous travaillons à améliorer son contenu et ses fonctionnalités. Si vous détectez une anomalie ou si vous avez des idées d'évolutions, n'hésitez pas à nous le signaler avec ce <a href='https://www.aeris-data.fr/contact/' target='_blank'>formulaire</a>."
  }
}
</i18n>

<template>
  <div v-show="isPopupOpen" class="help-popup">
    <div class="popup-title">
      <h3>{{ $t("help") }}</h3>
    </div>

    <div class="popup-content">
      <div class="message">{{ $t("helpMessage") }}</div>
      <div class="message-button">
        <div class="map-rounded-button aeris-catalog-button">
          <i class="fa fa-search"/>
        </div>
      </div>

      <div class="popup-buttons">
        <div class="ok-button" @click="closePopup">OK</div>
        <div>
          <button
            v-if="showAtStartVisible"
            class="show-at-startup-button"
            type="button"
            @click.stop="doNotShow"
          >{{ $t("doNotDisplay") }}</button>
        </div>
      </div>
      <br>
      <div>
        <i class="fa fa-warning fa-2x" style="padding-right: 10px;"/>
        <span v-html="$t('warningMessage')"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "aeris-catalog-help-content",

  props: {
    language: {
      type: String,
      default: "en"
    },
    helpCookie: {
      type: String,
      default: "help-popup"
    }
  },

  data() {
    return {
      aerisThemeListener: null,
      isPopupOpen: false,
      showAtStartVisible: true,
    };
  },

  computed: {
    togglePopup() {
      this.isPopupOpen = !this.isPopupOpen;
      return this.isPopupOpen;
    }
  },

  watch: {
    language(value) {
      this.$i18n.locale = value;
    }
  },

  created() {
    this.$i18n.locale = this.language;
    this.aerisThemeListener = this.handleTheme.bind(this);
    document.addEventListener("aerisTheme", this.aerisThemeListener);
    this.askForHelpListener = this.showHelp.bind(this);
    document.addEventListener("aerisAskForHelp", this.askForHelpListener);
    if (this.helpCookie == null || this.getCookie(this.helpCookie)) {
      this.isPopupOpen = false;
      this.showAtStartVisible = false;
    } else {
      this.isPopupOpen = true;
    }
  },

  methods: {
    handleTheme(theme) {
      this.theme = theme.detail;
      this.ensureTheme();
    },

    showHelp() {
      this.isPopupOpen = true;
    },

    closePopup() {
      this.togglePopup;
    },

    doNotShow() {
      this.setCookie(this.helpCookie, 1, 365);
      this.closePopup();
    },

    setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      this.showAtStartVisible = false;
    },

    getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
  }
};
</script>

<style scoped>
.help-popup {
  display: inline-flex;
  flex-direction: column;
  position: fixed;
  z-index: 9999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;

  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  width: 30%;
}

.popup-title {
  display: flex;
  justify-content: center;
}

.popup-content,
.message-button,
.ok-button {
  display: inline-block;
  text-align: center;
}

.ok-button {
  background-color: #8cd4f5;
  color: white;
  border: none;

  font-size: 17px;
  font-weight: 500;
  -webkit-border-radius: 4px;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
}

.show-at-startup-button {
  align-self: flex-end;
  margin: 10px 30px 0 0;
  color: #333;
  background-color: transparent;
  outline: none;
  border: 1px solid #f1684e;
  border-radius: 5px;
}

.show-at-startup-button:hover {
  opacity: 0.6;
  cursor: pointer;
}

.popup-buttons {
  text-align: center;
  margin-top: 10px;
}
</style>
