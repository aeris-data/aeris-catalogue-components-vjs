<i18n>
{
  "en": {
    "close": "Close",
    "json": "Show JSON",
    "save": "Save"
  },
  "fr": {
    "close": "Fermer",
    "json": "Montrer le JSON",
    "save": "Sauver"
  }
}
</i18n>
<template>
<span class="aeris-catalog-metadata-panel-host">
<aside id="metadataPanel" class="metadata-panel"  :class="{expanded: visible}">
<nav class="metadata-panel-header">
  <span class="metadata-panel-title">
  <span  :class="iconClass"   v-show="iconClass"></span>
    <h2 class="metadata-panel-title">
    <aeris-international-field :lang="lang" :value="resourcetitle"></aeris-international-field>
    </h2>
  </span>
  <i class="fa fa-times" @click="broadcastCloseEvent" :title="$t('close')"></i>
</nav>
<div id="metadataPanelContent" class="metadata-panel-content" :class="{expanded: visible}">
<aeris-metadata :identifier="uuid" lang="fr" :service="idservice">
</aeris-metadata>
<md-template-proxy :type="type" :edit="edit"></md-template-proxy>
</div>
<footer class="metadata-panel-footer">
<i class="fa fa-times metadata-footer-icon" @click="broadcastCloseEvent" :title="$t('close')"></i>
<i class="fa fa-code metadata-footer-icon" @click="showJson" :title="$t('json')" v-show="!edit"></i>
<i class="fa fa-floppy-o metadata-footer-icon" :title="$t('save')" v-show="edit"></i>
<slot></slot>
</footer>
</aside>
</span>
</template>
<script>

export default {
	props: {
	  	lang:  {
	      type: String,
	      default: 'en'
	    },
	    visible: {
	    	type: Boolean,
	     	 default: false
	    },
	    edit: {
	    	type: Boolean,
	     	 default: false
	    },
	    resourcetitle: {
	    	type: String,
	     	 default: ""
	    },
	    iconClass: {
	    	type: String,
	     	 default: ""
	    },
	    uuid: {
	    	type: String,
	    	default: ""
	    },
	    
	    metadataService: {
	    	type: String,
	    	default:""
	    },
	    
	    type: {
	    	type: String,
	    	default:""
	    }
	    
	},
  
	 watch: {
		 lang (value) {
		      this.$i18n.locale = value
	    }
		  },
  
  created: function () {
  },

  mounted: function() {
	  	if (this.lang) {
	  		this.$i18n.locale = this.lang
	  	}
  },
 
  computed: {
	  idservice: function() {
		  var result = this.metadataService;
		  if (this.metadataService.endsWith("/")) {
			  result = result+"id"
		  } else {
			  result = result+"/id"
		  }
		  return result;
	  }
  },

   data () {
    return {
    }
  },
  
  updated: function() {
  },
  
  methods: {
	  
	  showJson: function() {
		  var baseUrl = 'http://www.jsoneditoronline.org/?url=';
	        var url = baseUrl + this.metadataService+"id/"+this.uuid;
	        window.open(url,'_blank','toolbar=no, status=no, scrollbars=no, menubar=no, width=1000, height=800');  
	  },
	  
	  broadcastCloseEvent: function() {
		  console.log("aerisCatalogueHideMetadata event")
		  var event = new CustomEvent('aerisCatalogueHideMetadata', { detail: {}});
	  		document.dispatchEvent(event);		  
	  }
	  
	
  }
}


</script>
<style>
.aeris-catalog-metadata-panel-host .metadata-panel {
	/*box-sizing: border-box;*/
	/*position: relative;*/
	z-index: 100;
	top: 5vh;
    right: 0px;
	/*right: 320px;*/
	width: 800px;
/*min-width: 33vw;
	max-width: 80vw;
	height: calc(90vh - 130px);*/
	background-color: #fafafa;
	overflow: hidden;
	cursor: default;
	box-shadow: 0 5px 20px rgba(0, 0, 0, 0.6);
	transform: translate3d(100%, 0, 0);
	opacity: 0.0;
	transition: opacity 0.4s, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1), width 0.3s ease-in-out 0.3s, height 0.3s ease-in-out 0.3s;
}

.aeris-catalog-metadata-panel-host .metadata-panel.expanded,
.aeris-catalog-metadata-panel-host .metadata-panel-content.expanded {
	transform: translate3d(0, 0, 0);
	opacity: 1;
}

.aeris-catalog-metadata-panel-host .metadata-panel.fullscreen {
	z-index: 12;
	width: 100vw;
	max-width: 100vw;
	height: 100%;
	transform: translate3d(320px, -5vh, 0);
}

.aeris-catalog-metadata-panel-host .metadata-panel-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px 0 10px;
	z-index: 2;
	border-bottom: 1px solid #ddd;
}

.aeris-catalog-metadata-panel-host .metadata-panel-header i {
	cursor: pointer;
	color: #888;
	opacity: 0.5;
}

.aeris-catalog-metadata-panel-host .metadata-panel-header i:hover {
	opacity: 1;
}

.aeris-catalog-metadata-panel-host .metadata-panel-header .metadata-panel-title {
	display: flex;
	align-items: center;
    color: #000
}

.aeris-catalog-metadata-panel-host .metadata-panel-header .metadata-panel-title h2 {
	display: inline;
	margin: 0 10px;
	padding: 5px 0;
}

.aeris-catalog-metadata-panel-host .metadata-panel-content {
	max-height: calc(100% - 90px);
	padding: 10px 10px 60px 10px;
	overflow-y: auto;
	overflow-x: hidden;
	opacity: 0;
	transform: translate3d(100%, 0, 0);
	transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1) 0s;
}

.aeris-catalog-metadata-panel-host .metadata-panel-footer {
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

.aeris-catalog-metadata-panel-host h2.metadata-panel-title {
	font-weight: normal
}

.aeris-catalog-metadata-panel-host .metadata-panel-footer .metadata-footer-icon {
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

.aeris-catalog-metadata-panel-host .metadata-panel-footer .metadata-footer-icon:hover {
	animation-name: pop;
	animation-duration: 0.3s;
}

</style>