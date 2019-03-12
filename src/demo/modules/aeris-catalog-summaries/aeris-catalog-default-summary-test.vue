<template>
  <div>
    <aeris-catalog-default-summary
      :summary="summary"
      :theme="theme"
      @displayMetadata="displayMetadata"
      @addItemCart="addItemCart"
      @removeItemCart="removeItemCart"
    ></aeris-catalog-default-summary>
    <aeris-catalog-default-summary
      :summary="summary"
      :theme="theme"
      :is-in-cart="true"
      @displayMetadata="displayMetadata"
      @addItemCart="addItemCart"
      @removeItemCart="removeItemCart"
    ></aeris-catalog-default-summary>
    <aeris-catalog-default-summary
      :summary="summary1"
      :theme="theme"
      @displayMetadata="displayMetadata"
      @addItemCart="addItemCart"
      @removeItemCart="removeItemCart"
    ></aeris-catalog-default-summary>
  </div>
</template>

<script>
import { AerisCatalogDefaultSummary } from "../../../lib/modules/aeris-catalogue-components";

export default {
  name: "aeris-catalog-default-summary-test",
  components: { AerisCatalogDefaultSummary },
  data() {
    return {
      summary: {
        clientTemplateName: "md-template-single-file-download",
        dataProcessingLevel: "L2",
        description: {
          DEFAULT_VALUE_KEY: "Fichier des données brutes issues de l'aethalomètre Magee Scientific 7 canaux",
          en: "Fichier des données brutes issues de l'aethalomètre Magee Scientific 7 canaux"
        },
        downloadable: "https://services.sedoo.fr/oldcamp-rest/rest/data",
        id: "7c535595-e6cd-3c26-a4ee-157a499ebbd0",
        plateformType: "unknown",
        projectList: [
          {
            aerisProjectUuid: "a9d16658-114d-3fdb-b614-e5738954dc42",
            projectName: "CAPITOUL"
          }
        ],
        title: {
          en: "AETHALO_7_LAMBDA_CNRM",
          fr: "AETHALO_7_LAMBDA_CNRM"
        },
        type: "COLLECTION"
      },
      summary1: {
        clientTemplateName: "",
        dataProcessingLevel: "L4",
        description: {
          en:
            "In order to help analyzing the IAGOS carbon monoxide (CO) observations and understanding the processes driving their evolutions, we provide ancillary parameters calculated with SOFT-IO (Sauvage et al., 2017; http://dx.doi.org/10.25326/2) along aircraft observations.\n\nCO contribution is defined as follow. CO mixing ratio is calculated for each IAGOS observations (every 0.5° in latitude or longitude at cruising altitude; every 10hPa during ascent or descent of the plane) and sorted by source origin (biomass burning and anthropogenic origin, and for 14 geographical origins, see Fig.1). CO total contribution is then the sum of each CO source origin or the sum of each CO geographical origin and can be used to interpret IAGOS CO measurements. Some examples are highlighted in Sauvage et al., 2017 for individual flights (their Fig.5 to Fig.8).\n\nCO is calculated so far for different up-to-date emissions inventories (ECCAD and MACCity for anthropogenic emissions; GFED4 and GFAS v1.2 for biomass burning emissions) available in the ECCAD project (http://eccad.aeris-data.fr/) and since the beginning of CO measurements in IAGOS (end of 2001) up to now.\n\nL4 IAGOS CO contributions are available on the IAGOS data portal (http://iagos-data.fr) and are part of the IAGOS ancillary data (http://iagos-data.fr/#L4Place:).They are subject to the IAGOS data protocol (http://iagos-data.fr/#RegisterPlace:)",
          fr:
            "In order to help analyzing the IAGOS carbon monoxide (CO) observations and understanding the processes driving their evolutions, we provide ancillary parameters calculated with SOFT-IO (Sauvage et al., 2017; http://dx.doi.org/10.25326/2) along aircraft observations.\n\nCO contribution is defined as follow. CO mixing ratio is calculated for each IAGOS observations (every 0.5° in latitude or longitude at cruising altitude; every 10hPa during ascent or descent of the plane) and sorted by source origin (biomass burning and anthropogenic origin, and for 14 geographical origins, see Fig.1). CO total contribution is then the sum of each CO source origin or the sum of each CO geographical origin and can be used to interpret IAGOS CO measurements. Some examples are highlighted in Sauvage et al., 2017 for individual flights (their Fig.5 to Fig.8).\n\nCO is calculated so far for different up-to-date emissions inventories (ECCAD and MACCity for anthropogenic emissions; GFED4 and GFAS v1.2 for biomass burning emissions) available in the ECCAD project (http://eccad.aeris-data.fr/) and since the beginning of CO measurements in IAGOS (end of 2001) up to now.\n\nL4 IAGOS CO contributions are available on the IAGOS data portal (http://iagos-data.fr) and are part of the IAGOS ancillary data (http://iagos-data.fr/#L4Place:).They are subject to the IAGOS data protocol (http://iagos-data.fr/#RegisterPlace:)"
        },
        downloadable: null,
        id: "4d3be8dd-c41a-4f35-8ba6-722cf12e2de3",
        plateformType: "unknown",
        projectList: [
          {
            aerisProjectUuid: "546c0188-772c-4f03-987d-e229f95cb599",
            projectName: "IAGOS"
          }
        ],
        title: {
          en: "IAGOS ancillary data (L4) - CO contributions to the aircraft measurements",
          fr: "IAGOS ancillary data (L4) - CO contributions to the aircraft measurements"
        },
        type: "COLLECTION"
      },
      theme: {
        primaryColor: "#0b6bb3",
        secondaryColor: "#fff",
        contentPrimaryColor: "grey"
      }
    };
  },
  methods: {
    displayMetadata(collectionId) {
      console.log("displayMetadata: ", collectionId);
    },
    addItemCart(collectionId) {
      console.log("addItemCart: ", collectionId);
    },
    removeItemCart(collectionId) {
      console.log("removeItemCart: ", collectionId);
    }
  }
};
</script>
