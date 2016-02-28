import Universe from './Universe';
import Vector2 from './Vector2';
import { Order } from './orders';

export default class Ship {
  public pos: Vector2;
  public size: string;
  public name: string;
  public speed: number;
  public cargo: number;

  public hull: number;
  private shields: number;
  private orders: Order[];
  private canvas: any;
  private context: any;

  private _prevZoomLevel: number;
  private _prevState: string;

  constructor(options) {
    this.pos = options.pos;
    this.size = options.size;
    this.name = options.name;
    this.speed = 100;
    this.hull = 0.75;
    this.shields = 1.0;
    this.orders = [];
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.cargo = 0;
  }

  getOrders() {
    return this.orders;
  }

  getCurrentOrder() {
    return this.orders[this.orders.length - 1];
  }

  newOrder(order) {
    this.orders.unshift(order);
  }

  cancelOrder() {
    this.orders.pop();
  }

  renderSmallShipIcon(x, y) {
    const ctx = this.context;
    ctx.beginPath();
    ctx.moveTo(x, y + 11);
    ctx.lineTo(x + 10, y + 11);
    ctx.lineTo(x + 5, y);
    ctx.closePath();
    ctx.stroke();
  }

  renderMediumShipIcon(x, y) {
    const ctx = this.context;
    ctx.beginPath();
    ctx.moveTo(x, y + 8);
    ctx.lineTo(x + 10, y + 8);
    ctx.lineTo(x + 5, y);
    ctx.closePath();
    ctx.moveTo(x, y + 11);
    ctx.lineTo(x + 10, y + 11);
    ctx.stroke();
  }

  getImage(radar, state) {
    if (radar.zoomLevel === this._prevZoomLevel && state === this._prevState) {
      return this.canvas;
    }

    this.canvas.width = 100;
    this.canvas.height = 20;
    this._prevState = state;
    this._prevZoomLevel = radar.zoomLevel;

    const ctx = this.context;

    ctx.translate(0.5, 0.5);
    ctx.strokeStyle = '#a1b56c';

    ctx.beginPath();
    ctx.moveTo(1, 12);
    ctx.lineTo(1, 12 - this.hull * 12);
    ctx.stroke();

    const colors = {
      normal: '#86c1b9',
      selected: '#f7ca88',
      highlighted: '#f8f8f8',
    };

    ctx.strokeStyle = colors[state];

    switch (this.size) {
      case 'S': {
        this.renderSmallShipIcon(4, 0);
        break;
      }
      case 'M': {
        this.renderMediumShipIcon(4, 0);
        break;
      }
      default:
    }

    if (state !== 'normal') {
      ctx.fillStyle = colors[state];
      ctx.fillText(this.name, 15, 9);
    }

    return this.canvas;
  }

  tick(deltaTime, universe) {
    const currentOrder = this.getCurrentOrder();
    if (currentOrder) {
      if (!currentOrder.action(deltaTime, universe, this)) {
        this.cancelOrder();
      }
    }
  }
}
