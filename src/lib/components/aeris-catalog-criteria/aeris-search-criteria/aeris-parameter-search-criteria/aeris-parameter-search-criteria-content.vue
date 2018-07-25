<i18n>
{
}
</i18n>
<template>
	<div data-aeris-parameter-search-criteria-content>
		<aeris-thesaurus-item-tree-checkbox-layout type="parameters" name="Parameter" name-subitems="parameters"></aeris-thesaurus-item-tree-checkbox-layout>
	</div>
</template>

<script>
export default {

  name: 'aeris-parameter-search-criteria-content',

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
    document.removeEventListener('aerisParameterDownloadResponse', this.handleParameterResponseListener);
    this.handleParameterDowloadListener = null;
  },

  created: function() {

  },

  mounted: function() {
    console.log('Aeris parameter search criteria content - created');
    this.$i18n.locale = this.lang;

    this.handleParameterResponseListener = this.handleParameterResponse.bind(this);
    document.addEventListener('aerisParameterDownloadResponse', this.handleParameterResponseListener);
  },

  data() {
    return {
      handleParameterResponseListener: null,
      parameters : []
    }
  },

  methods: {

    handleParameterResponse: function(e) {
      let itemsArray = e.detail.items.map(item => {
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
                                  }).sort(function(a, b){
                                          return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
                                  })
                            }
	                  }).sort(function(a, b){
                           return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
                    })
                  }
        }).sort(function(a, b){
           return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
        });

        this.parameters = itemsArray;

        document.dispatchEvent(new CustomEvent('aerisParameterItemsEvent', {detail: {items: this.parameters}}));
    }
  } // methods
} // export default
</script>
