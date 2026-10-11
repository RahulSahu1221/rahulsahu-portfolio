<h1 align="center">Rahul Sahu - Portfolio</h1>

<h3 align="center"><em>Precision Engineering, Presented with Precision.</em></h3>

<p align="center">
A <strong>glassmorphic, multilingual personal portfolio</strong> for an Electrical &amp; Electronics Engineering student - built as a hand-written, dependency-free static site with a floating glass dock, a Cmd/Ctrl+K command palette, gentle water-like motion, and full English · Japanese · Hindi language support.
</p>

<p align="center">
Built entirely in <strong>vanilla HTML, CSS, and JavaScript</strong> - no framework, no build step, no backend.
</p>

<hr>

<p align="center">
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img alt="JavaScript" src="https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img alt="No framework" src="https://img.shields.io/badge/NO_FRAMEWORK-4CAF50?style=for-the-badge">
  <img alt="Languages" src="https://img.shields.io/badge/EN_·_JA_·_HI-5B21B6?style=for-the-badge">
  <img alt="Fully responsive" src="https://img.shields.io/badge/FULLY_RESPONSIVE-2196F3?style=for-the-badge">
  <img alt="Status" src="https://img.shields.io/badge/STATUS-LIVE-C27C0E?style=for-the-badge">
  <img alt="License" src="https://img.shields.io/badge/LICENSE-MIT-8BC34A?style=for-the-badge">
</p>

<p align="center">
  <a href="https://rahulsahu1221.github.io/rahul-sahu-portfolio/"><strong>Live site</strong></a> ·
  <a href="#-highlights">Highlights</a> ·
  <a href="#-quick-start">Quick start</a> ·
  <a href="#-project-structure">Structure</a> ·
  <a href="#-customize">Customize</a> ·
  <a href="#-contact">Contact</a>
</p>

<hr>

<p align="center"><strong>If you find this useful as a reference, consider giving it a star!</strong></p>

<hr>

## Highlights

- **Three languages, one source** - English, Japanese and Hindi are rendered from a single translations file, switchable from the dock (or with `?lang=ja` / `?lang=hi`).
- **Dark and light themes** - both tuned for readable contrast, with an animated theme switch.
- **Simple and Enhanced modes** - *Simple* (default) is clean and fast. *Enhanced* adds animated backgrounds, glass blobs, a spring-physics cursor and water-like movement on the content.
- **Command palette** - press `Ctrl/Cmd + K` to jump to any section or action.
- **Project case studies** - hover previews, screenshots, trade-offs, tech stack and code / live-demo links.
- **Resume viewer** - an in-page resume (English and Japanese) that can be saved as a PDF.
- **Scroll animations** - sections and the career timeline animate in and out in both scroll directions.
- **Accessible and considerate** - keyboard navigation, visible focus, `prefers-reduced-motion` support, a print stylesheet, and an automatic safety net that lowers heavy effects on slow devices.

## What's inside

| Section | What it shows |
| --- | --- |
| **About** | Short bio and quick facts |
| **Experience** | Internships and on-the-job training on an animated timeline |
| **Education** | Degree and schooling |
| **Skills** | Core skills, languages and what is currently being learned or built |
| **Projects** | Completed and ongoing projects, each with a case study |
| **Certifications** | Certificate gallery with a full-size viewer |
| **Recognition** | Achievements and presentations |
| **Contact** | Email, phone and social links |

## Quick start

No installation is needed. Clone the repository and open it in a browser:

```bash
git clone https://github.com/RahulSahu1221/rahul-sahu-portfolio.git
cd rahul-sahu-portfolio
```

Then either open `index.html` directly, or serve the folder locally (recommended):

```bash
# any one of these
python -m http.server 5500
npx serve .
# or use the "Live Server" extension in VS Code
```

Visit `http://localhost:5500`.

## Project structure

```text
.
├── index.html                 # Page markup and structured data
├── css/
│   ├── main.css               # Design tokens, base styles, dock
│   ├── components.css         # Cards, modals, cursor, timeline
│   ├── features.css           # Sections, projects, skills, motion
│   ├── responsive.css         # Breakpoints and Simple-mode overrides
│   └── print.css              # Clean print / PDF layout
├── js/
│   ├── core.js                # Shared frame loop, language engine, mode toggle
│   ├── effects.js             # Backgrounds, cursor, scroll animation, water motion
│   ├── features.js            # Theme, command palette, project showcase, resume
│   └── main.js                # Small glue logic
├── data/
│   └── translations.js        # All text in English, Japanese and Hindi
├── assets/
│   ├── images/                # Photos, certificates, project screenshots
│   └── resume/                # Resume PDFs (English and Japanese)
├── check-i18n-completeness.js # Dev tool: verifies all languages have the same keys
└── sitemap.xml
```

## Customize

- **Change any text** - edit `data/translations.js`. Each language is its own block; keep the same keys in all three, then run:
  ```bash
  node check-i18n-completeness.js
  ```
  It reports anything missing from one language.
- **Add project screenshots** - place images in `assets/images/projects/` and point the project's preview and case-study images to them in `index.html`.
- **Switch modes** - use the toggle in the dock. Add `?fx=full` to the address to keep all effects on regardless of device speed.
- **Colours and fonts** - all design tokens are CSS variables at the top of `css/main.css`.

## Deploy

The site is plain static files, so any static host works. With **GitHub Pages**:

1. Open **Settings → Pages** in the repository.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select the **main** branch and the **/ (root)** folder, then save.

The site is published within a few minutes.

## Contact

- **Email:** sahurahuloc@gmail.com
- **LinkedIn:** [linkedin.com/in/rahul-sahu-eee](https://www.linkedin.com/in/rahul-sahu-eee/)
- **GitHub:** [@RahulSahu1221](https://github.com/RahulSahu1221)

## 📄 License

The code is released under the [MIT License](LICENSE).

Personal content - the photo, certificates, resume, project screenshots and written text - belongs to Rahul Sahu. If you reuse this site as a template, please replace it with your own.
