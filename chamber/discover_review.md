# W05 Discover page review

The Discover page promotes California City and nearby Kern County day trips while preserving the shared chamber header, navigation, footer, typography, and palette.

## Assignment implementation

- Eight factual destinations imported from the exported JSON-formatted array in `data/attractions.mjs` using `type="module"`.
- Every generated card contains an h2, figure with a 300 × 200 WebP photograph, address, description paragraph, and Learn more button.
- Small (up to 640px): vertically stacked card areas. Medium (641–1024px): photo on the left, text on the right, full-width action. Large (1025px and above): two gallery columns with a different internal layout placing the title across both areas and action beside the photograph.
- Last-visit timestamp stored using Date.now() and localStorage; exact first-visit, under-one-day, singular-day, and plural-day messages. Invalid/future timestamps reset to the welcome message. Unavailable storage does not prevent rendering.
- Mouse hover image effect applies only above 640px with a fine pointer; motion transitions respect reduced-motion settings.
- All eight buttons open a labeled native dialog with visitor details and an official destination link. Escape closes it and focus returns to the triggering button.
- Census population is explicitly labeled 2020; nearby destinations and the illustrative tortoise species photograph are disclosed.

## Sources

- [California City Central Park](https://www.californiacity-ca.gov/CC/component/dpcalendar/location/1)
- [Desert Tortoise Preserve Committee](https://tortoise-tracks.org/dtrna/overview/)
- [Red Rock Canyon State Park](https://www.parks.ca.gov/?page_id=631) and [address brochure](https://www.parks.ca.gov/pages/631/files/RED%20ROCK%20CANYON%20STATE%20PARK%20brochure.pdf)
- [Mojave Air & Space Port](https://www.mojaveairport.com/) and [visitor event information](https://mojavemuseum.org/plane-crazy-saturday/)
- [Maturango Museum](https://maturango.org/) and [address](https://maturango.org/events/)
- [Tomo-Kahni State Historic Park](https://www.parks.ca.gov/?page_id=610)
- [Tehachapi Loop visitor information](https://www.visittehachapi.com/attractions/12) and [California historical landmark](https://ohp.parks.ca.gov/ListedResources/Detail/508)
- [César E. Chávez National Monument](https://www.nps.gov/cech/) and [visitor address](https://www.nps.gov/cech/planyourvisit/directions.htm)
- [U.S. Census Bureau population](https://www.census.gov/quickfacts/californiacitycitycalifornia)

## Image credits

See [photographers, original images, and licenses](images/discover/credits.md). All eight photographs are cropped and resized to 300 × 200 WebP. CC BY-SA derivatives retain the listed licenses. The tortoise photograph illustrates the species rather than documenting a sighting at the reserve.

## Browser verification (October 2, 2026)

Chrome checks passed at widths 320, 640, 641, 768, 1024, 1025, and 1440 pixels with no horizontal overflow. Verified all eight images, first/return/one-day/five-day messages, blocked-storage fallback, all eight dialogs, Escape and focus restoration, and mobile navigation. No JavaScript runtime errors occurred. Screenshots at 320, 768, and 1440 were saved and mobile/desktop layouts visually reviewed.

All local links on Home, Directory, Discover, Join, and Thank You returned successful responses. Fresh browser contexts with cache disabled measured full cold transfers including external resources: Home 346,666 bytes; Directory 282,423; Discover 311,651; Join 199,671; Thank You 195,091. All are below 500,000 bytes. See reports/discover-browser-checks.json.

Lighthouse mobile and desktop reports each scored **100 Accessibility, 100 Best Practices, and 100 SEO**. Rendered color contrast passed Lighthouse's WCAG check. Reports: [mobile](reports/discover-lighthouse-mobile.report.html) and [desktop](reports/discover-lighthouse-desktop.report.html). Initial simultaneous audits encountered a transient local resource connection failure; separate final runs resolved it and showed no console errors. These reports apply to Discover; older reports do not establish fresh Lighthouse scores for other chamber pages.

External W3C HTML upload was blocked by automatic approval review; approval was requested. No external HTML validation result is claimed unless a later report is recorded.

## Submission steps

Publication target: https://raymondangel.github.io/wdd231/chamber/discover.html

Official assignment audit: https://byui-cse.github.io/wdd-audits/wdd231-w05-chamber-discover.html

Submit the verified GitHub Pages Discover URL in Canvas, share it in the course group's channel, and review peers' pages. Course-account actions require the student's signed-in account.
