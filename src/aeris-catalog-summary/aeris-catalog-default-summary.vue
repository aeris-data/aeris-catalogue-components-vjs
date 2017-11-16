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
<div data-aeris-catalog-default-summary v-bind:class="{ showBody: deployed }">
  <div id="main" class="box noselect">
    <header class="box-heading" v-on:click="deployed = !deployed">
      <div class="box-title">
        <i :class="headerIconClass" id="icon" v-show="headerIconClass"></i>
        <h4 no-label-float><aeris-international-field html="true" :lang="lang" :value="title"></aeris-international-field></h4>
      </div>
      <div class="box-heading-buttons">
        <i class="chevron" :class="openIconClass"></i>
      </div>
    </header>
    <div id="collapse" class="box-collapsable-part">
      <main class="box-body">
        <div class="content">
          <aeris-international-field :lang="lang" :value="description" :max-length="maxLength"></aeris-international-field>
        </div>
      </main>
      <footer class="box-footer">
        <div class="metadata-datalevel">
          <div v-if="dataProcessingLevel" class="cartouche"><i class="fa fa-cogs"></i>{{$t("level")}} {{dataProcessingLevel}}</div>
        </div>
        <div>
          <button type="button" class="expandButton" v-on:click="displayDetails">{{$t("details")}}</button>
        </div>
      </footer>
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

  destroyed: function() {
    document.removeEventListener('aerisTheme', this.aerisThemeListener);
    this.aerisThemeListener = null;
  },

  created: function() {
    console.log("aeris-keyword-search-criteria - Creating");
    this.aerisThemeListener = this.handleTheme.bind(this)
    document.addEventListener('aerisTheme', this.aerisThemeListener);
  },

  mounted: function() {
    var event = new CustomEvent('aerisThemeRequest', {});
    document.dispatchEvent(event);
    if (this.lang) {
      this.$i18n.locale = this.lang
    }
  },

  computed: {

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
      theme: null,
      aerisThemeListener: null,
      hasToolbar: false
    }
  },

  updated: function() {
    this.ensureTheme()
  },

  methods: {

    handleChevronClick: function() {

    },

    handleTheme: function(theme) {
      this.theme = theme.detail
      this.ensureTheme()
    },

    ensureTheme: function() {
      if (this.theme) {
        this.$el.querySelector("header").style.background = this.theme.primary

        var self = this.$el.querySelector("button");
        var primary = this.theme.primary;
        this.$el.querySelector("button").style.background = primary;
        var darker = this.$colorLuminance(primary, -0.3)
        self.addEventListener("mouseover", function() {
          self.style.background = darker;
        })
        self.addEventListener("mouseout", function() {
          self.style.background = primary;
        })
      }
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

<style>

[data-aeris-catalog-default-summary] .box-collapsable-part {
    display: none;
    transition: 0.3s
}

[data-aeris-catalog-default-summary].showBody .box-collapsable-part {
    display: block;
    transition: 0.3s
}
[data-aeris-catalog-default-summary].showBody .chevron {
    transform: rotate(180deg)
}
[data-aeris-catalog-default-summary] .chevron {
    transition: 0.3s
}

[data-aeris-catalog-default-summary] {
    box-sizing: border-box;
    transition: transform 4s ease-out;
}

[data-aeris-catalog-default-summary] > div {
	box-shadow:  2px 2px 2px 0px rgba(0,0,0,0.4);
}

[data-aeris-catalog-default-summary]:hover {
    cursor: default
}
[data-aeris-catalog-default-summary] .box {
    box-sizing: border-box;
    width: 100%;
    color: #333;
    background-color: #fff
}
[data-aeris-catalog-default-summary] .box-title {
    display: flex;
    font-size: 16px;
    line-height: 1.2;
    margin-left: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
	align-items: center;
	justify-content: center;
}
[data-aeris-catalog-default-summary] .box-title .plateform-icon,
[data-aeris-catalog-default-summary] .box-title .fa {
    margin-right: 10px
}

[data-aeris-catalog-default-summary] header {
	color:#fff;
}

[data-aeris-catalog-default-summary] .box-title h4 {
    margin: 0;
    font-size: 16px;
}
[data-aeris-catalog-default-summary] .box-body {
    font-size: 14px;
    word-wrap: break-word
}
[data-aeris-catalog-default-summary] .box-body .content {
    padding: 10px;
    text-align: justify
}
[data-aeris-catalog-default-summary] .box-toolbar {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 5px 10px;
    border-bottom: 1px solid #ccc;
    background-color: #fafafa
}
[data-aeris-catalog-default-summary] .box-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f5f5;
    border: none;
    cursor: pointer
}
[data-aeris-catalog-default-summary] .box-heading .box-heading-buttons {
    display: flex;
    flex-flow: row nowrap;
    margin-right:5px;
}
[data-aeris-catalog-default-summary] .box-heading .box-heading-buttons .fa {
    margin-left: 5px
}

[data-aeris-catalog-default-summary] .box-collapsable-part {
	border: 1px solid #ddd;
}
[data-aeris-catalog-default-summary] .box-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px
}
[data-aeris-catalog-default-summary] .expandButton {
    font-size: 14px;
    padding: 6px 13px;
    margin: 0 5px;
    color:  #fff;
    border: 1px solid;
    background-color: #4765A0;
    opacity: 1;
    outline: none
}
[data-aeris-catalog-default-summary] .expandButton:hover {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    color: #fff;
    background-color: #d35400;
    opacity: 1
}
[data-aeris-catalog-default-summary] .metadata-datalevel .cartouche {
    display: inline-block;
    padding: 3px 5px;
    border-radius: 5px;
    color: #fff;
    font-size: 12px;
    background-color: #f0ad4e
}
[data-aeris-catalog-default-summary] .metadata-datalevel .cartouche .fa {
    margin-right: 5px
}
 </style>
