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
  <div aeris-spatial-search-criteria-content>
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
      <button :title="$t('clear')" type="button" class="spatial-reset-button leftbutton" @click="resetCoordinate">
        <i class="fa fa-trash" /><i>{{ $t("clear") }}</i>
      </button>
    </div>
    <span class="aeris-spatial-search-criteria-content">
      <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>

      <div class="aeris-input-group">
        <span class="right">{{ $t("northAbbr") }}</span
        ><input
          ref="north"
          v-model="map.coordinate.north"
          class="spatial-search-criteria"
          name="north"
          @change="checkValidity"
        />
      </div>

      <div class="aeris-input-group">
        <span class="right">{{ $t("eastAbbr") }}</span
        ><input
          ref="east"
          v-model="map.coordinate.east"
          class="spatial-search-criteria"
          name="east"
          @change="checkValidity"
        />
      </div>

      <div class="aeris-input-group">
        <span class="right">{{ $t("southAbbr") }}</span
        ><input
          ref="south"
          v-model="map.coordinate.south"
          class="spatial-search-criteria"
          name="south"
          @change="checkValidity"
        />
      </div>

      <div class="aeris-input-group">
        <span class="right">{{ $t("westAbbr") }}</span
        ><input
          ref="west"
          v-model="map.coordinate.west"
          class="spatial-search-criteria"
          name="west"
          @change="checkValidity"
        />
      </div>
    </span>
    <div v-if="showMap" class="map-modal">
      <div class="map-popup">
        <div class="map-popup-title">
          <h3>{{ $t("coordinateSelection") }}</h3>
          <div @click="closeMapPopup">
            <i :title="$t('close')" class="fa fa-times" />
          </div>
        </div>

        <div class="map-popup-content">
          <aeris-catalogue-map
            :hidemap="false"
            :theme="theme"
            v-bind="map"
            url="//server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
            @selectionDrawEvent="getSelection"
          ></aeris-catalogue-map>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AerisCatalogueMap from "../../../../aeris-catalog-map/components/aeris-catalog-map";
export default {
  name: "aeris-spatial-search-criteria-content",
  components: { AerisCatalogueMap },
  props: {
    language: {
      type: String,
      default: "en"
    },
    theme: {
      type: Object,
      default: () => {}
    }
  },

  watch: {
    language(value) {
      this.$i18n.locale = value;
    }
  },

  created() {
    this.$i18n.locale = this.language;
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
          north: "",
          south: "",
          east: "",
          west: ""
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
      this.$store.commit("setCoordinate", this.map.coordinate);
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

      if (this.isValidBox()) {
        this.$store.commit("setCoordinate", {
          north: this.north,
          south: this.south,
          east: this.east,
          west: this.west
        });
      }
    },

    closeMapPopup() {
      this.showMap = !this.showMap;
    },

    resetCoordinate() {
      this.map.coordinate.north = "";
      this.map.coordinate.south = "";
      this.map.coordinate.east = "";
      this.map.coordinate.west = "";
      this.$store.commit("resetCoordinate");
    },

    correctCommas() {
      this.north = this.north.replace(/,/g, ".");
      this.south = this.south.replace(/,/g, ".");
      this.east = this.east.replace(/,/g, ".");
      this.west = this.west.replace(/,/g, ".");
    }
  }
};
</script>

<style scoped>
[aeris-spatial-search-criteria-content] {
  display: block;
}

[aeris-spatial-search-criteria-content] .aeris-catalog-box {
  word-wrap: break-word;
}

.aeris-input-group {
  background-color: rgba(172, 220, 238, 0.3);
}

.aeris-input-group input {
  border: none;
}

[aeris-spatial-search-criteria-content] .leftbutton {
  margin-right: 3px;
}

[aeris-spatial-search-criteria-content] .aeris-input-group {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 5px 0;
  width: 100%;
  height: 25px;
  line-height: 25px;
  overflow: hidden;
}

[aeris-spatial-search-criteria-content] .aeris-input-group .incorrect-input {
  border: 2px solid red;
}

[aeris-spatial-search-criteria-content] .showMap {
  color: #f0ad4e;
}

[aeris-spatial-search-criteria-content] .right {
  min-width: 40px;
  border-right: 1px solid #fff;
  box-sizing: border-box;
  display: block;
  height: 100%;
  text-align: center;
}

[aeris-spatial-search-criteria-content] .error-message {
  color: red;
}

[aeris-spatial-search-criteria-content] button {
  cursor: pointer;
}

[aeris-spatial-search-criteria-content] .aeris-input-group input.spatial-search-criteria {
  background-color: transparent;
  box-sizing: border-box;
  height: 100%;
  padding: 0 5px;
  outline: none;
}

[aeris-spatial-search-criteria-content] .box-toolbar {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
  background-color: #cfcfcf;
}
.map-modal {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 9990;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
[aeris-spatial-search-criteria-content] .map-popup {
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

[aeris-spatial-search-criteria-content] .map-popup-content {
  display: inline-block;
  text-align: center;
  width: 100%;
}

[aeris-spatial-search-criteria-content] .map-popup .map-popup-title,
[aeris-spatial-search-criteria-content] .map-popup > .map-popup-title > h3 {
  width: 100%;
  text-align: center;
  margin-top: 4px;
}

[aeris-spatial-search-criteria-content] .map-popup .map-popup-title {
  display: flex;
}

[aeris-spatial-search-criteria-content] .map-popup .map-popup-title i {
  cursor: pointer;
  color: #888;
  opacity: 0.5;
}

[aeris-spatial-search-criteria-content] .map-popup .map-popup-title i:hover {
  opacity: 1;
}

[aeris-spatial-search-criteria-content] .map-popup .popup-content {
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
}

[aeris-spatial-search-criteria-content] .map-popup pre {
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

[aeris-spatial-search-criteria-content] .spatial-reset-button i {
  margin-left: 5px;
}
button {
  margin-left: 5px;
  padding: 5px;
  border: 0;
  border-radius: 5px;
  background: #e6f5fa;
  -webkit-appearance: none;
}
button:hover {
  background: black;
  color: white;
}
</style>
