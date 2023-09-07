let lienzoAncho = 600; // Ancho del lienzo
let lienzoAlto = 400; // Alto del lienzo
let fondoImg; // Variable para la imagen de fondo
let rectangulos = []; // Arreglo de rectángulos
let numRectangulos = 8; // Número de rectángulos
let rectanguloSeleccionado = null; // Rectángulo actualmente seleccionado para edición

function preload() {
  fondoImg = loadImage('fondoIF.jpg'); // Carga tu imagen de fondo
}

function setup() {
  createCanvas(lienzoAncho, lienzoAlto);

  // Crea los rectángulos en ubicaciones fijas
  let ubicacionesFijas = [
    { x: 100, y: 100 },
    { x: 200, y: 150 },
    { x: 300, y: 200 },
    { x: 400, y: 250 },
    { x: 150, y: 300 },
    { x: 250, y: 350 },
    { x: 350, y: 50 },
    { x: 450, y: 150 }
  ];

  for (let i = 0; i < numRectangulos; i++) {
    let lado = random(30, 60); // Lado inicial del cuadrado (ajusta según sea necesario)
    let ubicacion = ubicacionesFijas[i];
    let texto = localStorage.getItem(`rectangulo${i + 1}`) || `Texto #${i + 1}`; // Texto predeterminado o cargado desde el almacenamiento local
    let rectangulo = new Rectangulo(ubicacion.x, ubicacion.y, lado, texto);
    rectangulos.push(rectangulo);
  }

  // Botón para guardar cambios
  let guardarBoton = createButton('Guardar Cambios');
  guardarBoton.position(width - 130, height - 40);
  guardarBoton.style('background-color', 'black');
  guardarBoton.style('color', 'white');
  guardarBoton.mousePressed(guardarCambios);
}

function draw() {
  background(fondoImg); // Establece la imagen de fondo

  // Dibuja los rectángulos
  for (let rectangulo of rectangulos) {
    rectangulo.mostrar();
  }
}

function mouseMoved() {
  // Verifica si el mouse está sobre alguno de los rectángulos
  for (let rectangulo of rectangulos) {
    rectangulo.interactuar(mouseX, mouseY);
  }
}

function keyPressed() {
  // Cambiar el texto del rectángulo cuando se presione la tecla correspondiente
  let index = key - '1'; // Convierte el número de tecla a un índice (0-7)
  if (index >= 0 && index < rectangulos.length) {
    rectanguloSeleccionado = rectangulos[index];
    let nuevoTexto = prompt(`Ingrese el nuevo texto para el rectángulo ${index + 1}:`);
    if (nuevoTexto !== null) {
      rectanguloSeleccionado.setTexto(nuevoTexto);
    }
    rectanguloSeleccionado = null; // Restablecer el rectángulo seleccionado
  }
}

function guardarCambios() {
  // Guardar los cambios en el almacenamiento local
  for (let i = 0; i < rectangulos.length; i++) {
    let texto = rectangulos[i].getTexto();
    localStorage.setItem(`rectangulo${i + 1}`, texto);
  }
}

class Rectangulo {
  constructor(x, y, lado, texto) {
    this.x = x;
    this.y = y;
    this.ancho = lado; // El ancho inicial es igual al lado
    this.alto = lado; // La altura inicial es igual al lado
    this.expandir = false;
    this.texto = texto; // Texto a mostrar cuando se expanda
  }

  mostrar() {
    fill(100);
    stroke(255);
    rect(this.x, this.y, this.ancho, this.alto);

    // Muestra el texto solo cuando el rectángulo se expande
    if (this.expandir) {
      textAlign(CENTER, CENTER);
      textSize(16);
      fill(255);
      text(this.texto, this.x + this.ancho / 2, this.y + this.alto / 2);
    }
  }

  // Agregar un método para actualizar el texto
  setTexto(nuevoTexto) {
    this.texto = nuevoTexto;
  }

  // Agregar un método para obtener el texto
  getTexto() {
    return this.texto;
  }

  interactuar(mx, my) {
    // Verifica si el mouse está sobre este rectángulo
    if (mx > this.x && mx < this.x + this.ancho && my > this.y && my < this.y + this.alto) {
      this.expandir = true;
    } else {
      this.expandir = false;
    }

    // Ajusta el ancho del rectángulo en función de si se debe expandir o no
    if (this.expandir) {
      this.ancho = lerp(this.ancho, 150, 0.1);
      this.ancho = constrain(this.ancho, 0, lienzoAncho - this.x); // Evitar que se salga del lienzo
    } else {
      this.ancho = lerp(this.ancho, this.alto, 0.1); // Al pasar el mouse, vuelve a ser un cuadrado
    }
  }
}
