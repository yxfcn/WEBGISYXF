///<reference path="../../../typings/typings.d.ts"/>

import parser=require("dojo/parser");
import _WidgetBase=require("dijit/_WidgetBase");
import declare=require("dojo/_base/declare");
import domConstruct = require("dojo/dom-construct");


var MyFirstBehavioralWidget=declare("MyFirstBehavioralWidget",_WidgetBase,{
    constructor: function(param,srcNode) {
        // 创建该小部件的DOM树
        // this.domNode = domConstruct.create("button", { innerHTML: "提交" });
        console.log("Here is the constructor function");
    }
});

parser.parse();

export=MyFirstBehavioralWidget;