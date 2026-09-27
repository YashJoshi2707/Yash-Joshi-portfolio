# Yash Joshi — Portfolio

A single-page, multi-view portfolio site (hash-based routing: Home, About, Skills,
Projects, Journey, Contact). Vanilla HTML/CSS/JS — no build step required.

## Structure
```
index.html        Markup for every page/section
css/style.css      All styling (dark/light themes, animations)
js/script.js       Page routing, theme toggle, hero effects, contact form
```

## Running locally
Just open `index.html` in a browser. For best results (so relative asset paths
and fonts load correctly), serve it with a local server instead of double-clicking
the file, e.g.:
```
npx serve .
```
or
```
python3 -m http.server
```
then visit http://localhost:PORT.

## Deploying
This is static — drag the whole folder into Netlify, Vercel, GitHub Pages, or any
static host. No build command needed.

## To customize
- **Your photo**: the hero and About page currently use a monogram/gradient
  in place of a photo. If you want to add one, drop an image file into an
  `assets/` folder and point the `.hero-bg` background-image (in `css/style.css`)
  and the `.initial-mark` block (in `index.html`, About section) at it.
- **Resume link**: the "Download Resume" button in `index.html` (About section)
  currently points to `#` — replace with a link to your actual resume file.
- **Social links**: GitHub/LinkedIn URLs are placeholders (`https://github.com/`,
  `https://linkedin.com/`) in both the hero and footer — update with your real
  profile URLs.
- **Project GitHub links**: currently placeholders too — add your repo URLs.
- **Colors**: theme colors are CSS variables at the top of `style.css` under
  `:root` (dark) and `:root[data-theme="light"]` (light mode).
