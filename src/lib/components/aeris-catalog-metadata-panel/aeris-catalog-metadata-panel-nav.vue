<template>
<nav data-aeris-catalog-metadata-panel-nav>
  <div v-for="tab in tabsSorted" @click="navigate(tab.id)" :class="{'active': activeTab.id == tab.id }">
    <i class="fa fa-exclamation-circle" aria-hidden="true" v-if="tab.hasError"></i> {{tab.title}}
  </div>
</nav>
</template>
<script>
export default {

  name: 'aeris-catalog-metadata-panel-nav',

  props: {
    edit: {
      required: true
    }
  },

  data: () => ({
    aerisDataBlockNavInitListener: null,
    aerisDataBlockNavUpdateListener: null,
    activeTab: null,
    tabs: {}
  }),

  computed: {
    tabsSorted() {
      return Object.values(this.tabs).sort((a, b) => a.order - b.order);
    }
  },

  watch: {

    edit() {
      this.tabs = {};
    }
  },

  created() {
    this.aerisDataBlockNavInitListener = this.handleDataBlockNavInit.bind(this)
    document.addEventListener('aerisDataBlockNavInit', this.aerisDataBlockNavInitListener);
    this.aerisDataBlockNavUpdateListener = this.handleDataBlockNavUpdate.bind(this)
    document.addEventListener('aerisDataBlockNavUpdate', this.aerisDataBlockNavUpdateListener);
  },

  destroyed() {
    document.removeEventListener('aerisDataBlockNavInit', this.aerisDataBlockNavInitListener);
    this.aerisDataBlockNavInitListener = null;
    document.removeEventListener('aerisDataBlockNavUpdate', this.aerisDataBlockNavUpdateListener);
    this.aerisDataBlockNavUpdateListener = null;
  },

  methods: {

    handleDataBlockNavInit(e) {

      let tab = {
        id: e.detail.type,
        order: e.detail.order ? e.detail.order : Object.keys(this.tabs).length,
        title: e.detail.title,
        hasError: false
      };
      this.tabs[tab.id] = tab;
      this.tabs = Object.assign({}, this.tabs);
      !this.activeTab || tab.order < this.activeTab.order ? this.navigate(tab.id) : null;
    },

    handleDataBlockNavUpdate(e) {

      this.tabs[e.detail.type].hasError = e.detail.error;

    },

    navigate(id) {

      this.activeTab = this.tabs[id];
      document.dispatchEvent(new CustomEvent('aerisDataBlockNavGo', {
        detail: {
          current: id
        }
      }));
    },
  }
}
</script>
<style>
[data-aeris-catalog-metadata-panel-nav] {
  position: absolute;
  top: 8em;
  font-weight: 300;
  font-size: 1.2em;
  width: 12em;
  padding: 12px;
  border-right: 3px solid rgb(243, 152, 70);
}

[data-aeris-catalog-metadata-panel-nav] i {
  color: #b30000;
}

[data-aeris-catalog-metadata-panel-nav]>*.active {
  color: rgb(243, 152, 70);
  font-weight: 400;
}

[data-aeris-catalog-metadata-panel-nav]>* {
  margin-right: 8px;
  font-size: 0.9em;
  cursor: pointer;
}
</style>
