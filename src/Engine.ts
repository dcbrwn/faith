import Radar from './radar/Radar';
import Universe from './universe/Universe';
import UniverseGenerator from './universe/UniverseGenerator';

export default class Engine {
  public universe: Universe;
  public radar: Radar;

  private running: boolean;
  private time: number;

  constructor(options) {
    const universeGenerator = new UniverseGenerator();
    this.universe = universeGenerator.generate();
    this.radar = new Radar({
      universe: this.universe,
      canvasId: options.canvasId,
    });
    this.running = false;
    this.time = Date.now();
  }

  private tick() {
    if (this.running) {
      const currentTime = Date.now(); 
      this.universe.tick((currentTime - this.time) * 0.001);
      this.radar.render();
      this.time = currentTime;
      requestAnimationFrame(this.tick.bind(this));
    }
  }

  start() {
    this.running = true;
    this.tick();
  };

  stop() {
    this.running = false;
  }
}
