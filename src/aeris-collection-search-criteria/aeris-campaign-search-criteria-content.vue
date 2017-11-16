<i18n>
{
	  "en": {
		  "filter": "Filter",
		  "UNKNOWN": "Unknown",
		  "loading": "Loading...",
		  "updating": "Checking for updates...",
		  "directlydownloadable": "This collection can be directly downloaded from this portal"
	  },
	  "fr": {
		  "filter": "Filtre",
		  "UNKNOWN": "Inconnu",
		  "loading": "Chargement...",
		  "updating": "Recherche de mises à jour...",
		  "directlydownloadable": "Cette collection peut etre téléchargée directement à partir de ce portail"
	  }
}
</i18n>

<template>
<div class="aeris-collection-search-criteria-content-host">


  <div v-if="isLoading" class="loadingbar">
    <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
    <span>{{$t("loading")}}</span>
  </div>
  <div v-if="isUpdating" class="loadingbar">
    <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
    <span>{{$t("updating")}}</span>
  </div>
  <aeris-checkboxtree-item :items="JSON.stringify(collections)" prefix="collection"></aeris-checkboxtree-item>
</div>
</template>


<script>
export default {

  props: {
    lang: {
      type: String,
      default: 'en'
    },

    downloadable: {
      type: String
    },

    inclusion: {
      type: String,
      default: ''
    },

    exclusion: {
      type: String,
      default: ''
    },

    localstoragekey: {
      type: String,
      default: 'aerisCampaign'
    }
  },



  watch: {
    lang(value) {
      this.$i18n.locale = value
    },
    collections: function(value) {
      this.indicateLevel3Collections();
    }
  },

  destroyed: function() {
    document.removeEventListener('aerisCatalogueSearchEvent', this.handleSearchBarListener);
    this.handleSearchBarListener = null;
    document.removeEventListener('aerisCatalogueResetEvent', this.handleSearchBarResetListener);
    this.handleSearchBarResetListener = null;
    document.removeEventListener('aerisCampaignDownloadResponse', this.handleCollectionResponseListener);
    this.handleCollectionDowloadListener = null;
  },

  created: function() {

  },

  mounted: function() {
    console.log('Aeris collectcampaign search criteria content - created');
    this.$i18n.locale = this.lang;

    this.handleSearchBarListener = this.handleSearchBarEvent.bind(this);
    document.addEventListener('aerisCatalogueSearchEvent', this.handleSearchBarListener);
    this.handleSearchBarResetListener = this.handleSearchBarResetEvent.bind(this);
    document.addEventListener('aerisCatalogueResetEvent', this.handleSearchBarResetListener);
    this.handleCollectionResponseListener = this.handleCollectionResponse.bind(this);
    document.addEventListener('aerisCampaignDownloadResponse', this.handleCollectionResponseListener);

    this.loadCollections();

  },

  computed: {


    isLoading: function() {
      return ((this.loading) && (!this.existing))
    },

    isUpdating: function() {
      return ((this.loading) && (this.existing))
    },

    parsedInclusions: function() {
      if ((this.inclusion) && (this.inclusion.length > 0)) {
        return this.inclusion.split(",");
      } else {
        return null;
      }
    },

    parsedExclusions: function() {
      if ((this.exclusion) && (this.exclusion.length > 0)) {
        return this.exclusion.split(",");
      } else {
        return null;
      }
    },

    level3collections: function() {
      if (this.downloadable) {
        return this.downloadable.split(",");
      } else {
        return [];
      }
    }
  },

  data() {
    return {
      parentService: null,
      collections: [],
      filterValue: '',
      loading: false,
      existing: false,
      handleCollectionResponseListener: null,
    }
  },

  updated: function() {},

  methods: {

    indicateLevel3Collections: function(e) {
      for (var i = 0; i < this.level3collections.length; i++) {
        var aux = this.$el.querySelector(".program-header>label[for='" + this.level3collections[i] + "']>span")
        if (aux) {
          var newElement = document.createElement('i')
          newElement.classList = "fa fa-shopping-cart"
          newElement.title = this.$i18n.t("directlydownloadable")
          newElement.style.color = "#f39c12"
          aux.appendChild(newElement)
        }
      }
    },

    handleCollectionResponse: function(e) {
      this.collections = e.detail.collections;
      this.loading = false;
    },

    translate: function(key) {
      if (this.translatedValues.indexOf(key) < 0) {
        return key;
      } else {
        return this.$i18n.t(key)
      }
    },

    loadCollections() {
      console.log("Aeris - loadCollections")
      if (window.loadingCoampaigns) {
        this.loading = true;
        if (window.localStorage) {
          var aux = window.localStorage.getItem(this.localstoragekey);
          if ((aux != null) && (aux != "undefined")) {
            this.collections = JSON.parse(aux);
            this.existing = true;
          }
        }
      } else {
        if (window.localStorage) {
          var aux = window.localStorage.getItem(this.localstoragekey);
          if ((aux != null) && (aux != "undefined")) {
            this.collections = JSON.parse(aux);
            this.existing = true;
          }
        }
        window.loadingCoampaigns = true
        var parentService = document.querySelector('aeris-catalog').attributes.getNamedItem('metadata-service').value;
        parentService = parentService.endsWith('/') ? parentService + 'collections/' : parentService + '/collections/';
        var url = this.service || parentService;



        if (document.querySelector('aeris-catalog').attributes.getNamedItem('program')) {
          var program = document.querySelector('aeris-catalog').attributes.getNamedItem('program').value;
          if (program) {
            url += "?program=" + program;
          }
        }
        //
        this.loading = true;
        console.log("Aeris - loadCampaigns - Contacting server")
        this.$http.get(url, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          })
          .then((response) => {
            this.handleResponse(response)
          }, (response) => {
            this.handleError(response)
          });
      }

    },

    getTreeFromResponseBody: function(collections) {
      var result = []
      var rootKey = "--ROOT"
      var map = []
      map[rootKey] = result;
      for (var i = 0; i < collections.length; i++) {
        var current = collections[i];
        if (this.parsedInclusions) {
          if (this.parsedInclusions.indexOf(current.name) < 0) {
            continue
          }
        }
        if (this.parsedExclusions) {
          if (this.parsedExclusions.indexOf(current.name) >= 0) {
            continue
          }
        }
        if (current.name.indexOf(".") < 0) {
          var collection = {}
          collection.type = "folder";
          collection.state = "closed"
          collection.name = current.name
          collection.content = current.collections;
          map[rootKey].push(collection)
        } else {
          var segments = current.name.split(".");
          var currentSegment = ""
          var currentNode = null
          for (var j = 0; j < segments.length; j++) {
            if (j == 0) {
              currentSegment = segments[0];
              currentNode = map[rootKey];
              let collection = {}
              collection.type = "folder";
              collection.state = "closed"
              collection.name = segments[j]
              collection.content = []
              currentNode.push(collection)
              map[currentSegment] = collection.content
            } else if (j < segments.length - 1) {
              var lastNode = map[currentSegment];
              currentSegment = currentSegment + "." + segments[j];
              currentNode = map[currentSegment]

              if (currentNode == null) {
                let collection = {}
                collection.type = "folder";
                collection.state = "closed"
                collection.name = segments[j]
                collection.content = []
                lastNode.push(collection)
              }

            } else {
              var lastNode = map[currentSegment];
              currentSegment = currentSegment + "." + segments[j];
              currentNode = map[currentSegment]

              if (currentNode == null) {
                let collection = {}
                collection.type = "folder";
                collection.state = "closed"
                collection.name = segments[j]
                collection.content = current.collections
                lastNode.push(collection)
                map[currentSegment] = collection.content
              }

            }

          }
          //							  var aux = {"name", segments[j]}
          //							  if (j == 0) {
          //								  aux.
          //							  }
          //						  }
        }
      }
      this.collections = result;
      if (window.localStorage) {
        window.localStorage.setItem(this.localstoragekey, JSON.stringify(result));
      }


    },

    handleResponse: function(response) {

      this.getTreeFromResponseBody(response.body);
      window.loadingCoampaigns = false
      this.loading = false;
      var event = new CustomEvent('aerisCampaignDownloadResponse', {
        detail: {
          collections: this.collections
        }
      });
      document.dispatchEvent(event);
    },

    handleError: function(request) {
      window.loadingCoampaigns = false
      this.loading = false;
      console.log("Aeris collection criteria - Error while accessing server:");
      var error = response.status;
      var message = response.statusText;
      if (!error) message = 'Can\'t connect to the server';
      console.log('Error ' + error + ': ' + message);
    },



    handleSearchBarEvent: function(e) {
      var aux = this.$el.querySelectorAll("input[role='leaf']:checked")
      var result = []
      for (var i = 0; i < aux.length; i++) {
        var name = aux[i].id;
        var segments = name.split(".");
        var entry = {}
        entry.name = segments[segments.length - 1]
        var program = ""
        for (var j = 1; j < segments.length - 1; j++) {
          if (j == 1) {
            program = segments[j];
          } else {
            program = program + "." + segments[j]
          }

        }
        entry.program = program;
        result.push(entry);
      }
      if (result.length > 0) {
        if (e.detail.collections) {
          for (var i = 0; i < result.length; i++) {
            e.detail.collections.push(result[i])
          }
        } else {
          e.detail.collections = result;
        }
      }
    },

    handleSearchBarResetEvent: function(e) {
      // uncheck everything
      var parent = this.$el.querySelectorAll("input");
      parent.forEach(function(element) {
        if (element.checked) {
          element.checked = false;
        }
      })
    }

  }
}
</script>
<style>
.loadingbar {
  background: gainsboro;
  padding: 3px;
}

.aeris-collection-search-criteria-content-host .visible {
  display: block;
}

.aeris-collection-search-criteria-content-host .notvisible {
  display: none;
}

.aeris-collection-search-criteria-content-host {
  display: block;
}

.aeris-collection-search-criteria-content-host .program {
  margin-bottom: 5px;
}

.aeris-collection-search-criteria-content-host .program .program-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
}

.aeris-collection-search-criteria-content-host .program .program-header label {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  margin: 2px;
}

.aeris-collection-search-criteria-content-host .program .program-header .fa {
  cursor: pointer;
}

.aeris-collection-search-criteria-content-host .program .collection {
  margin-left: 20px;
}

.aeris-collection-search-criteria-content-host .icon-input {
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

.aeris-collection-search-criteria-content-host .icon-input i {
  padding: 3px;
}

.aeris-collection-search-criteria-content-host .filter-input {
  border-style: none;
  border: none;
  outline: none;
  margin: 2px;
}

.aeris-collection-search-criteria-content-host .badge {
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
