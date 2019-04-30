// Initial Setup 
const canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

const colors = [
    '#2185c5',
    '#7ecefd',
    '#fff8e5',
    '#ff7f88'
];

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

// Utility Functions
function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// Objects
class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.velocity = {
            x: (Math.random() - 0.5) * 5,
            y: (Math.random() - 0.5) * 5
        }
        this.radius = radius;
        this.color = color;

        this.draw = _ => {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.strokeStyle = this.color;
            ctx.stroke();
            ctx.closePath();
        };

        this.update = particles => {
            this.draw();

            for (let i = 0; i < particles.length; i++) {
                if (this === particles[i]) continue;
                if (distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0) {}
                console.log('has collided')
            }

            if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
                this.velocity.x = -this.velocity.x;
            }

            if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
                this.velocity.y = -this.velocity.y;
            }

            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }
    }
}

// Implementation
let particles;

function init() {
    particles = [];

    for (let i = 0; i < 4; i++) {
        const radius = 80;
        let x = randomRange(radius, canvas.width - radius);
        let y = randomRange(radius, canvas.height - radius);
        const color = 'blue';

        if (i !== 0) {
            for (let j = 0; j < particles.length; j++) {
                if (distance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
                    x = randomRange(radius, canvas.width - radius);
                    y = randomRange(radius, canvas.height - radius);

                    j = -1;
                }
            }
        }

        particles.push(new Particle(x, y, radius, color));
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update(particles);
    });
}

init();
animate();