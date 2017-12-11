///<reference path="../../typings/typings.d.ts"/>
import parser=require("dojo/parser");

import win=require("dojo/_base/window");
import domStyle=require("dojo/dom-style");
import Map=require("esri/map");
import ArcGISTiledMapServiceLayer=require("esri/layers/ArcGISTiledMapServiceLayer");
import _BaseWidget=require("./widgets/_BaseWidget");
import MoveableWidgetFrame=require("./widgets/MoveableWidgetFrame");



        parser.parse();

        var map = new Map("mapDiv");
        var agoServiceURL = "http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer";
        var agoLayer = new ArcGISTiledMapServiceLayer(agoServiceURL, { displayLevels: [0, 1, 2, 3, 4, 5, 6, 7] });
        map.addLayer(agoLayer);

        var tocWidget = new _BaseWidget();
        tocWidget.setTitle("小部件测试");
        tocWidget.setMap(map);
        tocWidget.startup();

        var frame = new MoveableWidgetFrame();
        frame.setWidget(tocWidget);
        domStyle.set(frame.domNode, "top", "100px");
        domStyle.set(frame.domNode, "left", "100px");
        frame.placeAt(win.body());
        frame.startup();