define(["require", "exports", "esri/config", "dojo/parser", "esri/tasks/GeometryService", "esri/map", "esri/layers/FeatureLayer", "dojo/_base/array", "esri/toolbars/edit", "dojo/_base/event", "esri/toolbars/draw", "esri/dijit/editing/TemplatePicker", "dojo/_base/lang", "esri/graphic"], function (require, exports, esriConfig, parser, GeometryService, Map, FeatureLayer, arrayUtils, Edit, event, Draw, TemplatePicker, lang, Graphic) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //解析页面元素
    parser.parse();
    //使用代理
    esriConfig.defaults.io.proxyUrl = "/proxy/";
    //配置几何服务
    esriConfig.defaults.geometryService = new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
    //创建地图，设置地图中心和缩放等级
    var map = new Map("map", {
        basemap: "streets",
        center: [-83.244, 42.581],
        zoom: 15
    });
    //监听地图事件：地图图层加载完成后，初始化Edit
    map.on("layers-add-result", initEditing);
    //初始化点、线、面图层
    var landusePointLayer = new FeatureLayer("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Military/FeatureServer/6", {
        mode: FeatureLayer.MODE_SNAPSHOT,
        outFields: ["*"]
    });
    var landuseLineLayer = new FeatureLayer("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Military/FeatureServer/8", {
        mode: FeatureLayer.MODE_SNAPSHOT,
        outFields: ["*"]
    });
    var landusePolygonLayer = new FeatureLayer("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Military/FeatureServer/9", {
        mode: FeatureLayer.MODE_SNAPSHOT,
        outFields: ["*"]
    });
    //添加图层
    map.addLayers([landusePointLayer, landuseLineLayer, landusePolygonLayer]);
    //响应地图事件
    function initEditing(evt) {
        //打印初始化日志："layers-add-result"事件对象
        console.log("initEditing", evt); //evt包含了layers和target两个属性的值的对象，这两个值都是对象数组
        var currentLayer = null;
        //对事件中的每个图层进行处理
        var layers = arrayUtils.map(evt.layers, function (result) {
            console.log("result", result);
            return result.layer;
        });
        console.log("layers", layers);
        //创建一个编辑工具条
        var editToolbar = new Edit(map);
        //为编辑工具条添加事件响应：禁用工具条时的触发函数
        editToolbar.on("deactivate", function (evt) {
            //工具条禁用时，执行当前图层的applyEdits函数。
            currentLayer.applyEdits(null, [evt.graphic], null);
        });
        //对于每个图层，添加双击事件的响应函数
        arrayUtils.forEach(layers, function (layer) {
            var editingEnabled = false;
            layer.on("dbl-click", function (evt) {
                //终止事件冒泡
                event.stop(evt);
                //启用编辑工具条
                if (editingEnabled === false) {
                    editingEnabled = true;
                    editToolbar.activate(Edit.EDIT_VERTICES, evt.graphic);
                }
                else {
                    //设置当前图层
                    currentLayer = this;
                    //禁用编辑工具条
                    editToolbar.deactivate();
                    editingEnabled = false;
                }
            });
            //添加单击事件响应
            layer.on("click", function (evt) {
                //终止冒泡
                event.stop(evt);
                if (evt.ctrlKey === true || evt.metaKey === true) {
                    layer.applyEdits(null, null, [evt.graphic]);
                    currentLayer = this;
                    editToolbar.deactivate();
                    editingEnabled = false;
                }
            });
            /* layer.on("click", function(evt) {
                 event.stop(evt);
                 if (evt.ctrlKey === true || evt.metaKey === true) {  //delete feature if ctrl key is depressed
                     layer.applyEdits(null,null,[evt.graphic]);
                     currentLayer = this;
                     editToolbar.deactivate();
                     editingEnabled=false;
                 }
             });*/
        });
        //模板
        var templatePicker = new TemplatePicker({
            featureLayers: layers,
            rows: "auto",
            columns: 2,
            grouping: true,
            style: "height: auto; overflow: auto;"
        }, "templatePickerDiv");
        templatePicker.startup();
        //绘制工具条
        var drawToolbar = new Draw(map);
        var selectedTemplate;
        //添加事件响应
        templatePicker.on("selection-change", function () {
            if (templatePicker.getSelected()) {
                selectedTemplate = templatePicker.getSelected();
            }
            switch (selectedTemplate.featureLayer.geometryType) {
                case "esriGeometryPoint":
                    drawToolbar.activate(Draw.POINT);
                    break;
                case "esriGeometryPolyline":
                    drawToolbar.activate(Draw.POLYLINE);
                    break;
                case "esriGeometryPolygon":
                    drawToolbar.activate(Draw.POLYGON);
                    break;
            }
        });
        drawToolbar.on("draw-end", function (evt) {
            drawToolbar.deactivate();
            editToolbar.deactivate();
            var newAttributes = lang.mixin({}, selectedTemplate.template.prototype.attributes);
            var newGraphic = new Graphic(evt.geometry, null, newAttributes);
            selectedTemplate.featureLayer.applyEdits([newGraphic], null, null);
        });
    }
});
//# sourceMappingURL=EditWithoutEditor.js.map