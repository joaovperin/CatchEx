class Game {

  constructor(canvas) {
    this.UPDATE_INTERVAL = 1000 / 50;
    this.RENDER_INTERVAL = 1000 / 120;

    this.canvas = canvas;
    this.canvasRenderingContext = canvas.getContext("2d");
    this.lastUpdateTimestamp = 0;
    this.lastRenderTimestamp = 0;
    this.gameObjects = [];
    this.player = null;
  }

  setPlayer(player) {
    this.player = player;
    this.addGameObject(player);
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
    this.canvasRenderingContext.clearRect(0, 0, 500, 500);
    this.gameObjects.forEach(g => g.render(this.canvasRenderingContext));
  }

}

class GameObject {

  constructor(px, py, sx, sy) {
    this.px = px;
    this.py = py;
    this.sx = sx;
    this.sy = sy;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
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

const vert_acc = 0.9;
const horz_acc = 0.9;
const stop_acc = 0.3;

class Player extends GameObject {

  constructor() {
    super(250, 250, 120, 120);
  }

  update() {
    if (pressedKeys['up']) this.ay -= vert_acc;
    if (pressedKeys['down']) this.ay += vert_acc;
    if (pressedKeys['left']) this.ax -= horz_acc;
    if (pressedKeys['right']) this.ax += horz_acc;

    this.ax -= this.ax * stop_acc;
    this.ay -= this.ay * stop_acc;
    //if (this.vx > 0) this.ax -= this.ax * stop_acc;
    //else if (this.vx < 0) this.ax += this.vx * this.vx;
    //this.ax += -(this.ax * stop_acc);
    //this.ay += -(this.ay * stop_acc);
    //if (this.vx > 0) this.ax -= this.ax * stop_acc;
    //else if (this.vx < 0) this.ax += this.vx * this.vx;
    //if (this.vy > 0) this.ay -= stop_acc * this.vy * this.vy;
    //if (this.vy < 0) this.ay += stop_acc * this.vy * this.vy;
    //this.ay += stop_acc * this.ay;

    this.vx += this.ax;
    this.vy += this.ay;

    this.px += this.vx;
    this.py += this.vy;

    // Collides with sides
    if (this.px > 500) this.px = 0;
    if (this.px < 0) this.px = 500;
    // Collides with top
    if (this.py < 0) {
      this.py = 0;
      this.vy = 0;
    };
    if (this.py > 300) {
      this.py = 300;
      this.vy = 0;
    };
    this.ax = 0;
    this.ay = 0;
  }

}

const pressedKeys = {
  'up': 0,
  'down': 0,
  'left': 0,
  'right': 0
};

window.addEventListener('gamestart', () => {
  console.log('Game Started!!');
  game.setPlayer(new Player());
});

window.addEventListener('keydown', (k) => {
  let keyCode = k.keyCode;
  if (keyCode === 38) pressedKeys['up'] = true;
  if (keyCode === 40) pressedKeys['down'] = true;
  if (keyCode === 37) pressedKeys['left'] = true;
  if (keyCode === 39) pressedKeys['right'] = true;
  //console.log('Press: ' + keyCode);
});

window.addEventListener('keyup', (k) => {
  let keyCode = k.keyCode;
  if (keyCode === 38) pressedKeys['up'] = false;
  if (keyCode === 40) pressedKeys['down'] = false;
  if (keyCode === 37) pressedKeys['left'] = false;
  if (keyCode === 39) pressedKeys['right'] = false;
  //console.log('Release: ' + keyCode);
});