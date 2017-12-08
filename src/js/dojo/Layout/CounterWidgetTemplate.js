///<reference path="../../../typings/typings.d.ts"/>
define(["require", "exports", "dojo/parser", "dijit/_WidgetBase", "dojo/_base/declare", "dijit/_TemplatedMixin"], function (require, exports, parser, _WidgetBase, declare, _TemplatedMixin) {
    "use strict";
    var CounterWidgetTemplate = declare("CounterWidgetTemplate", [_WidgetBase, _TemplatedMixin], {
        _i: 0,
        templateString: "<div>" + "<button data-dojo-attach-event='onclick:increment'>增加计数</button> "
            + "&nbsp;当前计数：<span data-dojo-attach-point='CounterWidgetTemplate'>0</span>"
            + "</div>",
        increment: function () {
            this.CounterWidgetTemplate.innerHTML = ++this._i;
            console.log(this._i);
        }
    });
    parser.parse();
    return CounterWidgetTemplate;
});
//# sourceMappingURL=CounterWidgetTemplate.js.map