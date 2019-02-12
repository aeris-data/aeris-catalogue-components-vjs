<i18n>
{
	  "en": {
		  "L0": "Level 0",
		  "L0A": "Level 0A",
		  "L1": "Level 1",
		  "L10": "Level 10",
		  "L15": "Level 15",
		  "L1A": "Level 1A",
		  "L1B": "Level 1B",
		  "L2": "Level 2",
		  "L20": "Level 20",
		  "L2A": "Level 2A",
		  "L2B": "Level 2B",
		  "L3": "Level 3",
		  "L4": "Level 4",
		  "UNKNOWN": "Unknown"
	  },
	  "fr": {
		  "L0": "Niveau 0",
		  "L1": "Niveau 1",
		  "L1A": "Niveau 1A",
		  "L1B": "Niveau 1B",
		  "L2": "Niveau 2",
		  "L2A": "Niveau 2A",
		  "L2B": "Niveau 2B",
		  "L3": "Niveau 3",
		  "L4": "Niveau 4",
		  "UNKNOWN": "Inconnu"
	  }
}
</i18n>

<template>
  <div data-aeris-level-search-criteria-content>
    <aeris-tree-checkbox-layout
      type="levels"
      name="Level"
      name-subitems="sublevels"
      search-first-level="true"
    ></aeris-tree-checkbox-layout>
  </div>
</template>

<script>
export default {
  name: "aeris-level-search-criteria-content",

  props: {
    lang: {
      type: String,
      default: "en"
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value;
    }
  },

  destroyed: function() {
    document.removeEventListener("aerisLevelDownloadResponse", this.handleLevelResponseListener);
    this.handleLevelResponseListener = null;
  },

  created: function() {
    console.log("Aeris level search criteria content - created");
    this.$i18n.locale = this.lang;
  },

  mounted: function() {
    this.handleLevelResponseListener = this.handleLevelResponse.bind(this);
    document.addEventListener("aerisLevelDownloadResponse", this.handleLevelResponseListener);
  },

  data() {
    return {
      handleLevelResponseListener: null
    };
  },

  updated: function() {},

  methods: {
    handleLevelResponse: function(e) {
      document.dispatchEvent(
        new CustomEvent("aerisLevelItemsEvent", {
          detail: {
            items: e.detail.items.map(item => {
              return {
                checked: false,
                deployed: false,
                name: item.name,
                payload: item.name,
                label: this.$i18n.te(item.name) ? this.$i18n.t(item.name) : item.name,
                subitems: item.sublevels.map(subitem => {
                  return {
                    checked: false,
                    name: subitem.name,
                    payload: subitem.name,
                    label: this.$i18n.te(subitem.name) ? this.$i18n.t(subitem.name) : subitem.name
                  };
                })
              };
            })
          }
        })
      );
    }
  }
};
</script>
