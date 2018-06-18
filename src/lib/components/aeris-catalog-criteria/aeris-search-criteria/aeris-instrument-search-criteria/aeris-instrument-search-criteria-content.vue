<i18n>
{
}
</i18n>
<template>
	<div data-aeris-instrument-search-criteria-content>
		<aeris-instrument-tree-checkbox-layout type="instruments" name="Instrument" name-subitems="instruments"></aeris-instrument-tree-checkbox-layout>
	</div>
</template>

<script>
export default {

  name: 'aeris-instrument-search-criteria-content',

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
    document.removeEventListener('aerisInstrumentDownloadResponse', this.handleInstrumentResponseListener);
    this.handleInstrumentDowloadListener = null;
  },

  created: function() {

  },

  mounted: function() {
    console.log('Aeris instrument search criteria content - created');
    this.$i18n.locale = this.lang;

    this.handleInstrumentResponseListener = this.handleInstrumentResponse.bind(this);
    document.addEventListener('aerisInstrumentDownloadResponse', this.handleInstrumentResponseListener);
  },

  data() {
    return {
      handleInstrumentResponseListener: null,
      instruments : []
    }
  },

  updated: function() {},

  methods: {
	  

	    handleInstrumentResponse: function(e) {
	    	var itemsArray = e.detail.items
	    		.map(item => {
	              return {
	                  checked: false,
	                  deployed: false,
	                  name: item.name,
	                  label: (this.lang == "fr") ? item.translation.fr : item.translation.en,
	                  search: item.searchConcat,
	                  instruments: item.instruments.map(subitem => {
	                    return {
	                      checked: false,
		                  deployed: false,
	                      name: subitem.name,
	                      label: (this.lang == "fr") ? subitem.translation.fr : subitem.translation.en,
	                      search: subitem.searchConcat,
	                      instruments: subitem.instruments.map(subsubitem => {
    		                    return {
    		                      checked: false,
    			                  deployed: false,
    		                      name: subsubitem.name,
    		                      label: (this.lang == "fr") ? subsubitem.translation.fr : subsubitem.translation.en,
    		                      search: subsubitem.searchConcat
    		                    }
    		                  })
	                    }
	                  })
	                }
	              });
	    	
            this.instruments = itemsArray;            
            
            document.dispatchEvent(new CustomEvent('aerisInstrumentItemsEvent', {    	  
              detail: {
                items: this.instruments
              }
            }));
	        	
    }
  } // methods
} // export default
</script>
