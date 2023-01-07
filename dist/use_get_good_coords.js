import { useRef } from "react";
export function useGetGoodCoords() {
    var svgRef = useRef(null);
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
        getGoodCoords: function (pi) {
            if (!svgRef.current) {
                return { x: 0, y: 0 };
            }
            var pt = svgRef.current.createSVGPoint();
            // pass event coordinates
            pt.x = pi.point.x;
            pt.y = pi.point.y;
            // transform to SVG coordinates
            //@ts-ignore
            var svgP = pt.matrixTransform(svgRef.current.getScreenCTM().inverse());
            return { x: svgP.x, y: svgP.y };
        },
        svgRef: svgRef,
    };
}
//# sourceMappingURL=use_get_good_coords.js.map