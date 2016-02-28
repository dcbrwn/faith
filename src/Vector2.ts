export default class Vector2 {
  public x: number;
  public y: number;

  constructor(x: number = 0.0, y: number = 0.0) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Vector2(this.x, this.y);
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  setVector(v: Vector2) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  add(x, y) {
    this.x += x;
    this.y += y;
    return this;
  }

  addVector(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(x, y) {
    this.x -= x;
    this.y -= y;
    return this;
  }

  subVector(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  mulScalar(value) {
    this.x *= value;
    this.y *= value;
    return this;
  }

  isNear(x, y, delta) {
    return this.x <= x + delta &&
      this.x >= x - delta &&
      this.y <= y + delta &&
      this.y >= y - delta;
  }

  isNearVector(v, delta) {
    return this.x <= v.x + delta &&
      this.x >= v.x - delta &&
      this.y <= v.y + delta &&
      this.y >= v.y - delta;
  }

  distanceTo(x, y) {
    const dx = this.x - x;
    const dy = this.y - y;
    return Math.sqrt(dx * dx + dy * dy);
  }


  distanceToVector(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    const length = this.length();
    this.x /= length;
    this.y /= length;
    return this;
  }
}
