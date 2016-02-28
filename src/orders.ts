import Vector2 from './Vector2';
import Universe from './Universe';
import Asteroid from './Asteroid';
import Station from './Station';
import Ship from './Ship';

export interface Order {
  action(deltaTime: number, universe: Universe, ship: Ship): boolean;
}

export class FlyToDestinationOrder implements Order {
  public pos: Vector2;
  private delta: Vector2;

  constructor(pos: Vector2) {
    this.pos = pos;
    this.delta = new Vector2();
  }

  action(deltaTime: number, universe: Universe, ship: Ship): boolean {
    if (ship.pos.isNearVector(this.pos, 10)) {
      return false;
    }

    this.delta.setVector(this.pos)
      .subVector(ship.pos)
      .normalize()
      .mulScalar(ship.speed * deltaTime);
    ship.pos.addVector(this.delta);
    return true;
  }
}

export class ChaseShipOrder implements Order {
  public target: Ship;
  private delta: Vector2;

  constructor(target) {
    this.target = target;
    this.delta = new Vector2();
  }

  action(deltaTime: number, universe: Universe, ship: Ship): boolean {
    if (ship.pos.isNearVector(this.target.pos, 50)) {
      return true;
    }

    this.delta.setVector(this.target.pos)
      .subVector(ship.pos)
      .normalize()
      .mulScalar(ship.speed * deltaTime);
    ship.pos.addVector(this.delta);
    return true;
  }
}

export class MineAndTradeOrder implements Order {
  private target: Asteroid;
  private delta: Vector2;
  private _state: string;
  private _shop: Station;

  constructor(target) {
    this.target = target;
    this.delta = new Vector2();
    this._state = 'flying to asteroid';
    this._shop = null;
  }

  action(deltaTime, universe, ship: Ship) {
    switch (this._state) {
      case 'flying to asteroid': {
        if (ship.pos.isNearVector(this.target.pos, 50)) {
          this._state = 'mining';
        } else {
          this.delta.setVector(this.target.pos)
            .subVector(ship.pos)
            .normalize()
            .mulScalar(ship.speed * deltaTime);
          ship.pos.addVector(this.delta);
        }
        break;
      }
      case 'mining': {
        const chunk = 50 * deltaTime;
        if (ship.cargo + chunk > 100) {
          this._state = 'flying to shop';
        } else {
          ship.cargo += chunk;
        }
        break;
      }
      case 'flying to shop': {
        if (this._shop === null) {
          // find nearest shop
          const nearestShops = this._shop = universe.getEntities()
            .filter((entity) => entity instanceof Station)
            .map((entity) => {
              return {
                distance: entity.pos.distanceToVector(ship.pos),
                entity: entity,
              };
            })
            .sort((a, b) => a.distance - b.distance)

          this._shop = nearestShops[0].entity;
        } else if (ship.pos.isNearVector(this._shop.pos, 50)) {
          this._state = 'trading';
          break;
        }

        this.delta.setVector(this._shop.pos)
          .subVector(ship.pos)
          .normalize()
          .mulScalar(ship.speed * deltaTime);
        ship.pos.addVector(this.delta);
        break;
      }
      case 'trading': {
        const chunk = 50 * deltaTime;
        if (ship.cargo - chunk < 0) {
          this._state = 'flying to asteroid';
        } else {
          ship.cargo -= chunk;
        }
        break;
      }
    }

    return true;
  }
}
