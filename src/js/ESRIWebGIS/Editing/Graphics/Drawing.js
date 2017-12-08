define(["require", "exports", "esri/map", "esri/toolbars/draw", "esri/graphic", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "dojo/dom", "dojo/on", "esri/SpatialReference", "esri/geometry/Point"], function (require, exports, Map, Draw, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, dom, on, SpatialReference, EsriPoint) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //定义坐标系和中心点常量
    var SR = new SpatialReference({ wkid: 4490 });
    var centerPoint = new EsriPoint(121.2, 28.9, SR);
    var map, toolbar, symbol, geomTask;
    map = new Map("map", {
        center: centerPoint,
        zoom: 3,
        basemap: "streets",
        //不显示esri powered by logo
        logo: false
    });
    map.on("load", createToolbar);
    var headerNode = dom.byId("header");
    function createToolbar() {
        toolbar = new Draw(map);
        toolbar.on("draw-end", addToMap);
        on(headerNode, "click", activateTool);
    }
    function activateTool(e) {
        var tool = e.target.id.toLowerCase();
        if (tool === "header")
            return;
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
});
//# sourceMappingURL=Drawing.js.map