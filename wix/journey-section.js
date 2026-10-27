/* True North — "Where are you in your project?" section
   Wix Custom Element. Self-contained (Shadow DOM) so Wix styles can't break it.

   In Wix: Add Elements → Embed Code → Custom Element → Choose Source →
     Server URL: https://wixdesigner73-ui.github.io/truenorth-site/wix/journey-section.js
     Tag name:   tn-journey-section
   Optional attributes (set in the Wix settings panel):
     site-url = where the stage pages live (default below)
     img-url  = where the images live (default: site-url + "img/") */
const SITE = 'https://wixdesigner73-ui.github.io/truenorth-site/';

const STAGES = [
  { n: 1, name: 'Find',      sub: 'Choose your land wisely', href: 'stage-find.html',           img: 's-find.jpg' },
  { n: 2, name: 'Evaluate',  sub: 'Understand the site',     href: 'stage-evaluate.html',       img: 's-evaluate.jpg' },
  { n: 3, name: 'Design',    sub: 'Plan for how you live',   href: 'stage-design.html',         img: 's-design.jpg' },
  { n: 4, name: 'Budget',    sub: 'Know the likely costs',   href: 'stage-budget.html',         img: 's-budget.jpg' },
  { n: 5, name: 'Approvals', sub: 'Navigate requirements',   href: 'stage-approvals.html',      img: 'bg-approvals.jpg' },
  { n: 6, name: 'Build',     sub: 'Choose with confidence',  href: 'stage-contract-build.html', img: 's-build.jpg' },
  { n: 7, name: 'Handover',  sub: 'Know what to check',      href: 'stage-handover.html',       img: 'bg-handover.jpg' },
];

const CSS = `
@import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Barlow:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap");
:host{display:block;
  --blue:#29aacb;--blue-deep:#0d6d8a;--blue-ink:#0b4458;--yellow:#f5ce2e;
  --ink:#15313d;--ink-2:#44606b;--ink-3:#6f8790;--mist:#f1f7f9;--line:#d3e3e9;
  --display:"Barlow Condensed","Arial Narrow",Arial,sans-serif;
  --body:"Barlow","Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  --mono:"IBM Plex Mono",ui-monospace,Consolas,monospace;
  --gutter:clamp(16px,4vw,40px)}
*{box-sizing:border-box}
.section{background:var(--mist);padding:clamp(52px,7vw,96px) 0;font-family:var(--body);font-size:17px;line-height:1.6;color:var(--ink);-webkit-font-smoothing:antialiased}
.wrap{max-width:1200px;margin-inline:auto;padding-inline:var(--gutter)}
.head{display:grid;grid-template-columns:1fr auto;align-items:end;gap:14px;margin-bottom:clamp(24px,4vw,44px)}
.head>div{display:grid;gap:14px}
.eyebrow{margin:0;font-family:var(--mono);font-size:.78rem;letter-spacing:.12em;text-transform:uppercase;color:var(--blue-deep);display:flex;align-items:center;gap:.6em}
.eyebrow::before{content:"";width:22px;height:3px;background:var(--yellow);flex:none}
h2{margin:0;font-family:var(--display);font-weight:700;font-size:clamp(2.2rem,5vw,3.2rem);line-height:1.05;text-transform:uppercase;letter-spacing:.005em;text-wrap:balance}
.lede{margin:0;font-size:1.15rem;color:var(--ink-2);max-width:62ch}
.btn{display:inline-flex;align-items:center;font-family:var(--display);font-weight:600;font-size:1.1rem;letter-spacing:.04em;text-transform:uppercase;text-decoration:none;padding:.72em 1.3em;border-radius:3px;border:2px solid var(--ink);color:var(--ink);background:transparent;line-height:1.1;white-space:nowrap;transition:background .15s,color .15s}
.btn:hover{background:var(--ink);color:#fff}
.tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.tile{display:flex;flex-direction:column;background:#fff;border:1px solid var(--line);border-radius:6px;overflow:hidden;text-decoration:none;color:var(--ink);transition:border-color .2s,transform .2s,box-shadow .2s}
.tile:hover{border-color:var(--blue);transform:translateY(-3px);box-shadow:0 18px 34px -22px rgba(11,68,88,.5)}
.t-img{display:block;aspect-ratio:16/10;overflow:hidden;background:var(--mist)}
.t-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s cubic-bezier(.2,.8,.2,1)}
.tile:hover .t-img img{transform:scale(1.05)}
.t-txt{display:flex;gap:12px;align-items:center;padding:14px 16px}
.n{flex:none;display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--yellow);font-family:var(--display);font-weight:700;font-size:1.1rem}
.t-name{display:block;font-family:var(--display);font-weight:700;font-size:1.25rem;text-transform:uppercase;letter-spacing:.02em;line-height:1.1}
.t-sub{display:block;color:var(--ink-3);font-size:.82rem;margin-top:2px}
.tile-start{background:var(--blue-deep);border-color:var(--blue-deep);color:#fff;justify-content:center;gap:10px;padding:22px 20px;border-left:6px solid var(--yellow)}
.tile-start:hover{background:var(--blue-ink);border-color:var(--blue-ink);border-left-color:var(--yellow)}
.tile-start .t-name{font-size:1.5rem}
.tile-start .t-sub{color:#e9f6fa;font-size:.92rem;margin-top:0}
.go-dot{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;background:var(--yellow);color:var(--ink)}
.go-dot svg{width:18px;height:18px}
@media (max-width:1000px){.tiles{grid-template-columns:repeat(2,1fr)}}
@media (max-width:760px){.head{grid-template-columns:1fr}.btn{justify-self:start}}
@media (max-width:560px){.tiles{grid-template-columns:1fr}}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
`;

class TnJourneySection extends HTMLElement {
  static get observedAttributes() { return ['site-url', 'img-url']; }
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }

  render() {
    const site = this.getAttribute('site-url') || SITE;
    const imgs = this.getAttribute('img-url') || site + 'img/';
    const tiles = STAGES.map(s => `
      <a class="tile" href="${site}${s.href}" target="_top">
        <span class="t-img"><img src="${imgs}${s.img}" alt="" loading="lazy"></span>
        <span class="t-txt"><span class="n">${s.n}</span><span><span class="t-name">${s.name}</span><span class="t-sub">${s.sub}</span></span></span>
      </a>`).join('');
    const start = `
      <a class="tile tile-start" href="${site}start-here.html" target="_top">
        <span class="go-dot"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
        <span class="t-name">Start Here</span>
        <span class="t-sub">Meet TRUE NORTH. Your guide to the whole seven-step journey.</span>
      </a>`;
    this.shadowRoot.innerHTML = `<style>${CSS}</style>
<section class="section"><div class="wrap">
  <div class="head">
    <div><p class="eyebrow">The seven-stage homeowner journey</p><h2>Where are you in your project?</h2>
    <p class="lede">Choose your stage. Each one has a short overview, common mistakes, practical steps and the guides and tools that help.</p></div>
    <a class="btn" href="${site}journey.html" target="_top">See the full journey</a>
  </div>
  <div class="tiles">${start}${tiles}</div>
</div></section>`;
  }
}

if (!customElements.get('tn-journey-section')) customElements.define('tn-journey-section', TnJourneySection);
