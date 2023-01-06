import React from "react";
import { motion } from "framer-motion";
import { _MOTION_TRANSITION } from "../consts";
import { PresentationLine, ViewType } from "../types";
import { eptCol } from "../colors";

type LinesProps = {
  viewType: ViewType;
  lines: PresentationLine[];
};

export const Lines: React.FC<LinesProps> = ({ lines, viewType }) => {
  return (
    <g>
      {lines.map((d) => {
        const pathData = `M ${d.x1},${d.y1} L ${d.x2},${d.y2}`;
        return (
          <motion.g id={d.id} key={d.id}>
            <motion.path
              stroke="transparent"
              d={pathData}
              strokeWidth={10}
              fill="none"
            />
            <motion.path
              animate={{ d: pathData, opacity: 1 }}
              initial={{ d: pathData, opacity: 0 }}
              transition={_MOTION_TRANSITION}
              strokeWidth={2}
              strokeMiterlimit={10}
              // markerStart={viewType === ViewType.IndicatorsAndDataSources ? `url(#line-marker)` : undefined}
              markerEnd={`url(#line-marker)`}
              opacity={1}
              fill="none"
              stroke={eptCol("gray", 700)}
            />
          </motion.g>
        );
      })}
    </g>
  );
};
