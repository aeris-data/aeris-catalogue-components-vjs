<template>
<div>
  <aeris-catalog metadata-service="https://sedoo.aeris-data.fr/datacenter-rest/rest/metadatatest/" program="EUROCHAMP.Chamber measurements" cart-service="https://sedoo.aeris-data.fr/catalogue/rest/shoppingcart" download-service="https://sedoo.aeris-data.fr/datacenter-rest/rest/data"
    cart-token="chamber" orcid-service="https://sedoo.aeris-data.fr/datacenter-rest/rest/admin/" hidemap="true">
    <div slot="criteria">
      <compound-search-criteria deployed="true"></compound-search-criteria>
      <experiment-type-search-criteria></experiment-type-search-criteria>
      <reactive-species-search-criteria></reactive-species-search-criteria>
      <nox-level-search-criteria></nox-level-search-criteria>
      <light-source-search-criteria></light-source-search-criteria>
      <temperature-search-criteria></temperature-search-criteria>
      <wall-type-search-criteria></wall-type-search-criteria>
      <chamber-institute-search-criteria></chamber-institute-search-criteria>
      <admin-search-criteria></admin-search-criteria>
      <request-type-search-criteria requesttype="chamber"></request-type-search-criteria>
    </div>
    <div slot="buttons-commons">
      <aeris-catalogue-help-button></aeris-catalogue-help-button>
      <aeris-catalogue-maximize-button></aeris-catalogue-maximize-button>
    </div>

    <!-- <aeris-catalogue-help-button></aeris-catalogue-help-button>
      <aeris-catalogue-maximize-button></aeris-catalogue-maximize-button> -->
    <div slot="buttons-criteria">
      <aeris-catalogue-search-button></aeris-catalogue-search-button>
      <aeris-catalogue-reset-button></aeris-catalogue-reset-button>
    </div>

    <metadata-edit-button slot="buttons-metadata"></metadata-edit-button>
    <metadata-delete-button slot="buttons-metadata"></metadata-delete-button>
    <div slot="buttons-no-metadata">
      <metadata-create-button type="CHAMBER_MEASUREMENT_METADATA"></metadata-create-button>
    </div>
  </aeris-catalog>

  <div slot="help">
    <aeris-catalog-help-content helpcookie="help-popup"></aeris-catalog-help-content>
  </div>
</div>
</template>

<script>
export default {

  created() {
    // [
    //   // 'aeris-data/eurochamp-metadata-edit-component-vjs@latest',
    //   // 'aeris-data/eurochamp-metadata-component-vjs@latest',
    //   'aeris-data/eurochamp-catalogue-components-vjs@latest'
    // ].forEach(component => {
    //   let script = document.createElement('script');
    //   script.setAttribute('type', 'text/javascript');
    //   script.setAttribute('component', component);
    //   script.setAttribute('src', 'https://rawgit.com/aeris-data/aeris-component-loader/master/aerisComponentLoader.js');
    //   document.head.appendChild(script);
    // });
    let script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', 'http://localhost:8080/bundle.js');
    document.head.appendChild(script);
    let script2 = document.createElement('script');
    script2.setAttribute('type', 'text/javascript');
    script2.setAttribute('src', 'http://localhost:8081/bundle.js');
    // script.setAttribute('src', 'http://localhost:8085/bundle.js');
    document.head.appendChild(script2);
    let script3 = document.createElement('script');
    script3.setAttribute('type', 'text/javascript');
    script3.setAttribute('src', 'http://localhost:8082/bundle.js');
    document.head.appendChild(script3);

  }
}
</script>
