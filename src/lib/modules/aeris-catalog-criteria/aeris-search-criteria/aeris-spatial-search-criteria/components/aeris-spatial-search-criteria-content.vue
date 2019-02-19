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
          v-model="north"
          class="spatial-search-criteria"
          name="north"
          @change="handleChange"
          @input="checkValidity"
        />
      </div>

      <div class="aeris-input-group">
        <span class="right">{{ $t("eastAbbr") }}</span
        ><input
          v-model="east"
          class="spatial-search-criteria"
          name="east"
          @change="handleChange"
          @input="checkValidity"
        />
      </div>

      <div class="aeris-input-group">
        <span class="right">{{ $t("southAbbr") }}</span
        ><input
          v-model="south"
          class="spatial-search-criteria"
          name="south"
          @change="handleChange"
          @input="checkValidity"
        />
      </div>

      <div class="aeris-input-group">
        <span class="right">{{ $t("westAbbr") }}</span
        ><input
          v-model="west"
          class="spatial-search-criteria"
          name="west"
          @change="handleChange"
          @input="checkValidity"
        />
      </div>
    </span>
    <div v-if="showMap" class="map-popup">
      <div class="map-popup-title">
        <h3>{{ $t("coordinateSelection") }}</h3>
        <div @click="closeMapPopup">
          <i :title="$t('close')" class="fa fa-times" />
        </div>
      </div>

      <div class="map-popup-content">
        <aeris-catalog-map
          url="//server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
          data-map
        >
          <aeris-catalogue-draw-map-button slot="draw" :title="$t('draw')"></aeris-catalogue-draw-map-button>
          <aeris-catalogue-select-map-button slot="select" :title="$t('select')"></aeris-catalogue-select-map-button>
        </aeris-catalog-map>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "aeris-spatial-search-criteria-content",

  props: {
    lang: {
      type: String,
      default: "en"
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value;
    }
  },

  
  created: function() {
    this.$i18n.locale = this.lang;
    this.catalogueResetListener = this.handleCatalogueReset.bind(this);
    document.addEventListener("aerisCatalogueResetEvent", this.catalogueResetListener);
    this.catalogueSelectionDrawListener = this.handleSelectionDraw.bind(this);
    document.addEventListener("aerisCatalogueSelectionDrawEvent", this.catalogueSelectionDrawListener);
    this.aerisCatalogueSearchEventListener = this.handleSearch.bind(this);
    document.addEventListener("aerisCatalogueSearchEvent", this.aerisCatalogueSearchEventListener);
  },

  mounted: function() {},

  computed: {},

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
      aerisCatalogueSearchEventListener: null
    };
  },

  updated: function() {},

  methods: {
    isValidLatitude: function(latitude) {
      let aux = parseFloat(latitude);
      if (!Number.isNaN(aux)) {
        return aux >= -90 && aux <= 90 ? true : false;
      }

      return false;
    },

    isValidLongitude: function(longitude) {
      let aux = parseFloat(longitude);
      if (!Number.isNaN(aux)) {
        return aux >= -180 && aux <= 180 ? true : false;
      }

      return false;
    },

    isValidBox: function() {
      if (!this.isValidLatitude(this.north)) return false;
      if (!this.isValidLatitude(this.south)) return false;
      if (!this.isValidLongitude(this.east)) return false;
      if (!this.isValidLongitude(this.west)) return false;
      if (Number(this.north) < Number(this.south)) return false;

      return true;
    },

    checkValidity: function(e) {
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

    closeMapPopup: function() {
      this.showMap = !this.showMap;
      var current = this;
      if (this.showMap) {
        this.$nextTick(() => {
          current.handleChange();
        });
      }
    },

    handleSelectionDraw: function(e) {
      this.north = e.detail.north.toFixed(4);
      this.south = e.detail.south.toFixed(4);
      this.east = e.detail.east.toFixed(4);
      this.west = e.detail.west.toFixed(4);
      this.handleChange();
    },

    handleCatalogueReset: function() {
      this.handleReset();
    },

    handleReset: function() {
      this.north = "";
      this.south = "";
      this.east = "";
      this.west = "";
      this.handleChange();
    },

    correctCommas: function() {
      this.north = this.north.replace(/,/g, ".");
      this.south = this.south.replace(/,/g, ".");
      this.east = this.east.replace(/,/g, ".");
      this.west = this.west.replace(/,/g, ".");
    },

    asBox: function() {
      return {
        north: this.north,
        south: this.south,
        east: this.east,
        west: this.west
      };
    },

    handleChange: function() {
      this.correctCommas();
      if (this.isValidBox()) {
        var selectionEvent = {
          box: this.asBox()
        };

        var event = new CustomEvent("aerisCatalogueMapAddSelectionRequest", {
          detail: selectionEvent
        });
        document.dispatchEvent(event);
      } else {
        var event = new CustomEvent("aerisCatalogueMapClearSelectionRequest");
        document.dispatchEvent(event);
      }
    },

    handleSearch: function(e) {
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
</style>
