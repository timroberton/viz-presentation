import { __assign } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { eptCol } from "../colors";
import { _MOTION_TRANSITION } from "../consts";
export var Edges = function (p) {
    return (_jsx("g", { children: p.edges.map(function (d) {
            return (_jsxs(motion.g, __assign({ id: d.fr + "--" + d.to, style: { cursor: "pointer" }, stroke: p.selectedItemIds.includes(d.id)
                    ? eptCol("purple", 700)
                    : eptCol("gray", 700), onTapStart: function (e) {
                    // I need this on onTapStart to stop propagation effectively
                    // See here ---> https://github.com/framer/motion/issues/425
                    e.stopPropagation();
                }, onTap: function (e) {
                    p.onInteractionEvent({
                        action: "clickOnEdge",
                        edgeId: d.id,
                        shiftKey: e.shiftKey,
                    });
                } }, { children: [_jsx("marker", __assign({ id: d.fr + "--" + d.to + "arrow-marker", viewBox: "-1 -1 8 12", refX: 3, refY: 5, orient: "auto" }, { children: _jsx("path", { d: "M 0,0 L 5,5 L 0,10", strokeWidth: 3, strokeLinejoin: "miter", strokeMiterlimit: 10, fill: "none" }, void 0) }), d.fr + "--" + d.to + "arrow-marker"), _jsx(motion.path, { stroke: "transparent", d: d.pathData, strokeWidth: 10, fill: "none" }, void 0), _jsx(motion.path, { animate: { d: d.pathData, opacity: 1 }, initial: { d: d.pathData, opacity: 0 }, transition: _MOTION_TRANSITION, strokeWidth: 3, strokeMiterlimit: 10, opacity: 1, fill: "none", markerEnd: "url(#" + (d.fr + "--" + d.to) + "arrow-marker" }, void 0)] }), d.fr + "--" + d.to));
        }) }, void 0));
};
//# sourceMappingURL=edges.js.map