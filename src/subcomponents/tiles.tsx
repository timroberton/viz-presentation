import { motion } from "framer-motion";
import React from "react";
import { eptCol, FIXED_COLORS } from "../colors";
import { _MOTION_TRANSITION } from "../consts";
import { InteractionEvent, PresentationTile } from "../types";

type TilesProps = {
  tiles: PresentationTile[];
  onInteractionEvent: (v: InteractionEvent) => void;
  selectedItemIds: string[];
};

const bw = 0;
const tr = 6;

export const Tiles: React.FC<TilesProps> = (p) => {
  return (
    <g>
      {p.tiles.map((d) => {
        return (
          <motion.g
            key={d.id}
            id={d.id}
            animate={{ translateX: d.x, translateY: d.y, opacity: 1 }}
            initial={{ translateX: d.x, translateY: d.y, opacity: 0 }}
            transition={_MOTION_TRANSITION}
          >
            <clipPath id={"timsClipPath" + d.id}>
              <motion.rect
                rx={tr}
                ry={tr}
                animate={{
                  translateX: bw / 2,
                  translateY: bw / 2,
                  width: d.w - bw,
                  height: d.totalH - bw,
                }}
                transition={_MOTION_TRANSITION}
              />
            </clipPath>
            <motion.rect
              clipPath={`url(#timsClipPath${d.id})`}
              animate={{
                width: d.w,
                height: d.totalH,
                fill: eptCol(d.attributes.color, 100),
              }}
              transition={_MOTION_TRANSITION}
            />
            <motion.rect
              clipPath={`url(#timsClipPath${d.id})`}
              animate={{
                width: d.w,
                height: d.headerH,
                fill: eptCol(d.attributes.color, 200),
              }}
              transition={_MOTION_TRANSITION}
              style={{ cursor: "pointer" }}
              onTapStart={(e: MouseEvent) => {
                // I need this on onTapStart to stop propagation effectively
                // See here ---> https://github.com/framer/motion/issues/425
                e.stopPropagation();
              }}
              onTap={(e: MouseEvent) => {
                p.onInteractionEvent({
                  action: "clickOnTile",
                  tileId: d.id,
                  shiftKey: e.shiftKey,
                });
              }}
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
                  height: d.headerH,
                }}
                transition={_MOTION_TRANSITION}
                style={{
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
                }}
              >
                {d.name}
              </motion.div>
            </foreignObject>
            <motion.rect
              rx={tr}
              ry={tr}
              fill={"transparent"}
              style={{ pointerEvents: "none" }}
              animate={{
                translateX: bw / 2,
                translateY: bw / 2,
                width: d.w - bw,
                height: d.totalH - bw,
              }}
              transition={_MOTION_TRANSITION}
              stroke={
                p.selectedItemIds.includes(d.id)
                  ? FIXED_COLORS.BORDER_SELECTED
                  : "transparent"
              }
              strokeWidth={p.selectedItemIds.includes(d.id) ? 5 : bw}
              // strokeDasharray={interpolate([dash0, dash1], (dash0: number, dash1: number) => `${dash0},${dash1}`)}
            />
          </motion.g>
        );
      })}
    </g>
  );
};
