///<reference path="../../../typings/typings.d.ts"/>

import parser=require("dojo/parser");
import _WidgetBase=require("dijit/_WidgetBase");
import declare=require("dojo/_base/declare");
import domConstruct=require("dojo/dom-construct");




var MyFirstWidget=declare("MyFirstWidget",_WidgetBase,{
    _i:0,
    buildRendering:function(){
        //创建该小部件的DOM树
        this.domNode=domConstruct.create("button",{innerHTML:this._i});
    },

    postCreate:function(){
        //用户每单击一次按钮，计数器加1
        this.connect(this.domNode,"onclick","increment");
    },
    increment:function () {
        this.domNode.innerHTML=++this._i;
    }
});

export =MyFirstWidget;

parser.parse();