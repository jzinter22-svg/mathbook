# PHASE 6.3 — CHAPTER 3 SOLUTION COMPLETION

## 1. Scope

Chapter 3 only — تطبيقات المشتقة (Applications of Derivatives), all 7 lessons (`chapter-3/lessons/lesson-1.html` through `lesson-7.html`) plus `chapter-3/index.html` (read-only, not modified). No other chapter, `Output/`, global asset, or previously-recorded CF finding was touched.

## 2. Lessons Reviewed

| Lesson | Title | PDF section / pages |
|---|---|---|
| 1 | مراجعة عامة في قواعد إيجاد المشتقة (1-3) | pp. 80–81 |
| 2 | استخدام المشتقة في التقريب (2-3, التفاضلات) | pp. 81–88 |
| 3 | النقاط الحرجة ومناطق التزايد والتناقص (3-3) | pp. 88–93 |
| 4 | النهايات العظمى والصغرى المحلية (4-3) | pp. 93–95 |
| 5 | نقاط الانقلاب وتحدب وتقعر الدالة (5-3) | pp. 95–99 |
| 6 | رسم الدوال الحقيقية — طريقة السبع خطوات (6-3) | pp. 99–101 |
| 7 | تطبيقات عملية على النهايات العظمى والصغرى (7-3) | pp. 101–104 |

Chapter page range confirmed as PDF pp. 79–104 (26 pages), consistent with the project's earlier fidelity audit. `تمرين` (exercise) sections located and page-confirmed at: 1-3 → p.87, 2-3 → p.92 (approx.), 3-3 → p.98 (approx.), 4-3 → pp.103–104.

## 3. Complete Audit

| Category | Count |
|---|---|
| Total worked examples (مثال, incl. lettered sub-parts) | 32 |
| Total exercise questions/sub-questions (السؤال, incl. lettered sub-parts) | 65 |
| **Total cards audited** | **97** |
| A — Fully satisfactory | 95 |
| B — Too brief | 2 |
| C — Partially solved | 0 |
| D — Answer only | 0 |
| E — Missing | 0 |
| Improved | 2 |
| Newly completed (from E) | 0 |

Method: a systematic scan located every card with zero or one step block (the same method used in Phases 6.1–6.2); every flagged card was read in full, and — because this chapter's own instructions call for extra scrutiny on optimization/construction problems — every full worked example and every exercise item in the "hardest" lessons (2, 3, 4, 5, 6, 7) was additionally read directly, not just the automatically-flagged candidates. Lesson 1 (derivative-rules review) and the remainder of Lesson 2 were also read in full. All content was cross-checked against rendered PDF page images (180 DPI).

The 4 items automatically flagged as "1-step" (Lesson 2, تمرين question 3, parts b–e: approximate $\sqrt[4]{17/81}$, $(25)^{1/3}$, $\sqrt{36.6}$, $(33)^{-1/5}$ using differentials) were reviewed individually and found **not** to be gaps: each single `<li>` contains a full multi-line derivation (choice of $x$ and $\Delta x$ with an explicit reason, the derivative, its evaluation, and the final approximation via $\Delta y \approx f'(x)\Delta x$) — a weak student can follow every one without guessing.

## 4. Difficult Problems

Per this phase's special-attention list, every optimization/construction problem, every max/min classification, every concavity/inflection problem, and the full 7-step graphing method were specifically reviewed for whether the "why" (not just the "what") is explained.

- **Lesson 7, مثال 15–17** (rectangle max-area, min sum-of-squares, largest cylinder in a sphere) — already exemplary: given/setup, reduction to one variable with the reason for each substitution explicitly stated, differentiation, solving, an explicit reason for rejecting invalid roots (e.g. "نهمل $h=-\sqrt{12}$ لأن الارتفاع موجب"), and an explicit second-derivative justification for max vs. min every time. No change needed.
- **Lesson 7, "السؤال 9" and "السؤال 10"** (largest cone in a sphere; largest cylinder in a cone) — **genuine gap found**. Both stated their key geometric relation ($r^2=h(2R-h)$ for Q9; $r=R(1-h/H)$ for Q10) as a bare assertion, with no diagram and no derivation — unlike مثال 17 immediately above them, which explicitly derived its analogous relation via the Pythagorean theorem with a cited figure. A weak student could not have reproduced *where* these relations come from. **Classified B (too brief) and improved** — see §5.
- **Lesson 4, مثال 9(a)/9(b)** (local max/min via first-derivative sign test) — both explicitly show the number-line sign test with sample points substituted and evaluated, not just asserted. No change needed.
- **Lesson 5, مثال 11–13** (concavity, inflection points) — full derivation of $f'$, $f''$, the sign test, and the meaning of the result at every step. No change needed.
- **Lesson 6, مثال 14(a)/14(b)** (full 7-step graphing method) — the flagship example of the chapter; every one of the 7 steps (domain, symmetry, intercepts, extrema + monotonicity, inflection + concavity, an extra point, table + sketch) is explicitly labeled and worked in full, including why an extra point was needed for accuracy. No change needed.
- **Lesson 6, تمرين (3-3), items 1–10** — reviewed for the same "construct-before-differentiate" concern. These are markedly more compressed than مثال 14a/14b (each item packs the full 7-step method into ~2 dense lines with no restated reasoning). Judged **not** a gap: the underlying skill (sign-testing for extrema, using $f''$ for concavity) was already explicitly and repeatedly modeled in full, multiple times, in Lessons 3, 4, 5, and in this same lesson's own مثال 14a/14b, immediately before this exercise section. Expanding all 10 items to match مثال-level verbosity would repeat already-mastered reasoning without new pedagogical value, and risks violating this phase's own "do not add unnecessary verbosity" / "do not rewrite already-good solutions merely to make them longer" instructions. Left unchanged.
- **Lesson 2, تمرين question 3 (a–e)** (differentials/approximation) — see §3; already adequate.

## 5. Changes Made

### Change 1
- **File:** `chapter-3/lessons/lesson-7.html`
- **Lesson / Problem:** Lesson 7, تمرين (4-3), "السؤال 9" (largest cone inscribed in a sphere of radius 3 cm)
- **What was wrong:** Step 1 asserted the geometric relation $r^2=h(2R-h)$ with no derivation and no diagram — a weak student had no way to know where this equation comes from, unlike the immediately-preceding مثال 17 (largest cylinder in a sphere), which explicitly derives its analogous relation via the Pythagorean theorem.
- **What was changed:** Inserted an explanatory step deriving $r^2=h(2R-h)$: for the largest cone, both the apex and the base-circle rim must touch the sphere; this defines a right triangle (sphere center → base-circle rim → axis) with hypotenuse $R$ and legs $r$ and $(h-R)$, and the Pythagorean theorem gives $r^2+(h-R)^2=R^2 \Rightarrow r^2=2hR-h^2$. The original card was split from 2 `<li>` steps into 3 (derivation, function construction, differentiation/solving) for clarity.
- **Why necessary:** This is exactly the "construct a relationship before differentiating" difficulty this phase specifically calls out; the relation was previously unjustified.
- **Confirmation:** The problem statement, all given numbers ($R=3$), the equation $r^2=h(2R-h)=6h-h^2$ itself, every subsequent line, and the final answer ($V=\frac{32\pi}{3}\,cm^3$ at $h=4$, $r=2\sqrt2$) are byte-identical to before — only the missing derivation was inserted above the pre-existing (unchanged) steps.

### Change 2
- **File:** `chapter-3/lessons/lesson-7.html`
- **Lesson / Problem:** Lesson 7, تمرين (4-3), "السؤال 10" (largest cylinder inscribed in a cone, base diameter 12 cm, height 20 cm)
- **What was wrong:** Step 1 asserted $r=R(1-h/H)$ with only the label "بتشابه المثلثات" (by similar triangles) and no indication of *which* triangles or how the ratio was set up.
- **What was changed:** Inserted an explanation identifying the two similar right triangles (the full cone's axial triangle, and the smaller triangle formed above the cylinder's top rim, from the cone's apex down to the level where the cylinder touches the slant surface) — both right triangles sharing the apex angle — giving the proportion $\dfrac{r}{H-h}=\dfrac{R}{H}$, which rearranges to $r=R(1-h/H)$. Also fixed a typo introduced during this edit and caught during screenshot verification (an accidental nonsensical parenthetical "(نصف القطر = نصف القطر)"), replaced with the correct clarification that $R=6$ comes from the given base diameter of $12\,cm$. Split from 2 `<li>` steps into 3, matching Change 1's structure.
- **Why necessary:** Same category of gap as Q9 — the construction step is the hardest conceptual part of this problem type and was previously unjustified.
- **Confirmation:** The problem statement, all given numbers ($12\,cm$ diameter, $20\,cm$ height), the relation $r=R(1-h/H)=6-\frac{3h}{10}$ itself, every subsequent line, and the final answer ($V=\frac{320\pi}{3}\,cm^3$ at $r=4$, $h=\frac{20}{3}$) are unchanged — only the missing derivation was inserted.

No other file was modified. No problem statement, given number, method, or final answer was altered anywhere in the chapter.

## 6. Content Fidelity

- **Problem statements changed:** NO.
- **Numbers changed:** NO.
- **Final answers changed:** NO.
- **Textbook methods changed:** NO — both fixes only *derive* a relation the digital solution already used; they do not replace it with a different method. (Note: `تمرين 4-3` questions 1–10, including Q9 and Q10, have **no worked solution in the source PDF at all** — page 104 confirmed via rendered image to contain only the 10 problem statements. The digital site's step-by-step solutions for this entire exercise are therefore original enrichment work, not a transcription of a textbook derivation, so there was no risk of deviating from "the textbook's method" — there is no textbook method given for these two items to deviate from. The added derivations use only techniques already taught earlier in the same chapter: the Pythagorean theorem (already used identically in مثال 17) and similar triangles (a standard, already-familiar geometric technique).)

## 7. Browser Validation

Static server (`python3 -m http.server`) + headless Chromium (Playwright). All reveal-steps buttons clicked and MathJax force-retypeset before measurement, run twice (before and after the typo fix in Change 2).

| Page | HTTP | MathJax Errors | Raw LaTeX leaks | RTL | Overflow | Duplicate IDs | Console Errors |
|---|---:|---:|---:|---:|---:|---:|---:|
| chapter-3/index.html | 200 | 0 | 0 | ✓ | none | none | 0* |
| lesson-1.html | 200 | 0 | 0 | ✓ | none | none | 0 |
| lesson-2.html | 200 | 0 | 0 | ✓ | none | none | 0 |
| lesson-3.html | 200 | 0 | 0 | ✓ | none | none | 0 |
| lesson-4.html | 200 | 0 | 0 | ✓ | none | none | 0 |
| lesson-5.html | 200 | 0 | 0 | ✓ | none | none | 0 |
| lesson-6.html | 200 | 0 | 0 | ✓ | none | none | 0 |
| lesson-7.html | 200 | 0 | 0 | ✓ | none | none | 0 |

\* Same pre-existing, already-documented (Phase 5.3) transient `favicon.ico` 404 on the index page, unrelated to any page content; `index.html` was not modified.

Both new reveal-steps buttons (`steps-q9`, `steps-q10` — pre-existing IDs, content only) were tested and screenshotted; equations render correctly in both RTL context and LTR math direction, with no clipping or overflow.

## 8. Remaining Issues

None discovered within scope. `تمرين (3-3)` items 1–10 in Lesson 6 remain more compressed than the chapter's flagship worked examples (§4) — reviewed and judged an acceptable, appropriately-scoped compression given the extensive prior scaffolding, not left "unresolved" in the sense of a genuine gap.

## 9. Files Modified

| File | Reason |
|---|---|
| `chapter-3/lessons/lesson-7.html` | Added the missing geometric-relation derivations for تمرين (4-3) "السؤال 9" and "السؤال 10" (§5). No other content in this file, or any other Chapter 3 file, was changed. |

## 10. Git Status

- commit: NO
- push: NO
- PR: NO

Working tree left uncommitted for human review, per this phase's explicit instructions.

---

## Final Summary

- **Total items audited:** 97 (32 examples + 65 exercise sub-questions), across all 7 Chapter 3 lessons.
- **Genuine solution gaps found:** 2 (both in Lesson 7, تمرين 4-3 — Q9 and Q10, both missing the derivation of a geometric relation needed before differentiating).
- **Fixes made:** 2 (derivations added, matching the rigor of the chapter's own مثال 17; no problem statement, number, or final answer touched).
- **Rendering bugs fixed:** 0 (Chapter 3 had none; a self-introduced typo from mid-edit was caught during screenshot verification and corrected before finalizing — see §5, Change 2).
- **Validation result:** all 8 Chapter 3 pages pass — HTTP 200, 0 MathJax errors, 0 raw-LaTeX leaks, correct RTL, no overflow, no duplicate IDs, no console errors beyond the pre-existing unrelated favicon 404.
- **Exact files changed:** `chapter-3/lessons/lesson-7.html` only.
- **Git:** no commit, no push, no PR performed — working tree left uncommitted for independent review.
