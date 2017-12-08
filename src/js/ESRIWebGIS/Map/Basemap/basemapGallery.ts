///<reference path="../../../../typings/typings.d.ts"/>
import Map=require("esri/map");
import BasemapGallery=require("esri/dijit/BasemapGallery");
import utils=require("esri/arcgis/utils");
import parser=require("dojo/parser");
import BorderContainer=require("dijit/layout/BorderContainer");
import ContentPanel=require("dijit/layout/ContentPane");
import TiltlePane=require("dijit/TitlePane");


parser.parse();

var map=new Map("map",{
    basemap:"topo",
    center:[120,29],
    zoom:13
});

//add the basemap gallery, in this case we'll display maps from ArcGIS.com including bing maps
var basemapGallery=new BasemapGallery({
    showArcGISBasemaps:true,
    map:map
},"basemapGallery");

basemapGallery.startup();

basemapGallery.on("error",function(msg){
    console.log("basemap gallery error: ",msg);
});
