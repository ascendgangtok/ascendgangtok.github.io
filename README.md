# Ascend Institute — Multi-page Website

This edition keeps the approved red/black/white visual style but separates the content into real pages.

## Pages
- `index.html` — concise homepage
- `about.html` — institute overview and academic approach
- `courses.html` — course categories and enquiry links
- `notes.html` — study notes hub (browse by class/subject)
- `quizzes.html` — 14 class-wise interactive quizzes
- `question-papers.html` — 14 printable practice papers and a combined PDF
- `notes-cbse10-maths.html` — CBSE Class 10 Maths chapter list
- `notes-cbse10-maths-real-numbers.html` — Real Numbers chapter notes, with PDF download
- `home-tuition.html` — detailed page for the finest service
- `faculty.html` — faculty profiles, rendered automatically from `faculty-data.js`
- `results.html` — verified results/testimonial placeholders
- `contact.html` — contact cards, map and WhatsApp enquiry form

## Publishing
Publish all public files and the `assets` folder together at the root of the existing `ascendgangtok/ascendgangtok.github.io` GitHub Pages repository. The current public URL is `https://ascendgangtok.github.io/`. The custom domain `ascendgangtok.com` is not configured in GitHub Pages and does not currently resolve, so canonical URLs, sharing metadata, `robots.txt`, and `sitemap.xml` use the working Pages URL. Update those URLs and add `CNAME` only after DNS and Pages custom-domain configuration are ready.

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
Added a Study Notes section with all 14 CBSE Class 10 Mathematics
chapters and all 13 CBSE Class 10 Science chapters. The content and
assessment scope were reviewed for the 2026–27 CBSE curriculum and
corresponding NCERT textbook reprints.

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
- To add a new class or subject, copy an existing subject index and
  chapter page as templates, write the new content inside
  `.notes-article`, regenerate its PDFs, and add the new destination to
  `notes.html`, the shared navigation and `sitemap.xml`.

## 2026-09-01 update: academic review and Quizzes
- Rechecked the Class 10 Mathematics and Science materials against the
  2026–27 CBSE scope and NCERT reprints, corrected factual/formula issues,
  and removed year-end Mathematics topics that are outside the current
  scope.
- Clearly labelled Science content that CBSE assigns only to
  formative/internal assessment.
- Added `quizzes.html` as a class-wise quiz hub. It intentionally contains
  no sample questions until the supplied quiz sets have been reviewed.
- Updated responsive navigation and chapter-list actions for the added
  Quizzes link and smaller screens.

## 2026-09-01 update: quiz and practice-paper libraries
- Replaced the Quizzes placeholder with 14 supplied interactive quizzes,
  grouped by board, class, subject and chapter. Every quiz contains 25
  questions, instant scoring and a complete answer review.
- Added `question-papers.html`, with 14 supplied 20-mark, 40–45-minute PDF
  papers arranged in the same board/class/subject/chapter structure.
- Added a combined 28-page PDF containing all 14 practice papers.
- Stored the resources in predictable, lowercase paths under
  `assets/quizzes/` and `assets/question-papers/`, so further classes and
  chapters can be added without changing the page structure.
- Added a return link to every standalone quiz, and added Practice Papers
  to the shared navigation, footer and sitemap.

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

## Tuition fee payment page

- `payment.html` is the standalone tuition-fee payment page intended to be shared directly with parents.
- Public URL after publishing: `https://ascendgangtok.github.io/payment.html`
- Optional prefill: `payment.html?name=Student%20Name&amount=9000`
- The page prepares a UPI payment to `ascendgangtok@axl` (Mani K Chettri, State Bank of India).
- The QR option is hidden until selected.
- The page is marked `noindex,nofollow` and is intentionally not added to the public sitemap.
- A direct UPI-app request may be declined by an individual UPI app's security checks; the QR option remains available as the fallback.
- This static page does not automatically verify or record successful payments. Verify receipt in the linked bank/UPI account.


## Home Tuition registration on GitHub Pages

- `home-tuition-registration.html` calculates an estimated monthly fee and prepares the completed registration request as a WhatsApp message to Ascend Institute. The parent must open WhatsApp and tap Send. The site does not save the form or generate a registration reference.
- Ascend Institute confirms the registration and fee with the parent before payment. The registration page links to `payment.html` for use after confirmation.
- `payment.html` prepares a UPI payment or displays the payment QR. Payment receipt must be verified by the institute; the static site cannot verify it.
- The earlier PHP registration endpoint was removed from the public package because GitHub Pages cannot execute it. The earlier registration package is retained in the local source archive outside this public repository.

## Student service links

The public footer includes a discreet **Student Services** section with:

- `home-tuition-registration.html` — Home Tuition registration request via WhatsApp
- `payment.html` — standalone tuition-fee payment page

These links are intentionally kept out of the main navigation. The registration and payment pages remain marked `noindex` so they are available to families without being treated as normal public landing pages by search engines. `noindex` does not make them private; anyone with the URL can open them.
