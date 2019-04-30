const canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const colors = ['red', 'yellow', 'green', 'blue'];

function random(min, max) {
    return Math.random() * (max - min + 1) + min;
}

function randomColor() {
    return colors[Math.floor(Math.random() * (colors.length + 1))]
}

function radians(angle) {
    return angle / 180 * Math.PI;
}
let r = 0;
class Particle {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;

        this.draw = _ => {
            ctx.beginPath();
            ctx.save();
            ctx.rotate(radians(30));
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }

        this.update = _ => {
            // this.x = canvas.width / 2 + Math.cos(radians(180)) * 10;
            // this.y = canvas.height / 1.2 + Math.sin(radians(r)) * 90;

            this.x += this.dx;
            this.y += this.dy;

            if (this.y <= 0 || this.x >= (canvas.width / 2) + 400 || this.x <= (canvas.width / 2) - 400) {
                this.y = canvas.height / 1.2;
                this.x = canvas.width / 2;
            }

            // r += 1;
            this.draw();
        }
    }
}

particles = [];
for (let i = 0; i < 300; i++) {
    let x = canvas.width / 2,
        y = canvas.height / 1.2,
        dx = 0,
        dy = random(-15, -10),
        radius = 3;
    particles.push(new Particle(x, y, dx, dy, radius, randomColor(colors)))
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
    });
    requestAnimationFrame(render);
}

render();