<i18n>
{
  "en": {
    "parameters": "Parameters"
  },
  "fr": {
    "parameters": "Paramètres"
  }
}
</i18n>

<template>
  <div data-aeris-parameter-search-criteria>
    <aeris-catalog-search-box
      id="box"
      :title="$t('parameters')"
      :deployed="deployed"
      header-icon-class="fa fa-thermometer-half"
    >
      <aeris-thesaurus-item-tree-checkbox-layout
        type="parameters"
        name="Parameter"
        name-subitems="parameters"
      ></aeris-thesaurus-item-tree-checkbox-layout>
    </aeris-catalog-search-box>
  </div>
</template>

<script>
export default {
  name: "aeris-parameter-search-criteria",

  props: {
    lang: {
      type: String,
      default: "en"
    },
    deployed: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value;
    }
  },

  destroyed: function() {},

  created: function() {
    this.$i18n.locale = this.lang;
  },

  mounted: function() {},

  computed: {},

  data() {
    return {};
  },

  updated: function() {},

  methods: {}
};
</script>

<style></style>
