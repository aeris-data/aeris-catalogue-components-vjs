<template>
  <component v-if="templateVueComponents.includes(elementName)" :is="elementName"></component>
  <span v-else v-html="contenu"></span>
</template>
<script>
export default {

  name: 'md-template-proxy',

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
        },
        clientTemplateName: {
            type: String,
            default: ''
       }

  },

  data() {
    return {
      templateVueComponents: ["md-template-chamber-measurement-metadata", "md-template-ir-spectrum-metadata", "md-template-mass-spectrum-metadata"]
    }
  },

  watch: {



	  },

  destroyed: function() {
  },


  mounted: function() {
  },

  computed: {

    elementName() {
      return this.type ? "md-template-"+this.type.toLowerCase().replace(/_/g, '-') : null;
    },

	  contenu: function() {
		  if (!this.edit) {
			  var elementName ="";
			  if (this.clientTemplateName) {
				 elementName=this.clientTemplateName;
			  }
			  else if (this.type) {
				  elementName = "md-template-"+this.type.toLowerCase()
				  elementName = elementName.replace(/_/g, '-');
			  }
			  else {
				  elementName = "md-template-collection"
			  }

			  if (window.registredAerisElements.indexOf(elementName)>=0) {
				  return "<"+elementName+"></"+elementName+">";
			  }
			  else {
				  return "<md-template-collection></md-template-collection>"
			  }
		  } else {
			  var elementName = "md-edit-template-"+this.type.toLowerCase()
			  var aux = elementName.replace(/_/g, '-');
			  if (window.registredAerisElements.indexOf(aux)>=0) {
				  return "<"+aux+"></"+aux+">";
			  }
			  else {
				  //We don't take in consideration the edit property in this case
				  return "<md-template-collection></md-template-collection>"
			  }
		  }
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
