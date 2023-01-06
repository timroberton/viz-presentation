export const a = 1;

// import {
//   animate,
//   AnimationOptions,
//   MotionValue,
//   PanInfo,
//   useMotionValue,
// } from "framer-motion";
// import {
//   MutableRefObject,
//   useCallback,
//   useMemo,
//   useRef,
//   WheelEventHandler,
// } from "react";

// export type UsePanZoom = {
//   svgOnPanStart: (_: any, info: PanInfo) => void;
//   svgOnPan: (_: any, info: PanInfo) => void;
//   svgOnPanEnd: (_: any, info: PanInfo) => void;
//   svgOnWheel: WheelEventHandler<SVGSVGElement>;
//   //
//   gStyle: {
//     translateX: MotionValue<number>;
//     translateY: MotionValue<number>;
//     scale: MotionValue<number>;
//   };
//   //
//   isPanning: MutableRefObject<boolean>;
//   //
//   zoomIn: () => void;
//   zoomOut: () => void;
//   resetPanZoom: () => void;
// };

// export function usePanZoom(
//   getGoodCoords: (pi: PanInfo) => { x: number; y: number },
//   options: AnimationOptions<number>
// ): UsePanZoom {
//   const isPanning = useRef<boolean>(false);
//   const panX = useRef<number>(0);
//   const panY = useRef<number>(0);
//   const translateX = useMotionValue(0);
//   const translateY = useMotionValue(0);
//   const scale = useMotionValue(1);

//   function zoomIn() {
//     const currentScale = scale.get();
//     const newScale =
//       currentScale < 1 && currentScale > 0.66
//         ? 1
//         : Math.min(Math.max(0.5, currentScale * 1.5), 3);
//     animate(scale, newScale, { duration: 0.2 });
//   }

//   function zoomOut() {
//     const currentScale = scale.get();
//     const newScale =
//       currentScale <= 1.5 && currentScale > 1
//         ? 1
//         : Math.min(Math.max(0.5, currentScale / 1.5), 3);
//     animate(scale, newScale, { duration: 0.2 });
//   }

//   const resetPanZoom = useCallback(() => {
//     animate(translateX, 0, options);
//     animate(translateY, 0, options);
//     animate(scale, 1, options);
//   }, []);

//   const svgOnPanStart = useCallback((_: any, info: any) => {
//     isPanning.current = true;
//     const { x, y } = getGoodCoords(info);
//     panX.current = x - translateX.get();
//     panY.current = y - translateY.get();
//   }, []);

//   const svgOnPan = useCallback((_: any, info: any) => {
//     const { x, y } = getGoodCoords(info);
//     translateX.set(x - panX.current);
//     translateY.set(y - panY.current);
//   }, []);

//   const svgOnPanEnd = useCallback(() => {
//     setTimeout(() => {
//       isPanning.current = false;
//     }, 0);
//   }, []);

//   const svgOnWheel = useCallback((e: any) => {
//     scale.set(Math.min(Math.max(0.5, scale.get() + e.deltaY * -0.005), 3));
//   }, []);

//   const gStyle = useMemo(() => {
//     return {
//       translateX,
//       translateY,
//       scale,
//     };
//   }, []);

//   return {
//     svgOnPanStart,
//     svgOnPan,
//     svgOnPanEnd,
//     svgOnWheel,
//     //
//     gStyle,
//     //
//     isPanning,
//     //
//     zoomIn,
//     zoomOut,
//     resetPanZoom,
//   };
// }
