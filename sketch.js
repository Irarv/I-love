let stars = [];
let hearts = [];
let textos = ["TE AMO", "ERES MI VIDA", "MI AMOR", "MI CIELO", "MI CORAZÓN", "TE QUIERO"];
let musica;
let fuente;

// --- Funciones de Carga ---

function preload() {
  // 1. Fuente para WEBGL (obligatorio)
  // Nota: Es mejor descargar la fuente y usarla localmente para mayor fiabilidad.
  // Usamos el enlace proporcionado.
  fuente = loadFont("https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf");

  // 2. Música
  // Se añade una función de callback para verificar si se cargó correctamente.
  musica = loadSound(
    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_66449b881e.mp3?filename=deep-ambient-110624.mp3",
    // Callback si la carga es exitosa
    () => console.log("Música cargada con éxito."),
    // Callback si la carga falla
    (error) => console.error("Error al cargar la música:", error)
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // --- Inicialización de Recursos ---

  // 1. Música
  // userStartAudio() es la mejor práctica para iniciar el audio tras la interacción del usuario.
  // Solo intentamos reproducir si la música ha cargado y está lista.
  if (musica.isLoaded()) {
    musica.setVolume(0.4);
    musica.loop();
  } else {
    console.warn("Música no disponible para reproducir.");
  }


  // 2. Estrellas
  // Inicialización simplificada usando la clase Star (ver más abajo)
  for (let i = 0; i < 1500; i++) {
    stars.push(new Star());
  }

  // 3. Corazones pequeños
  // Inicialización simplificada usando la clase Heart (ver más abajo)
  for (let i = 0; i < 50; i++) {
    hearts.push(new Heart());
  }

  // 4. Aplicar fuente cargada
  textFont(fuente);
}

// --- Función Principal de Dibujo ---

function draw() {
  background(0);

  // Rotación global
  rotateY(frameCount * 0.002);
  rotateX(frameCount * 0.001);

  // 1. Galaxia rosada (Disco espiral)
  push();
  rotateY(frameCount * 0.0008);
  noStroke();
  fill(255, 80, 180, 40);
  for (let i = 0; i < 40; i++) {
    ellipse(0, 0, 1500 + i * 30, 300 + i * 10);
  }
  pop();

  // 2. Estrellas
  stroke(255);
  for (let s of stars) {
    s.show();
  }

  // 3. Corazones
  for (let h of hearts) {
    h.move(); // Le damos movimiento a los corazones
    h.show();
  }

  // 4. Texto romántico (Centro de la galaxia)
  push();
  rotateY(-frameCount * 0.002);
  fill(255, 150, 220);
  textSize(60);
  textAlign(CENTER, CENTER);
  // El uso del módulo (%) es excelente para ciclar los textos.
  text(textos[int(frameCount / 80) % textos.length], 0, 0);
  pop();

  // 5. Sol/Núcleo brillante
  push();
  fill(255, 180, 50, 200);
  noStroke();
  sphere(40);
  pop();
}

// --- Clases para Estrellas y Corazones (Mejor Organización) ---

// Clase Star (Reemplaza los objetos literales en el array stars)
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
    point(0, 0);
    pop();
  }
}

// Clase Heart
class Heart {
  constructor() {
    this.x = random(-600, 600);
    this.y = random(-400, 400);
    this.z = random(-300, 300);
    this.size = random(20, 40);
  }

  // Actualiza la posición del corazón para el movimiento oscilatorio
  move() {
    // Usamos las coordenadas iniciales + el desplazamiento sinusoidal
    this.tx = this.x + sin(frameCount * 0.01 + this.x) * 50;
    this.ty = this.y + cos(frameCount * 0.01 + this.y) * 50;
  }

  show() {
    push();
    // Usamos las posiciones actualizadas
    translate(this.tx, this.ty, this.z);
    rotateY(frameCount * 0.01);
    this.drawHeartShape(this.size); // Llama al método de dibujo de la forma
    pop();
  }
  
  // Función para dibujar la forma del corazón (método del objeto Heart)
  drawHeartShape(size) {
    push();
    fill(255, 0, 140); // Color rojo/rosa brillante
    noStroke();
    beginShape();
    // La fórmula del cardioide es perfecta para esto
    for (let t = 0; t < TWO_PI; t += 0.05) {
      let x = 16 * pow(sin(t), 3);
      let y = -(13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t));
      vertex(x * size * 0.05, y * size * 0.05);
    }
    endShape(CLOSE);
    pop();
  }
}


// --- Función de Redimensionamiento ---

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
