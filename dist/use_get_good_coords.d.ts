import { PanInfo } from "framer-motion";
import { MutableRefObject } from "react";
declare type UseGetGoodCoords = {
    getGoodCoords: (pi: PanInfo) => {
        x: number;
        y: number;
    };
    svgRef: MutableRefObject<SVGSVGElement | null>;
};
export declare function useGetGoodCoords(): UseGetGoodCoords;
export {};
//# sourceMappingURL=use_get_good_coords.d.ts.map