<i18n>
{
  "en": {
    "help": "Help",
    "helpMessage": "To search for data, select criterias in the column at the left of your screen, then click on the search button:",
    "doNotDisplay": "Do not display this message again"
  },
  "fr": {
    "help": "Aide",
    "helpMessage": "Pour effectuer une recherche, sélectionnez vos critères dans la colonne à gauche de votre écran, puis cliquez sur le bouton rechercher :",
    "doNotDisplay": "Ne plus afficher ce message"
  }
}
</i18n>

<template>
<div class="help-popup" v-show="isPopupOpen">

  <div class="popup-title">
    <h3>{{$t('help')}}</h3>
  </div>

  <div class="popup-content">
    <div class="message">{{$t('helpMessage')}}</div>
    <div class="message-button">
      <div class="map-rounded-button aeris-catalog-button">
        <i class="fa fa-search"></i>
      </div>
    </div>
  </div>

  <div class='popup-buttons'>
    <div class="ok-button" @click="closePopup">OK</div>
    <div>
      <button class="show-at-startup-button" type="button" v-on:click.stop="doNotShow" v-if="showAtStartVisible">{{$t('doNotDisplay')}}</button>
    </div>
  </div>

</div>
</template>

<script>
import store from '../../store/index.js'

export default {

  name: 'aeris-catalog-help-content',

  props: {
    lang: {
      type: String,
      default: 'en'
    },
    helpcookie: {
      type: String,
      default: 'help-popup'
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value
    }
  },

  destroyed: function() {
    document.removeEventListener('askForHelp', this.askForHelpListener);
    this.askForHelpListener = null;
  },

  created: function() {
    console.log("aeris-catalog-help-content creation")
    this.$i18n.locale = this.lang
    // listen calls for help
    this.askForHelpListener = this.showHelp.bind(this)
    document.addEventListener('aerisAskForHelp', this.askForHelpListener);
    if (this.helpcookie == null || this.getCookie(this.helpcookie)) {
      this.isPopupOpen = false;
      this.showAtStartVisible = false;
    } else {
      this.isPopupOpen = true;
    }
  },

  mounted() {
    this.$nextTick(() => this.ensureTheme);
  },

  computed: {
    togglePopup: function() {
      this.isPopupOpen = !this.isPopupOpen;
      return this.isPopupOpen;
    },

    theme() {
      return store.state.common.theme;
    }
  },

  data() {
    return {
      aerisThemeListener: null,
      isPopupOpen: false,
      showAtStartVisible: true
    }
  },

  updated: function() {},

  methods: {

    ensureTheme: function() {
      if (this.isPopupOpen) {
        var okButton = this.$el.querySelector('.ok-button');
        var showAtStartButton = this.$el.querySelector('.show-at-startup-button');
        if (this.theme) {
          okButton.style.background = this.theme.primary;
          if (this.showAtStartVisible) {
            showAtStartButton.style.borderColor = this.theme.primary;
          }
        }
        var primary = this.theme.primary;
        var darker = this.colorLuminance(primary, -0.3)

        okButton.addEventListener("mouseover", function() {
          okButton.style.background = darker;
        })
        okButton.addEventListener("mouseout", function() {
          okButton.style.background = primary;
        })
      }
    },

    colorLuminance: function(hex, lum) {
      //from https://www.sitepoint.com/javascript-generate-lighter-darker-color/
      // validate hex string
      hex = String(hex).replace(/[^0-9a-f]/gi, '');
      if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      lum = lum || 0;

      // convert to decimal and change luminosity
      var rgb = "#",
        c, i;
      for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
      }

      return rgb;
    },

    showHelp: function() {
      this.isPopupOpen = true;
      this.ensureTheme();
    },

    closePopup: function() {
      this.togglePopup;
    },

    doNotShow: function() {
      this.setCookie(this.helpcookie, 1, 365);
      this.closePopup();
    },

    setCookie: function(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = 'expires=' + d.toUTCString();
      document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
      this.showAtStartVisible = false;
    },

    getCookie: function(cname) {
      var name = cname + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    }

  }
}
</script>

<style>

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

	.popup-content, .message-button, .ok-button {
		display: inline-block;
		text-align: center;
	}

	.ok-button {
	    background-color: #8CD4F5;
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
		border: 1px solid #F1684E;
		border-radius: 5px;
	}

	.show-at-startup-button:hover {
		opacity: 0.6;
		cursor: pointer
	}

	.popup-buttons {
		text-align: center;
    	margin-top: 10px;
	}

 </style>
