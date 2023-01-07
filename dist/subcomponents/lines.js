import { __assign } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { _MOTION_TRANSITION } from "../consts";
import { eptCol } from "../colors";
export var Lines = function (_a) {
    var lines = _a.lines, viewType = _a.viewType;
    return (_jsx("g", { children: lines.map(function (d) {
            var pathData = "M " + d.x1 + "," + d.y1 + " L " + d.x2 + "," + d.y2;
            return (_jsxs(motion.g, __assign({ id: d.id }, { children: [_jsx(motion.path, { stroke: "transparent", d: pathData, strokeWidth: 10, fill: "none" }, void 0), _jsx(motion.path, { animate: { d: pathData, opacity: 1 }, initial: { d: pathData, opacity: 0 }, transition: _MOTION_TRANSITION, strokeWidth: 2, strokeMiterlimit: 10, 
                        // markerStart={viewType === ViewType.IndicatorsAndDataSources ? `url(#line-marker)` : undefined}
                        markerEnd: "url(#line-marker)", opacity: 1, fill: "none", stroke: eptCol("gray", 700) }, void 0)] }), d.id));
        }) }, void 0));
};
//# sourceMappingURL=lines.js.map