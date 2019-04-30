window.onload = function () {
    let canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d');
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    let centerY = height / 2,
        centerX = width / 2,
        baseRadius = 100,
        offset = 50,
        speed = 0.1,
        angle = 0;

    render();

    function render() {
        let radius = baseRadius + Math.sin(angle) * offset;

        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
        ctx.fill();

        angle += speed;

        requestAnimationFrame(render);
    }
};