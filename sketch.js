// ----- VARIABLES -----
let stars = [];
let hearts = [];
let textos = ["MI VIDA", "MI AMOR", "TE ADORO", "MI CIELO", "ERES TODO PARA MI", "PARA SIEMPRE JUNTOS"];
let fuente;

// ----- Cargar fuente válida (FUNCIONA EN WEBGL) -----
function preload() {
  fuente = loadFont("https://raw.githubusercontent.com/google/fonts/main/apache/roboto/Roboto-Regular.ttf");
}

// ----- CLASES -----
class Star {
  constructor() {
    this.x = random(-2500, 2500);
    this.y = random(-2500, 2500);
    this.z = random(-2500, 2500);
    this.size = random(1, 3);
  }
  show() {
    push();
    translate(this.x, this.y, this.z);
    stroke(255);
    strokeWeight(this.size);
    point(0, 0);
    pop();
  }
}

class Heart {
  constructor() {
    this.x = random(-600, 600);
    this.y = random(-400, 400);
    this.z = random(-300, 300);
    this.size = random(15, 30);
    this.speed = random(0.01, 0.02);
  }

  move() {
    this.tx = this.x + sin(frameCount * this.speed) * 60;
    this.ty = this.y + cos(frameCount * this.speed) * 60;
    this.tz = this.z;
  }

  show() {
    push();
    translate(this.tx, this.ty, this.tz);
    rotateY(frameCount * 0.02);
    fill(255, 0, 150);
    noStroke();
    beginShape();
    for (let t = 0; t < TWO_PI; t += 0.05) {
      let x = 16 * pow(sin(t), 3);
      let y = -(13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t));
      vertex(x * this.size * 0.05, y * this.size * 0.05);
    }
    endShape(CLOSE);
    pop();
  }
}

// ----- INICIO -----
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // estrellas
  for (let i = 0; i < 1500; i++) stars.push(new Star());

  // corazones
  for (let i = 0; i < 50; i++) hearts.push(new Heart());

  // texto
  textFont(fuente);
  textSize(70);
  textAlign(CENTER, CENTER);
}

// ----- DIBUJAR -----
function draw() {
  background(0);

  rotateY(frameCount * 0.001);
  rotateX(frameCount * 0.0005);

  // galaxia rosa
  push();
  rotateY(frameCount * 0.0008);
  fill(255, 80, 180, 40);
  noStroke();
  for (let i = 0; i < 40; i++) {
    ellipse(0, 0, 1500 + i * 30, 300 + i * 10);
  }
  pop();

  // estrellas
  for (let s of stars) s.show();

  // corazones
  for (let h of hearts) {
    h.move();
    h.show();
  }

  // texto romántico
  push();
  rotateY(-frameCount * 0.002);
  fill(255, 150, 220);
  let frase = textos[int(frameCount / 100) % textos.length];
  text(frase, 0, 0);
  pop();

  // sol central
  push();
  fill(255, 200, 50, 220);
  noStroke();
  sphere(35);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
