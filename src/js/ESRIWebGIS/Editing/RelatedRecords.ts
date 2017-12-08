///<reference path="../../../typings/typings.d.ts"/>



import esriConfig=require("esri/config");
import parser = require("dojo/parser");
import Map = require("esri/map");
import FeatureLayer = require("esri/layers/FeatureLayer");
import SimpleMarkerSymbol = require("esri/symbols/SimpleMarkerSymbol");
import Color = require("esri/Color");
import esriRequest=require("esri/request");
import Graphic = require("esri/graphic");
import RelationshipQuery = require("esri/tasks/RelationshipQuery");
import dom = require("dojo/dom");
import TemplatePicker = require("esri/dijit/editing/TemplatePicker");

console.log("Hi,I'm coming in the script");
var widget;
var selected;
var map;
var voteOnIncident;

parser.parse();
esriConfig.defaults.io.proxyUrl="/proxy/";

map=new Map("map",{
    basemap:"topo",
    center:[-122.405, 37.787],
    zoom:17
});

var incidentLayer = new FeatureLayer("https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/SanFrancisco/311Incidents/FeatureServer/0", {
    mode: FeatureLayer.MODE_ONDEMAND,
    outFields: ["*"],
    id: "incidentLayer"
});

incidentLayer.setSelectionSymbol(
    new SimpleMarkerSymbol().setColor(new Color("red"))
);

map.addLayers([incidentLayer]);
map.on("layers-add-result", initEditing);
//working around an arcgis server feature service bug.  Requests to queryRelatedRecords operation fail with feature service 10.
//Detect if request conatins the queryRelatedRecords operation and then change the source url for that request to the corresponding mapservice
esriRequest.setRequestPreCallback(function(ioArgs) {
    if (ioArgs.url.indexOf("queryRelatedRecords") !== -1) {
        ioArgs.url = ioArgs.url.replace("FeatureServer", "MapServer");
    }
    return ioArgs;
});

function initEditing(){
    map.infoWindow.resize(250,210);
    var incidentLayer=map.getLayer("incidentLayer");
    generateTemplatePicker(incidentLayer);
    map.on("click",function(evt){
        if(selected) {
            var currentDate = new Date();
            var incidentAttributes = {
                req_type: selected.template.name,
                req_date:(currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear(),
                address: "",
                district: "",
                status: 1
            };
            var incidentGraphic = new Graphic(evt.mapPoint, selected.symbol, incidentAttributes);
            incidentLayer.applyEdits([incidentGraphic],null,null);
        }
    });
    var title, content, graphicAttributes;
    var relatedQuery = new RelationshipQuery();
    relatedQuery.outFields = ["agree_with_incident"];
    relatedQuery.relationshipId = 0;

    incidentLayer.on("click", function(evt) {
        graphicAttributes = evt.graphic.attributes;
        title = graphicAttributes.req_type;
        content = "<b>Date Reported: </b>" + graphicAttributes.req_date
            + "<br><b>Address: </b>" + graphicAttributes.address
            + "<br><b>District: </b>" + graphicAttributes.district;

        relatedQuery.objectIds = [graphicAttributes.objectid];
        incidentLayer.queryRelatedFeatures(relatedQuery, function(relatedRecords) {
            var fset = relatedRecords[graphicAttributes.objectid];
            var count = (fset) ? fset.features.length : 0;

            content = content + "<br><hr><br><i><span id='numPeople'>" + count +
                "</span> people think this is important.</i>";
            content = content + "<br><br><img style='cursor:pointer' src='images/thumbsup.jpeg'  onclick='voteOnIncident(" + graphicAttributes.objectid + ");'>";
            map.infoWindow.setTitle(title);
            map.infoWindow.setContent(content);
            map.infoWindow.show(evt.screenPoint, map.getInfoWindowAnchor(evt.screenPoint));
        });
    });
}

voteOnIncident = function(objectId) {
    var voteRecord = {
        attributes: {
            sf_311_serviceoid: objectId,
            datetime: new Date().getTime(),
            agree_with_incident: 1
        }
    };
    var incidentVoteTable = new FeatureLayer("https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/SanFrancisco/311Incidents/FeatureServer/1");
    incidentVoteTable.applyEdits([voteRecord], null, null,
        function(addResults) {
            var numPeople = dom.byId("numPeople").innerHTML;
            dom.byId("numPeople").innerHTML = parseInt(numPeople, 10) + 1;
        }, function(err){
            alert(err);
        }
    );
};

function generateTemplatePicker(layer) {
    console.log("layer", layer);
    widget = new TemplatePicker({
        featureLayers: [ layer ],
        rows: layer.types.length,
        columns: 1,
        grouping: false,
        style: "width:98%;"
    }, "templatePickerDiv");

    widget.startup();

    widget.on("selection-change", function() {
        selected = widget.getSelected();
        console.log("selected", selected);
    });
}