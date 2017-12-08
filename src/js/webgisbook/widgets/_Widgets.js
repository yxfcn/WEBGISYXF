///<reference path="../../../typings/typings.d.ts"/>
define(["require", "exports", "dijit/_WidgetBase", "dojo/_base/declare", "dijit/_TemplatedMixin", "dijit/_Container"], function (require, exports, _WidgetBase, declare, _TemplatedMixin, _Container) {
    "use strict";
    var _Widget = declare("_Widget", [_WidgetBase, _TemplatedMixin, _Container], {
        constructor: function (/*Objects*/ params) {
        },
        mapId: "",
        map: null,
        title: "",
        icon: "",
        state: "maximized",
        setId: function (/*Number*/ id) {
            this.mapId = id;
        },
        setTitle: function (/*String*/ title) {
            this.title = title;
        },
        setIcon: function (/*String*/ icon) {
            this.icon = icon;
        },
        setState: function (/*String*/ state) {
            this.state = state;
        },
        setMap: function (/*esri.Map*/ map) {
            this.map = map;
        }
    });
    return _Widget;
});
//# sourceMappingURL=_Widgets.js.map