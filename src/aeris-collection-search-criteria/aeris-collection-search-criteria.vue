<i18n>
{
  "en": {
    "collections": "Collections",
    "campaigns": "Campaigns"
  },
  "fr": {
    "collections": "Collections",
    "campaigns": "Campagnes"
  }
}
</i18n>

<template>
<span class="aeris-platform-search-criteria-host" >
<aeris-catalog-search-box id="box"  :title="$t(headertitle)" :header-icon-class="headericonclass" :deployed="deployed" >
     <aeris-collection-search-criteria-content :exclusion="exclusion" :inclusion="inclusion" :downloadable="downloadable"  v-if="headertitle == 'collections'"></aeris-collection-search-criteria-content>
     <aeris-campaign-search-criteria-content :exclusion="exclusion" :inclusion="inclusion" :downloadable="downloadable" v-else></aeris-campaign-search-criteria-content>
</aeris-catalog-search-box>
</span>
</template>

<script>
export default {
  props: {
  	lang:  {
      type: String,
      default: 'en'
    },
    
    headertitle:  {
        type: String,
        default: 'collections'
      },
      
      downloadable:  {
          type: String,
          default: ''
        },
      
      headericonclass:  {
          type: String,
          default: 'fa fa-cubes'
        },
      
      inclusion:  {
          type: String,
          default: ''
        },
        
        exclusion:  {
            type: String,
            default: ''
          },
    
    deployed:  {
        type: Boolean,
        default: false
      }
  },
  
  watch: {
    lang (value) {
	      this.$i18n.locale = value
    }
  },
  
  destroyed: function() {
  },
  
  created: function () {
   this.$i18n.locale = this.lang
  },

  mounted: function() {
  },
  
  computed: {
  	
  },

   data () {
    return {
    }
  },
  
  updated: function() {
  },
  
  methods: {
  
  }
}
</script>

<style>

 </style>