# Week One Chamber of Commerce

Start with [the home page](week_one_chamber_home.html).

## File organization

- Root: `week_one_chamber_home.html`, `week_one_chamber_discover.html`, `week_one_chamber_directory.html`, `week_one_chamber_join.html`, and `week_one_chamber_thank_you.html`.
- `styles/week_one_chamber.css`: shared responsive styling.
- `scripts/week_one_chamber.js`: navigation, directory, weather, visit message, and application preview.
- `scripts/week_one_chamber_members.js`: seven fictional member records.
- `images/week_one_chamber_harbor.jpg`, `images/week_one_chamber_cafe.jpg`, and `images/week_one_chamber_market.jpg`: local photographs.
- The existing `scripts/hw2.js` and `styles/normalize.css` are preserved.

All new filenames are lowercase and use underscores between words. Pages are intentionally named for the week-one chamber assignment rather than replacing an unrelated `index.html`.

## Project content

California City is a real city in Kern County, California, United States. The discover page uses sourced history and community facts. Events, chamber membership counts, business listings, contact details, and annual membership prices remain demonstration content, not verified local information. Businesses have reserved fictional phone numbers and the chamber uses a reserved `.example` email domain. The photos depict other places and are labeled illustrative.

The supplied assignment is an overall project description, not a detailed week-one grading rubric. This implementation covers every page and feature in that supplied description. Additional weekly rubric requirements, if assigned separately, may need later adjustments.

## Features

- **Home:** prominent community introduction, membership calls to action, recurring fictional events, daily rotating silver/gold spotlights, and current California City weather with a three-day forecast.
- **Discover:** sourced community history and geographic facts (not invented current demographics), a photographic montage, recurring community events, and an optional browser-local return-visit message.
- **Directory:** seven members, text search, category and membership filters, accessible grid/list controls, empty-state reset, and modal member profiles.
- **Join:** non-profit, silver, and gold levels; expandable perks; a labeled, browser-validated application form; membership-selection links; and a confirmation preview.
- **Shared:** consistent navigation, semantic landmarks, responsive media queries, a skip link, visible keyboard focus, mobile menu, year, last-modified date, and fiction/demo notices.

## Using the project

Open `week_one_chamber_home.html` in a modern browser. The HTML, local styles, member data, navigation, and directory do not require a build tool. A local web server or static host is recommended for reliable browser-tab storage and API access.

No frameworks or third-party runtime libraries are required. JavaScript is loaded with `defer` after the shared member data script. The normalize stylesheet is first, followed by the project stylesheet.

## Weather

Live weather requests California City, California (35.1258, -117.9859). It is a model forecast, not a claim about a local weather station. The request uses Fahrenheit, Pacific time, current temperature/humidity/weather code, and three daily high/low forecasts. Weather is fetched only on the home page, with a ten-second timeout, an honest unavailable message, and a retry button. No invented weather readings are shown on failure.

- [Open-Meteo forecast API documentation](https://open-meteo.com/en/docs)
- [Open-Meteo](https://open-meteo.com/) provides the weather data.

## Application privacy and limitations

This is a **static educational demo**, not a backend membership system. Use fictional test contact information. No real applications, payments, registrations, or email messages are submitted.

A successful demo form stores only its preview fields in this tab's `sessionStorage` and opens the confirmation page. Personal contact details are never appended to the URL or sent to an external service. The confirmation page has a clear-preview button. Browsers that block storage display an explanation rather than reporting a false success. The submit button stays disabled without JavaScript.

Browser `localStorage` is used only for the directory display preference and a discover-page visit timestamp. These optional features fail gracefully if storage is blocked.

## Image credits and license

Downloaded local JPEGs are compressed/resized from Unsplash and used under the [Unsplash License](https://unsplash.com/license). Images are illustrative from other locations, not photographs of California City.

- **Harbor:** [Gabriele Merlino — Coastal town with harbor and boats on a sunny day](https://unsplash.com/photos/coastal-town-with-harbor-and-boats-on-a-sunny-day-HDwQ4-c4BLk), photographed in Castellammare del Golfo, Italy.
- **Café:** [Adhitya Sibikumar — Interior of a modern cafe with a long counter](https://unsplash.com/photos/interior-of-a-modern-cafe-with-a-long-counter-vePzWEyYmdk).
- **Market:** [Moise M — A group of people at a farmers market](https://unsplash.com/photos/a-group-of-people-at-a-farmers-market-BGTmyYRQQO4), photographed in Montréal, Canada.

## Verification

See [the requirement-by-requirement review](week_one_chamber_review.md) for the latest debugging results, corrected issues, and outstanding publication/validation requirements.

Local checks verified five HTML pages, every local asset/reference, unique IDs, one primary heading per page, image alternative text, ARIA target references, metadata, and normalize-first stylesheet ordering. Twenty-one isolated JavaScript tests covered navigation, directory filters and reset, grid/list state, member profiles, escaped dynamic content, application previews and clearing, blocked storage, weather-code mappings, three-day forecasts, and unavailable-weather handling. The actual public weather endpoint also responded successfully. These are source/behavior checks, not a full W3C validation or rendered-browser accessibility audit.

## Local delivery

The project is delivered locally in the requested WDD 231 root and subfolders. No public deployment or changes to your Git repository settings were performed. For a static host, use `week_one_chamber_home.html` as the entry URL. Public hosting, a custom domain, and a real membership backend are separate steps.

## Updated locality

All chamber pages and member datasets now use California City, Kern County, California, United States. The fictional community pantry is renamed California City Community Pantry. Existing fictional business brands and street names are retained, with desert-appropriate descriptions. Office contact details remain fictional; the real city's postal code is 93505.

Location/history sources: [Kern LAFCo](https://www.kernlafco.org/city-of-california-city) and [City of California City](https://www.californiacity-ca.gov/). The newer directory assignment is in [chamber/directory.html](chamber/directory.html).
