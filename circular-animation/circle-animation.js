const canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
};

const colors = ['#00bdff', '#4d39ce', '#088eff', '#0ff', 'maroon', '#f4f4f4', 'red', 'green'];

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', _ => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.radians = Math.random() * Math.PI * 2;
        this.distance = 100;
        this.lastMouse = {
            x: x,
            y: y
        };

        this.draw = lastPoint => {
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.radius;
            ctx.lineCap = 'round';
            ctx.moveTo(lastPoint.x, lastPoint.y);
            ctx.lineTo(this.x, this.y);
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
            ctx.stroke();
        };


        this.update = _ => {
            const lastPoint = {
                x: this.x,
                y: this.y
            };

            this.x = mouse.x + Math.cos(this.radians) * this.distance;
            this.y = mouse.y + Math.sin(this.radians) * this.distance;

            if (this.distance >= 100) {
                this.color = '#0000';
            } else {
                this.color = color;
            }

            this.draw(lastPoint);
        };
    }
}

function init() {
    particles = [];
    for (i = 0; i < 200; i++) {
        let x = canvas.width / 2,
            y = canvas.height / 2,
            radius = 3,
            color = randomColor(colors);
        particles.push(new Particle(x, y, radius, color));
    }
}
const color = randomColor(colors);
let p = 0;

function animate() {
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (particles[p].distance > 0) {
        particles[p].distance -= 20;
    } else if (particles[p].distance <= 0) {
        particles[p].distance = 100;
        p++;
    }
    if (p == particles.length) {
        p = 0;
    }
    particles.forEach(particle => {
        particle.update();
    })
    requestAnimationFrame(animate);
}
init();
animate();