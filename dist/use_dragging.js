import { useRef, useState } from "react";
import { ItemType, } from "./types";
export function useDragging(
//   ups: UsePlanSpecific,
pm, getGoodCoords, onInteractionEvent) {
    var _a, _b, _c;
    var nodes = (_a = pm === null || pm === void 0 ? void 0 : pm.nodes) !== null && _a !== void 0 ? _a : [];
    var indicators = (_b = pm === null || pm === void 0 ? void 0 : pm.indicators) !== null && _b !== void 0 ? _b : [];
    // const dataSources = pm?.dataSources ?? [];
    var hitAreas = (_c = pm === null || pm === void 0 ? void 0 : pm.hitAreas) !== null && _c !== void 0 ? _c : [];
    var _d = useState(null), isShiftDragging = _d[0], setIsShiftDragging = _d[1];
    var _e = useState(null), isCtrlDragging = _e[0], setIsCtrlDragging = _e[1];
    var _f = useState(null), hitItem = _f[0], setHitItem = _f[1];
    var _g = useState(null), hitArea = _g[0], setHitArea = _g[1];
    // For dragging arrow
    var arrowRef = useRef(null);
    var arrowStart = useRef({ x: 0, y: 0 });
    // For dragging rect
    var rectRef = useRef(null);
    var rectDims = useRef({ w: 0, h: 0 });
    function onPanStart(e, pointInfo, d) {
        if (!pm || !arrowRef.current || !rectRef.current) {
            return;
        }
        if (e.shiftKey) {
            if (d.itemType === ItemType.Indicator) {
                arrowStart.current.x = d.x + d.w - 2;
                arrowStart.current.y = d.y + d.h / 2;
            }
            else {
                arrowStart.current.x = d.x + d.w / 2;
                arrowStart.current.y = d.y + d.h / 2;
            }
            arrowRef.current.setAttribute("d", "M " + arrowStart.current.x + "," + arrowStart.current.y + " L " + arrowStart.current.x + "," + arrowStart.current.y);
            setIsShiftDragging(d);
            return;
        }
        if ((e.ctrlKey || e.altKey || e.metaKey) && d.itemType === ItemType.Node) {
            rectDims.current.w = d.w;
            rectDims.current.h = d.h;
            var _a = getGoodCoords(pointInfo), x = _a.x, y = _a.y;
            rectRef.current.setAttribute("x", x - rectDims.current.w / 2 + "px");
            rectRef.current.setAttribute("y", y - rectDims.current.h / 2 + "px");
            rectRef.current.setAttribute("width", rectDims.current.w + "px");
            rectRef.current.setAttribute("height", rectDims.current.h + "px");
            setIsCtrlDragging(d);
            return;
        }
    }
    function onPan(e, pointInfo) {
        if (!pm || !arrowRef.current || !rectRef.current) {
            return;
        }
        if (isShiftDragging) {
            var _a = getGoodCoords(pointInfo), x = _a.x, y = _a.y;
            // Check if hitting node
            if (isShiftDragging.itemType === ItemType.Node ||
                isShiftDragging.itemType === ItemType.Indicator) {
                for (var i = 0; i < nodes.length; i++) {
                    var n = nodes[i];
                    if (isShiftDragging.id !== n.id &&
                        x > n.x &&
                        x < n.x + n.w &&
                        y > n.y &&
                        y < n.y + n.h) {
                        if (!hitItem || hitItem.id !== n.id) {
                            arrowRef.current.setAttribute("d", "M " + arrowStart.current.x + "," + arrowStart.current.y + " L " + (n.x + n.w / 2) + "," + (n.y + n.h / 2));
                            setHitItem(n);
                        }
                        return;
                    }
                }
            }
            // Check if hitting indicator
            if (isShiftDragging.itemType === ItemType.Node ||
                isShiftDragging.itemType === ItemType.DataSource) {
                for (var i = 0; i < indicators.length; i++) {
                    var n = indicators[i];
                    if (x > n.x && x < n.x + n.w && y > n.y && y < n.y + n.h) {
                        if (!hitItem || hitItem.id !== n.id) {
                            arrowRef.current.setAttribute("d", "M " + arrowStart.current.x + "," + arrowStart.current.y + " L " + (n.x + n.w / 2) + "," + (n.y + n.h / 2));
                            setHitItem(n);
                        }
                        return;
                    }
                }
            }
            if (hitItem !== null) {
                setHitItem(null);
            }
            arrowRef.current.setAttribute("d", "M " + arrowStart.current.x + "," + arrowStart.current.y + " L " + x + "," + y);
            return;
        }
        if (isCtrlDragging) {
            var _b = getGoodCoords(pointInfo), x = _b.x, y = _b.y;
            rectRef.current.setAttribute("x", x - rectDims.current.w / 2 + "px");
            rectRef.current.setAttribute("y", y - rectDims.current.h / 2 + "px");
            // Check if hitting hitArea
            for (var i = 0; i < hitAreas.length; i++) {
                var ha = hitAreas[i];
                if (x > ha.x && x < ha.x + ha.w && y > ha.y && y < ha.y + ha.h) {
                    if (!hitArea || hitArea.id !== ha.id) {
                        // TODO: This is where I can prevent non self-hittable areas
                        setHitArea(ha);
                    }
                    return;
                }
            }
            if (hitArea !== null) {
                setHitArea(null);
            }
            return;
        }
    }
    function onPanEnd() {
        if (hitItem && isShiftDragging) {
            if (isShiftDragging.itemType === ItemType.Node &&
                hitItem.itemType === ItemType.Node) {
                onInteractionEvent({
                    action: "createEdge",
                    fromId: isShiftDragging.id,
                    toId: hitItem.id,
                });
            }
            // if (
            //   isShiftDragging.itemType === ItemType.Node &&
            //   hitItem.itemType === ItemType.Indicator
            // ) {
            //   ups.attemptLinkIndicatorToNode(hitItem.id, isShiftDragging.id);
            // }
            // if (
            //   isShiftDragging.itemType === ItemType.Indicator &&
            //   hitItem.itemType === ItemType.Node
            // ) {
            //   ups.attemptLinkIndicatorToNode(isShiftDragging.id, hitItem.id);
            // }
            // if (
            //   isShiftDragging.itemType === ItemType.Indicator &&
            //   hitItem.itemType === ItemType.DataSource
            // ) {
            //   ups.attemptLinkIndicatorToDataSource(isShiftDragging.id, hitItem.id);
            // }
            // if (
            //   isShiftDragging.itemType === ItemType.DataSource &&
            //   hitItem.itemType === ItemType.Indicator
            // ) {
            //   ups.attemptLinkIndicatorToDataSource(hitItem.id, isShiftDragging.id);
            // }
        }
        // if (hitArea && isCtrlDragging) {
        //   ups.attemptMoveNode(
        //     isCtrlDragging.id,
        //     hitArea.colIndex,
        //     hitArea.newSeq,
        //     hitArea.budgeType
        //   );
        // }
        setHitItem(null);
        setHitArea(null);
        setIsShiftDragging(null);
        setIsCtrlDragging(null);
    }
    return {
        isShiftDragging: !!isShiftDragging,
        isCtrlDragging: !!isCtrlDragging,
        onPanStart: onPanStart,
        onPan: onPan,
        onPanEnd: onPanEnd,
        hitItemId: hitItem ? hitItem.id : "",
        hitArea: hitArea,
        // svgRef,
        arrowRef: arrowRef,
        rectRef: rectRef,
    };
}
//# sourceMappingURL=use_dragging.js.map