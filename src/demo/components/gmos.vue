<template>
<div>
  <aeris-catalog metadata-service="https://sedoo.aeris-data.fr/catalogue/rest/metadatarecette/" program="GMOS" cart-service="https://sedoo.aeris-data.fr/catalogue/rest/shoppingcart" cart-token="gmos" hidemap="true" criteria-header-icon-color="grey" criteria-background-color="#F5F5F5"
    criteria-content-primary-color="grey">
    <div slot="criteria">
      <aeris-platform-search-criteria deployed="true"></aeris-platform-search-criteria>
      <aeris-level-search-criteria></aeris-level-search-criteria>
    </div>
    <div slot="buttons-commons">
      <aeris-catalogue-help-button></aeris-catalogue-help-button>
      <aeris-catalogue-maximize-button></aeris-catalogue-maximize-button>
    </div>
    <div slot="buttons-criteria">
      <aeris-catalogue-search-button></aeris-catalogue-search-button>
      <aeris-catalogue-reset-button></aeris-catalogue-reset-button>
    </div>
    <div slot="help">
      <aeris-catalog-help-content helpcookie="help-popup"></aeris-catalog-help-content>
    </div>
  </aeris-catalog>
</div>
</template>

<script>
export default {

  created() {
    [
      'aeris-data/gmos-metadata-components-vjs@latest'
    ].forEach(component => {
      let script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('component', component);
      script.setAttribute('src', 'https://rawgit.com/aeris-data/aeris-component-loader/master/aerisComponentLoader.js');
      document.head.appendChild(script);
    });

    // let script = document.createElement('script');
    // script.setAttribute('type', 'text/javascript');
    // script.setAttribute('src', 'http://localhost:8085/dist/build.js');
    // document.head.appendChild(script);
  }
}
</script>
