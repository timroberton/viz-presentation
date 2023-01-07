import { __assign } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { eptCol, FIXED_COLORS } from "../colors";
import { _MOTION_TRANSITION } from "../consts";
var bw = 3;
var br = 6;
export var Nodes = function (p) {
    return (_jsx("g", { children: p.nodes.map(function (d) {
            return (_jsxs(motion.g, __assign({ id: d.id, style: { cursor: "pointer" }, animate: { translateX: d.x, translateY: d.y, opacity: 1 }, initial: { translateX: d.x, translateY: d.y, opacity: 0 }, transition: _MOTION_TRANSITION, onPanStart: function (e, pi) { return p.ud.onPanStart(e, pi, d); }, onPan: p.ud.onPan, onPanEnd: p.ud.onPanEnd, onTapStart: function (e) {
                    // I need this on onTapStart to stop propagation effectively
                    // See here ---> https://github.com/framer/motion/issues/425
                    e.stopPropagation();
                }, onTap: function (e) {
                    p.onInteractionEvent({
                        action: "clickOnNode",
                        nodeId: d.id,
                        shiftKey: e.shiftKey,
                    });
                } }, { children: [_jsx("clipPath", __assign({ id: "timsClipPath" + d.id }, { children: _jsx(motion.rect, { rx: br, ry: br, animate: {
                                translateX: bw / 2,
                                translateY: bw / 2,
                                width: d.w - bw,
                                height: d.h - bw,
                            }, transition: _MOTION_TRANSITION }, void 0) }), void 0), _jsx(motion.rect, { clipPath: "url(#timsClipPath" + d.id + ")", animate: {
                            width: d.w,
                            height: d.h,
                        }, fill: d.id === p.ud.hitItemId
                            ? eptCol("red", 200)
                            : eptCol(d.attributes.color, 200), transition: _MOTION_TRANSITION }, void 0), _jsx("foreignObject", __assign({ clipPath: "url(#timsClipPath" + d.id + ")", style: {
                            pointerEvents: "none",
                            overflow: "visible",
                            width: 1,
                            height: 1,
                        } }, { children: _jsx(motion.div, __assign({ animate: {
                                width: d.w,
                                height: d.h,
                            }, transition: _MOTION_TRANSITION, style: {
                                lineHeight: 1.2,
                                fontWeight: 400,
                                fontSize: 18,
                                paddingLeft: 12,
                                paddingRight: 12,
                                paddingTop: 12,
                                paddingBottom: 12,
                                hyphens: "none",
                                boxSizing: "border-box",
                                color: FIXED_COLORS.NODE_TEXT1,
                            } }, { children: _jsx("div", { children: d.name }, void 0) }), void 0) }), void 0), _jsx(motion.rect, { rx: br, ry: br, fill: "transparent", animate: {
                            translateX: bw / 2,
                            translateY: bw / 2,
                            width: d.w - bw,
                            height: d.h - bw,
                        }, transition: _MOTION_TRANSITION, stroke: p.selectedItemIds.includes(d.id)
                            ? FIXED_COLORS.BORDER_SELECTED
                            : FIXED_COLORS.NODE_BORDER, strokeWidth: p.selectedItemIds.includes(d.id) ? 5 : bw, style: { pointerEvents: "none" } }, void 0)] }), d.id));
        }) }, void 0));
};
//# sourceMappingURL=nodes.js.map