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
<div v-show="displayed" data-aeris-catalog-ui-confirmation>
  <section class="confirmation-container">
    <h1>{{title}}</h1>
    <p>{{message}}</p>
    <div class="buttons">
      <aeris-catalog-ui-button @click="cancel" :text="$t('no')"></aeris-catalog-ui-button>
      <aeris-catalog-ui-button :theme="'accent'" @click="validate" :text="$t('yes')"></aeris-catalog-ui-button>
    </div>
  </section>
</div>
</template>

<script>
export default {
  
  name: 'aeris-catalog-ui-confirmation',

  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },

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
[data-aeris-catalog-ui-confirmation] {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
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

[data-aeris-catalog-ui-confirmation] .confirmation-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #FAFAFA;
  width: 100%;
  padding: 64px;
}

[data-aeris-catalog-ui-confirmation] h1 {
  border-bottom: 1px solid #333;
  font-size: 1.4rem;
  font-weight: 300;
  color: #555;
}

[data-aeris-catalog-ui-confirmation] p {
  text-align: center;
  font-size: 1.1rem;
  margin: 1rem;
}

[data-aeris-catalog-ui-confirmation] .buttons {
  display: flex;
  flex-direction: row;
}

[data-aeris-catalog-ui-confirmation] button {
  margin: 1rem;
}
</style>
