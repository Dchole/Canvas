window.onload = function () {
    let canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        fl = 300,
        shapes = [],
        numShapes = 100;

    function randomRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    for (let i = 0; i < numShapes; i++) {
        shapes[i] = {
            x: randomRange(-1000, 1000),
            y: randomRange(-1000, 1000),
            z: randomRange(0, 1000),
        };
    }

    ctx.translate(width / 2, height / 2);

    update();

    function update() {
        ctx.clearRect(-width / 2, -height / 2, width, height);
        for (let i = 0; i < numShapes; i++) {
            let shape = shapes[i],
                perspective = fl / (fl + shape.z);

            ctx.save();
            ctx.translate(shape.x * perspective, shape.y * perspective);
            ctx.scale(perspective, perspective);
            ctx.fillRect(100, 100, 200, 200);
            ctx.restore();

            shape.z += 5;
            if (shape.z > 10000) {
                shape.z = 0;
            }
        }
        requestAnimationFrame(update);
    }

};