///<reference path="../../../typings/typings.d.ts"/>


import parser = require("dojo/parser");
import domStyle = require("dojo/dom-style");
import registry = require("dijit/registry");
import Map = require("esri/map");
import SimpleFillSymbol = require("esri/symbols/SimpleFillSymbol");
import SimpleLineSymbol = require("esri/symbols/SimpleLineSymbol");
import TextSymbol = require("esri/symbols/TextSymbol");
import Polyline=require("esri/geometry/Polyline");
import Polygon = require("esri/geometry/Polygon");
import Point = require("esri/geometry/Point");
import Graphic = require("esri/graphic");
import event=require("dojo/_base/event");
import Edit = require("esri/toolbars/edit");
import dom=require("dojo/dom");
import Menu=require("dijit/Menu");
import ToggleButton=require("dijit/form/ToggleButton");
import DropDownButton=require("dijit/form/DropDownButton");
//import CheckedMenuItem=require("dijit/CheckedMenuItem");
import BorderContainer=require("dijit/layout/BorderContainer");
import ContentPane=require("dijit/layout/ContentPane");



var now=new Date();
var map, editToolbar;
console.log("日志： 时间:"+ now.toLocaleString()+", 进入脚本文件.\n");

console.log("日志： 时间:"+ now.toLocaleString()+", 解析页面dojo声明式组件.\n");
parser.parse();

console.log("日志： 时间:"+ now.toLocaleString()+", 设置组件样式：显示mainWindow.\n");
domStyle.set(dom.byId("mainWindow"),"visibility", "visible");


console.log("日志： 时间:"+ now.toLocaleString()+", 创建地图对象.\n");

 map=new Map("map",{
    basemap:"streets",
    center:[3.955,59.338],
    zoom:3
});


console.log("日志： 时间:"+ now.toLocaleString()+", 添加地图加载事件'load'的响应函数crateToolBar.\n");
map.on("load",createToolBar);


function addGraphics() {
    console.log("日志： 时间:"+ now.toLocaleString()+", 进入addGraphics函数，添加图形.\n");
    console.log("日志： 时间:"+ now.toLocaleString()+", 创建面状符号样式.\n");
    var polygonSymbol=new SimpleFillSymbol();
    console.log("日志： 时间:"+ now.toLocaleString()+", 创建线状符号样式.\n");
    var polylineSymbol=new SimpleLineSymbol();

    console.log("日志： 时间:"+ now.toLocaleString()+", 创建字体样式'Editable Text'.\n");
    var text=new TextSymbol("Editable Text")
    console.log("日志： 时间:"+ now.toLocaleString()+", 设置字体大小20pt.\n");
    text.font.setSize("20pt");


    console.log("日志： 时间:"+ now.toLocaleString()+", 创建一条坐标系wkid为102100的线段.\n");

    var polyline=new Polyline({
        "paths":[
            [-12484306,7244028],
            [-7318386,10061803],
            [-3013453,10727111]
        ],
        "spatialReference":{
            "wkid":102100
        }
    });
    console.log("日志： 时间:"+ now.toLocaleString()+", 创建一条坐标系相同,类型为rings的面.\n");

    var polygon = new Polygon({
        "rings": [
            [
                [-4226661, 8496372],
                [-3835304, 8731187],
                [-2269873, 9005137],
                [-1213208, 8613780],
                [-1017529, 8065879],
                [-1213208, 7478843],
                [-2230738, 6891806],
                [-2935181, 6735263],
                [-3522218, 6891806],
                [-3952711, 7165757],
                [-4265797, 7283164],
                [-4304933, 7635386],
                [-4304933, 7674521],
                [-4226661, 8496372]
            ]
        ],
        "spatialReference": {
            "wkid": 102100
        }
    });

    console.log("日志： 时间:"+ now.toLocaleString()+", 创建一条坐标系相同,类型为rings的arrow.\n");

    var arrow = new Polygon({
        "rings": [
            [
                [9862211, 6617856],
                [8922952, 5522055],
                [8922952, 5991684],
                [6105178, 5991684],
                [6105178, 7087485],
                [8922952, 7087485],
                [8922952, 7557114],
                [9862211, 6617856]
            ]
        ],
        "spatialReference": {
            "wkid": 102100
        }
    });
    console.log("日志： 时间:"+ now.toLocaleString()+", 创建一条坐标系相同,类型为rings的triangle.\n");

    var triangle = new Polygon({
        "rings": [
            [
                [2426417, 8535508],
                [4304933, 12292541],
                [6183449, 8535508],
                [2426417, 8535508]
            ]
        ],
        "spatialReference": {
            "wkid": 102100
        }
    });
    console.log("日志： 时间:"+ now.toLocaleString()+", 创建一个点.\n");

    var point=new Point(-40,35);

    console.log("日志： 时间:"+ now.toLocaleString()+", 把以上创建的图形添加到地图上去.\n");
    console.log("日志： 时间:"+ now.toLocaleString()+", map.graphics.add(new Graphic(polyline,polylineSymbol)).\n");
    map.graphics.add(new Graphic(polyline,polylineSymbol))

    console.log("日志： 时间:"+ now.toLocaleString()+", map.graphics.add(new Graphic(polygon, polygonSymbol)）.\n");
    map.graphics.add(new Graphic(polygon, polygonSymbol));

    console.log("日志： 时间:"+ now.toLocaleString()+", map.graphics.add(new Graphic(arrow, polygonSymbol)).\n");
    map.graphics.add(new Graphic(arrow, polygonSymbol));

    console.log("日志： 时间:"+ now.toLocaleString()+", map.graphics.add(new Graphic(triangle, polygonSymbol)).\n");
    map.graphics.add(new Graphic(triangle, polygonSymbol));

    console.log("日志： 时间:"+ now.toLocaleString()+", map.graphics.add(new Graphic(point, text)).\n");
    map.graphics.add(new Graphic(point, text));

}

function createToolBar() {
    console.log("日志： 时间:"+ now.toLocaleString()+", 响应地图'load'事件.\n");
    addGraphics();

    console.log("日志： 时间:"+ now.toLocaleString()+", 创建编辑工具条\n");
    editToolbar=new Edit(map);

    console.log("日志： 时间:"+ now.toLocaleString()+", 添加地图graphics的单击事件监听函数，在点击图形时，激活工具\n");
    map.graphics.on("click",function(evt){
        event.stop(evt);
        activateToolbar(evt.graphic);
    });

    console.log("日志： 时间:"+ now.toLocaleString()+", 添加地图的单击事件监听函数，在点击图形时，不激活工具\n");
    map.on("click", function(evt){
        editToolbar.deactivate();
    });

}


function activateToolbar(graphic) {
    console.log("日志： 时间:"+ now.toLocaleString()+", 激活工具\n");

    var tool = 0;

    console.log("日志： 时间:"+ now.toLocaleString()+", 检查激活的工具命令\n");

    if (registry.byId("tool_move").checked) {
        console.log("日志： 时间:"+ now.toLocaleString()+", 激活的移动工具\n");

        tool = tool | Edit.MOVE;
    }
    if (registry.byId("tool_vertices").checked) {
        console.log("日志： 时间:"+ now.toLocaleString()+", 激活的节点编辑工具\n");

        tool = tool | Edit.EDIT_VERTICES;
    }
    if (registry.byId("tool_scale").checked) {
        console.log("日志： 时间:"+ now.toLocaleString()+", 激活的缩放工具\n");

        tool = tool | Edit.SCALE;
    }
    if (registry.byId("tool_rotate").checked) {
        console.log("日志： 时间:"+ now.toLocaleString()+", 激活的旋转工具\n");

        tool = tool | Edit.ROTATE;
    }
    // enable text editing if a graphic uses a text symbol
    if ( graphic.symbol.declaredClass === "esri.symbol.TextSymbol" ) {
        console.log("日志： 时间:"+ now.toLocaleString()+", 激活的文字编辑工具\n");

        tool = tool | Edit.EDIT_TEXT;
    }
    //specify toolbar options
    var options = {
        allowAddVertices: registry.byId("vtx_ca").checked,
        allowDeleteVertices: registry.byId("vtx_cd").checked,
        uniformScaling: registry.byId("uniform_scaling").checked
    };
    editToolbar.activate(tool, graphic, options);
}

