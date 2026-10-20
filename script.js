/* ============================================================
   EMAILJS CONFIG — fill these in from your emailjs.com account:
     PUBLIC_KEY  -> Account -> API Keys
     SERVICE_ID  -> Email Services -> Service ID
     TEMPLATE_ID -> Email Templates -> Template ID
   Until filled in, the contact form will show a friendly error
   instead of crashing the page.
============================================================ */
const EMAILJS_PUBLIC_KEY  = 'CI5FEcqhXBl8Cq3L8';
const EMAILJS_SERVICE_ID  = 'service_sds9caq';
const EMAILJS_TEMPLATE_ID = 'template_0gsldwt';
const TO_EMAIL = 'rohithmurugan08062006@gmail.com';  // change to your real email

document.addEventListener('DOMContentLoaded', () => {

  /* 1. INIT EMAILJS */
  if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  /* 2. LOADER */
  const loaderFill = document.getElementById('loader-fill');
  let pct = 0;
  const tick = setInterval(() => {
    pct += Math.random() * 18;
    if (pct >= 100) {
      pct = 100;
      clearInterval(tick);
      loaderFill.style.width = '100%';
      setTimeout(() => document.body.classList.add('loaded'), 450);
    }
    loaderFill.style.width = pct + '%';
  }, 80);

  /* 3. CUSTOM CURSOR (desktop only) */
  const isTouchDevice = window.matchMedia('(hover:none)').matches;
  if (!isTouchDevice) {
    const cur = document.getElementById('cursor');
    const fol = document.getElementById('cursor-follower');
    let mx = 0, my = 0, fx = 0, fy = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cur.style.left = mx + 'px';
      cur.style.top  = my + 'px';
    });
    (function animFol() {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      fol.style.left = fx + 'px';
      fol.style.top  = fy + 'px';
      requestAnimationFrame(animFol);
    })();

    document.querySelectorAll('a,button,.cert-card,.project-card,.sport-card,.filter-btn,.tech-tag').forEach(el => {
      el.addEventListener('mouseenter', () => { cur.classList.add('hover'); fol.classList.add('hover'); });
      el.addEventListener('mouseleave', () => { cur.classList.remove('hover'); fol.classList.remove('hover'); });
    });
  }

  /* 4. NAVBAR: scroll style + active link */
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 80);

    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });

    document.getElementById('back-to-top').classList.toggle('visible', window.scrollY > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 5. HAMBURGER MENU */
  const hamburger    = document.getElementById('hamburger');
  const navLinksList = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    navLinksList.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });
  navLinksList.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksList.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* 6. TYPED TEXT */
  const typedEl = document.getElementById('typed');
  const words   = ['Full Stack Developer','UI/UX Enthusiast','Problem Solver','Open Source Contributor','Tech Explorer'];
  let wi = 0, ci = 0, deleting = false, delay = 80;

  function type() {
    const word = words[wi];
    typedEl.textContent = deleting ? word.slice(0, ci - 1) : word.slice(0, ci + 1);
    deleting ? ci-- : ci++;

    if (!deleting && ci === word.length) { deleting = true; delay = 2200; }
    else if (deleting && ci === 0)       { deleting = false; wi = (wi + 1) % words.length; delay = 400; }
    else delay = deleting ? 45 : 80 + Math.random() * 40;

    setTimeout(type, delay);
  }
  setTimeout(type, 2000);

  /* 7. SCROLL REVEAL */
  const ro = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      const d = parseFloat(getComputedStyle(target).getPropertyValue('--delay')) || 0;
      setTimeout(() => target.classList.add('visible'), d * 1000);
      ro.unobserve(target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right').forEach(el => ro.observe(el));

  /* 8. SKILL BARS */
  const so = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      target.style.width = target.dataset.width + '%';
      so.unobserve(target);
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-bar-fill').forEach(el => so.observe(el));

  /* 9. PROJECT FILTER */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;

      projectCards.forEach(card => {
        const show = f === 'all' || card.dataset.cat === f;
        card.classList.toggle('hidden', !show);
        if (show) {
          card.style.animation = 'none';
          void card.offsetWidth;
          card.style.animation = 'filterReveal .4s ease forwards';
        }
      });
    });
  });

  /* 10. RESUME DOWNLOAD */
  const resumeBtn = document.getElementById('resume-btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', e => {
      if (location.protocol.startsWith('http')) {
        fetch('resume.pdf', { method: 'HEAD' })
          .then(res => {
            if (!res.ok) {
              e.preventDefault();
              showToast('resume.pdf not found - place your PDF in the same folder as index.html', 'warn');
            }
          })
          .catch(() => {});
      }
    });
  }

  /* 11. CONTACT FORM WITH EMAILJS */

const form      = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const btnText   = submitBtn.querySelector('.btn-text');
const btnLoad   = submitBtn.querySelector('.btn-loading');
const successEl = document.getElementById('form-success');
const errorEl   = document.getElementById('form-error-msg');


/* -------------------------------
   FORM VALIDATION
-------------------------------- */

const validators = {
  fname: v =>
    v.trim().length >= 2
      ? ''
      : 'Please enter your full name.',

  femail: v =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
      ? ''
      : 'Please enter a valid email.',

  fsubject: v =>
    v.trim().length >= 3
      ? ''
      : 'Please enter a subject.',

  fmessage: v =>
    v.trim().length >= 10
      ? ''
      : 'Message must be at least 10 characters.'
};


function validateField(id) {

  const input = document.getElementById(id);
  const errEl = document.getElementById('err-' + id);

  if (!input || !errEl) return true;

  const msg = validators[id](input.value);

  errEl.textContent = msg;

  input.style.borderColor = msg ? '#e08a7d' : '';

  return !msg;
}


/* Validate when leaving each field */

Object.keys(validators).forEach(id => {

  const el = document.getElementById(id);

  if (el) {
    el.addEventListener('blur', () => {
      validateField(id);
    });
  }

});


/* -------------------------------
   FORM SUBMIT
-------------------------------- */

form.addEventListener('submit', async e => {

  e.preventDefault();


  /* Validate all fields */

  const valid = Object.keys(validators)
    .map(validateField)
    .every(Boolean);

  if (!valid) return;


  /* Show loading */

  btnText.hidden = true;
  btnLoad.hidden = false;

  submitBtn.disabled = true;

  successEl.hidden = true;
  errorEl.hidden = true;


  /* -------------------------------
     GET FORM DATA
  -------------------------------- */

  const fromName =
    document.getElementById('fname').value.trim();

  const fromEmail =
    document.getElementById('femail').value.trim();

  const subject =
    document.getElementById('fsubject').value.trim();

  const message =
    document.getElementById('fmessage').value.trim();


  /* -------------------------------
     EMAILJS TEMPLATE DATA
  -------------------------------- */

  const templateParams = {

    from_name: fromName,

    from_email: fromEmail,

    subject: subject,

    message: message,

    to_email: TO_EMAIL,

    reply_to: fromEmail

  };


  try {

    /* Check EmailJS */

    if (typeof emailjs === 'undefined') {

      throw new Error(
        'EmailJS not loaded. Check your EmailJS script tag.'
      );

    }


    /* Check configuration */

    if (
      EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY' ||
      EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' ||
      EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID'
    ) {

      throw new Error(
        'EmailJS is not configured correctly.'
      );

    }


    /* Send email */

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );


    /* -------------------------------
       SUCCESS
    -------------------------------- */

    btnText.hidden = false;
    btnLoad.hidden = true;

    submitBtn.disabled = false;

    successEl.hidden = false;
    successEl.style.display = 'flex';

    form.reset();


    /* Clear validation */

    Object.keys(validators).forEach(id => {

      const el = document.getElementById(id);

      if (el) {
        el.style.borderColor = '';
      }

      const errEl =
        document.getElementById('err-' + id);

      if (errEl) {
        errEl.textContent = '';
      }

    });


    /* Hide success message */

    setTimeout(() => {

      successEl.hidden = true;
      successEl.style.display = '';

    }, 6000);


  } catch (err) {

    /* -------------------------------
       ERROR
    -------------------------------- */

    console.error('EmailJS error:', err);

    btnText.hidden = false;
    btnLoad.hidden = true;

    submitBtn.disabled = false;

    errorEl.hidden = false;
    errorEl.style.display = 'flex';


    setTimeout(() => {

      errorEl.hidden = true;
      errorEl.style.display = '';

    }, 6000);

  }

});
  /* 12. BACK TO TOP */
  document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* 13. FOOTER YEAR */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* 14. SMOOTH ANCHOR LINKS */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + scrollY - navbar.offsetHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* 15. ORB PARALLAX */
  if (!isTouchDevice) {
    document.addEventListener('mousemove', e => {
      const dx = (e.clientX - innerWidth  / 2) / innerWidth;
      const dy = (e.clientY - innerHeight / 2) / innerHeight;
      document.querySelectorAll('.orb').forEach((o, i) => {
        const f = (i + 1) * 18;
        o.style.transform = `translate(${dx * f}px,${dy * f}px)`;
      });
    });
  }

  /* 16. CARD TILT (desktop only) */
  if (!isTouchDevice) {
    document.querySelectorAll('.cert-card,.sport-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r  = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top)  / r.height - .5) * -10;
        const ry = ((e.clientX - r.left) / r.width  - .5) *  10;
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* 17. INJECT @keyframes for filter */
  try {
    const sheet = document.styleSheets[0];
    sheet.insertRule(`
      @keyframes filterReveal {
        from { opacity:0; transform:scale(.92) translateY(20px) }
        to   { opacity:1; transform:none }
      }`, sheet.cssRules.length);
  } catch(_) {}

  /* 18. TOAST HELPER */
  function showToast(msg, type = 'info') {
    const t = document.createElement('div');
    t.textContent = msg;
    Object.assign(t.style, {
      position:     'fixed',
      bottom:       '5rem',
      left:         '50%',
      transform:    'translateX(-50%)',
      background:   type === 'warn' ? '#5c2f1f' : '#1c3a38',
      color:        '#fff',
      padding:      '.75rem 1.5rem',
      borderRadius: '50px',
      fontSize:     '.85rem',
      zIndex:       '9999',
      boxShadow:    '0 4px 20px rgba(0,0,0,.4)',
      whiteSpace:   'nowrap',
    });
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 5000);
  }

  console.log('%c Portfolio Ready', 'color:#c9a05c;font-size:14px;font-weight:bold;');
});