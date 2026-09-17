# W01 Course Home — rubric comparison

Reviewed against Raymond's uploaded 30-point Canvas rubric.

## Criteria

| # | Criterion | Points | Current evidence and remaining verification |
| --- | --- | --- | --- |
| 1 | Page Audit | 10 | Local structure/link checks passed, and the public official audit rules were inspected for compatibility. **No official report has been generated.** Publish at the correct URL and run the official audit; full credit requires no reported errors. |
| 2 | Web Design Principles | 4 | Shared spacing, alignment, repeated components, padding, flexible layouts, and zero-width-safe grid columns are implemented. **Rendered checks at all widths remain pending.** No guarantee of zero horizontal scrolling is claimed without browser testing. |
| 3 | Lighthouse Test | 2 | Semantic structure, accessible labels, metadata, and lightweight resources are implemented. **Mobile Lighthouse Accessibility, Best Practices, and SEO scores of at least 95 remain unmeasured.** No connected browser is available. |
| 4 | Color Contrast | 1 | Core text/focus colors have computed AA-compatible contrast; examples include body text 12.42:1, muted text on white 6.41:1, and completed-card text 7.54:1. **DevTools CSS Overview still needs to confirm all rendered pairs.** |
| 5 | Navigation and Wayfinding | 1 | Hamburger menu, desktop horizontal flex navigation, active-page indication, accessible open/closed state, Escape focus handling, and breakpoint resets implemented; local logic tested. |
| 6 | Overall Page Weight | 1 | Font request reduced from five weights to two. Updated local resources plus previously measured font resources total **312,992 bytes (about 313 kB)**, including the personal photo. **Actual initial transferred bytes should still be checked in browser Network/Lighthouse.** |
| 7 | Page Layout | 2 | Three required sections; About Me/Student Photo side by side at larger widths; certificate panel below; stacked mobile view and responsive course grid. Follows the supplied example structure, not one-column flow in all views. |
| 8 | Course List | 2 | All six official course objects are rendered dynamically; current-source tests passed. |
| 9 | Course Filter | 2 | All/CSE/WDD button click filtering uses filter(); current-source tests passed. |
| 10 | Number of Credits | 3 | reduce() totals selected courses: All = 12, CSE = 6, WDD = 6. Added-data tests confirm automatic updates. |
| 11 | Classes Taken | 1 | Raymond confirmed CSE 110, CSE 111, CSE 210, WDD 130, and WDD 131 are completed; their flags are true. Current WDD 231 remains false. Completed cards use a distinct background, checkmark, and text label. |
| 12 | Year and Last Modified | 1 | External deferred JavaScript writes the current copyright symbol/year and the raw document.lastModified string; current-source tests passed. |

These are evidence-based implementation/verification statuses, not a predicted grade. Rubric points cannot be certified until the required official/browser reports and personal completion information are available.

## Change made for the rubric

The original request loaded five Manrope font weights. The public font service's legacy TTF response totaled 475,744 font bytes, for a combined resource budget of 588,579 bytes. Although browser compression and modern WOFF2 delivery can differ, that was an avoidable risk for the 500 kB limit.

The home and Final-placeholder pages now request only 400 (regular) and 700 (bold). Custom CSS formerly using 800 now uses 700. The measured total is:

- Referenced local resources after installing the personal photo: 122,656 bytes.
- Font stylesheet: 436 bytes.
- Two TTF font files: 189,900 bytes.
- Combined resource budget: 312,992 bytes.

This is a source-resource measurement, not a captured browser transfer report. Fonts may differ by browser response, caching, and compression. Recheck after adding a personal portrait or any other resource.

No chamber project files were edited. No completed-course claims were fabricated. No public deployment, GitHub remote change, or Canvas submission was performed.

## Verification during this review

Nine current-source JavaScript checks passed for dynamic courses, All/CSE/WDD totals, button state, completed-card rendering, data changes, and footer dates. The completion-style test used an isolated test context and did not change Raymond's actual course array. Local references, CSS braces, and the two-weight font request passed checks. The earlier 22 course-home logic checks and HTML structural checks are documented in course_home_readme.md.

The official audit includes external HTML/CSS validation and published-repository checks. Inspecting those rules locally is not equivalent to running its report.

## Inputs and external steps still needed

1. Completed-course information is now confirmed and applied: all five prior courses are complete; WDD 231 is current and incomplete.
2. Personal photo is installed: images/course_home_personal.jpg, 92,632 bytes, 800 × 640 pixels. Both people and the full frame are preserved; the source photo is unchanged. This replaces the temporary study image and adds about 11 kB to the previously measured resource budget.
3. Connect a browser or run the page in VS Code Live Server; inspect mobile and desktop layouts, console errors, and CSS Overview.
4. Run incognito Lighthouse and confirm at least 95 in Accessibility, Best Practices, and SEO in mobile mode (the assignment instructions also request desktop).
5. Check the actual cold initial network transfer remains below 500 kB.
6. Review the GitHub repository naming mismatch documented in course_home_readme.md, publish to the appropriate course URL, and run the [official course page audit](https://byui-cse.github.io/wdd-audits/wdd231-w01-homepage.html).
7. The pasted Canvas page says this assignment was locked on September 12 at 4:59 p.m. This is the status in the uploaded snapshot, not a live Canvas check. **Contact your instructor about reopening/access before attempting submission.** Site edits cannot unlock the assignment.

## References

- User-provided Canvas rubric (30 total points).
- [Official course-home assignment](https://byui-cse.github.io/wdd231-ww-course/week01/assignment-01.html).
- [Official audit entry point](https://byui-cse.github.io/wdd-audits/wdd231-w01-homepage.html).
