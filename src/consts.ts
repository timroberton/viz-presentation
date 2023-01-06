import { AnimationOptions } from "framer-motion";

export const _MOTION_TRANSITION_FOR_PAN_ZOOM: AnimationOptions<number> = {
  duration: 0.5,
  ease: [0.65, 0, 0.35, 1],
};

export const _MOTION_TRANSITION = {
  duration: 0.5,
  bounce: 0,
  ease: [0.65, 0, 0.35, 1],
  // I use separate config for opacity so that it creates a delay for new items that are just arriving
  opacity: {
    delay: 0.5,
    duration: 0.6,
    ease: [0.65, 0, 0.35, 1],
  },
};

export const _MOTION_TRANSITION_SIDEBAR = {
  duration: 0.3,
  bounce: 0,
  ease: [0.65, 0, 0.35, 1],
};
