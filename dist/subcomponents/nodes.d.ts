import React from "react";
import { InteractionEvent, PresentationNode } from "../types";
import { UseDragging } from "../use_dragging";
declare type NodesProps = {
    nodes: PresentationNode[];
    ud: UseDragging;
    onInteractionEvent: (v: InteractionEvent) => void;
    selectedItemIds: string[];
};
export declare const Nodes: React.FC<NodesProps>;
export {};
//# sourceMappingURL=nodes.d.ts.map