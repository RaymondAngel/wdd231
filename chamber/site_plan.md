# California City Chamber directory site plan

## Confirmed location and continuity

Raymond confirmed California City, Kern County, California, United States. The chamber now uses that real locality while retaining the earlier project's seven fictional businesses, descriptions, phone numbers, and forest-and-gold palette. The original week-one prototype files now reflect the same California City locality. Invented business addresses and chamber contact details are clearly disclosed as fictional; the student site is not an official chamber website.

## Purpose and audience

Help local residents, visitors, and business owners discover chamber members and connect with local services. Scenarios include finding a business phone number, comparing membership levels, and switching between a visual directory and a compact contact list.

## Shared design

Retain the existing chamber forest #163f39, forest-dark #10312c, gold #e8b85b, paper #fbfaf6, sage #edf1e9, ink #202d29, and muted #596660 palette. Use Google Fonts Lora for headings and branding and Open Sans for body text, with Georgia and Arial/Helvetica fallbacks. Include both Google preconnect links and the CSS2 API stylesheet with display=swap on every chamber page. Normalize loads first, followed by fonts, small.css, and larger.css. No @import, frameworks, or page-specific CSS files.

Site navigation follows the project scope: Home, Discover, Directory, Join. Shared chrome includes a chamber mark/name, responsive navigation with active-page indication, contact details, social links, and Raymond Amande / WDD 231 / dynamic year and last-modified development information. Future page body work belongs to its later milestone, not this directory assignment.

## Directory and data

The independent chamber folder contains styles/, scripts/, images/, and data/. Its members.json is a top-level array with seven fictional companies, including names, addresses, phone numbers, HTTPS website URLs, seven distinct local SVG image filenames, numeric membership levels 1/2/3, categories, and descriptions.

Illustrative member icons come from Feather Icons 4.29.2 under MIT; originals are downloaded rather than authored SVGs. The original license is stored in images/icon_license.txt. Demo websites use example.com rather than impersonating actual companies. Required contact data must be disclosed as fictional on the final page.

The directory script uses await fetch(), response.ok, await response.json(), record validation, and textContent-based rendering. Grid/list controls maintain aria-pressed and change presentation without changing the records. Loading, error/retry, and broken-image states are provided. The shared script handles responsive menu state, Escape focus, year, and last modification.

## Completion status

Implemented: independent folders; directory.html; shared page chrome and styles; common navigation/footer behavior; JSON loading and view controls; seven complete records with California City locality; distinct business images; favicon; locally hosted social-preview asset and static metadata; reusable lesson notes.

Discover and Join are clearly labeled future-milestone page templates with the same header/footer/navigation. The Home page is completed for W03. Their earlier prototype content remains in the original root files, updated to California City with sourced community history and clearly labeled demonstration content; it is not copied into the directory body. Full migration/development of those page bodies belongs to their later milestones.

W03 home-page browser tests, Lighthouse reports, and publication are complete. The final HTML has zero W3C errors. See home_review.md for current evidence and directory_review.md for the earlier directory review. Course group sharing and Canvas submission require the course-account context.

## References

[W02 directory assignment](https://byui-cse.github.io/wdd231-ww-course/week02/assignment-02.html), [official site plan](https://byui-cse.github.io/wdd231-ww-course/week02/chamber-site-plan.html), [directory examples](https://byui-cse.github.io/wdd231-ww-course/resources/chamber-directory-example.html), and [Feather Icons](https://github.com/feathericons/feather).

## W03 home page update

The home page is now implemented with a responsive market hero, membership CTA, sample events, live OpenWeatherMap current conditions and three future near-noon forecasts, and three randomly selected gold/silver member spotlights. Shared styles and chrome remain consistent with the directory. Join and Discover remain future milestone templates. See home_review.md for implementation and verification evidence.
