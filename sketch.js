let estrellas = [];
let fotos = [];
let corazones = [];
let textos = ["Te amo", "Mi universo", "Eres especial", "Love U"];

function preload() {
  fotos.push(loadImage("https://i.imgur.com/UMW7QZb.png"));
  fotos.push(loadImage("https://i.imgur.com/Vz8iA6A.png"));
  corazones.push(loadImage("https://i.imgur.com/0Z3pQ0c.png"));
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  for (let i = 0; i < 1000; i++) {
    estrellas.push({
      x: random(-2000, 2000),
      y: random(-2000, 2000),
      z: random(-2000, 2000),
      s: random(1, 4)
    });
  }
}

function draw() {
  background(0);

  rotateY(frameCount * 0.0015);
  rotateX(frameCount * 0.0007);

  for (let e of estrellas) {
    push();
    translate(e.x, e.y, e.z);
    noStroke();
    fill(255);
    sphere(e.s);
    pop();
  }

  push();
  noStroke();
  fill(255, 100, 200, 40);
  for (let i = 0; i < 20; i++) {
    rotateY(0.1);
    ellipse(0, 0, 900 + i * 40, 300 + i * 15);
  }
  pop();

  for (let i = 0; i < fotos.length; i++) {
    push();
    rotateY(frameCount * 0.002 + i);
    translate(350 * cos(i + frameCount * 0.002), 200 * sin(i + 1), -400);
    texture(fotos[i]);
    plane(200, 200);
    pop();
  }

  for (let i = 0; i < 6; i++) {
    push();
    rotateY(frameCount * 0.003 + i);
    translate(250 * cos(i * 2), 150 * sin(i * 1.3), -200);
    texture(corazones[0]);
    plane(120, 120);
    pop();
  }

  push();
  fill(255);
  textSize(55);
  textAlign(CENTER, CENTER);
  text(textos[int(frameCount / 120) % textos.length], 0, 0);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
