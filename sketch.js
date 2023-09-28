let fondoImg; // Variable para la imagen de fondo
let rectangulos = []; // Arreglo de rectángulos
let rectanguloInicial; // Rectángulo inicial en la esquina inferior izquierda

function preload() {
  fondoImg = loadImage('fondoIF.jpg'); // Carga tu imagen de fondo
}

function setup() {
  createCanvas(2000, 800); // Establece el tamaño del lienzo (ancho x alto)

  // Crea el rectángulo inicial en la esquina inferior izquierda
  rectanguloInicial = new RectanguloInicial(0, height - 60);

  // Crea los rectángulos en ubicaciones fijas
  let ubicacionesFijas = [
    { x: 90, y: 60, url: 'https://dominiquecarvajal.github.io/imagenescrita23-dominiquecarvajal/', nombre: 'Tarea 1' },
    { x: 200, y: 150, url: 'https://dominiquecarvajal.github.io/imagen-escrita-tarea2-23/', nombre: 'Tarea 2' },
    { x: 300, y: 200, url: 'https://dominiquecarvajal.github.io/tarea3-ie23-dominiquecarvajal/', nombre: 'Tarea 3' },
    { x: 400, y: 250, url: 'https://dominiquecarvajal.github.io/Tarea4-IE23-DominiqueCG/', nombre: 'Tarea 4' },
    { x: 150, y: 300, url: 'https://dominiquecarvajal.github.io/Tarea-5-IE-DC/', nombre: 'Tarea 5' },
    { x: 250, y: 350, url: 'https://dominiquecarvajal.github.io/Tarea-6-IE-DC/', nombre: 'Tarea 6' },
    { x: 350, y: 50, url: 'https://www.ejemplo.com/pagina7', nombre: 'Tarea 7' },
    { x: 450, y: 150, url: 'https://www.ejemplo.com/pagina8', nombre: 'Tarea 8' },
    { x: 550, y: 250, url: 'https://www.ejemplo.com/pagina9', nombre: 'Tarea 9' },
    { x: 650, y: 100, url: 'https://www.ejemplo.com/pagina10', nombre: 'Tarea 10' },
    { x: 500, y: 350, url: 'https://www.ejemplo.com/pagina11', nombre: 'Tarea 11' },
    { x: 650, y: 400, url: 'https://www.ejemplo.com/pagina12', nombre: 'Tarea 12' },
    { x: 950, y: 250, url: 'https://www.ejemplo.com/pagina13', nombre: 'Tarea 13' },
    { x: 1050, y: 500, url: 'https://www.ejemplo.com/pagina14', nombre: 'Tarea 14' },
    { x: 600, y: 650, url: 'https://www.ejemplo.com/pagina15', nombre: 'Tarea 15' },
    { x: 800, y: 600, url: 'https://www.ejemplo.com/pagina16', nombre: 'Tarea 16' }
  ];

  for (let ubicacion of ubicacionesFijas) {
    let lado = random(30, 60); // Lado inicial del cuadrado (ajusta según sea necesario)
    let rectangulo = new Rectangulo(ubicacion.x, ubicacion.y, lado, ubicacion.nombre, ubicacion.url);
    rectangulos.push(rectangulo);
  }
}

function draw() {
  background(fondoImg); // Establece la imagen de fondo

  // Dibuja el rectángulo inicial
  rectanguloInicial.mostrar();

  // Dibuja los rectángulos
  for (let rectangulo of rectangulos) {
    rectangulo.mostrar();
    rectangulo.interactuar(mouseX, mouseY);
  }
}

function mousePressed() {
  for (let rectangulo of rectangulos) {
    if (rectangulo.seleccionado) {
      window.open(rectangulo.url, '_blank');
    }
  }
}

class Rectangulo {
  constructor(x, y, lado, nombre, url) {
    this.x = x;
    this.y = y;
    this.ancho = lado; // El ancho inicial es igual al lado
    this.alto = lado; // La altura inicial es igual al lado
    this.expandir = false;
    this.nombre = nombre; // Nombre del rectángulo
    this.url = url; // URL de redirección
    this.seleccionado = false; // Indicador de selección
  }

  mostrar() {
    fill(100);
    stroke(255);
    rect(this.x, this.y, this.ancho, this.alto);

    // Muestra el nombre solo cuando el rectángulo se expande
    if (this.expandir) {
      textAlign(CENTER, CENTER);
      textSize(16);
      fill(255);
      text(this.nombre, this.x + this.ancho / 2, this.y + this.alto / 2);
    }
  }

  interactuar(mx, my) {
    // Verifica si el mouse está sobre este rectángulo
    if (mx > this.x && mx < this.x + this.ancho && my > this.y && my < this.y + this.alto) {
      this.expandir = true;
      this.seleccionado = true;
    } else {
      this.expandir = false;
      this.seleccionado = false;
    }

    // Ajusta el ancho del rectángulo en función de si se debe expandir o no
    if (this.expandir) {
      this.ancho = lerp(this.ancho, 150, 0.1);
      this.ancho = constrain(this.ancho, 0, width - this.x); // Evitar que se salga del lienzo
    } else {
      this.ancho = lerp(this.ancho, this.alto, 0.1); // Al pasar el mouse, vuelve a ser un cuadrado
    }
  }
}

class RectanguloInicial {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.ancho = 0; // Ancho inicial
    this.alto = 60; // Altura fija
    this.velocidad = 2; // Velocidad de expansión
    this.texto = "➣ Interfaz De Tareas〔Dominique Carvajal Gonzalez〕 "; // Texto a mostrar
  }

  mostrar() {
    fill(100);
    stroke(255);
    rect(this.x, this.y, this.ancho, this.alto);

    if (this.ancho < width / 2) {
      this.ancho += this.velocidad;
    }
    if (this.ancho >= width / 2) {
      textAlign(CENTER, CENTER);
      textSize(16);
      fill(255);
      text(this.texto, this.x + this.ancho / 2, this.y + this.alto / 2);
    }
  }
}

