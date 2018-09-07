<i18n>
{
  "en": {
    "level": "Level",
    "details": "Details",
    "addingToCart": "Adding to cart"
  },
  "fr": {
    "level": "Niveau",
    "details": "Détails",
    "addingToCart": "Ajout au panier"
  }
}
</i18n>

<template>
<div data-template="summary" v-bind:class="{ showBody: deployed }"  @click="displayDetails" >
  <!--  <i @click.stop ="addToCart" class="fa fa-download" style="color: rgb(85, 85, 85);float:right;"></i> -->
  <main>
    <aeris-international-field class="title" html="false" :lang="lang" :value="title" :maxLength="maxLength"></aeris-international-field> 
  </main>
  <footer>
    <div v-if="projectList" class="cartouche" v-for="project in projectList" >{{project.projectName}}</div>
  </footer>
</div>
</template>

<script>
export default {
  name: "aeris-catalog-default-summary",

  props: {
    lang: {
      type: String,
      default: "en"
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
      default: "fa fa-chevron-down"
    },
    value: {
      type: String,
      default: ""
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value;
    }
  },

  destroyed: function() {
    document.removeEventListener("aerisTheme", this.aerisThemeListener);
    this.aerisThemeListener = null;    
  },

  created: function() {
    console.log("aeris-keyword-search-criteria - Creating");
    this.aerisThemeListener = this.handleTheme.bind(this);
    document.addEventListener("aerisTheme", this.aerisThemeListener);
  },

  mounted: function() {
    var event = new CustomEvent("aerisThemeRequest", {});
    document.dispatchEvent(event);
    if (this.lang) {
      this.$i18n.locale = this.lang;
    }
  },

  computed: {
    title: function() {
      var aux = JSON.parse(this.value);
      if (aux.title) {
        return JSON.stringify(aux.title);
      } else {
        return "";
      }
    },

    uuid: function() {
      var aux = JSON.parse(this.value);
      if (aux.id) {
        var tmp = JSON.stringify(aux.id);
        return tmp.replace(/['"]+/g, "");
      } else {
        return "";
      }
    },

    description: function() {
      var aux = JSON.parse(this.value);
      if (aux.description) {
        return JSON.stringify(aux.description);
      } else {
        return "";
      }
    },

    dataProcessingLevel: function() {
      var aux = JSON.parse(this.value);
      if (aux.dataProcessingLevel) {
        var tmp = JSON.stringify(aux.dataProcessingLevel);
        return tmp.replace(/L/gi, "").replace(/['"]+/g, "");
      } else {
        return "";
      }
    },

    headerIconClass: function() {
      var aux = JSON.parse(this.value);
      if (aux.plateformType) {
        return "aeris-icon aeris-icon-" + aux.plateformType;
      } else {
        return "aeris-icon aeris-icon-unknown";
      }
    },

    type: function() {
      var aux = JSON.parse(this.value);
      if (aux.type) {
        return aux.type;
      } else {
        return "";
      }
    },

    clientTemplateName: function() {
      var aux = JSON.parse(this.value);
      if (aux.clientTemplateName) {
        return aux.clientTemplateName;
      } else {
        return "";
      }
    },

    projectList: function() {
      var aux = JSON.parse(this.value);
      if (aux.projectList) {
        return aux.projectList;
      } else {
        return "";
      }
    },

    downloadable: function() {
      var aux = JSON.parse(this.value);
      if (aux.downloadable) {
        console.log(aux.downloadable);
        return aux.downloadable;
      } else {
        return "";
      }
    },

    collectionId: function() {
      var aux = JSON.parse(this.value);
      if (aux.id) {
        console.log(aux.id);
        return aux.id;
      } else {
        return "";
      }
    },
},
    data() {
      return {
        theme: null,
        aerisThemeListener: null,
        hasToolbar: false,
        urlService: null
      };
    },

  updated: function() {
    this.ensureTheme();
  },

  methods: {

    handleSuccess: function(response) {
     
      this.downloadEntries = response.body.entries;

      if (this.downloadEntries.length > 0) {
        this.downloadEntry = this.downloadEntries[0];
        this.visible = true;
        //this.ensureTheme();
        this.isInCart = false;
      }

      var url_download_service = this.downloadable;
      var obj = {
        collectionName: this.title,
        url: url_download_service,
        collectionId: this.collectionId,
        id: this.collectionId,
        data: "",
        fileNumber: this.downloadEntry.fileNumber,
        totalSize: this.downloadEntry.totalSize,
        type: "nofilter"
      };

      
      // send the informations
      var event = new CustomEvent("addItemToCartEvent", {detail: obj,lang: this.lang});
      document.dispatchEvent(event);
      this.isInCart = true;
      // hide notification
      document.dispatchEvent(new CustomEvent("aerisLongActionStopEvent", {detail: { message: this.$t("addingToCart") }}));
    },

    handleChevronClick: function() {},

    handleTheme: function(theme) {
      this.theme = theme.detail;
      this.ensureTheme();
    },

    ensureTheme: function() {
      if (this.theme && this.projectList) {
        let listCartouche = this.$el.querySelectorAll(".cartouche"); 
        for (var cartouche of listCartouche) {
          cartouche.style.background = this.$colorLuminance(this.theme.primary,-0.1);
        }
      }
    },

    displayDetails: function(e) {
      var event = new CustomEvent("aerisCatalogueDisplayMetadata", {
        detail: {
          type: this.type,
          uuid: this.uuid,
          title: this.title,
          iconClass: this.headerIconClass,
          clientTemplateName: this.clientTemplateName
        }
      });
      document.dispatchEvent(event);   
    },
    
    addToCart: function(e) {
   
      if (!this.isInCart) {
        // Show notification
        document.dispatchEvent(
          new CustomEvent("aerisLongActionStartEvent", {
            detail: { message: this.$t("addingToCart") }
          })
        );
        // search the informations for the cart
        if (this.downloadable && this.collectionId) {
          var url = null;
          if (this.downloadable.endsWith("/")) {
            this.this.downloadable = this.this.downloadable.substring(0, this.this.downloadable.length - 1);
        } 
        url = this.downloadable + "/request?collection=" + this.collectionId;
        this.$http.get(url).then(response => {this.handleSuccess(response);}, response => {this.handleError(response);});
        }
      }
    }
  }
};
</script>
<style>
.cartIconDefaultSummary {
margin-top:10px; 
width:42px;

}
</style>
