/* =====================================================================
   TRUE NORTH — SITE CONTENT
   All copy lives here. Edit, then run:  node build.js
   Sources: Tony's wireframe, Wix brief + history, 2026 project overview,
   "Lucy and I formed True North" story, awards record, client testimonial
   letters (2015–2018), the two designer guides, copyright/trade mark text.
   Stage copy is DRAFT wording from those sources, for Tony's review.
   ===================================================================== */

const STATUS = {
  free:   ['free', 'Free · coming soon'],
  soon:   ['soon', 'Coming soon'],
  dev:    ['dev',  'In development'],
  update: ['soon', 'Being updated'],
  video:  ['vid',  'Video · coming soon'],
  paid:   ['paid', 'Paid · coming soon'],
  later:  ['soon', 'Planned'],
  service:['green','Service']
};

/* ---------- genuine client testimonials (verified against letters) ---------- */
const QUOTES = {
  lyn:    { q: 'I feel very lucky that I came across Tony Marshall and his team as they just seemed to ‘get’ what our family is trying to build.', who: 'Lyn', where: 'Barrack Point, 2017' },
  lynPlans:{ q: 'All the builders who have quoted on the house have commented on the quality and detail of the plans and specifications.', who: 'Lyn', where: 'Barrack Point, 2017' },
  david:  { q: 'The house is very energy efficient and makes great use of the open-plan spaces. There were no ‘shocks’ during the building process and we are extremely happy with the end result.', who: 'David & Dianne', where: 'Narrawallee, 2016' },
  paul:   { q: 'Last summer, the hottest one on record, we used the air conditioner for a grand total of two days.', who: 'Paul & Rebecca', where: 'Shoebridge Lane' },
  kerry:  { q: 'The light in the house is extraordinary. As the whole house faces true(ish) north, all rooms are bathed in natural light.', who: 'Kerry & Hendre', where: 'Hedley Way, 2015' },
  jen:    { q: 'The process involved a lot of upfront planning so you knew where you stood and took any guess work out of the process.', who: 'Jennifer', where: 'Narrawallee' },
  marg:   { q: 'They led us through the design process, the daunting Council requirements and approvals, then onto the build.', who: 'Marg & John', where: 'Callala Beach' },
  alison: { q: 'You really have done a spectacular job in transforming the cottage and even more importantly, your commitment and thoughtfulness made the whole project comparatively easy.', who: 'Phillip & Alison', where: 'Berrara' }
};

/* ---------- the seven stages ---------- */
const STAGES = [
  {
    k: 'find', n: 1, name: 'Find', slug: 'stage-find.html',
    hint: 'Choosing land, or a house to renovate',
    card: 'img/s-find.jpg', bg: 'img/bg-find.jpg', bgAlt: 'Covered deck looking over McKeon Lake at Conjola',
    title: ['Find the right', '<em>block or house</em>'],
    intro: 'Before you fall for a view or a price, decide whether to build, buy, knock down or renovate, and learn what to look for when you inspect.',
    problem: 'Most people find a block or a house they like first, and check whether it suits their plans later. By then the deposit is paid and the problems are theirs.',
    why: 'The land decides what you can build, how the house will sit in the sun, and much of what it will cost. A steep, shaded or heavily constrained block can add significant cost before a single wall goes up.',
    topics: ['Build or buy?', 'Knock down, rebuild or renovate', 'Choosing land', 'Looking at a block', 'Looking at a house'],
    steps: [
      ['Decide your path', 'Build new, buy and renovate, or knock down and rebuild. Each path needs different checks, so be clear before you start looking.'],
      ['Check what the land allows', 'Ask council for the planning certificate and check zoning, easements, flood, bushfire and other overlays before you commit.'],
      ['Look at the block with the sun in mind', 'Note where north is, the slope, views, access, drainage and what the neighbours could build later.'],
      ['Look at a house with renovation in mind', 'Check structure, condition and layout. Ask whether it can be improved affordably, or whether knocking down is the better choice.']
    ],
    mistakes: [
      ['Buying on the view alone', 'A view to the south can mean living areas that never see winter sun.'],
      ['Ignoring the slope', 'Every metre of fall adds cost to footings, retaining walls and access.'],
      ['Skipping the planning certificate', 'Easements, overlays and building envelopes can rule out the house you have in mind.']
    ],
    caution: 'Planning rules differ between states and councils. Always confirm requirements with your local council and get professional advice for your property.',
    resources: [
      ['pdf', 'LAND — Finding the Right Land', 'Guide', 'free'],
      ['pdf', 'Land checklist (one page)', 'Checklist', 'free'],
      ['pdf', 'Renovate, extend or demolish and rebuild checklist', 'Checklist', 'soon'],
      ['vid', 'What to look for on your first visit', '3–5 minutes', 'video']
    ],
    tools: ['My Sun Compass'],
    quote: null
  },
  {
    k: 'evaluate', n: 2, name: 'Evaluate', slug: 'stage-evaluate.html',
    hint: 'Survey, contours and orientation',
    card: 'img/s-evaluate.jpg', bg: 'img/bg-evaluate.jpg', bgAlt: 'True North home on a sloping coastal street',
    title: ['Read the site', '<em>before you commit</em>'],
    intro: 'The survey plan tells you what the site will let you build. Orientation decides how the house will feel to live in.',
    problem: 'A block can look perfect on inspection day and still hide slope, drainage, shading or access problems that only show up on paper.',
    why: 'Evaluating the site properly is the cheapest point at which to change your mind. Everything you learn here feeds straight into the design and the budget.',
    topics: ['Survey plan', 'Contour map', 'Compass orientation', 'North arrow', 'Preliminary feasibility'],
    steps: [
      ['Get a detail and contour survey', 'It shows levels, boundaries, trees, services and neighbouring buildings — the base for every later drawing.'],
      ['Find true north', 'Magnetic north and true north are not the same. On the NSW South Coast the difference is about 12–13°, enough to change how the sun reaches your rooms.'],
      ['Map sun, wind and views', 'Mark winter sun, summer breezes, views and any overshadowing from trees or neighbours.'],
      ['Run a preliminary feasibility check', 'List the constraints and likely costs — slope, bushfire, stormwater, services — before you commit to a design.']
    ],
    mistakes: [
      ['Using magnetic north', 'Plans drawn from a compass reading can be turned the wrong way for the sun.'],
      ['Guessing the levels', 'Without a contour survey, footings and retaining costs are guesswork.'],
      ['Forgetting services', 'Sewer, stormwater and power connections can be costly on some blocks.']
    ],
    caution: 'Bushfire, flood and other site risks need assessment by qualified people. Use this stage to learn which reports your site will need.',
    resources: [
      ['pdf', 'Land and existing-home due diligence checklist', 'Preliminary feasibility', 'free'],
      ['pdf', 'Reading a survey plan', 'Guide', 'soon'],
      ['vid', 'Using the Sun Compass on your site', '3–5 minutes', 'video']
    ],
    tools: ['My Sun Compass', 'Preliminary House Estimator'],
    quote: 'kerry'
  },
  {
    k: 'design', n: 3, name: 'Design', slug: 'stage-design.html',
    hint: 'Sketches, brief and plans',
    card: 'img/s-design.jpg', bg: 'img/bg-design.jpg', bgAlt: 'Light-filled living room with high windows in a True North home',
    title: ['Sketch the ideas', 'that <em>fit the site</em>'],
    intro: 'Most of a home’s comfort and running cost is decided at the design stage. Start with a pencil, a notebook and the sun.',
    problem: 'Many plans are drawn for a generic block, or chosen from a brochure, and then forced onto a site they don’t suit.',
    why: 'It takes the same amount of time and materials to build a house that performs well as it does a house that performs poorly. It’s all about how you site the house and put those materials together.',
    topics: ['Sketching ideas', 'Pencil & notebook', 'Plans on the desk', 'Writing a design brief', 'Choosing a designer'],
    steps: [
      ['Write your design brief', 'Record how you live, the rooms you need, your priorities and your budget, on one or two pages.'],
      ['Orient the house first', 'Generally the long axis faces true north, with living areas on the northern side where they get winter sun and light.'],
      ['Think about mass, insulation and windows', 'Thermal mass, well-installed insulation and correctly sized and shaded windows do much of the heating and cooling for you.'],
      ['Choose the right designer', 'Ask about experience, energy rating, estimating and site visits before you sign a letter of engagement.'],
      ['Review the layout before it’s final', 'Walk through the plan room by room. Changes on paper are cheap; changes on site are not.']
    ],
    mistakes: [
      ['Plans that ignore the site', 'A plan that suits one block can be wrong for yours.'],
      ['Windows chosen for looks only', 'Unshaded west-facing glass can overheat rooms all summer.'],
      ['Designing past the budget', 'A design that can’t be built for your budget wastes time and fees.']
    ],
    caution: 'This is general guidance. Your designer, energy assessor and council will confirm what applies to your site.',
    tip: 'Consider the Livable Housing (Universal Design) guidelines, so the home suits every stage of life.',
    resources: [
      ['pdf', 'The nine questions you must discuss with a building designer', 'Guide', 'update'],
      ['pdf', 'How will I know I’ve found the right person to design my house?', 'Guide', 'update'],
      ['pdf', 'Home design brief worksheet', 'Worksheet', 'soon'],
      ['pdf', 'Climate-responsive home guide', 'Guide', 'soon'],
      ['vid', 'From sketch to floor plan', '3–5 minutes', 'video']
    ],
    tools: ['House Wizard Design Tool'],
    quote: 'lyn'
  },
  {
    k: 'budget', n: 4, name: 'Budget', slug: 'stage-budget.html',
    hint: 'Spreadsheets, cost centres, Specwriter',
    card: 'img/s-budget.jpg', bg: 'img/bg-budget.jpg', bgAlt: 'Cloudbreak, a True North home with a skillion roof and carport',
    title: ['Know the cost', '<em>before you commit</em>'],
    intro: 'Break the build into cost centres, write a proper specification and compare like with like.',
    problem: 'Budgets blow out when quotes are based on incomplete drawings, vague specifications and allowances that are only a guess.',
    why: 'Builders can only price what is documented. A detailed specification and schedules let you compare tenders “apples with apples”.',
    topics: ['Spreadsheet', 'Cost centres', 'Specwriter', 'Allowances & provisional sums', 'Contingency'],
    steps: [
      ['Set an early ballpark', 'Use a preliminary estimate before the design is final, so the house is drawn to your budget.'],
      ['Break it into cost centres', 'Site works, slab, frame, roof, windows, services, fit-out. Each can be checked and tracked.'],
      ['Write a specification', 'Spell out materials, finishes and inclusions. What the specification leaves out tends to come back later as a variation.'],
      ['Watch the allowances', 'PC items and provisional sums are estimates. Low allowances make a quote look cheaper than it is.'],
      ['Keep a contingency', 'Hold money back for the unexpected, especially for renovations and difficult sites.']
    ],
    mistakes: [
      ['Comparing quotes that aren’t alike', 'Different inclusions make the cheapest price misleading.'],
      ['Low provisional sums', 'They are often where the extra costs appear.'],
      ['No contingency', 'Every project meets something unexpected.']
    ],
    caution: 'Prices vary by location and over time. Treat any estimate as a guide and confirm costs with your builder and suppliers.',
    resources: [
      ['pdf', 'Owner Builder Cost Planner', 'Spreadsheet with worked example', 'soon'],
      ['pdf', 'Plain-English specification guide', 'Guide', 'soon'],
      ['vid', 'How builders price a house', '3–5 minutes', 'video']
    ],
    tools: ['Preliminary House Estimator', 'My Cost Centre Template', 'Cost Centre Estimator – Actual', 'Specwriter – specification generator'],
    quote: 'jen'
  },
  {
    k: 'approvals', n: 5, name: 'Approvals', slug: 'stage-approvals.html',
    hint: 'Reports, DA, CC and compliance',
    card: 'img/bg-approvals.jpg', bg: 'img/bg-approvals.jpg', bgAlt: 'Multi-level True North home among coastal eucalypts',
    title: ['Get through approvals', '<em>without delays</em>'],
    intro: 'Know which reports your council needs, the order they come in, and how to avoid requests for more information.',
    problem: 'Applications stall when reports are missing, drawings don’t match, or the design doesn’t meet a planning control.',
    why: 'Every request for more information adds weeks. A complete, consistent application is the quickest path to a start on site.',
    topics: ['Compliance reports', 'Development Approval (DA)', 'Construction Certificate (CC)', 'Energy rating', 'BASIX'],
    steps: [
      ['Find out what applies', 'Check your council’s planning controls and which approval pathway suits your project.'],
      ['Collect the reports early', 'Survey, energy rating (BASIX in NSW), bushfire, geotechnical, stormwater and others as required.'],
      ['Lodge a complete application', 'Make sure the drawings, reports and specification agree with each other.'],
      ['Understand DA and CC', 'In NSW a DA approves what you can build; the Construction Certificate confirms how it will be built. Other states use different terms.']
    ],
    mistakes: [
      ['Incomplete applications', 'Missing reports are the most common cause of delay.'],
      ['Reports that don’t match', 'Drawings and reports must describe the same house.'],
      ['Late design changes', 'Changing the design after approval can mean a modification or a new application.']
    ],
    caution: 'Approval processes differ between states and councils. Check with your council or a certifier for your project.',
    resources: [
      ['pdf', 'The approvals roadmap', 'Guide', 'soon'],
      ['vid', 'DA vs CC in plain English', '3–5 minutes', 'video']
    ],
    tools: [],
    quote: 'marg'
  },
  {
    k: 'build', n: 6, name: 'Contract & Build', short: 'Build', slug: 'stage-contract-build.html',
    hint: 'Tender, contract and construction',
    card: 'img/s-build.jpg', bg: 'img/bg-build.jpg', bgAlt: 'Newly finished open-plan interior with timber floors',
    title: ['Choose the builder,', '<em>sign with confidence</em>'],
    intro: 'Pre-qualify builders, run a fair tender, and understand what you are signing before work begins.',
    problem: 'Many owners choose on price alone, then discover what wasn’t included once the contract is signed.',
    why: 'The contract sets out who pays for what, when, and what happens when things change. Reading it carefully is far cheaper than a dispute.',
    topics: ['Contractor pre-qualification', 'Tender process', 'Contracts', 'Progress payments', 'Variations'],
    steps: [
      ['Pre-qualify builders', 'Check licences, insurance, recent work and references before you invite them to price.'],
      ['Tender with full documents', 'Give every builder the same drawings, specification and schedules so the prices can be compared.'],
      ['Compare quotes line by line', 'Look at inclusions, exclusions, allowances and the construction period, not just the total.'],
      ['Read the contract before you sign', 'Understand the payment schedule, the variations process, insurances and dispute steps.'],
      ['Keep everything in writing', 'Record decisions and variations as they happen during construction.']
    ],
    mistakes: [
      ['Choosing on price alone', 'The cheapest quote is often the least complete.'],
      ['Verbal variations', 'If it isn’t written down and priced, it will be argued about later.'],
      ['Paying ahead of progress', 'Payments should follow the stages set out in the contract.']
    ],
    caution: 'Building contracts are legal documents. Get independent legal advice before you sign.',
    resources: [
      ['pdf', '31-Point Home Building Contract Guide', 'Guide', 'soon'],
      ['pdf', 'Quotation and tender comparison guide', 'Guide', 'soon'],
      ['vid', 'Reading your building contract', '3–5 minutes', 'video']
    ],
    tools: ['Contracts Explained – worksheet'],
    quote: 'david'
  },
  {
    k: 'handover', n: 7, name: 'Handover', slug: 'stage-handover.html',
    hint: 'Site management, handover and warranty',
    card: 'img/bg-handover.jpg', bg: 'img/bg-handover.jpg', bgAlt: 'Lived-in living room with a wood heater in a rebuilt cabin',
    title: ['Finish well', '<em>and move in</em>'],
    intro: 'Good communication and site management carry you to a clean handover and a warranty you understand.',
    problem: 'The last weeks of a build are busy. Defects, missing items and paperwork are easy to miss in the rush to move in.',
    why: 'Once you take possession and make the final payment, it becomes harder to get defects fixed. A careful handover protects your investment.',
    topics: ['Communication', 'Site management', 'Practical completion', 'Handover', 'Warranty'],
    steps: [
      ['Stay in touch through the build', 'Regular site meetings and written notes keep small issues small.'],
      ['Inspect before practical completion', 'Walk every room with a checklist and list defects in writing.'],
      ['Collect the paperwork', 'Certificates, warranties, manuals and final approvals, such as an occupation certificate where required.'],
      ['Learn how the house works', 'Shading, ventilation, heating and maintenance all affect comfort and running costs.'],
      ['Know your warranty', 'Understand what is covered, for how long, and how to report defects.']
    ],
    mistakes: [
      ['Rushing the final inspection', 'Defects found after handover are harder to resolve.'],
      ['Missing certificates', 'You may need them for insurance, finance or selling later.'],
      ['No maintenance plan', 'A well-designed home still needs looking after.']
    ],
    caution: 'Statutory warranty periods and processes vary by state. Check the rules that apply to your contract.',
    resources: [
      ['pdf', 'Handover inspection checklist', 'Checklist', 'soon'],
      ['pdf', 'Homeowner manual — operating your new home', 'Guide', 'later'],
      ['vid', 'Your final inspection, step by step', '3–5 minutes', 'video']
    ],
    tools: [],
    quote: 'paul'
  }
];

/* ---------- study plans (from the True North archive) ---------- */
const PLANS = [
  { n: 'Cloudbreak', img: 'img/p-cloudbreak.jpg', f: 'coastal', tags: ['Coastal', 'Skillion roof'] },
  { n: 'Gull Cottage', img: 'img/p-gull.jpg', f: 'coastal', tags: ['Beach house', 'Tuross Head'] },
  { n: 'Woodburn Eco Cabin', img: 'img/p-woodburn.jpg', f: 'small', tags: ['Cabin', 'Small footprint'] },
  { n: 'Montague', img: 'img/p-montague.jpg', f: 'rural', tags: ['Rural', 'Self-sufficient'] },
  { n: 'Weemala', img: 'img/p-weemala.jpg', f: 'rural', tags: ['Sloping site', '3D model'] },
  { n: 'The Headland', img: 'img/p-headland.jpg', f: 'coastal', tags: ['Coastal', '2017'] },
  { n: 'Riversdale', img: 'img/p-riversdale.jpg', f: 'coastal', tags: ['Single storey', 'Stone walls'] },
  { n: 'Ray Residence', img: 'img/p-ray.jpg', f: 'rural', tags: ['Steep block', '3D model'] }
];

/* ---------- tools & downloads (priorities from Tony's resource list) ---------- */
const RESOURCES = [
  // [category, icon, title, description, status, stage]
  ['guides', 'pdf', 'Seven-stage Home Project Pathway', 'The free backbone of the site: Find, Evaluate, Design, Budget, Approvals, Contract & Build, Handover.', 'free', 'all'],
  ['guides', 'pdf', 'Homebuilding 101', 'A plain-English starting point for people who don’t yet know the full process.', 'free', 'all'],
  ['guides', 'pdf', 'LAND — Finding the Right Land', 'A substantial guide for the Find stage, with a one-page land checklist.', 'free', 'find'],
  ['guides', 'pdf', 'Land and existing-home due diligence checklist', 'Check constraints and costs before committing to a block or renovation property.', 'free', 'evaluate'],
  ['guides', 'pdf', 'Renovate, extend or demolish and rebuild checklist', 'A practical starting point for the renovation path.', 'soon', 'find'],
  ['guides', 'pdf', 'Home design brief and project briefing worksheets', 'Record needs, priorities, budget and site requirements before design begins.', 'soon', 'design'],
  ['guides', 'pdf', 'House design review / new home checklist', 'Question a proposed layout before drawings become expensive to change.', 'soon', 'design'],
  ['guides', 'pdf', 'Climate-responsive home guide', 'Orientation, shading, ventilation and climate response, with bushfire, slope and stormwater.', 'soon', 'design'],
  ['guides', 'pdf', 'The nine questions you must discuss with a building designer', 'Orientation, floor plan, thermal mass, insulation and more — before you sign.', 'update', 'design'],
  ['guides', 'pdf', 'How will I know I’ve found the right person to design my house?', 'Questions to ask about the person or company you are considering.', 'update', 'design'],
  ['guides', 'pdf', '31-Point Home Building Contract Guide', 'Understand your building contract, with shorter question guides.', 'paid', 'build'],
  ['guides', 'pdf', 'Quotation and tender comparison guide', 'Compare what builders have actually allowed for.', 'soon', 'build'],
  ['guides', 'pdf', 'Construction monitoring, variations and handover checklists', 'Practical checklists for Contract & Build and Handover.', 'soon', 'handover'],
  ['guides', 'pdf', 'Homeowner manual', 'Operating and caring for your new home.', 'later', 'handover'],
  ['tools', 'tool', 'Owner Builder Cost Planner', 'Branded spreadsheet with cost centres, instructions and a worked example.', 'soon', 'budget'],
  ['tools', 'tool', 'Preliminary House Estimator', 'A better ballpark estimate before the design is final.', 'dev', 'budget'],
  ['tools', 'tool', 'My Cost Centre Template', 'Track your budget by cost centre.', 'soon', 'budget'],
  ['tools', 'tool', 'Cost Centre Estimator – Actual', 'Compare estimated against actual costs as the build progresses.', 'soon', 'budget'],
  ['tools', 'tool', 'Specwriter – specification generator', 'An Australian specification generator based on True North’s own specification.', 'dev', 'budget'],
  ['tools', 'tool', 'My Sun Compass', 'Find true north and see how the sun moves across your site.', 'soon', 'evaluate'],
  ['tools', 'tool', 'House Wizard Design Tool', 'Work through room needs and layout ideas.', 'soon', 'design'],
  ['tools', 'tool', 'Contracts Explained – worksheet', 'Plain-English explanation and worksheet for your contract.', 'soon', 'build'],
  ['energy', 'leaf', '10 Reasons Your Home May Be Too Hot, Too Cold or Expensive to Run', 'A free energy checklist for existing homes.', 'free', 'handover'],
  ['energy', 'leaf', 'Home Audit Local Area Worksheet', 'Do your own home energy audit.', 'soon', 'handover'],
  ['energy', 'leaf', 'Home Energy Audit', 'Basic, Standard and Advanced audits on the NSW South Coast.', 'service', 'handover']
];

/* ---------- awards (True North’s published record — confirm years with Tony) ---------- */
const AWARDS = [
  ['2008', 'Best Practice in Building Sustainability', 'Shoalhaven Building Design Awards', 'Winner', 'img/a-shoal2008.jpg'],
  ['2008', 'Most Innovative Use of Steel', 'HIA South Coast Housing Awards', 'Finalist', ''],
  ['2006', 'Energy Efficient Housing', 'HIA South Coast Housing Awards', 'Winner', 'img/a-hia2006.jpg'],
  ['2006', 'Environmental Innovation', 'Shoalhaven Building Design Awards', 'Winner', 'img/a-shoal2006.jpg'],
  ['2006', 'Energy Efficient Housing', 'HIA CSR ACT & Southern NSW Housing Awards', 'Finalist', ''],
  ['2004', 'Environmental Innovation', 'Shoalhaven Building Design Awards', 'Winner', ''],
  ['2004', 'Building of the Year', 'HIA GreenSmart Awards', 'Finalist', ''],
  ['2003', 'Professional of the Year', 'HIA GreenSmart Awards', 'Finalist', ''],
  ['2003', 'Coastal Home of the Year', 'HIA ACT & Southern NSW Housing Awards', 'Finalist', ''],
  ['2002', 'Coastal Home of the Year · Renovations/Additions', 'HIA ACT & Southern NSW Housing Awards', 'Finalist', ''],
  ['2001', 'Coastal Home of the Year', 'HIA ACT & Southern NSW Housing Awards', 'Finalist', 'img/a-2001.jpg']
];

/* ---------- learning centre topics (articles planned) ---------- */
const TOPICS = [
  ['find', ['Build or buy?', 'Knock down, rebuild or renovate', 'Pre-purchase inspections']],
  ['evaluate', ['Reading a survey plan', 'True north vs magnetic north', 'Bushfire: what BAL means']],
  ['design', ['Orientation and shading', 'Reading a floor plan', 'Windows']],
  ['budget', ['Why specifications matter', 'Avoiding quotation traps', 'Cost centres explained']],
  ['approvals', ['DA vs CC', 'Energy rating and BASIX']],
  ['build', ['Choosing consultants and builders', 'Variations', 'Suppliers and subcontractors']],
  ['handover', ['Home energy audit', 'Practical completion and handover']]
];

module.exports = { STATUS, QUOTES, STAGES, PLANS, RESOURCES, AWARDS, TOPICS };
