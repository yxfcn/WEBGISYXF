///<reference path="../../../typings/typings.d.ts"/>


import parser=require("dojo/parser");
import _WidgetBase=require("dijit/_WidgetBase");
import declare=require("dojo/_base/declare");
import domConstruct=require("dojo/dom-construct");
import _TemplatedMixin=require("dijit/_TemplatedMixin");


var BusinessCard=declare("BusinessCard",[_WidgetBase,_TemplatedMixin],{
    name: "unknown",
    nameClass: "employeeName",
    phone: "unknown",

    templateString: "<div class='businessCard'>"
    + "<div>姓名: <span data-dojo-attach-point='nameNode'></span></div>"
    + "<div>电话 #: <span data-dojo-attach-point= 'phoneNode'></span></div>" + "</div>",

    attributeMap: {
        name: {
            node: "nameNode",
            type: "innerHTML"
        },
        nameClass: {
            node: "nameNode",
            type: "class"
        },
        phone: {
            node: "phoneNode",
            type: "innerHTML"
        }
    }
});

parser.parse();

export=BusinessCard;