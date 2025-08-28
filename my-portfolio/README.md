# Prajwal R K — Portfolio

Modern, animated developer portfolio showcasing projects, skills, certificates, and contact information.

Production site: https://prajwal-r-k.github.io/PortFolio

## Features

- Interactive sections with smooth transitions (Framer Motion)
- Dark/light theme with persistence
- Project carousel + modal with details and links
- Skills with tooltips and category grouping
- Certificates grid and viewer
- Contact section (EmailJS-ready)
- Polished SEO (OpenGraph/Twitter cards) and PWA metadata
- GitHub Pages SPA routing (404 fallback)

## Tech Stack

- React (Create React App)
- Tailwind CSS
- Framer Motion, GSAP
- React Icons, React Tooltip
- React Router DOM (prepared)

## Project Structure

```
my-portfolio/
├─ public/
│  ├─ index.html        # SEO, OG/Twitter meta, fonts
│  ├─ manifest.json     # PWA metadata
│  ├─ 404.html          # SPA fallback for GitHub Pages
│  ├─ Resume.pdf, images, certificates
├─ src/
│  ├─ components/
│  │  ├─ Navbar/, Hero/, Projects/, Skills/, Certificates/, Contact/
│  │  └─ Shared/ (modal, cursor, transitions, parallax)
│  ├─ data/
│  │  ├─ projectData.js, skillData.js, certificateData.js
│  ├─ App.jsx, index.css
├─ package.json, tailwind.config.js, postcss.config.js
```

## Getting Started

1) Install dependencies

```
npm install
```

2) Start the dev server

```
npm start
```

Open http://localhost:3000

## Available Scripts

- `npm start` — start development server
- `npm run build` — build production assets to `build/`
- `npm run deploy` — build and deploy to GitHub Pages (branch: `gh-pages`)

## Editing Content

- Projects: `src/data/projectData.js`
- Skills: `src/data/skillData.js`
- Certificates: `src/data/certificateData.js` (files in `public/certificates/`)
- Resume: replace `public/Resume.pdf`
- Hero text/buttons: `src/components/Hero/Hero.jsx`
- Navbar links/brand: `src/components/Navbar/Navbar.jsx`

## Theming & Design

- Colors/fonts: `tailwind.config.js`
- Global CSS and visuals (scrollbars, selection): `src/index.css`
- Update fonts in `public/index.html` (Google Fonts preload links)

## Deployment (GitHub Pages)

Already configured in `package.json`:

- `homepage`: https://prajwal-r-k.github.io/PortFolio
- `predeploy`/`deploy` scripts using `gh-pages`

Deploy:

```
npm run deploy
```

## Contact Form (EmailJS)

If you want the contact form to send emails, add your EmailJS config in `Contact` component:

- `service_id`
- `template_id`
- `public_key`

Follow EmailJS docs and keep keys in environment variables if exposing publicly.

## Notes

- Tailwind warnings in some editors (about `@tailwind` at-rules) are normal; they disappear in the built output.
- For SPA routing on GitHub Pages, `public/404.html` ensures deep links work.

## License

This repository is for personal portfolio use. Reuse the structure if helpful; replace content, assets, and metadata with your own.

---

## Responsive Design

- The site is built mobile‑first with Tailwind CSS responsive utilities.
- Fluid typography is configured in `src/index.css` using `clamp()` so headings and body copy scale smoothly across phones, tablets, and desktops.
- Sections use `scroll-margin-top` to work with the fixed navbar (`#hero`, `#projects`, `#about`, `#skills`, `#certificates`, `#contact`).

## Browser Support

Tested on the latest versions of:

- Chrome, Edge, Firefox, Safari
- Android Chrome, iOS Safari

Notes:

- The project normalizes text scaling with `-webkit-text-size-adjust: 100%` and `text-size-adjust: 100%` in `src/index.css` to avoid font inflation on some Chrome devices.
- Font smoothing is enabled for consistent rendering.

## Accessibility

- Color‑contrast aware palette with dark mode support.
- Semantic HTML and ARIA labels on interactive elements where appropriate.
- Keyboard focus styles provided by Tailwind; interactive elements are reachable with Tab.

## Performance

- Tailwind JIT and content scan paths configured in `tailwind.config.js`.
- Images and PDFs are served from `public/` and cached by the browser.
- Animations are implemented with Framer Motion using sensible durations and viewport triggers.

## Configuration

- Base URL: the app uses `process.env.PUBLIC_URL` for assets and links so it works on GitHub Pages at `/PortFolio`. If you fork the repo, update `homepage` in `package.json` and the canonical URL in `public/index.html`.
- Certificates: place PDF files under `public/certificates/` and list them in `src/data/certificateData.js`.
- Resume: replace `public/Resume.pdf`.
- Fonts: update Google Fonts in `public/index.html` and Tailwind `fontFamily` in `tailwind.config.js` if you change fonts.

## Troubleshooting

- Text looks larger in Chrome than Edge
  - Ensure you didn’t override the base font size. The repo sets `html { font-size: 16px; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }` in `src/index.css`.
  - Check Chrome settings for page zoom and accessibility text scaling on the device.

- GitHub Pages deep links return 404
  - Make sure `public/404.html` exists (already included) and that `homepage` is set in `package.json`.

- Assets not loading under a subpath
  - Use `${process.env.PUBLIC_URL}` when linking to files inside `public/`.

## Credits

- UI built with Tailwind CSS and Framer Motion.
- Icons from `react-icons`.
- Design and code by Prajwal R K.
