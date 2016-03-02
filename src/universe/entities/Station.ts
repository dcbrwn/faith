import Entity from './Entity';
import Vector2 from '../../common/Vector2';

export default class Station extends Entity {
  public size: string;
  public name: string;

  private hull: number;
  private shields: number;
  private orders: any[];
  private canvas: any;
  private context: any;

  private _prevZoomLevel: number;
  private _prevState: string;

  constructor(options) {
    super();
    this.size = options.size;
    this.name = options.name;
    this.orders = [];
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
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

  renderStationIcon(x, y) {
    const ctx = this.context;
    ctx.strokeRect(x, y, 10, 10);
    ctx.strokeRect(x + 2, y + 2, 6, 6);
  }

  getImage(radar, state) {
    if (radar.zoomLevel === this._prevZoomLevel && state === this._prevState) {
      return this.canvas;
    }

    this.canvas.width = 200;
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

    this.renderStationIcon(4, 0);

    ctx.fillStyle = colors[state];
    ctx.fillText(this.name, 16, 9);

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
