import { SeededRandom } from './seededRandom.js';

export class SimpleNoise {
  constructor(seed) {
    this.rng = new SeededRandom(seed);
    this.gradients = [];
    for (let i = 0; i < 256; i++) {
      const angle = this.rng.random() * Math.PI * 2;
      this.gradients[i] = {
        x: Math.cos(angle),
        y: Math.sin(angle)
      };
    }
  }

  fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  lerp(a, b, t) {
    return a + t * (b - a);
  }

  grad(x, y) {
    const index = (Math.abs(x) * 73 + Math.abs(y) * 37) % 256;
    return this.gradients[index];
  }

  dot(grad, x, y) {
    return grad.x * x + grad.y * y;
  }

  noise(x, y) {
    x *= 0.1;
    y *= 0.1;

    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const x1 = x0 + 1;
    const y1 = y0 + 1;

    const sx = x - x0;
    const sy = y - y0;

    const n00 = this.dot(this.grad(x0, y0), sx, sy);
    const n10 = this.dot(this.grad(x1, y0), sx - 1, sy);
    const n01 = this.dot(this.grad(x0, y1), sx, sy - 1);
    const n11 = this.dot(this.grad(x1, y1), sx - 1, sy - 1);

    const u = this.fade(sx);
    const v = this.fade(sy);

    const nx0 = this.lerp(n00, n10, u);
    const nx1 = this.lerp(n01, n11, u);

    return this.lerp(nx0, nx1, v);
  }

  octaveNoise(x, y, octaves = 3, persistence = 0.5) {
    let value = 0;
    let amplitude = 1;
    let frequency = 1.5;
    let maxValue = 0;

    for (let i = 0; i < octaves; i++) {
      value += this.noise(x * frequency, y * frequency) * amplitude;
      maxValue += amplitude;
      amplitude *= persistence;
      frequency *= 2;
    }

    return value / maxValue;
  }
}