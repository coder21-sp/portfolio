# Subham Panigrahi — Portfolio

Static, CV-based portfolio with home, contact, and thank-you pages. No build or package installation is required.

## Local development

Run `python3 -m http.server 5501` from this directory. Run `node --check app.js` for JavaScript syntax validation.

The site includes local SVG technology icons and a downloadable résumé. Theme preferences are saved when browser storage is available, and animations honor reduced-motion preferences.

## Hosting

GitHub Pages is configured to publish the `master` branch from the repository root. Pushes request a Pages rebuild; confirm completion in GitHub Actions. Serve this directory as the static site root, including under a GitHub Pages repository path such as `/portfolio/`. The contact form posts to `https://formspree.io/f/xoedvddk`; no server or secret is required in the website. JavaScript redirects to the relative `thank-you.html` page only after Formspree accepts a submission. Errors keep entered values and allow retrying. Without JavaScript, the native form submits to Formspree and uses its response page.

Verify the recipient email and form activation in the Formspree dashboard, and test email delivery after deployment. Formspree plan limits apply.

## Validation

Browser smoke checks cover all three pages at 360, 390, 768, and 1440 pixels in light and dark mode; theme persistence, mobile navigation, local image loading, required form fields, reduced motion, page errors, and horizontal overflow. Form delivery requires a configured hosting service and was not tested locally.

## Visual identity

The custom SP monogram is drawn with SVG paths and reused in navigation and footer. `assets/sp-monogram.svg` is the standalone artwork; `assets/favicon.svg` uses the same paths on a charcoal background for small browser-tab sizes. Both themes use neutral surfaces with a sage accent and flat 1px card borders.
