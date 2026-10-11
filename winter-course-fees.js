/*
  ASCEND INSTITUTE: WINTER CRASH COURSE 2026–27 FEE RULES
  -------------------------------------------------------
  The single source of the course packages and fees, taken from the final
  Winter Crash Course 2026–27 brochure. All course fees are for the
  complete two-month course.

  This file is used by winter-crash-course-registration.html, and an
  unchanged copy is pasted into the Winter Course Apps Script project
  (as WinterCourseFees.gs), so the backend recalculates every fee itself
  before a registration is accepted.

  If a fee or rule changes: edit this file, change WINTER_FEES_VERSION,
  and paste the new copy into the Apps Script project. Registrations are
  refused while the website and the backend have different versions.
*/
var WINTER_FEES_VERSION = '2026-10-10';
var WINTER_REGISTRATION_FEE = 500;   // Separate. Not adjusted against the course fee.
var WINTER_SEAT_ADVANCE = 2000;      // Adjusted against the course fee.
var WINTER_INITIAL_PAYMENT = WINTER_REGISTRATION_FEE + WINTER_SEAT_ADVANCE;

var WINTER_COURSES = {
  // CBSE Class 10: the brochure gives packages by number of subjects only.
  'cbse10-complete': {className: '10', board: 'CBSE', label: 'CBSE Class 10: Complete Syllabus Support',
    countOnly: true, fees: {2: 14000, 3: 17000, 4: 22000}},
  'cbse10-exam': {className: '10', board: 'CBSE', label: 'CBSE Class 10: Exam-Focused Board Practice',
    countOnly: true, fees: {1: 8000, 2: 13000, 3: 18000}},
  // ICSE Class 10: at least two core subjects. Computer has a separate fee and
  // can be taken alone or added to a core package.
  'icse10': {className: '10', board: 'ICSE', label: 'ICSE Class 10',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
    fees: {2: 13000, 3: 18000, 4: 23000}, computerFee: 8000},
  'cbse12-science': {className: '12', board: 'CBSE', label: 'CBSE Class 12: Science',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    fees: {2: 14000, 3: 20000, 4: 25000}},
  'cbse12-humanities': {className: '12', board: 'CBSE', label: 'CBSE Class 12: Humanities / Arts',
    subjects: ['History', 'Economics', 'Political Science', 'Geography'],
    fees: {2: 11000, 3: 16000, 4: 20000}}
};

/*
  winterCourseQuote({course, subjectCount, subjects, computer})
  Returns {ok: true, ...fees} for a valid selection, or {ok: false, error}.
  - CBSE Class 10 courses: subjectCount only (subjects must be empty).
  - Other courses: subjects is the list of chosen subjects.
  - computer is true only to add ICSE Computer.
*/
function winterCourseQuote(sel) {
  var has = function (o, k) { return Object.prototype.hasOwnProperty.call(o, k); };
  var c = sel && typeof sel.course === 'string' && has(WINTER_COURSES, sel.course) ? WINTER_COURSES[sel.course] : null;
  if (!c) return {ok: false, error: 'Please select a course.'};
  var computer = sel.computer === true;
  if (sel.computer !== undefined && typeof sel.computer !== 'boolean') return {ok: false, error: 'Invalid selection.'};
  var subjects = [], count = 0, packageFee = 0, computerFee = 0;
  if (c.countOnly) {
    count = Number(sel.subjectCount);
    if (computer || (sel.subjects && sel.subjects.length)) return {ok: false, error: 'Invalid selection.'};
    if (!Number.isInteger(count) || !has(c.fees, count)) return {ok: false, error: 'Please select the number of subjects.'};
    packageFee = c.fees[count];
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
    } else {
      return {ok: false, error: c.computerFee
        ? 'Please select at least two of ' + c.subjects.join(', ') + ', or choose Computer on its own.'
        : 'Please select at least two subjects.'};
    }
    computerFee = computer ? c.computerFee : 0;
  }
  var courseFee = packageFee + computerFee;
  return {
    ok: true, course: sel.course, label: c.label, className: c.className, board: c.board,
    subjects: subjects, subjectCount: count, computer: computer,
    packageFee: packageFee, computerFee: computerFee, courseFee: courseFee,
    registrationFee: WINTER_REGISTRATION_FEE, seatAdvance: WINTER_SEAT_ADVANCE,
    initialPayment: WINTER_INITIAL_PAYMENT, remainingCourseFee: courseFee - WINTER_SEAT_ADVANCE,
    feesVersion: WINTER_FEES_VERSION
  };
}
