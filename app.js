// Builders Club: interactions. Replace CHECKOUT links with Razorpay payment pages when ready.
const CHECKOUT = {
  study: 'mailto:hello@aiessentials.in?subject=Builders%20Club%20%C2%B7%20I%20The%20study',
  workshop: 'mailto:hello@aiessentials.in?subject=Builders%20Club%20%C2%B7%20II%20Club%20member',
  foundation: 'mailto:hello@aiessentials.in?subject=Builders%20Club%20%C2%B7%20III%20The%20foundation',
  year: 'mailto:hello@aiessentials.in?subject=Builders%20Club%20%C2%B7%20IV%20The%20year%20of%20building',
  yearMonthly: 'mailto:hello@aiessentials.in?subject=Builders%20Club%20%C2%B7%20IV%20monthly',
  call: 'mailto:hello@aiessentials.in?subject=Builders%20Club%20%C2%B7%2015-min%20call'
};

document.querySelectorAll('[data-checkout]').forEach(a => { a.href = CHECKOUT[a.dataset.checkout] || '#membership'; });

// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const sheet = document.getElementById('sheet');
menuBtn.addEventListener('click', () => {
  const open = sheet.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
sheet.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { sheet.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }));

// Personas
const P = {
  managers: { img: 'img/manager.jpg', alt: 'A manager at a glass wall covered in workflow diagrams', kind: 'The builder inside the company', head: 'Build the team that builds with AI.', pain: 'Companies aren’t changed by memos. They’re changed by the one manager who builds the first working system and shows everyone else how.', wins: ['Replace weekly reporting with an agent that never forgets', 'Give your team a working playbook, not another policy', 'Show the hours saved, in rupees, within one quarter'], plan: 'III · The foundation', link: '#plan-3' },
  founders: { img: 'img/founder.jpg', alt: 'A founder working late, lit by his laptop', kind: 'The builder of companies', head: 'Build the company you couldn’t afford to hire for.', pain: 'You’ve been the bottleneck since day one. AI won’t replace your judgement. It will do everything that was stealing time from it.', wins: ['Agents for operations, follow-up and support', 'Ads and content without an agency retainer', '₹1,00,000 in ad credits to prove it works'], plan: 'IV · The year of building', link: '#plan-4' },
  developers: { img: 'img/developer.jpg', alt: 'A developer with code reflected in his glasses', kind: 'The builder of software', head: 'You can build anything. Build what people pay for.', pain: 'Code was never the hard part. Knowing which problem a business will pay to solve is. The room is full of founders who need exactly what you can make.', wins: ['Agents, RAG and voice systems that clients buy', 'Package them as services or micro SaaS', 'Meet founders who need a builder, not a résumé'], plan: 'III · The foundation', link: '#plan-3' },
  creators: { img: 'img/creator.jpg', alt: 'A creator in a home studio with a camera and ring light', kind: 'The builder of audiences', head: 'Build an audience that doesn’t run on your energy.', pain: 'Posting every day is a treadmill. Builders design the machine instead: scripts, avatars, voices and edits that keep running while you think.', wins: ['AI video, avatars and voiceovers', 'A content pipeline that runs without you', 'AI content services you can sell to brands'], plan: 'II · Club member', link: '#plan-2' },
  studios: { img: 'img/agency.jpg', alt: 'A studio founder behind a cinema camera on set', kind: 'The builder of studios', head: 'Build the studio of the next decade.', pain: 'Clients want more films, faster, for less. You can fight that, or build for it. AI production lets a small crew deliver like a big one.', wins: ['AI commercials, product films and UGC', 'A pipeline your whole team can run', 'Ad credits to win and prove new clients'], plan: 'IV · The year of building', link: '#plan-4' }
};
const tabs = document.querySelectorAll('[role="tab"][data-p]');
const $ = id => document.getElementById(id);
function showPersona(key) {
  const p = P[key]; if (!p) return;
  tabs.forEach(t => t.setAttribute('aria-selected', String(t.dataset.p === key)));
  const img = $('p-img');
  img.style.opacity = 0;
  setTimeout(() => { img.src = p.img; img.alt = p.alt; img.onload = () => { img.style.opacity = 1; }; }, 180);
  $('p-kind').textContent = p.kind; $('p-head').textContent = p.head; $('p-pain').textContent = p.pain;
  $('p-wins').innerHTML = ''; p.wins.forEach(w => { const li = document.createElement('li'); li.textContent = w; $('p-wins').appendChild(li); });
  $('p-plan').textContent = p.plan; $('p-link').href = p.link;
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => showPersona(t.dataset.p));
  t.addEventListener('keydown', e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
    n.focus(); showPersona(n.dataset.p);
  });
});
$('p-img').alt = P.founders.alt;
Object.values(P).forEach(p => { const i = new Image(); i.src = p.img; });

// Year billing toggle
const billBtns = document.querySelectorAll('[data-bill]');
const yearBtn = document.querySelector('[data-checkout="year"]');
billBtns.forEach(b => b.addEventListener('click', () => {
  const monthly = b.dataset.bill === 'monthly';
  billBtns.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  $('y-price').innerHTML = monthly ? '₹20,000<small> a month</small>' : '₹1,75,000';
  $('y-note').textContent = monthly ? 'twelve payments · ₹2,40,000 in all · [+ GST]' : 'one payment · save ₹65,000 against monthly · [+ GST]';
  yearBtn.href = monthly ? CHECKOUT.yearMonthly : CHECKOUT.year;
}));

// Reveal on scroll
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: .08 }) : null;
document.querySelectorAll('.rv').forEach(el => io ? io.observe(el) : el.classList.add('in'));

// Cursor-reactive hero spotlight
const spot = document.getElementById('spot');
if (spot && window.matchMedia('(hover: hover)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const heroEl = document.querySelector('.hero');
  heroEl.addEventListener('pointermove', e => {
    const r = heroEl.getBoundingClientRect();
    spot.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    spot.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  });
} else if (spot) {
  spot.style.display = 'none';
}

// Mobile dock appears after the hero
const dock = document.querySelector('.dock');
const hero = document.querySelector('.hero');
if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => dock.classList.toggle('show', !e.isIntersecting)).observe(hero);
