import Vector2 from './Vector2';

export default class Asteroid {
  public pos: Vector2;
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
    this.pos = options.pos;
    this.size = options.size;
    this.name = options.name;
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
  }

  renderAsteroidIcon(x, y) {
    const ctx = this.context;
    ctx.beginPath();
    ctx.moveTo(x + 5, y);
    ctx.lineTo(x + 10, y + 5);
    ctx.lineTo(x + 5, y + 10);
    ctx.lineTo(x, y + 5);
    ctx.closePath();
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

    const colors = {
      normal: '#86c1b9',
      selected: '#f7ca88',
      highlighted: '#f8f8f8',
    };

    ctx.fillStyle = colors[state];
    ctx.strokeStyle = colors[state];

    this.renderAsteroidIcon(0, 0);

    if (state !== 'normal') {
      ctx.fillText(this.name, 15, 9);
    }

    return this.canvas;
  }

  tick(deltaTime, universe) {
  }
}
