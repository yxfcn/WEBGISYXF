///<reference path="../../../typings/typings.d.ts"/>


import _WidgetBase=require("dijit/_WidgetBase");
import declare=require("dojo/_base/declare");
import domConstruct=require("dojo/dom-construct");
import _TemplatedMixin=require("dijit/_TemplatedMixin");
import _Container = require("dijit/_Container");

var _Widget=declare("_Widget",[_WidgetBase,_TemplatedMixin,_Container],{
    constructor:function (/*Objects*/params) {

    },

    mapId:"",
    map:null,
    title:"",
    icon:"",
    state:"maximized",
    setId:function (/*Number*/id) {
        this.mapId=id;
    },
    setTitle:function (/*String*/title) {
        this.title=title;
    },
    setIcon:function (/*String*/icon) {
        this.icon=icon;
    },
    setState:function (/*String*/state) {
        this.state=state;
    },
    setMap:function (/*esri.Map*/map) {
        this.map=map;
    }
});
export =_Widget;