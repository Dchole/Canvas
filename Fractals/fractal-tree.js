window.onload = function () {
    let canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d');
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    let p0 = {
        x: width / 2,
        y: height - 50
    },
        p1 = {
            x: width / 2,
            y: 50
        },
        branchAngle = Math.PI / 10,
        trunkRatio = 0.2;

    tree(p0, p1, 12);

    function tree(p0, p1, limit) {
        let dx = p1.x - p0.x,
            dy = p1.y - p0.y,

            dist = Math.sqrt(dx * dx + dy * dy),
            angle = Math.atan2(dy, dx),
            branchLength = dist * (1 - trunkRatio),
            pA = {
                x: p0.x + dx * trunkRatio,
                y: p0.y + dy * trunkRatio
            },
            pB = {
                x: pA.x + Math.cos(angle + branchAngle) * branchLength,
                y: pA.y + Math.sin(angle + branchAngle) * branchLength
            },
            pC = {
                x: pA.x + Math.cos(angle - branchAngle) * branchLength,
                y: pA.y + Math.sin(angle - branchAngle) * branchLength
            };

        ctx.beginPath();
        ctx.lineWidth = branchLength * 0.03;
        ctx.strokeStyle = "#382f2f";
        ctx.fillStyle = "green";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(0,0,0,0.8)";
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(pA.x, pA.y);
        ctx.stroke();

        if (limit > 0) {
            tree(pA, pC, limit - 1);
            tree(pA, pB, limit - 1);
        }
        else {
            ctx.beginPath();
            ctx.moveTo(pB.x, pB.y);
            ctx.lineTo(pA.x, pA.y);
            ctx.lineTo(pC.x, pC.y);
            ctx.stroke();
        }

        if (limit <= 10) {
            ctx.beginPath();
            ctx.arc(pC.x, pC.y, 10, 0, Math.PI / 2);
            ctx.arc(pB.x, pB.y, 10, 0, Math.PI / 2);
            ctx.fill();
            ctx.restore();
            return;
        }

    }
}
