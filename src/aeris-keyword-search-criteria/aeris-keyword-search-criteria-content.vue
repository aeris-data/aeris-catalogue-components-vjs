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
<span>
<div class="icon-input">
<input class="keyword-input" type="text" name="keywords" :placeholder="$t('keywords')"  v-model="current"  v-on:keypress="inputKeyword">
</div>
<aeris-cartouche edit="true" v-for="keyword in keywords" :key="keyword" :itemref="keyword">{{keyword}}</aeris-cartouche>
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
	  document.removeEventListener('aerisCartoucheItemDeleted', this.keywordDeletionListener);
	  this.keywordDeletionListener = null;
	  document.removeEventListener('aerisCatalogueResetEvent', this.catalogueResetListener);
	  this.catalogueResetListener = null;
  },
  
  created: function () {
   this.$i18n.locale = this.lang
   this.keywordDeletionListener = this.handleKeywordDeletion.bind(this) 
   document.addEventListener('aerisCartoucheItemDeleted', this.keywordDeletionListener);
   this.catalogueResetListener = this.handleCatalogueReset.bind(this) 
   document.addEventListener('aerisCatalogueResetEvent', this.catalogueResetListener);
  },

  mounted: function() {
  },
  
  computed: {
  	
  },

   data () {
    return {
    	keywords: [],
    	current:'',
    	keywordDeletionListener: null,
    	catalogueResetListener: null
    }
  },
  
  updated: function() {
  },
  
  methods: {
  
   handleKeywordDeletion: function(e) {
	   console.log(e.detail.itemref)
	   var itemref = e.detail.itemref;
	   var index = this.keywords.indexOf(itemref)
	   if (index > -1) {
		   this.keywords.splice(index, 1);
	   }
	   e.stopPropagation()
   }, 
   
   handleCatalogueReset: function() {
	   this.keywords.splice(0,this.keywords.length)
	   this.current=""
   },
	  
   inputKeyword: function(e) {
        var withComma = this.current.trim();
        if(withComma.length < 2) return;
        var keyCode = e.keyCode ? e.keyCode : e.charCode;
        
        if(withComma.endsWith(',') || keyCode === 13 || keyCode === 32) {
          var withoutComma = (withComma.endsWith(',')) ? withComma.substring(0, (withComma.length - 1)) : withComma;
          if(!this.keywords) this.keywords = [];
          this.keywords.push(withoutComma);
          this.current='';
        }
    }
  	
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