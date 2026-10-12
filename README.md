# Ascend Institute — Multi-page Website

This edition keeps the approved red/black/white visual style but separates the content into real pages.

## Pages
- `index.html` — concise homepage
- `about.html` — institute overview and academic approach
- `courses.html` — course categories and enquiry links
- `winter-crash-course-2026-27.html` — Winter Crash Course 2026–27 (Classes 10 and 12)
- `winter-crash-course-registration.html` — Winter Crash Course online admission and seat booking (noindex)
- `notes.html` — study notes hub (browse by class/subject)
- `quizzes.html` — 14 class-wise interactive quizzes
- `question-papers.html` — 14 printable practice papers and a combined PDF
- `notes-cbse10-maths.html` — CBSE Class 10 Maths chapter list
- `notes-cbse10-maths-real-numbers.html` — Real Numbers chapter notes, with PDF download
- `home-tuition.html` — detailed page for the finest service
- `faculty.html` — Meet Our Teachers: ten teacher profiles written directly in the page
- `results.html` — Results & Testimonials: selected Google Maps reviews; verified results to be added later
- `contact.html` — contact cards, map and WhatsApp enquiry form

## Publishing
The site is published by GitHub Pages from the `main` branch (root folder) of `ascendgangtok/ascendgangtok.github.io`. The official address is `https://ascendgangtok.com/`; the `CNAME` file holds this custom domain and must not be deleted. The old address `https://ascendgangtok.github.io/` redirects to the custom domain. Canonical URLs, sharing metadata, JSON-LD, `robots.txt` and `sitemap.xml` all use `https://ascendgangtok.com/`. DNS is managed at GoDaddy.

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

## Faculty page (updated October 2026)
The ten teacher profiles are written directly in `faculty.html`, so
search engines and visitors see them without JavaScript. The earlier
`faculty-data.js` placeholder file has been removed.

1. Each teacher is one `<article class="teacher-card">` block in
   `faculty.html`, in display order. Copy a whole block to add a teacher,
   or delete one to remove a teacher.
2. Use only confirmed details: name, faculty role, qualifications,
   research area (only for doctoral researchers) and teaching experience.
   Do not list universities or colleges.
3. Photos are in `assets/faculty/` (240 x 240 JPEG, cropped square).
   Teachers without a photo show `placeholder-male.svg` or
   `placeholder-female.svg`. See `assets/faculty/README.txt`.
4. If a teacher changes, also update the JSON-LD `employee` list in the
   `<head>` of `faculty.html` (same order), and the summary sentence on
   the homepage ("Our ten qualified and experienced teachers...").

Only publish a teacher's name and photo once their details are confirmed
and, if a photo is used, once you have their permission.

The original photos and CVs are kept in `Teachers-photos-and-CVs/`,
which is listed in `.gitignore` and must never be committed or published.

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
- Public URL: `https://ascendgangtok.com/payment.html`
- Optional prefill: `payment.html?name=Student%20Name&amount=9000`
- The page prepares a UPI payment to `ascendgangtok@axl` (Mani K Chettri, State Bank of India).
- The amount-filled QR code is shown as the primary method after the student name and amount are entered. It is generated in the browser by the locally included MIT-licensed `assets/qrcode-generator.js`, so no third-party QR service receives payment details.
- The page is marked `noindex,nofollow` and is intentionally not added to the public sitemap.
- Copying the UPI ID is the fallback; opening a UPI app directly remains optional because an individual app may decline a direct request.
- This static page does not automatically verify or record successful payments. Verify receipt in the linked bank/UPI account.


## Home Tuition registration on GitHub Pages

- `home-tuition-registration.html` calculates an estimated monthly fee and submits the registration to the institute's Google Apps Script web app, which records it and returns a registration ID (format `HT-YYYYMMDD-NNN`). The parent is then sent to `payment.html` with the student name and amount filled in.
- Ascend Institute confirms the registration and fee with the parent before payment. The registration page links to `payment.html` for use after confirmation.
- `payment.html` prepares a UPI payment or displays the payment QR. Payment receipt must be verified by the institute; the static site cannot verify it.
- The earlier PHP registration endpoint was removed from the public package because GitHub Pages cannot execute it. The earlier registration package is retained in the local source archive outside this public repository.

## Student service links

The public footer includes a discreet **Student Services** section with:

- `home-tuition-registration.html` — Home Tuition registration (recorded through Google Apps Script)
- `payment.html` — standalone tuition-fee payment page

These links are intentionally kept out of the main navigation. The registration and payment pages remain marked `noindex` so they are available to families without being treated as normal public landing pages by search engines. `noindex` does not make them private; anyone with the URL can open them.

## 2026-10 update: Winter Crash Course, reviews and custom domain
- Added `winter-crash-course-2026-27.html`, linked from the homepage, the
  Courses page, the footer of every page and `sitemap.xml`.
- The 20% early-admission concession notice appears five times (homepage,
  Courses page, twice on the Winter Crash Course page and once on the
  online admission form). Each copy sits
  between `<!-- OFFER 2026-10-31 START -->` and `<!-- OFFER 2026-10-31 END -->`
  comments, is hidden in the HTML (`hidden`) and is shown by `script.js`
  only before `data-until="2026-10-31T23:59:59+05:30"`. After that time
  the script removes it, and the notice text itself states the deadline.
- **Removal procedure (do this on 1 November 2026, do not rely on the
  script alone):** in the project folder run

  ```
  python3 - <<'EOF'
  import re,glob
  for f in glob.glob('*.html'):
      s=open(f,encoding='utf-8').read()
      t=re.sub(r'[ \t]*<!-- OFFER 2026-10-31 START.*?<!-- OFFER 2026-10-31 END -->\n','',s,flags=re.S)
      if t!=s: open(f,'w',encoding='utf-8').write(t); print('updated',f)
  EOF
  ```

  Then check that `grep -l "20%" *.html` prints nothing, preview the
  site, commit and push. To publish a new offer instead, replace the
  text between the markers and change the date in the markers and in
  `data-until`.
- After the season, update or retire the Winter Crash Course page and
  the homepage and Courses page sections.
- Added `reviews-data.js`, the single list of student reviews used by
  the homepage, `results.html` and the Winter Crash Course page. Each
  review is copied exactly from the Google Maps listing "Ascend Coaching,
  Gangtok". Instructions are at the top of that file. Google's guidance
  is that reviewers own their reviews, so get each reviewer's consent
  before showing their review. Every review starts as
  `permission:"pending"`. On ascendgangtok.com only reviews set to
  `permission:"granted"` are displayed; local previews show all reviews
  with a "permission pending" label.
- No `Review` or `AggregateRating` structured data is used. Google does
  not allow a business to mark up reviews about itself on its own site.
- Replaced all `ascendgangtok.github.io` URLs with `ascendgangtok.com`.

## Winter Crash Course online admission (October 2026)

Parents can register online, pay the ₹2,500 initial amount by UPI and
send the payment screenshot on WhatsApp, without visiting the institute.

Status (October 2026): the Apps Script web app is deployed (Version 1)
and connected in `winter-crash-course-registration.js`. A real test
registration, the duplicate check and the concession formulas were
checked on the real sheet, and the test row was then removed.

### Files
- `winter-crash-course-registration.html` and
  `winter-crash-course-registration.js`: the form (marked `noindex`, not
  in the sitemap). Linked from the Winter Crash Course page, the homepage
  and the Courses page.
- `winter-course-fees.js`: the only place the packages and fees are
  defined. The form uses it to show fees, and an unchanged copy runs in
  the Apps Script backend, which recalculates every fee before saving.
  If a fee changes, edit this file, change `WINTER_FEES_VERSION`, and
  paste the new copy into the Apps Script project. Registrations are
  refused while the two versions differ.
- Backend (kept outside this public repository, like the Home Tuition
  script): `registration_related/winter-course/Code.gs`. It is a separate
  Apps Script project with its own private Google Sheet, so Winter Course
  and Home Tuition records never mix.

### Payment rules used
- Registration fee ₹500 (separate, not adjusted) + seat-booking advance
  ₹2,000 (adjusted against the course fee) = ₹2,500 paid online.
- Remaining course fee = course fee − ₹2,000, paid later as arranged with
  the institute. The 60% instalment rule is not applied online.
- When the institute enters an approved concession % in the sheet, the
  remaining fee is recalculated and never goes below ₹0. If the reduced
  course fee is less than the ₹2,000 advance, the difference appears in
  "Excess Advance (resolve manually)" (highlighted). Nothing is refunded
  or adjusted automatically.
- Concessions are never applied by the form. The 20% early-admission
  concession and BPL concessions are decided by the institute. The sheet
  records whether the registration reached the server by 31 Oct 2026
  (server time, for reference only) and whether the parent asked about a
  BPL concession.

### How a registration works
1. The form sends the details to the Apps Script web app.
2. The backend checks every field, the class, board and subject rules and
   the fee, then saves a row and creates the registration ID
   `WC-YYYYMMDD-NNN` (India date; the daily number never repeats, even
   if a row is deleted).
3. Only after the backend confirms the save does the page show the ID,
   the ₹2,500 UPI QR code and link (UPI note: "Ascend WC-…"; no student
   name), and a button to send the payment screenshot on WhatsApp with
   the registration ID already in the message.
4. When a screenshot arrives, the institute may type the UPI reference
   in "UPI Reference Reported" and set the status to
   "Payment Pending Verification".
5. The institute checks the bank account. If ₹2,500 arrived, tick
   "Payment Verified By Institute", set the status to
   "Seat Booking Confirmed" and message the parent on WhatsApp.
   (The backend's `reportPayment` action still exists but the form no
   longer uses it.)

Statuses: Registration Submitted → Payment Pending Verification → Seat
Booking Confirmed (set by the institute only).

Duplicate protection: a retried submission (same browser, same details)
returns the same ID; the same student, WhatsApp number and course cannot
register twice; at most 3 registrations per WhatsApp number per day and
200 in total per day; a hidden honeypot field and a minimum fill time
stop simple bots. The sheet must stay private: the script refuses to
save if the sheet is shared by link.

### One-time setup (institute Google account)
1. Turn on **Enforce HTTPS** for the site in GitHub Pages settings.
2. Go to https://script.google.com, signed in to the institute account,
   and create a new project called "Ascend Winter Crash Course Admissions".
3. Replace the contents of `Code.gs` with
   `registration_related/winter-course/Code.gs`.
4. Add a script file named `WinterCourseFees` and paste the whole of
   `winter-course-fees.js` into it. In Project Settings tick "Show
   appsscript.json manifest file in editor" and replace that file with
   `registration_related/winter-course/appsscript.json`, which limits the
   script to Google Sheets plus read-only Drive access.
5. Project Settings: set the time zone to (GMT+05:30) India Standard Time.
6. In the editor choose `setupWinterAdmissionsSheet` and press Run. Allow
   the requested access (Sheets and Drive). A private sheet called
   "Ascend Winter Crash Course 2026-27 Admissions" is created in Drive.
   Share it only with named staff accounts, never "anyone with the link".
7. Deploy → New deployment → Web app. Execute as: Me. Who has access:
   Anyone. Copy the web app URL (it ends in `/exec`).
8. Paste that URL into `WINTER_REGISTRATION_URL` at the top of
   `winter-crash-course-registration.js`. Until this is done the form
   shows "Online registration is being set up" and cannot submit.
9. Make one test registration with an institute phone number, check the
   row in the sheet, then delete the test row (right-click the row
   number → Delete row). Its ID is never issued again.
10. After any later change to `Code.gs` or the fees file: Deploy → Manage
    deployments → Edit → Version: New version. The URL stays the same.

### Limitations
- The web app URL is public (it has to be, for a static site). The limits
  above reduce abuse, but there is no CAPTCHA.
- Parents cannot look up their status online: the backend never returns
  stored data. Status changes are communicated on WhatsApp.
- The payment step is kept only in the same browser tab (no personal
  details are stored in the browser). Parents should note their
  registration ID; the WhatsApp button includes it.
- UPI payment cannot be verified automatically; the institute must check
  the bank account.

## Photographs (October 2026)
- Raw photographs are kept in `assets/some-photos/` (ignored by Git, never
  published). Only resized, optimised copies are placed in `assets/`.
- Homepage hero: a three-photo collage (`class-teaching-board.jpg` with a
  760px version for phones, `class-students-attentive.jpg`,
  `class-teacher-writing.jpg`), from `3.png`, `2.png` and `1.png`, lightly
  cropped with a small contrast and colour lift; faces were not altered.
- About hero: `class-group.jpg` (from `unnamed (1).webp`).
- Courses hero: `photo-classroom.jpg` (no longer used on the homepage).
- Winter Crash Course page, "What the course includes": `class-practice.jpg`
  (from `unnamed.webp`).
- `photo-mentoring.jpg` (About page) is a mirrored selfie: its signboard
  text reads backwards. `home-tuition.jpg` (homepage and Home Tuition page)
  is a correctly oriented photo of the same group. `hero-classroom.jpg` is
  unused.
- Before publishing, confirm consent for every identifiable student
  (especially minors) and teacher in these photographs.

## Reviews display (October 2026)
- The Winter Crash Course page shows "What Our Students Say" with the
  reviews that have a `winter` number in `reviews-data.js` (Rakha Rai,
  Eunish Pradhan, Rochna Sharma, Sanchali Sanju). Only Rakha Rai's review
  is about winter coaching, and only that card says so.
- Permission status is no longer shown as a badge. It stays in
  `reviews-data.js`; the live site still shows only `permission:"granted"`
  reviews. With none granted, the Winter page shows a link to the Google
  Maps reviews instead.
- Each card says "Review on Google" with the official Google G
  (`assets/google-g.png`, downloaded from Google's Partner Marketing Hub,
  scaled only, with its built-in clear space). The stars sit at the top of
  the card, away from the logo, and no overall "Google rating" is shown,
  as Google's guidelines require.

## Temporary publication safeguards (11 October 2026)
- **Photos awaiting consent.** Optimised classroom photos showing
  identifiable students are kept in `pending-approval/` (ignored by Git,
  never published): `class-group.jpg`, `class-practice.jpg`,
  `class-students-attentive.jpg`, `class-teaching-board*.jpg` and
  `class-teacher-writing.jpg`. Faculty portraits were approved for
  publication on 12 October 2026; Khushi Gurung and Pratima Sharma use
  placeholders because no photo was supplied. Until then:
  - homepage collage: `photo-classroom.jpg` (consented),
    `class-periodic-table.jpg` and `class-whiteboard.jpg` (no faces);
  - About keeps `photo-mentoring.jpg`; Courses has a text-only header;
    the Winter page has no photo;
  To restore an approved photo, move it back from `pending-approval/assets/`
  to `assets/` and put its `<img>` back (the earlier markup is in the local
  branch `backup/3680ad8-with-photos`, which must never be pushed).
- **Home Tuition registration paused.** The live Home Tuition Apps Script
  still replies only to `ascendgangtok.github.io`, so parents on
  ascendgangtok.com never see the confirmation. The page shows a WhatsApp
  and phone fallback instead. After redeploying the existing deployment
  with `registration_related/AscendHomeTuitionRegistration.FIXED-2026-10.gs`
  (Deploy → Manage deployments → Edit → New version), remove
  `class="ht-paused"` from `<body>` in `home-tuition-registration.html`.
- **HTTPS.** The registration and payment pages switch any `http://` visit
  to `https://` before showing the form. GitHub Pages "Enforce HTTPS"
  still needs to be ticked by a repository admin.

## Reviews and consistency update (12 October 2026)
- All 16 selected Google reviews remain in `reviews-data.js`, unchanged.
  Every review is still `permission:"pending"`, so on ascendgangtok.com the
  homepage and Winter review sections stay hidden and the Results page
  shows one sentence linking to the Google Business Profile. Cards show
  the reviewer's name, star rating and original wording, with one small
  "Reviews posted ... on Google" source line below them. To publish a review, reply to it on
  Google asking the reviewer's permission; once they agree, change that
  review to `permission:"granted"` and it appears automatically.
- Faculty cards share one structure (portrait, name, role, qualifications,
  optional research line, experience label). Anjana Chettri's card lists
  qualifications and experience only.
- Ordinary body text on the main pages uses `--text-body` (16px) from the
  shared stylesheet; supporting lines use `--text-support` (15px).
- Clean URLs: GitHub Pages already serves `/faculty` etc. with the same
  page (canonical tags point to the `.html` address, so there is no
  duplicate content). Internal links keep `.html`; links to the homepage
  now point to `/` instead of `index.html`.

