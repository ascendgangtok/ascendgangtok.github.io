# Ascend Institute — Multi-page Website

This edition keeps the approved red/black/white visual style but separates the content into real pages.

## Pages
- `index.html` — concise homepage
- `about.html` — institute overview and academic approach
- `courses.html` — course categories and enquiry links
- `notes.html` — study notes hub (browse by class/subject)
- `notes-cbse10-maths.html` — CBSE Class 10 Maths chapter list
- `notes-cbse10-maths-real-numbers.html` — Real Numbers chapter notes, with PDF download
- `home-tuition.html` — detailed page for the finest service
- `faculty.html` — faculty profiles, rendered automatically from `faculty-data.js`
- `results.html` — verified results/testimonial placeholders
- `contact.html` — contact cards, map and WhatsApp enquiry form

## Publishing
Upload all files and the `assets` folder together into the public web root for `ascendgangtok.com`. Do not upload only `index.html`; the shared CSS, JavaScript, images and the other pages are required.

## Before launch
1. Add confirmed faculty details and photographs.
2. Add verified results/testimonials only with permission.
3. Confirm current subjects, fees and timings before placing them online.
4. Add the official Instagram URL if it changes.
5. Test all phone, WhatsApp, map and email links.

The enquiry form opens WhatsApp and does not send or store data on a server.

## Header alignment update
The header branding has been refined so the red “ASCEND INSTITUTE | GANGTOK” line is centered directly beneath the logo on both desktop and mobile layouts.


## Verification note
This package was rechecked for ZIP integrity, internal file references, navigation, shared CSS/JavaScript, favicon, canonical URLs, sitemap, robots.txt, contact details, WhatsApp number, mobile navigation rules, and header branding alignment. The header uses a dedicated horizontal web version of the supplied Ascend logo so the red institute line aligns correctly without distorting the logo.

## 2026-08-07 update
- Replaced the AI-generated stock photos (`hero-classroom.jpg`, `home-tuition.jpg`) with real photos of Ascend Institute (`assets/photo-classroom.jpg`, `assets/photo-mentoring.jpg`), used with confirmed student/parent consent. The old stock files are still in `assets/` but are unreferenced and can be deleted.
- Added Open Graph and Twitter Card meta tags to all 7 pages so shared WhatsApp/Instagram/Facebook links show a proper preview image and title.
- Added `width`/`height` and `loading`/`decoding` attributes to all images to reduce layout shift and defer off-screen images.
- Added three course listings to `courses.html` to match the institute's real course signage: Competitive Exams Course, Winter Crash Course, Advanced Course (all Classes VIII–XII, CBSE/ICSE/IGCSE, subjects on request).
- Added `geo` coordinates (ward-level, from OpenStreetMap) and `logo`/`image` fields to the homepage's schema.org JSON-LD for better local search/map results. Note: the business also appears on Google Maps as "Ascend Coaching" in the Tadong area — worth checking that listing matches this site if you manage it.

### Still open (needs your input, not implemented)
- Results page remains an intentional placeholder — add permitted results/testimonials when ready.
- No analytics installed yet (skipped per request) — add a GA4 Measurement ID (or a privacy-friendly alternative) later if you want to see which pages/CTAs drive WhatsApp enquiries.
- Confirm business hours if you want them added to the schema.org data.

## 2026-08-07 update: adding faculty without a backend
There is no login system and no server — that's intentional, since a
handful of teachers don't need real authentication infrastructure.
Instead, the Faculty page is generated from a single plain data file:

1. Open `faculty-data.js`. Each teacher is one `{ ... }` block with
   plain-text fields (name, role, bio, classes, board, subject, photo).
   Full instructions are in the comment at the top of that file.
2. If using a photo, drop the image file into `assets/faculty/` and
   point the `photo` field at it, e.g. `"assets/faculty/priya-sharma.jpg"`.
   Leave `photo` as `""` to show a placeholder icon instead.
3. Save, commit, and push to GitHub. The Faculty page rebuilds itself
   from that file automatically — no other file needs to change.

Only publish a teacher's name/photo once their details are confirmed
and, if a photo is used, once you have their permission — same rule
the Results page already follows for students.

## 2026-08-08 update: Study Notes section
Added a new Study Notes section, starting with CBSE Class 10
Mathematics. Real Numbers is the first complete chapter, with 13 more
listed as "coming soon" on `notes-cbse10-maths.html`.

- Each chapter is a standalone HTML page (e.g.
  `notes-cbse10-maths-real-numbers.html`), styled with new
  `.notes-article`/`.definition-box`/`.example-box` classes in
  `styles.css`.
- The "Download PDF" button links straight to a real, pre-generated
  PDF file in `assets/notes-pdf/`, not a live print dialog. This is
  more reliable across browsers/devices than relying on the visitor's
  own "Print to PDF," at the cost of a small file to keep in sync.
- **When you edit a chapter's content, regenerate its PDF.** The
  `@media print` stylesheet in `styles.css` still defines what the PDF
  looks like (hides nav, footer, WhatsApp button, CTA band, table of
  contents, the download button itself). To regenerate: open the
  chapter page in a browser, print it (Ctrl/Cmd+P), and save as PDF
  into `assets/notes-pdf/` with the matching filename. (This was
  previously automated with Playwright during development; ask if you
  want that script.)
- To add the next chapter: copy `notes-cbse10-maths-real-numbers.html`
  as a template, write the new content inside `.notes-article`,
  generate its PDF the same way, then update its row in
  `notes-cbse10-maths.html` to link to it instead of showing "Coming
  soon."

### Also fixed while building this
- Mobile nav dropdown menu had a leftover `height:100%` from the
  desktop layout, squeezing it to the header's height so only 2 of 7
  links had a background.
- Homepage trust bar (`.trust`) could overflow horizontally in the
  ~820-950px window after a font-size increase; removed the
  `white-space:nowrap` that was forcing it.
- Contact page's Google Map could overflow its grid column in the same
  width range. Classic CSS Grid issue: a percentage-based
  `grid-template-columns` doesn't reserve room for `gap` consistently
  when a replaced element (the map `<iframe>`) is inside it. Switched
  to `fr` units, which are gap-aware by spec.
- The `.reveal` scroll-fade animation (opacity 0 until scrolled into
  view) meant printing a notes page without first scrolling through it
  could produce a blank PDF. Added `.reveal{opacity:1}` to the print
  stylesheet so printed/PDF content is never dependent on JS/scroll
  state.
- The nav briefly overflowed at exactly 821px wide after "Study Notes"
  replaced the shorter "Notes" label. Tightened nav spacing at the
  1050px breakpoint to give it more room.
