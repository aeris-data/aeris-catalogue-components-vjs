<i18n>
{
	  "en": {
	  },
	  "fr": {
	  }
}
</i18n>

<template>
<div data-aeris-platform-search-criteria-content>
  <aeris-thesaurus-item-tree-checkbox-layout type="platforms" name="Platform" name-subitems="platforms"></aeris-thesaurus-item-tree-checkbox-layout>
</div>
</template>

<script>
export default {

	name: 'aeris-platform-search-criteria-content',

  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value
    }
  },

  destroyed: function() {
    document.removeEventListener('aerisPlatformDownloadResponse', this.handlePlatformResponseListener);
    this.handlePlatformDowloadListener = null;
  },

  created: function() {

  },

  mounted: function() {
    console.log('Aeris platform search criteria content - created');
    this.$i18n.locale = this.lang;

    this.handlePlatformResponseListener = this.handlePlatformResponse.bind(this);
    document.addEventListener('aerisPlatformDownloadResponse', this.handlePlatformResponseListener);
  },

  data() {
    return {
      handlePlatformResponseListener: null
    }
  },

  updated: function() {},

  methods: {

    handlePlatformResponse: function(e) {
      document.dispatchEvent(new CustomEvent('aerisPlatformItemsEvent', {
        detail: {
          items: e.detail.items
            .filter(item => this.parsedExclusions ? !this.parsedExclusions.some(itemToExclude => item.name == itemToExclude) : true)
            .filter(item => this.parsedInclusions ? this.parsedInclusions.some(itemToInclude => item.name == itemToInclude) : true)
            .map(item => {
                  return {
                    checked: false,
                    deployed: false,
                    name: item.name,
                    label: (this.lang == "fr") ?  item.translation.fr ? item.translation.fr : item.translation.en : item.translation.en,
                    search: item.searchConcat,
                    thesaurusItems: item.thesaurusItems.map(subitem => {
                              return {
                                checked: false,
                                deployed: false,
                                name: subitem.name,
                                label: (this.lang == "fr") ?  subitem.translation.fr ? subitem.translation.fr : subitem.translation.en : subitem.translation.en,
                                search: subitem.searchConcat,
                                thesaurusItems: subitem.thesaurusItems.map(subsubitem => {
                                        return {
                                              checked: false,
                                              deployed: false,
                                              name: subsubitem.name,
                                              label: (this.lang == "fr") ? subsubitem.translation.fr ? subsubitem.translation.fr : subsubitem.translation.en : subsubitem.translation.en,
                                              search: subsubitem.searchConcat
                                              }
                                  })
                            }
	                  })
                  }
             })
        }
      }));
    }
  }
}
</script>
