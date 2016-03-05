import Vector2 from '../../common/Vector2';
import Order from './Order';
import Universe from '../Universe';
import NavigationHelper from '../NavigationHelper';
import Ship from '../entities/Ship';

export default class FlyToDestinationOrder extends Order {
  private delta: Vector2 = new Vector2();
  private target: Vector2;

  constructor(target: Vector2) {
    super();
    this.target = target;
  }

  action(deltaTime: number, universe: Universe, ship: Ship): boolean {
    if (ship.pos.isNearVector(this.target, 10) && ship.vel.length() <= 1.0) {
      ship.throttle = 0.0;
      return false;
    }

    const distance = ship.pos.distanceToVector(this.target);
    const stoppingDistance = NavigationHelper.calcStoppingDistance(ship);

    ship.throttle = 1.0;

    if (distance > stoppingDistance) {
      ship.direction
        .setVector(this.target)
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
