import raf from 'raf';

import makeInterpolate from './makeNumberInterpolator';

const defaultOptions = {
  duration: 608,
  ease: timeFraction => timeFraction,
};

const merge = (a, b) => Object.assign({}, a, b);

export default (options) => {
  const factoryOptions = merge(defaultOptions, options);
  return (a, b, requestOptions) => {
    const o = merge(factoryOptions, requestOptions);
    const start = performance.now();
    let frame = raf(function animate(time) {
      const timeFraction = Math.min((time - start) / options.duration, 1);
      const progress = o.ease(timeFraction);
      const interpolate = o.interpolator || makeInterpolate;
      const nextValue = interpolate(a, b)(progress);
      o.onUpdate(nextValue);
      if (timeFraction < 1) {
        frame = raf(animate);
      } else if (o.onComplete) {
        o.onComplete();
      }
    });
    return () => raf.cancel(frame);
  };
};
