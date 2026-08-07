# Ascend Institute — Multi-page Website

This edition keeps the approved red/black/white visual style but separates the content into real pages.

## Pages
- `index.html` — concise homepage
- `about.html` — institute overview and academic approach
- `courses.html` — course categories and enquiry links
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
