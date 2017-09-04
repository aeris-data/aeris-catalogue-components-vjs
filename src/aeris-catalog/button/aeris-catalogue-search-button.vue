<i18n>
{
  "en": {
    "search": "Search"
  },
  "fr": {
    "search": "Chercher"
  }
}
</i18n>

<template>
<div class="map-rounded-button aeris-catalog-button tooltip" data-popup="right" :data-title="$t('search')" @click="handleSearch">
<div class="mask" v-if="progress">
  <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
</div >
<i  v-if="!progress" class="fa fa-search"></i>
</div>
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
	  document.removeEventListener('aerisTheme', this.aerisThemeListener);
	  	this.aerisThemeListener = null;
  },
  
  created: function () {
   console.log("aeris-catalogue-search-button creation")
   this.$i18n.locale = this.lang
  
  },

  mounted: function() {
	  this.aerisThemeListener = this.handleTheme.bind(this) 
	   document.addEventListener('aerisTheme', this.aerisThemeListener);
	  var event = new CustomEvent('aerisThemeRequest', {});
	  	document.dispatchEvent(event);
  },
  
  computed: {
  	
  },

   data () {
    return {
    	aerisThemeListener: null,
    	progress: false
    }
  },
  
  updated: function() {
  },
  
  methods: {
	  handleSearch: function() {
		  var e = new CustomEvent("aerisCatalogueSearchStartEvent", { detail: {}})
		  document.dispatchEvent(e);
	  },
	  
	  handleTheme: function(theme) {
	  		this.theme = theme.detail
			this.ensureTheme()
	  	},
	  	
	  	ensureTheme: function() {
	  		
	  	  	if (this.theme) {
	  	  		this.$el.style.background=this.theme.emphasis
	  	  	}
	  		var self = this;
	  		var primary = this.theme.emphasis;
		  		var darker =  this.$colorLuminance(primary, -0.3)
		  		this.$el.addEventListener("mouseover", function() {
		  	        self.$el.style.background=darker;
		  		})
		  		this.$el.addEventListener("mouseout", function() {
		  			self.$el.style.background=primary;
		  		})
	  	}
	  	
  }
}
</script>

<style src="./common-style.css"></style>
<style>

 </style>