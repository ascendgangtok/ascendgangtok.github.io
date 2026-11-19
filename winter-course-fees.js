/*
  ASCEND COACHING INSTITUTE: WINTER CRASH COURSE 2026–27 FEE RULES
  ----------------------------------------------------------------
  The single source of the course packages and fees, taken from the
  approved Winter Crash Course 2026–27 admission brochure
  (admissions/winter-2026-27.html). All course fees are for the
  complete two-month course.

  This file is used by winter-crash-course-registration.html, and an
  unchanged copy is pasted into the Winter Course Apps Script project
  (as WinterCourseFees.gs), so the backend recalculates every fee itself
  before a registration is accepted.

  If a fee or rule changes: edit this file, change WINTER_FEES_VERSION,
  and paste the new copy into the Apps Script project. Registrations are
  refused while the website and the backend have different versions.

  November 2026: CBSE Class 10 Complete Syllabus Support 2 subjects is
  ₹13,000; Sociology added to CBSE Class 12 Humanities / Arts (packages
  remain 2, 3 or 4 subjects); optional Nepali for CBSE Class 10 (₹4,000,
  only with at least two regular subjects).
*/
var WINTER_FEES_VERSION = '2026-11-19';
var WINTER_REGISTRATION_FEE = 500;   // Separate. Not adjusted against the course fee.
var WINTER_SEAT_ADVANCE = 2000;      // Adjusted against the course fee.
var WINTER_INITIAL_PAYMENT = WINTER_REGISTRATION_FEE + WINTER_SEAT_ADVANCE;

// CBSE Class 10 optional Nepali: separate fee; only with a package of at least two
// regular subjects; held only if at least six students enrol (otherwise the Nepali fee is refunded).
var WINTER_NEPALI_FEE = 4000;
var WINTER_NEPALI_MIN_SUBJECTS = 2;

var WINTER_COURSES = {
  // CBSE Class 10: packages by number of regular subjects (Mathematics, Science,
  // Social Science (SST), English). Nepali is not part of any package.
  'cbse10-complete': {className: '10', board: 'CBSE', label: 'CBSE Class 10: Complete Syllabus Support',
    countOnly: true, fees: {2: 13000, 3: 17000, 4: 22000}, nepaliFee: WINTER_NEPALI_FEE},
  'cbse10-exam': {className: '10', board: 'CBSE', label: 'CBSE Class 10: Exam-Focused Board Practice',
    countOnly: true, fees: {1: 8000, 2: 13000, 3: 18000}, nepaliFee: WINTER_NEPALI_FEE},
  // ICSE Class 10: at least two core subjects. Computer has a separate fee and
  // can be taken alone or added to a core package.
  'icse10': {className: '10', board: 'ICSE', label: 'ICSE Class 10',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
    fees: {2: 13000, 3: 18000, 4: 23000}, computerFee: 8000},
  'cbse12-science': {className: '12', board: 'CBSE', label: 'CBSE Class 12: Science',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    fees: {2: 14000, 3: 20000, 4: 25000}},
  // Five subjects are available; packages cover two, three or four of them.
  'cbse12-humanities': {className: '12', board: 'CBSE', label: 'CBSE Class 12: Humanities / Arts',
    subjects: ['History', 'Economics', 'Political Science', 'Geography', 'Sociology'],
    fees: {2: 11000, 3: 16000, 4: 20000}}
};

/*
  winterCourseQuote({course, subjectCount, subjects, computer, nepali})
  Returns {ok: true, ...fees} for a valid selection, or {ok: false, error}.
  - CBSE Class 10 courses: subjectCount only (subjects must be empty);
    nepali is true only to add optional Nepali (needs subjectCount >= 2).
  - Other courses: subjects is the list of chosen subjects.
  - computer is true only to add ICSE Computer.
*/
function winterCourseQuote(sel) {
  var has = function (o, k) { return Object.prototype.hasOwnProperty.call(o, k); };
  var c = sel && typeof sel.course === 'string' && has(WINTER_COURSES, sel.course) ? WINTER_COURSES[sel.course] : null;
  if (!c) return {ok: false, error: 'Please select a course.'};
  var computer = sel.computer === true;
  var nepali = sel.nepali === true;
  if (sel.computer !== undefined && typeof sel.computer !== 'boolean') return {ok: false, error: 'Invalid selection.'};
  if (sel.nepali !== undefined && typeof sel.nepali !== 'boolean') return {ok: false, error: 'Invalid selection.'};
  if (nepali && !c.nepaliFee) return {ok: false, error: 'Invalid subject selection.'};
  var subjects = [], count = 0, packageFee = 0, computerFee = 0, nepaliFee = 0;
  var counts = Object.keys(c.fees).map(Number);
  var maxCount = Math.max.apply(null, counts);
  if (c.countOnly) {
    count = Number(sel.subjectCount);
    if (computer || (sel.subjects && sel.subjects.length)) return {ok: false, error: 'Invalid selection.'};
    if (!Number.isInteger(count) || !has(c.fees, count)) return {ok: false, error: 'Please select the number of subjects.'};
    if (nepali && count < WINTER_NEPALI_MIN_SUBJECTS) {
      return {ok: false, error: 'Nepali can be added only with at least two regular subjects.'};
    }
    packageFee = c.fees[count];
    nepaliFee = nepali ? c.nepaliFee : 0;
  } else {
    var chosen = sel.subjects === undefined ? [] : sel.subjects;
    if (!Array.isArray(chosen) || chosen.some(function (s) { return c.subjects.indexOf(s) === -1; }) ||
        new Set(chosen).size !== chosen.length) return {ok: false, error: 'Invalid subject selection.'};
    if (computer && !c.computerFee) return {ok: false, error: 'Invalid subject selection.'};
    subjects = c.subjects.filter(function (s) { return chosen.indexOf(s) !== -1; });
    count = subjects.length;
    if (count === 0 && computer) {
      packageFee = 0;
    } else if (has(c.fees, count)) {
      packageFee = c.fees[count];
    } else if (count > maxCount) {
      return {ok: false, error: 'Packages cover at most ' + maxCount + ' subjects. Please select two, three or four subjects.'};
    } else {
      return {ok: false, error: c.computerFee
        ? 'Please select at least two of ' + c.subjects.join(', ') + ', or choose Computer on its own.'
        : 'Please select at least two subjects.'};
    }
    computerFee = computer ? c.computerFee : 0;
  }
  var courseFee = packageFee + computerFee + nepaliFee;
  return {
    ok: true, course: sel.course, label: c.label, className: c.className, board: c.board,
    subjects: subjects, subjectCount: count, computer: computer, nepali: nepali,
    packageFee: packageFee, computerFee: computerFee, nepaliFee: nepaliFee, courseFee: courseFee,
    registrationFee: WINTER_REGISTRATION_FEE, seatAdvance: WINTER_SEAT_ADVANCE,
    initialPayment: WINTER_INITIAL_PAYMENT, remainingCourseFee: courseFee - WINTER_SEAT_ADVANCE,
    feesVersion: WINTER_FEES_VERSION
  };
}
