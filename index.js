// Selectors
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

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

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

const platformImage = createImage("./img/platform.png");

const player = new Player();
const platforms = [
  new Platform({
    x: -1,
    y: 470,
    image: platformImage,
  }),
  new Platform({
    x: platformImage.width - 3,
    y: 470,
    image: platformImage,
  }),
];
const genericObjects = [
  new GenericObject({
    x: -1,
    y: -1,
    image: createImage("./img/background.png"),
  }),
  new GenericObject({
    x: 0,
    y: 0,
    image: createImage("./img/hills.png"),
  }),
];

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let scrollOffset = 0;

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  genericObjects.forEach((genericObject) => {
    genericObject.draw();
  });

  platforms.forEach((platform) => {
    platform.draw();
  });
  player.update();

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;

    if (keys.right.pressed) {
      scrollOffset += 5;
      platforms.forEach((platform) => {
        platform.position.x -= 5;
      });
    } else if (keys.left.pressed) {
      scrollOffset -= 5;
      platforms.forEach((platform) => {
        platform.position.x += 5;
      });
    }
  }

  // Platform Collision Detection
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >= platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }

    if (scrollOffset > 2000) {
      console.log("you win");
    }
  });
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
