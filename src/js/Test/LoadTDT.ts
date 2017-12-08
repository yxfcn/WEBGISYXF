///<reference path="../../typings/typings.d.ts"/>
import TDTLayer=require("../Tianditu/TDTLayer");
import Map=require("esri/map");
import SpatialReference=require("esri/SpatialReference");
import ArcGISDynamicMapServiceLayer = require("esri/layers/ArcGISDynamicMapServiceLayer");
import EsriPoint = require("esri/geometry/Point");
import Draw=require("esri/toolbars/draw");
import Graphic=require("esri/graphic");
import SimpleMarkerSymbol=require("esri/symbols/SimpleMarkerSymbol");
import SimpleLineSymbol=require("esri/symbols/SimpleLineSymbol");
import SimpleFillSymbol=require("esri/symbols/SimpleFillSymbol");
import dom = require("dojo/dom");
import on = require("dojo/on");

var drawBar,symbol;

//定义坐标系和中心点常量
const SR = new SpatialReference({wkid: 4490});
const centerPoint = new EsriPoint(121.2, 28.9, SR);

var map = new Map("mapDiv", {
    autoResize: true,
    center: centerPoint,
    zoom: 13,

    //不显示esri powered by logo
    logo: false
});
map.spatialReference=SR;
var tdtImgLyr = new TDTLayer();
//创建行政区划图层
var addvLayer=new ArcGISDynamicMapServiceLayer("http://60.191.132.130:6080/arcgis/rest/services/ZJ_TZ_LH_ADDV_TOWN/MapServer");

//添加天地图图层
map.addLayer(tdtImgLyr);
//添加行政区划图层
//map.addLayer(addvLayer);
console.log("tdtImg");
//map.on("load",createDrawBar);

var pointNode=dom.byId("point");
on(pointNode,"click",createDrawBar);


function createDrawBar(e){
    console.log("create tool");
    drawBar=new Draw(map);
    drawBar.on("draw-end",addToMap);
    activateTool(e);
}


function activateTool(e){
    console.log("activate tool");
    var tool=e.target.id;
    if(tool==="point"){
        map.disableMapNavigation();
        drawBar.activate(tool);
    }
}

function addToMap(e){
   var  pointSymbol=new SimpleMarkerSymbol();
    map.enableMapNavigation();
    drawBar.deactivate();
    switch (e.geometry.type){
        case "point":
            symbol=pointSymbol;

            break;
        default:
            symbol=pointSymbol;
            break;

    }
    var graphic=new Graphic(e.geometry,symbol);
    map.graphics.add(graphic);


}