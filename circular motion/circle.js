let canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

let centerX = canvas.width / 2,
    centerY = canvas.height / 2;

let angle = 0,
    radius = 200,
    numObjects = 10,
    slice = Math.PI * 2 / numObjects;

function draw() {
    for (let i = 0; i < numObjects; i++) {
        angle = i * slice;
        x = centerX + Math.cos(angle) * radius;
        y = centerY + Math.sin(angle) * radius;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2, false);
        ctx.fill();
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    requestAnimationFrame(update);
}
update();