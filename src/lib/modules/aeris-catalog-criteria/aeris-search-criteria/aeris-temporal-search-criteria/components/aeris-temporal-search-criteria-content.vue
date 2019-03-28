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
      language="en"
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
      language="en"
      format="DD/MM/YYYY HH:mm"
      @date="setToDate"
    ></aeris-datepicker>
  </div>
</template>

<script>
import { AerisDatepicker } from "aeris-commons-components-vjs";
export default {
  name: "aeris-temporal-search-criteria-content",
  components: { AerisDatepicker },
  props: {
    language: {
      type: String,
      default: "en"
    }
  },

  data() {
    return {
      fromDate: "",
      toDate: ""
    };
  },

  watch: {
    language(value) {
      this.$i18n.locale = value;
    }
  },

  methods: {
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

/* [data-aeris-temporal-search-criteria-content] .right {
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
} */
</style>
