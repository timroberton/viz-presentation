import { motion } from "framer-motion";
import React from "react";
import { eptCol, FIXED_COLORS } from "../colors";
import { _MOTION_TRANSITION } from "../consts";
import { InteractionEvent, PresentationNode } from "../types";
import { UseDragging } from "../use_dragging";

type NodesProps = {
  nodes: PresentationNode[];
  ud: UseDragging;
  onInteractionEvent: (v: InteractionEvent) => void;
  selectedItemIds: string[];
};

const bw = 3;
const br = 6;

export const Nodes: React.FC<NodesProps> = (p) => {
  return (
    <g>
      {p.nodes.map((d) => {
        return (
          <motion.g
            key={d.id}
            id={d.id}
            style={{ cursor: "pointer" }}
            animate={{ translateX: d.x, translateY: d.y, opacity: 1 }}
            initial={{ translateX: d.x, translateY: d.y, opacity: 0 }}
            transition={_MOTION_TRANSITION}
            onPanStart={(e, pi) => p.ud.onPanStart(e, pi, d)}
            onPan={p.ud.onPan}
            onPanEnd={p.ud.onPanEnd}
            onTapStart={(e) => {
              // I need this on onTapStart to stop propagation effectively
              // See here ---> https://github.com/framer/motion/issues/425
              e.stopPropagation();
            }}
            onTap={(e) => {
              p.onInteractionEvent({
                action: "clickOnNode",
                nodeId: d.id,
                shiftKey: e.shiftKey,
              });
            }}
          >
            <clipPath id={"timsClipPath" + d.id}>
              <motion.rect
                rx={br}
                ry={br}
                animate={{
                  translateX: bw / 2,
                  translateY: bw / 2,
                  width: d.w - bw,
                  height: d.h - bw,
                }}
                transition={_MOTION_TRANSITION}
              />
            </clipPath>
            <motion.rect
              clipPath={`url(#timsClipPath${d.id})`}
              animate={{
                width: d.w,
                height: d.h,
              }}
              fill={
                d.id === p.ud.hitItemId
                  ? eptCol("red", 200)
                  : eptCol(d.attributes.color, 200)
              }
              transition={_MOTION_TRANSITION}
            />
            <foreignObject
              clipPath={`url(#timsClipPath${d.id})`}
              style={{
                pointerEvents: "none",
                overflow: "visible",
                width: 1,
                height: 1,
              }}
            >
              <motion.div
                animate={{
                  width: d.w,
                  height: d.h,
                }}
                transition={_MOTION_TRANSITION}
                style={{
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
                }}
              >
                <div>{d.name}</div>
                {/* <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={_MOTION_TRANSITION}
                  style={{
                    fontSize: 10,
                    marginTop: 5,
                    color: FIXED_COLORS.NODE_TEXT2,
                  }}
                >
                  {d.subHeader}
                </motion.div> */}
              </motion.div>
            </foreignObject>
            <motion.rect
              rx={br}
              ry={br}
              fill={"transparent"}
              animate={{
                translateX: bw / 2,
                translateY: bw / 2,
                width: d.w - bw,
                height: d.h - bw,
              }}
              transition={_MOTION_TRANSITION}
              stroke={
                p.selectedItemIds.includes(d.id)
                  ? FIXED_COLORS.BORDER_SELECTED
                  : FIXED_COLORS.NODE_BORDER
              }
              strokeWidth={p.selectedItemIds.includes(d.id) ? 5 : bw}
              style={{ pointerEvents: "none" }}
            />
          </motion.g>
        );
      })}
    </g>
  );
};
