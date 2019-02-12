<i18n>
{
  "en": {
    "projects": "Projects"
  },
  "fr": {
    "projects": "Projets"
  }
}
</i18n>

<template>
  <div data-aeris-project-search-criteria>
    <aeris-catalog-search-box id="box" :title="$t('projects')" :deployed="deployed" header-icon-class="fa fa-file">
      <aeris-thesaurus-item-tree-checkbox-layout
        type="projects"
        name="Project"
        name-subitems="projects"
      ></aeris-thesaurus-item-tree-checkbox-layout>
    </aeris-catalog-search-box>
  </div>
</template>

<script>
export default {
  name: "aeris-project-search-criteria",

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
