# Reusable BYU–Idaho project standards

These notes record requirements available in this WDD 231 workspace, not every assignment from past conversations. A new assignment's explicit instructions and rubric take priority. Review this file when planning future projects and recommend relevant practices even if Raymond does not repeat them.

- Use semantic, valid HTML with language, charset, viewport, meaningful title/description, and author.
- Keep custom CSS and JavaScript external; defer scripts; avoid frameworks, inline event handlers, and unnecessary dependencies.
- When Google Fonts are required, use a fonts.googleapis.com stylesheet link and both preconnect links (fonts.gstatic.com with crossorigin). Apply the requested families in external CSS with system fallbacks; do not use @import.
- Load normalize before other styles. Use accessible colors, keyboard focus, useful image alternatives, responsive layouts, and lowercase filenames with underscores when needed.
- Follow required filenames exactly. Keep styles, scripts, images, and JSON data in their appropriate subfolders; keep separate assignments from altering existing projects unnecessarily.
- Use async/await for asynchronous course work. Await fetch() and response.json(); render only after the data is ready.
- Check response.ok: HTTP failures do not automatically reject fetch(). Use try/catch and a user-visible failure state, not only console logging.
- Validate a response's expected structure before rendering. An object containing an array is not itself that array: pass data.prophets to a function expecting prophet records.
- Build dynamic content with createElement(), textContent, and appendChild(); use template literals for readable strings. Avoid inserting untrusted data with innerHTML.
- Use console.table() to inspect an array during development, then disable temporary logging in the finished exercise.
- Use CSS Grid auto-fit/minmax() for responsive repeated cards. Constrain images, declare dimensions, and use lazy loading when appropriate.
- Distinguish function declarations from const arrow functions: declarations are hoisted, but const functions must be initialized before they are called. Await pauses the async function, not the entire browser.
- Keep JSON strict: double-quoted keys/strings, unquoted numbers/booleans, no comments, and no trailing commas. Validate syntax and meaningful data constraints.
- Record which tests actually ran. Do not claim browser scores, public deployment, or external sharing when they have not happened.
- Treat a required chamber/ subfolder as an independent site: keep its pages, images, styles, scripts, and data inside it. Follow the new directory requirements rather than reusing an older folder layout unchanged.
- Share normalize.css, small.css, and larger.css across chamber pages; do not create page-specific CSS files. Keep the header, navigation, footer, contact details, and development information consistent.
- Drive member directories from members.json using async/await. Require at least seven records, distinct business images, website URLs, and numeric membership levels: 1 = member, 2 = silver, 3 = gold.
- Make grid/list buttons keyboard accessible with aria-pressed states. Preserve the same directory data in both views and test narrow widths as well as desktop.
- Confirm the city against the official site plan instead of assuming a fictional town meets every milestone. Fictional companies are permitted; clearly label invented records and placeholder websites.
- Distinguish local implementation from browser audits, GitHub publication, Teams sharing, and Canvas submission. Obtain any missing location choices or account access and never fabricate test results.

Sources: Raymond's supplied W01/W02 assignments and [the official W02 Fetch API activity](https://byui-cse.github.io/wdd231-ww-course/week02/prepare-fetch.html).

## Current chamber project context

Raymond confirmed the subject locality as California City, Kern County, California, United States. Continue the earlier chamber's forest-and-gold palette and fictional business records, while following the new independent chamber/ layout. Keep invented contacts, events, or statistics clearly distinguished from verified facts about the real city. The W02 directory uses locally hosted social-preview imagery, seven distinct business images, numeric membership levels, accessible grid/list controls, and shared header/navigation/footer templates. See chamber/site_plan.md and chamber/directory_review.md before continuing this project.
