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

  add(x: number, y: number) {
    this.x += x;
    this.y += y;
    return this;
  }

  addVector(v: Vector2) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(x: number, y: number) {
    this.x -= x;
    this.y -= y;
    return this;
  }

  subVector(v: Vector2) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  mulScalar(value: number) {
    this.x *= value;
    this.y *= value;
    return this;
  }

  rotate(angle: number) {
    return this.set(
      this.x * Math.cos(angle) - this.y * Math.sin(angle),
      this.x * Math.sin(angle) + this.y * Math.cos(angle)
    );
  }

  isNear(x: number, y: number, delta: number) {
    return this.x <= x + delta &&
      this.x >= x - delta &&
      this.y <= y + delta &&
      this.y >= y - delta;
  }

  isNearVector(v: Vector2, delta: number) {
    return this.x <= v.x + delta &&
      this.x >= v.x - delta &&
      this.y <= v.y + delta &&
      this.y >= v.y - delta;
  }

  distanceTo(x: number, y: number) {
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
