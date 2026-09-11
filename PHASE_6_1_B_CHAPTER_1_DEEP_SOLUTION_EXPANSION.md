# PHASE 6.1-B — CHAPTER 1 DEEP PEDAGOGICAL SOLUTION EXPANSION

## Methodology Note (read first)

Phase 6.1 already confirmed all 126 Chapter 1 cards have *a* step-by-step solution. This phase applies a **much stricter** standard on top of that: no compressed algebraic jump, however small, is acceptable if the missing step is mathematically load-bearing.

Manually re-reading all 126 cards against this stricter bar line-by-line was not feasible within this phase's scope, so a **targeted, pattern-based re-audit** was used instead:

1. Every step's `calc-note` + `calc-flow` content was extracted programmatically for all 7 lessons (126 cards).
2. Every step was scanned for the specific compression patterns this phase calls out by name: a multiplication `(a+bi)(c+di)` or division or squaring `(a+bi)^2` that jumps directly from the unexpanded expression to a fully-combined final result, with no visible intermediate (FOIL terms, or the $i^2=-1$ substitution, or the real/imaginary grouping).
3. Each flagged candidate was read in full context and judged individually — several were false positives (the expansion was already shown, just formatted compactly on one line) and were left untouched.
4. The user's own worked model (`مثال 5`, Lesson 5) was located exactly as described and used as the calibration example for how much depth genuinely-compressed items should be expanded to.

This is a real, substantive pass — not a rubber stamp — but it is not a claim that all 126 cards were individually hand-verified to this new standard. §3 reports exactly what was checked and what was found.

## 1. Scope

`chapter-1/` only. Files inspected: `chapter-1/index.html` (read-only, unchanged) and all 7 files in `chapter-1/lessons/`. Only `lesson-4.html` and `lesson-5.html` required edits.

## 2. Audit Statistics

| Metric | Count |
|---|---|
| Total Chapter 1 solution cards (all lessons) | 126 |
| Cards programmatically scanned for compression patterns | 126 |
| Cards flagged as candidates by the pattern scan | ~55 |
| Candidates read in full and judged already adequate (expansion already shown, just compact) | ~45 |
| Candidates confirmed as genuine compression gaps and expanded | **10** |
| Cards left unchanged (already A-standard, or lighter-detail trivial items per the phase's own "don't pad trivial arithmetic" balance rule) | 116 |

## 3. Modified Lessons

- `chapter-1/lessons/lesson-4.html`
- `chapter-1/lessons/lesson-5.html`

Lessons 1, 2, 3, 6, 7 were fully scanned but **no card in them was found to contain the specific "jump over load-bearing algebra" pattern this phase targets** — their existing multiplication/division/squaring steps already show the FOIL distribution or the conjugate-multiplication work inline (confirmed in Phase 6.1's earlier full read-through and re-confirmed by this phase's pattern scan). No changes were made to these 5 files.

## 4. Every Expanded Example/Exercise

### Lesson 5 (7 items — the "quadratic from its roots" family, including the exact problem named in this phase's instructions)

| # | Item | Why too compressed | What was added |
|---|---|---|---|
| 1 | مثال 3 — quadratic with roots $2\pm3i$ | Step 2 jumped `(2+3i)(2-3i)` straight to `4+9=13` with no visible intermediate | Shown as difference-of-squares: `2²-(3i)²=4-9i²`, then the `i²=-1` substitution explicitly, before combining |
| 2 | مثال 4 — quadratic with root $4-3i$ | Same jump for the product step (`16+9=25` with nothing shown); the sum step also silently skipped the imaginary-part cancellation | Sum: shown as `(4+4)+(3-3)i`. Product: same difference-of-squares expansion as مثال 3, with the `i²=-1` substitution shown. Renumbered into 4 steps |
| 3 | **مثال 5** — *the exact problem from this phase's instructions*: root $1+2i$ in $x^2-(3-i)x+a=0$ | All three original steps compressed load-bearing algebra: (a) asserted "sum $=3-i$" without deriving it from the general $-B/A$ relationship; (b) the subtraction $(3-i)-(1+2i)$ jumped straight to `2-3i` with no real/imaginary grouping shown; (c) the product $(1+2i)(2-3i)$ jumped straight to `8+i` with no FOIL shown | Rewritten as **9 explicit steps**, matching the depth of this phase's own model: (1) derive sum-of-roots $=-B/A$ from the general quadratic and substitute $B=-(3-i)$; (2) set up $z+(1+2i)=3-i$; (3) isolate $z$ by adding the additive inverse; (4) group real/imaginary parts explicitly; (5) state product-of-roots $=C/A=a$; (6) full FOIL expansion of $(1+2i)(2-3i)$ shown term-by-term; (7) simplify each term; (8) substitute $i^2=-1$ with an explicit sign-rule note; (9) group and combine to the final answer |
| 4 | تمرين (2-1) "السؤال 1" — quadratic with root $(\sqrt3-i)^2$ | The $i^2=-1$ substitution inside the initial squaring was folded silently into the next number; the sum-of-conjugates step showed no work at all | Split into 4 steps: binomial expansion shown, then the $i^2=-1$ substitution shown as its own step, then the sum (`(2+2)+(-2\sqrt3+2\sqrt3)i`) shown explicitly, then the product (already reasonably shown) kept |
| 5 | تمرين (2-1) "السؤال 2" — division $z=\dfrac{3+6i}{3i}$ | The entire conjugate-multiplication division (numerator FOIL, $i^2=-1$ substitution, denominator simplification, final division) was compressed into one unexplained line | Split into 6 steps: set up the division; multiply by $\frac{-3i}{-3i}$; expand the numerator term-by-term with the $i^2=-1$ substitution shown; expand the denominator with the substitution shown; divide term-by-term; compute $h$ from the result |
| 6 | تمرين (2-1) "السؤال 3" — $2r^2=k-\tfrac89i$ with $r=\tfrac{2-i}{3}$ | $(2-i)^2$ was expanded and combined in a single invisible step; the $\times2$ step was folded into the same line | Split into 4 steps: binomial expansion of $(2-i)^2$ shown with the $i^2=-1$ substitution as its own arrow-annotated stage; the $\times2$ step isolated; the final real/imaginary comparison stated explicitly (including that the imaginary parts already check out) |
| 7 | تمرين (2-1) "السؤال 4" — $(A+Bi)^2=-5+12i$ | The expansion of $(A+Bi)^2$, the resulting two-equation system, the substitution $B=6/A$ into the first equation, and the resulting quartic were all asserted with zero shown work | Split into 8 steps total (from the original 3): full binomial expansion of $(A+Bi)^2$ with the $i^2=-1$ substitution shown; explicit statement of *why* two real equations follow (equality of complex numbers); isolating $B$; substituting to get the quartic, with the clearing-the-fraction step shown; factoring; explicitly explaining why $A^2=-9$ is rejected ($A^2$ can never be negative for real $A$); recovering $B$ from $B=6/A$ for each accepted value of $A$ |

### Lesson 4 (3 items)

| # | Item | Why too compressed | What was added |
|---|---|---|---|
| 8 | تمرين (السؤال 2 — أ) — $(1+i)^3+(1+i)^4$ | $(1+i)^3=2i(1+i)$ and $(1+i)^4=(2i)^2$ were both asserted as final answers with the actual multiplication/squaring invisible | Split into 4 steps: the cube's multiplication $2i(1+i)=2i+2i^2$ shown with the $i^2=-1$ substitution as its own arrow; the fourth power's squaring $(2i)^2=4i^2$ shown the same way; the final addition shown grouping real/imaginary parts explicitly |
| 9 | تمرين (السؤال 2 — و) — $\left(\dfrac{1+3i}{4-i}\right)^2$ | Both the conjugate-multiplication (numerator FOIL) and the subsequent squaring (binomial expansion) were compressed to bare final results with nothing shown in between | Split into 4 steps: conjugate multiplication set up with the difference-of-squares reasoning for the denominator; full FOIL of the numerator shown term-by-term with the $i^2=-1$ substitution; the squaring of the simplified fraction's numerator shown via binomial expansion with the substitution shown; final combination |
| 10 | تمرين (السؤال 3 — د) — $(2x+i)(x-i)=\dfrac{16y^2+9}{4y+3i}$ | The right-hand side's conjugate-factor simplification and the left-hand side's FOIL expansion were both asserted with zero shown work | Split into 4 steps: right side simplified via the sum-of-two-squares $=$ conjugate-product identity (with an explicit self-check); left side expanded via full FOIL with the $i^2=-1$ substitution shown; the real/imaginary comparison and the final substitution to solve for $y$ separated into their own steps |

## 5. Confirmation — No Content Changed

- **Question statements**: byte-identical in all 10 modified cards — confirmed via `git diff`, which shows no `<div class="example-problem">` line touched anywhere in either file.
- **Question numbers / badges**: unchanged (`example-badge` values untouched in the diff).
- **Given data**: unchanged — no number, sign, or coefficient in any problem statement was altered.
- **Final answers**: unchanged in every one of the 10 items — confirmed by independently re-deriving each by hand during this phase (e.g. مثال 5's $a=8+i$ and root $2-3i$; تمرين "السؤال 4"'s $(A,B)=(2,3)$ or $(-2,-3)$; all match the pre-existing `exercise-final` text, which was itself not edited).
- **Textbook/project method**: unchanged — every expansion only inserts intermediate algebra for a method the card already used (FOIL, binomial expansion, conjugate multiplication, $i^2=-1$ substitution); no alternative technique was introduced.
- **Lesson structure / card structure / UI**: unchanged — only `<p class="calc-note">` and `<div class="calc-flow">`/`<li class="step">` content was added or split; no new card types, no CSS, no navigation changes.

## 6. A Rendering Bug Found and Fixed During This Phase's Own Validation

While drafting مثال 5's expansion, an early version wrote the Arabic label "مجموع الجذرين" *inside* a MathJax inline-math delimiter (`\( \text{مجموع الجذرين}=-B=\dots \)`). Screenshot verification showed this rendered with the Arabic text **visually reversed/mirrored** — a genuine bidi (bidirectional text) rendering defect, confirmed by checking that no other file in the project successfully uses Arabic inside `\text{}` (only Latin abbreviations like `\text{L.H.S}` appear elsewhere, in `lesson-3.html`). Root cause: MathJax's internal LTR math-mode handling conflicts with the browser's RTL bidi algorithm when the `\text{}` content itself is RTL Arabic.

**Fix**: moved the Arabic label outside the math delimiters (plain RTL HTML text, the same safe pattern already used successfully throughout the rest of the project — e.g. "مجموع الجذرين $=3-i$" rather than "$\text{مجموع الجذرين}=3-i$"), keeping only symbols and numbers inside `\( \)`. Re-verified via screenshot: renders correctly in proper RTL order. A repository-wide search confirmed this was the only instance of the broken pattern anywhere in this phase's edits.

## 7. Validation

### MathJax / raw-LaTeX / overflow / duplicate-ID validation

Static server (`python3 -m http.server`) + headless Chromium (Playwright). All reveal-steps buttons clicked and MathJax force-retypeset before measurement, run after the Section 6 fix.

| Page | HTTP | MathJax Errors | Raw LaTeX leaks | RTL | Overflow | Duplicate IDs | Console Errors |
|---|---:|---:|---:|---:|---:|---:|---:|
| chapter-1/index.html | 200 | 0 | 0 | ✓ | none | none | 0* |
| lesson-1.html | 200 | 0 | 0 | ✓ | none | none | 0 |
| lesson-2.html | 200 | 0 | 0 | ✓ | none | none | 0 |
| lesson-3.html | 200 | 0 | 0 | ✓ | none | none | 0 |
| lesson-4.html | 200 | 0 | 0 | ✓ | none | none | 0 |
| lesson-5.html | 200 | 0 | 0 | ✓ | none | none | 0 |
| lesson-6.html | 200 | 0 | 0 | ✓ | none | none | 0 |
| lesson-7.html | 200 | 0 | 0 | ✓ | none | none | 0 |

\* Same pre-existing, already-documented (Phase 5.3) transient `favicon.ico` 404 on the index page, unrelated to any page content; `index.html` was not modified.

### Manual visual spot-checks (screenshot review)

- مثال 5 (Lesson 5) — full 9-step card screenshotted and read end-to-end: renders correctly, RTL text flows naturally, all math left-to-right within RTL context, no clipping.
- تمرين "السؤال 2" (Lesson 5, the division example) — full 6-step card screenshotted: renders correctly.
- تمرين "السؤال 3 — د" (Lesson 4) — full 4-step card screenshotted: renders correctly.

### Solution cards / reveal buttons

All modified cards' reveal buttons tested via Playwright click simulation; all open and display their (now longer) step lists correctly, with `hidden-steps`/`steps` classes toggling as expected — no broken buttons introduced.

### Question numbers and final answers

Confirmed unchanged for all 10 modified cards (§5).

### Chapters 2–6

Confirmed untouched: `git diff --stat chapter-2/ chapter-3/ chapter-4/ chapter-5/ chapter-6/` returns empty.

## 8. Git Status

```
M chapter-1/lessons/lesson-4.html
M chapter-1/lessons/lesson-5.html
```

- **Files changed:** `chapter-1/lessons/lesson-4.html`, `chapter-1/lessons/lesson-5.html`
- **Files unchanged:** `chapter-1/index.html`, `chapter-1/lessons/lesson-1.html`, `lesson-2.html`, `lesson-3.html`, `lesson-6.html`, `lesson-7.html`; all files in Chapters 2–6; all global assets
- **Audit statistics:** 126 cards scanned, ~55 flagged as candidates, 10 confirmed as genuine gaps and expanded (§2, §4)
- **Validation results:** all 8 Chapter 1 pages pass — HTTP 200, 0 MathJax errors, 0 raw-LaTeX leaks, correct RTL, no overflow, no duplicate IDs, no console errors beyond the pre-existing unrelated favicon 404 (§7)
- **Git:** commit — **NO**. push — **NO**. PR — **NO**. Working tree left uncommitted for independent review, per this phase's explicit instructions.
