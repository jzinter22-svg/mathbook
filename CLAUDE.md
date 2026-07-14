# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, no-build, hand-authored interactive e-book (Arabic, RTL) covering Chapter 4 ("التكامل" / Integration) of a secondary-school math textbook. There is no package.json, bundler, or test suite — every page is plain HTML/CSS/vanilla JS opened directly or served as static files.

## Running / previewing

There is no build step. Serve the repo root with any static file server and open `index.html`, e.g.:

```
python3 -m http.server 8000
```

Then visit `lessons/lesson-N.html` for each of the 7 lessons.

## Repository layout — two parallel copies, don't confuse them

- **Root** (`index.html`, `lessons/`, `assets/`) — the live, current source of the site. Edit here.
- **`Output/`** — a stale packaged snapshot from an earlier revision (predates the "Deepen lesson pedagogy" commits), mirrored into `mathbook-release.zip`. It is **not** regenerated automatically — if you update root content and the packaged release matters, `Output/` and the zip need to be rebuilt/copied by hand. Don't edit `Output/` expecting it to affect the live site, and don't assume it reflects current lesson content.
- **`Source/`** — reference material only, not used at runtime: the original textbook PDFs (`Source/PDF`, `Source/Complete-Book`) and a theme screenshot (`Source/Theme`) that lessons were built from.

## Architecture

Every page (`index.html` and `lessons/lesson-*.html`) is an independent static HTML file that pulls in shared assets:

- `assets/css/theme.css` — single stylesheet for the whole site. Uses a neumorphic design system driven by CSS custom properties on `:root` (`--bg`, `--surface`, `--accent-*`, etc.), with a dark theme variant applied via `:root[data-theme="dark"]` and `prefers-color-scheme`.
- `assets/js/site.js` — global behavior shared by every page: builds the header/sidebar nav from a hardcoded `LESSONS` array (must be updated here if lessons are added/renamed/reordered), tracks per-lesson completion progress in `localStorage` (`ch4_progress_v1`), persists theme choice (`ch4_theme`), drives scroll-reveal animations, and initializes the quiz/interactive modules. Runs on `DOMContentLoaded`.
- `assets/js/quiz.js` — generic quiz engine. Looks for `[data-quiz]` containers with `.quiz-q[data-correct="N"]` children; grading and scoring is purely index-based against that attribute (see the markup comment at the top of the file for the expected shape). Marks a lesson complete via `window.Ch4.markComplete` when the user gets a perfect score.
- `assets/js/plot.js` — small reusable SVG function-plotting helper (`Ch4Plot.drawAxes` / `pathD` / `areaD`) used by inline `<script>` blocks in lessons to render interactive graphs (e.g. sliders that redraw a curve).
- `assets/mathjax/` — vendored MathJax (`tex-mml-chtml.js`) for rendering `$...$` / `$$...$$` LaTeX; each page configures `MathJax.tex`/`chtml` inline before loading the script.

Page-to-page linking uses a `data-base` attribute on `<html>` (empty string at root, `"../"` inside `lessons/`) so shared JS can resolve absolute links like `index.html` correctly from either directory — keep this attribute correct if new nested pages are added.

Lesson pages follow a consistent internal structure (hero → objectives → explanation/definitions → worked examples with collapsible `data-reveal-steps` solutions → interactive example → quiz → summary → mind map → prev/next nav). When adding a new lesson, mirror this structure and register it in the `LESSONS` array in `site.js` (and the card grid in `index.html`) so navigation and progress tracking pick it up.
