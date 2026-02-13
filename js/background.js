(() => {
  const canvas = document.getElementById("mr-tech-bg");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let mouseX = 0;
  let mouseY = 0;

  const spacing = 60;
  let offset = 0;

  function resizeCanvas() {
    const wrapper = document.querySelector(".after-hero");
    if (!wrapper) return;

    canvas.width = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  document.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // GRID LINES
    ctx.strokeStyle = "rgba(120,160,255,0.12)";
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

    // SOFT GLOW FOLLOWING MOUSE
    const glow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 160);
    glow.addColorStop(0, "rgba(120,160,255,0.25)");
    glow.addColorStop(0.5, "rgba(120,160,255,0.10)");
    glow.addColorStop(1, "rgba(120,160,255,0)");

    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // FAINT DEPTH OVERLAY (premium feel)
    const depth = ctx.createLinearGradient(0, 0, 0, canvas.height);
    depth.addColorStop(0, "rgba(0,0,0,0.2)");
    depth.addColorStop(1, "rgba(0,0,0,0.6)");

    ctx.fillStyle = depth;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function animate() {
    offset += 0.15; // slower = more premium
    if (offset > spacing) offset = 0;

    drawGrid();
    requestAnimationFrame(animate);
  }

  animate();
})();
