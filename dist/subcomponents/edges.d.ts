import React from "react";
import { InteractionEvent, PresentationEdge } from "../types";
declare type EdgesProps = {
    edges: PresentationEdge[];
    onInteractionEvent: (v: InteractionEvent) => void;
    selectedItemIds: string[];
};
export declare const Edges: React.FC<EdgesProps>;
export {};
//# sourceMappingURL=edges.d.ts.map