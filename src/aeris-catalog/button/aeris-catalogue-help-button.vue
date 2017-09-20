<i18n>
{
  "en": {
    "help": "Help"
  },
  "fr": {
    "help": "Aide"
  }
}
</i18n>

<template>
	<span class="aeris-catalogue-help-button-host">
		<div class="map-rounded-button aeris-catalog-button tooltip " data-popup="right" :data-title="$t('help')" @click="handleHelp">
			<i class="fa fa-question"></i>
		</div>
	</span>
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
	  console.log("aeris-catalogue-help-button creation")
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
    	aerisThemeListener: null
    }
  },
  
  updated: function() {
  },
  
  methods: {
	  
	  handleHelp: function() {	  
	  	var event = new CustomEvent('aerisAskForHelp', {});
	  	document.dispatchEvent(event);
	  },
	  	  
	  handleTheme: function(theme) {
	  		this.theme = theme.detail
			this.ensureTheme()
	  	},
	  	
	  	ensureTheme: function() {
	  	  	if (this.theme) {
	  	  		this.$el.firstElementChild.style.background=this.theme.emphasis
	  	  	}
	  		var self = this;
	  		var primary = this.theme.emphasis;
	  		var darker =  this.$colorLuminance(primary, -0.3)
	  		
	  		this.$el.addEventListener("mouseover", function() {
	  			self.$el.firstElementChild.style.background=darker;
	  		})
	  		this.$el.addEventListener("mouseout", function() {
	  			self.$el.firstElementChild.style.background=primary;
	  		})
	  	},
  }
}
</script>

<style src="./common-style.css"></style>