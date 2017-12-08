///<reference path="../../../typings/typings.d.ts"/>
import declare=require("dojo/_base/declare");
import array=require("dojo/_base/array");
import query=require("dojo/query");
import domAttr=require("dojo/dom-attr");
import domStyle=require("dojo/dom-style");
import on=require("dojo/on");
import lang=require("dojo/_base/lang");
import _Widget=require("./_Widgets");
import template=require("dojo/text!./templates/_BaseWidget.html");


var _BaseWidget=declare("_BaseWidget",[_Widget],{
    constructor: function(/*Object*/ params) {
        this.connects = [];
        this.widgets = {};
    },

    templateString: template,
    panels: null,
    panelIndex: -1,

    postMixInProperties: function() {
        if (this.icon === "") {
            this.icon = "assets/images/icons/i_pushpin.png";
        }
    },

    postCreate: function() {
        // »Áπ˚¥Ê‘⁄∂‡∏ˆ√Ê∞Â£¨‘Ú÷ªœ‘ æµ⁄“ª∏ˆ
        this.panels = query(".widgetPanel", this.domNode);
        this.panels.forEach(function(item, idx, arr) {
            item.buttonIcon = domAttr.get(item, "buttonIcon");
            item.buttonText = domAttr.get(item, "buttonText");
        });
        this.showPanel(0);
    },

    onShowPanel: function(index) {
        // ”…–°≤øº˛øÚº‹¿‡WidgetFrameº‡Ã˝ π”√
    },

    showPanel: function(/*Number*/index) {
        this.panelIndex = index;
        array.forEach(this.panels, function (item, idx, arr) {
            if (idx == index) {
                domStyle.set(item, "display", "block");
            }
            else {
                domStyle.set(item, "display", "none");
            }
        });
    },

    startup: function() {
        if (this._started) {
            return;
        }

        var children = this.getChildren();
        array.forEach(children, function (child) {
            child.startup();
        });

        // ”Î–°≤øº˛øÚº‹¿‡WidgetFrameΩªª•
        var frame = this.getParent();
        if (frame && frame.declaredClass === "webgis2book.widgets.WidgetFrame") {
            this.connects.push(on(this, "onShowPanel", frame, "selectPanel"));
        }

        this.inherited(arguments);
    },

    shutdown: function() {
        // ”…◊”¿‡∏≤∏«∏√∑Ω∑®£¨ µœ÷πÿ±’ ±«Â≥˝’º”√◊ ‘¥
    },

    uninitialize: function() {
        array.forEach(this.connects, function (handle) {
            handle.remove(); // dojo.disconnect(handle);
        });
        this.connects = [];
    },

    getAllNamedChildDijits: function() {
        // ªÒµ√À˘”–µƒ◊”–°≤øº˛
        var w = query("[widgetId]", this.containerNode || this.domNode);
        var children = w.map(dijit.byNode);

        this.widgets = {};
        children.forEach(lang.hitch(this, function (item, idx) {
            if (item.name) {
                this.widgets[item.name] = item;
            }
        }));
    }
})