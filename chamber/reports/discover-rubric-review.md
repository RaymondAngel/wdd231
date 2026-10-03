# W05 rubric review

Compared with the student's supplied 30-point Canvas rubric. All 13 criteria meet the stated Complete requirements in the checks below. This is evidence for submission, not a guarantee of the instructor's grade.

| Criterion | Points | Evidence |
| --- | ---: | --- |
| 1. Page Audit | 10 | Official W05 audit returned no failing issue markers outside its legend; W3C HTML and CSS each have zero errors. CSS warnings and statistics are advisory. See discover-course-audit.txt. |
| 2. Web Design Principles | 4 | Shared forest/gold palette and typography; repeated card styling and aligned content; mobile/medium/desktop screenshots reviewed. No horizontal overflow at 320, 640, 641, 768, 1024, 1025, and 1440px. |
| 3. Lighthouse Test | 2 | Mobile Accessibility 100, Best Practices 100, SEO 100; each exceeds 95. Desktop also 100 in all three categories. See saved Lighthouse reports. |
| 4. Color Contrast | 1 | Chrome DevTools CSS Overview: zero AA failures. Muted text has AAA advisories but passes the rubric's AA requirement. See discover-css-overview.json. |
| 5. Navigation & Wayfinding | 1 | Responsive shared menu, mobile toggle, Escape behavior, and aria-current="page" on Discover. Local navigation links checked. |
| 6. Page Weight | 1 | Cold load approximately 312 kB including external resources, below 500 kB. See discover-browser-checks.json. |
| 7. Custom Message using localStorage | 2 | Last visit stored with Date.now(); first visit, under-one-day, one-day, and five-day messages passed Chrome checks. Storage-blocked fallback also passed. |
| 8. Lazy Loading | 1 | Seven of eight destination photographs use loading="lazy"; the first is eager. Offscreen photos defer loading and load when scrolled into view. |
| 9. JSON Data | 2 | data/attractions.mjs contains an exported array of eight objects formatted as JSON, imported by the type="module" page script, as the assignment requires. |
| 10. Card Design | 2 | All eight rendered cards have h2 title, figure/photo, address, description paragraph, and Learn more button. All eight buttons open destination details. |
| 11. Named Grid Areas | 2 | Three different card compositions: vertical up to 640px; photo-left/text-right/full-width button at 641–1024px; title across both areas and button beside photo at 1025px+. Gallery placement also uses eight named areas. |
| 12. Eight Webp Images | 1 | Eight distinct local photographs displayed, each 300 × 200 and WebP; all decoded successfully. |
| 13. Image Hover Effect | 1 | CSS saturation/scale effect restricted to min-width 641px and fine mouse pointers. Browser checks confirm no mobile effect and a desktop effect. Reduced-motion disables transitions. |

The code correction in this review moves grid placement from element.style to eight external CSS rules, meeting the course prohibition on inline styling for the rendered cards as well as the static document.

Published page: https://raymondangel.github.io/wdd231/chamber/discover.html

The student still needs to submit the URL in Canvas and complete course group sharing/peer review.
