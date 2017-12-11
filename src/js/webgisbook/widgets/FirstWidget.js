define(["require", "exports", "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/parser", "dojo/text!./templates/FirstWidgetTemplate.html"], function (require, exports, declare, _WidgetBase, _TemplatedMixin, parser, template) {
    "use strict";
    console.log("come in");
    var FirstWidget = declare("FirstWidget", [_WidgetBase, _TemplatedMixin], {
        i: 0,
        name: "",
        age: "",
        constructor: function () {
            this.i = 30;
            console.log("Inside Constructor,i=" + this.i);
        },
        templateString: template,
        postMixInProperties: function () {
            this.i = 20;
            console.log("Inside postMixInProperties,i=" + this.i);
        },
        /*buildRendering:function(){
            console.log ("Inside buildRendering");
            /!*this.domNode = domConstruct.create("button",
                {innerHTML: "I am Button!!"});*!/
        },*/
        _setNameAttr: function (name) {
            this.name = name;
        },
        _setAgeAttr: function (age) {
            this.age = age;
        },
        /*postCreate : function(){
            console.log("Name : " + this.name);
            console.log("Age : " + this.age);
        },*/
        startup: function () {
            console.log("Inside SatrtUp");
        },
        mouseOver: function () {
            console.log('mouseover');
        }
    });
    parser.parse();
    return FirstWidget;
});
//# sourceMappingURL=FirstWidget.js.map