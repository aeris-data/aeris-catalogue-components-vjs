<i18n>
    {
    "en": {
    "northAbbr": "N",
    "southAbbr": "S",
    "eastAbbr" : "E",
    "westAbbr" : "W",
    "reset": "Reset",
    "map": "Map",
    "incorrect_values": "Incorrect values",
    "coordinateSelection": "Coordinates selection",
    "close": "Close",
    "draw" : "Draw",
    "select" : "Select",
    "clear" :"Clear"
    },
    "fr": {
    "northAbbr": "N",
    "southAbbr": "S",
    "eastAbbr" : "E",
    "westAbbr" : "O",
    "reset": "Réinitialiser",
    "map": "Carte",
    "incorrect_values": "Valeurs incorrectes",
    "coordinateSelection": "Sélection des coordonnées",
    "close": "Fermer",
    "draw" : "Dessiner",
    "select" : "Sélectionner",
    "clear" :"Effacer"
    }
    }
</i18n>

<template>
  <div data-aeris-spatial-search-criteria-content>
    <div class="box-toolbar">
      <button
        :class="{ showMap: showMap }"
        :title="$t('map')"
        type="button"
        class="spatial-reset-button"
        @click="closeMapPopup"
      >
        <i class="fa fa-map" /><i>{{ $t("map") }}</i>
      </button>
      <button :title="$t('clear')" type="button" class="spatial-reset-button leftbutton" @click="handleReset">
        <i class="fa fa-trash" /><i>{{ $t("clear") }}</i>
      </button>
    </div>
    <span class="aeris-spatial-search-criteria-content">
      <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>

      <div class="aeris-input-group">
        <span class="right">{{ $t("northAbbr") }}</span
        ><input
          v-model="map.coordinate.north "
          class="spatial-search-criteria"
          name="north"
          @input="checkValidity"
        />
      </div>

      <div class="aeris-input-group">
        <span class="right">{{ $t("eastAbbr") }}</span
        ><input
          v-model="map.coordinate.east"
          class="spatial-search-criteria"
          name="east"
          @input="checkValidity"
        />
      </div>

      <div class="aeris-input-group">
        <span class="right">{{ $t("southAbbr") }}</span
        ><input
          v-model="map.coordinate.south"
          class="spatial-search-criteria"
          name="south"
          @input="checkValidity"
        />
      </div>

      <div class="aeris-input-group">
        <span class="right">{{ $t("westAbbr") }}</span
        ><input
          v-model="map.coordinate.west"
          class="spatial-search-criteria"
          name="west"
          @input="checkValidity"
        />
      </div>
    </span>
    <div v-if="showMap" class="map-modal" >
    <div  class="map-popup">
      <div class="map-popup-title">
        <h3>{{ $t("coordinateSelection") }}</h3>
        <div @click="closeMapPopup">
          <i :title="$t('close')" class="fa fa-times" />
        </div>
      </div>

      <div class="map-popup-content">
         <aeris-catalogue-map url="//server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}" :hidemap="false" :theme="theme" @selectionDrawEvent="getSelection" v-bind="map"></aeris-catalogue-map>
      </div>
    </div>
    </div>
  </div>
</template>

<script>

import AerisCatalogueMap  from "../../../../aeris-catalog-map/components/aeris-catalog-map";
export default {
  name: "aeris-spatial-search-criteria-content",
  components: {AerisCatalogueMap},
  props: {
    lang: {
      type: String,
      default: "en"
    },
    theme: {
      type:Object,
      default:() => {}
    },

  },

  watch: {
    lang(value) {
      this.$i18n.locale = value;
    }
  },

  
  created() {
    this.$i18n.locale = this.lang;
  },


  data() {
    return {
      north: "",
      south: "",
      east: "",
      west: "",
      errorMessage: "",
      showMap: false,
      isDrawMode: false,
      aerisCatalogueStopEditListener: null,
      aerisCatalogueStartEditListener: null,
      aerisCatalogueSearchEventListener: null,
      map: {
        coordinate: {
          north: 0,
          south: 0,
          east: 0,
          west: 0
                  }
      }
    };
  },

  methods: {

    getSelection(selection) {
      this.map.coordinate.north = selection.north.toFixed(4);
      this.map.coordinate.south = selection.south.toFixed(4);
      this.map.coordinate.east = selection.east.toFixed(4);
      this.map.coordinate.west = selection.west.toFixed(4);
    },
    isValidLatitude(latitude) {
      let aux = parseFloat(latitude);
      if (!Number.isNaN(aux)) {
        return aux >= -90 && aux <= 90 ? true : false;
      }

      return false;
    },

    isValidLongitude(longitude) {
      let aux = parseFloat(longitude);
      if (!Number.isNaN(aux)) {
        return aux >= -180 && aux <= 180 ? true : false;
      }

      return false;
    },

    isValidBox() {
      if (!this.isValidLatitude(this.north)) return false;
      if (!this.isValidLatitude(this.south)) return false;
      if (!this.isValidLongitude(this.east)) return false;
      if (!this.isValidLongitude(this.west)) return false;
      if (Number(this.north) < Number(this.south)) return false;

      return true;
    },

    checkValidity(e) {
      this.correctCommas();
      var el = e.target;
      var validCoords;
      if (el.name === "north" || el.name === "south") {
        validCoords = this.isValidLatitude(el.value);
      } else {
        validCoords = this.isValidLongitude(el.value);
      }

      if (!validCoords) {
        el.classList.add("incorrect-input");
        this.errorMessage = this.$t("incorrect_values");
        return false;
      } else {
        el.classList.remove("incorrect-input");
        this.errorMessage = "";
      }
    },

    closeMapPopup() {
      this.showMap = !this.showMap;
    },

    handleReset() {
      this.map.coordinate.north = "";
      this.map.coordinate.south = "";
      this.map.coordinate.east = "";
      this.map.coordinate.west = "";
    },

    correctCommas() {
      this.north = this.north.replace(/,/g, ".");
      this.south = this.south.replace(/,/g, ".");
      this.east = this.east.replace(/,/g, ".");
      this.west = this.west.replace(/,/g, ".");
    },

    asBox() {
      return {
        north: this.north,
        south: this.south,
        east: this.east,
        west: this.west
      };
    },

    handleSearch(e) {
      if (this.isValidBox()) {
        e.detail.box = this.asBox();
      }
    }
  }
};
</script>

<style>
[data-aeris-spatial-search-criteria-content] {
  display: block;
}

[data-aeris-spatial-search-criteria-content] .aeris-catalog-box {
  word-wrap: break-word;
}

[data-aeris-spatial-search-criteria-content] .aeris-input-group {
  border: none;
  background-color: rgba(172, 220, 238, 0.3);
}

[data-aeris-spatial-search-criteria-content] .leftbutton {
  margin-right: 3px;
}

[data-aeris-spatial-search-criteria-content] .aeris-input-group {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 5px 0;
  width: 100%;
  height: 25px;
  line-height: 25px;
  overflow: hidden;
}

[data-aeris-spatial-search-criteria-content] input.incorrect-input {
  border: 2px solid red !important;
}

[data-aeris-spatial-search-criteria-content] .showMap {
  color: #f0ad4e;
}

[data-aeris-spatial-search-criteria-content] .right {
  min-width: 40px;
  border-right: 1px solid #fff;
  box-sizing: border-box;
  display: block;
  height: 100%;
  text-align: center;
}

[data-aeris-spatial-search-criteria-content] .error-message {
  color: red;
}

[data-aeris-spatial-search-criteria-content] button {
  cursor: pointer;
}

[data-aeris-spatial-search-criteria-content] .aeris-input-group input.spatial-search-criteria {
  background-color: transparent;
  box-sizing: border-box;
  height: 100%;
  padding: 0 5px;
  border: none;
  outline: none;
}

[data-aeris-spatial-search-criteria-content] .box-toolbar {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
  background-color: #cfcfcf;
}
.map-modal{
  
  background-color :rgba(0,0,0,0.5);
  position: fixed;
  z-index:9990;
  top: 0;
  left: 0;
  width:100%;
  height:100%
}
[data-aeris-spatial-search-criteria-content] .map-popup {
  display: inline-block;
  position: fixed;
  z-index: 9999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  width: 50%;
  
}

[data-aeris-spatial-search-criteria-content] .map-popup-content {
  display: inline-block;
  text-align: center;
  width: 100%;
   
}

[data-aeris-spatial-search-criteria-content] .map-popup .map-popup-title,
[data-aeris-spatial-search-criteria-content] .map-popup > .map-popup-title > h3 {
  width: 100%;
  text-align: center;
  margin-top: 4px;
 
}

[data-aeris-spatial-search-criteria-content] .map-popup .map-popup-title {
  display: flex;
  flex: space-between;
}

[data-aeris-spatial-search-criteria-content] .map-popup .map-popup-title i {
  cursor: pointer;
  color: #888;
  opacity: 0.5;
}

[data-aeris-spatial-search-criteria-content] .map-popup .map-popup-title i:hover {
  opacity: 1;
}

[data-aeris-spatial-search-criteria-content] .map-popup .popup-content {
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
}

[data-aeris-spatial-search-criteria-content] .map-popup pre {
  margin: 20px 10px;
  padding: 5px;
  resize: none;
  min-width: 600px;
  max-width: 600px;
  min-height: 300px;
  max-height: 300px;
  word-wrap: break-word;
  border-radius: 5px;
}

[data-aeris-spatial-search-criteria-content] .spatial-reset-button i {
  margin-left: 5px;
}
button {
    margin-left:5px;
    padding:5px;
    border: 0;
    border-radius: 5px;
    background: #e6f5fa;
    -webkit-appearance: none;
}
button:hover{
  background: black;
  color:white
}
</style>
