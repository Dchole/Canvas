const canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

let mouse = {
    x: undefined,
    y: undefined
}

// Events
addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    console.log(mouse.x / canvas.width * 255)
})



function animate() {
    ctx.fillStyle = 'rgb(' + mouse.y / canvas.width * 255 + ',' + mouse.x / canvas.width * 255 + ',' + mouse.y / canvas.height * 255 + ')'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(animate)
}
animate();