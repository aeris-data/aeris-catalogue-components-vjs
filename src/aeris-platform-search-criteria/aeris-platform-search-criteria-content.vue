<i18n>
{
	  "en": {
		  "filter": "Filter",
		  "AIRCRAFT": "Aircraft",
		  "ATMOSPHERICSIMULATIONCHAMBER": "Atmospheric simulation chamber",
		  "BALLOON": "Balloon",
		  "EOS": "Earth Observation Satellite",
		  "GEO": "Geostationnary earth orbit",
		  "INSITULANDPLATFORM": "In Situ Land-based Platform",
		  "LEO": "Low earth orbit",
		  "METEOROLOGICALPROPERTIES": "Meteorological properties",
		  "OTHER_AIRCRAFT": "Other aircraft",
		  "PLATFORM": "Platform",
		  "SPACESTATION": "Space Station",
		  "UNKNOWN": "Unknown",
		  "loading": "Loading...",
		  "updating": "Checking for updates..."
	  },
	  "fr": {
		  "filter": "Filtre",
		  "AIRCRAFT": "Aeronef",
		  "ATMOSPHERICSIMULATIONCHAMBER": "Chambre de simulation atmosphérique",
		  "BALLOON": "Ballons",
		  "EOS": "Satellite d Observation de la Terre",
		  "GEO": "Orbite terrestre geostationnaire",
		  "INSITULANDPLATFORM": "Laboratoire in situ terrestre",
		  "LEO": "Orbite terrestre basse",
		  "OTHER_AIRCRAFT": "Autre aeronef",
		  "PLATFORM": "Platforme",
		  "SPACESTATION": "Station spatiale",
		  "UNKNOWN": "Inconnu",
		  "loading": "Chargement...",
		  "updating": "Recherche de mises à jour..."
	  }
}
</i18n>

<template>
	<span class="aeris-platform-search-criteria-content-host" >

	    <div class="icon-input" style="display:none">
	    	<input class="filter-input" type="text" name="resultFilter" :placeholder="$t('filter')" v-model="filterValue">
	    	<i class="fa fa-filter"></i>
	    </div>
	    <div v-if="isLoading" class="loadingbar">
	    <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
	    <span>{{$t("loading")}}</span>
	    </div>
	    <div v-if="isUpdating" class="loadingbar">
	    <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
	    <span>{{$t("updating")}}</span>
	    </div>
		<div v-for="(platformType, index) of platformTypes" class="program">
			
			<div class="program-header">
	          <label :for="platformType.name">
	            <input :id="platformType.name" type="checkbox" class="program-checkbox" @change="platformTypeClickHandler">
		            <span class="program-name-row">
		              <strong>
		              {{translate(platformType.name)}}
		              </strong>
		              <span class="badge">{{computeChildrenNb(platformType)}}</span>
		            </span>
	            </input>
	          </label>
	          <i :id="platformType.name" class="fa fa-plus-square-o" @click="toggleState" v-if="platformType.platforms.length > 0"></i>
	        </div>
	        
	        <div :name="platformType.name" class="program-body notvisible">
	        	<div v-for="platform of platformType.platforms">
	            <div class="collection">
	              <label>
	                <input :id="platform.name" type="checkbox" :name="platform.name" class="platform-checkbox" @change="platformClickHandler">
	                
	                <span >{{(platform.name)}}</span>
	              </label>
	            </div>
	          </div>
	        </div>
			
		</div>
      
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
			  document.removeEventListener('aerisCatalogueSearchEvent', this.handleSearchBarListener);
			  this.handleSearchBarListener = null;
			  document.removeEventListener('aerisCatalogueResetEvent', this.handleSearchBarResetListener);
			  this.handleSearchBarResetListener = null;
			  document.removeEventListener('aerisPlatformDownloadResponse', this.handlePlatformResponseListener);
			  this.handlePlatformDowloadListener = null;
		  },
		  
		  created: function () {
			  
		  },

		  mounted: function() {
			  console.log('Aeris platform search criteria content - created');
			  this.$i18n.locale = this.lang;

			  this.handleSearchBarListener = this.handleSearchBarEvent.bind(this);
			  document.addEventListener('aerisCatalogueSearchEvent', this.handleSearchBarListener);
			  this.handleSearchBarResetListener = this.handleSearchBarResetEvent.bind(this);
			  document.addEventListener('aerisCatalogueResetEvent', this.handleSearchBarResetListener);
			  this.handlePlatformResponseListener = this.handlePlatformResponse.bind(this);
			  document.addEventListener('aerisPlatformDownloadResponse', this.handlePlatformResponseListener);
			  
			 this.loadPlatforms();
			  
		  },
		  
		  computed: {
			  
			  
			  isLoading: function() {
				  return ((this.loading) && (!this.existing))
			  },
			  
			  isUpdating: function() {
				  return ((this.loading) && (this.existing))
			  },
			  
			  /* Filter results with "filter input" value" */
			  filteredPlatformTypes: function() {
				  console.log("filter value : " + this.filterValue);
				  var self = this;
				  if (!self.filterValue) {
					  return true; //return null;
				  } 
				  else {					  
					  
					  var string = self.filterValue.toLowerCase();
	
					  return function(platformType) {
						  var platformTypeName = this.$i18n.t(platformType.name, this.lang).toLowerCase();
						  var flag = false;
		
						  console.log("platformTypeName= " + platformTypeName);
						  if(platformType.platforms) {
							  platformType.platforms.forEach(function(platform) {
								  var collName = this.$i18n.t(platform.name, this.lang).toLowerCase();
								  console.log("platformName= " + collName);
								  if ((collName.indexOf(string) !== -1) || (platformTypeName.indexOf(string) !== -1)) flag = true;
							  });
						  }
		
						  return flag;
					  };
				  }
			  
			  }

		  },

		   data () {
		    return {
		    	parentService: null,
				platformTypes: [],
				filterValue: '',
				selectedItems: [],
				loading:false,
				existing:false,
				handlePlatformResponseListener:null,
				translatedValues: ["AIRCRAFT", "ATMOSPHERICSIMULATIONCHAMBER", "BALLOON", "EOS", "GEO", "INSITULANDPLATFORM", "LEO", "METEOROLOGICALPROPERTIES", "OTHER_AIRCRAFT", "PLATFORM",  "SPACESTATION", "UNKNOWN"] 
		    }
		  },
		  
		  updated: function() {
		  },
		  
		  methods: {
			  
			  
			  handlePlatformResponse: function(e) {
				  this.platformTypes = e.detail.platformTypes;
				  this.loading = false;
			  },
			  
			  translate: function(key) {
				  if (this.translatedValues.indexOf(key)<0) {
					  return key;
				  } else {
					  return this.$i18n.t(key)
				  }
			  },
			  	
			  loadPlatforms() {
				  console.log("Aeris - loadPlatforms")
				  if (window.loadingPlatforms) {
					  this.loading = true;
					  if (window.localStorage) {
				          var aux  = window.localStorage.getItem('aerisPlatformTypes');
				          if ((aux != null) && (aux != "undefined")) {
				        	  this.platformTypes = JSON.parse(aux);
				        	  this.existing = true;
						  }
				        }
				  }
				  else {
					  if (window.localStorage) {
				          var aux  = window.localStorage.getItem('aerisPlatformTypes');
				          if ((aux != null) && (aux != "undefined")) {
				        	  this.platformTypes = JSON.parse(aux);
				        	  this.existing = true;
						  }
				        }
					 window.loadingPlatforms = true
					 var parentService = document.querySelector('aeris-catalog').attributes.getNamedItem('metadata-service').value;
					  parentService = parentService.endsWith('/') ? parentService + 'plateforms/' : parentService + '/plateforms/';
					  var url = this.service || parentService;
					 
					  
					  
					  if (document.querySelector('aeris-catalog').attributes.getNamedItem('program')) {
					  var program = document.querySelector('aeris-catalog').attributes.getNamedItem('program').value;
					  if (program) {
						  url +=  "?program=" + program;  
					  }
					  }
					  //
					  this.loading = true;
					  console.log("Aeris - loadPlatforms - Appel au serveur")
					  this.$http.get(url, {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}})
					  .then((response)=>{this.handleResponse(response)},(response)=>{this.handleError(response)});
				  }
				  
			  },
			  
			  handleResponse: function(response) {
				  window.loadingPlatforms = false
				  this.loading = false;
			      if (window.localStorage) {
			         window.localStorage.setItem('aerisPlatformTypes', JSON.stringify(this.platformTypes));
			       }
			      var event = new CustomEvent('aerisPlatformDownloadResponse', { detail: {platformTypes: response.body}});
			  	  document.dispatchEvent(event);
			  },
			  
			  handleError: function(request) {
				    window.loadingPlatforms = false
				  	this.loading = false;
				  	console.log("Aeris platform criteria - Error while accessing server:"); 
					var error = response.status;
					var message = response.statusText;
					if(!error) message = 'Can\'t connect to the server';
					console.log('Error ' + error + ': ' + message);
			  },
			  
			  computeChildrenNb: function(platform) {
			        return platform.platforms ? platform.platforms.length : 0;
		      },
		      
		      platformTypeClickHandler: function(e) {
			  	  	var checked = e.target.checked;
			  	  	var originalName = e.target.id;	  	
			  	  	var boxes = e.target.closest('.program').getElementsByClassName("platform-checkbox");
			    		
			  	  	var arr = [];
			  	  	for (var i = 0; i < boxes.length; i++) {
			    			boxes[i].checked = checked;
		    				var ind = this.selectedItems.indexOf(boxes[i].name);
			    			if (checked &&  ind === -1) {
				    			this.selectedItems.push(boxes[i].name);
			    			}
			    			if (!checked) {
		  	  		  			this.selectedItems.splice(ind, 1);
			    			}
			    	}
			  	  	// treat the top level also
			  	  	if (checked) {
				  	  	this.selectedItems.push(originalName);
			  	  	} else {
			  	  		var ind = this.selectedItems.indexOf(originalName);
			  	  		this.selectedItems.splice(originalName, 1);
			  	  	}
			  	  	
			  	  	// simulate the event click on the expand/unexpand button
				  	var el = checked ? e.target.closest('.program-header').getElementsByClassName('fa-plus-square-o') : e.target.closest('.program-header').getElementsByClassName('fa-minus-square-o');
				  	if (el != null && el.length > 0) {
				  		var event = new MouseEvent('click', {
					  	    'view': window,
					  	    'bubbles': true,
					  	    'cancelable': true
					  	  });
					  	el[0].dispatchEvent(event);
				  	}

		      },
		      
		      platformClickHandler: function(e) {
	    	  	var checked = e.target.checked;
				var ind = this.selectedItems.indexOf(e.target.name);
    			if (checked && ind === -1 ) {
	    			this.selectedItems.push(e.target.name);
    			}
    			if (!checked) {
  		  			this.selectedItems.splice(ind, 1);
    			}
		      },

			handleSearchBarEvent: function(e) {
				e.detail.platforms = this.selectedItems;
		  	},
			
		  	handleSearchBarResetEvent: function(e) {
		  		// uncheck everything 
		        var parent = this.$el.querySelectorAll("input");
		        parent.forEach(function(element) {
		        	if (element.checked) {
		        		element.checked = false;
		        	}
		        })
		         // empty the selection
		        this.selectedItems = [];
		  	},
		    	
	    	toggleState: function(e) {
	          var trigger = e.target;
	          if(trigger) {
	          	var el = null;
	          	var el = document.getElementsByName(trigger.id)[0];
	          	if (trigger.classList.contains('fa-plus-square-o')) {
	          		trigger.classList.remove('fa-plus-square-o');
	                  trigger.classList.add('fa-minus-square-o');
	                  el.classList.remove('notvisible');
	                  el.classList.add('visible');
	          	} else {
	          		trigger.classList.remove('fa-minus-square-o');
	                  trigger.classList.add('fa-plus-square-o');
	                  el.classList.remove('visible');
	                  el.classList.add('notvisible');
	          	}
	          }
	        }
		  	
		  }
	}
</script>
<style>

	.loadingbar {
		background: gainsboro;
		padding: 3px;
	}

	.aeris-platform-search-criteria-content-host .visible {
		display: block;
	}
	.aeris-platform-search-criteria-content-host .notvisible {
		display: none;
	}
	
	.aeris-platform-search-criteria-content-host {
		display: block;
	}
	
	.aeris-platform-search-criteria-content-host .program {
		margin-bottom: 5px;
	}
	
	.aeris-platform-search-criteria-content-host .program .program-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 5px;
	}
	
	.aeris-platform-search-criteria-content-host .program .program-header label {
		display: inline-flex;
		justify-content: flex-start;
		align-items: center;
		margin: 2px;
	}
	
	.aeris-platform-search-criteria-content-host .program .program-header .fa {
		cursor: pointer;
	}
	
	.aeris-platform-search-criteria-content-host .program .collection {
		margin-left: 20px;
	}
	
	.aeris-platform-search-criteria-content-host .icon-input {
		height: 20px;
		line-height: 20px;
		font-size: 14px;
		width: 100%;
		margin-bottom: 10px;
		color: #999;
		display: inline-flex;
		justify-content: space-between;
		border: 1px solid;
		color: #999;
	}
	
	.aeris-platform-search-criteria-content-host .icon-input i {
		padding: 3px;
	}
	
	.aeris-platform-search-criteria-content-host .filter-input {
		border-style: none;
		border: none;
		outline:none;
	    margin: 2px;
	}

	.aeris-platform-search-criteria-content-host .badge {
      display: inline-block;
      margin: 0 5px -2px;
      padding: 0 4px;
      height: 14px;
      text-align: center;
      line-height: 14px;
      border: var(--badge-border, none);
      border-radius: 8px;
      font-size: 10px;
      background-color: var(--badge-main-color, #333);
      color: var(--badge-text-color, #fff);
    }
</style>