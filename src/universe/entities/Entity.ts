import Vector2 from '../../common/Vector2';
import Universe from '../Universe';

abstract class Entity {
  public pos: Vector2 = new Vector2();

  abstract tick(deltaTime: number, universe: Universe);
}

export default Entity;
