# W01 Course Home Page

Open [index.html](index.html). This is a separate course-home project, not the chamber website. The only shared assets are the existing folder structure and normalize stylesheet.

## Files

- `index.html`: default repository home, with About Me, Student Photo, and Web Certificate Courses.
- `favicon.ico`: W02 single 16 × 16 course favicon in the repository root; referenced by both course pages. See week_two_favicon_review.md for checks and pending browser preview.
- `course_home_final.html`: explicitly labeled future-final-project navigation placeholder.
- `styles/small.css`: custom mobile-first styling.
- `styles/larger.css`: custom media-query layouts, loaded after small.css.
- `scripts/course_home_navigation.js`: hamburger menu, Escape behavior, and desktop-breakpoint reset.
- `scripts/course_home_date.js`: dynamic copyright symbol/year and raw document.lastModified string.
- `scripts/course_home_courses.js`: official six-course certificate array, filtering with filter(), credit totals with reduce(), and completed-course rendering.
- `images/course_home_logo.svg`, `course_home_github.svg`, `course_home_linkedin.svg`, `course_home_instagram.svg`: small external SVG icon files.
- `images/course_home_personal.jpg`: optimized copy of Raymond's supplied photo, 800 × 640 pixels and 92,632 bytes. The original file is unchanged.

No frameworks, embedded JavaScript, package installation, or build system are required. The chamber HTML, CSS, JavaScript, and photographs were not modified; before/after SHA-256 checks confirmed that.

## Personal information

The page uses Raymond Amande and California, United States, as supplied by Raymond. The introduction describes only the confirmed location and current coursework; edit it if you want a more personal biography.

GitHub points to the repository already configured as this workspace's origin. LinkedIn is a generic platform link, explicitly labeled as a placeholder per Raymond's request. Instagram is also a labeled platform placeholder.

### Remaining personal setup

1. Personal photo is supplied and installed, below 125,000 bytes. The page preserves the full frame and both people without cropping.
2. Course completion is confirmed: CSE 110, CSE 111, CSE 210, WDD 130, and WDD 131 are marked completed. WDD 231 remains incomplete because Raymond is currently taking it.
3. Completed cards automatically use a distinct copper background, a checkmark, and the word Completed. Update WDD 231's completed flag after finishing it. The pending-confirmation notice has been removed.

## Requirement coverage

- Root index.html with language, charset, viewport, title, author, and description.
- SVG file logo, name inside a span, and mobile hamburger button.
- Three navigation links: Home, the existing Chamber site, and a working Final placeholder.
- Home h1 and the three section headings shown in the official example.
- One Google Fonts family, Manrope, with a system-font fallback.
- Normalize first, then the font stylesheet, small.css, and larger.css.
- Custom responsive grid content, flex desktop navigation, active-page wayfinding, stable-size hover effects, touch-size controls, skip link, and keyboard focus.
- External deferred scripts, loading only course-home behavior on the course-home pages.
- Dynamic six-course cards with All/CSE/WDD filters, data-driven completion styles, and displayed-course credit totals (12 for All; 6 for CSE; 6 for WDD).
- Footer social icons and two paragraphs containing the dynamic copyright/year and document modification string.
- Every image referenced by this separate project is below 125 kB. The personal JPEG is 92,632 bytes; SVGs are under 1 kB each.

## Validation completed

See [the 30-point rubric review](course_home_rubric_review.md) for criterion-by-criterion evidence and remaining browser/submission requirements. The Google font request loads only 400 and 700 weights. Updated referenced local resources total 122,656 bytes; including the previously measured font stylesheet and fonts gives 312,992 bytes, below 500 kB. Actual browser initial transferred bytes remain unverified.

- Twenty-two isolated JavaScript tests passed for filtering, credits, completion styles, changing data, empty selection, dates, navigation, Escape focus, and breakpoint resets.
- Local HTML checks passed for balanced structure, metadata, local links, image limits, headings, unique IDs, ARIA references, external deferred scripts, exact three home sections, and stylesheet order.
- Local CSS checks passed for balanced braces, media queries in larger.css, and horizontal desktop flex navigation.
- The local Python preview served index.html with HTTP 200.
- No connected browser was available. A rendered mobile/desktop audit, DevTools runtime/contrast review, and incognito Lighthouse audits were **not performed**; no Lighthouse scores are claimed.

## Before submission

1. Complete the personal setup above.
2. Open the page using VS Code Live Server and test at 320px, 700px, 1200px, and larger widths; confirm no horizontal scrolling.
3. Check the browser console and DevTools CSS Overview.
4. Run mobile and desktop Lighthouse in a private/incognito browser and address issues until Accessibility, Best Practices, and SEO reach at least 95.
5. Commit and push only after reviewing the changes. No commit, push, remote change, public deployment, or Canvas submission was performed here.
6. Confirm GitHub Pages is enabled and run the course audit tool against the published URL.

**Repository naming issue:** the current origin repository is named `https---github.com-RaymondAngel-wdd231`, not `wdd231`. Its default project-site path will not automatically be `/wdd231/`. To match the assignment's `https://RaymondAngel.github.io/wdd231/` pattern, confirm the intended repository name and Pages configuration before publishing. Nothing about the remote was changed.

## References and asset licenses

- [Official W01 assignment and example layouts](https://byui-cse.github.io/wdd231-ww-course/week01/assignment-01.html).
- [Official course array](https://byui-cse.github.io/wdd231-ww-course/week01/courses.js).
- [Feather Icons](https://github.com/feathericons/feather), version 4.29.2, MIT license. The downloaded code, github, linkedin, and instagram icons are unchanged. The original copyright and license notice is saved in images/course_home_icon_license.txt. These are image assets, not a CSS/JavaScript framework.
- [Manrope on Google Fonts](https://fonts.google.com/specimen/Manrope).
- Personal photo supplied by Raymond and compressed locally with permission; no generative changes were made.
- The unused earlier study image, images/course_home_study.jpg, is by [Yen Vu](https://unsplash.com/photos/desk-with-open-book-laptop-and-study-materials-HNjWq8WPyoY), under the [Unsplash License](https://unsplash.com/license).
