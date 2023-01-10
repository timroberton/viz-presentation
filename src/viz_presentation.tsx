import { eptCol } from "./colors";
import { Edges } from "./subcomponents/edges";
import { Nodes } from "./subcomponents/nodes";
import { SVG } from "./subcomponents/svg";
import { Tiles } from "./subcomponents/tiles";
import { InteractionEvent, PresentationModel } from "./types";
import { useDragging } from "./use_dragging";
import { useGetGoodCoords } from "./use_get_good_coords";
// import { usePanZoom } from "./use_pan_zoom";

type PlanViewProps = {
  pm: PresentationModel | null;
  onInteractionEvent: (v: InteractionEvent) => void;
  selectedItemIds: string[];
};

export const VizPresentation: React.FC<PlanViewProps> = (p) => {
  const pm = p.pm;
  // const us = useSelection(ViewType.Model);

  const { getGoodCoords, svgRef } = useGetGoodCoords();
  const ud = useDragging(pm, getGoodCoords, p.onInteractionEvent);
  // const upz = usePanZoom(getGoodCoords, _MOTION_TRANSITION_FOR_PAN_ZOOM);

  if (!pm) {
    return <div className="">No plan</div>;
  }

  return (
    <SVG
      idForDownload="ept-component-1"
      svgRef={svgRef}
      modelBounds={pm.bounds}
      onInteractionEvent={p.onInteractionEvent}
      // upz={upz}
    >
      {/* {pm.viewType === ViewType.Timeline && <Timeline />} */}
      <Tiles
        tiles={pm.tiles}
        onInteractionEvent={p.onInteractionEvent}
        selectedItemIds={p.selectedItemIds}
      />

      <marker
        id={`newnode-arrow-marker`}
        viewBox="-1 -1 8 12"
        refX={3}
        refY={5}
        orient="auto"
      >
        <path
          d="M 0,0 L 5,5 L 0,10"
          stroke="#000"
          strokeWidth={3}
          strokeLinejoin={"miter"}
          strokeMiterlimit={10}
          fill={`none`}
        />
      </marker>

      <path
        ref={ud.arrowRef}
        style={{ display: ud.isShiftDragging ? "block" : "none" }}
        d={"M 0,0 L 0,0"}
        strokeWidth={3}
        stroke="#000"
        fill="none"
        // markerEnd={`url(#line-marker`}
      />

      <Edges
        edges={pm.edges}
        onInteractionEvent={p.onInteractionEvent}
        selectedItemIds={p.selectedItemIds}
      />
      <Nodes
        nodes={pm.nodes}
        onInteractionEvent={p.onInteractionEvent}
        selectedItemIds={p.selectedItemIds}
        ud={ud}
      />
      {/* {(pm.viewType === ViewType.ModelAndIndicators ||
        pm.viewType === ViewType.IndicatorsAndDataSources ||
        pm.viewType === ViewType.Timeline) && (
        <Lines viewType={pm.viewType} lines={pm.lines} />
      )}
      {(pm.viewType === ViewType.ModelAndIndicators ||
        pm.viewType === ViewType.IndicatorsAndDataSources) && (
        <Indicators
          viewType={pm.viewType}
          indicators={pm.indicators}
          ud={ud}
          us={p.us}
        />
      )} */}
      {/* {pm.viewType === ViewType.IndicatorsAndDataSources && (
        <Table indicatorLevels={pm.indicatorLevels} ud={ud} us={p.us} />
      )}
      {(pm.viewType === ViewType.IndicatorsAndDataSources ||
        pm.viewType === ViewType.Timeline) && (
        <DataSources
          viewType={pm.viewType}
          dataSources={pm.dataSources}
          ud={ud}
          us={p.us}
        />
      )} */}

      {ud.hitArea && (
        <rect
          key="hit-area-rect"
          id="hit-area-rect"
          fill={eptCol("gray", 700)}
          width={ud.hitArea.w}
          height={ud.hitArea.h}
          x={ud.hitArea.x}
          y={ud.hitArea.y}
          opacity={0.4}
        />
      )}

      <rect
        key="drag-area-rect"
        id="drag-area-rect"
        ref={ud.rectRef}
        style={{ display: ud.isCtrlDragging ? "block" : "none" }}
        fill={eptCol("gray", 700)}
        rx={3}
        ry={3}
        opacity={0.8}
      />
    </SVG>
  );
};
