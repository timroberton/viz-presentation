import { __assign } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { eptCol, FIXED_COLORS } from "../colors";
import { _MOTION_TRANSITION } from "../consts";
var bw = 0;
var tr = 6;
export var Tiles = function (p) {
    return (_jsx("g", { children: p.tiles.map(function (d) {
            return (_jsxs(motion.g, __assign({ id: d.id, animate: { translateX: d.x, translateY: d.y, opacity: 1 }, initial: { translateX: d.x, translateY: d.y, opacity: 0 }, transition: _MOTION_TRANSITION }, { children: [_jsx("clipPath", __assign({ id: "timsClipPath" + d.id }, { children: _jsx(motion.rect, { rx: tr, ry: tr, animate: {
                                translateX: bw / 2,
                                translateY: bw / 2,
                                width: d.w - bw,
                                height: d.totalH - bw,
                            }, transition: _MOTION_TRANSITION }, void 0) }), void 0), _jsx(motion.rect, { clipPath: "url(#timsClipPath" + d.id + ")", animate: {
                            width: d.w,
                            height: d.totalH,
                            fill: eptCol(d.attributes.color, 100),
                        }, transition: _MOTION_TRANSITION }, void 0), _jsx(motion.rect, { clipPath: "url(#timsClipPath" + d.id + ")", animate: {
                            width: d.w,
                            height: d.headerH,
                            fill: eptCol(d.attributes.color, 200),
                        }, transition: _MOTION_TRANSITION, style: { cursor: "pointer" }, onTapStart: function (e) {
                            // I need this on onTapStart to stop propagation effectively
                            // See here ---> https://github.com/framer/motion/issues/425
                            e.stopPropagation();
                        }, onTap: function (e) {
                            p.onInteractionEvent({
                                action: "clickOnTile",
                                tileId: d.id,
                                shiftKey: e.shiftKey,
                            });
                        } }, void 0), _jsx("foreignObject", __assign({ clipPath: "url(#timsClipPath" + d.id + ")", style: {
                            pointerEvents: "none",
                            overflow: "visible",
                            width: 1,
                            height: 1,
                        } }, { children: _jsx(motion.div, __assign({ animate: {
                                width: d.w,
                                height: d.headerH,
                            }, transition: _MOTION_TRANSITION, style: {
                                fontSize: 14,
                                fontWeight: 700,
                                color: FIXED_COLORS.TILE_TEXT,
                                lineHeight: 1.2,
                                textAlign: "left",
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingTop: 10,
                                paddingBottom: 10,
                                hyphens: "none",
                                boxSizing: "border-box",
                            } }, { children: d.name }), void 0) }), void 0), _jsx(motion.rect, { rx: tr, ry: tr, fill: "transparent", style: { pointerEvents: "none" }, animate: {
                            translateX: bw / 2,
                            translateY: bw / 2,
                            width: d.w - bw,
                            height: d.totalH - bw,
                        }, transition: _MOTION_TRANSITION, stroke: p.selectedItemIds.includes(d.id)
                            ? FIXED_COLORS.BORDER_SELECTED
                            : "transparent", strokeWidth: p.selectedItemIds.includes(d.id) ? 5 : bw }, void 0)] }), d.id));
        }) }, void 0));
};
//# sourceMappingURL=tiles.js.map