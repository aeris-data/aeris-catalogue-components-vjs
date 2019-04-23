<i18n>
{
  "en": {
    "sites": "Sites",
    "allsites" : "All sites"
  },
  "fr": {
    "sites": "Sites",
    "allsites" : "Tous les sites"
  }
}
</i18n>

<template>
  <div >
    <aeris-catalog-search-box
      :title="$t('sites')"
      :deployed="deployed"
      :theme="theme"
      header-icon-class="fa fas fa-map-marker-alt"
    >
   <input type="checkbox" v-model="selectedAll" /> <label>{{$t("allsites")}}</label>
    <div v-for="site in values" :key="site.name" aeris-thesaurus-item-checkbox-layout>
    <input class="siteItems" type="checkbox" :id="site.name" :value="site.name" v-model="selected" /> <label :for="site.name">{{site.name}}</label>
      </div>
    </aeris-catalog-search-box>
  </div>
</template>

<script>
import AerisCatalogSearchBox from "../../../../aeris-catalog-layouts/aeris-search-criteria-layout/components/aeris-catalog-search-box";

export default {
  name: "aeris-site-search-criteria",

  components: { AerisCatalogSearchBox },

  props: {
    language: {
      type: String,
      default: "en"
    },
    deployed: {
      type: Boolean,
      default: false
    },
    theme: {
      type: Object,
      default: () => {}
    },
    service: {
      type: String,
      default: "https://sedoo.aeris-data.fr/catalogue/rest/metadatarecette/sites/?program=GMOS"
    }
  },
  data() {
    return {
      selected:[],
      selectedAll:null,
      values: null
    };
  },
  watch: {
    language(value) {
      this.$i18n.locale = value;
    },
     selected(value){
      this.$store.commit("setSites", value);
     
    },
    selectedAll(value){
      if (value){
      this.values.forEach((element,index) =>{
        this.selected[index]=element.name
      })
      }else{
        this.selected = []
      }
       this.$store.commit("setSites", this.selected)
    }
  },
  computed: {
    sites() {
      return this.$store.getters.getSites;
    }
   
  },
  created() {
    this.$i18n.locale = this.language;
    this.loadSites();
  },

  methods: {
    sitesReset() {
      this.$store.commit("resetSites");
      this.selectedAll=false
      this.selected=[]
    },
    checkAll(){
      this.values.forEach((element,index) =>{
        this.selected[index]=element.name
      })
    },
    loadSites() {
      if (this.service) {
        this.$http
          .get(this.service, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          })
          .then(response => {
            this.values = response.data;
          })
          .catch(() => {
            this.handleError();
          });
      }
    }
  }
};
</script>
<style scoped>
input {
  margin-right: 15px;
  margin-bottom: 10px;
}

label{
  overflow-wrap: break-word;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
}

.siteItems{
margin-left:20px;
}

label,
.far {
  color: grey;
}
</style>
