export declare enum ViewType {
    Model = 0,
    ModelAndIndicators = 1,
    IndicatorsAndDataSources = 2,
    Timeline = 3
}
export declare type ModelBounds = {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
};
export declare type PresentationModel = {
    bounds: ModelBounds;
    nodes: PresentationNode[];
    edges: PresentationEdge[];
    tiles: PresentationTile[];
    hitAreas: HitArea[];
    indicators?: PresentationIndicator[];
    lines?: PresentationLine[];
};
export declare type PresentationModel2 = {
    viewType: ViewType.ModelAndIndicators;
    bounds: ModelBounds;
    nodes: PresentationNode[];
    edges: PresentationEdge[];
    tiles: PresentationTile[];
    indicators: PresentationIndicator[];
    lines: PresentationLine[];
    hitAreas: HitArea[];
};
export declare type PresentationModel3 = {
    viewType: ViewType.IndicatorsAndDataSources;
    bounds: ModelBounds;
    indicators: PresentationIndicator[];
    dataSources: PresentationDataSource[];
    lines: PresentationLine[];
    indicatorLevels: IndicatorLevel[];
};
export declare type PresentationModel4 = {
    viewType: ViewType.Timeline;
    bounds: ModelBounds;
    dataSources: PresentationDataSource[];
    lines: PresentationLine[];
};
export interface PresentationNode {
    id: string;
    itemType: ItemType.Node;
    initialSequenceWeight: number;
    layer: number;
    attributes: {
        [key: string]: any;
    };
    w: number;
    h: number;
    name: string;
    subHeader: string;
    x: number;
    y: number;
}
export interface PresentationEdge {
    id: string;
    itemType: ItemType.Edge;
    fr: string;
    to: string;
    strokeWidthForArrowCrop: number;
    pathData?: string;
}
export interface PresentationTile {
    id: string;
    itemType: ItemType.Tile;
    name: string;
    attributes: {
        [key: string]: any;
    };
    w: number;
    headerH: number;
    totalH: number;
    x: number;
    y: number;
    initialFromLayer: number;
}
export declare type PresentationIndicator = {
    id: string;
    itemType: ItemType.Indicator;
    name: string;
    attributes: {
        [key: string]: any;
    };
    subHeader: string;
    dataSource: string;
    node: string;
    w: number;
    h: number;
    x: number;
    y: number;
    position: IndicatorPosition;
    line: IndicatorLine;
    levelNumber: number;
};
export declare type IndicatorLine = {
    exists: boolean;
    id: string;
    target: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};
export declare type IndicatorLevel = {
    levelNumber: number;
    label: string;
    x: number;
    y: number;
    w: number;
    h: number;
};
export declare type PresentationLine = {
    id: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};
export declare type PresentationDataSource = {
    id: string;
    itemType: ItemType.DataSource;
    name: string;
    attributes: {
        [key: string]: any;
    };
    subHeader: string;
    w: number;
    h: number;
    x: number;
    y: number;
};
export declare type SelectablePresentationItem = PresentationNode | PresentationIndicator | PresentationDataSource | PresentationEdge | PresentationTile;
export declare type DraggablePresentationItem = PresentationNode | PresentationIndicator | PresentationDataSource;
export declare enum ItemType {
    Node = "node",
    Edge = "edge",
    Tile = "tile",
    Indicator = "indicator",
    DataSource = "dataSource"
}
export declare enum IndicatorPosition {
    auto = "auto",
    top = "top",
    bottom = "bottom",
    left = "left",
    right = "right"
}
export declare type HitArea = {
    id: string;
    colIndex: number;
    newSeq: number;
    budgeType: number;
    x: number;
    y: number;
    w: number;
    h: number;
};
export declare type InteractionEvent = {
    action: "clickOnSVG";
} | {
    action: "clickOnNode";
    nodeId: string;
    shiftKey: boolean;
} | {
    action: "clickOnEdge";
    edgeId: string;
    shiftKey: boolean;
} | {
    action: "clickOnTile";
    tileId: string;
    shiftKey: boolean;
} | {
    action: "createEdge";
    fromId: string;
    toId: string;
};
//# sourceMappingURL=types.d.ts.map