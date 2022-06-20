let width = window.innerWidth;
let height = window.innerHeight;
let [fire, parts] = [
  [],
  []
];
let updateinterval;
(function() {
  let canvas = document.querySelector('canvas')
  canvas.width = width
  canvas.height = height
  let context = canvas.getContext('2d')
  let background = context.createLinearGradient(0, 0, 0, height)
  background.addColorStop(0, 'darkblue')
  background.addColorStop(0.3, 'rgb(75,0,130)')
  background.addColorStop(1, 'black')
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);

  for (let y = 0; y < 200; y++) {
    let size = Math.random() * 8;
    let posX = Math.random() * (width - 20)
    let posY = Math.random() * (height - 20)
    context.beginPath()
    context.fillStyle = 'white'
    context.fillRect(posX, posY, size, size)
  }
  context.fill()
})();


class part {
  constructor(x, y) {
    this.x = x
    this.y = y;
    this.opacity = 1;
    this.speed = Math.random() * 5 + 1
    this.angle = Math.random() * 2 * Math.PI;
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = -Math.sin(this.angle) * this.speed;
    this.time = 700;
    this.downtime = 20;
    this.element = document.createElement('div');

    this.element.className = "particle"
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
    this.element.style.backgroundColor = randomcolor()
    document.body.appendChild(this.element);
    setTimeout(() => {
      parts.splice(parts.indexOf(this), 1);
      this.interval = setInterval(() => {
        this.down();
      }, this.downtime);

      setTimeout(() => {
        window.clearInterval(this.interval)
        this.element.remove();
      }, this.time)
    }, 900);
  }

  down() {

    this.x += this.vx * 0.5
    this.element.style.left = this.x + 'px';
    this.y += 5
    this.element.style.top = this.y + 'px';
    this.opacity -= 0.02
    this.element.style.opacity = this.opacity
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
  }

}

class firework {
  constructor() {
    this.x = width / 2;
    this.y = height
    this.number = Math.random() * 50 + 150;
    this.speed = 10;
    this.angle = (Math.random() * Math.PI) / 2 + Math.PI / 4;
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = 1.15 * (-Math.sin(this.angle) * this.speed);
    this.element = document.createElement('div');
    this.element.className = 'fire';
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
    document.body.appendChild(this.element);

    setTimeout(() => {
      for (let y = 0; y < this.number; y++) {
        let particle = new part(this.x, this.y);
        parts.push(particle);
      }
      this.element.remove();
      fire.splice(fire.indexOf(this), 1);
    }, 700);
  }

  update() {
    this.x += 2 * this.vx;
    this.y += 2 * this.vy;
    this.vy += 0.2;
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
  }
}

setInterval(() => {
  let fireworks = new firework();
  fire.push(fireworks);
}, 1000);

setInterval(() => {
  fire.forEach(item => item.update());
  parts.forEach(item => item.update());
}, 20);

function randomcolor() {
  let color = ["rgba(245, 245, 245,1)", "rgba(255,255,0,1)", "rgba(0,255,255,1)", "rgba(147, 250, 165,1)", "rgba(0, 230, 64,1)", "rgba(127,255,0,1)", "rgba(0,255,255,1)", "rgba(255, 140, 0,1)", "rgba(255,0,255,1)", "rgbq(0,255,0,1)", "rgba(245,255,250,1)", "rgba(255,0,255,1)", "rgba(255, 250, 205,1)", "rgba(255, 20, 147,1)", "rgba(255, 248, 220,1)", "rgba(127, 255, 212,1)", "rgba(0, 255, 255,1)", "rgba(240, 255, 255,1)", "rgba(255,0,0,1)", "gold"]
  let ran = Math.floor(Math.random() * color.length)
  return color[ran]
}
