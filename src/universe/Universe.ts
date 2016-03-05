import Vector2 from '../common/Vector2';
import Entity from './entities/Entity';
import { VolumetricContainer } from '../common/containers';
import SpatialHashingContainer from '../common/SpatialHashingContainer';

export default class Universe {
  public entities: VolumetricContainer<Entity>;

  constructor() {
    this.entities = new SpatialHashingContainer<Entity>();
  }

  tick(deltaTime) {
    this.entities.each((entity: Entity): boolean => {
      entity.tick(deltaTime, this);
      return false;
    });
  }
}
