# Bishal Dutta | Creative Developer & Engineer

<div align="center">
  <img src="./bishal.jpg" alt="Portfolio Preview" width="150" style="border-radius:50%"/>
</div>

<div align="center">
  <strong>Results-driven Software Engineer blending creativity with technical proficiency.</strong>
</div>
<div align="center">
  <i>Specializing in AI/ML, Full-Stack Web Development, and Immersive 3D UI/UX Experiences.</i>
</div>

<br />

<div align="center">
  <a href="https://github.com/bishaldutta11">GitHub</a>
  <span> • </span>
  <a href="mailto:bishaldutta661@gmail.com">Contact Me</a>
</div>

---

## 📖 Overview

Welcome to the repository for my personal portfolio! This static web application serves as a dynamic, interactive showcase of my technical projects, creative web development skills, and professional resume. 

Built with **plain HTML, CSS, and Vanilla JavaScript**, the site delivers high performance, zero framework overhead, and sophisticated visual effects (like Canvas-based particle scanning) to create a premium user experience.

## ✨ Key Features

- **Immersive User Interface:** Modern brutalist design with smooth scroll animations, custom cursors, and WebGL-style 3D canvas accents.
- **Robust Theme System:** Fully responsive Dark and Light modes engineered with `localStorage` memory to persist user preference across visits.
- **Responsive Architecture:** Carefully crafted to behave seamlessly across all viewports.
- **Unified Navigation:** Custom-built bottom mobile navigation for effortless exploration across different pages.
- **Continuous Integration:** Powered by GitHub Actions to enforce code prettification and handle automated live-site deployments.
- **Automated QA:** Features a custom build tool to check for broken assets and secure outbound `target="_blank"` anchor links.

## 🛠️ Technology Stack

This application proudly relies on vanilla web technologies to maximize performance and demonstrate core engineering principles:

- **Structure:** `HTML5`
- **Styling:** `CSS3`
- **Logic & Effects:** `Vanilla JavaScript` (ES6+)
- **Automation & Formatting:** `Node.js`, `Prettier`, `GitHub Actions`

## 📁 Repository Structure

```text
bishal-dutta-portfolio/
├── index.html                  # Main portfolio homepage
├── Home.html                   # Dedicated hiring & contact page
│
├── global.css                  # Global tokens, reset, and shared components
├── instyle.css                 # Page-specific styling for the index page
├── hostyle.css                 # Page-specific styling for the hire page
│
├── global.js                   # Universal logic (Theme persistence, smooth scrolling)
├── inscript.js                 # Advanced logic (Cursor tracking, canvas particles)
│
├── tools/
│   └── check-static-site.js    # Node script for QA and dead-link validation
│
├── .github/workflows/          # CI/CD pipelines for testing and deployment
└── .prettierrc                 # Code style enforcement rules
```

## 🚀 Local Development

It is straightforward to spin this project up on your local machine to explore the code or propose changes.

**1. Clone the repository**
```bash
git clone https://github.com/bishaldutta11/Portfolio.git
cd Portfolio
```

**2. Start a local server**
You can launch an immediate preview server using Python via npm:
```bash
npm run start
```
*(This will trigger `python -m http.server 8000`)*

**3. Preview in Browser**
Visit `http://localhost:8000` in your web browser.

## 🧪 Quality Assurance

Before pushing changes to the repository, you can run the built-in QA script. This script verifies all local asset paths and ensures all external links are secure (`rel="noopener noreferrer"`).

```bash
npm run check
```

## 🌐 Deployment

The publishing pipeline of this project is 100% automated via **GitHub Actions**.

- **Style Checks (`style-check.yml`)**: On every push to `main`, Prettier analyzes the source files to guarantee strict consistency.
- **Deployment (`deploy-pages.yml`)**: Following a successful merge into `main`, GitHub Pages packages the source code and automatically publishes it to the live URL.

## 📬 Let's Connect

Currently open for freelance opportunities and full-time inquiries!
- **Email:** [bishaldutta661@gmail.com](mailto:bishaldutta661@gmail.com)
- **Phone:** +91 9064076209
- **GitHub:** [@bishaldutta11](https://github.com/bishaldutta11)

---
<div align="center">
  <p>&copy; 2026 Bishal Dutta. Code. Build. Innovate.</p>
</div>

<div align="center">
  <p> *Built with passion, caffeine, and clean code.*</p>
</div>
