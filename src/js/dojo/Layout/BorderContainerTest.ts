///<reference path="../../../typings/typings.d.ts"/>
import parser=require("dojo/parser");

import Map = require("esri/map");
import ArcGISTiledMapServiceLayer = require("esri/layers/ArcGISTiledMapServiceLayer");


parser.parse();

var map = new Map("mapDiv");
var agoServiceURL = "http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer";
var agoLayer = new ArcGISTiledMapServiceLayer(agoServiceURL, { displayLevels: [0, 1, 2, 3, 4, 5, 6, 7] });
map.addLayer(agoLayer);