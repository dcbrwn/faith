import Vector2 from '../../common/Vector2';
import Order from './Order';
import Universe from '../Universe';
import NavigationHelper from '../NavigationHelper';
import Ship from '../entities/Ship';

export default class FloatAroundTargetOrder extends Order {
  private baseVector: Vector2 = new Vector2(1.0, 0.0);
  private floatTarget: Vector2 = new Vector2();
  private delta: Vector2 = new Vector2();
  private angle: number = 0.0;
  private target: Vector2;

  constructor(target: Vector2) {
    super();
    this.target = target;
  }

  action(deltaTime: number, universe: Universe, ship: Ship): boolean {
    this.angle += deltaTime * 1;

    if (this.angle >= Math.PI * 2.0) {
      this.angle = 0.0;
    }

    this.floatTarget
      .setVector(this.baseVector)
      .rotate(this.angle)
      .mulScalar(50.0)
      .addVector(this.target);

    if (!ship.pos.isNearVector(this.floatTarget, 1)) {
      this.delta.setVector(this.floatTarget)
        .subVector(ship.pos)
        .normalize()
        .mulScalar(ship.speed * deltaTime);

      ship.pos.addVector(this.delta);
    }

    return true;
  }
}
