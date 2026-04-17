/* CURSOR */
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

let mx = 0;
let my = 0;
let rx = 0;
let ry = 0;

if (cursor && ring && !prefersReducedMotion && window.innerWidth > 900) {
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animCursor() {
    cursor.style.left = mx + "px";
    cursor.style.top = my + "px";
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(animCursor);
  }

  animCursor();

  document
    .querySelectorAll("a, button, .project-card, .service-card")
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("hovering");
        ring.classList.add("hovering");
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("hovering");
        ring.classList.remove("hovering");
      });
    });
}

/* SCROLL REVEAL */
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
      }
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll(".project-card, .service-card")
  .forEach((el) => obs.observe(el));

/* PARTICLE SCANNING PROJECT CANVAS */
document
  .querySelectorAll('.proj-canvas[data-scene="particles"]')
  .forEach((canvas) => {
    if (window.innerWidth <= 900 || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    let width;
    let height;
    let frame = 0;
    const particles = Array.from({ length: 150 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      ox: Math.random(),
      oy: Math.random(),
    }));

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = canvas.width = rect.width * devicePixelRatio;
      height = canvas.height = rect.height * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      width /= devicePixelRatio;
      height /= devicePixelRatio;
    }

    window.addEventListener("resize", resize);
    resize();

    function loop() {
      ctx.clearRect(0, 0, width, height);

      const scanY = ((frame * 0.005) % 1.2) - 0.1;

      ctx.beginPath();
      ctx.moveTo(0, scanY * height);
      ctx.lineTo(width, scanY * height);
      ctx.strokeStyle = "rgba(0, 255, 128, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const grad = ctx.createLinearGradient(
        0,
        scanY * height - 30,
        0,
        scanY * height + 10,
      );
      grad.addColorStop(0, "rgba(0, 255, 128, 0)");
      grad.addColorStop(0.8, "rgba(0, 255, 128, 0.15)");
      grad.addColorStop(1, "rgba(0, 255, 128, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY * height - 30, width, 40);

      particles.forEach((particle) => {
        particle.x = particle.ox + Math.sin(frame * 0.01 + particle.z * 10) * 0.01;
        particle.y = particle.oy + Math.cos(frame * 0.01 + particle.z * 10) * 0.01;

        if (particle.x < 0) particle.x += 1;
        if (particle.x > 1) particle.x -= 1;
        if (particle.y < 0) particle.y += 1;
        if (particle.y > 1) particle.y -= 1;

        const distToScan = Math.abs(particle.y - scanY);
        let opacity = 0.15;
        let sizeMultiplier = 1;
        const color = particle.z > 0.5 ? "rgba(0, 255, 128, " : "rgba(0, 150, 255, ";

        if (distToScan < 0.15) {
          opacity = 1 - (distToScan / 0.15) * 0.5;
          sizeMultiplier = 1.5;
        } else if (particle.y < scanY) {
          opacity = 0.3;
        }

        const scale = 1 + particle.z;
        const px = particle.x * width;
        const py = particle.y * height;

        ctx.beginPath();
        ctx.arc(px, py, 1.2 * scale * sizeMultiplier, 0, Math.PI * 2);
        ctx.fillStyle = color + opacity + ")";
        ctx.fill();
      });

      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        if (Math.abs(p1.y - scanY) > 0.15) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 0.06) {
            ctx.beginPath();
            ctx.moveTo(p1.x * width, p1.y * height);
            ctx.lineTo(p2.x * width, p2.y * height);
            ctx.strokeStyle = "rgba(0, 255, 128, " + 0.3 * (1 - dist / 0.06) + ")";
            ctx.stroke();
          }
        }
      }

      frame += 1;
      requestAnimationFrame(loop);
    }

    loop();
  });

/* CONTACT 3D */
(function contactScene() {
  if (prefersReducedMotion) return;

  const canvas = document.getElementById("contact3d");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width;
  let height;

  function resize() {
    width = canvas.width = canvas.offsetWidth * devicePixelRatio;
    height = canvas.height = canvas.offsetHeight * devicePixelRatio;
  }

  window.addEventListener("resize", resize);
  resize();

  const lines = Array.from({ length: 30 }, () => ({
    x1: Math.random(),
    y1: Math.random(),
    x2: Math.random(),
    y2: Math.random(),
    vx1: (Math.random() - 0.5) * 0.0008,
    vy1: (Math.random() - 0.5) * 0.0008,
    vx2: (Math.random() - 0.5) * 0.0008,
    vy2: (Math.random() - 0.5) * 0.0008,
  }));

  function draw() {
    const scale = devicePixelRatio;
    ctx.clearRect(0, 0, width, height);
    const w = width / scale;
    const h = height / scale;

    lines.forEach((line) => {
      line.x1 += line.vx1;
      line.y1 += line.vy1;
      line.x2 += line.vx2;
      line.y2 += line.vy2;

      if (line.x1 < 0 || line.x1 > 1) line.vx1 *= -1;
      if (line.y1 < 0 || line.y1 > 1) line.vy1 *= -1;
      if (line.x2 < 0 || line.x2 > 1) line.vx2 *= -1;
      if (line.y2 < 0 || line.y2 > 1) line.vy2 *= -1;

      ctx.beginPath();
      ctx.moveTo(line.x1 * w * scale, line.y1 * h * scale);
      ctx.lineTo(line.x2 * w * scale, line.y2 * h * scale);
      ctx.strokeStyle = "rgba(245,243,238,0.12)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
    });

    requestAnimationFrame(draw);
  }

  draw();
})();
