// Caching The DOM
const canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

// Ball Coordinates
let ballCor = {
  xcor: canvas.width / 2 - 15,
  ycor: canvas.height / 2 - 15
};

const paddle_speed = 0;

// Creating The Paddles
class Paddle {
  constructor(x, y, w, h, speed) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;

    this.draw = _ => {
      ctx.fillStyle = "white";
      ctx.fillRect(this.x, this.y, this.w, this.h);
    };

    this.update = _ => {
      this.y += this.speed;
      this.draw();
    };
  }
}

// Creating The Ball
function ball() {
  ctx.fillStyle = "white";
  ctx.fillRect(ballCor.xcor, ballCor.ycor, 30, 30);
}

// The initial Function
function init() {
  paddles = [];
  for (let i = 0; i < 3; i++) {
    paddles.push(new Paddle(30, canvas.height / 2 - 50, 30, 100, paddle_speed));
    paddles.push(
      new Paddle(
        canvas.width - 60,
        canvas.height / 2 - 50,
        30,
        100,
        paddle_speed
      )
    );
  }

  // Initializing The Ball Coordinates
  ballCor.xcor = canvas.width / 2 - 15;
  ballCor.ycor = canvas.height / 2 - 15;
}

// The Ball Speed
ball_speed = [4, -4];

ball_speedX = ball_speed[Math.floor(Math.random() * ball_speed.length)];
ball_speedY = ball_speed[Math.floor(Math.random() * ball_speed.length)];

// Rendering the Game
function render() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  paddles[0].update();
  paddles[1].update();

  // rendering the balls
  ball();
  ballCor.xcor += ball_speedX;
  ballCor.ycor += ball_speedY;

  // Edge handling
  if (ballCor.ycor < 0 || ballCor.ycor > canvas.height - 30) {
    ball_speedY = -ball_speedY;
  }
  if (ballCor.xcor < 0 || ballCor.xcor > canvas.width - 30) {
    init();
  }

  // Collision Detection
  if (
    ballCor.xcor + 30 >= paddles[1].x &&
    ballCor.ycor + 30 >= paddles[1].y &&
    ballCor.ycor + 30 <= paddles[1].y + 100
  ) {
    ball_speedX = -ball_speedX;
  }

  document.addEventListener("keydown", event => {
    switch (event.keyCode) {
      case 87:
        paddles[0].speed = -5;
        break;

      case 83:
        paddles[0].speed = 5;
        break;

      case 38:
        paddles[1].speed = -5;
        break;

      case 40:
        paddles[1].speed = 5;
        break;
    }
  });

  document.addEventListener("keyup", event => {
    switch (event.keyCode) {
      case 87:
        paddles[0].speed = 0;
        break;

      case 83:
        paddles[0].speed = 0;
        break;

      case 38:
        paddles[1].speed = 0;
        break;

      case 40:
        paddles[1].speed = 0;
        break;
    }
  });

  requestAnimationFrame(render);
}

init();
render();
