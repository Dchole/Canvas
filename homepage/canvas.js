const canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

colors = ["red", "blue", "green", "yellow"];

let mouse = {
  x: undefined,
  y: undefined
};

window.addEventListener("mousemove", event => {
  mouse.x = event.x;
  mouse.y = event.y;
});

console.log(mouse.x, mouse.y);

function randomRange(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function randomColor(color) {
  return color[Math.floor(Math.random() * color.length)];
}

function distance(oldPosX, oldPosY, newPosX, newPosY) {
  return Math.sqrt(
    Math.abs(Math.pow(newPosY - oldPosY, 2) - Math.pow(newPosX - oldPosX, 2))
  );
}

class Particles {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.draw = _ => {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    };

    this.update = _ => {
      this.x += distance(this.x, this.y, mouse.x, mouse.y) * 1;
      this.y += distance(this.x, this.y, mouse.x, mouse.y) * 1;

      this.draw();
    };
  }
}
console.log(distance(canvas.width, 10, 100, 400));
function init() {
  particles = [];
  for (let i = 0; i < 10; i++) {
    let x = canvas.width / 2,
      y = canvas.height / 2,
      radius = 5;
      particles.push(new Particles(x, y, radius, randomColor(colors)));
  }
}

function render() {
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => {
    particle.update();
  });
  requestAnimationFrame(render);
}

init();
render();
