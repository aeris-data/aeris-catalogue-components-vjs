<template>
<div data-template="metadata-panel">
  <aeris-metadata-description :markdown="true" :lang="lang"></aeris-metadata-description>
  <aeris-metadata-contacts :lang="lang"></aeris-metadata-contacts>
  <aeris-metadata-spatial-extents :lang="lang"></aeris-metadata-spatial-extents>
  <aeris-metadata-temporal-extents :lang="lang"></aeris-metadata-temporal-extents>
  <aeris-metadata-information-links :lang="lang"></aeris-metadata-information-links>
  <aeris-metadata-data-access :lang="lang"></aeris-metadata-data-access>
  <aeris-metadata-information :lang="lang"></aeris-metadata-information>
  <aeris-metadata-datapolicy :lang="lang"></aeris-metadata-datapolicy>
  <aeris-metadata-data-links :lang="lang"></aeris-metadata-data-links>
  <aeris-metadata-platforms :lang="lang"></aeris-metadata-platforms>
  <aeris-metadata-formats :lang="lang"></aeris-metadata-formats>
  <aeris-metadata-parameters :lang="lang"></aeris-metadata-parameters>
  <aeris-metadata-publications :lang="lang"></aeris-metadata-publications>
  <aeris-metadata-quicklook-gallery :lang="lang"></aeris-metadata-quicklook-gallery>
</div>
</template>

<script>
export default {

  name: 'md-template-collection',

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
