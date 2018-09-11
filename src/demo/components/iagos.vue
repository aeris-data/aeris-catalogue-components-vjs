<template>
<div>
  <aeris-catalog metadata-service="https://sedoo.aeris-data.fr/catalogue/rest/metadatarecette/" cart-service="https://sedoo.aeris-data.fr/catalogue/rest/shoppingcart" program="IAGOS" cart-token="iagos">
    <div slot="criteria">
      <aeris-keyword-search-criteria></aeris-keyword-search-criteria>
      <aeris-temporal-search-criteria></aeris-temporal-search-criteria>
      <aeris-platform-search-criteria></aeris-platform-search-criteria>
      <aeris-instrument-search-criteria></aeris-instrument-search-criteria>
      <aeris-parameter-search-criteria></aeris-parameter-search-criteria>
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
