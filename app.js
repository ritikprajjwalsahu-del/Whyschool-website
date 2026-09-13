/* ==========================================================================
   WHY SCHOOL. - ULTIMATE BEYOND CURRICULUM ECOSYSTEM
   Interactive JavaScript Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Initialize Interactive Components
  initNavbarScroll();
  initMobileNav();
  updateK12Builder();
  calculateROI();
  initSmoothScroll();
  initHeroCarousel();
});

/* --------------------------------------------------------------------------
   1. NAVBAR SCROLL & ACTIVE LINK HIGHLIGHTING
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Add scrolled class for glass opacity
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy for Active Nav Link
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

function initMobileNav() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = '#12151C';
        navLinks.style.padding = '1.5rem';
        navLinks.style.borderBottom = '1px solid rgba(255,101,0,0.3)';
      }
    });
  }
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. PHILOSOPHY VIEW SWITCHER
   -------------------------------------------------------------------------- */
function setPhilosophyView(viewMode) {
  const shiftGrid = document.getElementById('philosophyShiftGrid');
  const compareTable = document.getElementById('philosophyCompareTable');
  const btnShift = document.getElementById('btnShiftView');
  const btnCompare = document.getElementById('btnCompareView');

  if (viewMode === 'shift') {
    shiftGrid.style.display = 'grid';
    compareTable.style.display = 'none';
    btnShift.classList.add('active');
    btnCompare.classList.remove('active');
  } else {
    shiftGrid.style.display = 'none';
    compareTable.style.display = 'block';
    btnCompare.classList.add('active');
    btnShift.classList.remove('active');
  }
}

/* --------------------------------------------------------------------------
   3. PARTNER INSTITUTIONS FILTERING
   -------------------------------------------------------------------------- */
function filterPartners(category, buttonEl) {
  // Update Tab Buttons UI
  const tabButtons = document.querySelectorAll('.partner-tabs .tab-btn');
  tabButtons.forEach(btn => btn.classList.remove('active'));
  if (buttonEl) buttonEl.classList.add('active');

  // Filter Cards
  const cards = document.querySelectorAll('#partnersGrid .partner-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

/* --------------------------------------------------------------------------
   4. CURRICULUM TRACK DETAIL MODAL
   -------------------------------------------------------------------------- */
const trackData = {
  'ai-robotics': {
    title: 'Track 01: Applied AI, Quantum & Robotics Pod',
    badge: 'Technology & Engineering',
    desc: 'Equipping students with deep technical fluency in machine learning models, autonomous robotics hardware, physical computing, and neural network fundamentals.',
    outcomes: [
      'Build & fine-tune custom LLMs and vision AI models.',
      'Program autonomous quadcopters and wheeled robotics.',
      'Understand quantum computing gate principles.',
      'Deploy edge AI sensors for environmental monitoring.'
    ],
    weeklyFlow: [
      'Week 1-4: Python & Neural Network Mathematics',
      'Week 5-8: Embedded Microcontrollers & Sensor Arrays',
      'Week 9-12: Computer Vision & Autonomous Navigation',
      'Week 13-16: Capstone Project Deployment & Showcase'
    ]
  },
  'venture-incubation': {
    title: 'Track 02: Venture Building & Financial Intelligence',
    badge: 'Entrepreneurship & Business',
    desc: 'Transforming ideas into scalable micro-businesses. Students master cap-tables, unit economics, customer discovery, and investor pitching.',
    outcomes: [
      'Launch a functional MVP micro-business.',
      'Build a verified financial forecast and cap-table model.',
      'Conduct 50+ user validation interviews.',
      'Pitch live to active angel investors and seed funds.'
    ],
    weeklyFlow: [
      'Week 1-4: Problem Validation & Product Prototyping',
      'Week 5-8: Unit Economics, Pricing & Legal Basics',
      'Week 9-12: Marketing Funnels & Early User Acquisition',
      'Week 13-16: Pitch Deck Mastery & Demo Day'
    ]
  },
  'bio-research': {
    title: 'Track 03: Biotech & Applied Scientific Research',
    badge: 'Life Sciences & Sustainability',
    desc: 'Connecting students with real genomic datasets, CRISPR bio-simulations, microplastics remediation, and peer-reviewed scientific writing.',
    outcomes: [
      'Analyze DNA sequence variants using bio-informatics tools.',
      'Design simulated gene-editing strategies for crop resilience.',
      'Draft publication-ready scientific research manuscripts.',
      'Present findings at national youth science symposia.'
    ],
    weeklyFlow: [
      'Week 1-4: Genomic Datasets & Bio-informatics APIs',
      'Week 5-8: CRISPR & Synthetic Biology Simulations',
      'Week 9-12: Climate Modeling & Micro-plastics Research',
      'Week 13-16: Peer Review, Manuscript Drafting & Submission'
    ]
  },
  'design-thinking': {
    title: 'Track 04: Human-Centered Design & STEAM',
    badge: 'Creative Technology & UI/UX',
    desc: 'Fusing human empathy, industrial design, spatial media, and 3D prototyping to engineer products users love.',
    outcomes: [
      'Master Figma UI/UX design systems and interactive prototypes.',
      'Design and 3D print functional physical product prototypes.',
      'Execute design sprints based on Stanford d.school frameworks.',
      'Develop spatial computing concepts for AR/VR.'
    ],
    weeklyFlow: [
      'Week 1-4: Empathy Mapping & User Need Synthesis',
      'Week 5-8: High-Fidelity UI/UX Wireframing in Figma',
      'Week 9-12: CAD Prototyping & 3D Additive Printing',
      'Week 13-16: User Testing, Iteration & Design Portfolio'
    ]
  },
  'ethics-governance': {
    title: 'Track 05: Global Governance & AI Ethics',
    badge: 'Policy, Debate & Leadership',
    desc: 'Training future statesmen, policy experts, and ethical tech leaders to navigate global geopolitics, climate treaties, and algorithmic safety.',
    outcomes: [
      'Draft national policy proposals on AI safety & privacy.',
      'Represent delegations in high-stakes UN simulation debates.',
      'Analyze trade policies and global carbon credit markets.',
      'Master persuasive public speaking and crisis communications.'
    ],
    weeklyFlow: [
      'Week 1-4: Foundations of Geopolitics & Global Treaties',
      'Week 5-8: Algorithmic Bias, AI Safety & Privacy Ethics',
      'Week 9-12: Public Speaking, Debate & Negotiation Drills',
      'Week 13-16: Model UN Summit & Policy Blueprint Submission'
    ]
  },
  'leadership-eq': {
    title: 'Track 06: Mindset, Resilience & Executive Presence',
    badge: 'Human Potential & Leadership',
    desc: 'Developing high emotional intelligence, stress self-regulation, conflict resolution, and authentic executive presence.',
    outcomes: [
      'Master cognitive self-regulation under high stress.',
      'Lead cross-functional team dynamics with high empathy.',
      'Develop a compelling personal leadership vision.',
      'Execute win-win negotiation strategies in conflict scenarios.'
    ],
    weeklyFlow: [
      'Week 1-4: Emotional Intelligence & Biofeedback Awareness',
      'Week 5-8: High-Stakes Communication & Voice Training',
      'Week 9-12: Team Dynamics, Empathy & Conflict Resolution',
      'Week 13-16: Personal Leadership Manifesto & Capstone'
    ]
  }
};

function openTrackModal(trackKey) {
  const modal = document.getElementById('trackModal');
  const body = document.getElementById('trackModalBody');
  const data = trackData[trackKey];

  if (!data) return;

  body.innerHTML = `
    <div style="display: inline-block; padding: 0.35rem 0.8rem; background: var(--orange-subtle); border: 1px solid var(--border-orange); color: var(--orange-bright); border-radius: var(--radius-sm); font-size: 0.8rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.8rem;">
      ${data.badge}
    </div>
    <h3 style="font-size: 2rem; font-weight: 800; color: #FFFFFF; margin-bottom: 1rem;">
      ${data.title}
    </h3>
    <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.8rem;">
      ${data.desc}
    </p>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
      <div style="background: var(--bg-dark); padding: 1.2rem; border-radius: var(--radius-sm); border: 1px solid var(--border-light);">
        <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--orange-primary); margin-bottom: 0.8rem;">
          <i data-lucide="target"></i> Key Student Outcomes
        </h4>
        <ul style="list-style: none; font-size: 0.9rem; color: var(--text-secondary);">
          ${data.outcomes.map(item => `<li style="margin-bottom: 0.5rem; display: flex; gap: 0.5rem;"><i data-lucide="check" style="color: var(--orange-primary); shrink: 0;"></i> ${item}</li>`).join('')}
        </ul>
      </div>

      <div style="background: var(--bg-dark); padding: 1.2rem; border-radius: var(--radius-sm); border: 1px solid var(--border-light);">
        <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--orange-primary); margin-bottom: 0.8rem;">
          <i data-lucide="calendar"></i> Sample 16-Week Flow
        </h4>
        <ul style="list-style: none; font-size: 0.9rem; color: var(--text-secondary);">
          ${data.weeklyFlow.map(step => `<li style="margin-bottom: 0.5rem;">• ${step}</li>`).join('')}
        </ul>
      </div>
    </div>

    <div style="display: flex; gap: 1rem; justify-content: flex-end;">
      <button class="btn btn-secondary" onclick="closeTrackModal()">Close</button>
      <button class="btn btn-primary" onclick="closeTrackModal(); openInquiryModal('Track: ${data.title}')">
        <i data-lucide="bookmark"></i> Request Track Implementation Kit
      </button>
    </div>
  `;

  if (window.lucide) lucide.createIcons();
  modal.classList.add('active');
}

function closeTrackModal() {
  document.getElementById('trackModal').classList.remove('active');
}

/* --------------------------------------------------------------------------
   5. PARTNER CASE STUDY MODAL
   -------------------------------------------------------------------------- */
const partnerCaseStudies = {
  'Oxford Academy': {
    name: 'The Oxford International Academy',
    location: 'London, UK',
    students: '1,250 Students',
    highlights: 'Deployed full K-12 AI & Robotics Pods across Grades 6-12.',
    metrics: [
      '34 Student Patents Filed in 24 months',
      '98% Student Engagement Index Lift',
      '14 National Science Fair Gold Medals'
    ],
    quote: '"WhySchool transformed our academic reputation from standard exam prep to a global beacon of youth innovation."'
  },
  'Stanford Hub': {
    name: 'Stanford Innovation & Venture Hub',
    location: 'California, USA',
    students: '450 Undergraduate Fellows',
    highlights: 'Undergraduate Venture Seed Fund & Co-Op Fellowship Accelerator.',
    metrics: [
      '$1.8M Angel & VC Seed Funding Raised',
      '12 Active Startups Launched',
      '100% Industry Placement for Fellows'
    ],
    quote: '"Our students graduate with actual companies and investment capital, not just resume bullet points."'
  },
  'MIT BioTech': {
    name: 'MIT Applied BioTech Research Lab',
    location: 'Cambridge, MA',
    students: '120 Research Fellows',
    highlights: 'Joint mentorship pairing student fellows with senior genetic scientists.',
    metrics: [
      '18 Peer-reviewed Journal Papers Published',
      '3 Gene-Editing Simulations Patented',
      'Top 10 International Bio-Olympiad Winners'
    ],
    quote: '"Giving young minds access to real genomic datasets creates breakthrough discoveries years ahead of schedule."'
  },
  'Singapore STEM': {
    name: 'Singapore NextGen STEM Academy',
    location: 'Singapore',
    students: '890 K-12 Students',
    highlights: 'Integrated Quantum Computing, AI & Financial Literacy Pods.',
    metrics: [
      '#1 National Robotics Championship',
      '45 Micro-ventures Incubated',
      '99% Parent Satisfaction Index'
    ],
    quote: '"Our parents love seeing their children present micro-business pitch decks before even entering high school."'
  },
  'ETH Zurich': {
    name: 'ETH Zurich Sustainability Pod',
    location: 'Zurich, Switzerland',
    students: '310 Engineering Fellows',
    highlights: 'Clean-Tech engineering & climate remediation accelerator.',
    metrics: [
      '12 Clean-Tech Micro-Startups Incorporated',
      '5 Carbon Capture Prototypes Deployed',
      '$950k Environmental Grant Funding'
    ],
    quote: '"WhySchool provides the exact bridge between academic theory and world-changing climate engineering."'
  },
  'Cambridge Governance': {
    name: 'Cambridge Future Governance Center',
    location: 'Cambridge, UK',
    students: '520 Fellows',
    highlights: 'Ethics in AI & UN Policy Simulation Lab.',
    metrics: [
      '45 Policy Blueprints Drafted for Global Think-Tanks',
      '100% Student Mastery in High-Stakes Public Speaking',
      '8 Delegates Invited to UN Youth Assembly'
    ],
    quote: '"Preparing future leaders requires ethical clarity and diplomatic mastery, not just textbook memorization."'
  }
};

function openPartnerModal(partnerKey) {
  const modal = document.getElementById('partnerModal');
  const body = document.getElementById('partnerModalBody');
  const data = partnerCaseStudies[partnerKey] || {
    name: partnerKey,
    location: 'Global Campus',
    students: '500+ Students',
    highlights: 'Integrated Beyond Curriculum Experiential Ecosystem.',
    metrics: ['95% Skill Mastery Lift', 'Verified Portfolio Project Output'],
    quote: '"WhySchool empowers students to transcend traditional boundaries."'
  };

  body.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
      <h3 style="font-size: 1.8rem; font-weight: 800; color: #FFFFFF;">${data.name}</h3>
      <span style="font-size: 0.85rem; color: var(--orange-bright); font-weight: 700; background: var(--orange-subtle); padding: 0.3rem 0.8rem; border-radius: var(--radius-full);">
        <i data-lucide="map-pin"></i> ${data.location}
      </span>
    </div>
    
    <p style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
      <strong>Program Scope:</strong> ${data.highlights} (Empowering ${data.students})
    </p>

    <div style="background: var(--bg-dark); padding: 1.5rem; border-radius: var(--radius-sm); border: 1px solid var(--border-orange); margin-bottom: 1.5rem;">
      <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--orange-primary); margin-bottom: 1rem;">
        <i data-lucide="award"></i> Measured Institutional Outcomes
      </h4>
      <ul style="list-style: none; font-size: 0.95rem; color: var(--text-primary);">
        ${data.metrics.map(m => `<li style="margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.6rem;"><i data-lucide="trending-up" style="color: var(--orange-primary);"></i> ${m}</li>`).join('')}
      </ul>
    </div>

    <blockquote style="font-style: italic; color: var(--text-secondary); border-left: 3px solid var(--orange-primary); padding-left: 1rem; margin-bottom: 1.8rem;">
      ${data.quote}
    </blockquote>

    <div style="display: flex; gap: 1rem; justify-content: flex-end;">
      <button class="btn btn-secondary" onclick="closePartnerModal()">Close</button>
      <button class="btn btn-primary" onclick="closePartnerModal(); openInquiryModal('Case Study: ${data.name}')">
        <i data-lucide="calendar"></i> Book Institutional Case Study Audit
      </button>
    </div>
  `;

  if (window.lucide) lucide.createIcons();
  modal.classList.add('active');
}

function closePartnerModal() {
  document.getElementById('partnerModal').classList.remove('active');
}

/* --------------------------------------------------------------------------
   6. INTERACTIVE K-12 PROGRAM BUILDER WIDGET
   -------------------------------------------------------------------------- */
function updateK12Builder() {
  const grade = document.getElementById('builderGradeSelect').value;
  const students = document.getElementById('builderStudentSelect').value;
  const chkAi = document.getElementById('chkAi').checked;
  const chkVenture = document.getElementById('chkVenture').checked;
  const chkBio = document.getElementById('chkBio').checked;
  const chkDesign = document.getElementById('chkDesign').checked;
  const previewList = document.getElementById('builderPreviewList');

  if (!previewList) return;

  const tracksSelected = [];
  if (chkAi) tracksSelected.push('Young Founders Pod');
  if (chkVenture) tracksSelected.push('Leadership Pod');
  if (chkBio) tracksSelected.push('Future Skills Pod');
  if (chkDesign) tracksSelected.push('Career Counseling Pod');

  let gradeLabel = 'Leadership & Confidence Focus';
  if (grade === 'primary') gradeLabel = 'Young Founders Focus';
  if (grade === 'senior') gradeLabel = 'Future Skills (AI & Robotics) Focus';
  if (grade === 'all') gradeLabel = 'Full K-12 Campus Ecosystem (All 4 Pods)';

  previewList.innerHTML = `
    <li><strong>Program Focus:</strong> ${gradeLabel}</li>
    <li><strong>Student Capacity:</strong> ${students} Enrolled Learners</li>
    <li><strong>Selected Pods:</strong> ${tracksSelected.length > 0 ? tracksSelected.join(', ') : 'None selected'}</li>
    <li><strong>Delivery Mode:</strong> Grade-Agnostic Experiential Labs</li>
    <li><strong>Faculty Support:</strong> Dedicated Master Facilitators & Mentors</li>
    <li><strong>Annual Portfolio Goal:</strong> ${students * 2} Verified Student Projects</li>
  `;
}

/* --------------------------------------------------------------------------
   7. INTERACTIVE ROI & IMPACT CALCULATOR
   -------------------------------------------------------------------------- */
function calculateROI() {
  const students = parseInt(document.getElementById('sliderStudents').value);
  const hours = parseInt(document.getElementById('sliderHours').value);
  const years = parseInt(document.getElementById('sliderDuration').value);

  // Update Slider Value Displays
  document.getElementById('valStudents').innerText = `${students.toLocaleString()} Students`;
  document.getElementById('valHours').innerText = `${hours} Hours / Week`;
  document.getElementById('valDuration').innerText = `${years} Academic Year${years > 1 ? 's' : ''}`;

  // Calculation Logic
  const portfolios = Math.round(students * 0.7 * years);
  const patents = Math.round((students / 100) * 2.5 * years);
  const startups = Math.round((students / 100) * 1.6 * years);
  const skillLift = Math.min(99, Math.round(65 + (hours * 2.5) + (years * 4)));

  document.getElementById('resPortfolios').innerText = `${portfolios.toLocaleString()}+`;
  document.getElementById('resPatents').innerText = `${patents}`;
  document.getElementById('resStartups').innerText = `${startups}`;
  document.getElementById('resSkillLift').innerText = `+${skillLift}%`;
}

/* --------------------------------------------------------------------------
   8. INSTITUTIONAL INQUIRY FORM & TOAST NOTIFICATIONS
   -------------------------------------------------------------------------- */
function openInquiryModal(contextTitle) {
  const modal = document.getElementById('inquiryModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');

  if (contextTitle) {
    modalTitle.innerText = `Inquire: ${contextTitle}`;
    modalSubtitle.innerText = `Request custom implementation details for "${contextTitle}".`;
  } else {
    modalTitle.innerText = 'Partner With WhySchool.';
    modalSubtitle.innerText = 'Request a customized Beyond Curriculum proposal or schedule an on-site audit for your institution.';
  }

  modal.classList.add('active');
}

function closeInquiryModal() {
  document.getElementById('inquiryModal').classList.remove('active');
}

function handleInquirySubmit(event) {
  event.preventDefault();
  closeInquiryModal();
  showToast('Inquiry Received! A WhySchool Institutional Architect will contact your campus within 24 hours.');
  document.getElementById('inquiryForm').reset();
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i data-lucide="check-circle-2" style="color: var(--orange-primary);"></i> <span>${message}</span>`;
  container.appendChild(toast);

  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

/* --------------------------------------------------------------------------
   hero CAROUSEL AUTO-SLIDE & CONTROLS
   -------------------------------------------------------------------------- */
let currentHeroSlide = 0;
let heroSlideTimer = null;

function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero-carousel-slide');
  if (!slides || slides.length === 0) return;

  startHeroAutoSlide();

  const container = document.getElementById('heroCarousel');
  if (container) {
    container.addEventListener('mouseenter', stopHeroAutoSlide);
    container.addEventListener('mouseleave', startHeroAutoSlide);
  }
}

function showHeroSlide(index) {
  const slides = document.querySelectorAll('.hero-carousel-slide');
  const dots = document.querySelectorAll('#heroCarouselDots .dot');
  if (!slides.length) return;

  if (index >= slides.length) currentHeroSlide = 0;
  else if (index < 0) currentHeroSlide = slides.length - 1;
  else currentHeroSlide = index;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentHeroSlide);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentHeroSlide);
  });
}

function changeHeroSlide(direction) {
  showHeroSlide(currentHeroSlide + direction);
}

function setHeroSlide(index) {
  showHeroSlide(index);
}

function startHeroAutoSlide() {
  stopHeroAutoSlide();
  heroSlideTimer = setInterval(() => {
    changeHeroSlide(1);
  }, 3500);
}

function stopHeroAutoSlide() {
  if (heroSlideTimer) {
    clearInterval(heroSlideTimer);
    heroSlideTimer = null;
  }
}
