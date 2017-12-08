///<reference path="../../typings/typings.d.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "esri/layers/TiledMapServiceLayer", "esri/SpatialReference", "esri/layers/TileInfo", "esri/geometry/Extent"], function (require, exports, TiledMapServiceLayer, SpatialReference, TileInfo, Extent) {
    "use strict";
    var cornerCoordinate = 20037508.3427892;
    //GCS2000的坐标系wkid
    var GCS2000 = 4490;
    var WGS84 = 4326;
    var TDTLayer = (function (_super) {
        __extends(TDTLayer, _super);
        function TDTLayer(type, baseAnnoName, typeMatrixSet) {
            if (type === void 0) { type = "img"; }
            if (baseAnnoName === void 0) { baseAnnoName = ""; }
            if (typeMatrixSet === void 0) { typeMatrixSet = "c"; }
            var _this = 
            //调用TiledMapServiceLayer的构造函数
            _super.call(this) || this;
            //标识地图类型
            _this._type = ""; //"ano","img","vec","ter"
            _this._baseAnnoName = ""; //"cva","cia","cta"
            _this._typeMatrixSet = ""; //"c","w"
            //将标识图像类型（标注、电子地图、卫星影像、地形图）的参数传递给扩展的地图类型
            _this._type = type;
            _this._baseAnnoName = baseAnnoName;
            _this._typeMatrixSet = typeMatrixSet;
            //不同切片矩阵的坐标系不一样
            _this.spatialReference = typeMatrixSet == 'w' ? new SpatialReference({ wkid: 102100 }) : new SpatialReference({ wkid: GCS2000 });
            //不同切片矩阵的地图范围不同
            var extent = typeMatrixSet == 'w' ? new Extent(-cornerCoordinate, -cornerCoordinate, cornerCoordinate, cornerCoordinate, _this.spatialReference) : new Extent(-180, -90, 180, 90, _this.spatialReference);
            //定义初始化范围
            _this.initialExtent = (_this.fullExtent = extent);
            //定义天地图切片信息
            _this.tileInfo = new TileInfo({
                rows: 256,
                cols: 256,
                dpi: 90.71428571428571,
                //dpi:96,
                origin: {
                    x: -180,
                    y: 90
                },
                spatialReference: { wkid: 4490 },
                lods: [
                    { "level": 1, "resolution": 0.7031249999891485, "scale": 2.958293554545656E8 },
                    { "level": 2, "resolution": 0.35156249999999994, "scale": 1.479146777272828E8 },
                    { "level": 3, "resolution": 0.17578124999999997, "scale": 7.39573388636414E7 },
                    { "level": 4, "resolution": 0.08789062500000014, "scale": 3.69786694318207E7 },
                    { "level": 5, "resolution": 0.04394531250000007, "scale": 1.848933471591035E7 },
                    { "level": 6, "resolution": 0.021972656250000007, "scale": 9244667.357955175 },
                    { "level": 7, "resolution": 0.01098632812500002, "scale": 4622333.678977588 },
                    { "level": 8, "resolution": 0.00549316406250001, "scale": 2311166.839488794 },
                    { "level": 9, "resolution": 0.0027465820312500017, "scale": 1155583.419744397 },
                    { "level": 10, "resolution": 0.0013732910156250009, "scale": 577791.7098721985 },
                    { "level": 11, "resolution": 0.000686645507812499, "scale": 288895.85493609926 },
                    { "level": 12, "resolution": 0.0003433227539062495, "scale": 144447.92746804963 },
                    { "level": 13, "resolution": 0.00017166137695312503, "scale": 72223.96373402482 },
                    { "level": 14, "resolution": 0.00008583068847656251, "scale": 36111.98186701241 },
                    { "level": 15, "resolution": 0.000042915344238281406, "scale": 18055.990933506204 },
                    { "level": 16, "resolution": 0.000021457672119140645, "scale": 9027.995466753102 },
                    { "level": 17, "resolution": 0.000010728836059570307, "scale": 4513.997733376551 },
                    { "level": 18, "resolution": 0.000005364418029785169, "scale": 2256.998866688275 },
                    { "level": 19, "resolution": 2.68220901485e-6, "scale": 1128.499433344138 },
                    { "level": 20, "resolution": 1.341104507425e-6, "scale": 564.2497166720688 }
                ]
            });
            _this.loaded = true;
            _this.onLoad(_this);
            return _this;
        }
        TDTLayer.prototype.getTileUrl = function (level, row, col) {
            var tileUrl;
            // 地图和注记图层的tileUrl分别用变量来设置，
            // 是为了在切换地图的时候，正常显示底图和注记
            if (this._type == "ano") {
                tileUrl = "http://t" + col % 8 + ".tianditu.com/" + this._baseAnnoName + "_" + this._typeMatrixSet + "/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=" + this._baseAnnoName + "&STYLE=default&TILEMATRIXSET=" + this._typeMatrixSet + "&TILEMATRIX=" + level + "&TILEROW=" + row + "&TILECOL=" + col + "&FORMAT=tiles";
            }
            else {
                tileUrl = "http://t" + col % 8 + ".tianditu.com/" + this._type + "_" + this._typeMatrixSet + "/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=" + this._type + "&STYLE=default&TILEMATRIXSET=" + this._typeMatrixSet + "&TILEMATRIX=" + level + "&TILEROW=" + row + "&TILECOL=" + col + "&FORMAT=tiles";
            }
            return tileUrl;
        };
        return TDTLayer;
    }(TiledMapServiceLayer));
    return TDTLayer;
});
//# sourceMappingURL=TDTLayer.js.map