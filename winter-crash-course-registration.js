/*
  Winter Crash Course 2026–27 online admission form.
  Fees come from winter-course-fees.js (the same rules the backend uses).
  The registration is saved by a separate Google Apps Script web app; see
  README.md, "Winter Crash Course online admission".
*/
(() => {
  'use strict';
  // Paste the Apps Script web app URL (ending in /exec) here after deployment.
  const WINTER_REGISTRATION_URL = 'https://script.google.com/macros/s/AKfycbxtiIFqP9RSHsYjhwXU6QXeTz2rdW1DfPfxBpXQ-BjwlkQ5Upr2JYOgF-N5X4dpgBoF/exec';

  const UPI_ID = 'ascendgangtok@axl';
  const PAYEE = 'Mani K Chettri';
  const STATUS = {submitted: 'Registration Submitted', pending: 'Payment Pending Verification', confirmed: 'Seat Booking Confirmed'};
  const STORE_KEY = 'ascend-wc-registration';
  const local = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  // Test hook, honoured only in local preview: lets automated tests point the form at a simulated backend.
  const test = local && window.__WC_TEST__ ? window.__WC_TEST__ : null;
  const endpoint = test ? test.url : WINTER_REGISTRATION_URL;
  const TIMEOUT_MS = test && test.timeoutMs ? test.timeoutMs : 30000;
  const configured = /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(endpoint);

  if (location.protocol === 'http:' && !local) {
    location.replace('https://' + location.host + location.pathname + location.search);
    return;
  }

  const $ = id => document.getElementById(id);
  const form = $('wcrForm'), fields = $('wcrFields'), submit = $('wcrSubmit'), errorBox = $('wcrError');
  const classEl = $('className'), boardEl = $('board');
  const money = n => '₹' + Number(n).toLocaleString('en-IN');
  const startedAt = Date.now();
  let submissionKey = '', pending = false, saved = null;

  if (!configured) $('wcrNotConfigured').hidden = false;

  // ---------- Course and subject selection ----------
  const boardsFor = {'10': ['CBSE', 'ICSE'], '12': ['CBSE']};
  const coursesFor = cls => Object.keys(WINTER_COURSES).filter(k => WINTER_COURSES[k].className === cls && WINTER_COURSES[k].board === boardEl.value);

  function option(type, name, value, label, sub, fee) {
    const wrap = document.createElement('label');
    wrap.className = 'wcr-option';
    const input = document.createElement('input');
    input.type = type; input.name = name; input.value = value;
    const text = document.createElement('span');
    text.textContent = label;
    if (sub) { const s = document.createElement('small'); s.textContent = sub; text.append(s); }
    wrap.append(input, text);
    if (fee) { const f = document.createElement('span'); f.className = 'fee'; f.textContent = fee; wrap.append(f); }
    return wrap;
  }

  function updateBoards() {
    const boards = boardsFor[classEl.value] || [];
    boardEl.replaceChildren();
    if (!boards.length) {
      boardEl.append(new Option('Select class first', ''));
      boardEl.disabled = true;
    } else {
      if (boards.length > 1) boardEl.append(new Option('Select board', ''));
      boards.forEach(b => boardEl.append(new Option(b, b)));
      boardEl.disabled = false;
    }
    updateCourses();
  }

  function updateCourses() {
    const keys = classEl.value && boardEl.value ? coursesFor(classEl.value) : [];
    const box = $('courseOptions');
    box.replaceChildren();
    keys.forEach(k => {
      const c = WINTER_COURSES[k];
      const short = c.label.replace(/^(CBSE|ICSE) Class \d+:?\s*/, '') || 'Subject packages';
      const sub = k === 'cbse10-complete' ? 'For students whose syllabus is incomplete or who need detailed teaching. Minimum two subjects.'
        : k === 'cbse10-exam' ? 'For students who have completed or nearly completed the syllabus.'
        : k === 'icse10' ? 'Mathematics, Physics, Chemistry, Biology and Computer'
        : c.subjects.join(', ') + '. Minimum two subjects.';
      box.append(option('radio', 'course', k, short, sub));
    });
    if (keys.length === 1) box.querySelector('input').checked = true;
    box.querySelectorAll('input').forEach(i => { i.required = true; i.addEventListener('change', updateSubjects); });
    $('courseWrap').hidden = !keys.length;
    updateSubjects();
  }

  const selectedCourse = () => { const r = form.querySelector('input[name="course"]:checked'); return r ? r.value : ''; };

  function updateSubjects() {
    const key = selectedCourse(), c = WINTER_COURSES[key];
    const box = $('subjectOptions');
    box.replaceChildren();
    $('subjectMsg').textContent = '';
    $('subjectWrap').hidden = !c;
    $('preferredWrap').hidden = !(c && c.countOnly);
    if (c && c.countOnly) {
      $('subjectLegend').firstChild.textContent = 'Number of subjects ';
      Object.keys(c.fees).forEach(n => box.append(option('radio', 'subjectCount', n, n + (n === '1' ? ' subject' : ' subjects'), '', money(c.fees[n]))));
      $('subjectHint').textContent = 'Fee for the complete two-month course.';
    } else if (c) {
      $('subjectLegend').firstChild.textContent = 'Subjects ';
      c.subjects.forEach(s => box.append(option('checkbox', 'subjects', s, s)));
      if (c.computerFee) box.append(option('checkbox', 'computer', 'yes', 'Computer', 'Separate fee. Can be taken alone or added', money(c.computerFee)));
      const fees = Object.keys(c.fees).map(n => n + ' subjects ' + money(c.fees[n])).join(' · ');
      $('subjectHint').textContent = (c.computerFee ? 'Mathematics, Physics, Chemistry and Biology: at least two. ' : 'Select at least two. ') + fees + '.';
    }
    box.querySelectorAll('input').forEach(i => i.addEventListener('change', updateFee));
    updateFee();
  }

  function selection() {
    const course = selectedCourse(), c = WINTER_COURSES[course];
    if (!c) return {course};
    if (c.countOnly) {
      const r = form.querySelector('input[name="subjectCount"]:checked');
      return {course, subjectCount: r ? Number(r.value) : 0};
    }
    const sel = {course, subjects: [...form.querySelectorAll('input[name="subjects"]:checked')].map(i => i.value)};
    if (c.computerFee) sel.computer = !!form.querySelector('input[name="computer"]:checked');
    return sel;
  }

  function anySubjectChosen(sel) {
    return sel.subjectCount || (sel.subjects && sel.subjects.length) || sel.computer;
  }

  function updateFee() {
    const sel = selection();
    const q = winterCourseQuote(sel);
    $('feeEmpty').hidden = q.ok;
    $('feeDetails').hidden = !q.ok;
    $('subjectMsg').textContent = !q.ok && WINTER_COURSES[sel.course] && anySubjectChosen(sel) ? q.error : '';
    if (!q.ok) return q;
    const subjectsText = q.subjects.length ? q.subjects.concat(q.computer ? ['Computer'] : []).join(', ')
      : q.computer ? 'Computer' : q.subjectCount + (q.subjectCount === 1 ? ' subject' : ' subjects');
    $('feeCourse').textContent = q.label + ': ' + subjectsText;
    const split = q.computer && q.packageFee > 0;
    $('feeCoreRow').hidden = !split;
    $('feeComputerRow').hidden = !split;
    $('feeCoreLabel').textContent = q.subjectCount + ' core subjects';
    $('feeCore').textContent = money(q.packageFee);
    $('feeComputer').textContent = money(q.computerFee);
    $('feeCourseFee').textContent = money(q.courseFee);
    $('feeRemaining').textContent = money(q.remainingCourseFee);
    $('feeRemainingNote').textContent = money(q.courseFee) + ' course fee less the ' + money(q.seatAdvance) +
      ' advance. Together with the separate ' + money(q.registrationFee) + ' registration fee, the total is ' +
      money(q.courseFee + q.registrationFee) + ', before any approved concession.';
    return q;
  }

  classEl.addEventListener('change', updateBoards);
  boardEl.addEventListener('change', updateCourses);

  // ---------- Validation ----------
  function normalisePhone(value) {
    let d = String(value).replace(/[\s-]/g, '');
    if (/^\+?91\d{10}$/.test(d)) d = d.replace(/^\+?91/, '');
    else if (/^0\d{10}$/.test(d)) d = d.slice(1);
    return /^[6-9]\d{9}$/.test(d) ? d : '';
  }
  function checkPhone(el, required) {
    const v = el.value.trim();
    el.setCustomValidity((v || required) && !normalisePhone(v) ? 'Please enter a valid 10-digit Indian mobile number.' : '');
  }
  $('phone').addEventListener('input', () => checkPhone($('phone'), true));
  $('altPhone').addEventListener('input', () => checkPhone($('altPhone'), false));

  // ---------- Submission ----------
  function uuid() {
    if (crypto.randomUUID) return crypto.randomUUID();
    const b = crypto.getRandomValues(new Uint8Array(16));
    b[6] = (b[6] & 15) | 64; b[8] = (b[8] & 63) | 128;
    const h = [...b].map(x => x.toString(16).padStart(2, '0')).join('');
    return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
  }

  function showError(html) {
    errorBox.className = 'wcr-alert error';
    errorBox.innerHTML = html;
    errorBox.scrollIntoView({behavior: 'smooth', block: 'nearest'});
  }
  function clearError() { errorBox.className = ''; errorBox.textContent = ''; }

  const CONTACT = 'call or WhatsApp <a href="tel:+917797898999"><b>77978 98999</b></a>';
  const FIELD_NAMES = {studentName: 'student name', guardianName: 'parent / guardian name', schoolName: 'school name',
    phone: 'WhatsApp number', altPhone: 'alternate contact number', email: 'email', locality: 'locality',
    preferredSubjects: 'preferred subjects', academicNote: 'academic requirement', declaration: 'declaration',
    className: 'class', board: 'board', course: 'course and subjects'};
  function messageFor(code, field) {
    switch (code) {
      case 'invalid_field': return `Please check the ${FIELD_NAMES[field] || 'details entered'} and submit again.`;
      case 'invalid_selection': return 'That course and subject combination is not available. Please check your selection.';
      case 'fee_mismatch':
      case 'fees_changed': return 'The fee details on this page are out of date. Please reload the page and submit again.';
      case 'duplicate': return `A registration for this student, WhatsApp number and course has already been received. Please do not pay again. To make a change, ${CONTACT}.`;
      case 'rate_limited': return `We cannot accept more registrations from this number today. Please ${CONTACT}.`;
      case 'busy': return 'The registration service is busy. Please wait a minute and press Submit Registration again. You will not be registered twice.';
      case 'network': return 'We could not reach the registration service. Please check your internet connection and press Submit Registration again. You will not be registered twice.';
      case 'timeout': return 'The registration service did not reply in time, so we cannot tell whether your registration was saved. Please press Submit Registration again: if it was saved, you will see the same registration ID. <b>Please do not pay until you see a registration ID.</b>';
      case 'rejected': return `We could not accept this submission. Please ${CONTACT} to register.`;
      default: return `We could not confirm that your registration was saved. <b>Please do not pay yet.</b> Press Submit Registration again, or ${CONTACT}.`;
    }
  }

  async function post(payload) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(endpoint, {
        method: 'POST', body: JSON.stringify(payload), signal: ctrl.signal,
        headers: {'Content-Type': 'text/plain;charset=utf-8'}, credentials: 'omit', cache: 'no-store', redirect: 'follow'
      });
      if (!res.ok) return {error: 'server_error'};
      try { return await res.json(); } catch (e) { return {error: 'bad_response'}; }
    } catch (e) {
      return {error: ctrl.signal.aborted ? 'timeout' : 'network'};
    } finally {
      clearTimeout(timer);
    }
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (pending || saved) return;
    clearError();
    checkPhone($('phone'), true);
    checkPhone($('altPhone'), false);
    if (!form.reportValidity()) return;
    const sel = selection();
    const q = updateFee();
    if (!q.ok) {
      $('subjectMsg').textContent = WINTER_COURSES[sel.course] ? q.error : '';
      showError('Please complete the course and subject selection.');
      ($('subjectWrap').hidden ? $('courseWrap') : $('subjectWrap')).scrollIntoView({behavior: 'smooth', block: 'center'});
      return;
    }
    if (!configured) {
      showError(`Online registration is not available yet. Please ${CONTACT} to register.`);
      return;
    }
    const v = id => $(id).value.trim();
    submissionKey = submissionKey || uuid();
    const payload = {
      action: 'register', submissionKey, website: $('wcrWebsite').value, elapsedMs: Date.now() - startedAt,
      feesVersion: WINTER_FEES_VERSION, studentName: v('studentName'), guardianName: v('guardianName'),
      phone: normalisePhone(v('phone')), altPhone: v('altPhone') ? normalisePhone(v('altPhone')) : '',
      email: v('email'), locality: v('locality'), schoolName: v('schoolName'),
      className: classEl.value, board: boardEl.value, course: sel.course,
      preferredSubjects: WINTER_COURSES[sel.course].countOnly ? v('preferredSubjects') : '',
      academicNote: v('academicNote'), bplEnquiry: $('bplEnquiry').checked, declaration: $('declaration').checked,
      quotedCourseFee: q.courseFee, quotedInitialPayment: q.initialPayment
    };
    if ('subjectCount' in sel) payload.subjectCount = sel.subjectCount;
    if ('subjects' in sel) payload.subjects = sel.subjects;
    if ('computer' in sel) payload.computer = sel.computer;

    pending = true;
    submit.disabled = true;
    submit.textContent = 'Saving your registration…';
    const reply = await post(payload);
    pending = false;
    submit.disabled = false;
    submit.textContent = 'Submit Registration';

    const valid = reply && reply.ok === true && reply.submissionKey === submissionKey &&
      /^WC-\d{8}-\d{3,}$/.test(String(reply.id || '')) && reply.courseFee === q.courseFee &&
      reply.initialPayment === WINTER_INITIAL_PAYMENT && reply.remainingCourseFee === q.remainingCourseFee &&
      Object.values(STATUS).includes(reply.status);
    if (!valid) {
      showError(messageFor(reply && reply.ok === false ? reply.error : (reply && reply.error) || 'bad_response', reply && reply.field));
      return;
    }
    saved = {id: reply.id, key: submissionKey, status: reply.status, label: $('feeCourse').textContent,
      courseFee: q.courseFee, remaining: q.remainingCourseFee};
    try { sessionStorage.setItem(STORE_KEY, JSON.stringify(saved)); } catch (err) { /* storage unavailable */ }
    showResult(true);
  });

  // A changed form is a new submission; an unchanged retry reuses the key so it is never saved twice.
  ['input', 'change'].forEach(t => form.addEventListener(t, () => { if (!pending) submissionKey = ''; }));

  // ---------- After the registration is saved ----------
  function showResult(scroll) {
    fields.disabled = true;
    form.hidden = true;
    $('wcrNotConfigured').hidden = true;
    $('wcrId').textContent = saved.id;
    $('wcrResCourse').textContent = saved.label;
    $('wcrResCourseFee').textContent = money(saved.courseFee);
    $('wcrResRemaining').textContent = money(saved.remaining);
    setStatus(saved.status);
    const upi = 'upi://pay?' + new URLSearchParams({pa: UPI_ID, pn: PAYEE, am: WINTER_INITIAL_PAYMENT.toFixed(2), cu: 'INR', tn: 'Ascend ' + saved.id}).toString();
    try {
      qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
      const code = qrcode(0, 'M');
      code.addData(upi, 'Byte');
      code.make();
      $('wcrQr').innerHTML = code.createSvgTag({cellSize: 6, margin: 16, scalable: true});
    } catch (err) {
      $('wcrQr').textContent = 'QR code unavailable. Please pay using the UPI ID below.';
    }
    $('wcrWhatsApp').target = '_blank'; $('wcrWhatsApp').rel = 'noopener';
    $('wcrWhatsApp').href = 'https://wa.me/917797898999?text=' + encodeURIComponent(
      `Hello Ascend Institute, my Winter Crash Course registration ID is ${saved.id}. I have paid ₹2,500. Payment screenshot attached.`);
    $('wcrResult').hidden = false;
    if (scroll) { $('wcrResult').scrollIntoView({behavior: 'smooth', block: 'start'}); $('wcrResult').focus({preventScroll: true}); }
  }

  function setStatus(status) {
    $('wcrStatus').textContent = status;
    if (saved) { saved.status = status; try { sessionStorage.setItem(STORE_KEY, JSON.stringify(saved)); } catch (err) { /* ignore */ } }
  }

  $('wcrCopyUpi').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(UPI_ID); $('wcrCopyMsg').textContent = 'UPI ID copied.'; }
    catch (err) { $('wcrCopyMsg').textContent = 'Please copy the UPI ID shown above: ' + UPI_ID; }
  });

  $('wcrNew').addEventListener('click', () => {
    try { sessionStorage.removeItem(STORE_KEY); } catch (err) { /* ignore */ }
    location.href = location.pathname;
  });

  // Restore the payment step if the page is reloaded in the same tab.
  try {
    const stored = JSON.parse(sessionStorage.getItem(STORE_KEY) || 'null');
    if (stored && /^WC-\d{8}-\d{3,}$/.test(stored.id)) { saved = stored; showResult(false); }
  } catch (err) { /* ignore */ }

  updateBoards();
})();
