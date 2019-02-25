<template>
  <div>
    <aeris-thesaurus-item-tree-checkbox-layout
      :theme="theme"
      :service="service"
      name="Projects"
      type="projects"
      language="en"
    ></aeris-thesaurus-item-tree-checkbox-layout>
  </div>
</template>

<script>
import { AerisThesaurusItemTreeCheckboxLayout } from "../../../../lib/modules/aeris-catalogue-components";
export default {
  name: "aeris-thesaurus-item-tree-checkbox-layout-test",
  components: { AerisThesaurusItemTreeCheckboxLayout },
  data() {
    return {
      theme: {
        primaryColor: "#0b6bb3",
        secondaryColor: "#fff"
      },
      selectedCriteria: [],
      service: "https://sedoo.aeris-data.fr/catalogue/rest/metadatarecette/projects/"
    };
  }
};
</script>
