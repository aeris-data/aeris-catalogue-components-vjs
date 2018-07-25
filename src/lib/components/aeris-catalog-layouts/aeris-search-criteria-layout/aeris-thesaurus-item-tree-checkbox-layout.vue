<i18n>
{
    "en": {
    "loading": "Loading...",
    "updating": "Checking for updates..."
    },
    "fr": {
    "loading": "Chargement...",
    "updating": "Recherche de mises à jour..."
    }
}
</i18n>

<template>
<div data-aeris-thesaurus-item-tree-checkbox-layout>

  <div v-if="isLoading" class="loading-bar">
    <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
    <span>{{$t('loading')}}</span>
  </div>
  <div v-if="isUpdating" class="loading-bar">
    <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
    <span>{{$t('updating')}}</span>
  </div>

  <main v-for="(item,index) of items" :key="item.search">
    <div class="first-level">
      <main>
        <input type="checkbox" :id="`${name}${item.name}`" :checked="item.checked" @change="checkFirstLevel(index)">
        <label :for="`${name}${item.name}`">{{item.label}}</label>
      </main>
      <aside>
      <span v-if="thesaurusItemsLength(item) > 0" class="badge">{{thesaurusItemsLength(item)}}</span>
      <i v-if="thesaurusItemsLength(item) > 0" v-show="item.deployed" class="fa fa-minus-square-o deployed" @click="toggle(index)"></i>
      <i v-if="thesaurusItemsLength(item) > 0" v-show="!item.deployed" class="fa fa-plus-square-o deployed" @click="toggle(index)"></i>
      </aside>
    </div>
    <div v-if="item.deployed">
	  <div class="second-level" v-for="(thesaurusItem, indexSubitem) of item.thesaurusItems" :key="thesaurusItem.search">
	  	<div>
		   	<main>
		        <input type="checkbox" :id="`${name}${item.name}${thesaurusItem.name}`" :checked="thesaurusItem.checked" @change="checkSecondLevel(index, indexSubitem)">
		        <label :for="`${name}${item.name}${thesaurusItem.name}`">{{(thesaurusItem.label)}}</label>
	        </main>
	        <aside>
		      <span v-if="thirdLevelLength(thesaurusItem) > 0" class="badge">{{thirdLevelLength(thesaurusItem)}}</span>
		      <i v-if="thirdLevelLength(thesaurusItem) > 0" v-show="thesaurusItem.deployed" class="fa fa-minus-square-o deployed" @click="toggleThirdLevel(index, indexSubitem)"></i>
		      <i v-if="thirdLevelLength(thesaurusItem) > 0" v-show="!thesaurusItem.deployed" class="fa fa-plus-square-o deployed" @click="toggleThirdLevel(index, indexSubitem)"></i>
		    </aside>
	    </div>
	    <div class="third-level" v-show="thesaurusItem.deployed">
		      <div v-for="(thirdthesaurusItem, indexThirdthesaurusItem) of thesaurusItem.thesaurusItems" :key="thirdthesaurusItem.search">
		        <input type="checkbox" :id="`${name}${item.name}${thirdthesaurusItem.name}`" :checked="thirdthesaurusItem.checked" @change="checkThirdLevel(index, indexSubitem, indexThirdthesaurusItem)">
		        <label :for="`${name}${item.name}${thirdthesaurusItem.name}`">{{(thirdthesaurusItem.label)}}</label>
		      </div>
	    </div>
      </div>
  </div>
  </main>

</div>
</template>

<script>
export default {

  name: 'aeris-thesaurus-item-tree-checkbox-layout',

  props: {
    lang: {
      type: String,
      default: 'en'
    },
    name: {
      type: String
    },
    type: {
      type: String,
      default: null
    },
    nameSubitems: {
      type: String
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value
    }
  },

  destroyed: function() {
    document.removeEventListener('aerisTheme', this.aerisThemeListener);
    this.aerisThemeListener = null;
    document.removeEventListener('aerisCatalogueSearchEvent', this.handleSearchBarListener);
    this.handleSearchBarListener = null;
    document.removeEventListener('aerisCatalogueResetEvent', this.handleSearchBarResetListener);
    this.handleSearchBarResetListener = null;
    document.removeEventListener(`aeris${this.name}ItemsEvent`, this.handleItemsListener);
    this.handleItemsListener = null;
  },

  created: function() {
    this.$i18n.locale = this.lang;
    this.aerisThemeListener = this.handleTheme.bind(this);
    document.addEventListener('aerisTheme', this.aerisThemeListener);
    this.handleSearchBarListener = this.handleSearchBarEvent.bind(this);
    document.addEventListener('aerisCatalogueSearchEvent', this.handleSearchBarListener);
    this.handleSearchBarResetListener = this.handleSearchBarResetEvent.bind(this);
    document.addEventListener('aerisCatalogueResetEvent', this.handleSearchBarResetListener);
    this.handleItemsListener = this.handleItemsEvent.bind(this);
    document.addEventListener(`aeris${this.name}ItemsEvent`, this.handleItemsListener);

    this.load();
  },

  mounted() {
    console.log('Aeris thesaurus tree checkbox - created');
    document.dispatchEvent(new CustomEvent('aerisThemeRequest', {}));
  },

  computed: {


    isLoading: function() {
      return ((this.loading) && (!this.existing))
    },

    isUpdating: function() {
      return ((this.loading) && (this.existing))
    }

  },

  data() {
    return {
      aerisThemeListener: null,
      handleSearchBarListener: null,
      handleSearchBarResetListener: null,
      handleItemsListener: null,
      parentService: null,
      items: [],
      loading: false,
      theme: [],
      existing: false,
      selectedItems: []
    }
  },

  methods: {

    thesaurusItemsLength: function(item) {
    	if (item.thesaurusItems) {
    		return item.thesaurusItems.length;
    	} else {
    		return 0;
    	}
    },
    
    thirdLevelLength: function(thesaurusItem) {
    	if (thesaurusItem && thesaurusItem.thesaurusItems) {
    		return thesaurusItem.thesaurusItems.length;
    	} else {
    		return 0;
    	}
    },
    
	handleTheme: function(theme) {
    	this.theme = theme;
    	this.colorBaddges(this.theme);
    },
    
    colorBaddges: function(theme) {
	  if (this.$el.querySelectorAll(".badge")) {
        this.$el.querySelectorAll(".badge").forEach(el => el.style.background = theme.detail.emphasis);
      }
    },
    
    checkFirstLevel(index)  {
      this.items[index].checked = !this.items[index].checked;
      this.items[index].deployed = this.items[index].checked;
      if (this.items[index].thesaurusItems) {
    	  for (let i = 0; i < this.items[index].thesaurusItems.length; i++) { 
        	  this.checkSecondLevel(index, i, this.items[index].checked);
    		}
      }
      // for handle search
      let searchString = this.items[index].search;
      if (this.items[index].checked) {
    	  this.selectedItems.push(searchString);
      } else {
    	  this.selectedItems.splice(this.selectedItems.indexOf(searchString), 1);
      }
    },

    checkSecondLevel(index, indexSubitem, aboveLevel) {
    	if (typeof aboveLevel != 'undefined') {
    		this.items[index].thesaurusItems[indexSubitem].checked = aboveLevel;
    	} else {
    		this.items[index].thesaurusItems[indexSubitem].checked = !this.items[index].thesaurusItems[indexSubitem].checked;
    	}
    	if (this.items[index].thesaurusItems[indexSubitem].thesaurusItems) {
    	  for (let i = 0; i < this.items[index].thesaurusItems[indexSubitem].thesaurusItems.length; i++) { 
    		  this.checkThirdLevel(index, indexSubitem, i, this.items[index].thesaurusItems[indexSubitem].checked);
    		}
    	}
        this.items[index].thesaurusItems[indexSubitem].deployed = this.items[index].thesaurusItems[indexSubitem].checked;
        this.$nextTick(function () {
          // Defer the callback to be executed after the next DOM update cycle
      	  // otherwise badges won't be visible on first load
      	  this.colorBaddges(this.theme);
          })
    	// for handle search
    	let searchString = this.items[index].thesaurusItems[indexSubitem].search;
    	if (this.items[index].thesaurusItems[indexSubitem].checked) {
        let searchValues = searchString.substring(0, (searchString.lastIndexOf(";") == -1 ? searchString.length : searchString.lastIndexOf(";")));
        searchValues = searchValues.split(";");
        let searchArray = this.selectedItems.concat(searchValues);
        this.selectedItems = searchArray;
    	} else {
    	  this.selectedItems.splice(this.selectedItems.indexOf(searchString), 1);
    	}
    },

    checkThirdLevel(index, indexSubitem, indexThirdthesaurusItem, aboveLevel) {
    	if (typeof aboveLevel != 'undefined') {
    	      this.items[index].thesaurusItems[indexSubitem].thesaurusItems[indexThirdthesaurusItem].checked = aboveLevel;
    	} else {

    	      this.items[index].thesaurusItems[indexSubitem].thesaurusItems[indexThirdthesaurusItem].checked = !this.items[index].thesaurusItems[indexSubitem].thesaurusItems[indexThirdthesaurusItem].checked;
    	}
      let searchString = this.items[index].thesaurusItems[indexSubitem].thesaurusItems[indexThirdthesaurusItem].search;
      if (this.items[index].thesaurusItems[indexSubitem].thesaurusItems[indexThirdthesaurusItem].checked) {
        let searchValues = searchString.substring(0, (searchString.lastIndexOf(";") == -1 ? searchString.length : searchString.lastIndexOf(";")));
        searchValues = searchValues.split(";");
        let searchArray = this.selectedItems.concat(searchValues);
        this.selectedItems = searchArray;
      } else {
    	  this.selectedItems.splice(this.selectedItems.indexOf(searchString), 1);
      }
    },

    toggle(index) {
      this.items[index].deployed = !this.items[index].deployed;
      //this.items = this.items.slice(0, this.items.length);
      this.$nextTick(function () {
          // Defer the callback to be executed after the next DOM update cycle
    	  // otherwise badges won't be visible on first load
    	  this.colorBaddges(this.theme);
        })
    },
    
    toggleThirdLevel(index, indexSubitem) {
        this.items[index].thesaurusItems[indexSubitem].deployed = !this.items[index].thesaurusItems[indexSubitem].deployed;
        //this.items = this.items.slice(0, this.items.length);
        this.$nextTick(function () {
            // Defer the callback to be executed after the next DOM update cycle
      	  // otherwise badges won't be visible on first load
      	  this.colorBaddges(this.theme);
          })
    },

    load() {
      this.loading = true;
      if (window.localStorage) {
        let aux = window.localStorage.getItem('aeris' + this.name + 'Types');
        if ((aux != null) && (aux != "undefined")) {
          this.items = JSON.parse(aux);
          this.existing = true;
        }
      }

      let parentService = document.querySelector('aeris-catalog').attributes.getNamedItem('metadata-service').value;
      parentService = parentService.endsWith('/') ? parentService + this.type + '/' : parentService + '/' + this.type + '/';
      let url = this.service || parentService;

      if (document.querySelector('aeris-catalog').attributes.getNamedItem('program')) {
        let program = document.querySelector('aeris-catalog').attributes.getNamedItem('program').value;
        if (program) {
          url += "?program=" + program;
        }
      }
      console.log("Aeris - load - Appel au serveur")
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
    },

    handleResponse: function(response) {
      this.loading = false;
      var event = new CustomEvent('aeris' + this.name + 'DownloadResponse', {
        detail: {
          items: response.body
        }
      });
      document.dispatchEvent(event);
    },

    handleError: function(request) {
      this.loading = false;
      console.log("Aeris " + this.name + " criteria - Error while accessing server:");
      var error = response.status;
      var message = response.statusText;
      if (!error) message = 'Can\'t connect to the server';
      console.log('Error ' + error + ': ' + message);
    },

    handleItemsEvent(e) {
      document.removeEventListener(`aeris${this.name}ItemsEvent`, this.handleItemsListener);
      this.handleItemsListener = null;
      this.items = e.detail.items;
      this.loading = false;
      this.existing = true;
      if (window.localStorage) {
        window.localStorage.setItem('aeris' + this.name + 'Types', JSON.stringify(this.items));
      }
      this.$nextTick(function () {
          // Defer the callback to be executed after the next DOM update cycle
    	  // otherwise badges won't be visible on first load
    	  this.colorBaddges(this.theme);
        })  	  
    },

    handleSearchBarEvent: function(e) {      
      if (this.selectedItems.length > 0) {
        e.detail[this.nameSubitems] = this.selectedItems;
      }
    },

    handleSearchBarResetEvent: function(e) {
    	let i;
    	for (i = 0; i < this.items.length; i++) {
    		this.items[i].checked = true;
    		this.checkFirstLevel(i);
    	}  
    	this.selectedItems = [];
    }
  }
}
</script>
<style>
[data-aeris-thesaurus-item-tree-checkbox-layout] {
  color: #FAFAFA;
}

[data-aeris-thesaurus-item-tree-checkbox-layout] .loading-bar {
  padding: 8px 0;
}

[data-aeris-thesaurus-item-tree-checkbox-layout] .first-level {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 5px 0;
}

[data-aeris-thesaurus-item-tree-checkbox-layout] .second-level {    
  	margin-left: 12px;
  	padding: 5px 0;
}

[data-aeris-thesaurus-item-tree-checkbox-layout] .second-level > div:first-child {
	display : flex;
	align-items: flex-start;
	justify-content: space-between;
}

[data-aeris-thesaurus-item-tree-checkbox-layout] label {
	overflow-wrap:break-word;
	-webkit-hyphens: auto;
	-moz-hyphens: auto;
	-ms-hyphens: auto;
	-o-hyphens: auto;
	hyphens:auto;
}

[data-aeris-thesaurus-item-tree-checkbox-layout] .third-level {
  margin-left: 15px;
  padding: 5px 0;
}

[data-aeris-thesaurus-item-tree-checkbox-layout] input {
  margin-right: 15px;
}

[data-aeris-thesaurus-item-tree-checkbox-layout] .first-level aside {
  display: flex;
  align-items: center;
}

[data-aeris-thesaurus-item-tree-checkbox-layout] .second-level aside {
  display: flex;
  align-items: center;
}

[data-aeris-thesaurus-item-tree-checkbox-layout] .badge {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin: 0 8px;
  padding: 2px 6px;
  font-size: 0.6em;
  font-weight: 700;
  line-height: 1;
}

[data-aeris-thesaurus-item-tree-checkbox-layout] .deployed {
  cursor: pointer;
}

[data-aeris-thesaurus-item-tree-checkbox-layout] .downloadable {
  color: #f39c12;
}
</style>
