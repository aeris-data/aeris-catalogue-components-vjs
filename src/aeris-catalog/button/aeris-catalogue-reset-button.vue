<i18n>
{
  "en": {
    "reset": "Reset"
  },
  "fr": {
    "reset": "Réinitialiser"
  }
}
</i18n>

<template>
<div class="map-rounded-button aeris-catalog-button tooltip" data-popup="right" :data-title="$t('reset')" @click="handleReset">
<i class="fa fa-times"></i>
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
   console.log("aeris-catalogue-reset-button creation")
   this.$i18n.locale = this.lang
   this.aerisThemeListener = this.handleTheme.bind(this) 
   document.addEventListener('aerisTheme', this.aerisThemeListener);
  },

  mounted: function() {
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
	  handleReset: function() {
		  document.dispatchEvent(new CustomEvent("aerisCatalogueResetEvent"));
	  },
	  
	  handleTheme: function(theme) {
	  		this.theme = theme.detail
			this.ensureTheme()
	  	},
	  	
	  	ensureTheme: function() {
	  	  	if (this.theme) {
	  	  		this.$el.style.background=this.theme.primary
	  	  	}
	  		var self = this;
	  		var primary = this.theme.primary;
	  		var darker =  this.colorLuminance(primary, -0.3)
	  		
	  		this.$el.addEventListener("mouseover", function() {
	  			self.$el.style.background=darker;
	  		})
	  		this.$el.addEventListener("mouseout", function() {
	  			self.$el.style.background=primary;
	  		})
	  	},
	  	
	  	colorLuminance: function (hex, lum) {
	  		//from https://www.sitepoint.com/javascript-generate-lighter-darker-color/
	  		// validate hex string
	  		hex = String(hex).replace(/[^0-9a-f]/gi, '');
	  		if (hex.length < 6) {
	  			hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	  		}
	  		lum = lum || 0;

	  		// convert to decimal and change luminosity
	  		var rgb = "#", c, i;
	  		for (i = 0; i < 3; i++) {
	  			c = parseInt(hex.substr(i*2,2), 16);
	  			c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
	  			rgb += ("00"+c).substr(c.length);
	  		}

	  		return rgb;
	  	}
  
  }
}
</script>

<style src="./common-style.css"></style>
<style>

 </style>