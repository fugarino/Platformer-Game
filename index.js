// Selectors
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Gravity
const gravity = 0.5;

// Player Class
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 30;
    this.height = 30;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) this.velocity.y += gravity;
    else this.velocity.y = 0;
  }
}

const player = new Player();

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  player.update();

  if (keys.right.pressed) {
    player.velocity.x = 5;
  } else if (keys.left.pressed) {
    player.velocity.x = -5;
  } else player.velocity.x = 0;
}
animate();

// EventListeners
window.addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "w":
      player.velocity.y = -20;
      break;
    case "a":
      keys.left.pressed = true;
      //   player.velocity.x = -5;
      break;
    case "s":
      break;
    case "d":
      keys.right.pressed = true;
      //   player.velocity.x = 5;
      break;
  }
});

window.addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "w":
      break;
    case "a":
      keys.left.pressed = false;
      //   if (!keys.left.pressed) player.velocity.x = 0;
      break;
    case "s":
      break;
    case "d":
      keys.right.pressed = false;
      //   if (!keys.right.pressed) player.velocity.x = 0;
      break;
  }
});
