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
<div data-aeris-instrument-tree-checkbox-layout>

  <div v-if="isLoading" class="loading-bar">
    <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
    <span>{{$t('loading')}}</span>
  </div>
  <div v-if="isUpdating" class="loading-bar">
    <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
    <span>{{$t('updating')}}</span>
  </div>

  <main v-for="(item,index) of items" :key="item.name">
    <div class="first-level">
      <main>
        <input type="checkbox" :id="`${name}${item.name}`" :checked="item.checked" @change="checkFirstLevel(index)">
        <label :for="`${name}${item.name}`">{{item.label}}</label>
      </main>
      <aside>
      <span v-if="instrumentsLength(item) > 0" class="badge">{{instrumentsLength(item)}}</span>
      <i v-if="instrumentsLength(item) > 0" v-show="item.deployed" class="fa fa-minus-square-o deployed" @click="toggle(index)"></i>
      <i v-if="instrumentsLength(item) > 0" v-show="!item.deployed" class="fa fa-plus-square-o deployed" @click="toggle(index)"></i>
      </aside>
    </div>
    <div v-if="item.deployed">
	  <div class="second-level" v-for="(instrument, indexSubitem) of item.instruments">
	  	<div>
		   	<main>
		        <input type="checkbox" :id="`${name}${item.name}${instrument.name}`" :checked="instrument.checked" @change="checkSecondLevel(index, indexSubitem)">
		        <label :for="`${name}${item.name}${instrument.name}`">{{(instrument.label)}}</label>
	        </main>
	        <aside>
		      <span v-if="thirdLevelLength(instrument) > 0" class="badge">{{thirdLevelLength(instrument)}}</span>
		      <i v-if="thirdLevelLength(instrument) > 0" v-show="instrument.deployed" class="fa fa-minus-square-o deployed" @click="toggleThirdLevel(index, indexSubitem)"></i>
		      <i v-if="thirdLevelLength(instrument) > 0" v-show="!instrument.deployed" class="fa fa-plus-square-o deployed" @click="toggleThirdLevel(index, indexSubitem)"></i>
		    </aside>
	    </div>
	    <div class="third-level" v-show="instrument.deployed">
		      <div v-for="(thirdInstrument, indexThirdInstrument) of instrument.instruments">
		        <input type="checkbox" :id="`${name}${item.name}${thirdInstrument.name}`" :checked="thirdInstrument.checked" @change="checkThirdLevel(index, indexSubitem, indexThirdInstrument)">
		        <label :for="`${name}${item.name}${thirdInstrument.name}`">{{(thirdInstrument.label)}}</label>
		      </div>
	    </div>
      </div>
  </div>
  </main>

</div>
</template>

<script>
export default {

  name: 'aeris-instrument-tree-checkbox-layout',

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

    instrumentsLength: function(item) {
    	if (item.instruments) {
    		return item.instruments.length;
    	} else {
    		return 0;
    	}
    },
    
    thirdLevelLength: function(instrument) {
    	if (instrument && instrument.instruments) {
    		return instrument.instruments.length;
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
      if (this.items[index].instruments) {
    	  for (let i = 0; i < this.items[index].instruments.length; i++) { 
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
    		this.items[index].instruments[indexSubitem].checked = aboveLevel;
    	} else {
    		this.items[index].instruments[indexSubitem].checked = !this.items[index].instruments[indexSubitem].checked;
    	}
    	if (this.items[index].instruments[indexSubitem].instruments) {
    	  for (let i = 0; i < this.items[index].instruments[indexSubitem].instruments.length; i++) { 
    		  this.checkThirdLevel(index, indexSubitem, i, this.items[index].instruments[indexSubitem].checked);
    		}
    	}
        this.items[index].instruments[indexSubitem].deployed = this.items[index].instruments[indexSubitem].checked;
        this.$nextTick(function () {
            // Defer the callback to be executed after the next DOM update cycle
      	  // otherwise badges won't be visible on first load
      	  this.colorBaddges(this.theme);
          })
    	// for handle search
    	let searchString = this.items[index].instruments[indexSubitem].search;
    	if (this.items[index].instruments[indexSubitem].checked) {
    	  this.selectedItems.push(searchString);
    	} else {
    	  this.selectedItems.splice(this.selectedItems.indexOf(searchString), 1);
    	}
    },

    checkThirdLevel(index, indexSubitem, indexThirdInstrument, aboveLevel) {
    	if (typeof aboveLevel != 'undefined') {
    	      this.items[index].instruments[indexSubitem].instruments[indexThirdInstrument].checked = aboveLevel;
    	} else {

    	      this.items[index].instruments[indexSubitem].instruments[indexThirdInstrument].checked = !this.items[index].instruments[indexSubitem].instruments[indexThirdInstrument].checked;
    	}
      let searchString = this.items[index].instruments[indexSubitem].instruments[indexThirdInstrument].search;
      if (this.items[index].instruments[indexSubitem].instruments[indexThirdInstrument].checked) {
    	  this.selectedItems.push(searchString);
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
        this.items[index].instruments[indexSubitem].deployed = !this.items[index].instruments[indexSubitem].deployed;
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
[data-aeris-instrument-tree-checkbox-layout] {
  color: #FAFAFA;
}

[data-aeris-instrument-tree-checkbox-layout] .loading-bar {
  padding: 8px 0;
}

[data-aeris-instrument-tree-checkbox-layout] .first-level {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 5px 0;
}

[data-aeris-instrument-tree-checkbox-layout] .second-level {    
  	margin-left: 12px;
  	padding: 5px 0;
}

[data-aeris-instrument-tree-checkbox-layout] .second-level > div:first-child {
	display : flex;
	align-items: flex-start;
	justify-content: space-between;
}

[data-aeris-instrument-tree-checkbox-layout] label {
	overflow-wrap:break-word;
	-webkit-hyphens: auto;
	-moz-hyphens: auto;
	-ms-hyphens: auto;
	-o-hyphens: auto;
	hyphens:auto;
}

[data-aeris-instrument-tree-checkbox-layout] .third-level {
  margin-left: 15px;
  padding: 5px 0;
}

[data-aeris-instrument-tree-checkbox-layout] input {
  margin-right: 15px;
}

[data-aeris-instrument-tree-checkbox-layout] .first-level aside {
  display: flex;
  align-items: center;
}

[data-aeris-instrument-tree-checkbox-layout] .second-level aside {
  display: flex;
  align-items: center;
}

[data-aeris-instrument-tree-checkbox-layout] .badge {
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

[data-aeris-instrument-tree-checkbox-layout] .deployed {
  cursor: pointer;
}

[data-aeris-instrument-tree-checkbox-layout] .downloadable {
  color: #f39c12;
}
</style>
