import Radar from './Radar';
import Universe from './Universe';

export default class Faith {
  public universe: Universe;
  public radar: Radar;

  private _running: boolean;
  private _time: number;

  constructor(options) {
    this.universe = new Universe();
    this.radar = new Radar({
      universe: this.universe,
      canvasId: options.canvasId,
    });
    this._running = false;
    this._time = Date.now();
  }

  _tick() {
    if (this._running) {
      const currentTime = Date.now(); 
      this.universe.tick((currentTime - this._time) * 0.001);
      this.radar.render();
      this._time = currentTime;
      requestAnimationFrame(this._tick.bind(this));
    }
  }

  start() {
    this._running = true;
    this._tick();
  };

  stop() {
    this._running = false;
  }
}
