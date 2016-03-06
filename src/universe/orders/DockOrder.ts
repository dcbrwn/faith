import Vector2 from '../../common/Vector2';
import Order from './Order';
import NavigationHelper from '../NavigationHelper';
import Universe from '../Universe';
import Character from '../entities/Character';
import Ship from '../entities/Ship';
import Asteroid from '../entities/Asteroid';
import Station from '../entities/Station';

import FlyToDestinationOrder from './FlyToDestinationOrder';

export default class DockOrder
implements Order
{
  private state: string = null;
  private target: Station;
  private order: Order;
  private temp: Vector2 = new Vector2();

  constructor(target: Station) {
    this.target = target;
  }

  action(deltaTime: number, universe: Universe, ship: Ship): boolean {
    let orderIsDone;
    if (this.order) {
      orderIsDone = !this.order.action(deltaTime, universe, ship);
    }

    switch (this.state) {
      case null:
        this.state = 'flying to station';
        this.temp
          .setVector(ship.pos)
          .subVector(this.target.pos)
          .normalize()
          .mulScalar(10)
          .addVector(this.target.pos);

        this.order = new FlyToDestinationOrder(this.temp.clone());
        break;
      case 'flying to station':
        if (orderIsDone) {
          this.target.hangar.dock(ship);
          return false;
        }
        break;
    }

    return true;
  }
}
