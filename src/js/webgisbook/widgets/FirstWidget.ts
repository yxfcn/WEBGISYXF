///<reference path="../../../typings/typings.d.ts"/>
import declare=require("dojo/_base/declare");
import _WidgetBase=require("dijit/_WidgetBase");
import _TemplatedMixin=require("dijit/_TemplatedMixin");
import domConstruct=require("dojo/dom-construct");
import parser = require("dojo/parser");
import template=require("dojo/text!./templates/FirstWidgetTemplate.html");
console.log("come in");
var FirstWidget=declare("FirstWidget",[_WidgetBase,_TemplatedMixin],{
    i:0,
    name:"",
    age:"",
    constructor:function(){
        this.i = 30;
        console.log ("Inside Constructor,i="+this.i);
    },
    templateString:template,
    postMixInProperties : function(){
        this.i = 20;
        console.log ("Inside postMixInProperties,i="+this.i);
    },
    /*buildRendering:function(){
        console.log ("Inside buildRendering");
        /!*this.domNode = domConstruct.create("button",
            {innerHTML: "I am Button!!"});*!/
    },*/
    _setNameAttr : function(name){
        this.name = name;
    },
    _setAgeAttr : function(age){
        this.age = age;
    },
    /*postCreate : function(){
        console.log("Name : " + this.name);
        console.log("Age : " + this.age);
    },*/
    startup : function(){
        console.log ("Inside SatrtUp");
    },
    mouseOver: function () {
        console.log('mouseover');
    }
});

parser.parse();

export =FirstWidget;


