<template>
<div>
  <aeris-catalog metadata-service="https://sedoo.aeris-data.fr/catalogue/rest/metadatarecette/" criteria-header-icon-color="grey" criteria-background-color="#F5F5F5" criteria-content-primary-color="grey" summary-bar-width="400px" summary-max-length="200"
    cart-service="https://sedoo.aeris-data.fr/catalogue/rest/shoppingcart" download-service="https://sedoo.aeris-data.fr/datacenter-rest/rest/data" cart-token="aeris">
    <div slot="criteria">
      <aeris-keyword-search-criteria></aeris-keyword-search-criteria>
      <aeris-temporal-search-criteria></aeris-temporal-search-criteria>
      <aeris-spatial-search-criteria></aeris-spatial-search-criteria>
      <aeris-platform-search-criteria></aeris-platform-search-criteria>
      <aeris-level-search-criteria></aeris-level-search-criteria>
      <aeris-collection-search-criteria exclusion="CAPITOUL,ESCOMPTE,PASSY" downloadable="EUROCHAMP,GMOS,ACTRIS-FR,GEWEX"></aeris-collection-search-criteria>
      <aeris-collection-search-criteria headertitle="campaigns" headericonclass="fa fa-map-o" inclusion="CAPITOUL,ESCOMPTE,PASSY" downloadable="ESCOMPTE"></aeris-collection-search-criteria>
    </div>
    <div slot="buttons-criteria">
      <aeris-catalogue-help-button></aeris-catalogue-help-button>
      <aeris-catalogue-maximize-button></aeris-catalogue-maximize-button>
      <aeris-catalogue-reset-button></aeris-catalogue-reset-button>
      <aeris-catalogue-search-button></aeris-catalogue-search-button>
    </div>
    <div slot="buttons-map">
      <aeris-catalogue-edit-button></aeris-catalogue-edit-button>
    </div>
  </aeris-catalog>
  <aeris-catalog-help-content helpcookie="aeris-help-popup"></aeris-catalog-help-content>
</div>
</template>
