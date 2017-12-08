///<reference path="../../../typings/typings.d.ts"/>
define(["require", "exports", "dojo/parser", "dijit/_WidgetBase", "dojo/_base/declare", "dijit/_TemplatedMixin"], function (require, exports, parser, _WidgetBase, declare, _TemplatedMixin) {
    "use strict";
    var BusinessCard = declare("BusinessCard", [_WidgetBase, _TemplatedMixin], {
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
    return BusinessCard;
});
//# sourceMappingURL=BusinessCard.js.map