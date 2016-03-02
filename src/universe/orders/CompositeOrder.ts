import Universe from '../Universe';
import Ship from '../entities/Ship';
import Order from './Order';

enum CompositeOrderModes {
  SEQUENTAL = 0,
  PARALLEL,
  LOOPING
};

export default class CompositeOrder extends Order {
  public static Modes = CompositeOrderModes;

  private mode: CompositeOrderModes;
  private orderIndex: number = 0;
  private subOrders: Order[] = [];

  constructor(mode: number, orders?: Order[]) {
    super();
    this.mode = mode;
    this.subOrders = orders;
  }

  private addOrder(order: Order): number {
    return this.subOrders.push(order);
  }

  private sequental(deltaTime: number, universe: Universe, ship: Ship): boolean {
    if (this.orderIndex === this.subOrders.length) {
      if (this.mode !== CompositeOrder.Modes.LOOPING) {
        return false;
      } else {
        this.orderIndex = 0;
      }
    }

    const result = this.subOrders[this.orderIndex].action(deltaTime, universe, ship);
    this.orderIndex += 1;

    return result;
  }

  parallel(deltaTime: number, universe: Universe, ship: Ship): boolean {
    for (let i = this.subOrders.length; i >= 0; i -= 1) {
      const result = this.subOrders[i].action(deltaTime, universe, ship);
      if (!result) {
        this.subOrders.splice(i, 1);
      }
    }

    return true;
  }

  action(deltaTime: number, universe: Universe, ship: Ship): boolean {
    if (this.subOrders.length === 0) {
      return false;
    }

    let result: boolean;

    switch (this.mode) {
      case CompositeOrder.Modes.PARALLEL:
        result = this.parallel(deltaTime, universe, ship);
        break;
      case CompositeOrder.Modes.SEQUENTAL:
      case CompositeOrder.Modes.LOOPING:
        result = this.sequental(deltaTime, universe, ship);
        break;
    }

    return result;
  }
}
