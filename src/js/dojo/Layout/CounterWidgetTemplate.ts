///<reference path="../../../typings/typings.d.ts"/>


import parser=require("dojo/parser");
import _WidgetBase=require("dijit/_WidgetBase");
import declare=require("dojo/_base/declare");
import domConstruct=require("dojo/dom-construct");
import _TemplatedMixin=require("dijit/_TemplatedMixin");


var CounterWidgetTemplate=declare("CounterWidgetTemplate",[_WidgetBase,_TemplatedMixin],{
    _i:0,
    templateString:"<div>"+"<button data-dojo-attach-event='onclick:increment'>增加计数</button> "
    +"&nbsp;当前计数：<span data-dojo-attach-point='CounterWidgetTemplate'>0</span>"
    +"</div>",
    increment:function () {
        this.CounterWidgetTemplate.innerHTML=++this._i;
        console.log(this._i);
    }
});

parser.parse();
export = CounterWidgetTemplate;

