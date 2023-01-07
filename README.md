# Tim's library for creating interactive SVGs

## How to use

The main import is `VizPresentation`, which accepts the following props...

```typescript
type PlanViewProps = {
  pm: PresentationModel | null;
  onInteractionEvent: (v: InteractionEvent) => void;
  selectedItemIds: string[];
};
```

And where `PresentationModel` is...

```typescript
export type PresentationModel = {
  bounds: ModelBounds;
  nodes: PresentationNode[];
  edges: PresentationEdge[];
  tiles: PresentationTile[];
  hitAreas: HitArea[];
  indicators?: PresentationIndicator[];
  lines?: PresentationLine[];
};
```
