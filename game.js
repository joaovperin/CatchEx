class Game {

  constructor(canvas) {
    this.UPDATE_INTERVAL = 1000 / 50;
    this.RENDER_INTERVAL = 1000 / 120;

    this.canvas = canvas;
    this.canvasRenderingContext = canvas.getContext("2d");
    this.lastUpdateTimestamp = 0;
    this.lastRenderTimestamp = 0;
    this.gameObjects = [];
  }

  addGameObject(gameObject) {
    this.gameObjects.push(gameObject);
  }

  start() {
    window.dispatchEvent(new CustomEvent('gamestart'));
    window.requestAnimationFrame(() => this.updateLoop());
    window.requestAnimationFrame(() => this.renderLoop());
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

  constructor(px, py, sx, sy) {
    this.px = px;
    this.py = py;
    this.sx = sx;
    this.sy = sy;
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

class Player extends GameObject {

  constructor() {
    super(250, 250, 120, 120);
  }

}

const pressedKeys = [];

window.addEventListener('gamestart', () => {
  console.log('Game Started!!');
  game.addGameObject(new Player());
});

window.addEventListener('keydown', (k) => {
  let keyCode = k.keyCode;
  if (keyCode === 38) pressedKeys.push({ key: 'up' });
  if (keyCode === 40) pressedKeys.push({ key: 'down' });
  if (keyCode === 37) pressedKeys.push({ key: 'left' });
  if (keyCode === 39) pressedKeys.push({ key: 'right' });
  console.log('Press: ' + keyCode);
});

window.addEventListener('keyup', (k) => {
  let keyCode = k.keyCode;
  if (keyCode === 38) pressedKeys.push({ key: 'up' });
  if (keyCode === 40) pressedKeys.push({ key: 'down' });
  if (keyCode === 37) pressedKeys.push({ key: 'left' });
  if (keyCode === 39) pressedKeys.push({ key: 'right' });
  console.log('Release: ' + keyCode);
});