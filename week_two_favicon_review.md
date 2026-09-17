# W02 Learning Activity: Favicon

- `favicon.ico` is in the WDD 231 repository root: one 16 × 16, 32-bit icon (1,150 bytes).
- The white code brackets and gold slash on navy match the course site's code logo and palette.
- `index.html` and `course_home_final.html` reference it within their head using `<link rel="icon" href="favicon.ico">`.
- The separate chamber project is unchanged.
- `scripts/create_favicon.ps1` reproduces the icon locally without dependencies.

The required favicon.cc generator could not be used: no connected browser was available, and the website fetch timed out. The icon was instead created locally. This does not certify completion of the assignment's favicon.cc workflow or browser-preview steps.

File structure, single-image count, dimensions, decoder compatibility, and page references were checked locally. Browser-tab appearance remains unverified. Open the course home with Live Server, confirm the tab icon, and hard-refresh if an old icon is cached. If the instructor requires use of favicon.cc itself, import the local ICO there, inspect its preview, download the result to replace the root favicon.ico, and retest.
