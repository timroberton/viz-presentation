/// <reference types="react" />
import { InteractionEvent, PresentationModel } from "./types";
declare type PlanViewProps = {
    pm: PresentationModel | null;
    onInteractionEvent: (v: InteractionEvent) => void;
    selectedItemIds: string[];
};
export declare const VizPresentation: React.FC<PlanViewProps>;
export {};
//# sourceMappingURL=viz_presentation.d.ts.map