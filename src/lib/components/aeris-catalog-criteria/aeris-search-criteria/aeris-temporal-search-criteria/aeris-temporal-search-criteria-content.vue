<i18n>
{
  "en": {
	  "from": "from",
	  "to": "to"
  },
  "fr": {
	  "from": "de",
	  "to": "à"
  }
}
</i18n>

<template>
<div data-aeris-temporal-search-criteria-content>
  <div class="aeris-input-group">
    <span class="right">{{$t('from')}}</span>
    <input id="from" v-model="from">
  </div>
  <aeris-datepicker for="input#from" format="DD/MM/YYYY HH:mm"></aeris-datepicker>
  
  <div class="aeris-input-group">
    <span class="right">{{$t('to')}}</span>
    <input id="to" v-model="to">
  </div>
  <aeris-datepicker for="input#to" format="DD/MM/YYYY HH:mm"></aeris-datepicker>
  <span class="error-message" v-if="errorMessage">{{errorMessage}}</span>

</div>
</template>

<script>
export default {

  name: 'aeris-temporal-search-criteria-content',

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
    document.removeEventListener('aerisCatalogueResetEvent', this.catalogueResetListener);
    this.catalogueResetListener = null;
    document.removeEventListener('aerisCatalogueSearchEvent', this.aerisCatalogueSearchEventListener);
    this.aerisCatalogueSearchEventListener = null;
  },

  created: function() {
	console.log('aeristemporal search criteria - created');
    this.$i18n.locale = this.lang
    this.catalogueResetListener = this.handleCatalogueReset.bind(this)
    document.addEventListener('aerisCatalogueResetEvent', this.catalogueResetListener);
    this.aerisCatalogueSearchEventListener = this.handleSearch.bind(this)
    document.addEventListener('aerisCatalogueSearchEvent', this.aerisCatalogueSearchEventListener);
  },

  mounted: function() {
  },

  computed: {

  },

  data() {
    return {
      aerisCatalogueSearchEventListener: null,
      catalogueResetListener: null,
      from: null,
      to: null,
      errorMessage: null,
      dateFormat: "DD/MM/YYYY HH:mm:ss"
    }
  },

  updated: function() {},

  methods: {
    handleCatalogueReset: function() {
      this.from = ""
      this.to = ""

    },

    handleSearch: function(e) {
   
      this.from = document.querySelector("#from").value;
      this.to = document.querySelector("#to").value;
      //console.log('date avant format: ' + this.from);
      
      var temporal = {};
      var from = moment(this.from, this.dateFormat);
      var to = moment(this.to, this.dateFormat);

      //console.log('date apres format: ' + from);
   
      temporal.from = from.isValid() ? from.format('YYYY-MM-DDTHH:mm:ss') : '';
      temporal.to = from.isValid() ? to.format('YYYY-MM-DDTHH:mm:ss') : '';

      e.detail.temporal = temporal;
    }
  }  
}
</script>

<style>
[data-aeris-temporal-search-criteria-content] {
  display: block
}

[data-aeris-temporal-search-criteria-content] .right {
  min-width: 40px;
  border-right: 1px solid #fff;
  box-sizing: border-box;
  display: block;
  height: 100%;
  text-align: center;
}

[data-aeris-temporal-search-criteria-content] .error-message {
  font-size: 12px;
  color: red
}

[data-aeris-temporal-search-criteria-content] .aeris-input-group {
  border: none;
  background-color: rgba(172, 220, 238, 0.3);
}

[data-aeris-temporal-search-criteria-content] .aeris-input-group input {
  border: none;
  background-color: transparent;
  padding: 0 5px;
  outline: none;
}

[data-aeris-temporal-search-criteria-content] .aeris-input-group aeris-datepicker {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 999;
}

[data-aeris-temporal-search-criteria-content] .aeris-input-group aeris-datepicker2 {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 999;
}

[data-aeris-temporal-search-criteria-content] .aeris-input-group {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 5px 0;
  width: 100%;
  height: 25px;
  line-height: 25px;
  overflow: hidden;
}
</style>
