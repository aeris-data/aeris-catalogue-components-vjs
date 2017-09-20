<template>
<span class="aeris-catalog-bar-host">
<div class="criteria-bar">
<div class="criteria-content">
  <slot></slot>
</div>
</div>

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
	     	 default: true
	    },
	},
  
  watch: {
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
<style>
.aeris-catalog-bar-host {
    box-sizing: border-box;
    display: block;
    width: 300px;
    height: 100%;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.3);
    
}

.aeris-catalog-bar-host .criteria-bar {
}

.criteria-content {
    width: 100%;
    height: 100%;
    overflow: auto
}
</style>
</style>