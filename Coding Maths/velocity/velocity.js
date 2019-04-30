window.onload = function () {
    let canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        particles = [],
        numParticles = 50;
    gravity = vector.create(0, 0.1);

    for (i = 0; i < numParticles; i++) {
        particles.push(particle.create(width / 2, height / 3, Math.random() * 5 + 2, Math.random() * Math.PI * 2));
    }

    update();

    function update() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < numParticles; i++) {
            let p = particles[i];

            p.accelerate(gravity);
            p.update();

            ctx.beginPath();
            ctx.arc(p.position.getX(), p.position.getY(), 2, 0, Math.PI * 2);
            ctx.fill();

            requestAnimationFrame(update);
        }
    }
};