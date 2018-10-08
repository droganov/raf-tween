import raf from 'raf';

export const simpleDraw = (a, b, progress) => ((b - a) * progress) + a;

const defaultOptions = {
  draw: simpleDraw,
  duration: 608,
  ease: timeFraction => timeFraction,
};

const merge = (a, b) => Object.assign({}, a, b);

export default (options) => {
  const factoryOptions = merge(defaultOptions, options);
  return (initial, next, requestOptions) => {
    const {
      draw,
      ease,
      onUpdate,
      onComplete,
    } = merge(factoryOptions, requestOptions);
    const start = performance.now();
    let frame = raf(function animate(time) {
      const timeFraction = Math.min((time - start) / options.duration, 1);
      const progress = ease(timeFraction);
      const nextValue = draw(initial, next, progress);
      onUpdate(nextValue);
      if (timeFraction < 1) {
        frame = raf(animate);
      } else if (onComplete) {
        onComplete();
      }
    });
    return () => raf.cancel(frame);
  };
};
