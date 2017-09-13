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
          },
       edit:  {
           type: Boolean,
              default: false
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
		  if (!edit) {
			  var elementName = "md-template-"+this.type.toLowerCase()
			  if (window.registredAerisElements.indexOf(elementName)>=0) {
				  return "<"+elementName+"></"+elementName+">";
			  }
			  else {
				  return "<md-template-collection></md-template-collection>"
			  }
		  } else {
			  var elementName = "md-edit-template-"+this.type.toLowerCase()
			  if (window.registredAerisElements.indexOf(elementName)>=0) {
				  return "<"+elementName+"></"+elementName+">";
			  }
			  else {
				  //We don't take in consideration the edit property in this case
				  return "<md-template-collection></md-template-collection>"
			  }
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