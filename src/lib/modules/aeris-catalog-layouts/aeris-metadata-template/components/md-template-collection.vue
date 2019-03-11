<template>

  <div data-template="metadata-panel">
  <aeris-metadata-description :markdown="true" :language="language" :show-title="false" :resource-abstract="metadata.resourceAbstract"></aeris-metadata-description>
  <aeris-metadata-contacts :language="language" :contacts="metadata.contacts"></aeris-metadata-contacts>
<aeris-metadata-spatial-extents :language="language" :spatial-extents="metadata.spatialExtents"></aeris-metadata-spatial-extents>   
    <aeris-metadata-temporal-extents :language="language" :temporal-extents="metadata.temporalExtents"></aeris-metadata-temporal-extents>
    <aeris-metadata-information-links :language="language" :links="metadata.links"></aeris-metadata-information-links>
   <aeris-metadata-information :language="language" :items="metadata"></aeris-metadata-information> 
    <aeris-metadata-datapolicy :language="language" :distributionInformation="metadata.distributionInformation"></aeris-metadata-datapolicy>
    <aeris-metadata-data-links :language="language" :links="metadata.links"></aeris-metadata-data-links>
    <aeris-metadata-citations :language="language" :identifiers="metadata.identifiers"></aeris-metadata-citations>
    <aeris-metadata-platforms :language="language" :platforms="metadata.platforms"></aeris-metadata-platforms>
    <aeris-metadata-instruments :language="language" :instrument="metadata.instruments"></aeris-metadata-instruments>
    <aeris-metadata-formats :language="language" :formats="metadata.formats"></aeris-metadata-formats>
    <aeris-metadata-parameters :language="language" :parameters="metadata.parameters"></aeris-metadata-parameters>
    <aeris-metadata-publications :language="language" :publications="metadata.publications"></aeris-metadata-publications>
    <aeris-metadata-quicklook-gallery :language="language" ></aeris-metadata-quicklook-gallery> 
  </div>
</template>

<script>

import {
  AerisMetadataCitations,
  AerisMetadataContacts,
  AerisMetadataDataLinks,
  AerisMetadataDatapolicy,
  AerisMetadataDescription,
  AerisMetadataFormats,
  AerisMetadataInformation,
  AerisMetadataInformationLinks,
  AerisMetadataInstruments,
  AerisMetadataModifications,
  AerisMetadataParameters,
  AerisMetadataPlatforms,
  AerisMetadataPublications,
  AerisMetadataQuicklookGallery,
  AerisMetadataSpatialExtents,
  AerisMetadataTemporalExtents,
  AerisMetadataServices
} from "aeris-metadata-components-vjs";
import { AerisNotifier, AerisTheme, Aerislanguage } from "aeris-commons-components-vjs";
export default {
  name: "md-template-collection",
components: {
    AerisMetadataCitations,
    AerisMetadataContacts,
    AerisMetadataDataLinks,
    AerisMetadataDatapolicy,
    AerisMetadataDescription,
    AerisMetadataFormats,
    AerisMetadataInformation,
    AerisMetadataInformationLinks,
    AerisMetadataInstruments,
    AerisMetadataModifications,
    AerisMetadataParameters,
    AerisMetadataPlatforms,
    AerisMetadataPublications,
    AerisMetadataQuicklookGallery,
    AerisMetadataSpatialExtents,
    AerisMetadataTemporalExtents,
    AerisMetadataServices,
    AerisNotifier,
    AerisTheme,
    Aerislanguage
  },
  props: {
    language: {
      type: String,
      default: "en"
    },
    metadata:{
      type:Object,
      default: ()=>{ return {}}
    }
  },
  

  
  
  computed: {
    getOtherInformations() {
      if (this.metadata) {
        return {
          uuid: this.metadata.identifier,
          lastModification: this.metadata.lastModification.value,
          aerisDataCenter: this.metadata.aerisDataCenter,
          dataLevel: this.metadata.dataLevel
        };
      } else {
        return null;
      }
    }}
};
</script>
