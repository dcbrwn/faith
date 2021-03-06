import Vector2 from '../../common/Vector2';
import Order from './Order';
import Universe from '../Universe';
import NavigationHelper from '../NavigationHelper';
import Ship from '../entities/Ship';

function clamp(value: number) :number {
  return Math.max(0.0, Math.min(1.0, value));
}

export default class FloatAroundTargetOrder
implements Order
{
  private baseVector: Vector2 = new Vector2(1.0, 0.0);
  private floatTarget: Vector2 = new Vector2();
  private delta: Vector2 = new Vector2();
  private angle: number = 0.0;
  private target: Vector2;

  constructor(target: Vector2) {
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

    ship.throttle = 1.0;

    const distance = ship.pos.distanceToVector(this.floatTarget);
    const stoppingDistance = NavigationHelper.calcStoppingDistance(ship);

    if (distance > stoppingDistance) {
      ship.direction
        .setVector(this.floatTarget)
        .subVector(ship.pos)
        .normalize();
    } else {
      ship.direction
        .setVector(ship.vel)
        .normalize()
        .invert();
    }

    return true;
  }
}
