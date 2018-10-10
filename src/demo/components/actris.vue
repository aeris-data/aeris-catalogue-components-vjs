<template>
<div>
  <aeris-catalog metadata-service="http://localhost:9080/catalogue/rest/metadatarecette/" cart-service="https://sedoo.aeris-data.fr/catalogue/rest/shoppingcart" program="ACTRIS-FR" cart-token="actris">
    <div slot="criteria">
      <actris-collection-search-criteria></actris-collection-search-criteria>
      <actris-site-search-criteria></actris-site-search-criteria>
      <aeris-keyword-search-criteria></aeris-keyword-search-criteria>
      <aeris-temporal-search-criteria></aeris-temporal-search-criteria>
      <aeris-platform-search-criteria></aeris-platform-search-criteria>
      <aeris-level-search-criteria></aeris-level-search-criteria>

    </div>
    <div slot="buttons-criteria">
      <aeris-catalogue-help-button></aeris-catalogue-help-button>
      <aeris-catalogue-maximize-button></aeris-catalogue-maximize-button>
      <aeris-catalogue-reset-button></aeris-catalogue-reset-button>
      <aeris-catalogue-search-button></aeris-catalogue-search-button>
    </div>
  </aeris-catalog>
  <aeris-catalog-help-content helpcookie="aeris-help-popup"></aeris-catalog-help-content>
</div>
</template>

<script>
export default {

  created() {
    [
      'aeris-data/actris-catalogue-components-vjs@latest',
      'aeris-data/actris-metadata-components-vjs@latest'
    ].forEach(component => {
      let script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('component', component);
      script.setAttribute('src', 'https://rawgit.com/aeris-data/aeris-component-loader/master/aerisComponentLoader.js');
      document.head.appendChild(script);
    });
  }
}
</script>
