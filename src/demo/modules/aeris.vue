<template>
  <div>
    <aeris-catalog
      metadata-service="https://sedoo.aeris-data.fr/catalogue/rest/metadatarecette/"
      message="Test message : vous êtes sur le catalogue aeris"
      criteria-header-icon-color="grey"
      criteria-background-color="#F5F5F5"
      criteria-content-primary-color="grey"
      summary-bar-width="400px"
      summary-max-length="200"
      cart-token="aeris"
      cart-service="https://sedoo.aeris-data.fr/catalogue/rest/shoppingcart"
    >
      <div slot="criteria">
        <aeris-keyword-search-criteria></aeris-keyword-search-criteria>
        <aeris-project-search-criteria></aeris-project-search-criteria>
        <aeris-instrument-search-criteria></aeris-instrument-search-criteria>
        <aeris-project-search-criteria></aeris-project-search-criteria>
        <aeris-parameter-search-criteria></aeris-parameter-search-criteria>
        <aeris-temporal-search-criteria></aeris-temporal-search-criteria>
        <aeris-spatial-search-criteria></aeris-spatial-search-criteria>
        <aeris-platform-search-criteria></aeris-platform-search-criteria>
        <aeris-level-search-criteria></aeris-level-search-criteria>
        <aeris-collection-search-criteria
          exclusion="CAPITOUL,ESCOMPTE,PASSY"
          downloadable="EUROCHAMP,GMOS,ACTRIS-FR,GEWEX"
        ></aeris-collection-search-criteria>
        <aeris-collection-search-criteria
          headertitle="campaigns"
          headericonclass="fa fa-map-o"
          inclusion="CAPITOUL,ESCOMPTE,PASSY"
          downloadable="ESCOMPTE"
        ></aeris-collection-search-criteria>
      </div>
      <div slot="buttons-criteria">
        <aeris-catalogue-reset-text-button></aeris-catalogue-reset-text-button>
        <aeris-catalogue-search-text-button></aeris-catalogue-search-text-button>
      </div>
    </aeris-catalog>
    <aeris-catalog-help-content helpcookie="aeris-help-popup"></aeris-catalog-help-content>
  </div>
</template>
<script></script>
