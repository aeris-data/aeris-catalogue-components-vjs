<i18n>
{
	  "en": {
			"directlydownloadable": "This collection can be directly downloaded from this portal",
		  "loading": "Loading...",
		  "updating": "Checking for updates..."
	  },
	  "fr": {
			"directlydownloadable": "Cette collection peut etre téléchargée directement à partir de ce portail",
		  "loading": "Chargement...",
		  "updating": "Recherche de mises à jour..."
	  }
}
</i18n>

<template>
<div data-aeris-platform-search-criteria-content>
  <div v-if="isLoading" class="loadingbar">
    <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
    <span>{{$t('loading')}}</span>
  </div>
  <div v-if="isUpdating" class="loadingbar">
    <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
    <span>{{$t('updating')}}</span>
  </div>

  <div v-for="(item,index) of items" :key="item.name">
    <div class="program-header">
      <input type="checkbox" class="program-checkbox" :id="`${name}${item.name}`" :aria-label="`${name}${item.name}`" :checked="item.checked" @change="checkFirstLevel(index)">
      <span class="program-name-row">
						<strong>
						{{item.label}}
						</strong>
						<span class="badge">{{item.subitems.length}}</span>
      </span>
      </input>
      <i v-show="item.deployed" class="fa fa-minus-square-o" @click="toggle(index)"></i>
      <i v-show="!item.deployed" class="fa fa-plus-square-o" @click="toggle(index)"></i>
      <i v-if="item.downloadable" class="fa fa-shopping-cart tooltip" :title="$t('directlydownloadable')"></i>
    </div>
    <div class="folderContent" v-if="item.deployed">
      <div class="offset">
        <div v-for="(subitem, indexSubitem) of item.subitems">
          <input type="checkbox" :id="`${prefix}${name}${subitem.name}`" :aria-label="`${name}${item.name}${subitem.name}`" :checked="subitem.checked" @change="checkSecondLevel(index, indexSubitem)" class="platform-checkbox">
          <span>{{(subitem.label)}}</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {

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
    },
    searchFirstLevel: {
      default: false
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value
    }
  },

  destroyed: function() {
    document.removeEventListener('aerisCatalogueSearchEvent', this.handleSearchBarListener);
    this.handleSearchBarListener = null;
    document.removeEventListener('aerisCatalogueResetEvent', this.handleSearchBarResetListener);
    this.handleSearchBarResetListener = null;
    document.removeEventListener(`aeris${this.name}ItemsEvent`, this.handleItemsListener);
    this.handleItemsListener = null;
  },

  created: function() {
    this.$i18n.locale = this.lang;
    this.handleSearchBarListener = this.handleSearchBarEvent.bind(this);
    document.addEventListener('aerisCatalogueSearchEvent', this.handleSearchBarListener);
    this.handleSearchBarResetListener = this.handleSearchBarResetEvent.bind(this);
    document.addEventListener('aerisCatalogueResetEvent', this.handleSearchBarResetListener);
    this.handleItemsListener = this.handleItemsEvent.bind(this);
    document.addEventListener(`aeris${this.name}ItemsEvent`, this.handleItemsListener);

    this.load();
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
      handleSearchBarListener: null,
      handleSearchBarResetListener: null,
      handleItemsListener: null,
      parentService: null,
      items: [],
      loading: false,
      existing: false
    }
  },

  methods: {

    checkFirstLevel(index)  {
      this.items[index].checked = !this.items[index].checked;
      this.items[index].deployed = this.items[index].checked;
      this.items[index].subitems.forEach(item => item.checked = this.items[index].checked);
      this.items = this.items.slice(0, this.items.length);
    },

    checkSecondLevel(index, indexSubitem) {
      this.items[index].subitems[indexSubitem].checked = !this.items[index].subitems[indexSubitem].checked;
      this.items = this.items.slice(0, this.items.length);
    },

    toggle(index) {
      this.items[index].deployed = !this.items[index].deployed;
      this.items = this.items.slice(0, this.items.length);
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
      console.log("Aeris platform criteria - Error while accessing server:");
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
    },

    handleSearchBarEvent: function(e) {
      let selectedItems = this.items
        .map(item => item.subitems.filter(subitem => subitem.checked))
        .reduce((acc, item) => acc.concat(item), [])
        .map(item => item.payload)
        .concat(this.items.filter(item => item.checked && item.payload).map(item => item.payload));

      if (selectedItems.length > 0) {
        e.detail[this.nameSubitems] = selectedItems;
      }
    },

    handleSearchBarResetEvent: function(e) {
      this.items = this.items.map(item => {
        item.checked = false;
        item.subitems = item.subitems.map(subitem => {
          subitem.checked = false;
          return subitem;
        });
        return item;
      });
    }
  }
}
</script>
<style>
[data-aeris-platform-search-criteria-content] .loadingbar {
  padding: 3px;
}
</style>
