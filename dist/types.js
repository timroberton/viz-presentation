export var ViewType;
(function (ViewType) {
    ViewType[ViewType["Model"] = 0] = "Model";
    ViewType[ViewType["ModelAndIndicators"] = 1] = "ModelAndIndicators";
    ViewType[ViewType["IndicatorsAndDataSources"] = 2] = "IndicatorsAndDataSources";
    ViewType[ViewType["Timeline"] = 3] = "Timeline";
})(ViewType || (ViewType = {}));
export var ItemType;
(function (ItemType) {
    ItemType["Node"] = "node";
    ItemType["Edge"] = "edge";
    ItemType["Tile"] = "tile";
    ItemType["Indicator"] = "indicator";
    ItemType["DataSource"] = "dataSource";
})(ItemType || (ItemType = {}));
export var IndicatorPosition;
(function (IndicatorPosition) {
    IndicatorPosition["auto"] = "auto";
    IndicatorPosition["top"] = "top";
    IndicatorPosition["bottom"] = "bottom";
    IndicatorPosition["left"] = "left";
    IndicatorPosition["right"] = "right";
})(IndicatorPosition || (IndicatorPosition = {}));
//# sourceMappingURL=types.js.map