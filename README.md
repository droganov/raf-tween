# A factory for creating cancelable raf tweens

### Basic usage
```javascript
import makeTween from 'raf-tween';

const tween = makeTween({
  onUpdate: console.log,
});

const cancel = tween(1, 10);
```

### Options
```javascript
// no need to pass by default:
const defaultOptions = {
  duration: 608,
  ease: timeFraction => timeFraction,
  interpolate: (a, b) => progress => ((b - a) * progress) + a,
};

// can be optionally provided
const options = {
  onComplete: console.log('Tween complete'),
};

const requiredOptions = { onUpdate: console.log };

// 2 ways to pass options, instance options win
const tween = makeTween({ ...requiredOptions, ...options });
const cancel = tween(1, 10, { onComplete: console.warn });
```

### Custom interpolator
```javascript
import makeTween from 'raf-tween';
import d3Interpolate from 'd3-interpolate';

const a = { x: 1, y: 101 };
const b = { x: 10, y: -110 };

const tween = makeTween({
  interpolator: d3Interpolate,
  onUpdate: console.log,
});

tween(a, b);
```

### Custom easing
```javascript
import makeTween from 'raf-tween';
import expoOut from 'eases/expo-out';

const tween = makeTween({
  ease: expoOut,
  onUpdate: console.log,
});

...
```
