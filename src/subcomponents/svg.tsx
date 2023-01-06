import { motion } from "framer-motion";
import React, { MutableRefObject } from "react";
import { eptCol } from "../colors";
import { _MOTION_TRANSITION } from "../consts";
import { InteractionEvent, ModelBounds } from "../types";
// import { UsePanZoom } from "../use_pan_zoom";

type SVGProps = {
  modelBounds: ModelBounds;
  svgRef: MutableRefObject<SVGSVGElement | null>;
  onInteractionEvent: (v: InteractionEvent) => void;
  // upz: UsePanZoom;
  idForDownload: string;
  children: React.ReactNode;
};

const svgMargin = 20;

export const SVG: React.FC<SVGProps> = (p) => {
  const { xMin, xMax, yMin, yMax } = p.modelBounds;

  return (
    <motion.svg
      ref={p.svgRef}
      id={p.idForDownload}
      shapeRendering="geometricPrecision"
      animate={{ viewBox: createViewBox(xMin, xMax, yMin, yMax) }}
      transition={_MOTION_TRANSITION}
      style={{
        display: "block",
        margin: 0,
        padding: 0,
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
      }}
      className="select-none"
      onTap={() => {
        p.onInteractionEvent({ action: "clickOnSVG" });
      }}
      // onPanStart={p.upz.svgOnPanStart}
      // onPan={p.upz.svgOnPan}
      // onPanEnd={p.upz.svgOnPanEnd}
      // onWheel={p.upz.svgOnWheel}
    >
      <g transform="translate(0,0) scale(1)">
        <marker
          key={"line-marker"}
          id={`line-marker`}
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="3.5"
          markerHeight="3.5"
        >
          <circle cx="5" cy="5" r="5" fill={eptCol("gray", 700)} />
        </marker>
        <motion.g

        // style={p.upz.gStyle}
        >
          {p.children}
        </motion.g>
      </g>
    </motion.svg>
  );
};

function createViewBox(xMin: number, xMax: number, yMin: number, yMax: number) {
  const width = xMax - xMin + 2 * svgMargin;
  const height = yMax - yMin + 2 * svgMargin;
  return `${xMin - svgMargin} ${yMin - svgMargin} ${width} ${height}`;
}
