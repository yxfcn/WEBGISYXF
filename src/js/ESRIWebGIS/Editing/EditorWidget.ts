///<reference path="../../../typings/typings.d.ts"/>
import parser = require("dojo/parser");
import jsapiBundle=require("dojo/i18n!esri/nls/jsapi");
import esriConfig=require("esri/config");
import GeometryService = require("esri/tasks/GeometryService");
import Map=require("esri/map");
import ArcGISTiledMapServiceLayer = require("esri/layers/ArcGISTiledMapServiceLayer");
import FeatureLayer = require("esri/layers/FeatureLayer");
import arrayUtils=require("dojo/_base/array");
import TemplatePicker = require("esri/dijit/editing/TemplatePicker");
import Editor = require("esri/dijit/editing/Editor");
import SimpleMarkerSymbol = require("esri/symbols/SimpleMarkerSymbol");
import SimpleLineSymbol = require("esri/symbols/SimpleLineSymbol");
import Color = require("esri/Color");
import keys = require("dojo/keys");


var map;

parser.parse();

// snapping is enabled for this sample - change the tooltip to reflect this
//添加国际化支持
jsapiBundle.toolbars.draw.start=jsapiBundle.toolbars.draw.start+"<br>Press <b>ALT</b> to enable snapping";
// refer to "Using the Proxy Page" for more information:  https://developers.arcgis.com/javascript/3/jshelp/ags_proxy.html
esriConfig.defaults.io.proxyUrl = "/proxy/";

//This service is for development and testing purposes only. We recommend that you create your own geometry service for use within your applications.
esriConfig.defaults.geometryService = new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");

map = new Map("map", {
    basemap: "satellite",
    center: [-96.541, 38.351],
    zoom: 14,
    slider: false
});

map.on("layers-add-result",initEditor);
//add boundaries and place names
var labels = new ArcGISTiledMapServiceLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer");
map.addLayer(labels);

var responsePoints = new FeatureLayer("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/0", {
    mode: FeatureLayer.MODE_ONDEMAND,
    outFields: ['*']
});

var responsePolys = new FeatureLayer("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/2", {
    mode: FeatureLayer.MODE_ONDEMAND,
    outFields: ['*']
});

map.addLayers([responsePolys, responsePoints]);

function initEditor(evt){

    var templateLayers = arrayUtils.map(evt.layers, function(result){

        return result.layer;
    });
    var templatePicker = new TemplatePicker({
        featureLayers: templateLayers,
        grouping: true,
        rows: "auto",
        columns: 4
    }, "templateDiv");
    templatePicker.startup();

    var layers = arrayUtils.map(evt.layers, function(result) {
        return { featureLayer: result.layer };
    });

    var settings = {
        map: map,
        templatePicker: templatePicker,
        layerInfos: layers,
        toolbarVisible: true,
        createOptions: {
            polylineDrawTools:[ Editor.CREATE_TOOL_FREEHAND_POLYLINE ],
            polygonDrawTools: [ Editor.CREATE_TOOL_FREEHAND_POLYGON,
                Editor.CREATE_TOOL_CIRCLE,
                Editor.CREATE_TOOL_TRIANGLE,
                Editor.CREATE_TOOL_RECTANGLE
            ]
        },
        toolbarOptions: {
            reshapeVisible: true
        }
    };

    var params = { settings: settings };
    var myEditor = new Editor(params, 'editorDiv');

    //define snapping options
    var symbol = new SimpleMarkerSymbol(
        SimpleMarkerSymbol.STYLE_CROSS,
        15,
        new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID,
            new Color([255, 0, 0, 0.5]),
            5
        ),
        null
    );

    map.enableSnapping({
        snapPointSymbol: symbol,
        tolerance: 20,
        snapKey: keys.ALT
    });

    myEditor.startup();


}