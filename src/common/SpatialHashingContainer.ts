import Vector2 from './Vector2';
import Placeable from './Placeable';
import SimpleContainer from './SimpleContainer';
import { VolumetricContainer } from './containers';

export default class SpatialHashingContainer<T extends Placeable>
extends SimpleContainer<T>
implements VolumetricContainer<T>
{
  findNearPoint(center: Vector2, radius: number): T[] {
    return this.items
      .map((item) => {
        return {
          distance: item.pos.distanceTo(center.x, center.y),
          entity: item,
        };
      })
      .filter((item) => item.distance <= radius)
      .sort((a, b) => a.distance - b.distance)
      .map((item) => item.entity);
  }
}
