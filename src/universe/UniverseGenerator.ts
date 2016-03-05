import Universe from './Universe';
import Vector2 from '../common/Vector2';
import Account from './Account';
import Station from './entities/Station';
import Asteroid from './entities/Asteroid';
import Ship from './entities/Ship';
import Character from './entities/Character';

export default class UniverseGenerator {
  generate(): Universe {
    const universe = new Universe();

    const player = new Character({
      name: 'David Bowman',
    });

    player.account = new Account({
      credits: 0,
    });

    universe.entities.insert(player);

    for (let i = 0; i < 3; i++) {
      const ship = new Ship({
        pos: new Vector2(Math.random() * 1000, Math.random() * 1000),
        size: Math.random() > 0.5 ? 'S' : 'M',
        name: 'CV-' + Math.random().toString().substr(2,6),
      });

      ship.owner = player;
      universe.entities.insert(ship);
    }

    for (let i = 0; i < 20; i++) {
      const asteroid = new Asteroid({
        pos: new Vector2(Math.random() * 1000, Math.random() * 1000),
        name: 'AS-' + Math.random().toString().substr(2,6),
      });

      universe.entities.insert(asteroid);
    }

    universe.entities.insert(new Station({
      pos: new Vector2(340, 460),
      size: 'M',
      name: 'CVST-585 Sapphire',
    }));

    universe.entities.insert(new Station({
      pos: new Vector2(670, 380),
      size: 'M',
      name: 'CVST-589 Aldamarine',
    }));

    return universe;
  }
}
