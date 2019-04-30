const canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

function randomRange(min, max) {
    return Math.random() * (max - min + 1) + min;
}

const fl = 100,
    shapes = [],
    numShapes = 100;

for (let i = 0; i < numShapes; i++) {
    shapes[i] = {
        x: randomRange(-1000, 1000),
        y: randomRange(-1000, 1000),
        z: randomRange(0, 10000)
    }
}

ctx.translate(canvas.width / 2, canvas.height / 2);

function update() {
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    for (let i = 0; i < numShapes; i++) {
        let shape = shapes[i],
            perspective = fl / (fl + shape.z);

        ctx.save();
        ctx.scale(perspective, perspective);
        ctx.translate(shape.x, shape.y);
        ctx.fillRect(-100, -100, 300, 200);
        ctx.restore();

        shape.z -= 5;
        if (shape.z < 0) {
            shape.z = 10000;
        }
    }
    requestAnimationFrame(update)
}

update();