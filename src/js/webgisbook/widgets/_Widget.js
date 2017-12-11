///<reference path="../../../typings/typings.d.ts"/>
define(["require", "exports", "dijit/_WidgetBase", "dojo/_base/declare"], function (require, exports, _WidgetBase, declare) {
    "use strict";
    var _Widget = declare("_Widget", [_WidgetBase], {
        constructor: function (/*Object*/ params) {
            //this.inherited(arguments);
        },
        mapId: "",
        map: null,
        title: "",
        icon: "",
        state: "maximized",
        _setMapIdAttr: function (mapId) {
            this.mapId = mapId;
        },
        _getMapIdAttr: function () {
            return this.mapId;
        },
        _setTitleAttr: function (attr) {
            this.title = attr;
        },
        _getTitleAttr: function () {
            return this.title;
        },
        _setIconAttr: function (icon) {
            this.icon = icon;
        },
        _getIconAttr: function () {
            return this.icon;
        },
        setId: function (/*Number*/ id) {
            this.id = id;
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
//# sourceMappingURL=_Widget.js.map