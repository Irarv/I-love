let stars = [];
let hearts = [];
let textos = ["TE AMO", "MI AMOR", "ERES MI TODO", "MI VIDA", "MI CIELO"];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // Estrellas
  for (let i = 0; i < 1000; i++) {
    stars.push({
      x: random(-2000, 2000),
      y: random(-2000, 2000),
      z: random(-2000, 2000),
      size: random(1, 4)
    });
  }

  // Corazones flotando
  for (let i = 0; i < 20; i++) {
    hearts.push({
      x: random(-600, 600),
      y: random(-400, 400),
      z: random(-300, 300),
      size: random(40, 90)
    });
  }
}

function draw() {
  background(0);

  rotateY(frameCount * 0.002);
  rotateX(frameCount * 0.001);

  // Estrellas tipo galaxia
  stroke(255);
  for (let s of stars) {
    push();
    translate(s.x, s.y, s.z);
    strokeWeight(s.size);
    point(0, 0);
    pop();
  }

  // Corazones 3D
  for (let h of hearts) {
    push();
    translate(
      h.x + sin(frameCount * 0.01) * 80,
      h.y + cos(frameCount * 0.01) * 80,
      h.z
    );
    rotateY(frameCount * 0.01);
    drawHeart(h.size);
    pop();
  }

  // Texto girando
  push();
  rotateY(-frameCount * 0.002);
  fill(255, 100, 200);
  textSize(50);
  textAlign(CENTER, CENTER);
  text(textos[int(frameCount / 100) % textos.length], 0, 0);
  pop();
}

// Función para dibujar corazones
function drawHeart(size) {
  push();
  fill(255, 0, 150);
  noStroke();
  beginShape();
  for (let t = 0; t < TWO_PI; t += 0.02) {
    let x = 16 * pow(sin(t), 3);
    let y = -(13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t));
    vertex(x * size * 0.05, y * size * 0.05);
  }
  endShape(CLOSE);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
