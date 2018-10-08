# A factory for creating cancelable raf tweens

### Basic usage
```javascript
import makeTween from 'raf-tween';

const animate = makeTween({
  onUpdate: console.log,
});

const cancel = animate(1, 10);
```

### Options
```javascript
// no need to pass by default:
const defaultOptions = {
  draw: (a, b, progress) => ((b - a) * progress) + a,
  duration: 608,
  ease: timeFraction => timeFraction,
};

// can be optionally provided
const options = {
  onComplete: console.log('Tween complete'),
};

const requiredOptions = { onUpdate: console.log };

// 2 ways to pass options, instance options win
const animate = makeTween({ ...requiredOptions, ...options });
const cancel = animate(1, 10, { onComplete: console.warn });
```

### Advanced draw
```javascript
import makeTween from 'raf-tween';

const animate = makeTween({
  draw: (a, b, progress) => ({
    x: simpleDraw(a.x, b.x, progress),
    y: simpleDraw(a.y, b.y, progress),
  }),
  onUpdate: console.log,
});

animate({ x: 1, y: 101 }, { x: 10, y: -110 });
```

### Advanced easing
```javascript
import makeTween, { simpleDraw } from 'raf-tween';
import expoOut from 'eases/expo-out';

const animate = makeTween({
  ease: expoOut,
  onUpdate: console.log,
});

...
```
