<i18n>
{
  "en": {
    "keywords": "Keywords"
  },
  "fr": {
    "keywords": "Mots-clés"
  }
}
</i18n>

<template>
<span class="aeris-keyword-search-criteria-host" >
<aeris-catalog-search-box id="box"  :title="$t('keywords')" header-icon-class="fa fa-terminal">
     <aeris-keyword-search-criteria-content></aeris-keyword-search-criteria-content>
</aeris-catalog-search-box>
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
.aeris-keyword-search-criteria-host {
        display: block
    }
    .aeris-keyword-search-criteria-host .program {
        margin-bottom: 5px
    }
    .aeris-keyword-search-criteria-host .program .program-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5px
    }
    .aeris-keyword-search-criteria-host .program .program-header label {
        display: inline-flex;
        justify-content: flex-start;
        align-items: center;
        margin: 2px
    }
    .aeris-keyword-search-criteria-host .program .program-header .fa {
        cursor: pointer
    }
    .aeris-keyword-search-criteria-host .collection {
        margin-left: 20px
    }
    .aeris-keyword-search-criteria-host .icon-input {
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        width: 100%;
        margin-bottom: 10px;
        color: #999
    }
    
    .aeris-keyword-search-criteria-host .keyword-input {
    	width: 100%;
    }
 </style>