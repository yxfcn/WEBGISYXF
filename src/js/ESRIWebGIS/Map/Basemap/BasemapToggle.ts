///<reference path="../../../../typings/typings.d.ts"/>
import Map=require("esri/map");
import BasemapToggle=require("esri/dijit/BasemapToggle");

var map= new Map("map", {
    center: [-70.6508, 43.1452],
    zoom: 16,
    basemap: "topo"
});

var toggle=new BasemapToggle({
    map:map,
    basemap: "satellite"
},"basemapToggle");

toggle.startup();