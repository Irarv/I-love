// --- Variables Globales ---
let stars = [];
let hearts = [];
let textos = ["MI VIDA", "MI AMOR", "MI CIELO", "TE ADORO", "ERES MI TODO", "PARA SIEMPRE"];
let musica;
let fuente;
let recursosCargados = false; // Nueva bandera para verificar la carga

// --- Clase Corazón 3D (Sin Cambios, Lógica de Dibujo) ---
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

// --- Clase Estrella (Sin Cambios) ---
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
  // 1. Cargar Fuente (con verificación de éxito/error)
  loadFont(
    "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf",
    (f) => {
      fuente = f;
      console.log("Fuente cargada con éxito.");
      // La música se carga dentro del callback de la fuente para asegurar la secuencia
      cargarMusica(); 
    },
    (error) => {
      // Si falla, se usa la fuente predeterminada (aunque no se vea en WEBGL)
      console.error("ERROR: No se pudo cargar la fuente. Usando fuente predeterminada.", error);
      fuente = 'sans-serif'; // Fallback
      cargarMusica(); // Continuar con la carga de música
    }
  );
}

function cargarMusica() {
    // 2. Cargar Música (con verificación de éxito/error)
    musica = loadSound(
        "https://cdn.pixabay.com/download/audio/2022/03/15/audio_66449b881e.mp3?filename=deep-ambient-110624.mp3",
        () => {
            console.log("Música cargada con éxito.");
            recursosCargados = true; // Marcar que todo está listo
        },
        (error) => {
            console.error("ERROR: No se pudo cargar la música. El sketch continuará sin audio.", error);
            // Marcar como cargado para que el sketch inicie aunque no haya música
            recursosCargados = true; 
        }
    );
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  // Inicializar estrellas (Galaxia)
  for (let i = 0; i < 2000; i++) {
    stars.push(new Star());
  }

  // Inicializar corazones
  for (let i = 0; i < 70; i++) {
    hearts.push(new Heart());
  }

  // Aplicar la fuente si se cargó correctamente
  if (fuente && typeof fuente !== 'string') {
    textFont(fuente);
  }
  
  // Música: Inicializar volumen, el loop se inicia en el draw después del chequeo.
  musica.setVolume(0.4);
}

function draw() {
    // **VERIFICACIÓN CRUCIAL:** Si los recursos aún no están cargados,
    // solo dibuja un fondo y un mensaje de "Cargando..."
    if (!recursosCargados) {
        background(0);
        fill(255);
        textSize(32);
        textAlign(CENTER, CENTER);
        // Mostrar "Cargando" al centro de la pantalla
        text("Cargando la Galaxia de Amor...", 0, 0); 
        return; // Detener la ejecución del resto de draw
    }
    
    // Si los recursos YA están cargados, continuar con la animación:
    background(0);

    // Música: Iniciar el loop solo si está cargada y no está sonando (evitar múltiples inicios)
    if (musica.isLoaded() && !musica.isLooping()) {
        musica.loop();
    }

    // Rotación general de la vista
    rotateY(frameCount * 0.001);
    rotateX(frameCount * 0.0005);

    // 1. Dibujar Estrellas
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
    textSize(80);
    textAlign(CENTER, CENTER);
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
