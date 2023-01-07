import React, { MutableRefObject } from "react";
import { InteractionEvent, ModelBounds } from "../types";
declare type SVGProps = {
    modelBounds: ModelBounds;
    svgRef: MutableRefObject<SVGSVGElement | null>;
    onInteractionEvent: (v: InteractionEvent) => void;
    idForDownload: string;
    children: React.ReactNode;
};
export declare const SVG: React.FC<SVGProps>;
export {};
//# sourceMappingURL=svg.d.ts.map