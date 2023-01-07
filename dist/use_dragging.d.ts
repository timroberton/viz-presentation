import { PanInfo } from "framer-motion";
import { MutableRefObject } from "react";
import { DraggablePresentationItem, HitArea, InteractionEvent, PresentationModel } from "./types";
export declare type UseDragging = {
    isShiftDragging: boolean;
    isCtrlDragging: boolean;
    onPanStart: (e: MouseEvent | TouchEvent | PointerEvent, pointInfo: PanInfo, d: DraggablePresentationItem) => void;
    onPan: (e: MouseEvent | TouchEvent | PointerEvent, pointInfo: PanInfo) => void;
    onPanEnd: () => void;
    hitItemId: string;
    hitArea: HitArea | null;
    arrowRef: MutableRefObject<SVGPathElement | null>;
    rectRef: MutableRefObject<SVGRectElement | null>;
};
export declare function useDragging(pm: PresentationModel | null, getGoodCoords: (pi: PanInfo) => {
    x: number;
    y: number;
}, onInteractionEvent: (v: InteractionEvent) => void): UseDragging;
//# sourceMappingURL=use_dragging.d.ts.map