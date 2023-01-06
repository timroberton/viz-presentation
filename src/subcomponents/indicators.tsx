import React from "react";
import { motion } from "framer-motion";
import { InteractionEvent, PresentationIndicator, ViewType } from "../types";
import { _MOTION_TRANSITION } from "../consts";
import { UseDragging } from "../use_dragging";
import { eptCol, FIXED_COLORS } from "../colors";

type IndicatorsProps = {
  viewType: ViewType;
  indicators: PresentationIndicator[];
  ud: UseDragging;
  onInteractionEvent: (v: InteractionEvent) => void;
  selectedItemIds: string[];
};

export const Indicators: React.FC<IndicatorsProps> = (p) => {
  const bw = 2;
  const br = p.viewType === ViewType.ModelAndIndicators ? 6 : 0;

  return (
    <g>
      {p.indicators.map((d) => {
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
              // if (e.shiftKey) {
              //   p.us.selectAnotherItem(d);
              // } else {
              //   p.us.selectSingleItem(d);
              // }
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
                fill:
                  d.id === p.ud.hitItemId
                    ? eptCol("red", 200)
                    : eptCol("gray", 100),
              }}
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
                  fontSize:
                    p.viewType === ViewType.ModelAndIndicators
                      ? "10px"
                      : "14px",
                }}
                transition={_MOTION_TRANSITION}
                style={{
                  lineHeight: 1.2,
                  fontWeight: 400,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 10,
                  paddingBottom: 10,
                  hyphens: "none",
                  boxSizing: "border-box",
                  color: FIXED_COLORS.INDICATOR_TEXT1,
                }}
              >
                {d.name}
                {p.viewType === ViewType.ModelAndIndicators && (
                  <motion.div
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    transition={_MOTION_TRANSITION}
                    style={{
                      fontSize: 10,
                      marginTop: 5,
                      color: FIXED_COLORS.INDICATOR_TEXT2,
                    }}
                  >
                    {d.subHeader}
                  </motion.div>
                )}
              </motion.div>
            </foreignObject>
            <motion.rect
              fill={"transparent"}
              animate={{
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
              }}
              transition={_MOTION_TRANSITION}
              style={{ pointerEvents: "none" }}
              strokeWidth={p.selectedItemIds.includes(d.id) ? 5 : bw}
            />
          </motion.g>
        );
      })}
    </g>
  );
};
