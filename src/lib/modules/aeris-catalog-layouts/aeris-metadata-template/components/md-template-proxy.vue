<template>
  <component v-if="metadata" :is="template" :metadata="metadata"></component>
</template>
<script>
import MdTemplateCollection from "./md-template-collection.vue";

export default {
  name: "md-template-proxy",

  components: {
    MdTemplateCollection
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    edit: {
      type: Boolean,
      default: false
    },
    clientTemplateName: {
      type: String,
      default: "COLLECTION"
    },
    metadata: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },

  data() {
    return {
      template: MdTemplateCollection,
      templateVueComponents: [
        "md-template-chamber-measurement-metadata",
        "md-template-ir-spectrum-metadata",
        "md-template-mass-spectrum-metadata"
      ]
    };
  },
  mounted() {
    console.log("metadata proxy: ", this.metadata);
  },
  watch: {
    metadata() {
      console.log("watch proxy : ", this.metadata);
      return this.metadata;
    }
  },
  computed: {
    elementName() {
      return this.type ? "md-template-" + this.type.toLowerCase().replace(/_/g, "-") : null;
    },

    contenu: function() {
      /*   if (!this.edit) {
        var elementName = "";
        if (this.clientTemplateName) {
          elementName = this.clientTemplateName;
        } else if (this.type) {
          elementName = "md-template-" + this.type.toLowerCase();
          elementName = elementName.replace(/_/g, "-");
        } else {
          elementName = "md-template-collection";
        }

        if (window.registredAerisElements.indexOf(elementName) >= 0) {
          return "<" + elementName + "></" + elementName + ">";
        } else {
          return "<md-template-collection></md-template-collection>";
        }
      } else { */
      //var elementName = "md-edit-template-" + this.type.toLowerCase();
      return "<" + "md-template-" + this.type.toLowerCase() + "></" + "md-template-" + this.type.toLowerCase() + ">";
      /*  if (window.registredAerisElements.indexOf(aux) >= 0) {
          return "<" + aux + "></" + aux + ">";
        } else {
          //We don't take in consideration the edit property in this case
          return "<md-template-collection></md-template-collection>";
        } */
      //}
    }
  }
};
</script>
