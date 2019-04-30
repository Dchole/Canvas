window.onload = function () {
    let canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        ship = particle.create(width / 2, height / 2, 0, 0),
        thrust = vector.create(0, 0);

    update();

    document.body.addEventListener("keydown", function (event) {
        console.log(event.keyCode);
    });

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        requestAnimationFrame(update);
    }

};