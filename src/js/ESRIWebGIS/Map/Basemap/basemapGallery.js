define(["require", "exports", "esri/map", "esri/dijit/BasemapGallery", "dojo/parser"], function (require, exports, Map, BasemapGallery, parser) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    parser.parse();
    var map = new Map("map", {
        basemap: "topo",
        center: [120, 29],
        zoom: 13
    });
    //add the basemap gallery, in this case we'll display maps from ArcGIS.com including bing maps
    var basemapGallery = new BasemapGallery({
        showArcGISBasemaps: true,
        map: map
    }, "basemapGallery");
    basemapGallery.startup();
    basemapGallery.on("error", function (msg) {
        console.log("basemap gallery error: ", msg);
    });
});
//# sourceMappingURL=basemapGallery.js.map