<template>
<div data-template="metadata-panel">
  <aeris-metadata-description></aeris-metadata-description>
  <aeris-metadata-contacts></aeris-metadata-contacts>
  <aeris-metadata-spatial-extents></aeris-metadata-spatial-extents>
  <aeris-metadata-temporal-extents></aeris-metadata-temporal-extents>
  <aeris-metadata-year-select-download></aeris-metadata-year-select-download>
  <aeris-metadata-information-links></aeris-metadata-information-links>
  <aeris-metadata-data-access></aeris-metadata-data-access>
  <aeris-metadata-information></aeris-metadata-information>
  <aeris-metadata-datapolicy></aeris-metadata-datapolicy>
  <aeris-metadata-data-links></aeris-metadata-data-links>
  <aeris-metadata-platforms></aeris-metadata-platforms>
  <aeris-metadata-formats></aeris-metadata-formats>
  <aeris-metadata-parameters></aeris-metadata-parameters>
  <aeris-metadata-publications></aeris-metadata-publications>
  <aeris-metadata-quicklooks-gallery></aeris-metadata-quicklooks-gallery>
</div>
</template>

<script>
export default {

  name: 'md-template-year-select-download',

  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },

  destroyed: function() {},

  created: function() {},

  mounted: function() {},

  computed: {},

  data() {
    return {}
  },

  updated: function() {},

  methods: {}
}
</script>
