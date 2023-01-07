import { __assign } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { ViewType } from "../types";
import { _MOTION_TRANSITION } from "../consts";
import { eptCol, FIXED_COLORS } from "../colors";
export var Indicators = function (p) {
    var bw = 2;
    var br = p.viewType === ViewType.ModelAndIndicators ? 6 : 0;
    return (_jsx("g", { children: p.indicators.map(function (d) {
            return (_jsxs(motion.g, __assign({ id: d.id, style: { cursor: "pointer" }, animate: { translateX: d.x, translateY: d.y, opacity: 1 }, initial: { translateX: d.x, translateY: d.y, opacity: 0 }, transition: _MOTION_TRANSITION, onPanStart: function (e, pi) { return p.ud.onPanStart(e, pi, d); }, onPan: p.ud.onPan, onPanEnd: p.ud.onPanEnd, onTapStart: function (e) {
                    // I need this on onTapStart to stop propagation effectively
                    // See here ---> https://github.com/framer/motion/issues/425
                    e.stopPropagation();
                }, onTap: function (e) {
                    // if (e.shiftKey) {
                    //   p.us.selectAnotherItem(d);
                    // } else {
                    //   p.us.selectSingleItem(d);
                    // }
                } }, { children: [_jsx("clipPath", __assign({ id: "timsClipPath" + d.id }, { children: _jsx(motion.rect, { rx: br, ry: br, animate: {
                                translateX: bw / 2,
                                translateY: bw / 2,
                                width: d.w - bw,
                                height: d.h - bw,
                            }, transition: _MOTION_TRANSITION }, void 0) }), void 0), _jsx(motion.rect, { clipPath: "url(#timsClipPath" + d.id + ")", animate: {
                            width: d.w,
                            height: d.h,
                            fill: d.id === p.ud.hitItemId
                                ? eptCol("red", 200)
                                : eptCol("gray", 100),
                        }, transition: _MOTION_TRANSITION }, void 0), _jsx("foreignObject", __assign({ clipPath: "url(#timsClipPath" + d.id + ")", style: {
                            pointerEvents: "none",
                            overflow: "visible",
                            width: 1,
                            height: 1,
                        } }, { children: _jsxs(motion.div, __assign({ animate: {
                                width: d.w,
                                height: d.h,
                                fontSize: p.viewType === ViewType.ModelAndIndicators
                                    ? "10px"
                                    : "14px",
                            }, transition: _MOTION_TRANSITION, style: {
                                lineHeight: 1.2,
                                fontWeight: 400,
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingTop: 10,
                                paddingBottom: 10,
                                hyphens: "none",
                                boxSizing: "border-box",
                                color: FIXED_COLORS.INDICATOR_TEXT1,
                            } }, { children: [d.name, p.viewType === ViewType.ModelAndIndicators && (_jsx(motion.div, __assign({ animate: { opacity: 1 }, initial: { opacity: 0 }, transition: _MOTION_TRANSITION, style: {
                                        fontSize: 10,
                                        marginTop: 5,
                                        color: FIXED_COLORS.INDICATOR_TEXT2,
                                    } }, { children: d.subHeader }), void 0))] }), void 0) }), void 0), _jsx(motion.rect, { fill: "transparent", animate: {
                            translateX: bw / 2,
                            translateY: bw / 2,
                            width: d.w - bw,
                            height: d.h - bw,
                            stroke: p.selectedItemIds.includes(d.id)
                                ? FIXED_COLORS.BORDER_SELECTED
                                : p.viewType === ViewType.ModelAndIndicators
                                    ? eptCol("gray", 700)
                                    : FIXED_COLORS.INDICATOR_BORDER,
                            rx: br,
                            ry: br,
                        }, transition: _MOTION_TRANSITION, style: { pointerEvents: "none" }, strokeWidth: p.selectedItemIds.includes(d.id) ? 5 : bw }, void 0)] }), d.id));
        }) }, void 0));
};
//# sourceMappingURL=indicators.js.map