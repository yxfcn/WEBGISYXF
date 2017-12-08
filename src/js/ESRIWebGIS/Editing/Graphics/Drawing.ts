///<reference path="../../../../typings/typings.d.ts"/>
import Map=require("esri/map");
import Draw=require("esri/toolbars/draw");
import Graphic=require("esri/graphic");
import SimpleMarkerSymbol=require("esri/symbols/SimpleMarkerSymbol");
import SimpleLineSymbol=require("esri/symbols/SimpleLineSymbol");
import SimpleFillSymbol=require("esri/symbols/SimpleFillSymbol");
import dom = require("dojo/dom");
import on = require("dojo/on");
import TDTLayer=require("../../../Tianditu/TDTLayer");
import SpatialReference=require("esri/SpatialReference");
import EsriPoint = require("esri/geometry/Point");



//定义坐标系和中心点常量
const SR = new SpatialReference({wkid: 4490});
const centerPoint = new EsriPoint(121.2, 28.9, SR);

var map, toolbar, symbol, geomTask;



map = new Map("map",{
    center: centerPoint,
    zoom: 3,
    basemap:"streets",

    //不显示esri powered by logo
    logo: false
});



map.on("load", createToolbar);



var headerNode=dom.byId("header");


function createToolbar() {
    toolbar = new Draw(map);
    toolbar.on("draw-end", addToMap);
    on(headerNode,"click",activateTool);
}

function activateTool(e) {
    var tool=e.target.id.toLowerCase();
    if(tool==="header") return;
    map.disableMapNavigation();
    toolbar.activate(tool);
    map.hideZoomSlider();
}



function addToMap(evt) {
    //var symbol;
    toolbar.deactivate();
    map.enableMapNavigation();
    map.showZoomSlider();
    switch (evt.geometry.type) {
        case "point":
        case "multipoint":
            symbol = new SimpleMarkerSymbol();
            break;
        case "polyline":
            symbol = new SimpleLineSymbol();
            break;
        case "polygon":
            symbol = new SimpleLineSymbol();
            break;
        default:
            symbol = new SimpleFillSymbol();
            break;
    }
    var graphic = new Graphic(evt.geometry, symbol);
    map.graphics.add(graphic);
}