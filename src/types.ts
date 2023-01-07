export enum ViewType {
  Model,
  ModelAndIndicators,
  IndicatorsAndDataSources,
  Timeline,
}

export type ModelBounds = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

export type PresentationModel = {
  bounds: ModelBounds;
  nodes: PresentationNode[];
  edges: PresentationEdge[];
  tiles: PresentationTile[];
  hitAreas: HitArea[];
  indicators?: PresentationIndicator[];
  lines?: PresentationLine[];
};

export type PresentationModel2 = {
  viewType: ViewType.ModelAndIndicators;
  bounds: ModelBounds;
  nodes: PresentationNode[];
  edges: PresentationEdge[];
  tiles: PresentationTile[];
  indicators: PresentationIndicator[];
  lines: PresentationLine[];
  hitAreas: HitArea[];
};

export type PresentationModel3 = {
  viewType: ViewType.IndicatorsAndDataSources;
  bounds: ModelBounds;
  indicators: PresentationIndicator[];
  dataSources: PresentationDataSource[];
  lines: PresentationLine[];
  indicatorLevels: IndicatorLevel[];
};

export type PresentationModel4 = {
  viewType: ViewType.Timeline;
  bounds: ModelBounds;
  dataSources: PresentationDataSource[];
  lines: PresentationLine[];
};

export type PresentationNode = {
  id: string;
  itemType: ItemType.Node;
  initialSequenceWeight: number;
  layer: number;
  attributes: { [key: string]: any };
  //
  w: number;
  h: number;
  //
  name: string;
  subHeader: string;
  x: number;
  y: number;
};

export type PresentationEdge = {
  id: string;
  itemType: ItemType.Edge;
  fr: string;
  to: string;
  //
  strokeWidthForArrowCrop: number;
  //
  pathData?: string;
};

export type PresentationTile = {
  id: string;
  itemType: ItemType.Tile;
  name: string;
  attributes: { [key: string]: any };
  //
  w: number;
  headerH: number;
  totalH: number;
  x: number;
  y: number;
  //
  initialFromLayer: number;
};

export type PresentationIndicator = {
  id: string;
  itemType: ItemType.Indicator;
  name: string;
  attributes: { [key: string]: any };
  subHeader: string;
  dataSource: string;
  node: string;
  //
  w: number;
  h: number;
  //
  x: number;
  y: number;
  //
  position: IndicatorPosition;
  line: IndicatorLine;
  //
  levelNumber: number;
};

export type IndicatorLine = {
  exists: boolean;
  id: string;
  target: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export type IndicatorLevel = {
  levelNumber: number;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type PresentationLine = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export type PresentationDataSource = {
  id: string;
  itemType: ItemType.DataSource;
  name: string;
  attributes: { [key: string]: any };
  //
  subHeader: string;
  //
  w: number;
  h: number;
  //
  x: number;
  y: number;
};

export type SelectablePresentationItem =
  | PresentationNode
  | PresentationIndicator
  | PresentationDataSource
  | PresentationEdge
  | PresentationTile;

export type DraggablePresentationItem =
  | PresentationNode
  | PresentationIndicator
  | PresentationDataSource;

export enum ItemType {
  Node = "node",
  Edge = "edge",
  Tile = "tile",
  Indicator = "indicator",
  DataSource = "dataSource",
}

export enum IndicatorPosition {
  auto = "auto",
  top = "top",
  bottom = "bottom",
  left = "left",
  right = "right",
}

export type HitArea = {
  id: string;
  colIndex: number;
  newSeq: number;
  budgeType: number;
  x: number;
  y: number;
  w: number;
  h: number;
};

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

export type InteractionEvent =
  | { action: "clickOnSVG" }
  | { action: "clickOnNode"; nodeId: string; shiftKey: boolean }
  | { action: "clickOnEdge"; edgeId: string; shiftKey: boolean }
  | { action: "clickOnTile"; tileId: string; shiftKey: boolean }
  | { action: "createEdge"; fromId: string; toId: string };
