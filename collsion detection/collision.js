let canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

p = [
    { x: 150, y: 100 },
    { x: 500, y: 100 }
];

let velocity = 0.01,
    acceleration = 0.01,
    distance = Math.sqrt(((p[1].y - p[0].y) * (p[1].y - p[0].y)) + ((p[1].x - p[0].x) * (p[1].x - p[0].x))),
    radiusA = 50,
    radiusB = 100;



function draw() {
    ctx.beginPath();
    ctx.arc(p[0].x, p[0].y, radiusA, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(p[1].x, p[1].y, radiusB, 0, Math.PI * 2);
    ctx.stroke();
}

function update() {
    velocity += acceleration;
    p[0].x += velocity;
    draw();
    distance = Math.sqrt(((p[1].y - p[0].y) * (p[1].y - p[0].y)) + ((p[1].x - p[0].x) * (p[1].x - p[0].x)));
};

radius = radiusA + radiusB;

function collision() {
    if (distance <= radius) {
        ctx.fillStyle = 'black';
        ctx.fill()
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    collision();
    requestAnimationFrame(animate);
};
animate();