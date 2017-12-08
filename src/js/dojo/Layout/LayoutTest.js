define(["require", "exports", "dijit/layout/BorderContainer", "dijit/layout/TabContainer", "dijit/layout/ContentPane"], function (require, exports, BorderContainer, TabContainer, ContentPane) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var appLayout = new BorderContainer({
        design: "headline"
    }, "appLayout");
    // create the TabContainer
    var contentTabs = new TabContainer({
        region: "center",
        id: "contentTabs",
        tabPosition: "bottom",
        "class": "centerPanel"
    });
    // add the TabContainer as a child of the BorderContainer
    appLayout.addChild(contentTabs);
    // create and add the BorderContainer edge regions
    appLayout.addChild(new ContentPane({
        region: "top",
        "class": "edgePanel",
        content: "Header content (top)"
    }));
    appLayout.addChild(new ContentPane({
        region: "left",
        id: "leftCol", "class": "edgePanel",
        content: "Sidebar content (left)",
        splitter: true
    }));
    // Add initial content to the TabContainer
    contentTabs.addChild(new ContentPane({
        href: "contentGroup1.html",
        title: "Group 1"
    }));
    // start up and do layout
    appLayout.startup();
});
//# sourceMappingURL=LayoutTest.js.map