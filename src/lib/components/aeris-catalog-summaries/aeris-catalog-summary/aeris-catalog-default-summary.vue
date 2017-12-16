<i18n>
{
  "en": {
    "level": "Level",
    "details": "Details"
  },
  "fr": {
    "level": "Niveau",
    "details": "Détails"
  }
}
</i18n>
<template>
<div data-template="summary" v-bind:class="{ showBody: deployed }" v-on:click="displayDetails">
  <header>
    <div v-if="dataProcessingLevel" class="cartouche" :style="{'background': $colorLuminance(theme.primary, -0.1)}"><i class="fa fa-cogs"></i>{{$t("level")}} {{dataProcessingLevel}}</div>
  </header>
  <main>
    <aeris-international-field class="title" html="true" :lang="lang" :value="title"></aeris-international-field>
  </main>
</div>
</template>

<script>
import store from '../../../store/index.js'

export default {

  name: 'aeris-catalog-default-summary',

  props: {

    lang: {
      type: String,
      default: 'en'
    },

    maxLength: {
      type: Number,
      default: 2000
    },

    deployed: {
      type: Boolean,
      default: false
    },
    openIconClass: {
      type: String,
      default: 'fa fa-chevron-down'
    },
    value: {
      type: String,
      default: ''
    },
    clientTemplateName: {
      type: String,
      default: ''
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value
    }
  },

  created: function() {
    console.log("aeris-keyword-search-criteria - Creating");
  },

  mounted: function() {
    if (this.lang) {
      this.$i18n.locale = this.lang
    }
  },

  computed: {

    theme() {
      return store.state.common.theme;
    },

    title: function() {
      var aux = JSON.parse(this.value)
      if (aux.title) {
        return JSON.stringify(aux.title)
      } else {
        return "";
      }
    },

    uuid: function() {
      var aux = JSON.parse(this.value)
      if (aux.id) {
        var tmp = JSON.stringify(aux.id)
        return tmp.replace(/['"]+/g, '')
      } else {
        return "";
      }
    },

    description: function() {
      var aux = JSON.parse(this.value)
      if (aux.description) {
        return JSON.stringify(aux.description)
      } else {
        return "";
      }
    },

    dataProcessingLevel: function() {
      var aux = JSON.parse(this.value)
      if (aux.dataProcessingLevel) {
        var tmp = JSON.stringify(aux.dataProcessingLevel);
        return tmp.replace(/L/gi, '').replace(/['"]+/g, '');
      } else {
        return "";
      }
    },

    headerIconClass: function() {
      var aux = JSON.parse(this.value)
      if (aux.plateformType) {
        return "aeris-icon aeris-icon-" + aux.plateformType
      } else {
        return "aeris-icon aeris-icon-unknown"
      }
    },

    type: function() {
      var aux = JSON.parse(this.value)
      if (aux.type) {
        return aux.type;
      } else {
        return "";
      }
    },

    clientTemplateName: function() {
      var aux = JSON.parse(this.value)
      if (aux.clientTemplateName) {
        return aux.clientTemplateName;
      } else {
        return "";
      }
    },


  },

  data() {
    return {
      hasToolbar: false
    }
  },

  methods: {

    handleChevronClick: function() {

    },

    displayDetails: function() {
      var event = new CustomEvent('aerisCatalogueDisplayMetadata', {
        detail: {
          type: this.type,
          uuid: this.uuid,
          title: this.title,
          iconClass: this.headerIconClass,
          clientTemplateName: this.clientTemplateName
        }
      });
      document.dispatchEvent(event);
    }


  }
}
</script>
