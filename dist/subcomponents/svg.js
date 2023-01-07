import { __assign } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { eptCol } from "../colors";
import { _MOTION_TRANSITION } from "../consts";
var svgMargin = 20;
export var SVG = function (p) {
    var _a = p.modelBounds, xMin = _a.xMin, xMax = _a.xMax, yMin = _a.yMin, yMax = _a.yMax;
    return (_jsx(motion.svg, __assign({ ref: p.svgRef, id: p.idForDownload, shapeRendering: "geometricPrecision", animate: { viewBox: createViewBox(xMin, xMax, yMin, yMax) }, transition: _MOTION_TRANSITION, style: {
            display: "block",
            margin: 0,
            padding: 0,
            height: "100%",
            width: "100%",
            boxSizing: "border-box",
            userSelect: "none",
        }, onTap: function () {
            p.onInteractionEvent({ action: "clickOnSVG" });
        } }, { children: _jsxs("g", __assign({ transform: "translate(0,0) scale(1)" }, { children: [_jsx("marker", __assign({ id: "line-marker", viewBox: "0 0 10 10", refX: "5", refY: "5", markerWidth: "3.5", markerHeight: "3.5" }, { children: _jsx("circle", { cx: "5", cy: "5", r: "5", fill: eptCol("gray", 700) }, void 0) }), "line-marker"), _jsx(motion.g
                // style={p.upz.gStyle}
                , { children: p.children }, void 0)] }), void 0) }), void 0));
};
function createViewBox(xMin, xMax, yMin, yMax) {
    var width = xMax - xMin + 2 * svgMargin;
    var height = yMax - yMin + 2 * svgMargin;
    return xMin - svgMargin + " " + (yMin - svgMargin) + " " + width + " " + height;
}
//# sourceMappingURL=svg.js.map