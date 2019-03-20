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
    <aeris-datepicker
      :theme="{ emphasis: '#f39c12' }"
      :label="{
            key: 'from',
            lang: {
              en: { from: 'From' },
              fr: { from: 'De' }
            }
          }"
      language="fr"
      format="DD/MM/YYYY HH:mm"
      @date="setFromDate"
    ></aeris-datepicker>

    <aeris-datepicker
      :theme="{ emphasis: '#f39c12' }"
      :label="{
            key: 'to',
             lang: {
              en: { to: 'To' },
              fr: { to: 'À' }
            }
          }"
      language="fr"
      format="DD/MM/YYYY HH:mm"
      @date="setToDate"
    ></aeris-datepicker>
    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script>
import { AerisDatepicker } from "aeris-commons-components-vjs";
export default {
  name: "aeris-temporal-search-criteria-content",
  components: { AerisDatepicker },
  props: {
    lang: {
      type: String,
      default: "fr"
    }
  },

  data() {
    return {
      from: null,
      to: null,
      errorMessage: null,
      dateFormat: "DD/MM/YYYY HH:mm:ss",
      fromDate: "",
      toDate: ""
    };
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value;
    }
  },

  methods: {
    handleCatalogueReset() {
      this.from = "";
      this.to = "";
    },

    handleSearch(e) {
      this.from = document.querySelector("#from").value;
      this.to = document.querySelector("#to").value;

      let temporal = {};
      let from = moment(this.from, this.dateFormat);
      let to = moment(this.to, this.dateFormat);

      temporal.from = from.isValid() ? from.format("YYYY-MM-DDTHH:mm:ss") : "";
      temporal.to = from.isValid() ? to.format("YYYY-MM-DDTHH:mm:ss") : "";

      e.detail.temporal = temporal;
    },
        setFromDate(value) {
      this.fromDate = value;
    },
    setToDate(value) {
      this.toDate = value;
    }
  }
};
</script>

<style scoped>
[data-aeris-temporal-search-criteria-content] {
  display: block;
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
  color: red;
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
