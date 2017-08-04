<template>
<span class="aeris-catalog-host">
<div class="app-container">
<aeris-notifier></aeris-notifier>
<aeris-catalog-bar :lang="lang">
<slot name="criteria"></slot>
</aeris-catalog-bar>
<aeris-catalog-map :hidemap="hidemap">
<slot name="buttons"></slot>
</aeris-catalog-map>
</div>

</span>
</template>

<script>
export default {
	props: {
	  	lang:  {
	      type: String,
	      default: 'fr'
	    },
	    visible: {
	    	type: Boolean,
	     	 default: true
	    },
	    hidemap: {
	    	type: Boolean,
	     	 default: false
	    },
	    
	    metadataService: {
	    	type: String,
	    	default: null
	    },
	    
	    program: {
	    	type: String,
	    	default:null
	    }
	    
	},
  
  watch: {
  },
  
  destroyed: function() {
	  document.removeEventListener('aerisCatalogueSearchStartEvent', this.aerisCatalogueSearchStartEventListener);
	  this.aerisCatalogueSearchStartEventListener = null;
  },
  
  created: function () {
	  this.aerisCatalogueSearchStartEventListener = this.handleCatalogueSearchStart.bind(this) 
	  document.addEventListener('aerisCatalogueSearchStartEvent', this.aerisCatalogueSearchStartEventListener);
  },

  mounted: function() {
  },
  
  computed: {
  },

   data () {
    return {
    	aerisCatalogueSearchStartEventListener: null
    }
  },
  
  updated: function() {
  },
  
  methods: {
	  
	  handleCatalogueSearchStart : function() {
		  var e = new CustomEvent("aerisCatalogueSearchEvent", { detail: {}})
		  document.dispatchEvent(e);
		  console.log(e)
		  console.log("Connecting with metadata server")
		  
//		  if (this.service) {
//			  var url = this.service
//			  if (!(url.endsWith("/"))
//			  +"request"
//			  
//          this.$.map.classList.remove('reduced');
//          this._updateMapSize();
//          this._lock = true;
//          this.$.ajax.url = this.service;
//          this.$.ajax.method = 'POST';
//          this.$.ajax.body = JSON.stringify(e.detail);
//          this.fire('longActionStartEvent', {
//            message: this._localize('loading', this.lang) + '...'
//          });
//          this.$.ajax.generateRequest();
		  
		  
	  },
	  
  }
}
</script>

<style>

.aeris-catalog-host {
	/*box-sizing: border-box;*/
	position: relative;
	display: block;
	width: 100%;
	height: 100vh;
	margin: 0;
	font-family: 'Open Sans', sans-serif;
	line-height: 1.2;
	overflow: hidden;
}

.aeris-catalog-host * {
	/*box-sizing: border-box;*/
}

@keyframes pop {
	0% {
		transform: scale(1);
	}

	70% {
		transform: scale(1.2);
	}

	100% {
		transform: scale(1);
	}
}

.aeris-catalog-host aeris-catalog-bar,
.aeris-catalog-host aeris-catalog-map,
.aeris-catalog-host aeris-collection-bar {
	position: absolute;
	z-index: 10;
}

.aeris-catalog-host aeris-catalog-bar,
.aeris-catalog-host aeris-catalog-map,
.aeris-catalog-host aeris-collection-bar {
	top: 0;
	height: 100vh;
}

.aeris-catalog-host aeris-catalog-bar {
	left: 0;
	box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
}

.aeris-catalog-host .search-criteria-content {
	position: relative;
	height: 100vh;
	padding-right: 10px;
	overflow: auto;
}

.aeris-catalog-host aeris-catalog-map {
	left: 300px;
	width: calc(100% - 300px);
}



.aeris-catalog-host .catalog-search-button:hover,
.aeris-catalog-host .catalog-reset-button:hover,
.aeris-catalog-host .catalog-more-button:hover,
.aeris-catalog-host .catalog-collapse-button:hover,
.aeris-catalog-host .catalog-fullscreen-button:hover,
.aeris-catalog-host .catalog-help-button:hover,
.aeris-catalog-host .catalog-draw-button:hover {
	cursor: pointer;
	background-color: var(--search-button-hover-color, #4765a0);
}

.aeris-catalog-host .catalog-search-button {
	top: 10px;
}

.aeris-catalog-host .catalog-search-button .mask {
	display: none;
	cursor: initial;
}

.aeris-catalog-host .catalog-search-button.disabled .mask {
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(120, 120, 120, 0.8);
	border-radius: 50%;
}

.aeris-catalog-host .catalog-reset-button {
	top: 70px;
}

.aeris-catalog-host .catalog-more-button {
	top: 150px;
}

.aeris-catalog-host .catalog-draw-button {
	top: 210px;
}

.aeris-catalog-host .more-button:hover .catalog-collapse-button,
.aeris-catalog-host .more-button:hover .catalog-fullscreen-button,
.aeris-catalog-host .more-button:hover .catalog-help-button {
	z-index: 12;
	transform: translateY(0);
	transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0s, z-index 0s ease 0.3s;
}

.aeris-catalog-host .catalog-collapse-button,
.aeris-catalog-host .catalog-fullscreen-button,
.aeris-catalog-host .catalog-help-button {
	z-index: 10;
	top: 160px;
	width: 25px;
	height: 25px;
	font-size: 12px;
	background-color: var(--search-button-color, #4765a0);
	transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.8s, background-color 0.3s;
}

.aeris-catalog-host .catalog-collapse-button:hover,
.aeris-catalog-host .catalog-fullscreen-button:hover,
.aeris-catalog-host .catalog-help-button:hover {
	background-color: var(--search-button-hover-color, #4765a0);
	transform: translateX(0);
}

.aeris-catalog-host .catalog-collapse-button {
	left: 75px;
	transform: translateX(-50px);
}

.aeris-catalog-host .catalog-collapse-button:hover {
	transform: translateX(0);
}

.aeris-catalog-host .catalog-collapse-button i {
	transition: transform 0.3s;
}

.aeris-catalog-host .catalog-collapse-button i.rotate {
	transform: rotate(180deg);
}

.aeris-catalog-host .catalog-help-button {
	left: 110px;
	transform: translateX(-85px);
}

.aeris-catalog-host .catalog-fullscreen-button {
	left: 145px;
	transform: translateX(-120px);
}

.aeris-catalog-host aeris-collection-bar {
	right: 0;
	box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
}

.aeris-catalog-host .cart-bar {
	position: absolute;
	top: 0;
	right: 0;
	z-index: 12;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 0 10px;
	height: 40px;
	width: 300px;
	transition: 0.3s;
}

.aeris-catalog-host .metadata-panel {
	box-sizing: border-box;
	position: absolute;
	z-index: 10;
	top: 5vh;
	right: 320px;
	width: 800px;
	min-width: 33vw;
	max-width: 80vw;
	height: calc(90vh - 130px);
	background-color: #fafafa;
	overflow: hidden;
	cursor: default;
	box-shadow: 0 5px 20px rgba(0, 0, 0, 0.6);
	transform: translate3d(calc(100% + 350px), 0, 0);
	transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1), width 0.3s ease-in-out 0.3s, height 0.3s ease-in-out 0.3s;
}

.aeris-catalog-host .metadata-panel.expanded,
.aeris-catalog-host .metadata-panel-content.expanded {
	transform: translate3d(0, 0, 0);
	opacity: 1;
}

.aeris-catalog-host .metadata-panel.fullscreen {
	z-index: 12;
	width: 100vw;
	max-width: 100vw;
	height: 100%;
	transform: translate3d(320px, -5vh, 0);
}

.aeris-catalog-host .metadata-panel-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px 0 10px;
	z-index: 2;
	border-bottom: 1px solid #ddd;
}

.aeris-catalog-host .metadata-panel-header i {
	cursor: pointer;
	color: #888;
	opacity: 0.5;
}

.aeris-catalog-host .metadata-panel-header i:hover {
	opacity: 1;
}

.aeris-catalog-host .metadata-panel-header .metadata-panel-title {
	display: flex;
	align-items: center;
}

.aeris-catalog-host .metadata-panel-header .metadata-panel-title h2 {
	display: inline;
	margin: 0 10px;
	padding: 5px 0;
}

.aeris-catalog-host .metadata-panel-content {
	max-height: calc(100% - 90px);
	padding: 10px 10px 60px 10px;
	overflow-y: auto;
	overflow-x: hidden;
	opacity: 0;
	transform: translate3d(100%, 0, 0);
	transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1) 0s;
}

.aeris-catalog-host .metadata-panel-footer {
	position: absolute;
	bottom: 0;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 50px;
	border-top: 1px solid #ddd;
	background-color: #fafafa;
}

.aeris-catalog-host .metadata-panel-footer .metadata-footer-icon {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 30px;
	height: 30px;
	margin: 0 5px;
	border: 1px solid;
	border-radius: 50%;
	color: #bbb;
	cursor: pointer;
	transform: scale(1);
}

.aeris-catalog-host .metadata-panel-footer .metadata-footer-icon:hover {
	animation-name: pop;
	animation-duration: 0.3s;
}

@media screen and (max-height: 800px) {
	.aeris-catalog-host aeris-catalog-bar,
  .aeris-catalog-host aeris-catalog-map,
  .aeris-catalog-host aeris-collection-bar {
		top: 0;
		height: 100vh;
	}

	.aeris-catalog-host .search-criteria-content {
		height: 100vh;
	}

	.aeris-catalog-host .metadata-panel {
		height: calc(90vh - 60px);
	}
}
 </style>