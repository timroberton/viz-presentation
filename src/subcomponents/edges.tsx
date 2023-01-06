import { motion } from "framer-motion";
import React from "react";
import { eptCol } from "../colors";
import { _MOTION_TRANSITION } from "../consts";
import { InteractionEvent, PresentationEdge } from "../types";

type EdgesProps = {
  edges: PresentationEdge[];
  onInteractionEvent: (v: InteractionEvent) => void;
  selectedItemIds: string[];
};

export const Edges: React.FC<EdgesProps> = (p) => {
  return (
    <g>
      {p.edges.map((d) => {
        return (
          <motion.g
            id={d.fr + "--" + d.to}
            key={d.fr + "--" + d.to}
            style={{ cursor: "pointer" }}
            stroke={
              p.selectedItemIds.includes(d.id)
                ? eptCol("purple", 700)
                : eptCol("gray", 700)
            }
            onTapStart={(e) => {
              // I need this on onTapStart to stop propagation effectively
              // See here ---> https://github.com/framer/motion/issues/425
              e.stopPropagation();
            }}
            onTap={(e) => {
              p.onInteractionEvent({
                action: "clickOnEdge",
                edgeId: d.id,
                shiftKey: e.shiftKey,
              });
            }}
          >
            <marker
              key={d.fr + "--" + d.to + "arrow-marker"}
              id={d.fr + "--" + d.to + `arrow-marker`}
              viewBox="-1 -1 8 12"
              refX={3}
              refY={5}
              orient="auto"
            >
              <path
                d="M 0,0 L 5,5 L 0,10"
                strokeWidth={3}
                strokeLinejoin={"miter"}
                strokeMiterlimit={10}
                fill={`none`}
              />
            </marker>
            <motion.path
              stroke="transparent"
              d={d.pathData}
              strokeWidth={10}
              fill="none"
            />
            <motion.path
              animate={{ d: d.pathData, opacity: 1 }}
              initial={{ d: d.pathData, opacity: 0 }}
              transition={_MOTION_TRANSITION}
              strokeWidth={3}
              strokeMiterlimit={10}
              opacity={1}
              fill="none"
              markerEnd={`url(#${d.fr + "--" + d.to}arrow-marker`}
            />
          </motion.g>
        );
      })}
    </g>
  );
};
