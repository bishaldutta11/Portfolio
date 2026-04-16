
      /* ─── CURSOR ─── */
      const cursor = document.getElementById("cursor");
      const ring = document.getElementById("cursorRing");
      let mx = 0,
        my = 0,
        rx = 0,
        ry = 0;
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

      /* ─── SCROLL REVEAL ─── */
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e, i) => {
            if (e.isIntersecting) {
              setTimeout(() => e.target.classList.add("visible"), i * 80);
            }
          });
        },
        { threshold: 0.1 },
      );
      document
        .querySelectorAll(".stat-item, .project-card, .service-card, .mob-project-card, .mob-service-card")
        .forEach((el) => obs.observe(el));


      /* ─── PARTICLE SCANNING PROJECT CANVAS ─── */
      document
        .querySelectorAll('.proj-canvas[data-scene="particles"]')
        .forEach((c) => {
          if (window.innerWidth <= 900) return;
          const ctx = c.getContext("2d");
          let W,
            H,
            frame = 0;
          const particles = Array.from({ length: 150 }, () => ({
            x: Math.random(),
            y: Math.random(),
            z: Math.random(), // depth 0 to 1
            ox: Math.random(),
            oy: Math.random(),
          }));
          function resize() {
            const rect = c.parentElement.getBoundingClientRect();
            W = c.width = rect.width * devicePixelRatio;
            H = c.height = rect.height * devicePixelRatio;
            ctx.scale(devicePixelRatio, devicePixelRatio);
            W /= devicePixelRatio;
            H /= devicePixelRatio;
          }
          window.addEventListener("resize", resize);
          resize();
          function loop() {
            ctx.clearRect(0, 0, W, H);
            const w = W,
              h = H;

            const scanY = ((frame * 0.005) % 1.2) - 0.1; // sweeps from top to bottom

            // Draw scan line
            ctx.beginPath();
            ctx.moveTo(0, scanY * h);
            ctx.lineTo(w, scanY * h);
            ctx.strokeStyle = "rgba(0, 255, 128, 0.4)";
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Scan line glow
            const grad = ctx.createLinearGradient(
              0,
              scanY * h - 30,
              0,
              scanY * h + 10,
            );
            grad.addColorStop(0, "rgba(0, 255, 128, 0)");
            grad.addColorStop(0.8, "rgba(0, 255, 128, 0.15)");
            grad.addColorStop(1, "rgba(0, 255, 128, 0)");
            ctx.fillStyle = grad;
            ctx.fillRect(0, scanY * h - 30, w, 40);

            particles.forEach((p) => {
              p.x = p.ox + Math.sin(frame * 0.01 + p.z * 10) * 0.01;
              p.y = p.oy + Math.cos(frame * 0.01 + p.z * 10) * 0.01;
              if (p.x < 0) p.x += 1;
              if (p.x > 1) p.x -= 1;
              if (p.y < 0) p.y += 1;
              if (p.y > 1) p.y -= 1;

              const distToScan = Math.abs(p.y - scanY);
              let opacity = 0.15;
              let sizeMultiplier = 1;
              const isGreen = p.z > 0.5;
              let color = isGreen ? "rgba(0, 255, 128, " : "rgba(0, 150, 255, ";

              if (distToScan < 0.15) {
                opacity = 1.0 - (distToScan / 0.15) * 0.5;
                sizeMultiplier = 1.5;
              } else if (p.y < scanY) {
                opacity = 0.3;
              }

              const scale = 1 + p.z;
              const px = p.x * w;
              const py = p.y * h;

              ctx.beginPath();
              ctx.arc(px, py, 1.2 * scale * sizeMultiplier, 0, Math.PI * 2);
              ctx.fillStyle = color + opacity + ")";
              ctx.fill();
            });

            ctx.lineWidth = 0.6;
            for (let i = 0; i < particles.length; i++) {
              const p1 = particles[i];
              const distToScan1 = Math.abs(p1.y - scanY);
              if (distToScan1 > 0.15) continue;

              for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 0.06) {
                  ctx.beginPath();
                  ctx.moveTo(p1.x * w, p1.y * h);
                  ctx.lineTo(p2.x * w, p2.y * h);
                  ctx.strokeStyle =
                    "rgba(0, 255, 128, " + 0.3 * (1 - dist / 0.06) + ")";
                  ctx.stroke();
                }
              }
            }

            frame++;
            requestAnimationFrame(loop);
          }
          loop();
        });



      /* ─── CONTACT 3D ─── */
      (function contactScene() {
        const c = document.getElementById("contact3d");
        if (!c) return;
        const ctx = c.getContext("2d");
        let W,
          H,
          frame = 0;
        function resize() {
          W = c.width = c.offsetWidth * devicePixelRatio;
          H = c.height = c.offsetHeight * devicePixelRatio;
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
          const s = devicePixelRatio;
          ctx.clearRect(0, 0, W, H);
          const w = W / s,
            h = H / s;
          lines.forEach((l) => {
            l.x1 += l.vx1;
            l.y1 += l.vy1;
            l.x2 += l.vx2;
            l.y2 += l.vy2;
            if (l.x1 < 0 || l.x1 > 1) l.vx1 *= -1;
            if (l.y1 < 0 || l.y1 > 1) l.vy1 *= -1;
            if (l.x2 < 0 || l.x2 > 1) l.vx2 *= -1;
            if (l.y2 < 0 || l.y2 > 1) l.vy2 *= -1;
            ctx.beginPath();
            ctx.moveTo(l.x1 * w * s, l.y1 * h * s);
            ctx.lineTo(l.x2 * w * s, l.y2 * h * s);
            ctx.strokeStyle = "rgba(237, 234, 224, 0.12)";
            ctx.lineWidth = 0.8;
            ctx.stroke();
          });
          requestAnimationFrame(draw);
        }
        draw();
      })();



      /* ─── DARK MODE TOGGLE ─── */
      const themeToggle = document.getElementById("themeToggle");
      if (themeToggle) {
        themeToggle.addEventListener("click", () => {
          const isDark = document.body.getAttribute("data-theme") === "dark";
          const newTheme = isDark ? "light" : "dark";
          document.body.setAttribute("data-theme", newTheme);
          document.documentElement.setAttribute("data-theme", newTheme);
          localStorage.setItem("theme", newTheme);
        });
      }

      // Smooth scroll for bottom navigation items
      document.querySelectorAll(".bottom-nav a").forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          const href = this.getAttribute("href");
          if (href.startsWith("#")) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              window.scrollTo({
                top: targetElement.offsetTop - 60,
                behavior: "smooth",
              });
            }
          }
        });
      });