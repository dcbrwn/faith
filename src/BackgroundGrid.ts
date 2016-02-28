export default class BackgroundGrid {
  public canvas: any;
  private context: any;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    this.setZoom(2);
  }

  setZoom(zoom: number) {
    const sx = this.canvas.width = 100 * zoom;
    const sy = this.canvas.height = 100 * zoom;
    const ctx = this.context;

    ctx.translate(0.5, 0.5);

    ctx.fillStyle = '#282828';
    ctx.fillRect(0, 0, sx, sy);

    ctx.strokeStyle = '#323232';
    ctx.setLineDash([]);
    ctx.beginPath();
    for (let i = sx / 10; i < sx; i += sx / 10) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, sy);
    }
    for (let i = sy / 10; i < sx; i += sy / 10) {
      ctx.moveTo(0, i);
      ctx.lineTo(sx, i);
    }
    ctx.stroke();

    ctx.strokeStyle = '#707070';
    ctx.setLineDash([5]);
    ctx.lineDashOffset = 2.5;
    ctx.beginPath();
    ctx.lineCap = 'square';
    ctx.moveTo(0, 0);
    ctx.lineTo(0, sy);
    ctx.moveTo(0, 0);
    ctx.lineTo(sx, 0);
    ctx.stroke();
  }
}
