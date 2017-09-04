<template>
<span v-html="contenu"></span>
</template>
<script>
export default {
  props: {
	  value:  {
          type: String,
          default: ''
        },
        type:  {
            type: String,
            default: ''
          }
	    
  },
  
  watch: {
	  
	 
	  
	  },
  
  destroyed: function() {
  },
  
 
  mounted: function() {
	  
  },
  
  computed: {
	  
	  contenu: function() {
		  var elementName = "md-template-"+this.type.toLowerCase()
		  if (window.registredAerisElements.indexOf(elementName)>=0) {
			  return "<"+elementName+"></"+elementName+">";
		  }
		  else {
			  return "<md-template-collection></md-template-collection>"
		  }
	  }
	  
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