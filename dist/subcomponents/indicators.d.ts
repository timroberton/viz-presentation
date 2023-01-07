import React from "react";
import { InteractionEvent, PresentationIndicator, ViewType } from "../types";
import { UseDragging } from "../use_dragging";
declare type IndicatorsProps = {
    viewType: ViewType;
    indicators: PresentationIndicator[];
    ud: UseDragging;
    onInteractionEvent: (v: InteractionEvent) => void;
    selectedItemIds: string[];
};
export declare const Indicators: React.FC<IndicatorsProps>;
export {};
//# sourceMappingURL=indicators.d.ts.map