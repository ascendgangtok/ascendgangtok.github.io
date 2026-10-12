/* Client-side admission application. Only public assets are fetched; no form data leaves this module. */
(() => {
  'use strict';
  let assets;
  function script(src, globalName) {
    if (window[globalName]) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const el = document.createElement('script');
      el.src = src;
      el.onload = () => window[globalName] ? resolve() : reject(new Error('PDF library unavailable'));
      el.onerror = () => { el.remove(); reject(new Error('PDF library unavailable')); };
      document.head.append(el);
    });
  }
  async function bytes(url) {
    const response = await fetch(url, {credentials: 'omit'});
    if (!response.ok) throw new Error('PDF asset unavailable');
    return response.arrayBuffer();
  }
  function loadAssets() {
    if (!assets) {
      let timer;
      assets = Promise.race([Promise.all([
        script('assets/vendor/pdf-lib/pdf-lib-1.17.1.min.js', 'PDFLib'),
        script('assets/vendor/pdf-lib/fontkit-1.1.1.min.js', 'fontkit'),
        bytes('assets/fonts/NotoSans-Regular.ttf'),
        bytes('assets/ascend-logo-header.png'),
        // Browser shaping preserves Nepali and other non-Latin field values in the PDF.
        new FontFace('Ascend PDF Devanagari', 'url(assets/fonts/NotoSansDevanagari-Regular.ttf)').load()
          .then(font => document.fonts.add(font))
      ]), new Promise((resolve, reject) => {
        timer = setTimeout(() => reject(new Error('PDF assets timed out')), 20000);
      })]).finally(() => clearTimeout(timer)).catch(error => { assets = null; throw error; });
    }
    return assets;
  }

  window.createWinterApplicationPdf = async (id, data, quote) => {
    if (!/^WC-\d{8}-\d{3,}$/.test(id) || !data || !quote || !quote.ok) throw new Error('Acknowledged application required');
    const [, , fontBytes, logoBytes] = await loadAssets();
    const {PDFDocument, StandardFonts, PageSizes, rgb} = window.PDFLib;
    const pdf = await PDFDocument.create();
    pdf.registerFontkit(window.fontkit);
    const regular = await pdf.embedFont(fontBytes, {subset: true});
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
    const logo = await pdf.embedPng(logoBytes);
    const ink = rgb(.09, .10, .12), red = rgb(.84, .07, .10), grey = rgb(.36, .38, .41);
    const [width, height] = PageSizes.A4, margin = 42, contentWidth = width - margin * 2;
    let page, y;
    const money = n => '₹' + Number(n).toLocaleString('en-IN');
    const clean = value => String(value).replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim();
    function text(value, x, top, size = 10, font = regular, color = ink) {
      page.drawText(value, {x, y: height - top - size, size, font, color});
    }
    function newPage() {
      page = pdf.addPage(PageSizes.A4);
      const scaled = logo.scaleToFit(178, 45);
      page.drawImage(logo, {x: margin, y: height - 38 - scaled.height, ...scaled});
      text('ASCEND INSTITUTE', 253, 41, 17, bold);
      text('Winter Crash Course 2026–27', 253, 66, 11);
      page.drawLine({start: {x: margin, y: height - 98}, end: {x: width - margin, y: height - 98}, thickness: 2, color: red});
      text('Admission Application', margin, 114, 21, bold);
      text('Registration ID: ' + id, margin, 145, 11, bold);
      y = 174;
    }
    function ensure(space) { if (y + space > height - 115) newPage(); }
    function section(title) {
      ensure(52);
      text(title, margin, y, 11, bold, red);
      y += 22;
    }
    // Wrap by measured width, including long words. Never truncate submitted values.
    function wrap(value, measure, maxWidth) {
      const lines = []; let line = '';
      const parts = clean(value).split(/(\s+)/);
      for (const part of parts) {
        if (measure(line + part) <= maxWidth) { line += part; continue; }
        if (line.trim()) { lines.push(line.trim()); line = ''; }
        if (measure(part) <= maxWidth) { line = part.trimStart(); continue; }
        const chars = window.Intl && Intl.Segmenter
          ? [...new Intl.Segmenter(undefined, {granularity: 'grapheme'}).segment(part)].map(x => x.segment) : [...part];
        for (const char of chars) {
          if (line && measure(line + char) > maxWidth) { lines.push(line); line = ''; }
          line += char;
        }
      }
      if (line.trim()) lines.push(line.trim());
      return lines.length ? lines : ['Not supplied'];
    }
    async function field(label, value) {
      const size = 10.5, lineHeight = 15, x = margin + 168, maxWidth = contentWidth - 168;
      const normalized = clean(value || 'Not supplied');
      // Latin text stays searchable. Browser canvas handles shaping for other scripts.
      const shaped = /[^\u0020-\u024f\u2000-\u206f\u20b9]/.test(normalized);
      let ctx, canvas;
      if (shaped) {
        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        ctx.font = `${size}px "Ascend PDF Devanagari", Arial, sans-serif`;
      }
      const lines = wrap(normalized, line => shaped ? ctx.measureText(line).width : regular.widthOfTextAtSize(line, size), maxWidth);
      ensure(lines.length * lineHeight + 10);
      text(label, margin, y, 9.5, bold, grey);
      for (const line of lines) {
        ensure(lineHeight + 10);
        if (shaped) {
          canvas.width = Math.ceil(maxWidth * 3); canvas.height = Math.ceil(lineHeight * 3);
          ctx.scale(3, 3); ctx.font = `${size}px "Ascend PDF Devanagari", Arial, sans-serif`;
          ctx.fillStyle = '#17191f'; ctx.textBaseline = 'top'; ctx.fillText(line, 0, 0);
          const image = await pdf.embedPng(canvas.toDataURL('image/png'));
          page.drawImage(image, {x, y: height - y - lineHeight, width: canvas.width / 3, height: canvas.height / 3});
        } else text(line, x, y, size);
        y += lineHeight;
      }
      y += 9;
    }
    newPage();
    section('Student and parent / guardian');
    await field('Student full name', data.studentName);
    await field('School name', data.schoolName);
    await field('Class and board', `Class ${data.className} · ${data.board}`);
    await field('Parent / guardian full name', data.guardianName);
    await field('Parent / guardian WhatsApp', data.phone);
    await field('Student WhatsApp', data.studentPhone);
    await field('Residential address', data.address);
    section('Course and subjects');
    await field('Selected course', quote.label);
    const subjects = quote.subjects.concat(quote.computer ? ['Computer'] : []);
    await field('Selected subjects', subjects.length ? subjects.join(', ')
      : `${quote.subjectCount} ${quote.subjectCount === 1 ? 'subject' : 'subjects'}`);
    if (WINTER_COURSES[data.course].countOnly && data.preferredSubjects) await field('Preferred subjects', data.preferredSubjects);
    // Keep the fee breakdown and submission status together on long applications.
    ensure(22 + (quote.computer && quote.packageFee > 0 ? 8 : 6) * 24 + 68);
    section('Fees');
    await field('Package fee (total course fee)', money(quote.courseFee));
    if (quote.computer && quote.packageFee > 0) {
      await field('Core subject package', money(quote.packageFee));
      await field('Computer (separate fee)', money(quote.computerFee));
    }
    await field('Registration fee', money(quote.registrationFee));
    await field('Adjustable seat-booking advance', money(quote.seatAdvance));
    await field('Total initial payment required', money(quote.initialPayment));
    await field('Remaining course fee', money(quote.remainingCourseFee));
    ensure(68);
    text('Registration status: Submitted, awaiting payment verification.', margin, y, 10);
    text('This application is not a payment receipt or confirmed admission certificate.', margin, y + 21, 9);
    text('Seat confirmation follows manual payment verification by Ascend Institute.', margin, y + 37, 9);
    const pages = pdf.getPages();
    pages.forEach((p, index) => {
      page = p;
      page.drawLine({start: {x: margin, y: 94}, end: {x: width - margin, y: 94}, thickness: .5, color: grey});
      text('Ascend Institute · Tejpal Pradhan Building, Near Indian Post Office', margin, height - 83, 8.5);
      text('Daragoan, Tadong, Gangtok, Sikkim 737102', margin, height - 69, 8.5);
      text('Call / WhatsApp: 77978 98999 / 70769 42996 · ascendgangtok.com', margin, height - 55, 8.5);
      text(`Page ${index + 1} of ${pages.length}`, width - margin - 52, height - 36, 8, regular, grey);
    });
    pdf.setTitle('Ascend Institute - Admission Application');
    pdf.setAuthor('Ascend Institute');
    return new Blob([await pdf.save()], {type: 'application/pdf'});
  };
})();
