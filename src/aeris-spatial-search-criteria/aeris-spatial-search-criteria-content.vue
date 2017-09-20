<i18n>
{
  "en": {
    "northAbbr": "N",
    "southAbbr": "S",
    "eastAbbr" : "E",
    "westAbbr" : "W",
    "reset": "Reset",
    "draw": "Draw",
    "incorrect_values": "Incorrect values"
  },
  "fr": {
    "northAbbr": "N",
    "southAbbr": "S",
    "eastAbbr" : "E",
    "westAbbr" : "O",
    "reset": "Réinitialiser",
    "draw": "Dessiner",
    "incorrect_values": "Valeurs incorrectes"
  }
}
</i18n>

<template>
<span class="aeris-spatial-search-criteria-content-host">
<div class="box-toolbar">
<button type="button" class="spatial-reset-button leftbutton" :title="$t('reset')" @click="handleReset"><i class="fa fa-times"></i></button>
<button type="button" class="spatial-reset-button"  v-bind:class="{isediting : editing}" :title="$t('draw')" @click="handleEdit"><i class="fa fa-edit"></i></button>
</div>
<span class="aeris-spatial-search-criteria-content">
<span class="error-message" v-if="errorMessage">{{errorMessage}}</span>

<div class="aeris-input-group">
<span class="right">{{$t('northAbbr')}}</span><input class="spatial-search-criteria" name="north" @change="handleChange" @input="checkValidity" v-model="north"></input>
</div>

<div class="aeris-input-group">
<span class="right">{{$t('eastAbbr')}}</span><input class="spatial-search-criteria" name="east" @change="handleChange" @input="checkValidity" v-model="east"></input>
</div>

<div class="aeris-input-group">
<span class="right">{{$t('southAbbr')}}</span><input class="spatial-search-criteria" name="south" @change="handleChange" @input="checkValidity" v-model="south"></input>
</div>

<div class="aeris-input-group">
<span class="right">{{$t('westAbbr')}}</span><input class="spatial-search-criteria" name="west" @change="handleChange" @input="checkValidity" v-model="west"></input>
</div>	
</span>
</span>
</template>

<script>
export default {
	 
  props: {
  	lang:  {
      type: String,
      default: 'en'
    }
  },
  
  watch: {
    lang (value) {
	      this.$i18n.locale = value
    }
  },
  
  destroyed: function() {
	  document.removeEventListener('aerisCatalogueResetEvent', this.catalogueResetListener);
	  this.catalogueResetListener = null;
	  document.removeEventListener('aerisCatalogueSelectionDrawEvent', this.catalogueSelectionDrawListener);
	  this.catalogueSelectionDrawListener = null;
	  document.removeEventListener('aerisCatalogueStartEditEvent', this.aerisCatalogueStartEditListener);
	  this.aerisCatalogueStartEditListener = null;
	  document.removeEventListener('aerisCatalogueStopEditEvent', this.aerisCatalogueStopEditListener);
	  this.aerisCatalogueStopEditListener = null;
	  document.removeEventListener('aerisCatalogueSearchEvent', this.aerisCatalogueSearchEventListener);
	  this.aerisCatalogueSearchEventListener = null;
  },
  
  created: function () {
   this.$i18n.locale = this.lang
   this.catalogueResetListener = this.handleCatalogueReset.bind(this) 
   document.addEventListener('aerisCatalogueResetEvent', this.catalogueResetListener);
   this.catalogueSelectionDrawListener = this.handleSelectionDraw.bind(this) 
   document.addEventListener('aerisCatalogueSelectionDrawEvent', this.catalogueSelectionDrawListener);
   this.aerisCatalogueStopEditListener = this.handleStopEdit.bind(this) 
   document.addEventListener('aerisCatalogueStopEditEvent', this.aerisCatalogueStopEditListener);
   this.aerisCatalogueStartEditListener = this.handleStartEdit.bind(this) 
   document.addEventListener('aerisCatalogueStartEditEvent', this.aerisCatalogueStartEditListener);
   this.aerisCatalogueSearchEventListener = this.handleSearch.bind(this) 
   document.addEventListener('aerisCatalogueSearchEvent', this.aerisCatalogueSearchEventListener);
   
   
   
  },

  mounted: function() {
  },
  
  computed: {
  	
  },

   data () {
    return {
    	north:'',
    	south:'',
    	east:'',
    	west:'',
    	errorMessage:'',
    	editing: false,
    	aerisCatalogueStopEditListener: null,
    	aerisCatalogueStartEditListener: null,
    	aerisCatalogueSearchEventListener: null
    }
  },
  
  updated: function() {
  },
  
  methods: {
	  
	  isValidLatitude: function(latitude) {
	        if (!isNaN(latitude)) {
	          return ((latitude >= -90) && (latitude <= 90)) ? true : false;
	        }

	        return false;
	      },

	  isValidLongitude: function (longitude)  {
	        if (!isNaN(longitude)) {
	          return ((longitude >= -180) && (longitude <= 180)) ? true : false;
	        }

	        return false;
	      },

	  isValidBox: function() {
	        if(!this.isValidLatitude(this.north)) return false;
	        if(!this.isValidLatitude(this.south)) return false;
	        if(!this.isValidLongitude(this.east)) return false;
	        if(!this.isValidLongitude(this.west)) return false;
	        if(Number(this.north) < Number(this.south)) return false;

	        return true;
	      },

	      checkValidity: function(e) {
	    	this.correctCommas();
	        var el = e.target;
	        var validCoords;
	        if(el.name === 'north' || el.name === 'south') {
	          validCoords = this.isValidLatitude(el.value);
	        } else {
	          validCoords = this.isValidLongitude(el.value);
	        }

	        if(!validCoords) {
	          el.classList.add('incorrect-input');
	          this.errorMessage = this.$t('incorrect_values');
	          return false;
	        } else {
	          el.classList.remove('incorrect-input');
	          this.errorMessage = '';
	        }
	      },
	      
	      handleStartEdit: function() {
			  this.editing = true;
		  },
		  
		  handleStopEdit: function() {
			  this.editing = false;
		  },
	      

	     
   handleEdit: function() {
	   if (!this.editing) {
			  this.handleStartEdit()
			  document.dispatchEvent(new CustomEvent("aerisCatalogueStartEditEvent"));
		  }
		  else {
			  this.handleStopEdit()
			  document.dispatchEvent(new CustomEvent("aerisCatalogueStopEditEvent"));
		  }
   },
   
   handleSelectionDraw: function(e) {
	   this.north = e.detail.north.toFixed(4);
       this.south = e.detail.south.toFixed(4);
       this.east = e.detail.east.toFixed(4);
       this.west = e.detail.west.toFixed(4);
       this.handleChange();
   },
   
   
   handleCatalogueReset: function() {
	   this.handleReset()
   },
   
   handleReset: function() {
	   this.north ='';
	   this.south='';
	   this.east='';
	   this.west='';
	   this.handleChange();
   },
   
   correctCommas: function() {
	   this.north = this.north.replace(/,/g, '.');
	   this.south = this.south.replace(/,/g, '.');
	   this.east = this.east.replace(/,/g, '.');
	   this.west = this.west.replace(/,/g, '.');
   },
   
   asBox: function() {
       return {
         north: this.north,
         south: this.south,
         east: this.east,
         west: this.west
       };
     },
     
   handleChange: function() {
	   this.correctCommas()
       if (this.isValidBox()) {
         var selectionEvent = {
           box: this.asBox()
         };

         var event = new CustomEvent('aerisCatalogueMapAddSelectionRequest', { detail: selectionEvent});
   		document.dispatchEvent(event);

       } else {
         var event = new CustomEvent('aerisCatalogueMapClearSelectionRequest');
    	 document.dispatchEvent(event);
       }
     },
     
     handleSearch: function(e) {
    	 e.detail.box = this.asBox();
    	 if (this.editing) {
			  this.handleStopEdit()
			  document.dispatchEvent(new CustomEvent("aerisCatalogueStopEditEvent"));
		  }
     }
	  
  }
}
</script>

<style>
.aeris-spatial-search-criteria-content-host {
    display: block
}

.aeris-spatial-search-criteria-content-host .aeris-catalog-box {
    font-size: 14px;
    word-wrap: break-word;
}

.aeris-spatial-search-criteria-content-host .aeris-input-group {
    border: none;
    background-color: rgba(172,220,238,0.3);
}

.aeris-spatial-search-criteria-content-host .leftbutton {
	margin-right: 3px;
}

.aeris-spatial-search-criteria-content-host .aeris-input-group {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin: 5px 0;
    width: 100%;
    height: 25px;
    line-height: 25px;
    overflow: hidden;
}

.aeris-spatial-search-criteria-content-host input.incorrect-input {
    border: 2px solid red !important
}

.aeris-spatial-search-criteria-content-host .isediting {
	color: #f0ad4e
}

.aeris-spatial-search-criteria-content-host .right {
	min-width: 40px;
	border-right: 1px solid #fff;
	box-sizing: border-box;
    display: block;
    height: 100%;
    text-align: center;
}

.aeris-spatial-search-criteria-content-host	 .error-message {
    color: red
}

.aeris-spatial-search-criteria-content-host button {
	cursor: pointer;
}

.aeris-spatial-search-criteria-content-host .aeris-input-group  input.spatial-search-criteria {
	background-color: transparent;
    box-sizing: border-box;
    height: 100%;
    padding: 0 5px;
    border: none;
    outline: none;
}
 
.aeris-spatial-search-criteria-content-host  .box-toolbar {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 5px 10px;
    border-bottom: 1px solid #ccc;
	background-color: #	cfcfcf;
}

</style>