<i18n>
{
  "en": {
    "draw": "Draw"
  },
  "fr": {
    "draw": "Tracer"
  }
}
</i18n>

<template>
<span class="aeris-catalogue-edit-button-host">
<div class="map-rounded-button aeris-catalog-button tooltip " data-popup="right" :data-title="$t('draw')" @click="handleClick">
<i class="fa fa-pencil-square-o" v-bind:class="{isediting : editing}" ></i>
</div>
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
	  document.removeEventListener('aerisTheme', this.aerisThemeListener);
	  	this.aerisThemeListener = null;
	    document.removeEventListener('aerisCatalogueStartEditEvent', this.aerisCatalogueStartEditListener);
	  	this.aerisCatalogueStartEditListener = null;
	  	document.removeEventListener('aerisCatalogueStopEditEvent', this.aerisCatalogueStopEditListener);
	  	this.aerisCatalogueStopEditListener = null;
  },
  
  created: function () {
   console.log("aeris-catalogue-reset-button creation")
   this.$i18n.locale = this.lang
   this.aerisCatalogueStopEditListener = this.handleStopEdit.bind(this) 
   document.addEventListener('aerisCatalogueStopEditEvent', this.aerisCatalogueStopEditListener);
   this.aerisCatalogueStartEditListener = this.handleStartEdit.bind(this) 
   document.addEventListener('aerisCatalogueStartEditEvent', this.aerisCatalogueStartEditListener);
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
    	progress: false,
    	editing: false,
    	aerisCatalogueStopEditListener: null,
    	aerisCatalogueStartEditListener: null
    }
  },
  
  updated: function() {
  },
  
  methods: {
	  
	  handleStartEdit: function() {
		  this.editing = true;
	  },
	  
	  handleStopEdit: function() {
		  this.editing = false;
	  },
  
	  
	  handleClick: function() {
		  if (!this.editing) {
			  this.handleStartEdit()
			  document.dispatchEvent(new CustomEvent("aerisCatalogueStartEditEvent"));
			  
		  }
		  else {
			  this.handleStopEdit()
			  document.dispatchEvent(new CustomEvent("aerisCatalogueStopEditEvent"));
		  }
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
<style>
.aeris-catalogue-edit-button-host .isediting {
	color:black;
}
 </style>