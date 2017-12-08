define(["require", "exports", "dojo/parser", "esri/map", "esri/layers/ArcGISTiledMapServiceLayer"], function (require, exports, parser, Map, ArcGISTiledMapServiceLayer) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    parser.parse();
    var map = new Map("mapDiv");
    var agoServiceURL = "http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer";
    var agoLayer = new ArcGISTiledMapServiceLayer(agoServiceURL, { displayLevels: [0, 1, 2, 3, 4, 5, 6, 7] });
    map.addLayer(agoLayer);
});
//# sourceMappingURL=BorderContainerTest.js.map