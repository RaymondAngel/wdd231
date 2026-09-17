# W02 Learning Activity: The Fetch API

## Files and requirement coverage

- `prophets.html`: required root page, valid-document structure, title/description/author/viewport/language, Latter-day Prophets h1 in header, main with div#cards, and Raymond Amande | Latter-day Prophets in the footer.
- `styles/prophets.css`: external custom styling, the existing navy/gold/off-white palette and Manrope font, responsive CSS Grid with auto-fit, narrow-width-safe minmax(), constrained portraits, touch-size links/button, and visible keyboard focus. Normalize is linked first. No frameworks, inline styling, or !important declarations are added.
- `scripts/prophets.js`: external deferred script using the required const url and cards, async getProphetData(), const response and data, await fetch(url), and await response.json(). It passes data.prophets to the const arrow function displayProphets, then uses forEach(), createElement(), template literals, setAttribute(), and appendChild() to build each section card.
- Each card contains its full-name h2, Date of Birth, Place of Birth, and image with src/alt/loading/width/height attributes. Portraits use the official image URLs from the supplied records, not invented portraits or local substitutes.
- The temporary console.table(data.prophets) line is commented out after data inspection. The startup call follows initialization of displayProphets.
- Additional resilience: response.ok check, required response fields, try/catch/finally, loading and completion messages, empty-result handling, visible error/retry control, and a fallback message for broken portraits.
- `byui_project_standards.md`: reusable lesson concepts and confirmed course practices for future projects. It does not claim to remember unavailable past uploads.

Existing course-home, chamber, favicon, social-meta, and ward JSON files are unchanged.

## Data inspection and tests performed

The actual course JSON was downloaded and parsed; it currently contains 18 prophet objects under the prophets property. Relevant keys include name, lastname, birthdate, birthplace, and imageurl. The desktop example screenshot was inspected and the implementation follows its repeated name/date/place/portrait card layout with Raymond's existing palette rather than copying its purple colors.

Fourteen isolated JavaScript behavior checks passed using the real downloaded records and a mock document/fetch environment:

1. Loading state before the request resolves.
2. Correct endpoint.
3. All 18 supplied records rendered.
4. Every card's names, dates, birthplaces, and five image attributes match the data.
5. Success announcement and busy-state cleanup.
6. Repeated loading does not duplicate cards.
7. Broken-image fallback.
8. Empty-array handling.
9. HTTP 404 handling.
10. Network-rejection handling.
11. Invalid-JSON handling.
12. Invalid top-level shape handling.
13. Missing record-field handling.
14. Retry-button recovery after an HTTP error.

Local checks also passed for all file references, required markup, deferred script, auto-fit Grid, balanced CSS braces, no newly added !important, and whitespace errors. These checks are not browser rendering or an official HTML validation report.

## Browser and sharing steps still pending

No browser is connected, so actual page rendering, browser console/network behavior, portrait downloads, mobile/desktop screenshots, and external validation reports remain unverified. Open prophets.html in VS Code Live Server and confirm the cards, then test at mobile and desktop widths and inspect the browser console. Keep an internet connection: the required JSON and portrait URLs are remote.

The assignment asks Raymond to share his work/issues with his Microsoft Teams group. No Teams message, commit, push, publication, or assignment submission was performed. After publishing, the expected activity URL is https://RaymondAngel.github.io/wdd231/prophets.html; that new page has not been verified online.

## Concepts to reuse

Await the request and JSON parsing separately. Check HTTP status explicitly. Pass the expected array rather than the wrapper object. Separate fetching from rendering; use textContent for data text. Use temporary console.table() during development. Define const arrow functions before calling them; unlike function declarations, they cannot be called before initialization. Use accessible loading/error states and responsive auto-fit cards. These practices are also recorded in byui_project_standards.md.

## Source

[Official W02 Fetch API instructions and layout examples](https://byui-cse.github.io/wdd231-ww-course/week02/prepare-fetch.html) and [the required JSON endpoint](https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json). Portraits and historical values are displayed as supplied by that educational dataset, not independently asserted biographical research.
