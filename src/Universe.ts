import Vector2 from './Vector2';
import Station from './Station';
import Asteroid from './Asteroid';
import Ship from './Ship';

export default class Universe {
  private entities: any[];

  constructor() {
    this.entities = [];

    for (let i = 0; i < 10; i++) {
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

  getEntities() {
    return this.entities;
  }

  tick(deltaTime) {
    let entities = this.getEntities();
    for (let i = entities.length - 1; i >= 0; i -= 1) {
      entities[i].tick(deltaTime, this);
    }
  }
}
