import Vector2 from '../common/Vector2';
import Universe from '../universe/Universe';
import BackgroundGrid from './BackgroundGrid';
import Station from '../universe/entities/Station';
import Asteroid from '../universe/entities/Asteroid';
import Ship from '../universe/entities/Ship';

import FlyToDestinationOrder from '../universe/orders/FlyToDestinationOrder';
import FollowShipOrder from '../universe/orders/FollowShipOrder';
import MineAndTradeOrder from '../universe/orders/MineAndTradeOrder';
import FloatAroundTargetOrder from '../universe/orders/FloatAroundTargetOrder';
 
export default class Radar {
  public position: Vector2;
  public zoom: number;

  private state: string;
  private canvas: any;
  private context: any;
  private universe: Universe;
  private grid: BackgroundGrid;

  private startPoint: Vector2;
  private selectedEntity: Object;
  private highlightedEntity: Object;

  constructor(options) {
    const canvas = document.getElementById(options.canvasId);
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.universe = options.universe;
    this.selectedEntity = null;
    this.highlightedEntity = null;
    this.position = new Vector2(0, 0);
    this.zoom = 1.0;
    this.state = 'idle';

    this.grid = new BackgroundGrid();

    this.context.font = '10px monospace';

    window.onresize = (event) => {
      this.fitIntoScreen();
    };

    canvas.oncontextmenu = (event) => {
      event.preventDefault();
    }

    canvas.onmousedown = (event) => {
      switch (this.state) {
        case 'idle': {
          if (event.which === 1) {
            this.state = 'selecting';
          } else if (event.which === 3) {
            this.state = 'pointing';
          }
          this.startPoint = new Vector2(event.x, event.y);
          break;
        }
      }
    }

    canvas.onmouseup = (event) => {
      switch (this.state) {
        case 'selecting': {
          this.selectEntity(event.x, event.y);
          break;
        }
        case 'pointing': {
          const selected = this.selectedEntity;
          const highlighted = this.highlightedEntity;
          if (selected && selected instanceof Ship) {
            selected.cancelOrder();
            if (highlighted instanceof Ship) {
              const order = new FlyToDestinationOrder(highlighted.pos);
              selected.newOrder(order);
            } else if (highlighted instanceof Asteroid) {
              const order = new MineAndTradeOrder(<Asteroid> highlighted);
              selected.newOrder(order);
            } else {
              const destination = new Vector2(
                this.position.x + event.x,
                this.position.y + event.y
              );
              const order = new FlyToDestinationOrder(destination);
              selected.newOrder(order);
            }
          }
          break;
        }
      }
      this.state = 'idle';
    }

    canvas.onmousemove = (event) => {
      switch (this.state) {
        case 'idle': {
          this.highlightEntity(event.x, event.y);
          break;
        }
        case 'selecting': {
          const distance = this.startPoint
            .clone()
            .sub(event.x, event.y)
            .length();
          if (distance > 5) {
            this.state = 'moving';
          }
          break;
        }
        case 'moving': {
          this.position.x -= event.movementX;
          this.position.y -= event.movementY;
          break;
        }
      }
    }

    this.fitIntoScreen();
  }

  getEntitiesAtPoint(sx, sy) {
    const x = sx + this.position.x;
    const y = sy + this.position.y;

    return this.universe.getEntities()
      .map((entity) => {
        return {
          distance: entity.pos.distanceTo(x, y),
          entity: entity,
        };
      })
      .filter((item) => item.distance <= 50)
      .sort((a, b) => a.distance - b.distance);
  }

  selectEntity(x, y) {
    const entities = this.getEntitiesAtPoint(x, y);
    if (entities.length > 0) {
      this.selectedEntity = entities[0].entity;
    } else {
      this.selectedEntity = null;
    }
    return this.selectedEntity;
  }

  highlightEntity(x, y) {
    const entities = this.getEntitiesAtPoint(x, y);
    if (entities.length > 0) {
      this.highlightedEntity = entities[0].entity;
    } else {
      this.highlightedEntity = null;
    }
    return this.highlightedEntity;
  }

  isEntitySelected(entity) {
    return this.selectedEntity === entity;
  }

  isEntityHighlighted(entity) {
    return this.highlightedEntity === entity;
  }

  fitIntoScreen() {
    const cvs = this.canvas;
    cvs.style.position = 'absolute';
    cvs.style.left = 0;
    cvs.style.top = 0;
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
  };

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  renderGrid() {
    const ctx = this.context;
    const grid = ctx.createPattern(this.grid.canvas, 'repeat');
    ctx.fillStyle = grid;
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.canvas.width,
      this.canvas.height
    );
  }

  renderEntityOrders(entity) {
    const ctx = this.context;
    const orders = entity.getOrders();

    for (let i = orders.length; i >= 0; i -= 1) {
      if (orders[i] instanceof FlyToDestinationOrder) {
        ctx.strokeStyle = '#a1b56c';
        ctx.beginPath();
        ctx.moveTo(orders[i].target.x, orders[i].target.y);
        if (orders[i + 1] instanceof FlyToDestinationOrder) {
          ctx.lineTo(orders[i + 1].target.x, orders[i + 1].target.y);
        } else {
          ctx.lineTo(entity.pos.x, entity.pos.y);
        }

        ctx.stroke();
      }
    }
  }

  renderEntity(entity) {
    const x = entity.pos.x;
    const y = entity.pos.y;
    const ctx = this.context;
    let state = 'normal';

    if (this.isEntitySelected(entity)) {
      if (entity instanceof Ship) {
        this.renderEntityOrders(entity);
      }

      state = 'selected';
    } else if (this.isEntityHighlighted(entity)) {
      state = 'highlighted';
    }

    ctx.drawImage(entity.getImage(this, state), x - 7, y - 5);
  }

  render() {
    const ctx = this.context;
    const entities = this.universe.getEntities();

    ctx.save();
    ctx.translate(-this.position.x, -this.position.y);
    this.renderGrid();
    for (let i = entities.length - 1; i >= 0; i -= 1) {
      this.renderEntity(entities[i]);
    }
    ctx.restore();
  };
}
