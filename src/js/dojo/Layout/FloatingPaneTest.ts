///<reference path="../../../typings/typings.d.ts"/>
import parser=require("dojo/parser");
import domConstruct=require("dojo/dom-construct");
import dom=require("dojo/dom");
import on=require("dojo/on");
import win=require("dojo/_base/window");
import domStyle=require("dojo/dom-style");
import FloatingPane=require("dojox/layout/FloatingPane");
import text = require("dojo/text");

parser.parse();



console.log("Hi, I'm coming");

var relBtn=dom.byId("relBtn");

function makeAboutBox() {
    var floaterDiv=domConstruct.create("div");
    win.body().appendChild(floaterDiv);
    floaterDiv.appendChild(domConstruct.create("br"));

    var textArea=domConstruct.create("div");

    textArea.innerHTML="loading......";

    floaterDiv.appendChild(textArea);

    var tmp=new FloatingPane({
       title:"<b>about this application</b>",
       id:"aboutBox",
       closable:true,
       resizable:true,
       dockable:true,
       resizeAxis:'xy',
       style:"top:100px;left:100px;z-index:500;background-color:blue;"
    },
        floaterDiv);

    tmp.startup();
    tmp.resize({
        w:350,
        h:200
    });
    //tmp.show();
}

on(relBtn,"click",function(){
   makeAboutBox();
});