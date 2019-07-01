<template>
  <div data-app>
    <i class="fas fa-wrench" title="Click here to display full page menu" @click="toggleRoutes" />
    <nav v-if="isVisible" data-role="menu" @click.self="toggleRoutes">
      <ul>
        <li v-for="link in links" :key="link" @click="isVisible = false">
          <router-link :to="link">{{ link }}</router-link>
        </li>
      </ul>
    </nav>
    <div>
      <router-view class="view"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
      links: [
        "/actris",
        "/aeris",
        "/catalog-cart",
        "/catalogue_map",
        "/collection_criteria",
        "/default-summary",
        "/draw_map_button",
        "/eurochamp",
        "/gmos",
        "/help_button",
        "/help_content",
        "/iagos",
        "/instrument-search-criteria",
        "/international_field",
        "/keyword",
        "/level_criteria",
        "/maximize_button",
        "/metadata_panel",
        "/parameter-search-criteria",
        "/platform-search-criteria",
        "/project-search-criteria",
        "/reset_button",
        "/reset_text_button",
        "/search_box",
        "/search_button",
        "/search_text_button",
        "/select_map_button",
        "/site_criteria",
        "/spatial_criteria",
        "/summaries",
        "/temporal_search_criteria",
        "/thesaurus-item-checkbox-layout",
        "/thesaurus-item-tree-checkbox-layout",
        "/tree_checkbox_layout"
      ]
    };
  },
  methods: {
    toggleRoutes() {
      this.isVisible = !this.isVisible;
    }
  }
};
</script>

<style scoped>
.fas.fa-wrench {
  width: 60px;
  height: 60px;
  font-size: 30px;
  line-height: 60px;
  text-align: center;
  color: #009fde;
  background: #fff;
  border: 1px solid #009fde;
  border-radius: 50%;
  position: fixed;
  z-index: 2;
  bottom: 10px;
  left: 50%;
  cursor: pointer;
}

nav {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

ul {
  background-color: rgba(255, 255, 255, 0.9);
  width: 80%;
  margin: 0;
  padding: 20px;
  columns: 3;
  -webkit-columns: 3;
  -moz-columns: 3;
  list-style-type: none;
  border-radius: 3px;
}

li {
  margin-top: 5px;
  margin-bottom: 5px;
}

li a {
  text-decoration: none;
  color: #009fde;
}

li a:hover {
  color: #ade1e6;
}
</style>
