import Universe from '../Universe';
import Ship from '../entities/Ship';

export default class Order {
  private state;

  action(deltaTime: number, universe: Universe, ship: Ship): boolean {
    return true;
  }
}
