/*
  ASCEND INSTITUTE: STUDENT AND PARENT REVIEWS
  --------------------------------------------
  This is the ONLY file you need to edit to add, update or remove a
  review shown on the website. The homepage, the Results & Testimonials
  page and the Winter Crash Course page all read from this list.

  Source: reviews posted on our Google Maps listing "Ascend Coaching,
  Gangtok" (screenshots supplied by the institute, October 2026).
  Copy the wording exactly as the reviewer wrote it, including spelling
  and punctuation. Do not edit, polish or combine reviews.

  For each review:
    name     - Reviewer name exactly as shown on Google
    rating   - Star rating the reviewer gave (1 to 5)
    text     - Full review text, copied exactly
    complete - true only when the full text is known. Truncated reviews
               ("More" not expanded) must stay false and are never shown.
    show     - Where the review appears:
                 "home"    homepage and Results & Testimonials page
                 "results" Results & Testimonials page only
                 ""        kept for reference, not displayed
    winter   - a number to show it on the Winter Crash Course page, in that
               order (1 first). Leave it out to keep it off that page.
               Only Rakha Rai's review is about winter coaching; the others
               describe Ascend in general, so they carry no context note.
    context  - optional short note shown above the review saying what it is
               about (for example "About winter coaching"). Never use it to
               suggest something the reviewer did not say.
    permission - "pending" until the reviewer has agreed to their review
               being shown on this website, then "granted".

  PERMISSION: Google's guidance is that reviews belong to the people who
  wrote them, and a business must get the reviewer's consent before
  using a review on its own website. You can ask by replying to the
  review on Google. On ascendgangtok.com only reviews marked
  permission:"granted" are shown. In local preview every complete
  review is shown so the layout can be checked; permission status is
  never displayed on the page (it stays in this file). If no review on a
  page has permission, the homepage section is hidden and the Results
  and Winter pages show a link to our reviews on Google instead.
*/
const googleListingUrl = "https://maps.app.goo.gl/xoUGktQBaNF6AnrW9";
const reviewsData = [
  { name:"Rakha Rai", rating:5, complete:true, permission:"pending", show:"home", winter:1, context:"About winter coaching",
    text:"Winter coaching for PCB was really helpful. Concepts in Physics, Chemistry, and Biology were explained clearly, and doubts were handled patiently. It made my basics stronger and boosted my confidence. Grateful for the guidance" },
  { name:"Rochna Sharma", rating:5, complete:true, permission:"pending", show:"home", winter:3,
    text:"I study here. I found this institute good for coaching. Teachers are really good and experienced. I am glad to be its part." },
  { name:"Eunish Pradhan", rating:5, complete:true, permission:"pending", show:"home", winter:2,
    text:"Good center for every classes. Got improved in physics and chemistry effectively." },
  { name:"Sanchali Sanju", rating:5, complete:true, permission:"pending", show:"home", winter:4,
    text:"Me and my friend, Rochna do our tuition classes here. Good location and infrastructure is really good. Teachers are supportive here." },
  { name:"Eden Lepcha", rating:5, complete:true, permission:"pending", show:"results",
    text:"I had a great experience here. The teachers are also very good, nice and helpful.I enjoyed studying here a lot." },
  { name:"Nikhil Kumar", rating:5, complete:true, permission:"pending", show:"results",
    text:"The explanation is well structured,and explanations are clear and easy to understand.Thank you for teaching us I am satisfied with your teaching skills ❤️❤️🙏" },
  { name:"Abhinov Gurung", rating:5, complete:true, permission:"pending", show:"results",
    text:"Very professional and supportive throughout the sessions." },
  { name:"Akash Kumar Singh", rating:5, complete:true, permission:"pending", show:"results",
    text:"Very good Coaching centre and satisfied with the best teachers skills and the teachers are also very nice to students." },
  { name:"Reema Lamichaney", rating:5, complete:true, permission:"pending", show:"results",
    text:"According to my experience it is very nice !!And way of teaching skills is also good!!" },
  { name:"Saiswarupa Rout", rating:5, complete:true, permission:"pending", show:"results",
    text:"This is the apex of education, the teachers are very good and understanding. Please provide your child with the best education with Ascend" },
  { name:"Tshering ongmu Sherpa", rating:5, complete:true, permission:"pending", show:"results",
    text:"It was a very nice coaching and the teachers are very cool" },
  { name:"Shanvi Rai", rating:5, complete:true, permission:"pending", show:"results",
    text:"nice coaching will come here for boards" },
  // Kept for reference, not displayed:
  // Same wording as Akash Kumar Singh's review, so only one copy is shown.
  { name:"Anjishnu Sarkar", rating:5, complete:true, permission:"pending", show:"",
    text:"Very good Coaching centre and satisfied with the best teachers skills and the teachers are also very nice to students." },
  { name:"Passang Ongmu Lepcha", rating:5, complete:true, permission:"pending", show:"",
    text:"Best coaching centre in Gangtok 🙏👍" },
  // Truncated in the screenshot. Do not show unless the full text is confirmed.
  { name:"Punol Lepcha", rating:5, complete:false, permission:"pending", show:"",
    text:"I prefer this coaching to every class 10 students for the winter course here it is an excellent coaching teachers are friendly too..." },
  { name:"Aryan Gurung", rating:5, complete:false, permission:"pending", show:"",
    text:"Very good experience\n\nAkshat is not attentive and Melvin.\n\nTeachers are very friendly." }
];
