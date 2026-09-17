# W02 Chamber Directory — California City

## Google Fonts audit correction

The supplied course audit flagged three missing Google Fonts links. All four chamber pages and five original week-one pages now include the Google CSS2 stylesheet and both required preconnect links, with crossorigin for fonts.gstatic.com. External CSS applies Lora and Open Sans (400/700), with system fallbacks and display=swap. Normalize remains the first stylesheet; no @import is used. The Google endpoint returned HTTP 200 with both font families. Colors are unchanged because the supplied contrast audit passed. These are local corrections; rerun the published audit after uploading the updated files.

## Open the assignment

Open directory.html with VS Code Live Server. The target published address is https://RaymondAngel.github.io/wdd231/chamber/directory.html. This address has not been verified online for this new page.

## Requirement coverage

- Independent chamber/ site with directory.html and local styles/, scripts/, images/, and data/ assets; no dependency on the root course styles/scripts/images.
- California City, Kern County, California, United States, as confirmed by Raymond. Retains the original seven fictional businesses, descriptions, street names, phone numbers, and forest-and-gold design. The original week-one files are retained and updated to the same California City locality.
- Standard head metadata, Raymond Amande as author, chamber-specific 16 × 16 favicon.ico, and Facebook og:title/description/image/url. Supporting image type/dimensions/alt, locale, site name, and website type are included. Social image and page addresses are absolute HTTPS GitHub Pages URLs.
- Header/nav/footer structure follows the official site plan: chamber mark and name; Home/Discover/Directory/Join links; contact details; social icons; developer name, WDD 231, current copyright year, and automatically generated document.lastModified.
- Home, Discover, and Join have matching, working page templates, explicitly labeled for future milestones. The directory does not contain the landing-page body from the example wireframe. Earlier prototype page bodies remain in the original files for continued development.
- Stylesheet order is normalize.css, small.css, larger.css. All custom styles are shared between chamber pages, with no CSS frameworks, embedded/inline styles, or newly added !important.
- Responsive auto-fit Grid and narrow-width-safe minmax() support card layouts; list mode is a single column of member rows with zebra striping. Mobile navigation uses accessible menu state, Escape focus, and desktop-breakpoint resets.
- members.json contains a strict top-level array of seven companies with name, full fictional address, phone, HTTPS website URL, unique image filename, membership_level numbers (1 Member, 2 Silver, 3 Gold), category, and description.
- directory.js uses fetch(), async/await, response.ok, JSON parsing/validation, createElement(), and textContent to build all member cards. Keyboard-operable view buttons have aria-pressed/aria-controls states. Both views preserve the same records.
- Loading, failure/retry, and broken-image states are visible and tested. All script references are external and deferred.
- Root course pages' Chamber links now lead to chamber/directory.html; other course-home content is unchanged.

## Fictional data and social links

The businesses and contacts are invented course content, not actual local businesses. Original (805) 555 numbers are retained for continuity and clearly labeled fictional, not presented as real California City contact numbers. Demo website links use the reserved example.com site, with unique business query values. They do not impersonate genuine company websites. Social links are explicitly labeled platform placeholders; real chamber accounts were not invented. The site disclaims affiliation with an official chamber.

## Images and provenance

Seven different downloaded Feather Icons 4.29.2 represent the fictional businesses: coffee, compass, shopping-bag, pen-tool, home, heart, and briefcase. Each has a different local filename and actual SVG content. The map-pin brand mark and three social icons also come from Feather; they are unchanged downloaded code, not authored replacement SVGs. These illustration assets are appropriate for invented businesses, not claimed real company logos. The original MIT license is stored in images/icon_license.txt.

The chamber favicon is a small native pixel-art map pin in forest/white/gold, reproducible with scripts/create_favicon.ps1. Its ICO structure and 16 × 16 decoder dimensions passed checks.

The built-in image-generation tool created the original social card, exported locally as images/directory_social.jpg. It is 1,729 × 910 pixels (about 1.9:1), 105,602 bytes, below 125 kB. Text was visually reviewed. It uses the chamber palette, Georgia-like serif headings, local-directory motifs, and abstract desert forms, not invented photographs of local landmarks. The original generated PNG is unchanged. The image is only referenced in metadata, not normally downloaded as page-body content.

## Verification performed

23 isolated JavaScript checks passed for loading; local endpoint; all seven companies' information and image/link attributes; success/busy cleanup; list/grid states; rerender without duplication; broken-image fallback; HTTP/network/JSON/schema/record failures; unsafe website/image rejection; duplicate-image rejection; retry recovery; current year/modification string; opening the menu; Escape focus; and breakpoint reset.

A temporary local HTTP server served directory.html, the JSON, and 15 styles/script/favicon/image assets with HTTP 200. The server was stopped after checks. This is not an actual VS Code Live Server/browser rendering report.

Local checks passed for stylesheet order, local page/asset references, required social metadata, active-page indication, unique IDs, image byte limits, balanced CSS braces, and whitespace errors.

Ten representative text/background pairs mathematically meet WCAG AA 4.5:1: body 13.69:1; muted on paper 5.75:1; muted on white 6.01:1; forest links/selected buttons 11.64:1; footer body 14.02:1; footer links 9.93:1; gold badge 7.62:1; silver badge 8.07:1; member badge 10.18:1. This is not a full rendered DevTools CSS Overview report.

## Remaining browser, publication, and submission steps

No connected browser is available. Rendered checks at 320px and wider, browser console errors, DevTools CSS Overview, mobile/desktop Lighthouse Accessibility/Best Practices/SEO scores, and Facebook Sharing Debugger results are not yet measured. Do not treat local logic/contrast checks as those reports.

No commit, push, repository rename, public deployment, Teams/group message, peer review, or Canvas submission was performed. Review the files, publish the chamber folder plus updated course-navigation links to the wdd231 GitHub Pages repository, verify the exact page/image URLs, run the official W02 audit and incognito mobile/desktop Lighthouse, share the URL with your group and review peers, then submit the directory URL in Canvas. Any account sign-in or submission must be completed/authorized by Raymond.

No further personal or content input is required to implement this directory. Real company details and actual social accounts are optional future improvements, not required when clearly labeled fictional records are permitted.

## Lessons saved for future work

Use the latest assignment's exact folder/filename and shared-style requirements; keep project chrome consistent; validate JSON shape and membership types; require distinct local assets; distinguish content from presentation when toggling views; keep social-image URLs public and local to the project; check response.ok and provide accessible errors/retries; verify narrow widths, focus, and contrast; distinguish implementation from published audit/submission evidence. These are also recorded in ../byui_project_standards.md.

## Final social-image prompt

```text
Use case: ads-marketing
Asset type: complete landscape Facebook sharing card for a student chamber directory.
Primary request: Create one finished social preview image about 1.9:1 ratio, at least 1200x630. This is Raymond Amande's educational California City Chamber of Commerce member directory for California City, Kern County, California, United States. Preserve its forest green #163f39, dark forest #10312c, gold #e8b85b, off-white #fbfaf6 and sage #edf1e9 palette. Georgia-like serif headings and Arial-like sans-serif secondary text. Large legible typography and generous margins. A simple map pin motif and abstract seven small business cards convey a local directory; restrained, flat editorial graphic with subtle desert-inspired forms, not a photo or skyline claiming real landmarks.
Text verbatim: "California City", "Chamber of Commerce", "Member Directory", "Kern County, California".
Constraints: Exactly these words accurately spelled, no extra text, no university logo, no real chamber logo, no people or photos, no invented claims or certifications, no browser chrome, no watermark. Entire card including typography is one cohesive original image. Prefer compact JPEG if supported.
```

## References

[Official W02 assignment](https://byui-cse.github.io/wdd231-ww-course/week02/assignment-02.html), [site plan and wireframes](https://byui-cse.github.io/wdd231-ww-course/week02/chamber-site-plan.html), [project scope](https://byui-cse.github.io/wdd231-ww-course/week05/chamber-description.html), [directory examples](https://byui-cse.github.io/wdd231-ww-course/resources/chamber-directory-example.html), [official W02 audit](https://byui-cse.github.io/wdd-audits/wdd231-w02-chamber-directory.html), and [Feather Icons](https://github.com/feathericons/feather).
