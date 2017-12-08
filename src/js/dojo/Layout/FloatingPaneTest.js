define(["require", "exports", "dojo/parser", "dojo/dom-construct", "dojo/dom", "dojo/on", "dojo/_base/window", "dojox/layout/FloatingPane"], function (require, exports, parser, domConstruct, dom, on, win, FloatingPane) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    parser.parse();
    console.log("Hi, I'm coming");
    var relBtn = dom.byId("relBtn");
    function makeAboutBox() {
        var floaterDiv = domConstruct.create("div");
        win.body().appendChild(floaterDiv);
        floaterDiv.appendChild(domConstruct.create("br"));
        var textArea = domConstruct.create("div");
        textArea.innerHTML = "loading......";
        floaterDiv.appendChild(textArea);
        var tmp = new FloatingPane({
            title: "<b>about this application</b>",
            id: "aboutBox",
            closable: true,
            resizable: true,
            dockable: true,
            resizeAxis: 'xy',
            style: "top:100px;left:100px;z-index:500;background-color:blue;"
        }, floaterDiv);
        tmp.startup();
        tmp.resize({
            w: 350,
            h: 200
        });
        //tmp.show();
    }
    on(relBtn, "click", function () {
        makeAboutBox();
    });
});
//# sourceMappingURL=FloatingPaneTest.js.map