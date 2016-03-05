import Vector2 from '../common/Vector2';
import Universe from './Universe';
import Entity from './entities/Entity';
import Station from './entities/Station';
import Ship from './entities/Ship';

export default class NavigationHelper {
  private universe: Universe;

  constructor(universe: Universe) {
    this.universe = universe;
  }

  static calcStoppingTime(ship: Ship) {
    const acceleration = ship.force / ship.mass;
    return ship.vel.length() / acceleration;
  }

  static calcStoppingDistance(ship: Ship) :number {
    const a = ship.force / ship.mass;
    const v0 = ship.vel.length();
    const t = v0 / a;
    return v0 * t + (a * t * t) / 2;
  }

  findNearestStations(position: Vector2, radius: number): Station[] {
    return <Station[]> this.universe.entities
      .findNearPoint(position, radius)
      .filter((entity) => {
        return entity instanceof Station;
      });
  }
}
