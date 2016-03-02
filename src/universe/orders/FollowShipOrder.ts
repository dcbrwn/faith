import Vector2 from '../../common/Vector2';
import Order from './Order';
import Universe from '../Universe';
import NavigationHelper from '../NavigationHelper';
import Ship from '../entities/Ship';

export default class FollowShipOrder extends Order {
  private delta: Vector2 = new Vector2();
  private target: Ship;

  constructor(target: Ship) {
    super();
    this.target = target;
  }

  action(deltaTime: number, universe: Universe, ship: Ship): boolean {
    if (!ship.pos.isNearVector(this.target.pos, 40)) {
      this.delta.setVector(this.target.pos)
        .subVector(ship.pos)
        .normalize()
        .mulScalar(ship.speed * deltaTime);
      ship.pos.addVector(this.delta);
    }

    return true;
  }
}
