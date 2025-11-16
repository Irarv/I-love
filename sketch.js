// --- Variables Globales ---
let stars = [];
let hearts = [];
let textos = ["MI VIDA", "MI AMOR", "MI CIELO", "TE ADORO", "ERES MI TODO", "PARA SIEMPRE"];
let musica;
let fuente;

// --- Clase Corazón 3D ---
class Heart {
  constructor() {
    this.x = random(-600, 600);
    this.y = random(-400, 400);
    this.z = random(-300, 300);
    this.size = random(15, 30); // Corazones pequeños
    this.speed = random(0.005, 0.015);
  }

  // Movimiento oscilatorio suave
  move() {
    this.tx = this.x + sin(frameCount * this.speed * 2 + this.x * 0.01) * 80;
    this.ty = this.y + cos(frameCount * this.speed * 2 + this.y * 0.01) * 80;
    this.tz = this.z + sin(frameCount * this.speed + this.z * 0.01) * 50;
  }

  // Dibujo del corazón
  show() {
    push();
    translate(this.tx, this.ty, this.tz);
    
    // Rotación lenta e individual
    rotateX(frameCount * this.speed * 0.5);
    rotateY(frameCount * this.speed);
    
    // Dibujar la forma 2D del corazón (se ve 3D por la rotación en el espacio 3D)
    fill(255, 0, 140, 200); // Rosa intenso
    noStroke();
    
    beginShape();
    // Fórmula paramétrica del corazón
    for (let t = 0; t < TWO_PI; t += 0.05) {
      let x = 16 * pow(sin(t), 3);
      let y = -(13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t));
      vertex(x * this.size * 0.05, y * this.size * 0.05);
    }
    endShape(CLOSE);
    
    pop();
  }
}

// --- Clase Estrella ---
class Star {
  constructor() {
    this.x = random(-3000, 3000);
    this.y = random(-3000, 3000);
    this.z = random(-3000, 3000);
    this.size = random(1, 3);
  }

  show() {
    push();
    translate(this.x, this.y, this.z);
    strokeWeight(this.size);
    stroke(255); // Color blanco
    point(0, 0);
    pop();
  }
}

// --- Funciones de p5.js ---

function preload() {
  // Carga la fuente para el texto 3D
  fuente = loadFont("https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf");
  
  // Carga la música. Se recomienda usar una URL local o una de confianza.
  musica = loadSound(
    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_66449b881e.mp3?filename=deep-ambient-110624.mp3",
    () => console.log("Música cargada."),
    (e) => console.error("Error al cargar la música:", e)
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  // Música
  // userStartAudio() se llama en el index.html al hacer clic para iniciar.
  musica.setVolume(0.4);
  musica.loop();

  // Inicializar estrellas (Galaxia)
  for (let i = 0; i < 2000; i++) {
    stars.push(new Star());
  }

  // Inicializar corazones
  for (let i = 0; i < 70; i++) {
    hearts.push(new Heart());
  }

  textFont(fuente);
}

function draw() {
  background(0); // Fondo negro total

  // Rotación general de la vista
  rotateY(frameCount * 0.001);
  rotateX(frameCount * 0.0005);

  // 1. Dibujar Estrellas
  for (let s of stars) {
    s.show();
  }
  
  // 2. Dibujar Corazones 3D (Se mueven y rotan)
  for (let h of hearts) {
    h.move();
    h.show();
  }
  
  // 3. Galaxia (Disco espiral suave)
  push();
  rotateY(frameCount * 0.0008);
  noStroke();
  fill(255, 80, 180, 30); // Rosado transparente
  for (let i = 0; i < 40; i++) {
    // Dibujar elipses concéntricas y estiradas
    ellipse(0, 0, 1500 + i * 30, 300 + i * 10);
  }
  pop();

  // 4. Texto Romántico (Centro de la Galaxia)
  push();
  // Rotación independiente para que el texto sea el foco
  rotateY(-frameCount * 0.002); 
  
  // Alternar texto cada 120 frames (2 segundos a 60 fps)
  let textoActual = textos[int(frameCount / 120) % textos.length];
  
  fill(255, 150, 220); // Rosado claro
  textSize(80);
  textAlign(CENTER, CENTER);
  
  // Texto en 3D
  text(textoActual, 0, 0, 0); 
  pop();

  // 5. Sol/Núcleo Brillante (Pequeño punto de luz en el centro)
  push();
  fill(255, 180, 50, 200);
  noStroke();
  sphere(30);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
