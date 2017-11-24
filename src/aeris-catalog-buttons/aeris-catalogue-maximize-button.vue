
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
<div class="map-rounded-button aeris-catalog-button tooltip" data-popup="right" :title="computeTitle"  @click="handleMaximize">
<i  class="fa fa-expand" v-if="maximize"></i>
<i  class="fa fa-compress" v-else></i>
</div>
</template>

<script>
export default {
  props: {
  	lang:  {
      type: String,
      default: 'en'
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
	  
	  computeTitle: function() {
		  if (this.maximize) {
			  return this.$i18n.t('maximize');
		  }
		  else {
			  return this.$i18n.t('minimize');
		  }
	  }
  	
  },

   data () {
    return {
    	aerisThemeListener: null,
    	maximize: true
    }
  },
  
  updated: function() {
  },
  
  methods: {
	  handleMaximize: function() {
		  if (this.maximize) {
			  this.maximize=false
			  var e = new CustomEvent("aerisCatalogueMaximizeEvent", { detail: {}})
			  document.dispatchEvent(e);
		  } else {
			  this.maximize=true
			  var e = new CustomEvent("aerisCatalogueMinimizeEvent", { detail: {}})
			  document.dispatchEvent(e);
		  }
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