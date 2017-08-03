<i18n>
{
  "en": {
    "temporal-extents": "Temporal extents"
  },
  "fr": {
    "temporal-extents": "Intervalle temporel"
  }
}
</i18n>

<template>
<span class="aeris-temporal-extents-search-criteria-host" >
<aeris-catalog-search-box id="box"  :title="$t('temporal-extents')" header-icon-class="fa fa-calendar" :deployed="deployed">
     <aeris-temporal-search-criteria-content></aeris-temporal-search-criteria-content>
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