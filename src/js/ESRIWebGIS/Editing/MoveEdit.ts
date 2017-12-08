///<reference path="../../../typings/typings.d.ts"/>

import parser = require("dojo/parser");
import esriConfig=require("esri/config");
import Map=require("esri/map");
import FeatureLayer = require("esri/layers/FeatureLayer");
import Edit = require("esri/toolbars/edit");
import Query = require("esri/tasks/query");
import event=require("dojo/_base/event");
//import TDTLayer=require("../../Tianditu/TDTLayer");
import ArcGISDynamicMapServiceLayer = require("esri/layers/ArcGISDynamicMapServiceLayer");
import SpatialReference = require("esri/SpatialReference");
import EsriPoint = require("esri/geometry/Point");



var map;



parser.parse();
esriConfig.defaults.io.proxyUrl="/proxy/";
const SR = new SpatialReference({wkid: 102100});
const centerPoint = new EsriPoint(13496486.08431000, 3358928.83260318, SR);
map = new Map("map", {
    basemap: "topo",
    center:centerPoint,
    zoom: 11
});
//var tdtImgLyr = new TDTLayer();
map.spatialReference=SR;
//map.addLayer(tdtImgLyr);
var addvLayer=new ArcGISDynamicMapServiceLayer("http://60.191.132.130:6080/arcgis/rest/services/ZJ_TZ_LH_ADDV_TOWN/MapServer");
map.addLayer(addvLayer);
console.log("地图坐标系wkid："+map.spatialReference.wkid.toString());
var firePerimeterFL = new FeatureLayer("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/2", {
    mode: FeatureLayer.MODE_ONDEMAND,
    outFields: ["*"],
    id: "firePerimeterFL"
});
map.addLayers([firePerimeterFL]);

map.on("click",function(evt){
   console.log("the current position:X="+evt.mapPoint.x+", y="+evt.mapPoint.y+", zoom="+map.getZoom());
});

map.on("layers-add-result", initEditing);
console.log("地图加载中.....");

function initEditing(evt) {
    console.log("地图加载完成");

    console.log("创建Edit对象：var editToolbar = new Edit(map)");
    var editToolbar = new Edit(map);

    console.log("标记编辑状态为不可编辑");
    var editingEnabled = false;

    console.log("添加地图要素双击响应事件");

    firePerimeterFL.on("dbl-click", function(evt) {
        console.log("地图要素被双击时触发：停止事件冒泡");

        event.stop(evt);
        if (editingEnabled) {
            console.log("如果可编辑，则修改编辑状态标记为禁止编辑，禁用工具条，清除选择集");
            editingEnabled = false;
            editToolbar.deactivate();
            firePerimeterFL.clearSelection();
        }
        else {
            console.log("如果不可编辑，则修改编辑状态标记为可编辑，启用工具条，开始编辑所选要素的节点");
            editingEnabled = true;
            editToolbar.activate(Edit.EDIT_VERTICES, evt.graphic);
            // select the feature to prevent it from being updated by map navigation
            console.log("新建查询，查询所选要素的objectIds:"+[evt.graphic.attributes[firePerimeterFL.objectIdField]].toString());

            var query = new Query();

            query.objectIds = [evt.graphic.attributes[firePerimeterFL.objectIdField]];
            firePerimeterFL.selectFeatures(query);
        }
    });

    console.log("添加工具条禁用事件");
    editToolbar.on("deactivate", function(evt) {
        console.log("在工具条禁用时触发：evt.info.isModified:"+evt.info.isModified);

        if (evt.info.isModified) {
            console.log("在工具条禁用时触发：evt.info.isModified如果为true，则更新编辑内容");

            firePerimeterFL.applyEdits(null, [evt.graphic], null);
        }
    });
}

