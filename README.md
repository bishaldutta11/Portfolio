# Bishal Dutta — Creative Developer Portfolio

![Portfolio Preview](./bishal.jpg)

A modern, visually stunning, and highly interactive creative developer portfolio built to showcase projects, skills, and services. The website features 3D visual elements, a custom cursor, smooth scroll interactions, dark mode functionality, and a carefully crafted futuristic aesthetic.

## 🚀 Key Features

*   **Interactive 3D Elements:** Engaging 3D canvas visuals in the hero section and project cards.
*   **Custom Micro-Interactions:** A custom magnetic cursor and scroll animations for an elevated user experience.
*   **Dark Mode / Theme Toggling:** Seamless transition between light (paper) and dark (ink) modes with optimized color palettes.
*   **Fully Responsive:** Fluid typography and CSS Grid/Flexbox layouts that adapt perfectly to multiple screen sizes.
*   **Modern Aesthetics:** Uses `Syne` and `DM Mono` fonts, sleek hover states, CSS marquees, and strict color themes (`var(--ink)`, `var(--paper)`, `var(--accent)`).
*   **Dynamic Sections:** 
    *   **Hero:** Impactful introduction with grid-pulse animations.
    *   **Work:** Grid layout with hover-reveal interactions for project cards.
    *   **About & Skills:** Clean typographic breakdown of background details.
    *   **Services:** Hover-sensitive service offering cards.
    *   **Contact:** Bold, high-contrast footer with social links.

## 🛠 Tech Stack

*   **HTML5:** Semantic architecture.
*   **CSS3:** Vanilla CSS tailored with raw custom properties (CSS variables), keyframe animations, and grid layouts.
*   **JavaScript (Vanilla):** DOM manipulation, interaction observers, and custom cursor logic.
*   **Three.js / WebGL (via JS):** For 3D canvas rendering and interactive background effects.

## 📁 Repository Structure

```text
/
├── index.html        # Main entry point containing semantic HTML and core structure
├── Home.html         # Additional/alternative template page
├── bishal.jpg        # Profile/About image asset
└── README.md         # Documentation
```
*(Note: All styles and JS scripts are integrated modularly or contained within the HTML base).*

## 💻 How to Run Locally

Since this is a static site built without a complex build step or framework, running it locally is incredibly simple.

1.  **Clone the repository** (if hosted on Git):
    ```bash
    git clone https://github.com/your-username/portfolio.git
    cd portfolio
    ```
2.  **Open the file:**
    Simply double-click `index.html` to open it in your default web browser.

    *Alternatively, if you use VS Code, use the **Live Server** extension for an optimal hot-reloading development experience:*
    *   Open the project folder in VS Code.
    *   Right-click `index.html` and select **"Open with Live Server"**.

## 🎨 Design System

The project relies on a carefully curated set of CSS variables to maintain consistency:

```css
:root {
  --ink: #0a0a0f;           /* Deep dark background or text */
  --paper: #f5f3ee;         /* Off-white background or text */
  --accent: #ff3f00;        /* Primary vibrant orange red */
  --accent2: #0057ff;       /* Secondary electric blue */
  --muted: #8a8780;         /* Secondary text color */
}
```

## 👨‍💻 Author

**Bishal Dutta**
*   Creative Developer
*   [GitHub](https://github.com/bishaldutta11)

---
*Built with passion, caffeine, and clean code.*
