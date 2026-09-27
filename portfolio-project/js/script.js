document.getElementById('year').textContent = new Date().getFullYear();

/* ---- cursor glow ---- */
const cursorDot = document.getElementById('cursorDot');
window.addEventListener('mousemove', e => {
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button, .project-card, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => cursorDot.classList.add('grow'));
  el.addEventListener('mouseleave', () => cursorDot.classList.remove('grow'));
});

/* ---- magnetic buttons ---- */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  });
  btn.addEventListener('mouseleave', () => btn.style.transform = '');
});

/* ---- 3D tilt on project cards ---- */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-3px)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});

const SKILLS = {
  0: ['Java', 'C', 'C++', 'Kotlin', 'JavaScript (ES6+)'],
  1: ['HTML5', 'CSS3', 'Responsive Design', 'DOM Manipulation'],
  2: ['Git', 'GitHub', 'VS Code', 'Netlify', 'AutoCAD'],
  3: ['Data Structures & Algorithms', 'OOP', 'REST APIs', 'Serverless Architecture']
};
document.querySelectorAll('.skill-card ul').forEach((ul, i) => {
  SKILLS[i].forEach((s, j) => {
    const li = document.createElement('li');
    li.textContent = s; li.style.setProperty('--i', j);
    ul.appendChild(li);
  });
});

const themeBtn = document.getElementById('themeBtn');
const root = document.documentElement;
themeBtn.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  root.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeBtn.textContent = isDark ? 'Dark mode' : 'Light mode';
});

const menuToggle = document.getElementById('menuToggle');
const navlinks = document.getElementById('navlinks');
menuToggle.addEventListener('click', () => navlinks.classList.toggle('open'));

const pages = document.querySelectorAll('.page');
const navButtons = document.querySelectorAll('[data-goto]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); } });
}, { threshold: .15 });

const wipe = document.getElementById('pageWipe');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function goto(name, push = true, animate = true) {
  const doSwitch = () => {
    pages.forEach(p => p.classList.toggle('active', p.dataset.page === name));
    document.querySelectorAll('.nav-link').forEach(b => b.classList.toggle('active', b.dataset.goto === name));
    const activePage = document.getElementById('page-' + name);
    if (activePage) {
      activePage.querySelectorAll('.reveal, .timeline').forEach(el => { el.classList.remove('in'); revealObserver.observe(el); });
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
    if (push) history.pushState(null, '', '#' + name);
    navlinks.classList.remove('open');
  };
  if (animate && !reduceMotion) {
    wipe.classList.add('run');
    setTimeout(doSwitch, 300);
    setTimeout(() => wipe.classList.remove('run'), 700);
  } else { doSwitch(); }
}

navButtons.forEach(btn => btn.addEventListener('click', () => goto(btn.dataset.goto)));
window.addEventListener('popstate', () => goto(location.hash.replace('#', '') || 'home', false, false));
goto(location.hash.replace('#', '') || 'home', false, false);

window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = h.scrollTop / (h.scrollHeight - h.clientHeight || 1) * 100;
  document.getElementById('progress').style.width = pct + '%';
});

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const note = document.getElementById('formNote');
  if (!name || !email || !message) { note.textContent = 'Please fill in every field.'; note.style.color = '#c96a5a'; return; }
  const subject = encodeURIComponent('Portfolio contact from ' + name);
  const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')');
  window.location.href = 'mailto:yash.23bcon2004@jecrcu.edu.in?subject=' + subject + '&body=' + body;
  note.textContent = 'Opening your email app…'; note.style.color = '';
});