class Game {

  constructor(canvas) {
    this.UPDATE_INTERVAL = 1000 / 50;
    this.RENDER_INTERVAL = 1000 / 120;

    this.canvas = canvas;
    this.canvasRenderingContext = canvas.getContext("2d");
    this.lastUpdateTimestamp = 0;
    this.lastRenderTimestamp = 0;
    this.gameObjects = [];
    this.gameObjects.push(new GameObject());
  }

  start() {
    console.log('start');
    window.requestAnimationFrame(() => this.updateLoop());
    window.requestAnimationFrame(() => this.renderLoop());
    console.log('end');
  }

  updateLoop(timestamp) {
    let timePassed = timestamp - this.lastUpdateTimestamp;
    if (timePassed > this.UPDATE_INTERVAL) {
      this.update();
      this.lastUpdateTimestamp = timestamp;
    }
    window.requestAnimationFrame((timestamp) => this.updateLoop(timestamp));
  }

  renderLoop(timestamp) {
    let timePassed = timestamp - this.lastRenderTimestamp;
    if (timePassed > this.RENDER_INTERVAL) {
      this.render();
      this.lastRenderTimestamp = timestamp;
    }
    window.requestAnimationFrame((timestamp) => this.renderLoop(timestamp));
  }

  update() {
    this.gameObjects.forEach(g => g.update());
  }

  render() {
    this.gameObjects.forEach(g => g.render(this.canvasRenderingContext));
  }

}

class GameObject {

  constructor() {
    this.px = 50;
    this.py = 50;
    this.sx = 50;
    this.sy = 50;
    this.lineWidth = 4;
    this.strokeStyle = "green";
  }

  update() {

  }

  render(ctx) {
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;
    ctx.rect(this.px, this.py, this.sx, this.sy);
    ctx.stroke();
  }

}