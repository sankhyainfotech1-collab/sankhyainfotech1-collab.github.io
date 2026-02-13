const canvas = document.getElementById("mr-tech-bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

const spacing = 60;
let offset = 0;

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(120,160,255,0.15)";
  ctx.lineWidth = 1;

  for (let x = -offset; x < canvas.width; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = -offset; y < canvas.height; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // glowing node near mouse
  const glow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 120);
  glow.addColorStop(0, "rgba(120,160,255,0.25)");
  glow.addColorStop(1, "rgba(120,160,255,0)");

  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function animate() {
  offset += 0.2; // slow drift
  if (offset > spacing) offset = 0;

  drawGrid();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
