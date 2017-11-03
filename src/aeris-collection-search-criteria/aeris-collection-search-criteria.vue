<i18n>
{
  "en": {
    "collections": "Collections"
  },
  "fr": {
    "collections": "Collections"
  }
}
</i18n>

<template>
<span class="aeris-platform-search-criteria-host" >
<aeris-catalog-search-box id="box"  :title="$t('collections')" header-icon-class="fa fa-cubes" :deployed="deployed">
     <aeris-collection-search-criteria-content></aeris-collection-search-criteria-content>
</aeris-catalog-search-box>
</span>
</template>

<script>
export default {
  props: {
  	lang:  {
      type: String,
      default: 'en'
    },
    deployed:  {
        type: Boolean,
        default: false
      }
  },
  
  watch: {
    lang (value) {
	      this.$i18n.locale = value
    }
  },
  
  destroyed: function() {
  },
  
  created: function () {
   this.$i18n.locale = this.lang
  },

  mounted: function() {
  },
  
  computed: {
  	
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