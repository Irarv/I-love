let stars = [];
let hearts = [];
let textos = ["TE AMO", "ERES MI VIDA", "MI AMOR", "MI CIELO", "MI CORAZÓN", "TE QUIERO"];
let musica;

// ------- Cargar música -------
function preload() {
  musica = loadSound("https://cdn.pixabay.com/download/audio/2022/03/15/audio_66449b881e.mp3?filename=deep-ambient-110624.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // Reproducir música al iniciar
  userStartAudio().then(() => {
    musica.setVolume(0.5);
    musica.loop();
  });

  // Estrellas
  for (let i = 0; i < 1500; i++) {
    stars.push({
      x: random(-3000, 3000),
      y: random(-3000, 3000),
      z: random(-3000, 3000),
      size: random(1, 3)
    });
  }

  // Corazones (muchos y pequeños)
  for (let i = 0; i < 50; i++) {
    hearts.push({
      x: random(-600, 600),
      y: random(-400, 400),
      z: random(-300, 300),
      size: random(20, 40)
    });
  }
}

function draw() {
  background(0);

  // --- Galaxia al fondo ---
  push();
  rotateY(frameCount * 0.0008);
  noStroke();
  fill(255, 80, 180, 40);
  for (let i = 0; i < 40; i++) {
    ellipse(0, 0, 1500 + i * 30, 300 + i * 10);
  }
  pop();

  // --- Estrellas 3D ---
  stroke(255);
  for (let s of stars) {
    push();
    translate(s.x, s.y, s.z);
    strokeWeight(s.size);
    point(0, 0);
    pop();
  }

  // --- Corazones flotando ---
  for (let h of hearts) {
    push();
    translate(
      h.x + sin(frameCount * 0.01 + h.x) * 50,
      h.y + cos(frameCount * 0.01 + h.y) * 50,
      h.z
    );
    rotateY(frameCount * 0.01);
    drawHeart(h.size);
    pop();
  }

  // --- Texto romántico girando ---
  push();
  rotateY(-frameCount * 0.002);
  fill(255, 150, 220);
  textSize(60);
  textAlign(CENTER, CENTER);
  text(textos[int(frameCount / 80) % textos.length], 0, 0);
  pop();

  // --- Sol brillante en el centro ---
  push();
  fill(255, 180, 50, 200);
  noStroke();
  sphere(40);
  pop();
}

function drawHeart(size) {
  push();
  fill(255, 0, 140);
  noStroke();
  beginShape();
  for (let t = 0; t < TWO_PI; t += 0.05) {
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
