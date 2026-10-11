Teacher photos for faculty.html. Each photo is a square 240 x 240 JPEG
named after the teacher (e.g. panjo-lepcha.jpg), cropped so the face is
centred, and kept small (about 10-15 KB) so the page loads quickly.

To add a photo, replace the placeholder image in that teacher's card:
  <img class="teacher-photo" src="assets/faculty/placeholder-male.svg" alt="" ...>
with
  <img class="teacher-photo" src="assets/faculty/teacher-name.jpg"
       alt="Teacher name" width="240" height="240" loading="lazy" decoding="async">

Teachers without a photo use placeholder-male.svg or placeholder-female.svg.

Only add a photo once the teacher has agreed to it being published.
Never copy CVs or other private documents into this folder.
