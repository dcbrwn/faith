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

  findNearestStations(position: Vector2, radius: number): Station[] {
    return this.universe.getEntities()
      .reduce((nearest, entity) => {
        if (entity instanceof Station) {
          const distance = entity.pos.distanceToVector(position);
          
          if (distance < radius) {
            nearest.push({
              distance: distance,
              station: <Station> entity,
            });
          }
        }

        return nearest;
      }, [])
      .sort((a, b) => a.distance - b.distance)
      .map((entry) => entry.station);
  }
}
