import Vector2 from '../common/Vector2';
import Entity from './entities/Entity';
import Station from './entities/Station';
import Asteroid from './entities/Asteroid';
import Ship from './entities/Ship';

export default class Universe {
  private entities: Entity[];

  constructor() {
    this.entities = [];

    for (let i = 0; i < 100; i++) {
      this.entities.push(new Ship({
        pos: new Vector2(Math.random() * 1000, Math.random() * 1000),
        size: Math.random() > 0.5 ? 'S' : 'M',
        name: 'CV-' + Math.random().toString().substr(2,6),
      }));

      this.entities.push(new Asteroid({
        pos: new Vector2(Math.random() * 1000, Math.random() * 1000),
        name: 'AS-' + Math.random().toString().substr(2,6),
      }));
    }

    this.entities.push(new Station({
      pos: new Vector2(340, 460),
      size: 'M',
      name: 'CVST-585 Sapphire',
    }));

    this.entities.push(new Station({
      pos: new Vector2(670, 380),
      size: 'M',
      name: 'CVST-589 Aldamarine',
    }));
  }

  getEntities(): Entity[] {
    return this.entities;
  }

  tick(deltaTime) {
    let entities = this.getEntities();
    for (let i = entities.length - 1; i >= 0; i -= 1) {
      entities[i].tick(deltaTime, this);
    }
  }
}
