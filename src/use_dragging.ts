import { PanInfo } from "framer-motion";
import { MutableRefObject, useRef, useState } from "react";
import {
  DraggablePresentationItem,
  HitArea,
  InteractionEvent,
  ItemType,
  PresentationModel,
  PresentationNode,
} from "./types";

export type UseDragging = {
  isShiftDragging: boolean;
  isCtrlDragging: boolean;

  onPanStart: (
    e: MouseEvent | TouchEvent | PointerEvent,
    pointInfo: PanInfo,
    d: DraggablePresentationItem
  ) => void;
  onPan: (
    e: MouseEvent | TouchEvent | PointerEvent,
    pointInfo: PanInfo
  ) => void;
  onPanEnd: () => void;

  hitItemId: string;
  hitArea: HitArea | null;

  // svgRef: MutableRefObject<SVGSVGElement | null>,
  arrowRef: MutableRefObject<SVGPathElement | null>;
  rectRef: MutableRefObject<SVGRectElement | null>;
};

export function useDragging(
  //   ups: UsePlanSpecific,
  pm: PresentationModel | null,
  getGoodCoords: (pi: PanInfo) => {
    x: number;
    y: number;
  },
  onInteractionEvent: (v: InteractionEvent) => void
): UseDragging {
  const nodes = pm?.nodes ?? [];
  const indicators = pm?.indicators ?? [];
  // const dataSources = pm?.dataSources ?? [];
  const hitAreas = pm?.hitAreas ?? [];

  const [isShiftDragging, setIsShiftDragging] =
    useState<DraggablePresentationItem | null>(null);
  const [isCtrlDragging, setIsCtrlDragging] = useState<PresentationNode | null>(
    null
  );
  const [hitItem, setHitItem] = useState<DraggablePresentationItem | null>(
    null
  );
  const [hitArea, setHitArea] = useState<HitArea | null>(null);

  // For dragging arrow
  const arrowRef = useRef<SVGPathElement | null>(null);
  const arrowStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // For dragging rect
  const rectRef = useRef<SVGRectElement | null>(null);
  const rectDims = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  function onPanStart(
    e: MouseEvent | TouchEvent | PointerEvent,
    pointInfo: PanInfo,
    d: DraggablePresentationItem
  ): void {
    if (!pm || !arrowRef.current || !rectRef.current) {
      return;
    }
    if (e.shiftKey) {
      if (d.itemType === ItemType.Indicator) {
        arrowStart.current.x = d.x + d.w - 2;
        arrowStart.current.y = d.y + d.h / 2;
      } else {
        arrowStart.current.x = d.x + d.w / 2;
        arrowStart.current.y = d.y + d.h / 2;
      }
      arrowRef.current.setAttribute(
        "d",
        `M ${arrowStart.current.x},${arrowStart.current.y} L ${arrowStart.current.x},${arrowStart.current.y}`
      );
      setIsShiftDragging(d);
      return;
    }
    if ((e.ctrlKey || e.altKey || e.metaKey) && d.itemType === ItemType.Node) {
      rectDims.current.w = d.w;
      rectDims.current.h = d.h;
      const { x, y } = getGoodCoords(pointInfo);
      rectRef.current.setAttribute("x", x - rectDims.current.w / 2 + "px");
      rectRef.current.setAttribute("y", y - rectDims.current.h / 2 + "px");
      rectRef.current.setAttribute("width", rectDims.current.w + "px");
      rectRef.current.setAttribute("height", rectDims.current.h + "px");
      setIsCtrlDragging(d);
      return;
    }
  }

  function onPan(
    e: MouseEvent | TouchEvent | PointerEvent,
    pointInfo: PanInfo
  ): void {
    if (!pm || !arrowRef.current || !rectRef.current) {
      return;
    }
    if (isShiftDragging) {
      const { x, y } = getGoodCoords(pointInfo);
      // Check if hitting node
      if (
        isShiftDragging.itemType === ItemType.Node ||
        isShiftDragging.itemType === ItemType.Indicator
      ) {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          if (
            isShiftDragging.id !== n.id &&
            x > n.x &&
            x < n.x + n.w &&
            y > n.y &&
            y < n.y + n.h
          ) {
            if (!hitItem || hitItem.id !== n.id) {
              arrowRef.current.setAttribute(
                "d",
                `M ${arrowStart.current.x},${arrowStart.current.y} L ${
                  n.x + n.w / 2
                },${n.y + n.h / 2}`
              );
              setHitItem(n);
            }
            return;
          }
        }
      }
      // Check if hitting indicator
      if (
        isShiftDragging.itemType === ItemType.Node ||
        isShiftDragging.itemType === ItemType.DataSource
      ) {
        for (let i = 0; i < indicators.length; i++) {
          const n = indicators[i];
          if (x > n.x && x < n.x + n.w && y > n.y && y < n.y + n.h) {
            if (!hitItem || hitItem.id !== n.id) {
              arrowRef.current.setAttribute(
                "d",
                `M ${arrowStart.current.x},${arrowStart.current.y} L ${
                  n.x + n.w / 2
                },${n.y + n.h / 2}`
              );
              setHitItem(n);
            }
            return;
          }
        }
      }
      if (hitItem !== null) {
        setHitItem(null);
      }
      arrowRef.current.setAttribute(
        "d",
        `M ${arrowStart.current.x},${arrowStart.current.y} L ${x},${y}`
      );
      return;
    }
    if (isCtrlDragging) {
      const { x, y } = getGoodCoords(pointInfo);
      rectRef.current.setAttribute("x", x - rectDims.current.w / 2 + "px");
      rectRef.current.setAttribute("y", y - rectDims.current.h / 2 + "px");
      // Check if hitting hitArea
      for (let i = 0; i < hitAreas.length; i++) {
        const ha = hitAreas[i];
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

  function onPanEnd(): void {
    if (hitItem && isShiftDragging) {
      if (
        isShiftDragging.itemType === ItemType.Node &&
        hitItem.itemType === ItemType.Node
      ) {
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
    if (hitArea && isCtrlDragging) {
      onInteractionEvent({
        action: "moveNode",
        nodeId: isCtrlDragging.id,
        colIndex: hitArea.colIndex,
        newSeq: hitArea.newSeq,
        budgeType: hitArea.budgeType,
      });
    }
    setHitItem(null);
    setHitArea(null);
    setIsShiftDragging(null);
    setIsCtrlDragging(null);
  }

  return {
    isShiftDragging: !!isShiftDragging,
    isCtrlDragging: !!isCtrlDragging,

    onPanStart,
    onPan,
    onPanEnd,

    hitItemId: hitItem ? hitItem.id : "",
    hitArea,

    // svgRef,
    arrowRef,
    rectRef,
  };
}
