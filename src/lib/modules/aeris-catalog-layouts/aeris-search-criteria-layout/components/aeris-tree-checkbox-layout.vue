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
  <div data-aeris-tree-checkbox-layout>
    <div v-if="isLoading" class="loading-bar">
      <i class="fa fa-circle-o-notch fa-spin fa-fw" />
      <span>{{ $t("loading") }}</span>
    </div>
    <div v-if="isUpdating" class="loading-bar">
      <i class="fa fa-circle-o-notch fa-spin fa-fw" />
      <span>{{ $t("updating") }}</span>
    </div>

    <main v-for="(item, index) of items" :key="item.name">
      <div class="first-level">
        <main>
          <input :id="`${name}${item.name}`" :checked="item.checked" type="checkbox" @change="checkFirstLevel(index)" />
          <label :for="`${name}${item.name}`">{{ item.label }}</label>
        </main>
        <aside>
          <i
            v-if="item.downloadable"
            :title="$t('directlydownloadable')"
            class="fa fa-shopping-cart tooltip downloadable"
          />
          <span v-if="item.subitems.length > 0" class="badge">{{ item.subitems.length }}</span>
          <i
            v-if="item.subitems.length > 0"
            v-show="item.deployed"
            class="fa fa-minus-square-o deployed"
            @click="toggle(index)"
          />
          <i
            v-if="item.subitems.length > 0"
            v-show="!item.deployed"
            class="fa fa-plus-square-o deployed"
            @click="toggle(index)"
          />
        </aside>
      </div>
      <template v-if="item.deployed">
        <div v-for="(subitem, indexSubitem) of item.subitems" :key="subitem.name" class="second-level">
          <input
            :id="`${name}${item.name}${subitem.name}`"
            :checked="subitem.checked"
            type="checkbox"
            @change="checkSecondLevel(index, indexSubitem)"
          />
          <label :for="`${name}${item.name}${subitem.name}`">{{ subitem.label }}</label>
        </div>
      </template>
    </main>
  </div>
</template>

<script>
export default {
  name: "aeris-tree-checkbox-layout",

  props: {
    lang: {
      type: String,
      default: "en"
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
    metadataService: {
      type: String,
      default: null
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value;
    }
  },

  destroyed: function() {
    document.removeEventListener("aerisTheme", this.aerisThemeListener);
    this.aerisThemeListener = null;
    document.removeEventListener("aerisCatalogueSearchEvent", this.handleSearchBarListener);
    this.handleSearchBarListener = null;
    document.removeEventListener("aerisCatalogueResetEvent", this.handleSearchBarResetListener);
    this.handleSearchBarResetListener = null;
    document.removeEventListener(`aeris${this.name}ItemsEvent`, this.handleItemsListener);
    this.handleItemsListener = null;
  },

  created: function() {
    this.$i18n.locale = this.lang;
    this.aerisThemeListener = this.handleTheme.bind(this);
    document.addEventListener("aerisTheme", this.aerisThemeListener);
    this.handleSearchBarListener = this.handleSearchBarEvent.bind(this);
    document.addEventListener("aerisCatalogueSearchEvent", this.handleSearchBarListener);
    this.handleSearchBarResetListener = this.handleSearchBarResetEvent.bind(this);
    document.addEventListener("aerisCatalogueResetEvent", this.handleSearchBarResetListener);
    this.handleItemsListener = this.handleItemsEvent.bind(this);
    document.addEventListener(`aeris${this.name}ItemsEvent`, this.handleItemsListener);

    this.load();
  },

  mounted() {
    document.dispatchEvent(new CustomEvent("aerisThemeRequest", {}));
  },

  computed: {
    isLoading: function() {
      return this.loading && !this.existing;
    },

    isUpdating: function() {
      return this.loading && this.existing;
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
      existing: false
    };
  },

  methods: {
    handleTheme: function(theme) {
      this.theme = theme;
      this.colorBaddges(this.theme);
    },

    colorBaddges: function(theme) {
      if (this.$el.querySelectorAll(".badge")) {
        this.$el.querySelectorAll(".badge").forEach(el => (el.style.background = theme.detail.emphasis));
      }
    },

    checkFirstLevel(index) {
      this.items[index].checked = !this.items[index].checked;
      this.items[index].deployed = this.items[index].checked;
      this.items[index].subitems.forEach(item => (item.checked = this.items[index].checked));
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
        let aux = window.localStorage.getItem("aeris" + this.name + "Types");
        if (aux != null && aux != "undefined") {
          this.items = JSON.parse(aux);
          this.existing = true;
        }
      }

      let url;
      if (this.metadataService) {
        url = this.metadataService;
      } else {
        let parentService = document.querySelector("aeris-catalog").attributes.getNamedItem("metadata-service").value;
        parentService = parentService.endsWith("/")
          ? parentService + this.type + "/"
          : parentService + "/" + this.type + "/";
        url = this.service || parentService;

        if (document.querySelector("aeris-catalog").attributes.getNamedItem("program")) {
          let program = document.querySelector("aeris-catalog").attributes.getNamedItem("program").value;
          if (program) {
            url += "?program=" + program;
          }
        }
      }

      console.log("Aeris - load - Appel au serveur");
      this.$http
        .get(url, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        })
        .then(
          response => {
            this.handleResponse(response);
          },
          response => {
            this.handleError(response);
          }
        );
    },

    handleResponse: function(response) {
      this.loading = false;
      var event = new CustomEvent("aeris" + this.name + "DownloadResponse", {
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
      if (!error) message = "Can't connect to the server";
      console.log("Error " + error + ": " + message);
    },

    handleItemsEvent(e) {
      document.removeEventListener(`aeris${this.name}ItemsEvent`, this.handleItemsListener);
      this.handleItemsListener = null;
      this.items = e.detail.items;
      this.loading = false;
      this.existing = true;
      if (window.localStorage) {
        window.localStorage.setItem("aeris" + this.name + "Types", JSON.stringify(this.items));
      }
      this.$nextTick(function() {
        // Defer the callback to be executed after the next DOM update cycle
        // otherwise badges won't be visible on first load
        this.colorBaddges(this.theme);
      });
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
};
</script>
<style>
[data-aeris-tree-checkbox-layout] {
  color: #fafafa;
}

[data-aeris-tree-checkbox-layout] .loading-bar {
  padding: 8px 0;
}

[data-aeris-tree-checkbox-layout] .first-level {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
}

[data-aeris-tree-checkbox-layout] .second-level {
  margin-left: 24px;
  padding: 5px 0;
}

[data-aeris-tree-checkbox-layout] input {
  margin-right: 15px;
}

[data-aeris-tree-checkbox-layout] .first-level aside {
  display: flex;
  align-items: center;
}

[data-aeris-tree-checkbox-layout] .badge {
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

[data-aeris-tree-checkbox-layout] .deployed {
  cursor: pointer;
}

[data-aeris-tree-checkbox-layout] .downloadable {
  color: #f39c12;
}
</style>
