import Vector2 from '../../common/Vector2';
import Placeable from '../../common/Placeable';
import Universe from '../Universe';

export default class Entity
implements Placeable
{
  public pos: Vector2 = new Vector2();
  public vel: Vector2 = new Vector2();
  public mass: number = 10.0;
  public radius: number = 10.0;

  private temp: Vector2 = new Vector2();

  applyForce(force: Vector2, time: number) {
    this.temp
      .setVector(force)
      .mulScalar(time / this.mass);

    if (this.vel.length() < 300000) {
      this.vel.addVector(this.temp);
    }
  };

  tick(deltaTime: number, universe: Universe) {
    this.temp
      .setVector(this.vel)
      .mulScalar(deltaTime);
    this.pos.addVector(this.temp);
  };
}
