# PHASE 5.1 — OUTPUT ARCHITECTURE & STALENESS INVESTIGATION

## 1. Executive Summary

`Output/` is **not** a build artifact, a deployment directory, or a maintained mirror. Git history proves it is the **abandoned original location of Chapter 4's content**, left behind after a July 2026 directory reorganization moved Chapter 4's real, ongoing-development copy to `chapter-4/` and never touched `Output/` again. `mathbook-release.zip` (git-tracked, committed the same week) is a one-time packaged snapshot of `Output/` taken *before* that reorganization — a "release" of the July-era build, not an active output of anything. No file anywhere in the live site (HTML, CSS, or JS) links to, imports, or navigates into `Output/`; it is reachable only by a reader who already knows or guesses its URL. It has not been updated for chapter-4 content since **before** Chapters 1, 3, 5, and 6 even existed in the repository, and it predates every one of this session's Phase 1–5 corrections except two incidental identity-text edits.

**Classification: D — LEGACY / OBSOLETE COPY.**
**Risk: MEDIUM** (not CRITICAL/HIGH, because it is unlinked from the live site and GitHub Pages configuration cannot be confirmed from repository evidence alone — but not NONE either, because if GitHub Pages serves the repository root as static files, these stale pages would be reachable by direct URL).
**Recommendation: OPTION 3 — DEPRECATE** (with OPTION 4 — DELETE as the likely eventual outcome, pending your confirmation — see §13–14).

## 2. Repository Architecture Evidence

- **No build system exists.** No `package.json`, no `astro.config.*`, no `vite.config.*`, no `node_modules/`, anywhere in the repository (confirmed via `find`).
- **No CI/CD exists.** No `.github/` directory at all — no GitHub Actions workflows.
- **No hosting-platform config exists.** No `netlify.toml`, no `vercel.json`.
- **`.nojekyll`** (empty, 0 bytes) sits at the repository root. This file has exactly one purpose: telling GitHub Pages not to run Jekyll on the served content. Its presence at root (not inside any subdirectory) is evidence GitHub Pages is used and is most consistent with serving from the repository root or default branch, though the exact Pages configuration (which branch/folder is selected in the repo's Settings → Pages) is **not stored in the repository itself** and cannot be confirmed with certainty from files alone.
- **Commit messages independently confirm GitHub Pages is the deployment mechanism:** `f4af659 "Disable Jekyll processing for GitHub Pages (add .nojekyll)"`, `e57357f "Trigger fresh GitHub Pages deployment"`, `eab4927 "Add Chapter 2 (Conic Sections) for GitHub Pages preview"`, and four separate `"Sync Chapter 2 ... to Pages preview"` commits.
- **Governance docs are minimal and silent on `Output/`.** `README.md` is the single line "# mathbook". `PROJECT_RULES.md` is empty. `CLAUDE.md` states "Chapter 4 on the `main` branch is the canonical implementation" and gives design/workflow rules, but never mentions `Output/`, a build step, or a release process.
- **Conclusion:** this is a hand-authored static HTML/CSS/JS site with no build pipeline of any kind. Nothing in the repository *generates* `Output/` — there is no script, npm command, or workflow that could have produced it programmatically.

## 3. Output Directory Structure

```
Output/
├── index.html
├── lessons/
│   ├── lesson-1.html … lesson-7.html
└── assets/
    ├── css/theme.css
    ├── js/{plot.js, quiz.js, site.js}
    ├── fonts/{cairo-arabic.woff2, cairo-latin.woff2}
    └── mathjax/ (full local MathJax install: tex-mml-chtml.js, chtml.js, svg.js, font files)
```
42 files are git-tracked under `Output/`. Its internal structure (`index.html` + `lessons/lesson-N.html` + a self-contained `assets/` tree) is a **complete, self-contained single-chapter website** — i.e., "Chapter 4, packaged as its own standalone site" — not a partial fragment and not the multi-chapter site structure used everywhere else in the repository (`chapter-1/` … `chapter-6/` sharing one root-level `assets/`). This is a structural signature consistent with a **stand-alone export/package**, not a mirror of the live multi-chapter site.

## 4. Source vs Output Comparison

All seven `Output/lessons/lesson-N.html` files were hashed (SHA-256/MD5) against their `chapter-4/lessons/lesson-N.html` counterparts. **All seven differ** — not just the three files Phase 3/4 corrected:

| File | Identical? |
|---|---|
| lesson-1.html | **DIFFERS** |
| lesson-2.html | **DIFFERS** |
| lesson-3.html (866 vs 1908 lines) | **DIFFERS** |
| lesson-4.html | **DIFFERS** |
| lesson-5.html | **DIFFERS** |
| lesson-6.html | **DIFFERS** |
| lesson-7.html | **DIFFERS** |
| index.html | **DIFFERS** (but see below — this one *was* kept in sync for one specific edit) |

`Output/lessons/lesson-3.html` (866 lines) vs. the current `chapter-4/lessons/lesson-3.html` (1908 lines, more than double) uses an entirely different, older step-markup convention throughout — `<li class="step">...<i>note: value</i></li>` in `Output/`, versus the current `<li class="step"><span class="step-dot">N</span><div class="step-body"><p class="calc-note">...</p><div class="calc-flow">...</div></div></li>` structure used in `chapter-4/`. This is a project-wide template change that happened long after `Output/` was last touched — confirming the divergence is not limited to the CF-002/003/006/007 content, it spans the entire file's markup era.

**One exception:** `Output/index.html`'s "eyebrow" identity line currently reads "الرياضيات التفاعلية · الصف الثالث المهني" — the **current, Phase-1/2-corrected** text, not the original stale text. This is because Phase 1 and Phase 2 of this session searched the whole repository for the incorrect grade/identity string, found it in *both* `chapter-4/index.html` and `Output/index.html`, and fixed both without recognizing at the time that `Output/` was an abandoned legacy directory rather than a maintained mirror. This is the **only** respect in which `Output/` is not fully frozen at its July 2026 state.

## 5. Known Stale Content

Confirmed present, verbatim, in `Output/lessons/lesson-3.html`:
- Exercise "3-3" (lines 548–577): full formal $u$-substitution — `نُسمّي هذا الداخل $u$`, `$u=10-x^{1/3}$`, `$\dfrac{du}{dx}=-\dfrac13 x^{-2/3}$`, 13 substitution-based steps. **The exact CF-002 problem.**
- Exercise "3-8" (~lines 697–730+): `$u=\sqrt{x}\Rightarrow x=u^2$` and substitution-based factoring. **The exact CF-003 problem.**
- Line 407: the obsolete "بنفس الأسلوب حُلّت الأمثلة 11، 13، 14، 17، 19" callout; only Examples 10, 12, 15, 16, 18 exist. **The exact CF-007 problem.**

Confirmed absent from `Output/lessons/lesson-4.html` and `lesson-5.html`: no تمرين 2-4 / تمرين 3-4 sections exist at all (0 matches for either heading) — **the exact CF-006 gap**, though here it is more precisely an omission-because-it-predates-the-addition than a "reverted" fix.

CF-001, CF-004, CF-005, CF-008 are **not** present in `Output/` in any form, stale or otherwise, because `Output/` never contained Chapter 2, 5, or 6 content to begin with.

## 6. References to Output

A repository-wide search (`grep -rn "Output/"` and case-insensitive `"output"`) across every `.html`, `.js`, `.css`, and `.md` file, **excluding `Output/`'s own files and this investigation's own reports**, found:
- **Zero** references to `Output/` from any live HTML page, any chapter's JavaScript, or any stylesheet.
- The only matches for the bare word "output" are inside third-party minified library code (`assets/mathjax/*.js` — MathJax's own internal use of the English word "output" as part of its rendering-pipeline terminology, e.g. `output/chtml.js`-style internal naming) and the per-chapter `site-ch*.js` files, which is again just the common English word appearing incidentally in code, unrelated to the directory.

**No page anywhere in the site links to, imports from, or navigates toward `Output/`.** It is not part of the site's navigation graph.

## 7. Deployment / Hosting Evidence

- No workflow file, no `docs/` folder, no hosting-config file references `Output/` as a deploy source.
- `.nojekyll` at the repository root, plus the four "GitHub Pages" commit messages (§2), are the only concrete deployment evidence in the repository, and they point at the **repository root** being the served location (the pattern of commits repeatedly says "for GitHub Pages preview" / "to Pages preview" immediately after committing content directly under `chapter-N/` at the root — never under `Output/`).
- I cannot directly inspect the repository's GitHub Settings → Pages configuration from within this session (that setting is not stored as a file in the repo), so I am not able to give 100%-certain proof of the exact serving branch/folder. Based on the totality of file-level evidence, root-level serving is by far the most consistent interpretation, and there is no evidence anywhere supporting `Output/` as a configured Pages source.

## 8. Build / Generation Evidence

No script (shell, Python, Node, or otherwise) exists anywhere in the repository that copies, builds, exports, or generates `Output/` from another directory, or vice versa. No commit message describes an automated generation step. Every commit that touched `Output/`'s lesson content did so with hand-authored-sounding messages identical in style to the messages used for `chapter-N/` content elsewhere ("Deepen lesson-1 pedagogy: full worked-example scaffolding...", "Refine UI/UX: sidebar nav..."), consistent with `Output/` having been directly hand-edited/authored, not mechanically generated.

## 9. Git History Evidence — the decisive evidence

`Output/` is git-tracked with its own multi-commit history (`git log --all -- Output/`), and the **full chronological repository history** (`git log --all --oneline --reverse`) tells a clear, coherent story:

1. `caf87f7`, `c6fb0c9` — "Add/Complete chapter 4 interactive e-book" — Chapter 4 is built for the first time, under `Output/` paths.
2. `e6a4b23` — **"Add packaged release archive of the chapter 4 e-book"** — `mathbook-release.zip` is committed. The zip's own internal file timestamps (2026-07-13) and contents (`Output/index.html`, `Output/lessons/*.html`, `Output/assets/**`) confirm it is a **snapshot export of `Output/` at that moment** — i.e., a one-time "release package," not a live/regenerating artifact.
3. `dc39254` — **"Publish chapter 4 interactive e-book website at repository root"** — a *second*, separate copy of the same chapter-4 content is published directly at the repository root (`index.html` + a root-level `lessons/` folder) — this is the copy that actually went live on GitHub Pages.
4. `5665971`/`9b7faca`, `8b666a2`/`15dada4`, and the seven "Deepen lesson-N pedagogy" commits, plus `f10ff2a` — parallel refinement commits, all still under `Output/` paths (this appears to be a second development branch, later merged via `ea90b2f Merge pull request #1`, that continued iterating on the `Output/`-path copy specifically).
5. **`669bde3` — "Fix home page routing: move Chapter 4 into chapter-4/, add real home page"** (2026-07-16). This commit's diff is definitive: it does `{lessons => chapter-4/lessons}/lesson-N.html` — an actual git rename — moving the **root-level** `index.html` and `lessons/` (not `Output/`) into the new `chapter-4/` directory, and replacing the root `index.html` with a proper multi-chapter home page. Its commit message explains why: *"The repo root's index.html was Chapter 4's own book... the deployed GitHub Pages root always opened Chapter 4 and gave no way to reach Chapters 1-3."*
6. **`Output/` is not mentioned anywhere in this commit and was not touched.** It was simply left behind, holding whatever content it had as of step 4 above.
7. From this point forward (mid-July 2026 through today), all real chapter-4 development continued exclusively in `chapter-4/` — visible in the subsequent history as Chapter 1 rebuilds, Chapter 3/5/6 additions, multiple QA passes, and finally this session's Phase 1–5 corrections. `Output/` received **zero** further commits except this session's own `29a280e` and `3a67552` (the two identity-text fixes, made because the same bug happened to also exist in the untouched legacy copy).

This is conclusive: `Output/` is not derived *from* `chapter-4/` (there is no "regenerate" relationship) — if anything, the historical relationship runs the other way (an earlier, now-superseded parallel copy that a later root-level copy superseded and was then promoted to `chapter-4/`). Both copies briefly coexisted; only one was carried forward.

## 10. Authoritative Source Determination

**`chapter-4/` (and the other `chapter-N/` directories) is unambiguously authoritative**, based on:
- `CLAUDE.md`'s explicit statement: "Chapter 4 on the `main` branch is the canonical implementation for this project."
- Continuous, active commit history through today (including this session's Phases 1–5).
- Being the only copy referenced by the live, navigable site (home page → chapter-N/ links; confirmed in earlier phases of this session).
- Being the copy this repository's own commit history explicitly moved into place *for the purpose of being the real site* (`669bde3`'s message, §9.5).

`Output/` has none of these properties going forward from mid-July 2026 onward.

## 11. Output Classification

### **D. LEGACY / OBSOLETE COPY**

Confirmed by: no live references (§6), no build/deploy relationship (§7–8), and definitive git history showing it is superseded, abandoned content from before the current `chapter-4/` even existed in its present form (§9). It is not "generated," not "actively deployed," and not "intentionally maintained" — the evidence rules out categories A, B, and C.

## 12. Risk Assessment

### **MEDIUM**

Reasoning:
- Not CRITICAL/HIGH: `Output/` is not linked from any page a reader would normally navigate through, and there is no confirmed evidence it is a configured GitHub Pages source. A typical reader following the site's normal navigation will never encounter it.
- Not NONE/LOW: if GitHub Pages is (as the `.nojekyll` + deployment-commit evidence suggests) serving the repository root as static files, then `Output/lessons/lesson-3.html` and its siblings **would be reachable by direct/guessed URL** by anyone who tries `<site-root>/Output/lessons/lesson-3.html` — and if they land there, they would see the exact HIGH-severity CF-002/CF-003 formal-substitution problem and the exact MEDIUM-severity CF-007 missing-examples problem this project just spent two phases correcting, with no indication that this is not the current/correct version of the lesson. That combination — plausible public reachability, and content that is not just "old" but reproduces specific, already-identified curriculum-fidelity defects — is what keeps this above LOW.

## 13. Recommended Next Action

### **OPTION 3 — DEPRECATE**

With a note that **OPTION 4 — DELETE** is very likely the right eventual outcome once you confirm it, but I am not recommending immediate deletion in this phase for two reasons: (1) this investigation phase is explicitly read-only/no-action, and (2) `mathbook-release.zip` is a separate, already-static, already-committed archive — deleting `Output/` would not affect the zip's own historical content, but you may want to decide the fate of both together (e.g., "delete `Output/`, keep the zip as a historical release artifact" vs. "delete both").

I am not recommending **OPTION 1 — SYNCHRONIZE** or **OPTION 2 — REGENERATE**, because there is no evidence `Output/` needs to keep existing as a going-forward artifact at all — nothing consumes it, nothing links to it, and no process regenerates it. Synchronizing or regenerating it would mean permanently taking on the burden of keeping a second, unlinked, purposeless copy of Chapter 4 in sync forever, for no identified benefit.

## 14. Why This Recommendation Is Safe

- `chapter-4/` is independently, unambiguously confirmed authoritative (§10) — deprecating (or eventually removing) `Output/` cannot orphan any content, since nothing links to `Output/` and everything `Output/` contains has a current, correct, actively-maintained counterpart in `chapter-4/`.
- The one-time `mathbook-release.zip` snapshot already preserves a historical copy of the July 2026 state, if that history is ever wanted, independent of whether the live `Output/` folder is kept.
- No build/deploy process depends on `Output/`'s continued existence (§7–8) — removing or freezing it cannot break anything that currently works.

## 15. Phase 3/4 Integrity

Re-confirmed intact and unmodified by this investigation:
- `chapter-2/lessons/lesson-4.html` — CF-001 fix present (byte-identical to Phase 5's last verification).
- `chapter-4/lessons/lesson-3.html` — CF-002/003/007 fixes present.
- `chapter-4/lessons/lesson-4.html` — CF-006 (تمرين 2-4) present.
- `chapter-4/lessons/lesson-5.html` — CF-006 (تمرين 3-4) present.
- `chapter-5/lessons/lesson-3.html` — CF-008 fix present.
- `chapter-6/lessons/lesson-2.html` — CF-004 fix present.
- `chapter-6/lessons/lesson-5.html` — CF-005 fix present.
- `BOOK_CONTENT_FIDELITY_AUDIT.md` — Phase 3/4 addenda present, unaltered.

`git diff --stat` at the end of this phase is byte-for-byte identical to `git diff --stat` at the start (§17).

## 16. LOW Findings

CF-009 through CF-016 were not inspected for correction in this phase (this investigation is entirely about `Output/`'s architecture, independent of the LOW-severity content findings) and were not modified. No LOW finding was touched.

## 17. Git Status

- **Branch:** `claude/fix-book-educational-identity-2k531z` (up to date with `origin/claude/fix-book-educational-identity-2k531z`).
- **Modified files before this phase:** `BOOK_CONTENT_FIDELITY_AUDIT.md`, `chapter-2/lessons/lesson-4.html`, `chapter-4/lessons/lesson-3.html`, `chapter-4/lessons/lesson-4.html`, `chapter-4/lessons/lesson-5.html`, `chapter-5/lessons/lesson-3.html`, `chapter-6/lessons/lesson-2.html`, `chapter-6/lessons/lesson-5.html` (7 modified), plus untracked `PHASE_5_FINAL_REAUDIT.md`.
- **Modified files after this phase:** identical list, confirmed via `git status --short --branch` and `git diff --stat` re-run at the end — no line-count changes anywhere.
- **New file created by this phase:** `PHASE_5_1_OUTPUT_INVESTIGATION.md` only.
- No `git add`, `git commit`, `git push`, `git reset`, `git checkout`, `git restore`, `git clean`, or `git stash` was run at any point.

## 18. Final Verdict

### **OUTPUT ROLE CONFIRMED — ACTION REQUIRES HUMAN DECISION**

The role of `Output/` is now established with high confidence (an abandoned pre-July-16-2026 parallel copy of Chapter 4, superseded by `chapter-4/`, unreferenced by the live site, not part of any build/deploy pipeline). What remains is a decision that is legitimately yours to make, not a technical unknown: whether to deprecate-in-place (e.g., add a visible notice, or a `.gitattributes`/README note marking it historical), or delete it outright (with or without also removing `mathbook-release.zip`). Both are reasonable; neither is forced by the evidence alone.
