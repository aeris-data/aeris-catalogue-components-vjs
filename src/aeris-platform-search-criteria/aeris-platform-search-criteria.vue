<i18n>
{
  "en": {
    "platforms": "Platforms"
  },
  "fr": {
    "platforms": "Plateformes"
  }
}
</i18n>

<template>
<span class="aeris-platform-search-criteria-host" >
<aeris-catalog-search-box id="box"  :title="$t('platforms')" header-icon-class="fa fa-rocket" :deployed="deployed">
     <aeris-platform-search-criteria-content></aeris-platform-search-criteria-content>
</aeris-catalog-search-box>
</span>
</template>

<script>
export default {
  props: {
  	lang:  {
      type: String,
      default: 'fr'
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