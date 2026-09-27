# W04 Join Page Rubric Review

Reviewed against the user-provided 30-point rubric. This is a source review with targeted script checks, not an official course audit or browser report. No total score is claimed.

| Criterion | Points | Review result |
| --- | ---: | --- |
| 1. Page Audit | 10 | Pending: run the course audit on the published join.html URL. Existing reports are from earlier work and do not establish a result for this page. |
| 2. Web Design Principles | 4 | Source supports consistent palette, grouped fields, and mobile-first layout. Cards follow the form on narrow screens and sit on the right at 800px and wider. Visual inspection remains pending. |
| 3. Lighthouse Test | 2 | Pending: mobile Performance, Accessibility, Best Practices, and SEO must each reach 90+. |
| 4. Color Contrast | 1 | Seven primary text/background combinations calculated at 5.75:1 or higher. CSS Overview verification of rendered states remains pending. |
| 5. Navigation & Wayfinding | 1 | Shared responsive menu, skip link, and aria-current on Join are present. Local page links passed earlier checks. Browser keyboard and mobile menu testing remain pending. |
| 6. Page Weight | 1 | Local HTML and referenced CSS, scripts, icon, and images total 35,518 bytes. External Google Fonts are excluded. Verify full initial network load is at most 500 kB. |
| 7. Form Field Requirements | 2 | All specified fields, names, titles, appropriate input types, required attributes, and wrapping labels are present. Added autocomplete="off" to the membership selector and description. Personal and organization fields use their specified autocomplete tokens. Hidden timestamp has a name, id, and title; autocomplete off is intentionally omitted because that value is invalid for hidden inputs. |
| 8. Title Pattern | 1 | Pattern [A-Za-z \-]{7,} passes Manager, Co-Owner, and Sales Lead; rejects Owner, Manager1, and Lead_Dev. Optional blank title remains permitted by the assignment. |
| 9. Email Placeholder | 1 | Example placeholder name@example.com is present. |
| 10. Membership Level | 1 | Required selector offers exactly np, bronze, silver, and gold, with prices. |
| 11. Modal | 2 | Four native dialog elements and four benefit links present. Script opens dialogs with showModal and returns focus on close. Native keyboard behavior still needs browser verification. |
| 12. Date Timestamp | 1 | Hidden timestamp is set to an ISO date/time when the deferred page script executes. Script behavior checked. |
| 13. Thank You Page | 1 | GET action targets thankyou.html. Query parameters populate all six specified values plus membership. Shared header/footer/styles retained. Values use textContent. Actual browser submission still needs verification. |
| 14. Animation or Transition | 2 | All four cards have a staggered initial opacity/position animation. Reduced-motion preference disables animation for accessibility. |

## Checks completed

- JavaScript syntax checked for chamber.js, join.js, and thankyou.js.
- Organizational-title regular expression checked using the modern v flag with six valid/invalid cases.
- Prior targeted script checks covered timestamp initialization, modal open/close callbacks, focus return, confirmation parsing, and safe text rendering.
- Primary text contrast ratios: body 13.69, muted on white 6.01, hint on paper 5.75, card links 10.18, button text 11.64, footer text 14.02, footer links 9.93.
- Local links across Home, Directory, Discover, Join, and Thank You passed earlier existence checks.

## Remaining browser and publication checks

No connected browser was available in this session. Preview at narrow mobile and desktop widths; verify no horizontal overflow, keyboard progression, all four dialogs, invalid input blocking, and successful submission. Run mobile Lighthouse, DevTools CSS Overview, and a complete initial-load network measurement. Publish the changes and run the course audit on the published Join URL before submitting.

Expected submission URL after publication: https://RaymondAngel.github.io/wdd231/chamber/join.html
