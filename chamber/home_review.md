# W03 Chamber Home Page

Open [the chamber home page](index.html).

## Completed requirements

- Shared directory header, responsive navigation, footer, favicon, fonts, and styles.
- Home-specific title, description, author, and Open Graph metadata.
- Responsive local hero image in an img element and a Join the chamber link.
- Two recurring demonstration events, explicitly identified as fictional.
- Live OpenWeatherMap current temperature and description for California City, CA (35.13, -117.99).
- Three upcoming forecast dates in America/Los_Angeles time. Each shows the three-hour forecast nearest local noon in Fahrenheit, not a daily high or low.
- Three unique gold or silver member cards fetched from data/members.json with async/await. Fisher–Yates shuffling runs on every page load.
- Cards include name, logo, phone, address, website, and membership level.
- Loading states, accessible status messages, and retry buttons. Current weather and forecast can succeed independently.
- Existing future Join and Discover templates remain linked, as allowed by this milestone.

## Verification

### Rubric follow-up (September 18, 2026)

The supplied rubric requires the call to action to sit over the hero image. Updated the mobile hero so its image fills the hero behind the content, with a dark overlay for readable text. The image uses `object-fit: cover` to preserve its proportions, and the content determines the hero height so text can wrap on narrow screens. Desktop styling remains in the existing media query.

The source review confirms current events, active Home wayfinding, responsive navigation, live current-weather and three-day forecast requests, and three randomly selected unique gold/silver members from the JSON source. The saved Lighthouse and course-audit results below predate this CSS adjustment. A fresh browser, Lighthouse, CSS Overview, and total network-weight check could not be run during this follow-up because the connected browser was unavailable and outbound requests failed; do not treat the earlier reports as a new audit of this change.

Live current and forecast endpoints both returned California City data. Automated Chrome checks passed at widths 320, 390, 768, and 1440 pixels with no horizontal overflow. Checked navigation links, mobile menu and Escape key, three unique eligible spotlights, variation across 20 selections, year-boundary forecast dates, and error/retry states. No JavaScript runtime errors occurred. Desktop and mobile screenshots were visually inspected.

Lighthouse completed in an isolated incognito Chrome session: **100 Accessibility, 100 Best Practices, and 100 SEO on both mobile and desktop**, with no remaining failed audits. Reports: [mobile](reports/lighthouse_mobile.html), [desktop](reports/lighthouse_desktop.html). The audit runner encountered a Windows temporary-profile cleanup error after saving both completed reports; report generation and scores were unaffected.

The official course audit was run on the published site. File naming, required folders, metadata checks, local links, optimized images, JavaScript placement, Google Fonts, and WCAG AA contrast checks passed. W3C CSS validation reported zero errors (17 warnings); the audit also gives advisory notices about the shared stylesheet rule count. These styles serve both the home page and member directory.

The audit found a missing initial src on the hidden weather icon. This was corrected and W3C validation of the final HTML returned **zero errors**. The final published audit confirmed **zero HTML validation errors and zero CSS validation errors**, with no issue markers beyond the report legend. Advisory CSS warnings and manual content-review prompts remain. See the [full course audit](reports/course_audit.txt).

The published home page was separately verified in Chrome: live California City conditions, three forecast days, three eligible spotlights, no JavaScript runtime errors, and working links/navigation on all four chamber pages.

## Files

- index.html
- scripts/home_weather.js
- scripts/home_spotlights.js
- styles/small.css and styles/larger.css (shared styles)
- images/community_market.jpg

The supplied OpenWeatherMap key is used by client-side JavaScript and is therefore visible to visitors. No paid weather endpoints are used.

## Image credits

The hero reuses the project's licensed Unsplash photograph by [Moise M](https://unsplash.com/photos/a-group-of-people-at-a-farmers-market-BGTmyYRQQO4), under the [Unsplash License](https://unsplash.com/license). The photograph depicts Montréal, Canada, and is labeled illustrative. Member logos and social icons reuse the existing [Feather Icons license](images/icon_license.txt). See [directory notes](directory_review.md) for those asset credits.

## Submission

Expected URL: https://raymondangel.github.io/wdd231/chamber/index.html

Share the published URL in your course group, review classmates' work, and submit the URL in Canvas. These course-account actions require your signed-in course context.
