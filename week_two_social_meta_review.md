# W02 Learning Activity: Social Media Meta

## Implementation

The existing course home, `index.html`, has the four Facebook Open Graph properties requested by the assignment, written directly in its head so crawlers do not need JavaScript:

- `og:title`: Raymond Amande | WDD 231 Course Home.
- `og:description`: a relevant two-sentence summary, 138 characters, not a repeat of the title.
- `og:image`: https://RaymondAngel.github.io/wdd231/images/course_home_social.jpg.
- `og:url`: https://RaymondAngel.github.io/wdd231/index.html, matching the URL in Raymond's supplied passing course audit.

Additional supporting properties define `og:type` as `website`, `og:locale` as `en_US`, the site name, and the image format, alternative description, and dimensions. The html element declares the Open Graph namespace. The preview image uses the existing navy, gold, copper, and off-white palette, code motif, and student course-home wording.

Only the course-home metadata and supporting preview asset/documentation are changed. The body, personal photograph, stylesheets, JavaScript, favicon, and separate chamber project are unchanged. Twitter/X metadata is optional reading, not part of this activity's required Facebook implementation.

## Instruction clarification

The pasted preparation section accidentally describes `og:locale` as a canonical URL. The correct URL property is `og:url`; `og:locale` describes language and territory. This implementation follows the assignment's correct final activity list and the [Open Graph protocol](https://ogp.me/).

## Verification and publishing

Local page-source checks passed for required tags inside head, unique Open Graph properties, absolute HTTPS image/page addresses, a two-sentence description under 200 characters, and the correct locale. The actual preview image was visually reviewed for wording and checked for sufficient dimensions and aspect ratio.

No browser is connected, so the assignment's browser developer-tools source review and a real Facebook preview were not performed. No commit, push, deployment, or submission was done. The new preview image URL will not work online until both the updated index.html and the image are published to the existing GitHub Pages site.

After publishing, open the course home, use View Page Source or developer tools to confirm the Open Graph tags, and open the exact og:image address to confirm the image loads. Optionally use the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to inspect the preview and refresh a cached version.

## Preview image provenance

Created with the built-in image-generation tool, not downloaded stock imagery. Saved as `images/course_home_social.jpg`: 1,730 × 909 pixels, about 1.9:1 aspect ratio, 107,745 bytes (below the course's 125 kB image limit). The original generated PNG is unchanged; the project copy is exported as an optimized JPEG. No personal photo or university logo was used. The image is only referenced in metadata, not displayed or downloaded as a normal page-body image.

Prompt brief: Create one finished landscape course-home social card with readable Manrope-like regular/bold sans-serif typography, the site's navy #1f3240, off-white #f7f8f8, pale gray #eaf0f3, gold #f1ce82, and copper #82432b palette; code brackets with a gold slash; generous safe margins and subtle panel/grid geometry. Exact wording: “Raymond Amande”, “WDD 231 Course Home”, and “Responsive design · Accessible interfaces · JavaScript”. No invented certifications, other text, people, photography, university logo, browser chrome, or watermark.
