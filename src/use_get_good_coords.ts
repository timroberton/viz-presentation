import { PanInfo } from "framer-motion";
import { MutableRefObject, useRef } from "react";

type UseGetGoodCoords = {
  getGoodCoords: (pi: PanInfo) => { x: number; y: number };
  svgRef: MutableRefObject<SVGSVGElement | null>;
};

export function useGetGoodCoords(): UseGetGoodCoords {
  const svgRef = useRef<SVGSVGElement | null>(null);
  // const pt = useRef<any>(null);

  // useEffect(() => {
  //     // svgEl.current = document.getElementById(svgId) as SVGElement | null;
  //     if (!svgRef.current) {
  //         return;
  //     }
  //     //@ts-ignore
  //     pt.current
  // }, [svgRef.current]);

  return {
    getGoodCoords(pi: PanInfo): { x: number; y: number } {
      if (!svgRef.current) {
        return { x: 0, y: 0 };
      }
      const pt = svgRef.current.createSVGPoint();
      // pass event coordinates
      pt.x = pi.point.x;
      pt.y = pi.point.y;
      // transform to SVG coordinates
      //@ts-ignore
      const svgP = pt.matrixTransform(svgRef.current.getScreenCTM().inverse());
      return { x: svgP.x, y: svgP.y };
    },
    svgRef,
  };
}
