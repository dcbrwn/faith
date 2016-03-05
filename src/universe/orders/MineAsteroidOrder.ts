import Vector2 from '../../common/Vector2';
import Order from './Order';
import NavigationHelper from '../NavigationHelper';
import Universe from '../Universe';
import Ship from '../entities/Ship';
import Asteroid from '../entities/Asteroid';
import Station from '../entities/Station';

import FlyToDestinationOrder from './FlyToDestinationOrder';

export default class MineAsteroidOrder
implements Order
{
  private state: string = null;
  private target: Asteroid;
  private order: Order;
  private temp: Vector2 = new Vector2();

  constructor(target: Asteroid) {
    this.target = target;
  }

  action(deltaTime: number, universe: Universe, ship: Ship): boolean {
    let orderIsDone;
    if (this.order) {
      orderIsDone = !this.order.action(deltaTime, universe, ship);
    }

    switch (this.state) {
      case null:
        this.state = 'flying to asteroid';
        this.temp
          .setVector(ship.pos)
          .subVector(this.target.pos)
          .normalize()
          .mulScalar(50)
          .addVector(this.target.pos);
        this.order = new FlyToDestinationOrder(this.temp.clone());
        break;
      case 'flying to asteroid':
        if (orderIsDone) {
          this.state = 'mining';
        }
        break;
      case 'mining':
        const chunk = this.target.mine(deltaTime);
        if (chunk && !ship.inventory.insert(chunk)) {
          return false;
        }
    }

    return true;
  }
}
