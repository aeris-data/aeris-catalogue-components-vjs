<i18n>
{
	  "en": {
		  "UNKNOWN": "Unknown"
	  },
	  "fr": {
		  "UNKNOWN": "Inconnu"
	  }
}
</i18n>

<template>
  <div data-aeris-collection-search-criteria-content>
    <aeris-tree-checkbox-layout
      type="collections"
      name="Campaign"
      name-subitems="collections"
    ></aeris-tree-checkbox-layout>
  </div>
</template>

<script>
export default {
  name: "aeris-campaign-search-criteria-content",

  props: {
    lang: {
      type: String,
      default: "en"
    },

    downloadable: {
      type: String,
      default: ""
    },

    inclusion: {
      type: String,
      default: ""
    },

    exclusion: {
      type: String,
      default: ""
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value;
    }
  },

  destroyed: function() {
    document.removeEventListener("aerisCampaignDownloadResponse", this.handleCollectionResponseListener);
    this.handleCollectionDowloadListener = null;
  },

  created: function() {
    console.log("Aeris collectcampaign search criteria content - created");
    this.$i18n.locale = this.lang;

    this.handleCollectionResponseListener = this.handleCollectionResponse.bind(this);
    document.addEventListener("aerisCampaignDownloadResponse", this.handleCollectionResponseListener);
  },

  computed: {
    parsedInclusions: function() {
      if (this.inclusion && this.inclusion.length > 0) {
        return this.inclusion.split(",");
      } else {
        return null;
      }
    },

    parsedExclusions: function() {
      if (this.exclusion && this.exclusion.length > 0) {
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
      handleCollectionResponseListener: null
    };
  },

  updated: function() {},

  methods: {
    handleCollectionResponse: function(e) {
      document.dispatchEvent(
        new CustomEvent("aerisCampaignItemsEvent", {
          detail: {
            items: e.detail.items
              .filter(item =>
                this.parsedExclusions ? !this.parsedExclusions.some(itemToExclude => item.name == itemToExclude) : true
              )
              .filter(item =>
                this.parsedInclusions ? this.parsedInclusions.some(itemToInclude => item.name == itemToInclude) : true
              )
              .map(item => {
                return {
                  checked: false,
                  deployed: false,
                  name: item.name,
                  label: this.$i18n.te(item.name) ? this.$i18n.t(item.name) : item.name,
                  downloadable: this.level3collections.some(itemDownloadable => itemDownloadable == item.name),
                  subitems: item.collections.map(subitem => {
                    return {
                      checked: false,
                      name: subitem.name,
                      payload: {
                        name: subitem.name,
                        program: item.name
                      },
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

<style>
[data-aeris-campaign-search-criteria-content] .loadingbar {
  padding: 3px;
}
</style>
