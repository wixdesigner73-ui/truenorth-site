/* True North — eight static journey icons for the top of the homepage
   Wix Custom Element. Self-contained (Shadow DOM).

   In Wix: Add Elements → Embed Code → Custom Element → Choose Source →
     Server URL: https://wixdesigner73-ui.github.io/truenorth-site/wix/journey-icons.js
     Tag name:   tn-journey-icons
   Place it across the top of the homepage, stretched to full width.
   Optional attribute: site-url = where the stage pages live (default below)

   Design rules from the client brief:
   - Exactly eight icons, always all visible: one row of 8 on desktop, 4 x 2 on tablet and phone.
     No slider, no carousel, no hidden items.
   - Each icon links straight to its stage page.
   - Fonts match the Wix site (headings Arial Narrow Bold, text Roboto).
   - Colours are the CSS variables at the top of CSS: light blue, yellow, ochre.
     They are PROVISIONAL until Belle's branding kit is confirmed; change them in one place. */
const SITE = 'https://webloomstudio.wixstudio.com/truenorth/';

const SVG = (p) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;

const ITEMS = [
  { name: 'Start Here', href: 'start-here',
    icon: SVG('<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>') },                                  // compass
  { name: 'Find', href: 'find',
    icon: SVG('<path d="M12 21s-6.5-5.7-6.5-11a6.5 6.5 0 0 1 13 0c0 5.3-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>') }, // map pin
  { name: 'Evaluate', href: 'evaluate',
    icon: SVG('<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8"/>') }, // sun
  { name: 'Design', href: 'design',
    icon: SVG('<path d="M4 20l1-4L16.5 4.5a2 2 0 0 1 3 3L8 19z"/><path d="M14.5 6.5l3 3"/>') },                            // pencil
  { name: 'Budget', href: 'budget',
    icon: SVG('<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8.5 7.5h7M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01"/>') }, // calculator
  { name: 'Approvals', href: 'approval',
    icon: SVG('<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M8.5 13l2.5 2.5 4.5-5"/>') },            // clipboard tick
  { name: 'Build', href: 'build',
    icon: SVG('<path d="M3 11l9-7 9 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5h4v5"/>') },                       // house
  { name: 'Handover', href: 'handover',
    icon: SVG('<circle cx="8" cy="14" r="4"/><path d="M11 11.5L20 3M16.5 6.5l2.5 2.5M14 9l2 2"/>') },                      // key
];

const CSS = `
:host{display:block;
  /* PROVISIONAL palette — swap when Belle's branding kit is confirmed */
  --light-blue:#29aacb;--light-blue-tint:#e3f4f9;--deep-blue:#0d6d8a;
  --yellow:#f5ce2e;--ochre:#cc8a1c;
  --ink:#15313d;--ink-2:#44606b;--line:#d3e3e9;--paper:#fff;
  --display:wfont_b6fd1f_4e6e90d1a8004009a6ecd2f68ad2add6,wf_4e6e90d1a8004009a6ecd2f68,orig_arial_narrow_bold,"Arial Narrow",Arial,sans-serif;
  --gutter:clamp(12px,3vw,40px)}
*{box-sizing:border-box}
.bar{background:var(--paper);padding:clamp(18px,3vw,32px) var(--gutter);border-bottom:1px solid var(--line)}
ul{list-style:none;margin:0 auto;padding:0;max-width:1200px;display:grid;grid-template-columns:repeat(8,1fr);gap:clamp(6px,1.4vw,18px)}
a{display:flex;flex-direction:column;align-items:center;gap:10px;text-decoration:none;color:var(--ink);padding:10px 4px;border-radius:8px;text-align:center;transition:transform .2s,background .2s}
a:hover{transform:translateY(-3px);background:var(--light-blue-tint)}
a:focus-visible{outline:3px solid var(--yellow);outline-offset:2px}
.ic{position:relative;display:grid;place-items:center;width:clamp(52px,6.2vw,76px);aspect-ratio:1;border-radius:50%;background:var(--light-blue-tint);color:var(--deep-blue);border:2px solid var(--light-blue);transition:background .2s,color .2s,border-color .2s}
.ic svg{width:48%;height:48%}
a:hover .ic{background:var(--light-blue);color:#fff;border-color:var(--light-blue)}
.start .ic{background:var(--yellow);border-color:var(--ochre);color:var(--ink)}
.start:hover .ic{background:var(--ochre);border-color:var(--ochre);color:#fff}
.num{position:absolute;top:-4px;right:-4px;display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:var(--yellow);color:var(--ink);font:700 .75rem/1 var(--display)}
.lbl{font-family:var(--display);font-weight:700;font-size:clamp(.82rem,1.5vw,1.1rem);text-transform:uppercase;letter-spacing:.03em;line-height:1.1}
@media (max-width:999px){ul{grid-template-columns:repeat(4,1fr);row-gap:10px}.ic{width:clamp(56px,13vw,76px)}}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
`;

class TnJourneyIcons extends HTMLElement {
  static get observedAttributes() { return ['site-url']; }
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }

  render() {
    const site = this.getAttribute('site-url') || SITE;
    const items = ITEMS.map((it, i) => `
      <li><a class="${i === 0 ? 'start' : ''}" href="${site}${it.href}" target="_top" aria-label="${i === 0 ? it.name : 'Stage ' + i + ': ' + it.name}">
        <span class="ic">${it.icon}${i ? `<span class="num">${i}</span>` : ''}</span><span class="lbl">${it.name}</span>
      </a></li>`).join('');
    this.shadowRoot.innerHTML = `<style>${CSS}</style><nav class="bar" aria-label="Homeowner journey"><ul>${items}</ul></nav>`;
  }
}

if (!customElements.get('tn-journey-icons')) customElements.define('tn-journey-icons', TnJourneyIcons);
