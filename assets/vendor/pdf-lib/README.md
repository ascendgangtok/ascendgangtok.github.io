Locally hosted admission PDF dependencies
========================================

Loaded only after an acknowledged registration. No external PDF service,
CDN request or student information is used to load these public assets.

- pdf-lib 1.17.1 (MIT): https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js
  SHA-256: 0f9a5cad07941f0826586c94e089d89b918c46e5c17cf2d5a3c6f666e3bc694f
  License: pdf-lib-LICENSE.md
- @pdf-lib/fontkit 1.1.1 (MIT): https://unpkg.com/@pdf-lib/fontkit@1.1.1/dist/fontkit.umd.min.js
  SHA-256: d8df561b9fba98e24f2e5130e40948809281bbbc55a20c412359f1a0a5eb35a6
  License and upstream attribution: fontkit-LICENSE.txt
- Noto Sans Regular (SIL Open Font License 1.1):
  https://github.com/notofonts/noto-fonts/blob/main/hinted/ttf/NotoSans/NotoSans-Regular.ttf
  Stored in assets/fonts/NotoSans-Regular.ttf
  SHA-256: b85c38ecea8a7cfb39c24e395a4007474fa5a4fc864f6ee33309eb4948d232d5
- Noto Sans Devanagari Regular (SIL Open Font License 1.1):
  https://github.com/notofonts/noto-fonts/blob/main/hinted/ttf/NotoSansDevanagari/NotoSansDevanagari-Regular.ttf
  Stored in assets/fonts/NotoSansDevanagari-Regular.ttf
  SHA-256: 385e78e6359a9d88a0f243d53b1209d7548361ba2194e2b9ec779bcaa7e8949d
  Font license: assets/fonts/NotoSans-LICENSE.txt (covers both fonts).

Latin field values and fees use embedded, searchable Noto Sans text.
Non-Latin field values are shaped by the browser and embedded as images at
three times the PDF point resolution; Devanagari uses the locally hosted
font, while other scripts use browser system fonts. All pages use A4 with
repeated registration ID, logo and contact details. Long fields wrap and
continue on additional pages. The fee breakdown stays together.

Keep these versioned distributions unchanged. Completed application PDFs
and personal details must never be added to this directory or repository.
