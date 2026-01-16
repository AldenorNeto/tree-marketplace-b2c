// Seeded Random Number Generator (Linear Congruential Generator)
export class SeededRandom {
  constructor(seed) {
    this.seed = seed % 2147483647;
    if (this.seed <= 0) this.seed += 2147483646;
  }

  next() {
    this.seed = (this.seed * 16807) % 2147483647;
    return this.seed;
  }

  random() {
    return (this.next() - 1) / 2147483646;
  }

  range(min, max) {
    return min + this.random() * (max - min);
  }

  int(min, max) {
    return Math.floor(this.range(min, max + 1));
  }
}
