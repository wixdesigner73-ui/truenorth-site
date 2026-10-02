/* True North — static site builder.  Run:  node build.js
   Reads content.js, writes every page + js/search-index.js into this folder. */
const fs = require('fs');
const path = require('path');
const { STATUS, QUOTES, STAGES, PLANS, RESOURCES, AWARDS, TOPICS } = require('./content');

const OUT = __dirname;
const YEAR = 2026;
const stageBy = Object.fromEntries(STAGES.map(s => [s.k, s]));
const search = [];

/* ------------------------------------------------------------------ helpers */
const ic = (id, extra = '') => `<svg class="icon"${extra}><use href="#i-${id}"/></svg>`;
const chip = st => { const [c, t] = STATUS[st]; return `<span class="chip ${c}">${t}</span>`; };
const quoteFig = (key, cls = 'pull') => { const q = QUOTES[key]; return `<figure class="${cls}"><blockquote>${q.q}</blockquote><figcaption><b>${q.who}</b> · ${q.where}</figcaption></figure>`; };
const lines = arr => arr.map((l, i) => `<span class="line"><span style="--d:${(.15 + i * .12).toFixed(2)}s">${l}</span></span>`).join('\n        ');
const shortName = s => s.short || s.name;

const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M20 20l-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
  <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
  <symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
  <symbol id="i-pdf" viewBox="0 0 24 24"><path d="M6 2h9l5 5v15H6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 2v6h6M9 13h6M9 17h6" fill="none" stroke="currentColor" stroke-width="1.8"/></symbol>
  <symbol id="i-play" viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z" fill="currentColor"/></symbol>
  <symbol id="i-pause" viewBox="0 0 24 24"><path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor"/></symbol>
  <symbol id="i-tool" viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 7h8M8 11h2M12 11h2M8 15h2M12 15h2M8 18h2M12 18h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>
  <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="i-left" viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 11v6M12 7.5v.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
  <symbol id="i-warn" viewBox="0 0 24 24"><path d="M12 3l10 18H2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 10v5M12 18v.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
  <symbol id="i-leaf" viewBox="0 0 24 24"><path d="M5 19C5 9 11 5 20 4c-1 9-5 15-15 15zM5 19l8-8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></symbol>
  <symbol id="i-home" viewBox="0 0 24 24"><path d="M3 11l9-7 9 7v9H3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 20v-6h6v6" fill="none" stroke="currentColor" stroke-width="1.8"/></symbol>
  <symbol id="i-phone" viewBox="0 0 24 24"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 006 6L16 13l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol>
</svg>`;

const COMPASS = `<svg viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="56" fill="#fff" stroke="#d3e3e9" stroke-width="2"/>
          <g stroke="#15313d" stroke-width="1.2"><path d="M60 8v8M60 104v8M8 60h8M104 60h8"/></g>
          <g stroke="#9fb6be" stroke-width="1"><path d="M23.2 23.2l4 4M92.8 23.2l-4 4M23.2 96.8l4-4M92.8 96.8l-4-4"/></g>
          <text x="60" y="30" text-anchor="middle" font-family="Barlow Condensed,Arial Narrow,sans-serif" font-weight="700" font-size="15" fill="#15313d">N</text>
          <text x="60" y="100" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="7" fill="#6f8790">TN 000°</text>
          <g class="needle"><g class="wobble"><path d="M60 22l6 38h-12z" fill="#29aacb"/><path d="M60 98l6-38h-12z" fill="#15313d" opacity=".25"/><text x="60" y="18" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="6.5" fill="#0d6d8a">MN</text></g></g>
          <circle cx="60" cy="60" r="5" fill="#f5ce2e" stroke="#15313d" stroke-width="1.5"/>
        </svg>`;

const NAV = [
  ['journey.html', 'Building Journey', 'journey'],
  ['house-plans.html', 'House Plans', 'plans'],
  ['resources.html', 'Tools &amp; Downloads', 'resources'],
  ['learning-centre.html', 'Learning Centre', 'learn'],
  ['about.html', 'About', 'about'],
  ['contact.html', 'Contact', 'contact']
];

function layout({ file, title, desc, section, body, searchCat = 'Page', keywords = '' }) {
  search.push({ t: title.replace(/ \| True North$/, ''), k: (desc + ' ' + keywords).toLowerCase(), u: file, c: searchCat });
  const nav = NAV.map(([href, label, key]) => `<a href="${href}"${key === section ? ' aria-current="page"' : ''}>${label}</a>`).join('\n      ');
  const html = `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Barlow:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="css/site.css">
<link rel="icon" href="img/logo.png">
</head>
<body>
${SPRITE}
<a class="skip" href="#main">Skip to content</a>

<div class="topbar">
  <div class="wrap">
    <span>Real building experience. Independent guidance. Better decisions before costly mistakes happen.</span>
    <nav class="social" aria-label="Social media"><a href="#">Facebook</a><a href="#">Instagram</a><a href="#">YouTube</a></nav>
  </div>
</div>

<header class="header">
  <div class="wrap">
    <a class="brand" href="index.html" aria-label="True North home">
      <img src="img/logo.png" alt="True North Design Co logo" width="96" height="79">
      <span>True North<sup>®</sup><small>Independent building guidance</small></span>
    </a>
    <nav class="nav" id="nav" aria-label="Main">
      ${nav}
      <a href="start-here.html" class="start"${section === 'start' ? ' aria-current="page"' : ''}>Start Here</a>
    </nav>
    <button class="icon-btn search-btn" data-open-search aria-label="Search the site">${ic('search')}</button>
    <button class="icon-btn menu-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="nav">${ic('menu')}</button>
  </div>
</header>

<main id="main">
${body}
</main>

<footer>
  <div class="wrap foot-top">
    <div class="foot-brand">
      <a href="index.html" class="logo-disc" aria-label="True North home"><img src="img/logo.png" alt="True North Design Co logo"></a>
      <p>Independent guidance for Australians planning to build, renovate or buy, backed by more than 40 years of real building experience.</p>
    </div>
    <div><h4>The 7 stages</h4><ul>
      ${STAGES.map(s => `<li><a href="${s.slug}">${s.n}. ${s.name}</a></li>`).join('')}
    </ul></div>
    <div><h4>Explore</h4><ul>
      <li><a href="start-here.html">Start Here</a></li><li><a href="house-plans.html">House Plans</a></li><li><a href="resources.html">Tools &amp; Downloads</a></li><li><a href="energy-audit.html">Home Energy Audit</a></li><li><a href="consultations.html">Consultations</a></li><li><a href="learning-centre.html">Learning Centre</a></li>
    </ul></div>
    <div><h4>About</h4><ul>
      <li><a href="about.html">Our story</a></li><li><a href="about.html#awards">Awards</a></li><li><a href="about.html#testimonials">Testimonials</a></li><li><a href="contact.html">Contact</a></li>
    </ul></div>
    <div><h4>Follow</h4><ul>
      <li><a href="#">Facebook</a></li><li><a href="#">Instagram</a></li><li><a href="#">YouTube</a></li>
    </ul></div>
  </div>
  <div class="wrap legal">
    <nav aria-label="Legal"><a href="privacy.html">Privacy</a><a href="terms.html">Terms of use</a><a href="copyright.html">Copyright &amp; Use</a><a href="sitemap.html">Site map</a></nav>
    <p><b>© ${YEAR} True North Design Co. All rights reserved.</b> All text, articles, guides, plans, drawings, illustrations, photographs, downloads and other original material published on this website are protected by copyright under Australian law. They may not be copied, reproduced, republished, distributed, adapted or commercially used without prior written permission.</p>
    <p>TRUE NORTH® is a registered trade mark owned by Anthony Stuart Marshall in Australia in Classes 37 and 42.</p>
  </div>
</footer>

<div class="search" id="search" hidden role="dialog" aria-modal="true" aria-label="Search the site">
  <div class="search-box">
    <div class="in"><svg class="icon" style="color:var(--ink-3)"><use href="#i-search"/></svg><input id="q" type="search" placeholder="Search stages, tools, plans and pages" autocomplete="off" aria-label="Search"><button class="icon-btn" id="closeSearch" aria-label="Close search" style="width:34px;height:34px">${ic('close')}</button></div>
    <ul class="results" id="results"></ul>
  </div>
</div>

<script src="js/search-index.js"></script>
<script src="js/site.js"></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(OUT, file), html);
}

/* ------------------------------------------------------------- shared blocks */
function pageHero({ crumbs, eyebrow, title, lede, img, imgAlt, caption, num, actions }) {
  const crumbHtml = crumbs ? `<nav class="crumbs reveal" style="--d:.05s" aria-label="Breadcrumb"><ol>${crumbs.map((c, i) => i === crumbs.length - 1 ? `<li aria-current="page">${c[0]}</li>` : `<li><a href="${c[1]}">${c[0]}</a></li>`).join('')}</ol></nav>` : '';
  return `<section class="page-hero${img ? '' : ' no-image'}">
  <div class="wrap">
    <div class="copy">
      ${num ? `<span class="big-num" aria-hidden="true">${num}</span>` : ''}
      ${crumbHtml}
      <p class="eyebrow reveal" style="--d:.1s">${eyebrow}</p>
      <h1>
        ${lines(title)}
      </h1>
      ${lede ? `<p class="lede reveal" style="--d:.6s">${lede}</p>` : ''}
      ${actions ? `<div class="actions reveal" style="--d:.75s">${actions}</div>` : ''}
    </div>
    ${img ? `<figure><div class="frame"><img src="${img}" alt="${imgAlt}"></div>${caption ? `<figcaption class="reveal" style="--d:1.2s">${caption}</figcaption>` : ''}</figure>` : ''}
  </div>
</section>`;
}

const stageBar = cur => `<nav class="stagebar" aria-label="The 7 stages"><div class="wrap"><ol>${STAGES.map(s => `<li><a href="${s.slug}"${s.n < cur ? ' class="done"' : ''}${s.n === cur ? ' aria-current="step"' : ''}><span>${s.n}</span>${shortName(s)}</a></li>`).join('')}</ol></div></nav>`;

const cta = (h = 'Not sure what to do next?', p = 'Book a short phone or online consult. Tuesdays and Thursdays, 9–11 am and 1–3 pm AEST. A short call is free; a longer session is paid, when it is useful for your project.') => `<section class="cta">
  <div class="wrap">
    <div><h2>${h}</h2><p>${p}</p></div>
    <div class="actions"><a class="btn btn-yellow" href="consultations.html">Book a consultation</a><a class="btn btn-light" href="start-here.html">Start here</a></div>
  </div>
</section>`;

const stageCard = s => `<a class="stage-card sr-reveal" href="${s.slug}">
        <div class="ph"><img src="${s.card}" alt="" loading="lazy"><span class="n">${s.n}</span></div>
        <div class="txt"><h3>${s.name}</h3><p>${s.hint}.</p><span class="go">Explore ${shortName(s)} ${ic('arrow')}</span></div>
      </a>`;

const starts = `<div class="starts">
      <a class="start-card sr-reveal" href="stage-find.html"><span class="q">I’m finding land or assessing a property</span><span class="a">Start with <b>Find</b> and <b>Evaluate</b> ${ic('arrow')}</span></a>
      <a class="start-card sr-reveal" href="stage-design.html"><span class="q">I’m planning or designing a home</span><span class="a">Start with <b>Design</b> and <b>Budget</b> ${ic('arrow')}</span></a>
      <a class="start-card sr-reveal" href="stage-approvals.html"><span class="q">I already have plans or a builder</span><span class="a">Start with <b>Approvals</b> and <b>Contract &amp; Build</b> ${ic('arrow')}</span></a>
    </div>`;

const disclaimer = `<div class="callout">${ic('info')}<p><b>This is our story.</b> What worked for us may be useful for your situation. True North provides independent education and guidance; it does not replace your builder, architect, certifier, engineer, lawyer or financial adviser.</p></div>`;

/* ================================================================== HOME */
function home() {
  const slides = [
    { k: 'home', bg: 'img/bg-home.jpg', alt: 'A True North designed home with skillion roofs set among native trees', fx: '55%',
      html: `<p class="kicker reveal" style="--d:.1s">For home builders, owner builders &amp; renovators</p>
          <h1>${lines(['Avoid costly', 'building mistakes', '<em>before they happen.</em>'])}</h1>
          <p class="sub reveal" style="--d:.7s">Independent guidance, practical tools and proven information for Australians planning to build, renovate or buy property — backed by more than 40 years of real building experience.</p>
          <div class="actions reveal" style="--d:.85s"><a class="btn btn-yellow" href="journey.html">Start your building journey ${ic('arrow')}</a><a class="btn btn-light" href="resources.html">Browse tools &amp; downloads</a></div>` },
    ...STAGES.map(s => ({ k: s.k, bg: s.bg, alt: s.bgAlt, n: s.n,
      html: `<p class="kicker reveal" style="--d:.1s">Stage ${String(s.n).padStart(2, '0')} of 07 · ${s.name}</p>
          <h2>${lines(s.title)}</h2>
          <p class="sub reveal" style="--d:.6s">${s.intro}</p>
          <div class="topics reveal" style="--d:.75s">${s.topics.slice(0, 4).map(t => `<span>${t}</span>`).join('')}</div>
          <div class="actions reveal" style="--d:.9s"><a class="btn btn-yellow" href="${s.slug}">Explore ${shortName(s)} ${ic('arrow')}</a><a class="btn btn-light" href="journey.html">All 7 stages</a></div>` }))
  ];

  const slider = `<section class="slider" aria-roledescription="carousel" aria-label="True North and the seven-stage homeowner journey" style="--dur:9s">
  <div class="slides">
${slides.map((s, i) => `    <div class="slide${i === 0 ? ' is-active' : ''}" role="group" aria-roledescription="slide" aria-label="${i === 0 ? 'Introduction' : 'Stage ' + s.n + ' of 7'}" id="slide-${s.k}"${i ? ' aria-hidden="true"' : ''}>
      <div class="bg">
        <!-- VIDEO OPTION: replace the <img> with
             <video src="video/${s.k}.mp4" poster="${s.bg}" muted playsinline loop preload="metadata"></video> -->
        <img src="${s.bg}" alt="" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} style="--fx:${s.fx || '50%'}">
      </div>
      ${s.n ? `<span class="big-stage" aria-hidden="true">0${s.n}</span>` : ''}
      <div class="content">
          ${s.html}
      </div>
    </div>`).join('\n')}
  </div>

  <div class="hero-fx" aria-hidden="true">
    <svg class="path" viewBox="0 0 660 340">
      <path class="arc" d="M20 300 Q330 -60 640 300"/>
      <path class="arc-solid" d="M20 300 Q330 -60 640 300"/>
      <circle class="sun-glow" r="34" cx="0" cy="0"/>
      <circle class="sun" r="14" cx="0" cy="0"/>
    </svg>
    <div class="compass">${COMPASS}</div>
  </div>

  <div class="s-ui">
    <div class="wrap">
      <div class="s-tabs" role="tablist" aria-label="Choose a slide">
        ${slides.map((s, i) => `<button class="s-tab" role="tab" aria-controls="slide-${s.k}" aria-selected="${i === 0}" ${i ? 'tabindex="-1"' : ''}><span class="bar"><i></i></span><span class="t">${i === 0 ? '<b>★</b><span>Welcome</span>' : `<b>0${s.n}</b><span>${shortName(stageBy[s.k])}</span>`}</span></button>`).join('\n        ')}
      </div>
      <div class="s-btns">
        <button class="s-btn s-prev" aria-label="Previous slide">${ic('left')}</button>
        <button class="s-btn s-pause" aria-label="Pause slideshow">${ic('pause')}</button>
        <button class="s-btn s-next" aria-label="Next slide">${ic('arrow')}</button>
      </div>
    </div>
  </div>
</section>`;

  const featured = [
    ['Owner Builder Cost Planner', 'Cost centres, instructions and a worked example, in one branded spreadsheet.', 'img/s-budget.jpg', 'soon', 'stage-budget.html'],
    ['Specwriter', 'An Australian specification generator built on True North’s own specification.', '', 'dev', 'resources.html#tools'],
    ['Study Plan Portfolio', 'Selected True North designs, offered as a starting point for owners and owner builders.', 'img/p-gull.jpg', 'soon', 'house-plans.html'],
    ['Home Energy Audit', 'Basic, Standard and Advanced audits for homes on the NSW South Coast.', 'img/ph-headland-dining.jpg', 'service', 'energy-audit.html']
  ];

  const body = `${slider}

<div class="proof">
  <div class="wrap">
    <div><b>40<sup>+</sup></b><span>years in home building and design</span></div>
    <div><b>No.&nbsp;40</b><span>HIA GreenSmart Professional, accredited 1999</span></div>
    <div><b>5★ → 8★</b><span>NatHERS-rated homes, from 1998 to today</span></div>
    <div><b>Awards</b><span>HIA and Shoalhaven environmental design awards</span></div>
  </div>
</div>

<section class="section">
  <div class="wrap intro">
    <div class="section-head sr-reveal">
      <p class="eyebrow">What True North does</p>
      <h2>Independent help for every decision</h2>
    </div>
    <div class="sr-reveal" style="display:grid;gap:18px">
      <p class="big">TRUE NORTH<sup>®</sup> helps aspiring home builders <strong>make informed decisions, avoid costly mistakes</strong> and move confidently from finding land through design, costing, contracts, construction and handover.</p>
      <p class="lede">We provide practical, independent guidance, proven checklists and easy-to-use tools based on more than 40 years of real building experience. We no longer design or build — we share what we learned.</p>
    </div>
  </div>
</section>

<section class="section tint" id="journey">
  <div class="wrap">
    <div class="section-head row sr-reveal">
      <div style="display:grid;gap:14px"><p class="eyebrow">The seven-stage homeowner journey</p><h2>Where are you in your project?</h2><p class="lede">Choose your stage. Each one has a short overview, common mistakes, practical steps and the guides and tools that help.</p></div>
      <a class="btn btn-ghost" href="journey.html">See the full journey</a>
    </div>
    <div class="stage-cards">
      ${STAGES.map(stageCard).join('\n      ')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head sr-reveal"><p class="eyebrow">Where should I start?</p><h2>Three easy ways in</h2></div>
    ${starts}
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="section-head row sr-reveal">
      <div style="display:grid;gap:14px"><p class="eyebrow">Tools &amp; downloads</p><h2>Practical True North resources</h2></div>
      <a class="btn btn-ghost" href="resources.html">View all tools &amp; resources</a>
    </div>
    <div class="products">
      ${featured.map(([t, p, img, st, href]) => `<a class="product sr-reveal" href="${href}"><div class="ph${img ? '' : ' icon-ph'}">${img ? `<img src="${img}" alt="" loading="lazy">` : `<svg><use href="#i-tool"/></svg>`}</div><div class="txt"><div class="row">${chip(st)}</div><h3>${t}</h3><p>${p}</p></div></a>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap trust">
    <div class="sr-reveal" style="display:grid;gap:18px;align-content:start">
      <p class="eyebrow">Why trust True North</p>
      <h2>Four decades of building, done properly</h2>
      <p class="lede">Tony and Lucy Marshall formed True North Design Co in 1998 on the NSW South Coast, designing and building energy-efficient, site-specific homes. That experience is now shared as independent guidance.</p>
      <div class="creds"><img src="img/greensmart.jpg" alt="HIA GreenSmart Professional logo"><span>GreenSmart Professional No. 40<br>HIA Gold Member No. 386502</span></div>
      <div class="actions"><a class="btn btn-primary" href="about.html">Our story ${ic('arrow')}</a><a class="btn btn-ghost" href="about.html#awards">All awards</a></div>
    </div>
    <ol class="timeline sr-reveal">
      ${AWARDS.filter(a => a[3] === 'Winner').map(awardLi).join('\n      ')}
      <li><span class="yr">1999</span><div class="card"><div><span class="lbl">Accreditation</span><b>HIA GreenSmart Professional No. 40</b><small>Among the first GreenSmart Professionals in Australia</small></div><img src="img/greensmart.jpg" alt="" loading="lazy" style="object-fit:contain;background:#fff"></div></li>
      <li><span class="yr">1998</span><div class="card"><div><span class="lbl">Founded</span><b>True North Design Co formed</b><small>First home achieved a 5-star NatHERS rating with single-glazed cedar windows</small></div><img src="img/story.jpg" alt="" loading="lazy"></div></li>
    </ol>
  </div>
</section>

<section class="section dark">
  <div class="wrap">
    <div class="section-head sr-reveal"><p class="eyebrow">Client testimonials</p><h2>In their words</h2></div>
    <div class="quotes">
      ${['paul', 'kerry', 'marg'].map(k => `<div class="sr-reveal">${quoteFig(k, 'quote-card')}</div>`).join('\n      ')}
    </div>
    <p style="margin-top:24px"><a class="btn btn-light" href="about.html#testimonials">Read more testimonials</a></p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head row sr-reveal">
      <div style="display:grid;gap:14px"><p class="eyebrow">Learning Centre</p><h2>Short, practical answers</h2><p class="lede">Plain-English articles and short videos across all seven stages, published regularly.</p></div>
      <a class="btn btn-ghost" href="learning-centre.html">Visit the Learning Centre</a>
    </div>
    <div class="products three">
      ${[['Bushfire: what BAL means', 'img/b-bushfire.jpg', 'evaluate'], ['Windows', 'img/b-windows.jpg', 'design'], ['Energy rating and BASIX', 'img/b-nathers.jpg', 'approvals']].map(([t, img, k]) => `<a class="product sr-reveal" href="learning-centre.html"><div class="ph"><img src="${img}" alt="" loading="lazy"></div><div class="txt"><div class="row"><span class="chip">Stage ${stageBy[k].n} · ${shortName(stageBy[k])}</span>${chip('soon')}</div><h3>${t}</h3></div></a>`).join('\n      ')}
    </div>
  </div>
</section>

${cta()}`;

  layout({ file: 'index.html', title: 'True North | Independent guidance for home builders and renovators', desc: 'Avoid costly building mistakes before they happen. Independent guidance, practical tools and proven information for Australians planning to build or renovate, from more than 40 years of real building experience.', section: 'home', body, keywords: 'home start' });
}

function awardLi(a) {
  const [yr, title, org, result, img] = a;
  return `<li${result === 'Winner' ? ' class="win"' : ''}><span class="yr">${yr}</span><div class="card"><div><span class="lbl">${result}</span><b>${title}</b><small>${org}</small></div>${img ? `<img src="${img}" alt="" loading="lazy">` : ''}</div></li>`;
}

/* ================================================================ STAGES */
function stagePage(s, idx) {
  const prev = STAGES[idx - 1], next = STAGES[idx + 1];
  const res = s.resources.map(([type, t, meta, st]) => `<a class="res ${type}" href="resources.html"><span class="ic">${type === 'vid' ? ic('play', ' style="width:20px;height:20px"') : ic('pdf', ' style="width:22px;height:22px"')}</span><span><b>${t}</b><small>${meta}</small><br>${chip(st)}</span></a>`)
    .concat(s.tools.map(t => { const r = RESOURCES.find(x => x[2] === t); return `<a class="res tool" href="resources.html#tools"><span class="ic">${ic('tool', ' style="width:22px;height:22px"')}</span><span><b>${t}</b><small>Tool</small><br>${chip(r ? r[4] : 'soon')}</span></a>`; }));

  const body = `${pageHero({
    crumbs: [['Home', 'index.html'], ['Building Journey', 'journey.html'], [`Stage ${s.n} · ${s.name}`]],
    eyebrow: `Stage ${s.n} of 7`, title: s.title, lede: s.intro, num: '0' + s.n,
    img: s.bg, imgAlt: s.bgAlt, caption: 'True North project photo',
    actions: `<a class="btn btn-primary" href="#downloads">Guides &amp; tools ${ic('arrow')}</a><a class="btn btn-ghost" href="#video">Watch the video</a>`
  })}
${stageBar(s.n)}

<section class="section">
  <div class="wrap split top">
    <div class="prose sr-reveal">
      <p class="eyebrow">The problem</p>
      <h2>${s.problem}</h2>
    </div>
    <div class="prose sr-reveal">
      <p class="eyebrow">Why it matters</p>
      <p style="font-size:1.15rem">${s.why}</p>
      <h3>What this stage covers</h3>
      <ul class="checklist">${s.topics.map(t => `<li>${t}</li>`).join('')}</ul>
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap split top">
    <div class="sr-reveal">
      <div class="section-head"><p class="eyebrow">Practical steps</p><h2>How to approach ${shortName(s).toLowerCase()}</h2></div>
      <ol class="steps">${s.steps.map(([b, p]) => `<li><div><b>${b}</b><p>${p}</p></div></li>`).join('')}</ol>
    </div>
    <div class="sr-reveal" id="video" style="display:grid;gap:16px;position:sticky;top:110px">
      <div class="video"><img src="${s.card}" alt="" loading="lazy"><div class="play"><span>${ic('play', ' style="width:28px;height:28px"')}</span><b>${s.resources.find(r => r[0] === 'vid')?.[1] || s.name}</b><small>Short video · coming soon</small></div></div>
      ${s.quote ? quoteFig(s.quote) : ''}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head sr-reveal"><p class="eyebrow">Common mistakes</p><h2>What catches people out</h2></div>
    <ul class="mistakes">${s.mistakes.map(([b, p]) => `<li class="sr-reveal"><b>${b}</b>${p}</li>`).join('')}</ul>
    <div style="display:grid;gap:12px;margin-top:28px">
      <div class="callout warn">${ic('warn')}<p><b>Before you rely on this:</b> ${s.caution}</p></div>
      ${s.tip ? `<div class="callout green">${ic('leaf')}<p><b>Tip:</b> ${s.tip}</p></div>` : ''}
    </div>
  </div>
</section>

<section class="section tint" id="downloads">
  <div class="wrap">
    <div class="section-head sr-reveal"><p class="eyebrow">Guides, videos &amp; tools</p><h2>Resources for ${shortName(s).toLowerCase()}</h2><p class="lede">A free 2–5 page guide and a short video for this stage, plus the True North tools that help.</p></div>
    <div class="resources sr-reveal">${res.join('\n      ')}</div>
  </div>
</section>

<section class="section">
  <div class="wrap pager">
    ${prev ? `<a class="prev" href="${prev.slug}"><small>← Previous stage</small><b>${prev.n} · ${prev.name}</b></a>` : `<a class="prev" href="journey.html"><small>← Overview</small><b>All 7 stages</b></a>`}
    ${next ? `<a class="next" href="${next.slug}"><small>Next stage →</small><b>${next.n} · ${next.name}</b></a>` : `<a class="next" href="resources.html"><small>Next →</small><b>Tools &amp; Downloads</b></a>`}
  </div>
</section>

${cta(`Questions about ${shortName(s).toLowerCase()}?`)}`;

  layout({ file: s.slug, title: `Stage ${s.n}: ${s.name} | True North`, desc: s.intro, section: 'journey', body, searchCat: 'Stage', keywords: s.topics.join(' ') + ' ' + s.hint });
}

/* =============================================================== JOURNEY */
function journey() {
  const body = `${pageHero({
    crumbs: [['Home', 'index.html'], ['Building Journey']],
    eyebrow: 'The seven-stage homeowner journey', title: ['From finding land', 'to <em>handover</em>'],
    lede: 'Seven stages, in the order homeowners meet them. Land and renovation paths start differently, then come together at Design.',
    img: 'img/bg-home.jpg', imgAlt: 'A True North designed home among native trees', caption: 'True North project photo'
  })}
${stageBar(0)}

<section class="section">
  <div class="wrap">
    <div class="section-head sr-reveal"><p class="eyebrow">Choose your stage</p><h2>Where are you now?</h2></div>
    <div class="stage-cards">${STAGES.map(stageCard).join('')}</div>
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="section-head sr-reveal"><p class="eyebrow">At a glance</p><h2>What each stage covers</h2></div>
    <div class="topic-groups">
      ${STAGES.map(s => `<a class="topic-group sr-reveal" href="${s.slug}" style="text-decoration:none;color:inherit"><h3><span>${s.n}</span>${s.name}</h3><ul>${s.topics.map(t => `<li>${t}</li>`).join('')}</ul></a>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head sr-reveal"><p class="eyebrow">Not sure?</p><h2>Three easy ways in</h2></div>
    ${starts}
    <div style="margin-top:28px">${disclaimer}</div>
  </div>
</section>

${cta()}`;
  layout({ file: 'journey.html', title: 'The Seven-Stage Homeowner Journey | True North', desc: 'Find, Evaluate, Design, Budget, Approvals, Contract & Build, Handover — the True North pathway for homeowners.', section: 'journey', body, keywords: 'building process stages pathway' });
}

/* ============================================================ START HERE */
function startHere() {
  const body = `${pageHero({
    crumbs: [['Home', 'index.html'], ['Start Here']],
    eyebrow: 'Start here', title: ['Build with knowledge,', '<em>not guesswork</em>'],
    lede: 'Who we are, what we did, how we might help you now — and how to use this site.',
    img: 'img/story.jpg', imgAlt: 'True North studio desk with plans and a computer', caption: 'The True North studio'
  })}

<section class="section">
  <div class="wrap split">
    <div class="video sr-reveal"><img src="img/bg-home.jpg" alt="" loading="lazy"><div class="play"><span>${ic('play', ' style="width:28px;height:28px"')}</span><b>Our story</b><small>Video · coming soon</small></div></div>
    <div class="prose sr-reveal">
      <p class="eyebrow">Who we are</p>
      <h2>Tony and Lucy Marshall, True North Design Co</h2>
      <p>We formed True North Design Co in 1998, after twenty years in home building and design. For more than two decades we designed and built individually designed, energy-efficient homes, renovations and additions on the NSW South Coast.</p>
      <p>The Currowan bushfire on 4 January 2020 destroyed our property, our office and our business. We have rebuilt, and True North has changed: <strong>we no longer design or build.</strong> Instead we share what we learned, as independent education and guidance for Australian homeowners.</p>
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap">
    <div class="section-head sr-reveal"><p class="eyebrow">How the site works</p><h2>Three steps</h2></div>
    <ol class="steps sr-reveal">
      <li><div><b>Find your stage</b><p>Pick the stage you’re at — from finding land to handover. Each stage page explains the problem, why it matters and the practical steps.</p></div></li>
      <li><div><b>Get the free guide</b><p>Each stage will have a free 2–5 page guide and a short video explaining the subject.</p></div></li>
      <li><div><b>Go deeper when it helps</b><p>Use the tools and paid guides, browse the study plans, or book a consultation if you need advice on your project.</p></div></li>
    </ol>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head sr-reveal"><p class="eyebrow">Where should I start?</p><h2>Choose your way in</h2></div>
    ${starts}
    <div style="margin-top:28px">${disclaimer}</div>
  </div>
</section>

${cta()}`;
  layout({ file: 'start-here.html', title: 'Start Here | True North', desc: 'Who True North is, what we did, how we might help you now, and how this site works.', section: 'start', body, keywords: 'our story video who we are how the site works disclaimer' });
}

/* ============================================================ HOUSE PLANS */
function housePlans() {
  const body = `${pageHero({
    crumbs: [['Home', 'index.html'], ['House Plans']],
    eyebrow: 'Study Plan Portfolio', title: ['Proven plans', 'to <em>start from</em>'],
    lede: 'We no longer design or build. We offer these True North designs as a starting point for owners and owner builders.',
    img: 'img/p-cloudbreak.jpg', imgAlt: 'Cloudbreak, a True North coastal home', caption: 'Cloudbreak'
  })}

<section class="section">
  <div class="wrap">
    <div class="cat-nav sr-reveal" data-filter-group="planGrid" aria-label="Filter plans">
      <button data-f="all" aria-pressed="true">All plans</button><button data-f="coastal" aria-pressed="false">Coastal</button><button data-f="rural" aria-pressed="false">Rural &amp; sloping</button><button data-f="small" aria-pressed="false">Small homes</button>
    </div>
    <div class="plans" id="planGrid">
      ${PLANS.map(p => `<a class="plan sr-reveal" href="contact.html" data-cat="${p.f}"><div class="ph"><img src="${p.img}" alt="${p.n}, a True North design" loading="lazy"></div><h3>${p.n}</h3><div class="tags">${p.tags.map(t => `<span class="chip">${t}</span>`).join('')}${chip('soon')}</div></a>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap split top">
    <div class="prose sr-reveal">
      <p class="eyebrow">About study plans</p>
      <h2>What a study plan is — and isn’t</h2>
      <p>Each study plan presents a True North design: an overview, key features and the thinking behind it. Some plans will be free and some paid.</p>
      <p><strong>He who owns the plan owns the copyright.</strong> Each plan comes with a licence that lets you take it to a drafting company to modify for your own build.</p>
      <p>A study plan is not a set of construction documents. Your drafter, engineer, energy assessor and certifier remain responsible for documentation and approvals for your site.</p>
    </div>
    <div class="sr-reveal" style="display:grid;gap:14px">
      <div class="callout">${ic('info')}<p><b>Growing collection.</b> The True North archive holds around 100 study-plan brochures. Plans will be added progressively, starting with a curated selection.</p></div>
      ${quoteFig('lynPlans')}
    </div>
  </div>
</section>

${cta('Want to talk about a plan?', 'Ask about a design, its licence or how to adapt it to your site.')}`;
  layout({ file: 'house-plans.html', title: 'House Plans — Study Plan Portfolio | True North', desc: 'Selected True North designs offered as study plans and a starting point for owners and owner builders.', section: 'plans', body, keywords: PLANS.map(p => p.n).join(' ') + ' study plan portfolio copyright licence' });
  PLANS.forEach(p => search.push({ t: p.n + ' — study plan', k: p.tags.join(' ').toLowerCase(), u: 'house-plans.html', c: 'Plan' }));
}

/* ============================================================== RESOURCES */
function resources() {
  const cats = [['guides', 'Guides &amp; checklists'], ['tools', 'Costing &amp; specification tools'], ['energy', 'Energy']];
  const item = r => { const [cat, icn, t, p, st, stg] = r; return `<div class="res-item" data-cat="${cat} ${stg}"><span class="ic">${ic(icn)}</span><div><b>${t}</b><p>${p}</p></div><div class="meta">${chip(st)}${stg !== 'all' ? `<a class="chip" href="${stageBy[stg].slug}" style="text-decoration:none">Stage ${stageBy[stg].n} · ${shortName(stageBy[stg])}</a>` : '<span class="chip">All stages</span>'}</div></div>`; };
  const body = `${pageHero({
    crumbs: [['Home', 'index.html'], ['Tools &amp; Downloads']],
    eyebrow: 'Tools &amp; downloads', title: ['Tools built', 'on <em>real jobs</em>'],
    lede: 'Guides, checklists, spreadsheets and tools from True North’s own systems — made simple enough for owners and owner builders.',
    img: 'img/s-budget.jpg', imgAlt: 'Calculator, scale ruler and highlighter on building plans'
  })}

<section class="section">
  <div class="wrap">
    <div class="cat-nav" data-filter-group="resList" aria-label="Filter resources">
      <button data-f="all" aria-pressed="true">Everything</button>${cats.map(([k, l]) => `<button data-f="${k}" aria-pressed="false">${l}</button>`).join('')}${STAGES.map(s => `<button data-f="${s.k}" aria-pressed="false">${s.n}. ${shortName(s)}</button>`).join('')}
    </div>
    <div class="res-list" id="resList">
      ${cats.map(([k, l]) => `<h2 class="sr-reveal" id="${k}" data-cat="${k}" style="font-size:1.6rem;margin-top:22px">${l}</h2>\n      ${RESOURCES.filter(r => r[0] === k).map(item).join('\n      ')}`).join('\n      ')}
    </div>
    <div style="margin-top:28px;display:grid;gap:12px">
      <div class="callout">${ic('info')}<p><b>Released when ready.</b> Each resource is published only after it has been tested and has clear instructions, a version date and a licence. Tools marked “In development” are not yet available.</p></div>
    </div>
  </div>
</section>

${cta('Need help choosing?', 'A short call can point you to the right guide or tool for your stage.')}`;
  layout({ file: 'resources.html', title: 'Tools & Downloads | True North', desc: 'Guides, checklists, cost planners, specification tools and energy resources for homeowners.', section: 'resources', body, keywords: 'downloads shop guides checklists spreadsheets' });
  RESOURCES.forEach(r => search.push({ t: r[2], k: (r[3] + ' ' + r[0]).toLowerCase(), u: 'resources.html', c: 'Resource' }));
}

/* =========================================================== ENERGY AUDIT */
function energy() {
  const body = `${pageHero({
    crumbs: [['Home', 'index.html'], ['Home Energy Audit']],
    eyebrow: 'TRUE NORTH® Home Energy Audit', title: ['Too hot, too cold', 'or <em>too costly to run?</em>'],
    lede: 'A practical audit of how your home uses energy, with clear, prioritised improvements — for homes on the NSW South Coast.',
    img: 'img/b-nathers.jpg', imgAlt: 'NatHERS energy rating certificate'
  })}

<section class="section">
  <div class="wrap">
    <div class="section-head sr-reveal"><p class="eyebrow">Three levels</p><h2>Choose the audit that suits</h2></div>
    <div class="tiers">
      <div class="tier sr-reveal"><span class="tag">Level 1</span><h3>Basic</h3><p>A focused look at the main reasons your home is uncomfortable or costly to run.</p>${chip('soon')}</div>
      <div class="tier feature sr-reveal"><span class="tag">Level 2</span><h3>Standard</h3><p>A fuller audit with a written report and prioritised improvements.</p>${chip('soon')}</div>
      <div class="tier sr-reveal"><span class="tag">Level 3</span><h3>Advanced</h3><p>A detailed assessment for renovations, additions or major upgrades.</p>${chip('soon')}</div>
    </div>
    <p class="lede" style="margin-top:20px">Scope, service area and pricing for each level will be confirmed before bookings open.</p>
  </div>
</section>

<section class="section tint">
  <div class="wrap split">
    <div class="prose sr-reveal">
      <p class="eyebrow">Free first step</p>
      <h2>10 reasons your home may be too hot, too cold or expensive to run</h2>
      <p>A free checklist to help you spot the most common problems yourself — orientation, shading, insulation, windows, draughts and more.</p>
      <p>Prefer to do it yourself? The <strong>Home Audit Local Area Worksheet</strong> walks you through your own audit.</p>
      <div class="actions">${chip('free')}${chip('soon')}</div>
    </div>
    <div class="sr-reveal">${quoteFig('paul')}</div>
  </div>
</section>

${cta('Ask about an audit', 'Tell us about your home and what isn’t working. We’ll suggest the right level.')}`;
  layout({ file: 'energy-audit.html', title: 'Home Energy Audit | True North', desc: 'Basic, Standard and Advanced home energy audits on the NSW South Coast, plus a free energy checklist.', section: '', body, searchCat: 'Service', keywords: 'energy audit nathers hot cold running cost' });
}

/* ========================================================= CONSULTATIONS */
function consult() {
  const body = `${pageHero({
    crumbs: [['Home', 'index.html'], ['Consultations']],
    eyebrow: 'Phone &amp; online consultations', title: ['Independent advice,', '<em>when you need it</em>'],
    lede: 'Short, tightly scoped sessions to help you interpret a site, a brief, a quotation, a plan or a decision.',
    img: 'img/ph-casaverde.jpg', imgAlt: 'Living room in a True North home'
  })}

<section class="section">
  <div class="wrap">
    <div class="section-head sr-reveal"><p class="eyebrow">Session types</p><h2>How we can help</h2></div>
    <div class="tiers">
      <div class="tier sr-reveal"><span class="tag">Free</span><h3>Short call</h3><p>A quick question, a quick answer — and a pointer to the right stage or resource.</p></div>
      <div class="tier feature sr-reveal"><span class="tag">Paid</span><h3>30-minute direction call</h3><p>Talk through where you are, what to do next and what to watch out for.</p></div>
      <div class="tier sr-reveal"><span class="tag">Paid</span><h3>Plan, brief or quote review</h3><p>A review of your brief, plan or quotation, or help preparing for builders’ quotes.</p></div>
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap contact">
    <div class="prose sr-reveal">
      <p class="eyebrow">Booking</p>
      <h2>Tuesdays and Thursdays</h2>
      <p>Phone or online sessions are booked in advance, with a short intake form so we can prepare.</p>
      <div class="hours">
        <div class="h"><span>Consult times</span><span>AEST</span></div>
        <table><tr><td>Tuesday</td><td>9–11 am · 1–3 pm</td></tr><tr><td>Thursday</td><td>9–11 am · 1–3 pm</td></tr></table>
        <div class="note"><span><b>Short call:</b> free.</span><span><b>Longer session:</b> paid, when it is useful for your project.</span></div>
      </div>
      <p style="margin-top:18px"><a class="btn btn-yellow" href="contact.html">Book a time ${ic('arrow')}</a></p>
    </div>
    <div class="sr-reveal" style="display:grid;gap:14px">
      <div class="callout warn">${ic('warn')}<p><b>Scope of advice.</b> Consultations are general, independent guidance. They are not certification, legal, engineering or financial advice, and do not replace the professionals your project needs.</p></div>
      ${quoteFig('lyn')}
    </div>
  </div>
</section>`;
  layout({ file: 'consultations.html', title: 'Consultations | True North', desc: 'Free short calls and paid phone or online sessions, Tuesdays and Thursdays.', section: '', body, searchCat: 'Service', keywords: 'consultation booking phone online advice review' });
}

/* ================================================================= ABOUT */
function about() {
  const body = `${pageHero({
    crumbs: [['Home', 'index.html'], ['About']],
    eyebrow: 'About True North', title: ['40 years of', '<em>real building</em> experience'],
    lede: 'A South Coast, owner-operated design-and-build practice that combined practical building experience with site-specific, affordable and environmentally responsible home design.',
    img: 'img/a-speech.jpg', imgAlt: 'Tony Marshall at an awards presentation'
  })}

<section class="section">
  <div class="wrap split top">
    <div class="prose sr-reveal">
      <p class="eyebrow">Our story</p>
      <h2>Lucy and I formed True North Design Co in 1998</h2>
      <p>It was after 20 years in the home building and design industry that a couple from Sydney with small children came to us with a house plan they intended to build, looking True North over a beautiful valley in Milton. The design would not allow any winter sun or cooling summer breeze through the house, and its small windows did not take advantage of the magnificent views.</p>
      <p>I suggested to Paul and Bronwyn that we start a new design from scratch, and that is what we did. I asked John Ballinger, an architect from Kangaroo Valley who oversaw the creation of the CSIRO-designed software that became known as NatHERS, to run the model through various simulations. We achieved a 5-star rating with single-glazed cedar windows, and some twenty years later the house performs flawlessly all year round.</p>
    </div>
    <div class="prose sr-reveal">
      <p>Those early days of NatHERS training fuelled my interest in energy-efficient design. With new design technology and clever use of building materials, it is now possible to design 8-star energy-rated homes constructed from cheap, generically available materials — houses capable of heating themselves in winter and cooling themselves in summer with minimal use of external energy.</p>
      <p>It takes the same amount of time and materials to build a modern, sustainable house that performs well as it does a house that performs poorly. <strong>It’s all about how you site the house and put those materials together.</strong></p>
      <p style="font-family:var(--mono);font-size:.85rem;color:var(--ink-3)">— Tony Marshall</p>
    </div>
  </div>
</section>

<section class="section dark">
  <div class="wrap split">
    <div class="prose sr-reveal" style="color:#cfe4ec">
      <p class="eyebrow">2020 and beyond</p>
      <h2>After the fire, a new purpose</h2>
      <p>The Currowan bushfire on 4 January 2020 destroyed our property, our office and our business. We have rebuilt.</p>
      <p>True North is now an independent educational and guidance resource for Australian homeowners — helping people understand the building process, make better decisions earlier and avoid costly mistakes.</p>
    </div>
    <div class="media sr-reveal"><img src="img/bg-handover.jpg" alt="Living room of a rebuilt cabin" loading="lazy" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:4px"></div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head sr-reveal"><p class="eyebrow">Experience</p><h2>What shaped the advice</h2></div>
    <ul class="checklist sr-reveal">
      <li>Designing specifically for the site, climate, orientation and occupants</li>
      <li>Passive-solar principles and natural light</li>
      <li>Efficient use of space rather than simply a larger house</li>
      <li>Durable materials and modern construction methods</li>
      <li>Energy, water and broader environmental effects</li>
      <li>Designing to a realistic client budget</li>
      <li>Design, estimating and construction knowledge combined early</li>
      <li>Low/no-VOC paints and sustainable materials</li>
    </ul>
    <div class="creds sr-reveal" style="margin-top:28px"><img src="img/greensmart.jpg" alt="HIA GreenSmart Professional logo"><span>HIA GreenSmart Professional No. 40 (accredited 1999)<br>HIA Gold Member No. 386502 · NatHERS trained</span></div>
  </div>
</section>

<section class="section tint" id="awards">
  <div class="wrap trust">
    <div class="prose sr-reveal" style="align-content:start">
      <p class="eyebrow">Awards &amp; recognition</p>
      <h2>A multi-award-winning record</h2>
      <p>True North’s work received HIA recognition and Shoalhaven environmental design awards between 2001 and 2008, including the 2006 HIA South Coast Energy Efficient Housing award.</p>
      <p>Winners and finalists are listed separately, as recorded.</p>
    </div>
    <ol class="timeline sr-reveal">
      ${AWARDS.map(awardLi).join('\n      ')}
    </ol>
  </div>
</section>

<section class="section" id="testimonials">
  <div class="wrap">
    <div class="section-head sr-reveal"><p class="eyebrow">Client testimonials</p><h2>From the people we built for</h2></div>
    <div class="quotes">
      ${['lyn', 'david', 'paul', 'kerry', 'jen', 'marg', 'alison', 'lynPlans'].map(k => `<div class="sr-reveal">${quoteFig(k, 'quote-card')}</div>`).join('\n      ')}
    </div>
  </div>
</section>

${cta()}`;
  layout({ file: 'about.html', title: 'About True North | Our story, awards and testimonials', desc: 'Tony and Lucy Marshall formed True North Design Co in 1998. Our story, experience, awards and client testimonials.', section: 'about', body, keywords: 'history experience awards testimonials tony lucy marshall greensmart bushfire' });
}

/* ======================================================= LEARNING CENTRE */
function learning() {
  const body = `${pageHero({
    crumbs: [['Home', 'index.html'], ['Learning Centre']],
    eyebrow: 'Learning Centre', title: ['Short, practical', '<em>answers</em>'],
    lede: 'Plain-English articles and short videos across all seven stages. New articles are added regularly.',
    img: 'img/b-windows.jpg', imgAlt: 'Large windows in a True North living area',
    actions: `<button class="btn btn-primary" data-open-search>${ic('search')} Search the site</button>`
  })}

<section class="section">
  <div class="wrap">
    <div class="section-head sr-reveal"><p class="eyebrow">Topics by stage</p><h2>Articles on the way</h2></div>
    <div class="topic-groups">
      ${TOPICS.map(([k, list]) => `<div class="topic-group sr-reveal"><h3><span>${stageBy[k].n}</span><a href="${stageBy[k].slug}" style="color:inherit;text-decoration:none">${stageBy[k].name}</a></h3><ul>${list.map(t => `<li>${t} <span class="chip soon">Soon</span></li>`).join('')}</ul></div>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section tint">
  <div class="wrap split">
    <div class="prose sr-reveal">
      <p class="eyebrow">Follow along</p>
      <h2>Weekly articles and videos</h2>
      <p>Each article is also shared on Facebook, with short videos on YouTube.</p>
      <div class="actions"><a class="btn btn-ghost" href="#">Facebook</a><a class="btn btn-ghost" href="#">YouTube</a><a class="btn btn-ghost" href="#">Instagram</a></div>
    </div>
    <div class="video sr-reveal"><img src="img/ph-island.jpg" alt="" loading="lazy"><div class="play"><span>${ic('play', ' style="width:28px;height:28px"')}</span><b>Video library</b><small>Coming soon</small></div></div>
  </div>
</section>

${cta()}`;
  layout({ file: 'learning-centre.html', title: 'Learning Centre | True North', desc: 'Plain-English building articles and videos across the seven stages.', section: 'learn', body, keywords: 'blog articles building knowledge videos ' + TOPICS.map(t => t[1].join(' ')).join(' ') });
}

/* =============================================================== CONTACT */
function contact() {
  const body = `${pageHero({
    crumbs: [['Home', 'index.html'], ['Contact']],
    eyebrow: 'Contact', title: ['How can', 'we <em>help?</em>'],
    lede: 'Tell us about your block, your house or your problem. We’ll reply by email, or you can book a time to talk it through.'
  })}

<section class="section tint">
  <div class="wrap contact">
    <div class="sr-reveal">
      <div class="hours" style="margin-top:0">
        <div class="h"><span>Phone &amp; online consults</span><span>AEST</span></div>
        <table><tr><td>Tuesday</td><td>9–11 am · 1–3 pm</td></tr><tr><td>Thursday</td><td>9–11 am · 1–3 pm</td></tr></table>
        <div class="note"><span><b>Short call:</b> free. A quick question, a quick answer.</span><span><b>Longer session:</b> paid, when it is useful for your project.</span></div>
      </div>
      <p style="margin-top:18px"><a class="btn btn-yellow" href="consultations.html">Book a time</a></p>
    </div>
    <form class="enquiry sr-reveal" id="enquiry" novalidate>
      <div class="fields">
        <div class="field"><label for="f-name">Your name</label><input id="f-name" name="name" autocomplete="name" required></div>
        <div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
        <div class="field"><label for="f-phone">Phone</label><input id="f-phone" name="phone" type="tel" autocomplete="tel"></div>
        <div class="field"><label for="f-post">Postcode</label><input id="f-post" name="postcode" inputmode="numeric" maxlength="4" autocomplete="postal-code"></div>
        <div class="field full"><label for="f-stage">Which stage are you at?</label>
          <select id="f-stage" name="stage"><option value="">Not sure yet</option>${STAGES.map(s => `<option value="${s.k}">${s.n} · ${s.name}</option>`).join('')}</select></div>
        <div class="field full"><label for="f-msg">Details of your question</label><textarea id="f-msg" name="message" required placeholder="What are you planning, where, and what’s the problem?"></textarea><div class="count" id="count">0 / 200 words</div></div>
      </div>
      <div class="form-foot">
        <small>We’ll only use your details to reply to this enquiry. See our <a href="privacy.html">privacy policy</a>.</small>
        <button class="btn btn-primary" type="submit">Send enquiry ${ic('arrow')}</button>
      </div>
      <div class="sent" id="sent" hidden>Thanks. Your enquiry is ready to send once the site is connected to Wix Forms.</div>
    </form>
  </div>
</section>`;
  layout({ file: 'contact.html', title: 'Contact | True North', desc: 'Send an enquiry or book a phone or online consult with True North.', section: 'contact', body, keywords: 'enquiry form booking phone email' });
}

/* ================================================================= LEGAL */
function legalPage(file, title, eyebrow, html, draft) {
  const body = `${pageHero({ crumbs: [['Home', 'index.html'], [title]], eyebrow, title: [title] })}
<section class="section"><div class="wrap legal-body">
${draft ? `<div class="callout warn">${ic('warn')}<p><b>Draft.</b> This page is a placeholder and must be professionally reviewed before the site goes live.</p></div>` : ''}
${html}
</div></section>`;
  layout({ file, title: title + ' | True North', desc: title + ' — True North Design Co.', section: '', body, searchCat: 'Legal' });
}

function legal() {
  legalPage('copyright.html', 'Copyright &amp; Use', 'Legal', `
<p><b>Copyright © ${YEAR} True North Design Co. All rights reserved.</b></p>
<p>Unless otherwise stated, the original content of this website, including written articles, educational material, building guides, checklists, house plans, drawings, specifications, estimating information, photographs, illustrations, graphics, downloadable documents and other resources, is the copyright material of True North Design Co and/or Anthony Stuart Marshall.</p>
<p>The material is provided for personal information and educational use only. No part of this website may be reproduced, copied, republished, stored, transmitted, distributed, modified, adapted, sold or used for commercial purposes without prior written permission from the copyright owner, except where permitted by Australian copyright law.</p>
<h2>Automated systems</h2>
<p>Automated systems, web crawlers, artificial intelligence systems and data-mining services: access to this website does not grant permission to reproduce, republish, commercially exploit, create derivative collections from, or incorporate the copyright material into datasets, databases, machine-learning training datasets or other commercial information products without prior written permission.</p>
<p>Normal indexing of publicly accessible pages by legitimate search engines for the purpose of directing users to this website is permitted, subject to the website’s technical access settings and applicable law.</p>
<h2>Trade mark</h2>
<p>TRUE NORTH® is a registered trade mark owned by Anthony Stuart Marshall in Australia in Classes 37 and 42.</p>
<p>All third-party trade marks, photographs and other material remain the property of their respective owners.</p>`, false);

  legalPage('privacy.html', 'Privacy Policy', 'Legal', `
<p><b>Last updated: October 2026.</b> True North Design Co. ("True North", "we", "us") respects your privacy. This policy explains what personal information we collect through this website, how we use it, and the choices you have.</p>
<h2>What we collect</h2><p>Details you give us through the enquiry form or booking system — such as your name, email, phone, postcode and message — and details needed to deliver purchases or downloads. We may also collect basic, non-identifying usage information (such as pages visited and device type) to understand how the site is used.</p>
<h2>How we use it</h2><p>To reply to your enquiry, deliver what you have requested, manage bookings and, if you choose to subscribe, send occasional updates. We do not use your information for anything unrelated without asking you first.</p>
<h2>Who we share it with</h2><p>Only the service providers needed to run this website, such as hosting, payments and email. We do not sell or rent your information.</p>
<h2>Cookies and analytics</h2><p>This website may use cookies or similar technologies to keep the site working and measure usage. You can block or delete cookies in your browser settings; some features may not work as intended.</p>
<h2>Third-party links</h2><p>Our pages link to government, industry and other sites. We are not responsible for their content or privacy practices.</p>
<h2>Storage and security</h2><p>We take reasonable steps to protect your information from misuse, loss and unauthorised access, and keep it only as long as needed for the purposes above or as the law requires.</p>
<h2>Your choices and rights</h2><p>You can ask to see, correct or delete your information, or unsubscribe at any time, by contacting us via the <a href="contact.html">contact page</a>.</p>
<h2>Changes to this policy</h2><p>We may update this policy from time to time. The date above shows when it was last changed.</p>
<h2>Related pages</h2><p><a href="terms.html">Terms of use</a> · <a href="copyright.html">Copyright &amp; Use</a> · <a href="sitemap.html">Site map</a></p>`);

  legalPage('terms.html', 'Terms of use', 'Legal', `
<h2>Educational guidance only</h2><p>True North provides independent education and general guidance. It is not design, legal, engineering, certification, financial or building advice for your particular project, and does not replace those professionals.</p>
<h2>Location and currency</h2><p>Building, planning, energy and contract requirements differ between states and councils and change over time. Each resource carries a version date; always confirm current requirements for your location.</p>
<h2>Downloads, plans and licences</h2><p>Paid and free resources are licensed for personal use as described on each product. Study plans may be adapted only as permitted by their licence.</p>
<h2>Consultations</h2><p>Consultations are tightly scoped, booked in advance and limited to general guidance.</p>`, true);
}

/* =============================================================== SITEMAP */
function sitemap() {
  const body = `${pageHero({ crumbs: [['Home', 'index.html'], ['Site map']], eyebrow: 'Site map', title: ['Everything', 'on <em>one page</em>'] })}
<section class="section"><div class="wrap sitemap">
  <div><h3>Main</h3><ul><li><a href="index.html">Home</a></li><li><a href="start-here.html">Start Here</a></li><li><a href="journey.html">Building Journey</a></li><li><a href="house-plans.html">House Plans</a></li><li><a href="resources.html">Tools &amp; Downloads</a></li><li><a href="learning-centre.html">Learning Centre</a></li><li><a href="contact.html">Contact</a></li></ul></div>
  <div><h3>The 7 stages</h3><ul>${STAGES.map(s => `<li><a href="${s.slug}">${s.n}. ${s.name}</a></li>`).join('')}</ul></div>
  <div><h3>Services &amp; about</h3><ul><li><a href="energy-audit.html">Home Energy Audit</a></li><li><a href="consultations.html">Consultations</a></li><li><a href="about.html">About True North</a></li><li><a href="about.html#awards">Awards</a></li><li><a href="about.html#testimonials">Testimonials</a></li><li><a href="privacy.html">Privacy Policy</a></li><li><a href="terms.html">Terms of use</a></li><li><a href="copyright.html">Copyright &amp; Use</a></li><li><a href="index-onepage.html">One-page homepage</a></li><li><a href="studio-build-sheet.html">Studio build sheet</a></li></ul></div>
</div></section>`;
  layout({ file: 'sitemap.html', title: 'Site map | True North', desc: 'Every page on the True North website.', section: '', body });
}

/* ================================================================== RUN */
home(); journey(); startHere(); STAGES.forEach(stagePage); housePlans(); resources(); energy(); consult(); about(); learning(); contact(); legal(); sitemap();
fs.mkdirSync(path.join(OUT, 'js'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'js', 'search-index.js'), 'window.TN_INDEX=' + JSON.stringify(search) + ';\n');
console.log('Built ' + new Set(search.map(s => s.u)).size + ' pages, ' + search.length + ' search entries.');
