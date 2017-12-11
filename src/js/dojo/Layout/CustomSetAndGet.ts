
///<reference path="../../../typings/typings.d.ts"/>


import parser=require("dojo/parser");
import _WidgetBase=require("dijit/_WidgetBase");
import declare=require("dojo/_base/declare");
import domConstruct=require("dojo/dom-construct");
import _TemplatedMixin=require("dijit/_TemplatedMixin");
import domStyle = require("dojo/dom-style");


var CustomSetAndGet=declare("CustomSetAndGet",[_WidgetBase],{
    // 参数
    open: true,
    constructor:function(){
        this.open=true;
        console.log("Here is the constructor function");
    },
    _setOpenAttr: function(/*Boolean*/ open) {
        this.open = open;
        if(open == true) {
            domStyle.set(this.domNode, "display", "block");
        } else {
            domStyle.set(this.domNode, "display", "none");
        }
    }
});




parser.parse();

export=CustomSetAndGet;