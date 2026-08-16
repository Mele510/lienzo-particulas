// Lienzo de Partículas
// Una animación sencilla de partículas en un <canvas> HTML5.
// Las partículas flotan libremente y se acercan suavemente al mouse.

const canvas = document.getElementById("lienzo");
const ctx = canvas.getContext("2d");

let width, height;
let particulas = [];
const NUM_PARTICULAS = 120;

const mouse = { x: null, y: null };

function redimensionar() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

class Particula {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radio = Math.random() * 2 + 1;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
  }

  actualizar() {
    // Movimiento base
    this.x += this.vx;
    this.y += this.vy;

    // Rebote en los bordes
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    // Atracción suave hacia el mouse
    if (mouse.x !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        this.x += dx * 0.01;
        this.y += dy * 0.01;
      }
    }
  }

  dibujar() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
    ctx.fillStyle = "#9fb3ff";
    ctx.fill();
  }
}

function crearParticulas() {
  particulas = [];
  for (let i = 0; i < NUM_PARTICULAS; i++) {
    particulas.push(new Particula());
  }
}

function animar() {
  ctx.clearRect(0, 0, width, height);
  for (const p of particulas) {
    p.actualizar();
    p.dibujar();
  }
  requestAnimationFrame(animar);
}

window.addEventListener("resize", redimensionar);
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

redimensionar();
crearParticulas();
animar();
