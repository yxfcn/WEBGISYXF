define(["require", "exports", "esri/map", "esri/dijit/BasemapToggle"], function (require, exports, Map, BasemapToggle) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var map = new Map("map", {
        center: [-70.6508, 43.1452],
        zoom: 16,
        basemap: "topo"
    });
    var toggle = new BasemapToggle({
        map: map,
        basemap: "satellite"
    }, "basemapToggle");
    toggle.startup();
});
//# sourceMappingURL=BasemapToggle.js.map