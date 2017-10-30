<i18n>
{
  "en": {
    "yes": "Yes",
    "no": "No"
  },
  "fr": {
    "yes": "Oui",
    "no": "Non"
  }
}
</i18n>
<template>
<div v-show="displayed" class="aeris-ui-confirmation-host">
  <div class="message-container">
    <span class="title">{{title}}</span>
    <span class="message">{{message}}</span>
    <div class="buttons">
      <aeris-ui-button class="button" @click="cancel" :text="$t('no')"></aeris-ui-button>
      <aeris-ui-button class="button" :theme="'accent'" @click="validate" :text="$t('yes')"></aeris-ui-button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },

  name: 'aeris-ui-confirmation',

  data() {
    return {
      aerisConfirmationListener: null,
      title: null,
      message: null,
      displayed: false
    };
  },

  created() {

    this.$i18n.locale = this.lang;
    this.aerisConfirmationListener = this.handleConfirmation.bind(this);
    document.addEventListener('aerisConfirmationEvent', this.aerisConfirmationListener);
  },

  destroyed() {

    document.removeEventListener('aerisConfirmationEvent', this.aerisConfirmationListener);
    this.aerisConfirmationListener = null;
  },

  methods: {

    handleConfirmation(e) {
      this.title = e.detail.title;
      this.message = e.detail.message;
      this.displayed = true;
    },

    cancel() {
      this.displayed = false;
    },

    validate() {

      document.dispatchEvent(new CustomEvent('aerisConfirmationValidate'));
      this.displayed = false;
    }
  }
}
</script>

<style>
.aeris-ui-confirmation-host {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  animation-name: appearance;
  animation-duration: 100ms;
}


@keyframes appearance {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.aeris-ui-confirmation-host .message-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #F5F5F5;
  width: 30rem;
  height: 15rem;
}

.aeris-ui-confirmation-host .title {
  border-bottom: 1px solid #F39C12;
  font-size: 1.4rem;
  font-weight: normal;
  color: #555;
}

.aeris-ui-confirmation-host .message {
  text-align: center;
  font-size: 1.1rem;
  margin: 1rem;
}

.aeris-ui-confirmation-host .buttons {
  display: flex;
  flex-direction: row;
}

.aeris-ui-confirmation-host .button {
  margin: 1rem;
}
</style>
