///<reference path="../../../typings/typings.d.ts"/>
define(["require", "exports", "dojo/parser", "dijit/_WidgetBase", "dojo/_base/declare", "dojo/dom-style"], function (require, exports, parser, _WidgetBase, declare, domStyle) {
    "use strict";
    var CustomSetAndGet = declare("CustomSetAndGet", [_WidgetBase], {
        // 参数
        open: true,
        constructor: function () {
            this.open = true;
            console.log("Here is the constructor function");
        },
        _setOpenAttr: function (/*Boolean*/ open) {
            this.open = open;
            if (open == true) {
                domStyle.set(this.domNode, "display", "block");
            }
            else {
                domStyle.set(this.domNode, "display", "none");
            }
        }
    });
    parser.parse();
    return CustomSetAndGet;
});
//# sourceMappingURL=CustomSetAndGet.js.map