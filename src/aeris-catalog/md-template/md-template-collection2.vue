<template>
<span class="md-template-collection-host2">
<div class="metadata-container">
<div class="column">
<aeris-metadata-contacts></aeris-metadata-contacts>
<aeris-metadata-temporal-extents></aeris-metadata-temporal-extents>
  <aeris-metadata-description></aeris-metadata-description>
  <aeris-metadata-information-links></aeris-metadata-information-links>
  <aeris-metadata-data-access></aeris-metadata-data-access>
  <aeris-metadata-informations></aeris-metadata-informations>
</div>
<div class="column">
  <aeris-metadata-formats></aeris-metadata-formats>
  <aeris-metadata-plateforms></aeris-metadata-plateforms>
  <aeris-metadata-parameters></aeris-metadata-parameters>
  <aeris-metadata-publications></aeris-metadata-publications>
  <aeris-metadata-quicklooks-gallery></aeris-metadata-quicklooks-gallery>
</div>
</div>
</span>
</template>

<script>
export default {
	props: {
	  	lang:  {
	      type: String,
	      default: 'fr'
	    }
	},
  
  destroyed: function() {
  },
  
  created: function () {
  },

  mounted: function() {
  },
  
  computed: {
  },

   data () {
    return {
    }
  },
  
  updated: function() {
  },
  
  methods: {
  }
}
</script>

<style>

.md-template-collection-host2 {
	display: block;
	font-size: 14px;
    background-color:green;
}

.md-template-collection-host2 .column .component-container {
	margin-bottom: 10px;
   
}

.md-template-collection-host2 .column~.column {
	margin-left: 10px;
}

.md-template-collection-host2 .column:first {
	margin-right:10px;
}

.md-template-collection-host2 * {
	box-sizing: border-box;
}

.md-template-collection-host2 .metadata-container {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-around;
}

.md-template-collection-host2 .metadata-container .column {
	width: 50%;
}

 </style>