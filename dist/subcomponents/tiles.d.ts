import React from "react";
import { InteractionEvent, PresentationTile } from "../types";
declare type TilesProps = {
    tiles: PresentationTile[];
    onInteractionEvent: (v: InteractionEvent) => void;
    selectedItemIds: string[];
};
export declare const Tiles: React.FC<TilesProps>;
export {};
//# sourceMappingURL=tiles.d.ts.map