const canvas = document.getElementById("web3-bg");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

camera.position.z = 6;

/* ================= PARTICLES ================= */
const count = 700;
const positions = [];

for (let i = 0; i < count; i++) {
  positions.push(
    (Math.random() - 0.5) * 12,
    (Math.random() - 0.5) * 8,
    (Math.random() - 0.5) * 12
  );
}

const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(positions, 3)
);

const particleMaterial = new THREE.PointsMaterial({
  size: 0.035,
  color: "#6ea8ff",
  transparent: true,
  opacity: 0.9
});

const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

/* ================= CONNECTING LINES ================= */
const maxDistance = 1.8;
const linePositions = [];

for (let i = 0; i < count; i++) {
  for (let j = i + 1; j < count; j++) {
    const dx = positions[i * 3] - positions[j * 3];
    const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
    const dz = positions[i * 3 + 2] - positions[j * 3 + 2];

    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

    if (distance < maxDistance) {
      linePositions.push(
        positions[i * 3],
        positions[i * 3 + 1],
        positions[i * 3 + 2],
        positions[j * 3],
        positions[j * 3 + 1],
        positions[j * 3 + 2]
      );
    }
  }
}

const lineGeometry = new THREE.BufferGeometry();
lineGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(linePositions, 3)
);

const lineMaterial = new THREE.LineBasicMaterial({
  color: "#3b82ff",
  transparent: true,
  opacity: 0.25
});

const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
scene.add(lines);

/* ================= MOUSE INTERACTION ================= */
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (event) => {
  mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
});

/* ================= SCROLL PARALLAX ================= */
let scrollY = 0;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});

/* ================= ANIMATION LOOP ================= */
function animate() {
  requestAnimationFrame(animate);

  /* mouse tilt */
  particles.rotation.y += 0.0005;
  particles.rotation.x += 0.0002;

  particles.rotation.y += mouseX * 0.0008;
  particles.rotation.x += mouseY * 0.0008;

  lines.rotation.y = particles.rotation.y;
  lines.rotation.x = particles.rotation.x;

  /* scroll depth */
  camera.position.z = 6 + scrollY * 0.0015;

  renderer.render(scene, camera);
}

animate();

/* ================= RESPONSIVE ================= */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});



/* ===== NAVBAR SCROLL EFFECT ===== */
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* ===== MOBILE MENU ===== */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

/* ===== GLOBAL SCROLL REVEAL ===== */

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target); // animate once
      }
    });
  },
  {
    threshold: 0.15,
  }
);

reveals.forEach((el) => revealObserver.observe(el));


window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});


/* ===== INDUSTRY CARD MOUSE GLOW ===== */

document.querySelectorAll(".solution-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });
});


/* ===== INDUSTRY CARD CURSOR GLOW ===== */

document.querySelectorAll(".solution-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });
});
