import { __assign } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { eptCol } from "./colors";
import { Edges } from "./subcomponents/edges";
import { Nodes } from "./subcomponents/nodes";
import { SVG } from "./subcomponents/svg";
import { Tiles } from "./subcomponents/tiles";
import { useDragging } from "./use_dragging";
import { useGetGoodCoords } from "./use_get_good_coords";
export var VizPresentation = function (p) {
    var pm = p.pm;
    // const us = useSelection(ViewType.Model);
    var _a = useGetGoodCoords(), getGoodCoords = _a.getGoodCoords, svgRef = _a.svgRef;
    var ud = useDragging(pm, getGoodCoords, p.onInteractionEvent);
    // const upz = usePanZoom(getGoodCoords, _MOTION_TRANSITION_FOR_PAN_ZOOM);
    if (!pm) {
        return _jsx("div", __assign({ className: "" }, { children: "No plan" }), void 0);
    }
    return (_jsxs(SVG, __assign({ idForDownload: "ept-component-1", svgRef: svgRef, modelBounds: pm.bounds, onInteractionEvent: p.onInteractionEvent }, { children: [_jsx(Tiles, { tiles: pm.tiles, onInteractionEvent: p.onInteractionEvent, selectedItemIds: p.selectedItemIds }, void 0), _jsx("marker", __assign({ id: "newnode-arrow-marker", viewBox: "-1 -1 8 12", refX: 3, refY: 5, orient: "auto" }, { children: _jsx("path", { d: "M 0,0 L 5,5 L 0,10", stroke: "#000", strokeWidth: 3, strokeLinejoin: "miter", strokeMiterlimit: 10, fill: "none" }, void 0) }), void 0), _jsx("path", { ref: ud.arrowRef, style: { display: ud.isShiftDragging ? "block" : "none" }, d: "M 0,0 L 0,0", strokeWidth: 3, stroke: "#000", fill: "none" }, void 0), _jsx(Edges, { edges: pm.edges, onInteractionEvent: p.onInteractionEvent, selectedItemIds: p.selectedItemIds }, void 0), _jsx(Nodes, { nodes: pm.nodes, onInteractionEvent: p.onInteractionEvent, selectedItemIds: p.selectedItemIds, ud: ud }, void 0), ud.hitArea && (_jsx("rect", { id: "hit-area-rect", fill: eptCol("gray", 700), width: ud.hitArea.w, height: ud.hitArea.h, x: ud.hitArea.x, y: ud.hitArea.y, opacity: 0.4 }, "hit-area-rect")), _jsx("rect", { id: "drag-area-rect", ref: ud.rectRef, style: { display: ud.isCtrlDragging ? "block" : "none" }, fill: eptCol("gray", 700), rx: 3, ry: 3, opacity: 0.8 }, "drag-area-rect")] }), void 0));
};
//# sourceMappingURL=viz_presentation.js.map