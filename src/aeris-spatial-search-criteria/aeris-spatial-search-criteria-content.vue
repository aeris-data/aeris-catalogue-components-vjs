<i18n>
{
  "en": {
    "spatial-extents": "Spatial extents"
  },
  "fr": {
    "spatial-extents": "Zones géographiques"
  }
}
</i18n>

<template>
<span>
Coucou
</span>
</template>

<script>
export default {
	 
  props: {
  	lang:  {
      type: String,
      default: 'fr'
    }
  },
  
  watch: {
    lang (value) {
	      this.$i18n.locale = value
    }
  },
  
  destroyed: function() {
	  document.removeEventListener('aerisCatalogueResetEvent', this.catalogueResetListener);
	  this.catalogueResetListener = null;
	  document.removeEventListener('aerisCatalogueSelectionDrawEvent', this.catalogueSelectionDrawListener);
	  this.catalogueSelectionDrawListener = null;
  },
  
  created: function () {
   this.$i18n.locale = this.lang
   this.catalogueResetListener = this.handleCatalogueReset.bind(this) 
   document.addEventListener('aerisCatalogueResetEvent', this.catalogueResetListener);
   this.catalogueSelectionDrawListener = this.handleSelectionDraw.bind(this) 
   document.addEventListener('aerisCatalogueSelectionDrawEvent', this.catalogueSelectionDrawListener);
  },

  mounted: function() {
  },
  
  computed: {
  	
  },

   data () {
    return {
    	keywords: [],
    	current:'',
    	catalogueResetListener: null,
    	catalogueSelectionDrawListener: null
    }
  },
  
  updated: function() {
  },
  
  methods: {
  
   
   handleCatalogueReset: function() {
	   this.keywords.splice(0,this.keywords.length)
	   this.current=""
   },
   
   handleSelectionDraw: function() {
	   console.log("Yeahhhhh")
   }
	  
  }
}
</script>

<style>
 </style>