<template>
  <div  :class="hidemap ? hidemap : 'showmap'" data-aeris-catalog-map>
    <div class="map-container">
      <div id="mapMask" class="map-mask" />
      <div id="map" class="map" tabindex="0" />
      <div id="mapCoordinates" class="map-coordinates" />
      <div class="button">
        <slot name="select" />
        <slot name="draw" />
      </div>
    </div>
  </div>
</template>

<script>
const FADEIN_DURATION = 1000; //ms
const DEFAULT_ZOOM = 2;

import Feature from "ol/Feature";
import * as extent from "ol/extent";
import Map from "ol/Map.js";
import View from "ol/View.js";
import Point from "ol/geom/Point";
import Polygon from "ol/geom/Polygon";
import XYZ from "ol/source/XYZ";
import { transform, transformExtent } from "ol/proj";
import { Draw, Modify, Snap } from "ol/interaction.js";
import { createStringXY } from "ol/coordinate";
import { defaults, MousePosition } from "ol/control.js";
import { Tile, Vector as VectorLayer } from "ol/layer.js";
import { Cluster, OSM, Vector as VectorSource } from "ol/source.js";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style.js";

export default {
  name: "aeris-catalog-map",

  props: {
    language: {
      type: String,
      default: "en"
    },
    visible: {
      type: Boolean,
      default: true
    },
    hidemap: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default:
        "https://api.mapbox.com/v4/mapbox.streets-satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZnJhbmNvaXNhbmRyZSIsImEiOiJjaXVlMGE5b3QwMDBoMm9tZGQ1M2xubzVhIn0.FK8gRVJb4ADNnrO6cNlWUw"
    }
  },

  data() {
    return {
      ol: null,
      map: null,
      mainSource: null,
      mainClusteredSource: null,
      clusterMainClusteredSource: null,
      vector: null,
      mainClusteredLayer: null,
      previewSource: null,
      previewClusteredSource: null,
      clusterPreviewClusteredSource: null,
      previewLayer: null,
      previewClusteredLayer: null,
      defaultCenter: null,
      isDrawMode: false,
      aerisCatalogueStartEditEventListener: null,
      aerisCatalogueStopEditEventListener: null,
      aerisCatalogueAddSelectionListener: null,
      aerisCatalogueRemoveSelectionListener: null,
      aerisSpatialExtentMapModeListener: null,
      draw: null,
      selectionBox: null,
      area: null
    };
  },

  watch: {
    isDrawMode(value) {
      if (value) {
        this.handleStartEditEvent();
      } else {
        this.handleStopEditEvent();
      }
    }
  },

  created() {
    this.aerisCatalogueStartEditEventListener = this.handleStartEditEvent.bind(this);
    document.addEventListener("aerisCatalogueStartEditEvent", this.aerisCatalogueStartEditEventListener);
    this.aerisCatalogueStopEditEventListener = this.handleStopEditEvent.bind(this);
    document.addEventListener("aerisCatalogueStopEditEvent", this.aerisCatalogueStopEditEventListener);
    this.aerisCatalogueAddSelectionListener = this.handleAddSelectionEvent.bind(this);
    document.addEventListener("aerisCatalogueMapAddSelectionRequest", this.aerisCatalogueAddSelectionListener);
    this.aerisCatalogueRemoveSelectionListener = this.handleRemoveSelectionEvent.bind(this);
    document.addEventListener("aerisCatalogueMapClearSelectionRequest", this.aerisCatalogueRemoveSelectionListener);
    this.aerisSpatialExtentMapModeListener = this.aerisSpatialExtentMapModeHandle.bind(this);
    document.addEventListener("aerisSpatialExtentMapMode", this.aerisSpatialExtentMapModeListener);
  },

  mounted() {
    if (this.map) {
      return;
    }

    this.defaultCenter = transform([0, 0], "EPSG:4326", "EPSG:900913");
    /* Map background */
    let raster = new Tile({
      source: new XYZ({
        url: this.url
      })
    });

    if (this.hidemap) {
      return;
    }

    /* Create map sources */
    this.initialiseMainSource();
    this.initialisePreviewSource();
    this.map = new Map({
      layers: [raster, this.vector, this.mainClusteredLayer],
      target: this.$el.querySelector("#map"),
      controls: defaults({
        attribution: false
      }),
      view: new View({
        center: this.defaultCenter,
        zoom: DEFAULT_ZOOM,
        maxZoom: 18,
        minZoom: 0
      })
    });

    let extent = transformExtent([-150, 70, 150, -50], "EPSG:4326", "EPSG:900913");
    this.map.getView().fit(extent, this.map.getSize());

    /* Add layers */
    this.map.addLayer(this.previewLayer);
    this.map.addLayer(this.previewClusteredLayer);

    /* Hide map and fade in when loaded */
    let mapViewport = this.$el.querySelector(".ol-viewport");
    mapViewport.style.opacity = 0;

    raster.getSource().on("tileloadend", () => {
      let mapZoom = mapViewport.querySelector(".ol-zoom");
      mapZoom.style.top = "auto";
      mapZoom.style.bottom = "0.5em";

      window.setTimeout(() => {
        mapViewport.style.transition = FADEIN_DURATION / 1000 + "s";
        mapViewport.style.opacity = 1;
      }, 500);
    });

    //Ajout des coordonnees Lon/Lat du curseur en bas a droite
    this.map.addControl(
      new MousePosition({
        projection: "EPSG:4326",
        coordinateFormat: createStringXY(3),
        className: "custom-mouse-position map-component",
        target: document.getElementById("mapCoordinates"),
        undefinedHTML: "&nbsp;"
      })
    );

    this.draw = new Draw({
      source: this.mainSource,
      type: "LineString",
      geometryFunction: this.drawGeometryFunction,
      maxPoints: 2
    });

    this.draw.addEventListener("drawend", this.handleSelectionDrawEnd.bind(this));
    if (this.area && this.area !== "") {
      let unquotedJSON = this.area;
      let fixedJSON = unquotedJSON.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
      let areaObject = JSON.parse(fixedJSON);

      let areaFeature = this._coordsToFeature(areaObject);
      let tempSource = new VectorSource({
        wrapX: false,
        noWrap: true
      });

      let tempVector = new VectorLayer({
        source: tempSource,
        style: this.featuresStyle
      });

      this._map.addLayer(tempVector);
      tempSource.addFeature(areaFeature);

      let _this = this;

      window.setTimeout(() => {
        this.resizeMapToExtent(tempSource);
        this.map.removeLayer(tempVector);
      }, 500);
    }
     this.updateMapSize();
  },

  methods: {
    handleRemoveSelectionEvent(e) {
      let id = "selectionBox";

      this.removeFeature("selectionBox");
      this.selectionBox = null;
    },

    updateMapSize() {
      let interval = window.setInterval(() => {
        this.map.updateSize();
      }, 10);

      window.setTimeout(() => {
        window.clearInterval(interval);
      }, 200);
    },

    handleAddSelectionEvent(e) {
      let box = e.detail.box;
      let id = e.detail.id || "selectionBox";

      this.removeFeature("selectionBox");

      let feature = this.coordsToFeature(box);

      feature.setId(id);

      this.mainSource.addFeature(feature);
      this.selectionBox = feature;
      this.map.updateSize();
      this.updateMapSize();
    },

    coordsToFeature(coords) {
      let obj;
      let l = Object.keys(coords).length;

      if (l === 4) {
        if (coords.north > 85) coords.north = 85;
        if (coords.south < -85) coords.south = -85;

        obj = new Polygon([
          [
            [Number(coords.west), Number(coords.north)],
            [Number(coords.east), Number(coords.north)],
            [Number(coords.east), Number(coords.south)],
            [Number(coords.west), Number(coords.south)],
            [Number(coords.west), Number(coords.north)]
          ]
        ]).transform("EPSG:4326", "EPSG:900913");
      } else if (l === 2) {
        obj = new Point(transform([Number(coords.lon), Number(coords.lat)], "EPSG:4326", "EPSG:900913"));
      }

      let feature = new Feature({
        geometry: obj
      });

      return feature;
    },

    handleStartEditEvent() {
      this.map.addInteraction(this.draw);
    },

    handleStopEditEvent() {
      this.map.removeInteraction(this.draw);
    },

    handleSearchBarSearchEvent(e) {
      e.detail.box = this.asBox();
    },

    handleSelectionDrawEnd(e) {
      this.removeFeature("selectionBox");
      e.feature.setId("selectionBox");
      this.selectionBox = e.feature;

      let clone = e.feature.clone();
      let extent = clone.getGeometry().getExtent();
      let bottomRight = transform(extent.getBottomRight(extent), "EPSG:3857", "EPSG:4326");
      let topLeft = transform(extent.getTopLeft(extent), "EPSG:3857", "EPSG:4326");

      let selectionDrawEvent = {
        east: bottomRight[0],
        south: bottomRight[1],
        west: topLeft[0],
        north: topLeft[1]
      };

      let event = new CustomEvent("aerisCatalogueSelectionDrawEvent", {
        detail: selectionDrawEvent
      });
      document.dispatchEvent(event);
    },

    drawGeometryFunction(coordinates, geometry) {
      if (!geometry) {
        geometry = new Polygon(null);
      }

      let start = coordinates[0];
      let end = coordinates[1];
      geometry.setCoordinates([[start, [start[0], end[1]], end, [end[0], start[1]], start]]);
      return geometry;
    },

    /* Remove feature with the specified ID */
    removeFeature(id) {
      let feature = this.mainSource.getFeatureById(id);
      if (feature) this.mainSource.removeFeature(feature);

      feature = this.mainClusteredSource.getFeatureById(id);
      if (feature) this.mainSource.removeFeature(feature);
    },

    initialiseMainSource() {
      this.mainSource = new VectorSource({
        wrapX: false,
        noWrap: true
      });

      this.mainClusteredSource = new VectorSource({
        wrapX: false,
        noWrap: true
      });

      this.clusterMainClusteredSource = new Cluster({
        distance: parseInt(30, 10),
        source: this.mainClusteredSource
      });

      this.vector = new VectorLayer({
        source: this.mainSource,
        style: this.featuresStyle
      });

      this.mainClusteredLayer = new VectorLayer({
        source: this.clusterMainClusteredSource,
        style: this.featuresStyle
      });
    },

    initialisePreviewSource() {
      this.previewSource = new VectorSource({
        wrapX: false,
        noWrap: true
      });

      this.previewClusteredSource = new VectorSource({
        wrapX: false,
        noWrap: true
      });

      this.clusterPreviewClusteredSource = new Cluster({
        distance: parseInt(30, 10),
        source: this.previewClusteredSource
      });

      this.previewLayer = new VectorLayer({
        source: this.previewSource,
        style: this.featuresStyle
      });

      this.previewClusteredLayer = new VectorLayer({
        source: this.clusterPreviewClusteredSource,
        style: this.featuresStyle
      });
    },

    aerisSpatialExtentMapModeHandle(e) {
      this.isDrawMode = e.detail;
    }
  }
};
</script>

<style>
[data-aeris-catalog-map] {
  position: relative;
  height: 100%;
  background-color: #fff;
}

[data-aeris-catalog-map] .button {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  top: 2%;
  left: 2%;
}

[data-aeris-catalog-map].hidemap {
  overflow: hidden;
}

[data-aeris-catalog-map].showmap {
  overflow: hidden;
}

[data-aeris-catalog-map] .map-container {
  position: relative;
  height: 100%;
  opacity: 1;
  transition: 0.3s;
}

[data-aeris-catalog-map] .map-container .map {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #2d4059;
  transition: 0.3s;
}

[data-aeris-catalog-map] .map-container:hover .map-coordinates {
  opacity: 1;
}

[data-aeris-catalog-map] .map-container .map-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
}

[data-aeris-catalog-map] .viewport {
  opacity: 0;
  transition: 0.6s;
}

[data-aeris-catalog-map] .map.reduced {
  padding-right: 300px;
}

[data-aeris-catalog-map] .map.reduced ~ .map-coordinates {
  right: 305px;
}

[data-aeris-catalog-map] aeris-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  --spinner-main-color: #333;
}

[data-aeris-catalog-map] .feature-info-tooltip {
  position: absolute;
  max-width: 300px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px 10px;
  color: #333;
  font-size: 12px;
  border: 1px solid;
  border-radius: 3px;
  transform: scaleX(1);
  opacity: 1;
  transform-origin: 0 50%;
  transition: opacity 0.3s, transform 0.3s;
}

[data-aeris-catalog-map] .feature-info-tooltip h4 {
  margin: 0;
}

[data-aeris-catalog-map] .feature-info-tooltip ul {
  margin: 3px 0 0;
  padding-left: 15px;
}

[data-aeris-catalog-map] .feature-info-tooltip.hidden {
  transform: scaleX(0);
  opacity: 0;
  transition: 0s;
}

[data-aeris-catalog-map] .map-coordinates {
  display: block;
  opacity: 0;
  width: 120px;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  bottom: 5px;
  right: 5px;
  padding: 5px;
  font-size: 12px;
  color: #fff;
  text-align: center;
}
</style>
