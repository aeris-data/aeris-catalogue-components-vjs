<template>
<div data-md-template-collection>
  <div class="metadata-container">
    <div class="column">
      <aeris-metadata-description></aeris-metadata-description>
      <aeris-metadata-contacts></aeris-metadata-contacts>
      <aeris-metadata-spatial-extents></aeris-metadata-spatial-extents>
      <aeris-metadata-temporal-extents></aeris-metadata-temporal-extents>
      <aeris-metadata-information-links></aeris-metadata-information-links>
      <aeris-metadata-data-access></aeris-metadata-data-access>
      <aeris-metadata-information></aeris-metadata-information>
    </div>
    <div class="column">
      <aeris-metadata-datapolicy></aeris-metadata-datapolicy>
      <aeris-metadata-data-links></aeris-metadata-data-links>
      <aeris-metadata-platforms></aeris-metadata-platforms>
      <aeris-metadata-formats></aeris-metadata-formats>
      <aeris-metadata-parameters></aeris-metadata-parameters>
      <aeris-metadata-publications></aeris-metadata-publications>
      <aeris-metadata-quicklooks-gallery></aeris-metadata-quicklooks-gallery>
    </div>
  </div>
</div>
</template>

<script>
export default {
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

<style>

[data-md-template-collection] {
	display: block;
	font-size: 14px;
	height: 70vh;
	overflow: scroll;
}

[data-md-template-collection] * {
	box-sizing: border-box;
}

[data-md-template-collection] .column .component-container {
	margin-bottom: 10px;

}

[data-md-template-collection] .column~.column {
	margin-left: 10px;
}

[data-md-template-collection] .column:first {
	margin-right:10px;
}

[data-md-template-collection] * {
	box-sizing: border-box;
}

[data-md-template-collection] .metadata-container {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-around;
}

[data-md-template-collection] .metadata-container .column {
	width: 50%;
}

 </style>
