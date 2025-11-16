// --- Variables Globales ---
let stars = [];
let hearts = [];
let textos = ["MI VIDA", "MI AMOR", "MI CIELO", "TE ADORO", "ERES MI TODO", "PARA SIEMPRE"];
let musica;
// Usamos una fuente genérica del sistema para evitar fallos de carga
let fuente = 'sans-serif'; 

// --- Clases Star y Heart (Sin Cambios, son estables) ---

class Heart {
  constructor() {
    this.x = random(-600, 600);
    this.y = random(-400, 400);
    this.z = random(-300, 300);
    this.size = random(15, 30);
    this.speed = random(0.005, 0.015);
  }

  move() {
    this.tx = this.x + sin(frameCount * this.speed * 2 + this.x * 0.01) * 80;
    this.ty = this.y + cos(frameCount * this.speed * 2 + this.y * 0.01) * 80;
    this.tz = this.z + sin(frameCount * this.speed + this.z * 0.01) * 50;
  }

  show() {
    push();
    translate(this.tx, this.ty, this.tz);
    rotateX(frameCount * this.speed * 0.5);
    rotateY(frameCount * this.speed);
    fill(255, 0, 140, 200);
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
    stroke(255);
    point(0, 0);
    pop();
  }
}


// --- Funciones de p5.js ---

function preload() {
  // Solo se intenta cargar la música. Si falla, el programa sigue.
  musica = loadSound(
    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_66449b881e.mp3?filename=deep-ambient-110624.mp3",
    () => console.log("Música cargada con éxito."),
    (error) => console.error("Error al cargar la música. El sketch seguirá sin audio.", error)
  );
}

function setup() {
  // Inicializa el canvas 3D
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  // Inicializar objetos
  for (let i = 0; i < 2000; i++) {
    stars.push(new Star());
  }
  for (let i = 0; i < 70; i++) {
    hearts.push(new Heart());
  }

  // Configuración de texto
  // IMPORTANTE: Ya no cargamos fuente, usamos una genérica del sistema.
  textSize(80); 
  textAlign(CENTER, CENTER);
  textFont(fuente);
  
  // Configuración de música (si cargó)
  if (musica.isLoaded()) {
    musica.setVolume(0.4);
    // Nota: El loop se inicia al hacer clic en el body (ver index.html)
  }
}

function draw() {
    background(0); // Fondo negro
    
    // Iniciar la música al hacer clic (si ya se cargó)
    if (musica.isLoaded() && !musica.isLooping() && getAudioContext().state === 'running') {
        musica.loop();
    }

    // Rotación general de la vista
    rotateY(frameCount * 0.001);
    rotateX(frameCount * 0.0005);

    // 1. Dibujar Estrellas
    stroke(255);
    for (let s of stars) {
        s.show();
    }
    
    // 2. Dibujar Corazones 3D
    for (let h of hearts) {
        h.move();
        h.show();
    }
    
    // 3. Galaxia (Disco espiral suave)
    push();
    rotateY(frameCount * 0.0008);
    noStroke();
    fill(255, 80, 180, 30);
    for (let i = 0; i < 40; i++) {
        ellipse(0, 0, 1500 + i * 30, 300 + i * 10);
    }
    pop();

    // 4. Texto Romántico (Centro de la Galaxia)
    push();
    rotateY(-frameCount * 0.002); 
    
    let textoActual = textos[int(frameCount / 120) % textos.length];
    
    fill(255, 150, 220);
    text(textoActual, 0, 0, 0); 
    pop();

    // 5. Sol/Núcleo Brillante
    push();
    fill(255, 180, 50, 200);
    noStroke();
    sphere(30);
    pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
