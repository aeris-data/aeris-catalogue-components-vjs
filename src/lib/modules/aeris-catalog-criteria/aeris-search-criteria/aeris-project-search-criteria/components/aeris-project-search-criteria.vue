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
    <aeris-catalog-search-box
      :title="$t('projects')"
      :deployed="deployed"
      :theme="theme"
      header-icon-class="fa fa-file"
    >
      <aeris-thesaurus-item-tree-checkbox-layout
        :theme="theme"
        :service="service"
        :language="language"
        type="projects"
      ></aeris-thesaurus-item-tree-checkbox-layout>
    </aeris-catalog-search-box>
  </div>
</template>

<script>
import { AerisCatalogSearchBox, AerisThesaurusItemTreeCheckboxLayout } from "../../../../aeris-catalogue-components";

export default {
  name: "aeris-project-search-criteria",

  components: { AerisThesaurusItemTreeCheckboxLayout, AerisCatalogSearchBox },

  props: {
    language: {
      type: String,
      default: "en"
    },
    deployed: {
      type: Boolean,
      default: false
    },
    theme: {
      type: Object,
      default: () => {}
    },
    service: {
      type: String,
      default: "https://sedoo.aeris-data.fr/catalogue/rest/metadatarecette/projects/"
    }
  },

  watch: {
    language(value) {
      this.$i18n.locale = value;
    }
  },

  created() {
    this.$i18n.locale = this.language;
  }
};
</script>
