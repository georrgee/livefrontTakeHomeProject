/**
 * @param { number } staggerDelay The delay between each stagger animation
 * @param { number } animationDuration The duration of each stagger animation
 * @param { number } cycleDuration The total duration of one cycle of the animation
 * @param { object } rotationConfig The configuration for the rotation animation
 * @param { number } rotationConfig.damping The damping factor for the rotation animation
 * @param { number } rotationConfig.stiffness The stiffness factor for the rotation animation
 * @param { object } fadeConfig The configuration for the fade animation
 * @param { number } fadeConfig.duration The duration of the fade animation
 * @description Configuration for the useSwipeIndicatorAnimation hook
 */
export interface AnimationConfig {
  staggerDelay: number;
  animationDuration: number;
  cycleDuration: number;
  rotationConfig: {
    damping: number;
    stiffness: number;
  };
  fadeConfig: {
    duration: number;
  };
}