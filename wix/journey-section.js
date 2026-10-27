/* True North — "Where are you in your project?" section (with expanding quick-look panels)
   Wix Custom Element. Self-contained (Shadow DOM) so Wix styles can't break it.

   In Wix: Add Elements → Embed Code → Custom Element → Choose Source →
     Server URL: https://wixdesigner73-ui.github.io/truenorth-site/wix/journey-section.js
     Tag name:   tn-journey-section
   Optional attributes (set in the Wix settings panel):
     site-url = where the stage pages live (default below)
     img-url  = where the images live (default: site-url + "img/")

   Behaviour: click a tile → its panel expands below that row (one open at a time).
   Click it again, press the X, or press Esc to close. */
const SITE = 'https://wixdesigner73-ui.github.io/truenorth-site/';

/* o = grid order at [4 columns, 2 columns, 1 column] for the tile and for its panel */
const START = {
  key: 'start', name: 'Start Here', href: 'start-here.html',
  sub: 'Meet TRUE NORTH. Your guide to the whole seven-step journey.',
  tile: [1, 1, 1], panel: [5, 3, 2],
  title: 'Start Here',
  text: 'New to building, or not sure where you are in the process? Begin with the short guide to how True North works, or jump in at the stage that matches your project.',
  cta: ['Open the Start Here guide', 'start-here.html'], cta2: ['See all 7 stages', 'journey.html'],
  links: [
    ['I’m finding land or assessing a property', 'Find · Evaluate', 'stage-find.html'],
    ['I’m planning or designing a home', 'Design · Budget', 'stage-design.html'],
    ['I already have plans or a builder', 'Approvals · Contract &amp; Build', 'stage-approvals.html'],
  ],
};

const STAGES = [
  { key: 'find', n: 1, name: 'Find', sub: 'Choose your land wisely', href: 'stage-find.html', img: 's-find.jpg',
    tile: [2, 2, 3], panel: [5, 3, 4], title: '1. Find',
    text: 'Before you fall for a view or a price, decide whether to build, buy, knock down or renovate, and learn what to look for when you inspect.',
    video: 'What to look for on your first visit', pdf: 'LAND — Finding the Right Land', pdfChip: ['free', 'Free · coming soon'] },
  { key: 'evaluate', n: 2, name: 'Evaluate', sub: 'Understand the site', href: 'stage-evaluate.html', img: 's-evaluate.jpg',
    tile: [3, 4, 5], panel: [5, 6, 6], title: '2. Evaluate',
    text: 'The survey plan tells you what the site will let you build. Orientation decides how the house will feel to live in.',
    video: 'Using the Sun Compass on your site', pdf: 'Land and existing-home due diligence checklist', pdfChip: ['free', 'Free · coming soon'] },
  { key: 'design', n: 3, name: 'Design', sub: 'Plan for how you live', href: 'stage-design.html', img: 's-design.jpg',
    tile: [4, 5, 7], panel: [5, 6, 8], title: '3. Design',
    text: 'Most of a home’s comfort and running cost is decided at the design stage. Start with a pencil, a notebook and the sun.',
    video: 'From sketch to floor plan', pdf: 'The nine questions you must discuss with a building designer', pdfChip: ['soon', 'Being updated'] },
  { key: 'budget', n: 4, name: 'Budget', sub: 'Know the likely costs', href: 'stage-budget.html', img: 's-budget.jpg',
    tile: [6, 7, 9], panel: [10, 9, 10], title: '4. Budget',
    text: 'Break the build into cost centres, write a proper specification and compare like with like.',
    video: 'How builders price a house', pdf: 'Owner Builder Cost Planner', pdfChip: ['soon', 'Coming soon'] },
  { key: 'approvals', n: 5, name: 'Approvals', sub: 'Navigate requirements', href: 'stage-approvals.html', img: 'bg-approvals.jpg',
    tile: [7, 8, 11], panel: [10, 9, 12], title: '5. Approvals',
    text: 'Know which reports your council needs, the order they come in, and how to avoid requests for more information.',
    video: 'DA vs CC in plain English', pdf: 'The approvals roadmap', pdfChip: ['soon', 'Coming soon'] },
  { key: 'build', n: 6, name: 'Build', sub: 'Choose with confidence', href: 'stage-contract-build.html', img: 's-build.jpg',
    tile: [8, 10, 13], panel: [10, 12, 14], title: '6. Contract &amp; Build',
    text: 'Pre-qualify builders, run a fair tender, and understand what you are signing before work begins.',
    video: 'Reading your building contract', pdf: '31-Point Home Building Contract Guide', pdfChip: ['soon', 'Coming soon'] },
  { key: 'handover', n: 7, name: 'Handover', sub: 'Know what to check', href: 'stage-handover.html', img: 'bg-handover.jpg',
    tile: [9, 11, 15], panel: [10, 12, 16], title: '7. Handover',
    text: 'Good communication and site management carry you to a clean handover and a warranty you understand.',
    video: 'Your final inspection, step by step', pdf: 'Handover inspection checklist', pdfChip: ['soon', 'Coming soon'] },
];

const ICON = {
  arrow: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  close: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  play:  '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" style="width:20px;height:20px"><circle cx="12" cy="12" r="9"/><path d="M10 8.5l6 3.5-6 3.5z" fill="currentColor"/></svg>',
  pdf:   '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" style="width:22px;height:22px"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 13h6M9 17h6"/></svg>',
};

const CSS = `
@import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Barlow:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap");
:host{display:block;
  --blue:#29aacb;--blue-deep:#0d6d8a;--blue-ink:#0b4458;--yellow:#f5ce2e;--yellow-soft:#fdf3c4;
  --ink:#15313d;--ink-2:#44606b;--ink-3:#6f8790;--mist:#f1f7f9;--line:#d3e3e9;
  --display:"Barlow Condensed","Arial Narrow",Arial,sans-serif;
  --body:"Barlow","Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  --mono:"IBM Plex Mono",ui-monospace,Consolas,monospace;
  --gutter:clamp(16px,4vw,40px);--ease:cubic-bezier(.2,.8,.2,1)}
*{box-sizing:border-box}
.icon{width:18px;height:18px;flex:none}
.section{background:var(--mist);padding:clamp(52px,7vw,96px) 0;font-family:var(--body);font-size:17px;line-height:1.6;color:var(--ink);-webkit-font-smoothing:antialiased}
.wrap{max-width:1200px;margin-inline:auto;padding-inline:var(--gutter)}
.head{display:grid;grid-template-columns:1fr auto;align-items:end;gap:14px;margin-bottom:clamp(24px,4vw,44px)}
.head>div{display:grid;gap:14px}
.eyebrow{margin:0;font-family:var(--mono);font-size:.78rem;letter-spacing:.12em;text-transform:uppercase;color:var(--blue-deep);display:flex;align-items:center;gap:.6em}
.eyebrow::before{content:"";width:22px;height:3px;background:var(--yellow);flex:none}
h2,h3{margin:0;font-family:var(--display);font-weight:700;line-height:1.05;letter-spacing:.005em;text-wrap:balance}
h2{font-size:clamp(2.2rem,5vw,3.2rem);text-transform:uppercase}
.lede{margin:0;font-size:1.15rem;color:var(--ink-2);max-width:62ch}
.btn{display:inline-flex;align-items:center;gap:.5em;font-family:var(--display);font-weight:600;font-size:1.1rem;letter-spacing:.04em;text-transform:uppercase;text-decoration:none;padding:.72em 1.3em;border-radius:3px;border:2px solid transparent;line-height:1.1;cursor:pointer;transition:background .15s,color .15s,border-color .15s}
.btn-ghost{border-color:var(--ink);color:var(--ink);background:transparent;white-space:nowrap}
.btn-ghost:hover{background:var(--ink);color:#fff}
.btn-primary{background:var(--blue);color:#fff}
.btn-primary:hover{background:var(--blue-deep)}
.tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.tile{order:var(--o4);display:flex;flex-direction:column;background:#fff;border:1px solid var(--line);border-radius:6px;overflow:hidden;text-decoration:none;color:var(--ink);cursor:pointer;transition:border-color .2s,transform .2s,box-shadow .2s}
.tile:hover,.tile[aria-expanded="true"]{border-color:var(--blue);box-shadow:0 18px 34px -22px rgba(11,68,88,.5)}
.tile:hover{transform:translateY(-3px)}
.tile[aria-expanded="true"]{outline:2px solid var(--yellow);outline-offset:-2px}
.t-img{display:block;aspect-ratio:16/10;overflow:hidden;background:var(--mist)}
.t-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s var(--ease)}
.tile:hover .t-img img{transform:scale(1.05)}
.t-txt{display:flex;gap:12px;align-items:center;padding:14px 16px}
.n{flex:none;display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--yellow);font-family:var(--display);font-weight:700;font-size:1.1rem}
.t-name{display:block;font-family:var(--display);font-weight:700;font-size:1.25rem;text-transform:uppercase;letter-spacing:.02em;line-height:1.1}
.t-sub{display:block;color:var(--ink-3);font-size:.82rem;margin-top:2px}
.tile-start{background:var(--blue-deep);border-color:var(--blue-deep);color:#fff;justify-content:center;gap:10px;padding:22px 20px;border-left:6px solid var(--yellow)}
.tile-start:hover,.tile-start[aria-expanded="true"]{background:var(--blue-ink);border-color:var(--blue-ink);border-left-color:var(--yellow)}
.tile-start .t-name{font-size:1.5rem}
.tile-start .t-sub{color:#e9f6fa;font-size:.92rem;margin-top:0}
.go-dot{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;background:var(--yellow);color:var(--ink)}
.tile-panel{order:var(--o4);grid-column:1/-1;position:relative;display:grid;grid-template-columns:1.3fr 1fr;gap:28px;background:var(--mist);border:1px solid var(--line);border-top:4px solid var(--yellow);border-radius:6px;padding:28px 56px 28px 28px;animation:tpIn .25s var(--ease)}
.tile-panel[hidden]{display:none}
@keyframes tpIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
.tp-close{position:absolute;right:10px;top:10px;display:grid;place-items:center;width:38px;height:38px;border:1px solid var(--line);border-radius:3px;background:#fff;color:var(--ink);cursor:pointer}
.tp-close:hover{border-color:var(--blue);color:var(--blue-deep)}
.tp-copy{display:grid;gap:12px;align-content:start}
.tp-copy h3{font-size:1.7rem}
.tp-copy p{margin:0;color:var(--ink-2)}
.tp-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:4px}
.tp-res,.tp-links{display:grid;gap:10px;align-content:start;list-style:none;margin:0;padding:0}
.tp-item,.tp-links a{display:flex;gap:12px;align-items:flex-start;padding:12px 14px;background:#fff;border:1px solid var(--line);border-radius:4px;text-decoration:none;color:var(--ink)}
.tp-links a{flex-direction:column;gap:2px}
.tp-links small{color:var(--ink-3)}
.tp-item:hover,.tp-links a:hover{border-color:var(--blue)}
.tp-item .ic{flex:none;display:grid;place-items:center;width:38px;height:38px;border-radius:4px;background:var(--mist);color:var(--blue-deep)}
.tp-item small{color:var(--ink-3);margin-right:6px}
.tp-item b{display:block}
.chip{display:inline-flex;align-items:center;font-family:var(--mono);font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;padding:.28em .6em;border-radius:2px;background:var(--mist);color:var(--ink-2);white-space:nowrap}
.chip.free{background:var(--yellow-soft);color:#6b5400}
.chip.vid{background:#dff1f7;color:var(--blue-ink)}
.chip.soon{background:#eef1f2;color:var(--ink-3)}
a:focus-visible,button:focus-visible{outline:3px solid var(--yellow);outline-offset:2px}
@media (max-width:1000px){.tiles{grid-template-columns:repeat(2,1fr)}.tile{order:var(--o2)}.tile-panel{order:var(--o2);grid-template-columns:1fr}}
@media (max-width:760px){.head{grid-template-columns:1fr}.btn-ghost{justify-self:start}}
@media (max-width:560px){.tiles{grid-template-columns:1fr}.tile{order:var(--o1)}.tile-panel{order:var(--o1);padding:22px 18px}.tp-copy h3{padding-right:40px}}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
`;

class TnJourneySection extends HTMLElement {
  static get observedAttributes() { return ['site-url', 'img-url']; }
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }

  render() {
    const site = this.getAttribute('site-url') || SITE;
    const imgs = this.getAttribute('img-url') || site + 'img/';
    const o = a => `--o4:${a[0]};--o2:${a[1]};--o1:${a[2]}`;

    const startTile = `
      <a class="tile tile-start" href="${site}${START.href}" target="_top" data-tile aria-controls="tp-${START.key}" style="${o(START.tile)}">
        <span class="go-dot">${ICON.arrow}</span><span class="t-name">${START.name}</span><span class="t-sub">${START.sub}</span>
      </a>`;
    const startPanel = `
      <div class="tile-panel" id="tp-${START.key}" hidden role="region" aria-label="${START.name} quick look" style="${o(START.panel)}">
        <button class="tp-close" type="button" aria-label="Close">${ICON.close}</button>
        <div class="tp-copy"><h3>${START.title}</h3><p>${START.text}</p>
          <div class="tp-actions"><a class="btn btn-primary" href="${site}${START.cta[1]}" target="_top">${START.cta[0]} ${ICON.arrow}</a><a class="btn btn-ghost" href="${site}${START.cta2[1]}" target="_top">${START.cta2[0]}</a></div></div>
        <ul class="tp-links">${START.links.map(l => `<li><a href="${site}${l[2]}" target="_top"><b>${l[0]}</b><small>${l[1]}</small></a></li>`).join('')}</ul>
      </div>`;

    const tiles = STAGES.map(s => `
      <a class="tile" href="${site}${s.href}" target="_top" data-tile aria-controls="tp-${s.key}" style="${o(s.tile)}">
        <span class="t-img"><img src="${imgs}${s.img}" alt="" loading="lazy"></span>
        <span class="t-txt"><span class="n">${s.n}</span><span><span class="t-name">${s.name}</span><span class="t-sub">${s.sub}</span></span></span>
      </a>`).join('');
    const panels = STAGES.map(s => `
      <div class="tile-panel" id="tp-${s.key}" hidden role="region" aria-label="${s.name} quick look" style="${o(s.panel)}">
        <button class="tp-close" type="button" aria-label="Close">${ICON.close}</button>
        <div class="tp-copy"><h3>${s.title}</h3><p>${s.text}</p>
          <div class="tp-actions"><a class="btn btn-primary" href="${site}${s.href}" target="_top">Go to the full stage ${ICON.arrow}</a></div></div>
        <div class="tp-res">
          <a class="tp-item" href="${site}${s.href}#video" target="_top"><span class="ic">${ICON.play}</span><span><b>${s.video}</b><small>Short video · 3–5 minutes</small> <span class="chip vid">Video · coming soon</span></span></a>
          <a class="tp-item" href="${site}resources.html" target="_top"><span class="ic">${ICON.pdf}</span><span><b>${s.pdf}</b><small>PDF download</small> <span class="chip ${s.pdfChip[0]}">${s.pdfChip[1]}</span></span></a>
        </div>
      </div>`).join('');

    this.shadowRoot.innerHTML = `<style>${CSS}</style>
<section class="section"><div class="wrap">
  <div class="head">
    <div><p class="eyebrow">The seven-stage homeowner journey</p><h2>Where are you in your project?</h2>
    <p class="lede">Choose your stage. Each one has a short overview, common mistakes, practical steps and the guides and tools that help.</p></div>
    <a class="btn btn-ghost" href="${site}journey.html" target="_top">See the full journey</a>
  </div>
  <div class="tiles">${startTile}${tiles}${startPanel}${panels}</div>
</div></section>`;
    this.bind();
  }

  bind() {
    const root = this.shadowRoot;
    const tiles = [...root.querySelectorAll('[data-tile]')];
    const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
    const panelOf = t => root.getElementById(t.getAttribute('aria-controls'));
    const open = t => {
      tiles.forEach(x => { const on = x === t; x.setAttribute('aria-expanded', on); panelOf(x).hidden = !on; });
      if (t) panelOf(t).scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' });
    };
    tiles.forEach(t => {
      t.setAttribute('role', 'button'); t.setAttribute('aria-expanded', 'false');
      t.addEventListener('click', e => { e.preventDefault(); open(t.getAttribute('aria-expanded') === 'true' ? null : t); });
      t.addEventListener('keydown', e => { if (e.key === ' ') { e.preventDefault(); t.click(); } });
    });
    root.querySelectorAll('.tp-close').forEach(b => b.addEventListener('click', () => {
      const t = tiles.find(x => panelOf(x) === b.closest('.tile-panel')); open(null); if (t) t.focus();
    }));
    root.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      const t = tiles.find(x => x.getAttribute('aria-expanded') === 'true'); if (t) { open(null); t.focus(); }
    });
  }
}

if (!customElements.get('tn-journey-section')) customElements.define('tn-journey-section', TnJourneySection);
