import Vector2 from '../common/Vector2';
import SimpleContainer from '../common/SimpleContainer';
import Ship from './entities/Ship';
import Entity from './entities/Entity';

export default class Hangar
extends SimpleContainer<Ship>
{
  private volume: number;
  private parent: Entity;

  constructor(volume: number, parent: Entity) {
    super();
    this.volume = volume;
    this.parent = parent;
  }

  getTotalVolume(): number {
    let totalVolume = 0;
    this.each((ship: Ship) => {
      totalVolume += ship.volume;
    });
    return totalVolume;
  }

  getTotalMass(): number {
    let totalMass = 0;
    this.each((ship: Ship) => {
      totalMass += ship.mass;
    });
    return totalMass;
  }

  dock(ship: Ship): boolean {
    if (this.getTotalVolume() + ship.volume > this.volume) {
      return false;
    }

    ship.isDocked = true;
    return this.insert(ship);
  }

  undock(ship: Ship): boolean {
    if (!ship.isDocked) {
      return false;
    }

    const index = this.each((dockedShip: Ship) => {
      return ship === dockedShip;
    });

    if (index === this.length()) {
      return false;
    }

    ship.pos
      .set(1.0, 0.0)
      .rotate(Math.random() * Math.PI * 2)
      .mulScalar(50)
      .addVector(this.parent.pos);

    ship.isDocked = false;

    return this.remove(index);
  }
};
