/**
 * web3-hero.js — Three.js particle network for the index page hero
 * Only loaded by index.html
 * Requires Three.js to be loaded before this script.
 */

(() => {
  const canvas = document.getElementById('web3-bg');
  if (!canvas) return;

  /* ── Scene ── */
  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(devicePixelRatio);
  camera.position.z = 6;

  /* ── Particles ── */
  const COUNT = 700;
  const pos   = [];

  for (let i = 0; i < COUNT; i++) {
    pos.push(
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 12
    );
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.035, color: '#6ea8ff', transparent: true, opacity: 0.9
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  /* ── Connecting lines ── */
  const MAX_DIST  = 1.8;
  const linePos   = [];

  for (let i = 0; i < COUNT; i++) {
    for (let j = i + 1; j < COUNT; j++) {
      const dx = pos[i*3]   - pos[j*3];
      const dy = pos[i*3+1] - pos[j*3+1];
      const dz = pos[i*3+2] - pos[j*3+2];
      if (Math.sqrt(dx*dx + dy*dy + dz*dz) < MAX_DIST) {
        linePos.push(pos[i*3], pos[i*3+1], pos[i*3+2]);
        linePos.push(pos[j*3], pos[j*3+1], pos[j*3+2]);
      }
    }
  }

  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));

  const lineMat  = new THREE.LineBasicMaterial({ color: '#3b82ff', transparent: true, opacity: 0.25 });
  const lines    = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lines);

  /* ── Mouse / scroll state ── */
  let mouseX = 0, mouseY = 0, scrollY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / innerHeight - 0.5) * 2;
  });

  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

  /* ── Animation loop ── */
  (function animate() {
    requestAnimationFrame(animate);

    particles.rotation.y += 0.0005 + mouseX * 0.0008;
    particles.rotation.x += 0.0002 + mouseY * 0.0008;
    lines.rotation.y = particles.rotation.y;
    lines.rotation.x = particles.rotation.x;

    camera.position.z = 6 + scrollY * 0.0015;

    renderer.render(scene, camera);
  })();

  /* ── Responsive ── */
  window.addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });

})();
