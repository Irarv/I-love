let stars = [];
let hearts = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Crear estrellas
  for (let i = 0; i < 500; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      z: random(0.5, 2)
    });
  }

  // Crear corazones
  for (let i = 0; i < 25; i++) {
    hearts.push({
      x: random(width),
      y: random(height),
      size: random(20, 50),
      speed: random(0.3, 1)
    });
  }
}

function draw() {
  background(0);

  // Estrellas tipo galaxia
  noStroke();
  for (let s of stars) {
    fill(150 + random(80), 0, 255);
    circle(s.x, s.y, s.z * 3);

    s.x += (mouseX - width / 2) * 0.0005 * s.z;
    s.y += (mouseY - height / 2) * 0.0005 * s.z;
  }

  // Corazones flotando
  for (let h of hearts) {
    drawHeart(h.x, h.y, h.size);
    h.y -= h.speed;

    if (h.y < -50) {
      h.y = height + 50;
      h.x = random(width);
    }
  }
}

// Función para dibujar corazones
function drawHeart(x, y, size) {
  push();
  translate(x, y);
  fill(255, 0, 120, 180);
  noStroke();
  beginShape();
  for (let t = 0; t < TWO_PI; t += 0.05) {
    let px = 16 * pow(sin(t), 3);
    let py = -(13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t));
    vertex(px * size * 0.1, py * size * 0.1);
  }
  endShape(CLOSE);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
