///<reference path="../../../typings/typings.d.ts"/>
define(["require", "exports", "dojo/parser", "dijit/_WidgetBase", "dojo/_base/declare"], function (require, exports, parser, _WidgetBase, declare) {
    "use strict";
    var MyFirstBehavioralWidget = declare("MyFirstBehavioralWidget", _WidgetBase, {
        constructor: function (param, srcNode) {
            // 创建该小部件的DOM树
            // this.domNode = domConstruct.create("button", { innerHTML: "提交" });
            console.log("Here is the constructor function");
        }
    });
    parser.parse();
    return MyFirstBehavioralWidget;
});
//# sourceMappingURL=BehavioralWidget.js.map