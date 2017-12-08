///<reference path="../../../typings/typings.d.ts"/>
define(["require", "exports", "dojo/parser", "dijit/_WidgetBase", "dojo/_base/declare", "dojo/dom-construct"], function (require, exports, parser, _WidgetBase, declare, domConstruct) {
    "use strict";
    var MyFirstWidget = declare("MyFirstWidget", _WidgetBase, {
        _i: 0,
        buildRendering: function () {
            //创建该小部件的DOM树
            this.domNode = domConstruct.create("button", { innerHTML: this._i });
        },
        postCreate: function () {
            //用户每单击一次按钮，计数器加1
            this.connect(this.domNode, "onclick", "increment");
        },
        increment: function () {
            this.domNode.innerHTML = ++this._i;
        }
    });
    parser.parse();
    return MyFirstWidget;
});
//# sourceMappingURL=NonBehavioralWidget.js.map