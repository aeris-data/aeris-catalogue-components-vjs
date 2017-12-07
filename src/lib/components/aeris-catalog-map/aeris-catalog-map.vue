<template>
<div data-aeris-catalog-map :class="hidemap ? hidemap : showmap">
  <div class="map-container">
    <div id="mapMask" class="map-mask"></div>
    <div id="map" class="map" tabindex="0"></div>
    <div id="mapCoordinates" class="map-coordinates"></div>
    <div class="button">
      <slot></slot>
    </div>
  </div>
</div>
</template>

<script>
const FADEIN_DURATION = 1000; /* milliseconds */
const DEFAULT_ZOOM = 2;
//const  /* [long, lat] */
const EXTENTS_COLOR = '#e74c3c';


export default {

  name: 'aeris-catalog-map',

  props: {
    lang: {
      type: String,
      default: 'en'
    },
    visible: {
      type: Boolean,
      default: true
    },
    // If true the map isn't displayed - this property isn't dynamic
    hidemap: {
      type: Boolean,
      default: false
    }
  },


  watch: {},

  destroyed: function() {
    document.removeEventListener('aerisCatalogueStartEditEvent', this.aerisCatalogueStartEditEventListener);
    this.aerisCatalogueStartEditEventListener = null;
    document.removeEventListener('aerisCatalogueStopEditEvent', this.aerisCatalogueStopEditEventListener);
    this.aerisCatalogueStopEditEventListener = null;
    document.removeEventListener('aerisCatalogueMapAddSelectionRequest', this.aerisCatalogueAddSelectionListener);
    this.aerisCatalogueAddSelectionListener = null;
    document.removeEventListener('aerisCatalogueMapClearSelectionRequest', this.aerisCatalogueRemoveSelectionListener);
    this.aerisCatalogueRemoveSelectionListener = null;

  },

  created: function() {
    console.log("Aeris catalog map created")
    this.ol = window.ol;
    this.aerisCatalogueStartEditEventListener = this.handleStartEditEvent.bind(this)
    document.addEventListener('aerisCatalogueStartEditEvent', this.aerisCatalogueStartEditEventListener);
    this.aerisCatalogueStopEditEventListener = this.handleStopEditEvent.bind(this)
    document.addEventListener('aerisCatalogueStopEditEvent', this.aerisCatalogueStopEditEventListener);
    this.aerisCatalogueAddSelectionListener = this.handleAddSelectionEvent.bind(this)
    document.addEventListener('aerisCatalogueMapAddSelectionRequest', this.aerisCatalogueAddSelectionListener);
    this.aerisCatalogueRemoveSelectionListener = this.handleRemoveSelectionEvent.bind(this)
    document.addEventListener('aerisCatalogueMapClearSelectionRequest', this.aerisCatalogueRemoveSelectionListener);

  },

  mounted: function() {

    if (this.map) {
      return;
    }

    var ol = this.ol;
    this.defaultCenter = ol.proj.transform([0, 0], 'EPSG:4326', 'EPSG:900913');
    /* Map background */
    var raster = new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: 'https://api.mapbox.com/v4/mapbox.streets-satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZnJhbmNvaXNhbmRyZSIsImEiOiJjaXVlMGE5b3QwMDBoMm9tZGQ1M2xubzVhIn0.FK8gRVJb4ADNnrO6cNlWUw'
        // url: 'http://api.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZnJhbmNvaXNhbmRyZSIsImEiOiJjaXVlMGE5b3QwMDBoMm9tZGQ1M2xubzVhIn0.FK8gRVJb4ADNnrO6cNlWUw'
      })
    });

    if (this.hidemap) {
      return;
    }

    /* Create map sources */
    this.initialiseMainSource();
    this.initialisePreviewSource();
    this.map = new ol.Map({
      layers: [raster, this.vector, this.mainClusteredLayer],
      target: this.$el.querySelector('#map'),
      controls: ol.control.defaults({
        attribution: false
      }),
      view: new ol.View({
        center: this.defaultCenter,
        zoom: DEFAULT_ZOOM,
        maxZoom: 18,
        minZoom: 0,
      })
    });

    /* Add layers */
    this.map.addLayer(this.previewLayer);
    this.map.addLayer(this.previewClusteredLayer);

    /* Hide map and fade in when loaded */
    var mapViewport = this.$el.querySelector('.ol-viewport');
    mapViewport.style.opacity = 0;

    raster.getSource().on('tileloadend', function() {
      var mapZoom = mapViewport.querySelector('.ol-zoom');
      mapZoom.style.top = 'auto';
      mapZoom.style.bottom = '0.5em';

      window.setTimeout(function() {
        mapViewport.style.transition = FADEIN_DURATION / 1000 + 's';
        mapViewport.style.opacity = 1;
        //
        //            window.setTimeout(function() {
        //            	this.$el.querySelector('#mapMask').style.display = 'none';
        //            }, (FADEIN_DURATION + 100));



      }, 500);

    });

    //Ajout des coordonn�es Lon/Lat du curseur en bas � droite
    this.map.addControl(new ol.control.MousePosition({
      projection: 'EPSG:4326',
      coordinateFormat: ol.coordinate.createStringXY(3),
      className: 'custom-mouse-position map-component',
      target: document.getElementById('mapCoordinates'),
      undefinedHTML: '&nbsp;'
    }));


    this.draw = new ol.interaction.Draw({
      source: this.mainSource,
      type: 'LineString',
      geometryFunction: this.drawGeometryFunction,
      maxPoints: 2
    });

    this.draw.addEventListener('drawend', this.handleSelectionDrawEnd.bind(this));

    if (this.area && this.area !== '') {
      var unquotedJSON = this.area;
      var fixedJSON = unquotedJSON.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
      var areaObject = JSON.parse(fixedJSON);

      var areaFeature = this._coordsToFeature(areaObject);

      var tempSource = new ol.source.Vector({
        wrapX: false,
        noWrap: true
      });

      var tempVector = new ol.layer.Vector({
        source: tempSource,
        style: this.featuresStyle
      });

      this._map.addLayer(tempVector);

      tempSource.addFeature(areaFeature);

      var _this = this;

      window.setTimeout(function() {
        _this.resizeMapToExtent(tempSource);
        _this.map.removeLayer(tempVector);
      }, 500);

    }
    this.updateMapSize();

  },

  computed: {},

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
      draw: null,
      selectionBox: null,
      area: null
    }
  },

  updated: function() {},

  methods: {

    handleRemoveSelectionEvent: function(e) {
      var id = 'selectionBox';

      this.removeFeature('selectionBox');
      this.selectionBox = null
    },

    updateMapSize: function() {
      var interval = window.setInterval(function() {
        this.map.updateSize();
      }.bind(this), 10);

      window.setTimeout(function() {
        window.clearInterval(interval);
      }, 200);
    },

    handleAddSelectionEvent: function(e) {
      var box = e.detail.box;
      var id = e.detail.id || 'selectionBox';

      this.removeFeature('selectionBox');

      var feature = this.coordsToFeature(box);

      feature.setId(id);

      this.mainSource.addFeature(feature);
      this.selectionBox = feature;
      this.map.updateSize();
      this.updateMapSize();

      //this._resizeMapToExtent(this._mainSource);
    },

    coordsToFeature: function(coords) {
      var obj;
      var l = Object.keys(coords).length;

      if (l === 4) {
        if (coords.north > 85) coords.north = 85;
        if (coords.south < -85) coords.south = -85;

        obj = new ol.geom.Polygon([
          [
            [Number(coords.west), Number(coords.north)],
            [Number(coords.east), Number(coords.north)],
            [Number(coords.east), Number(coords.south)],
            [Number(coords.west), Number(coords.south)],
            [Number(coords.west), Number(coords.north)]
          ]
        ]).transform('EPSG:4326', 'EPSG:900913');

      } else if (l === 2) {
        obj = new ol.geom.Point(ol.proj.transform([Number(coords.lon), Number(coords.lat)], 'EPSG:4326', 'EPSG:900913'));
      }

      var feature = new ol.Feature({
        geometry: obj
      });

      return feature;
    },

    handleStartEditEvent: function() {
      this.isDrawMode = true;
      this.map.addInteraction(this.draw);
    },

    handleStopEditEvent: function() {
      this.isDrawMode = false;
      this.map.removeInteraction(this.draw);
    },

    handleSearchBarSearchEvent: function(e) {
      e.detail.box = this.asBox();
    },

    handleSelectionDrawEnd: function(e) {
      this.removeFeature('selectionBox');
      e.feature.setId('selectionBox');
      this.selectionBox = e.feature;

      var clone = e.feature.clone();
      var extent = clone.getGeometry().getExtent();
      var bottomRight = ol.proj.transform(ol.extent.getBottomRight(extent), 'EPSG:3857', 'EPSG:4326');
      var topLeft = ol.proj.transform(ol.extent.getTopLeft(extent), 'EPSG:3857', 'EPSG:4326');

      var selectionDrawEvent = {
        east: bottomRight[0],
        south: bottomRight[1],
        west: topLeft[0],
        north: topLeft[1]
      };

      var event = new CustomEvent('aerisCatalogueSelectionDrawEvent', {
        detail: selectionDrawEvent
      });
      document.dispatchEvent(event)
    },

    drawGeometryFunction: function(coordinates, geometry) {
      if (!geometry) {
        geometry = new ol.geom.Polygon(null);
      }

      var start = coordinates[0];
      var end = coordinates[1];
      geometry.setCoordinates([
        [
          start, [start[0], end[1]],
          end, [end[0], start[1]],
          start
        ]
      ]);
      return geometry;
    },




    /* Remove feature with the specified ID */
    removeFeature: function(id) {
      var feature = this.mainSource.getFeatureById(id);
      if (feature) this.mainSource.removeFeature(feature);

      feature = this.mainClusteredSource.getFeatureById(id);
      if (feature) this.mainSource.removeFeature(feature);
    },



    initialiseMainSource: function() {
      var ol = this.ol;
      this.mainSource = new ol.source.Vector({
        wrapX: false,
        noWrap: true
      });

      this.mainClusteredSource = new ol.source.Vector({
        wrapX: false,
        noWrap: true
      });

      this.clusterMainClusteredSource = new ol.source.Cluster({
        distance: parseInt(30, 10),
        source: this.mainClusteredSource
      });

      this.vector = new ol.layer.Vector({
        source: this.mainSource,
        style: this.featuresStyle
      });

      this.mainClusteredLayer = new ol.layer.Vector({
        source: this.clusterMainClusteredSource,
        style: this.featuresStyle
      });
    },

    initialisePreviewSource: function() {
      var ol = this.ol;
      this.previewSource = new ol.source.Vector({
        wrapX: false,
        noWrap: true
      });

      this.previewClusteredSource = new ol.source.Vector({
        wrapX: false,
        noWrap: true
      });

      this.clusterPreviewClusteredSource = new ol.source.Cluster({
        distance: parseInt(30, 10),
        source: this.previewClusteredSource
      });

      this.previewLayer = new ol.layer.Vector({
        source: this.previewSource,
        style: this.featuresStyle
      });

      this.previewClusteredLayer = new ol.layer.Vector({
        source: this.clusterPreviewClusteredSource,
        style: this.featuresStyle
      });
    }

  }
}
</script>

<style>
[data-aeris-catalog-map] {
    position: relative;
    height: 100%;
    background-color: #fff;
}

[data-aeris-catalog-map] .button {
  position: absolute;
  top: 2%;
  left: 2%;
}

[data-aeris-catalog-map].hidemap {
    overflow: ;
}

[data-aeris-catalog-map].showmap {
	overflow: hidden;
}


[data-aeris-catalog-map] .map-container {
    position: relative;
    height: 100%;
    opacity: 1;
    transition: 0.3s
}
[data-aeris-catalog-map] .map-container .map {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: #2D4059;
    transition: 0.3s
}
[data-aeris-catalog-map] .map-container:hover .map-coordinates {
    opacity: 1
}
[data-aeris-catalog-map] .map-container .map-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff
}
[data-aeris-catalog-map] .viewport {
    opacity: 0;
    transition: 0.6s
}
[data-aeris-catalog-map] .map.reduced {
    padding-right: 300px
}
[data-aeris-catalog-map] .map.reduced ~ .map-coordinates {
    right: 305px
}
[data-aeris-catalog-map] aeris-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    --spinner-main-color: #333
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
    transition: opacity 0.3s, transform 0.3s
}
[data-aeris-catalog-map] .feature-info-tooltip h4 {
    margin: 0
}
[data-aeris-catalog-map] .feature-info-tooltip ul {
    margin: 3px 0 0;
    padding-left: 15px
}
[data-aeris-catalog-map] .feature-info-tooltip.hidden {
    transform: scaleX(0);
    opacity: 0;
    transition: 0s
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
    text-align: center
}
 </style>
