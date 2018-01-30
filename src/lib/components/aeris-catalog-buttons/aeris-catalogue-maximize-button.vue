
 </style>
<i18n>
{
  "en": {
    "maximize": "Full screen mode",
    "minimize": "Normal screen mode"
  },
  "fr": {
    "maximize": "Mode plein ecran",
    "minimize": "Mode écran normal"
  }
}
</i18n>

<template>
<div>
  <aeris-catalog-ui-icon-button v-if="maximize" theme="accent" icon="fa-expand" :title="computeTitle" @click="handleMaximize"></aeris-catalog-ui-icon-button>
  <aeris-catalog-ui-icon-button v-else theme="accent" icon="fa-compress" :title="computeTitle" @click="handleMaximize"></aeris-catalog-ui-icon-button>
</div>
</template>

<script>
export default {

  name: 'aeris-catalogue-maximize-button',

  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value
    }
  },

  created: function() {
    console.log("aeris-catalogue-search-button creation")
    this.$i18n.locale = this.lang
  },

  computed: {

    computeTitle: function() {
      if (this.maximize) {
        return this.$i18n.t('maximize');
      } else {
        return this.$i18n.t('minimize');
      }
    }

  },

  data() {
    return {
      maximize: true
    }
  },

  methods: {
    handleMaximize: function() {
      if (this.maximize) {
        this.maximize = false
        var e = new CustomEvent("aerisCatalogueMaximizeEvent", {
          detail: {}
        })
        document.dispatchEvent(e);
      } else {
        this.maximize = true
        var e = new CustomEvent("aerisCatalogueMinimizeEvent", {
          detail: {}
        })
        document.dispatchEvent(e);
      }
    }
  }
}
</script>
