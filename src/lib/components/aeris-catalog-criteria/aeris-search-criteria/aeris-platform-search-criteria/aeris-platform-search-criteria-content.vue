<i18n>
{
	  "en": {
		  "AIRCRAFT": "Aircraft",
		  "ATMOSPHERICSIMULATIONCHAMBER": "Atmospheric simulation chamber",
		  "BALLOON": "Balloon",
		  "EOS": "Earth Observation Satellite",
		  "GEO": "Geostationnary earth orbit",
		  "INSITULANDPLATFORM": "In Situ Land-based Platform",
		  "LEO": "Low earth orbit",
		  "METEOROLOGICALPROPERTIES": "Meteorological properties",
		  "OTHER_AIRCRAFT": "Other aircraft",
		  "PLATFORM": "Platform",
		  "SPACESTATION": "Space Station",
		  "UNKNOWN": "Unknown"
	  },
	  "fr": {
		  "AIRCRAFT": "Aeronef",
		  "ATMOSPHERICSIMULATIONCHAMBER": "Chambre de simulation atmosphérique",
		  "BALLOON": "Ballons",
		  "EOS": "Satellite d Observation de la Terre",
		  "GEO": "Orbite terrestre geostationnaire",
		  "INSITULANDPLATFORM": "Laboratoire in situ terrestre",
		  "LEO": "Orbite terrestre basse",
		  "OTHER_AIRCRAFT": "Autre aeronef",
		  "PLATFORM": "Platforme",
		  "SPACESTATION": "Station spatiale",
		  "UNKNOWN": "Inconnu"
	  }
}
</i18n>

<template>
<div data-aeris-platform-search-criteria-content>
  <aeris-tree-checkbox-layout type="plateforms" name="Platform" name-subitems="platforms"></aeris-tree-checkbox-layout>
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
                label: this.$i18n.te(item.name) ? this.$i18n.t(item.name) : item.name,
                subitems: item.platforms.map(subitem => {
                  return {
                    checked: false,
                    name: subitem.name,
                    payload: subitem.name,
                    label: this.$i18n.te(subitem.name) ? this.$i18n.t(subitem.name) : subitem.name
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
