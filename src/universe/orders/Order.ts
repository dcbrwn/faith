import Universe from '../Universe';
import Ship from '../entities/Ship';

interface Order {
  action(deltaTime: number, universe: Universe, ship: Ship): boolean;
}

export default Order;
