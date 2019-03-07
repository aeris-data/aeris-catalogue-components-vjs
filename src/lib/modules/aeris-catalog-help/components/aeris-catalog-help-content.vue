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
    helpCookie: {
      type: String,
      default: "help-popup"
    },
    language: {
      type: String,
      default: "en"
    },
    theme: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      isPopupOpen: false,
      showAtStartVisible: true
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
    },
    "theme.primaryColor"() {
      this.ensureTheme();
    }
  },

  created() {
    this.$i18n.locale = this.language;
    if (this.helpCookie == null || this.getCookie(this.helpCookie)) {
      this.isPopupOpen = false;
      this.showAtStartVisible = false;
    } else {
      this.isPopupOpen = true;
    }
  },
  mounted() {
    this.ensureTheme();
  },
  methods: {
    closePopup() {
      this.togglePopup;
    },
    colorLuminance(hex, lum) {
      hex = String(hex).replace(/[^0-9a-f]/gi, "");
      if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      lum = lum || 0;
      let rgb = "#",
        c,
        i;
      for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
      }
      return rgb;
    },

    doNotShow() {
      this.setCookie(this.helpCookie, 1, 365);
      this.closePopup();
    },

    ensureTheme() {
      let okButton = this.$el.querySelector(".ok-button");
      let showAtStartButton = this.$el.querySelector(".show-at-startup-button");
      if (this.theme) {
        okButton.style.background = this.theme.primaryColor;
        if (this.showAtStartVisible) {
          showAtStartButton.style.borderColor = this.theme.primaryColor;
        }
        let primaryColor = this.theme.primaryColor;
        let darker = this.colorLuminance(primaryColor, -0.3);
        okButton.addEventListener("mouseover", () => {
          okButton.style.background = darker;
        });
        okButton.addEventListener("mouseout", () => {
          okButton.style.background = primaryColor;
        });
      }
    },

    getCookie(cname) {
      let name = cname + "=";
      let ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },

    handleTheme(theme) {
      this.theme = theme.detail;
      this.ensureTheme();
    },

    setCookie(cname, cvalue, exdays) {
      let d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      this.showAtStartVisible = false;
    },

    showHelp() {
      this.isPopupOpen = true;
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
  background-color: #a79baf;
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
