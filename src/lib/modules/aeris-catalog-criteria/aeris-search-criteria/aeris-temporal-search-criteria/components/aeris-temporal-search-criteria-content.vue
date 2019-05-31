<template>
  <div aeris-temporal-search-criteria-content>
    <aeris-datepicker
      ref="fromDatePicker"
      :theme="{ emphasis: '#f39c12' }"
      :label="{
        key: 'from',
        lang: {
          en: { from: 'From' },
          fr: { from: 'De' }
        }
      }"
      :language="language"
      format="DD/MM/YYYY HH:mm"
      @date="setFromDate"
    ></aeris-datepicker>

    <aeris-datepicker
      ref="toDatePicker"
      :theme="{ emphasis: '#f39c12' }"
      :label="{
        key: 'to',
        lang: {
          en: { to: 'To' },
          fr: { to: 'À' }
        }
      }"
      :language="language"
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

  watch: {
    language(value) {
      this.$i18n.locale = value;
    }
  },

  methods: {
    setFromDate(value) {
      this.$store.commit("setFromDate", new Date(value).toISOString());
    },
    setToDate(value) {
      this.$store.commit("setToDate", new Date(value).toISOString());
    },
    resetDate() {
      this.$store.commit("resetDate");
      this.$refs.toDatePicker.resetDate();
      this.$refs.fromDatePicker.resetDate();
    }
  }
};
</script>

<style scoped>
[aeris-temporal-search-criteria-content] {
  display: block;
}
</style>
