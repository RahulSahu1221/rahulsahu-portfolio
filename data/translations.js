/* ==========================================================================
   TRANSLATIONS — English (default) / Japanese / Hindi
   Keyed by dot-path used in data-i18n attributes throughout index.html.
   Values may contain simple inline HTML (<em>, <br>) where the original
   markup needs it.
   ========================================================================== */
window.PORTFOLIO_I18N = {

en: {
  meta: { name: "English" },
  nav: { about: "About", experience: "Experience", education: "Education", skills: "Skills", projects: "Projects", certifications: "Certifications", contact: "Contact" },
  dock: { theme: "Toggle theme", lang: "Language", cmdk: "Command palette", resume: "Resume", mode: "Enhanced view" },
  a11y: { skipLink: "Skip to content" },
  easterEgg: { message: "You found it — thanks for looking this closely. Aiming for Japan, one JLPT level at a time." },

  hero: {
    availability: "Graduating May 2027 · Open to internships &amp; full-time roles in Japan &amp; India",
    eyebrow: "EEE · Final Year",
    name: "Rahul<br><em>Sahu</em>",
    title: "Electrical &amp; Electronics Engineer", titleRotateExtra: "Final-Year EEE Student|Targeting Japan · JLPT N5|Embedded Systems & IoT",
    desc: "Final-year B.Tech EEE student (graduating 2027) with six months of hands-on field training at Nepal Electricity Authority, IoT and embedded project experience, MATLAB/Simulink proficiency, and JLPT N5 certification — seeking core electrical engineering roles with Japanese industry leaders.",
    stat1Label: "CGPA / 10", stat2Label: "Field OJT", stat3Label: "JLPT Japan",
    ctaPrimary: "Get In Touch", ctaOutline: "View Work", ctaResume: "View Resume", ctaGithub: "GitHub",
    badgeJp: "日本語", badgeSmall: "Targeting Japan",
    scroll: "Scroll"
  },
  marquee: ["Power Systems", "MATLAB / Simulink", "日本語 · JLPT N5", "Embedded Systems", "IoT Engineering", "Nepal Electricity Authority"],

  about: {
    label: "About Me", title: "Engineer<br><em>with Purpose</em>",
    p1: "I am a final-year B.Tech Electrical &amp; Electronics Engineering student at Aditya College of Engineering &amp; Technology, Andhra Pradesh — consistently ranked among the top performers with a <strong>CGPA of 9.13/10</strong>, <strong>1st rank in Semester 5</strong>, and <strong>2nd rank in Semesters 1–4</strong>.",
    p2: "My foundation was built in the field. Before university, I completed <strong>6 months of On-the-Job Training at Nepal Electricity Authority</strong>, working directly on distribution line operations, substation activities, and energy meter installations — real infrastructure, real stakes.",
    p3: "From the Nepal Electricity Authority OJT, where I worked hands-on with power systems and meter installation, to building IoT-based projects like a Smart Factory Monitoring System and an Edge AI–based EV Charging Optimizer on ESP32, I enjoy connecting core electrical engineering with embedded and connected technology. I'm now seeking roles in Japan or India where I can apply these skills.",
    factsLabel: "Quick Facts",
    k1: "Roll Number", k2: "Institution", k3: "Degree", k4: "Expected Graduation", k5: "CGPA", k6: "Department Rank", k7: "Field OJT", k8: "Target Market", k9: "Nationality", k10: "Location",
    v3: "B.Tech — EEE", v4: "May 2027", v6: "1st (Sem 5) · 2nd (Sem 1–4)", v7: "Nepal Electricity Authority", v8: "Japan", v9: "Nepali", v10: "Kakinada, Andhra Pradesh"
  },

  experience: {
    label: "Career", title: "Experience &amp;<br><em>Background</em>",
    e1: { type: "Internship · NSDC Affiliated", date: "10 Aug – 16 Sep 2026", title: "Edge AI Based Smart EV Charging Optimiser", org: "Emertxe · NSDC / ESSCI", desc: "Online internship on Internet of Things (IoT), demonstrating practical implementation skills through the project Edge AI Based Smart EV Charging Station Optimizer — built under the guidance of the trainer." },
    e2: { type: "Internship · NSDC Affiliated", title: "IoT Engineering Internship", org: "Emertxe · NSDC / ESSCI", desc: "Hands-on training in Internet of Things systems covering foundational programming in C, microcontroller interfacing, and SDLC-based project building. Affiliated with National Skill Development Corporation and ESSCI." },
    e3: { type: "Internship · AICTE Approved", title: "Electric Vehicle Technologies", org: "SkillDzire · AICTE", desc: "Short-term internship on Electric Vehicle technologies and powertrain fundamentals. Covered EV architecture, battery management principles, and charging systems under AICTE-approved curriculum." },
    e4: { type: "On-the-Job Training · 6 Months", title: "Electrical Engineering Trainee (OJT)", org: "Nepal Electricity Authority — Bharatpur", desc: "Six months of structured OJT in live power distribution infrastructure. Executed overhead line patrols, fault identification, switchyard activities, transformer inspections, and energy meter installation. Certified by Acting Centre Chief Er. Rajendra Prasad Paudel.", stat: "6 MONTHS" },
    e5: { type: "Hands-on Experience", date: "Mar – Apr 2020", title: "Electrical Repair &amp; Maintenance Trainee", org: "Local Repair &amp; Maintenance Shop", desc: "Two months at a small local electrical repair and maintenance shop, learning the repair and maintenance of ceiling fans, getting familiar with single-phase motor windings, and fixing everyday household electrical appliances.", stat: "2 MONTHS" }
  },

  education: {
    label: "Academic Journey", title: "Educational<br><em>Background</em>",
    apexKicker: "Undergraduate Apex", apexActive: "Active",
    rankLabel: "Department Standing", rankVal: "Rank 1st (Semester 5)",
    pedigreeKicker: "Technical Pedigree", pedigreeSub: "Chronological",
    trajectory: "Semester Performance Trajectory (SGPA)",
    telemetry1: "Metric Integrity: Verified (5 Semesters)", telemetry2: "Status: Final Year", telemetry3: "Target: Japan",
    ed1: { badge: "Pursuing · Final Year", degree: "B.Tech — Electrical &amp; Electronics Engineering", school: "Aditya College of Engineering &amp; Technology (Autonomous) · AP, India", detail: "Consistently among top performers. Ranked 1st in Semester 5, and 2nd in Semesters 1–4. 3rd year completed May 2026. Strong foundation in core electrical systems.", scoreLabel: "CGPA · 5 Semesters" },
    ed2: { badge: "Completed · 2022", streamTag: "Vocational Stream", degree: "Higher Secondary — Technical &amp; Vocational (EEE)", school: "Pashupati Secondary School · Rupandehi, Nepal", detail: "Specialized in the Technical and Vocational stream with a core focus on Electrical Engineering fundamentals, practical applications, and hands-on technical skills.", scoreLabel: "GPA" },
    ed3: { badge: "Completed · 2020", streamTag: "Science &amp; Math Foundation", degree: "Secondary Education — Technical Stream", school: "Tribhuvan Secondary School · Nepal", detail: "Completed early secondary education within the Technical Stream, building a robust mathematical and scientific foundation for future engineering and vocational studies.", scoreLabel: "GPA" }
  },

  skills: {
    label: "Capabilities", title: "Technical<br><em>Skills</em>",
    indexLabel: "Proficiency Index", langLabel: "Languages",
    currentlyLabel: "Currently", currentlyC1: "Learning — Japanese (JLPT N4: exam taken, results pending)", currentlyC2: "Building — EV ADAS System", currentlyC3: "Building — Transformer Life Gauge", currentlyUpdated: "Updated Oct 2026",
    t1: { name: "Power Systems", desc: "Load-flow and fault analysis coursework across five semesters of B.Tech EEE." },
    t3: { name: "Electrical Machines", desc: "Testing and analysis of transformers, induction motors, and generators." },
    t4: { name: "Control Systems", desc: "Closed-loop and state-machine control, applied hands-on in embedded projects.", evidence: "Used in 1 project", evidenceProjects: "p6" },
    t6: { name: "MATLAB / Simulink", desc: "Simulation and modeling for power systems and control coursework." },
    t8: { name: "DIALux Evo", desc: "Lighting design and illumination planning." },
    t9: { name: "Proteus 8 Professional", desc: "Circuit simulation and validation before hardware build.", evidence: "Used in 1 project", evidenceProjects: "p5" },
    t10: { name: "Arduino / Microcontrollers", desc: "Embedded control across hands-on hardware projects.", evidence: "Used in 3 projects", evidenceProjects: "p1,p5,p10" },
    lang1: { name: "English", level: "B2" },
    lang2: { name: "Japanese", level: "N5" },
    lang3: { name: "Nepali", level: "Fluent" },
    lang4: { name: "Hindi", level: "Fluent" },
    lang5: { name: "Bhojpuri", level: "Native" }
  },

  projects: {
    label: "Work", title: "Featured<br><em>Projects</em>",
    tabCompleted: "Completed", tabOngoing: "Ongoing", tradeoffLabel: "Constraints &amp; Trade-offs", problemLabel: "Why I Made This", differentlyLabel: "What I'd Do Differently",
    linkCode: "View Code", linkLive: "Live Demo",
    statusComplete: "Complete", statusProgress: "In Progress", statusBlocked: "Blocked", statusLive: "Live",
    p1: { title: "Smart Factory IoT Monitoring System", subtitle: "IoT Internship · Arduino · ThingsBoard · MQTT", desc: "Two-node factory monitoring system built during an IoT internship, with a main node and a warehouse node publishing data over MQTT to a ThingsBoard dashboard for real-time monitoring.", tradeoff: "Chose MQTT + ThingsBoard over a custom backend for faster time-to-monitoring, trading away some dashboard customization. Node 1 was deliberately scoped and finished before starting Node 2, rather than building both in parallel.", problem: "Factories often lack real-time visibility into scattered equipment health, relying on manual checks that catch problems late.", whatIdDoDifferently: "I'd build Node 2 alongside Node 1 from the start instead of fully sequencing them, to catch integration issues between the two earlier." },
    p2: { title: "RONIN — JLPT Vocabulary Trainer", subtitle: "Progressive Web App · Vanilla JavaScript", desc: "A live, no-build-step PWA covering N5 and N4 vocabulary. Features SRS flashcards, quizzes, four mini-games (Memory Match, Kanji Meteor, Word Chain, JLPT Mock Test), Jisho API dictionary search, custom decks, analytics/heatmap, XP gamification, full offline support, and multi-device touch controls. Built with production-grade theming, light/dark modes, and accessibility support.", tradeoff: "Chose zero-build vanilla JavaScript over a framework for a lighter, dependency-free, instantly-loading offline PWA, accepting some of the development conveniences a framework would have provided.", problem: "Most JLPT vocabulary apps need an internet connection and don't adapt review timing to what a learner actually struggles with.", whatIdDoDifferently: "I'd add a lightweight backend sync option early on, so progress isn't lost when switching devices — right now everything lives only in local storage." },
    p4: { title: "Transformer Life Gauge", subtitle: "Circuit Simulation", desc: "Simulation stage completed. A few small circuit issues remain to be fixed before the design is finalized.", tradeoff: "Deliberately kept the project in simulation-only validation before any hardware investment, prioritizing getting the model correct first over building a physical prototype early.", problem: "Transformer insulation degrades silently over years of thermal stress, and by the time a failure shows external symptoms it's often too late to plan around.", whatIdDoDifferently: "I'd validate the aging model against a published IEEE loss-of-life curve before finalizing the circuit, rather than after." },
    p5: { title: "Solar Monitoring System", subtitle: "Arduino Uno · Proteus", desc: "Real-time solar energy monitoring system measuring panel voltage, charging current, battery voltage, battery state of charge, output power, and generated energy — all displayed on a 20×4 LCD. Completed and fully simulated.", tradeoff: "Chose a self-contained Arduino + LCD readout over a connected IoT dashboard, trading remote visibility for a unit that keeps working with no internet dependency at all.", problem: "A solar installation with no monitoring can silently underperform for weeks before anyone notices.", whatIdDoDifferently: "I'd add basic data logging to an SD card — right now all readings are live-only, so losing power means losing the day's history." },
    p6: { title: "EV ADAS System", subtitle: "STM32 (Blue Pill) · PICSimLab · Python / Matplotlib", desc: "An EV control and ADAS state machine built on STM32, paired with a real-time Python/Matplotlib dashboard and simulated in PICSimLab — developed during the Automotive Embedded Systems internship at Emertxe. Functionally built, with a microcontroller configuration issue currently being worked through.", tradeoff: "Chose STM32 over Arduino for automotive-grade timing and interrupt handling, accepting a steeper configuration curve — the source of the current configuration issue — in exchange for headroom an 8-bit MCU wouldn\u2019t have.", problem: "EV control logic and driver-assist features are usually developed and tested separately, which hides integration bugs until much later.", whatIdDoDifferently: "I'd study the STM32's exact interrupt/timer behavior before wiring the rest of the system around it — the current issue traces back to a configuration assumption I made too early." },
    p10: { title: "Edge AI Based Smart EV Charging Station Optimizer", subtitle: "ESP32 · Edge AI · Wokwi · ThingsBoard · MQTT", desc: "Intelligent, on-device charging control for a multi-bay EV station. A simulated three-bay electric vehicle charging station in which every bay runs on-device Edge AI to predict arrival demand and session duration, and a local optimization algorithm to allow, throttle, or defer charging in real time — all coordinated through ThingsBoard over MQTT. Built entirely on an ESP32, simulated in Wokwi, with no machine-learning runtime required on the device itself.", tradeoff: "Ran the prediction and the optimization logic locally on the ESP32 instead of in the cloud, so charging decisions stay real-time and independent of connectivity, and kept the approach light enough to need no machine-learning runtime on the device — trading some model sophistication for simplicity.", problem: "When several vehicles plug in at once, an EV charging station can overload its supply, and relying on a cloud round-trip for every charging decision adds delay and a single point of failure.", whatIdDoDifferently: "I'd validate the control logic on physical hardware with a real charger and current sensing — so far it has only been proven in simulation in Wokwi." }
  },

  certifications: {
    label: "Credentials", title: "Certifications &amp;<br><em>Training</em>", verified: "Verified", viewCert: "View Certificate", verifyNptel: "Verify via NPTEL ↗", aboutJlpt: "About JLPT ↗",
    c1: { issuer: "SkillDzire · APSCHE", title: "Electrical System Design using AutoCAD", desc: "Designed electrical layouts using AutoCAD, including wiring diagrams, load calculations, and real-world power distribution planning.", date: "Dec 2025 – Mar 2026 · Long-Term", id: "ID: 93fq34859p" },
    c2: { issuer: "Emertxe · NSDC / ESSCI", title: "Internet of Things (IoT)", desc: "Built a Smart Factory IoT system using Arduino, MQTT, and ThingsBoard with real-time monitoring, automation, and SDLC-based development.", date: "Mar – Apr 2026", id: "ID: EI26_015" },
    c3: { issuer: "SkillDzire · AICTE", title: "Electric Vehicle Technologies Internship", desc: "Gained hands-on experience in EV technologies, including battery systems, motor control, and charging infrastructure concepts.", date: "May 2025 – Jul 2025 · Long-Term", id: "ID: SDST-25-00033" },
    c4: { issuer: "JLPT · Japan Foundation", title: "Japanese Language Proficiency — N5", desc: "Achieved N5 level in Japanese Language Proficiency Test, demonstrating basic reading, listening, and communication skills.", date: "December 2025 · Score: 83 / 180", id: "Reg: 25B3010401-51110 · Passed" },
    c5: { issuer: "Nepal Electricity Authority", title: "6-Month Electrical Engineering OJT", desc: "Completed 6-month field training in power distribution systems, working on substations, maintenance, and real-time electrical operations.", date: "Jun – Dec 2022 · Bharatpur", id: "Issued: Dec 21, 2022" },
    c6: { issuer: "NPTEL · IIT Kharagpur", title: "Introduction to Industry 4.0 and Industrial Internet of Things", desc: "Completed a 12-week NPTEL / IIT Kharagpur course on Industry 4.0 and Industrial IoT with an Elite distinction (top 5% nationwide), scoring 85% overall.", date: "Jan – Apr 2026", id: "Roll No: NPTEL26CS38S1266200256" },
    c7: { issuer: "Emertxe · NSDC / ESSCI", title: "Internet of Things (IoT) — Edge AI Project", desc: "Completed an online IoT internship and demonstrated practical implementation skills through the project Edge AI Based Smart EV Charging Station Optimizer.", date: "10 Aug – 16 Sep 2026", id: "ID: EI26_017" },
  },

  evidence: { title: "Used In", closeLabel: "Close" },
  resume: {
    printBtn: "Save as PDF",
    printBtnJa: "Save as PDF (JP)",
    closeLabel: "Close resume",
    headline: "B.Tech Electrical &amp; Electronics Engineering | Nawalparasi (West), Nepal",
    summaryLabel: "Summary",
    summary: "Final-year B.Tech Electrical and Electronics Engineering student (CGPA 9.13/10) with hands-on experience in utility distribution maintenance, EV systems and industrial IoT. Seeking a 4-month internship from December 2026 in automation, power systems or electrical design.",
    educationLabel: "Education",
    ed1deg: "B.Tech, Electrical and Electronics Engineering – CGPA 9.13/10", ed1school: "Aditya College of Engineering &amp; Technology (Autonomous), Surampalem, Andhra Pradesh", ed1years: "2023 – 2027",
    ed2deg: "Higher Secondary (Technical &amp; Vocational – Electrical Engineering) – GPA 3.43/4", ed2school: "Shree Pashupati Secondary School, Rupendehi, Nepal", ed2years: "2020 – 2022",
    ed3deg: "Secondary (Technical Stream with Science) – GPA 3.92/4", ed3school: "Tribhuvan Secondary School, Nawalparasi (West), Nepal", ed3years: "2016 – 2020",
    experienceLabel: "Experience",
    ex1role: "Embedded &amp; IoT Intern", ex1org: "Emertxe", ex1years: "Aug 2026 – Sep 2026", ex1sub: "Edge AI Based Smart EV Charging Station Optimizer",
    ex1b1: "Built a simulated three-bay EV charging station on ESP32 (Wokwi) with on-device Edge AI predicting arrival demand and session duration.",
    ex1b2: "Implemented a priority-based algorithm to allow, throttle or defer charging per bay in real time, with telemetry and control through ThingsBoard over MQTT.",
    ex2role: "IoT Intern", ex2org: "Emertxe", ex2years: "Mar 2026 – Apr 2026", ex2sub: "Smart Factory IoT Monitoring System",
    ex2b1: "Built a smart factory simulation on Arduino Uno and PICSimLab with two embedded nodes monitoring production and warehouse conditions.",
    ex2b2: "Published real-time data to ThingsBoard Cloud via MQTT; implemented remote device control (RPC) and live dashboards.",
    ex3role: "On-the-Job Trainee", ex3org: "Nepal Electricity Authority, Bharatpur Distribution Centre", ex3years: "Jun 2022 – Dec 2022", ex3sub: "",
    ex3b1: "Supported distribution maintenance and fault restoration; assisted in service cable replacement, energy meter installation and HT line patrol.",
    ex3b2: "Gained exposure to substation operations.",
    projectsLabel: "Projects",
    ptitle: "Transformer Life Gauge", ptag: "(MATLAB; simulation-validated concept)",
    pb1: "Designed a low-cost IoT retrofit concept that estimates a transformer’s remaining insulation life from load current and temperature using the IEEE C57.91 thermal aging model.",
    pb2: "Validated the model in MATLAB as an offline simulation and a live dashboard showing remaining life (%) and safe overload capacity.",
    pb3: "Aimed at mid-size transformers as a low-cost alternative to fiber-optic monitoring, using off-the-shelf IoT hardware.",
    skillsLabel: "Skills",
    sk1label: "Electrical", sk1: "Circuit Analysis, Power Systems, Power Electronics, Control Systems",
    sk2label: "Design &amp; Simulation", sk2: "MATLAB, Simulink, Proteus 8 Professional, DIALux Evo, AutoCAD, Multisim, Ultiboard, PICSimLab, Wokwi",
    sk3label: "Embedded &amp; IoT", sk3: "Arduino, ESP32, STM32, MQTT, ThingsBoard",
    sk4label: "Practical", sk4: "Electrical repair of motors, fans and household equipment",
    sk5label: "Languages", sk5: "English, Hindi, Nepali, Bhojpuri (native); Japanese – JLPT N5 passed, studying N4",
    certsLabel: "Certifications",
    cert1: "Industry 4.0 / Industrial IoT – NPTEL (2026) &nbsp;|&nbsp; PCB Design (Multisim, Ultiboard) – Alison",
    cert2: "MATLAB Onramp and Simulink – MathWorks &nbsp;|&nbsp; JLPT N5 – Japan Foundation (Dec 2025)",
    achLabel: "Achievements",
    ach1: "<strong>2nd Prize, Poster Presentation</strong> – VEDA 2K25 National Level Student Symposium (Sep 2025)",
    ach2: "<strong>Academic rank:</strong> 2nd in Semesters 1–4 and 1st in Semester 5 (B.Tech); 3rd in Secondary level (2020)",
  },

  achievements: {
    label: "Recognition", title: "Achievements &amp;<br><em>Activities</em>",
    scoreLabel: "Score", gradeLabel: "Grade",
    a1: { catBadge: "NATIONAL_PRIZE", title: "2nd Prize — VEDA 2K25 National Symposium", desc: "Awarded 2nd Prize in Poster Presentation at the VEDA 2K25 National Level Student Symposium, Aditya University, during Engineer's Day (September 2025). Project: Electric Motor Technologies for EV Applications." },
    a2: { catBadge: "ACADEMIC_EXCELLENCE", title: "Ranked 1st — Semester 5, B.Tech EEE", desc: "Achieved 1st rank in department in Semester 5. Maintained 2nd position in Semesters 1–4 with consistent academic excellence. Overall CGPA: 9.13/10 after five semesters." },
    a3: { catBadge: "LEADERSHIP", title: "Symposium Coordinator — VEDA 2K25", desc: "Served as event coordinator for the VEDA 2K25 National Level Student Symposium at Aditya University, managing technical sessions and participant coordination for the Engineer's Day event." },
    a4: { catBadge: "PRESENTATION", title: "Paper Presentation — VEDA 2K24 Symposium", desc: "Participated as a paper presenter at the VEDA 2K24 National Level Technical Symposium, demonstrating research communication skills at the national level during Engineer's Day (September 2024)." },
    a5: { catBadge: "LANGUAGE_CERT", title: "Japanese Language Proficiency (JLPT N5 Certified)", desc: "Successfully passed JLPT N5 (December 2025) with a score of 83/180, earning A grades in Vocabulary and Grammar. Currently preparing for JLPT N4 to enhance professional communication and workplace readiness.", scoreStat: "83 / 180", gradeStat: "Grade A · Vocabulary &amp; Grammar", targetStat: "Target: JLPT N4 — In Progress" }
  },

  quickAnswers: {
    label: "Before You Ask", title: "Quick<br><em>Answers</em>",
    q1: "Willing to relocate?", a1: "Yes \u2014 actively targeting Japanese engineering placements, alongside core EEE roles in India.",
    q2: "Visa / work authorization?", a2: "Happy to discuss sponsorship requirements for your specific role \u2014 reach out via the contact section below.",
    q3: "Earliest availability?", a3: "Final year of B.Tech (2023\u20132027) \u2014 available immediately for internships, and for full-time roles from graduation.",
    q4: "English / Japanese confidence?", a4: "English: Cambridge B2 (professional working proficiency). Japanese: JLPT N5, currently studying toward N4."
  },

  contact: {
    label: "Let's Connect", tagline: "Ready for<br><em>What's Next</em>",
    sub: "Open to Japanese engineering placements and core EEE roles in India.",
    quickInternship: "Ask about an internship", quickProject: "Ask about a project", quickGeneral: "General inquiry",
    email: "Email", phone: "Phone", linkedin: "LinkedIn", instagram: "Instagram", github: "GitHub"
  },
  footer: { copy: "© 2026 Rahul Sahu — Electrical &amp; Electronics Engineer", jp: "電気技術者 · ラフル・サフ" },

  cmdk: {
    placeholder: "Type a command or search…",
    groupActions: "Actions", groupNavigate: "Navigate", groupContent: "Content",
    resume: "View Resume", viewProjects: "View Projects", github: "Open GitHub", linkedin: "Open LinkedIn",
    email: "Send an Email", toggleTheme: "Toggle Theme", switchLang: "Switch Language",
    goAbout: "Go to About", goExperience: "Go to Experience", goEducation: "Go to Education",
    goSkills: "Go to Skills", goProjects: "Go to Projects", goCerts: "Go to Certifications",
    goContact: "Go to Contact", noResults: "No results found.",
    focusMode: "Toggle Focus Mode", hint: "Command"
  }
},

/* ========================================================================== */
ja: {
  meta: { name: "日本語" },
  nav: { about: "自己紹介", experience: "職歴", education: "学歴", skills: "スキル", projects: "プロジェクト", certifications: "資格・修了証", contact: "連絡先" },
  dock: { theme: "テーマ切替", lang: "言語", cmdk: "コマンドパレット", resume: "履歴書", mode: "リッチモード" },
  a11y: { skipLink: "コンテンツへスキップ" },
  easterEgg: { message: "見つけましたね — ここまで見てくれてありがとうございます。JLPTを一段ずつ進みながら、日本を目指しています。" },

  hero: {
    availability: "2027年5月卒業予定 · 日本・インドでのインターンシップ／正社員の機会を探しています",
    eyebrow: "電気電子工学 ・ 最終学年 ・ CGPA 9.13",
    name: "ラフル<br><em>サフ</em>",
    title: "電気電子エンジニア", titleRotateExtra: "最終学年のEEE学生|日本を目指して·JLPT N5|組込みシステム&IoT",
    desc: "2027年卒業予定の電気電子工学（EEE）専攻の最終学年生。ネパール電力公社（NEA）での6か月間の実地研修、IoT・組込みプロジェクトの経験、MATLAB/Simulinkのスキル、JLPT N5（日本語能力試験）認定を有し、日系企業でのコア電気工学職を志望しています。",
    stat1Label: "CGPA（10点満点）", stat2Label: "実地研修期間", stat3Label: "JLPT 認定",
    ctaPrimary: "お問い合わせ", ctaOutline: "実績を見る", ctaResume: "履歴書を見る", ctaGithub: "GitHub",
    badgeJp: "日本語", badgeSmall: "日本市場を志望",
    scroll: "スクロール"
  },
  marquee: ["パワーシステム", "MATLAB / Simulink", "日本語 ・ JLPT N5", "組込みシステム", "IoTエンジニアリング", "ネパール電力公社"],

  about: {
    label: "自己紹介", title: "目的を持った<br><em>エンジニア</em>",
    p1: "私はインド・アーンドラプラデーシュ州にあるAditya College of Engineering &amp; Technologyで電気電子工学を専攻する最終学年生です。<strong>CGPA 9.13/10</strong>を維持し、<strong>第5学期は学科内1位</strong>、<strong>第1〜4学期は学科内2位</strong>を獲得しました。",
    p2: "私の基礎は現場で培われました。大学入学前には<strong>ネパール電力公社にて6か月間の実地研修（OJT）</strong>を修了し、配電線の運用、変電所業務、電力量計の設置など、実際のインフラに直接携わりました。",
    p3: "ネパール電力公社でのOJTで電力システムや電力量計の設置に実地で取り組んだ経験から、IoTベースのスマートファクトリー監視システムや、ESP32上のEdge AIベースEV充電オプティマイザーの開発まで、電気工学の基礎と組込み・コネクテッド技術を結び付けることに情熱を持っています。現在は、これらのスキルを活かせる日本またはインドの職場を志望しています。",
    factsLabel: "基本情報",
    k1: "学籍番号", k2: "所属機関", k3: "学位", k4: "卒業予定", k5: "CGPA", k6: "学科内順位", k7: "実地研修", k8: "希望就職先", k9: "国籍", k10: "所在地",
    v3: "学士（電気電子工学）", v4: "2027年5月", v6: "1位（第5学期）・2位（第1〜4学期）", v7: "ネパール電力公社", v8: "日本", v9: "ネパール国籍", v10: "カキナダ、アーンドラプラデーシュ州"
  },

  experience: {
    label: "職歴", title: "経歴と<br><em>実務経験</em>",
    e1: { type: "インターンシップ・NSDC提携", date: "2026年8月10日 – 9月16日", title: "Edge AI Based Smart EV Charging Optimiser", org: "Emertxe ・ NSDC / ESSCI", desc: "IoTのオンライン・インターンシップを修了し、トレーナーの指導のもとで開発したプロジェクト「Edge AI Based Smart EV Charging Station Optimizer」を通じて、実践的な実装力を発揮しました。" },
    e2: { type: "インターンシップ・NSDC提携", title: "IoTエンジニアリング・インターンシップ", org: "Emertxe ・ NSDC / ESSCI", desc: "C言語の基礎プログラミング、マイコンとのインターフェース、SDLCに基づくプロジェクト開発まで、IoTシステムの実践研修を受講。国家技能開発公社（NSDC）およびESSCI認定。" },
    e3: { type: "インターンシップ・AICTE認定", title: "電気自動車（EV）技術", org: "SkillDzire ・ AICTE", desc: "EV技術とパワートレインの基礎を学ぶ短期インターンシップ。AICTE認定カリキュラムのもと、EVアーキテクチャ、バッテリー管理の原理、充電システムを学習しました。" },
    e4: { type: "実地研修（OJT）・6か月間", title: "電気工学実習生（OJT）", org: "ネパール電力公社 ・ バラトプル支局", desc: "実稼働中の配電インフラにて6か月間の体系的なOJTを実施。架空配電線の巡視、故障箇所の特定、開閉所業務、変圧器点検、電力量計の設置を担当。センター長代理 Er. Rajendra Prasad Paudel氏の認定を取得。", stat: "6か月間" },
    e5: { type: "実務経験", date: "2020年3月 – 4月", title: "電気修理・保守研修生", org: "地域の修理・保守店", desc: "小規模な地域の電気修理・保守店で約2か月間、天井扇（シーリングファン）の修理と保守を学び、単相モーターの巻線に親しみ、日常的な家庭用電気機器の修理にも取り組みました。", stat: "2か月間" }
  },

  education: {
    label: "学歴", title: "学業の<br><em>歩み</em>",
    apexKicker: "学士課程・最高到達点", apexActive: "在学中",
    rankLabel: "学科内順位", rankVal: "学科内1位（第5学期）",
    pedigreeKicker: "技術的な学歴", pedigreeSub: "時系列",
    trajectory: "学期別成績推移（SGPA）",
    telemetry1: "データ整合性：検証済み（5学期分）", telemetry2: "状況：最終学年", telemetry3: "目標：日本",
    ed1: { badge: "在学中・最終学年", degree: "学士課程 ・ 電気電子工学", school: "Aditya College of Engineering &amp; Technology（自治校）・ インド アーンドラプラデーシュ州", detail: "常に上位の成績を維持。第5学期は学科内1位、第1〜4学期は2位を継続。3年次は2026年5月に修了。電気工学の基礎を確実に習得しています。", scoreLabel: "CGPA（5学期累計）" },
    ed2: { badge: "修了・2022年", streamTag: "職業課程", degree: "高等中等教育 ・ 技術／職業課程（電気電子工学）", school: "Pashupati Secondary School ・ ネパール ルパンデヒ郡", detail: "技術・職業課程を専攻し、電気工学の基礎理論、実践応用、実務スキルを重点的に学びました。", scoreLabel: "GPA" },
    ed3: { badge: "修了・2020年", streamTag: "理数基礎課程", degree: "中等教育 ・ 技術課程", school: "Tribhuvan Secondary School ・ ネパール", detail: "技術課程にて中等教育前期を修了し、工学および職業教育に向けた確かな数学・科学的基礎を築きました。", scoreLabel: "GPA" }
  },

  skills: {
    label: "専門分野", title: "技術<br><em>スキル</em>",
    indexLabel: "専門度インデックス", langLabel: "言語",
    currentlyLabel: "現在", currentlyC1: "学習中 — 日本語（JLPT N4：受験済み・結果待ち）", currentlyC2: "開発中 — EV ADASシステム", currentlyC3: "開発中 — 変圧器寿命診断ゲージ", currentlyUpdated: "更新：2026年10月",
    t1: { name: "パワーシステム", desc: "B.Tech EEE課程5学期にわたる潮流計算・故障解析の演習。" },
    t3: { name: "電気機器", desc: "変圧器・誘導電動機・発電機の試験と解析。" },
    t4: { name: "制御システム", desc: "閉ループ制御とステートマシン制御。組込みプロジェクトで実践。", evidence: "1件のプロジェクトで使用", evidenceProjects: "p6" },
    t6: { name: "MATLAB / Simulink", desc: "パワーシステム・制御系演習のシミュレーションとモデリング。" },
    t8: { name: "DIALux Evo", desc: "照明設計と光環境計画。" },
    t9: { name: "Proteus 8 Professional", desc: "ハードウェア製作前の回路シミュレーションと検証。", evidence: "1件のプロジェクトで使用", evidenceProjects: "p5" },
    t10: { name: "Arduino／マイコン", desc: "実機プロジェクト全般における組込み制御。", evidence: "3件のプロジェクトで使用", evidenceProjects: "p1,p5,p10" },
    lang1: { name: "英語", level: "B2" },
    lang2: { name: "日本語", level: "N5" },
    lang3: { name: "ネパール語", level: "流暢" },
    lang4: { name: "ヒンディー語", level: "流暢" },
    lang5: { name: "ボージュプリー語", level: "母語" }
  },

  projects: {
    label: "実績", title: "主要<br><em>プロジェクト</em>",
    tabCompleted: "完了", tabOngoing: "進行中", tradeoffLabel: "制約と設計判断", problemLabel: "作った理由", differentlyLabel: "改善するなら",
    linkCode: "コードを見る", linkLive: "デモを見る",
    statusComplete: "完了", statusProgress: "進行中", statusBlocked: "保留中", statusLive: "公開中",
    p1: { title: "スマートファクトリーIoT監視システム", subtitle: "IoTインターンシップ ・ Arduino ・ ThingsBoard ・ MQTT", desc: "IoTインターンシップで開発した2ノード構成の工場監視システム。メインノードと倉庫ノードがMQTT経由でThingsBoardダッシュボードへデータを送信し、リアルタイム監視を実現します。", tradeoff: "独自バックエンドではなくMQTT＋ThingsBoardを選択し、監視開始までの速度を優先。ダッシュボードのカスタマイズ性は一部犠牲にしています。ノード1とノード2を並行開発せず、まずノード1を完成させる方針を採りました。", problem: "工場では設備の状態をリアルタイムに把握できず、手動点検では問題の発見が遅れがちです。", whatIdDoDifferently: "ノード1を完成させてからノード2に着手するのではなく、最初から並行して開発し、両者の統合上の問題を早期に発見できるようにしたい。" },
    p2: { title: "RONIN — JLPT語彙学習アプリ", subtitle: "PWA（プログレッシブウェブアプリ） ・ Vanilla JavaScript", desc: "ビルド不要で公開中のPWA。N5・N4レベルの語彙を網羅し、SRS方式のフラッシュカード、クイズ、4種のミニゲーム（神経衰弱、漢字メテオ、ワードチェーン、JLPT模擬試験）、Jisho API辞書検索、カスタムデッキ、分析・ヒートマップ、XPゲーミフィケーション、完全オフライン対応、マルチデバイス対応のタッチ操作を実装。プロダクションレベルのテーマ設計、ライト／ダークモード、アクセシビリティにも対応。", tradeoff: "フレームワークではなくビルド不要のVanilla JavaScriptを選択し、軽量で依存関係のない、即座に起動するオフラインPWAを実現。その分、フレームワークが提供する開発上の利便性の一部は得られていません。", problem: "多くのJLPT語彙アプリはインターネット接続が必要で、学習者が実際に苦手とする箇所に合わせた復習タイミングの調整もできません。", whatIdDoDifferently: "早い段階で軽量なバックエンド同期機能を追加したい。現状は全データがローカルストレージのみに保存されており、端末を変えると進捗が失われてしまいます。" },
    p4: { title: "変圧器寿命診断ゲージ", subtitle: "回路シミュレーション", desc: "シミュレーション段階は完了。設計確定前に修正が必要な小さな回路上の課題が数点残っています。", tradeoff: "ハードウェアへの投資前に、意図的にシミュレーションのみでの検証段階にとどめ、早期の試作よりもモデルの正確性の確立を優先しました。", problem: "変圧器の絶縁は熱ストレスにより何年もかけて静かに劣化し、外部症状が現れた時には対策が手遅れになっていることが多くあります。", whatIdDoDifferently: "回路を確定させる前に、公表されているIEEEの寿命損失曲線に対して劣化モデルを検証すべきでした。今回は順序が逆になっています。" },
    p5: { title: "太陽光監視システム", subtitle: "Arduino Uno ・ Proteus", desc: "パネル電圧、充電電流、バッテリー電圧、バッテリー残量（SOC）、出力電力、発電量をリアルタイムに測定し、20×4 LCDに表示する太陽光発電監視システム。完成済み、シミュレーション検証も完了。", tradeoff: "接続前提のIoTダッシュボードではなく、単体完結型のArduino＋LCD表示を選択。遠隔監視性は犠牲にしつつ、インターネット接続に一切依存しない安定動作を優先しました。", problem: "監視機能のない太陽光発電設備は、性能低下が数週間気づかれないまま放置されることがあります。", whatIdDoDifferently: "SDカードへの簡易データロギングを追加したい。現状は全データがリアルタイム表示のみで、電源が切れるとその日の履歴が失われてしまいます。" },
    p6: { title: "EV ADASシステム", subtitle: "STM32（Blue Pill） ・ PICSimLab ・ Python / Matplotlib", desc: "Emertxeでの自動車組込みシステム・インターンシップにて開発した、STM32ベースのEV制御およびADASステートマシン。リアルタイムPython/Matplotlibダッシュボードと連携し、PICSimLabでシミュレーション。機能面は構築済みで、現在はマイコンの設定上の問題に対応中です。", tradeoff: "Arduinoではなく車載グレードのタイミング・割り込み処理が可能なSTM32を選択。8ビットMCUにはない処理余裕を得た一方、設定の複雑さは増し、それが現在の設定上の課題の原因にもなっています。", problem: "EVの制御ロジックと運転支援機能は別々に開発・テストされることが多く、統合時の不具合の発見が遅れがちです。", whatIdDoDifferently: "残りのシステムを組む前に、STM32の割り込み・タイマー動作を正確に把握すべきでした。現在の課題は、早い段階での設定に関する思い込みに起因しています。" },
    p10: { title: "Edge AIベース スマートEV充電ステーション・オプティマイザー", subtitle: "ESP32 ・ Edge AI ・ Wokwi ・ ThingsBoard ・ MQTT", desc: "マルチベイEVステーション向けの、インテリジェントなオンデバイス充電制御。3ベイのEV充電ステーションをシミュレートし、各ベイがオンデバイスEdge AIで到着需要と充電時間を予測、ローカルの最適化アルゴリズムがリアルタイムで充電の許可・抑制・延期を判断します。全体はMQTT経由でThingsBoardにより連携。すべてESP32上で構築しWokwiでシミュレーション。デバイス上に機械学習ランタイムは不要です。", tradeoff: "予測と最適化のロジックをクラウドではなくESP32上でローカル実行することで、充電判断をリアルタイムかつ通信状況に依存しないものにしました。デバイス上に機械学習ランタイムが不要な軽量な方式とし、モデルの高度さを一部犠牲にして簡潔さを優先しています。", problem: "複数台の車両が同時に接続すると、EV充電ステーションは電力供給が過負荷になる恐れがあります。また、充電判断のたびにクラウドとの往復通信に頼ると、遅延と単一障害点を生みます。", whatIdDoDifferently: "実際の充電器と電流センシングを使った実機で制御ロジックを検証したい。現状はWokwiでのシミュレーションによる検証のみです。" }
  },

  certifications: {
    label: "資格・修了証", title: "資格・<br><em>研修修了証</em>", verified: "認証済み", viewCert: "証明書を見る", verifyNptel: "NPTELで確認 ↗", aboutJlpt: "JLPTについて ↗",
    c1: { issuer: "SkillDzire ・ APSCHE", title: "AutoCADによる電気システム設計", desc: "配線図、負荷計算、実務レベルの配電計画を含む、AutoCADを用いた電気レイアウト設計を実施。", date: "2025年12月 – 2026年3月 ・ 長期", id: "ID: 93fq34859p" },
    c2: { issuer: "Emertxe ・ NSDC / ESSCI", title: "IoT（モノのインターネット）", desc: "Arduino、MQTT、ThingsBoardを用いたスマートファクトリーIoTシステムを構築。リアルタイム監視、自動化、SDLCに基づく開発を実践。", date: "2026年3月 – 4月", id: "ID: EI26_015" },
    c3: { issuer: "SkillDzire ・ AICTE", title: "電気自動車（EV）技術インターンシップ", desc: "バッテリーシステム、モーター制御、充電インフラの概念を含むEV技術の実践経験を習得。", date: "2025年5月 – 7月 ・ 長期", id: "ID: SDST-25-00033" },
    c4: { issuer: "JLPT ・ 国際交流基金", title: "日本語能力試験 — N5", desc: "日本語能力試験N5に合格し、基礎的な読解・聴解・コミュニケーション能力を証明。", date: "2025年12月 ・ 得点：83／180", id: "受験番号: 25B3010401-51110 ・ 合格" },
    c5: { issuer: "ネパール電力公社", title: "電気工学 実地研修（6か月間）", desc: "変電所業務、保守作業、実際の電気運用に携わり、配電システムに関する6か月間の現場研修を修了。", date: "2022年6月 – 12月 ・ バラトプル", id: "発行日: 2022年12月21日" },
    c6: { issuer: "NPTEL・IIT Kharagpur", title: "Introduction to Industry 4.0 and Industrial Internet of Things", desc: "NPTEL／IIT Kharagpurの12週間コース「Industry 4.0と産業用IoT」を修了。全国受講者の上位5%にあたるEliteグレード、総合スコア85%を取得。", date: "2026年1月～4月", id: "受験番号：NPTEL26CS38S1266200256" },
    c7: { issuer: "Emertxe ・ NSDC / ESSCI", title: "IoT（モノのインターネット）— Edge AIプロジェクト", desc: "IoTのオンライン・インターンシップを修了し、プロジェクト「Edge AI Based Smart EV Charging Station Optimizer」を通じて実践的な実装力を発揮。", date: "2026年8月10日 – 9月16日", id: "ID: EI26_017" },
  },

  evidence: { title: "使用プロジェクト", closeLabel: "閉じる" },
  resume: {
    printBtn: "PDFとして保存",
    printBtnJa: "日本語でPDF保存",
    closeLabel: "履歴書を閉じる",
    headline: "B.Tech 電気電子工学 | ネパール ナワルパラシ（西）",
    summaryLabel: "職務要約",
    summary: "B.Tech 電気電子工学の最終学年（CGPA 9.13/10）。配電設備の保守、EVシステム、産業用IoTの実務経験を有する。2026年12月からの4か月間のインターンシップ（オートメーション、電力システム、電気設計分野）を希望。",
    educationLabel: "学歴",
    ed1deg: "B.Tech 電気電子工学 – CGPA 9.13/10", ed1school: "Aditya College of Engineering &amp; Technology（自治校）、インド アーンドラ・プラデーシュ州 スラムパレム", ed1years: "2023 – 2027",
    ed2deg: "高等中等教育（技術・職業課程 – 電気工学） – GPA 3.43/4", ed2school: "Shree Pashupati Secondary School、ネパール ルパンデヒ", ed2years: "2020 – 2022",
    ed3deg: "中等教育（理科を含む技術課程） – GPA 3.92/4", ed3school: "Tribhuvan Secondary School、ネパール ナワルパラシ（西）", ed3years: "2016 – 2020",
    experienceLabel: "職務経験",
    ex1role: "組込み・IoTインターン", ex1org: "Emertxe", ex1years: "2026年8月 – 2026年9月", ex1sub: "Edge AI Based Smart EV Charging Station Optimizer",
    ex1b1: "ESP32（Wokwi）上で3ベイのEV充電ステーションのシミュレーションを構築し、オンデバイスEdge AIで到着需要とセッション時間を予測。",
    ex1b2: "ベイごとの充電を許可・抑制・延期するリアルタイムの優先度ベースのアルゴリズムを実装し、ThingsBoard（MQTT）でテレメトリと制御を実現。",
    ex2role: "IoTインターン", ex2org: "Emertxe", ex2years: "2026年3月 – 2026年4月", ex2sub: "Smart Factory IoT Monitoring System",
    ex2b1: "Arduino UnoとPICSimLabでスマートファクトリーのシミュレーションを構築し、2つの組込みノードで生産・倉庫の状態を監視。",
    ex2b2: "MQTT経由でThingsBoard Cloudへリアルタイムデータを送信し、遠隔デバイス制御（RPC）とライブダッシュボードを実装。",
    ex3role: "OJT研修生", ex3org: "ネパール電力公社 バラトプール配電センター", ex3years: "2022年6月 – 2022年12月", ex3sub: "",
    ex3b1: "配電設備の保守と故障復旧を支援し、引込ケーブル交換、電力量計の設置、高圧線巡視を補助。",
    ex3b2: "変電所の運用に触れた。",
    projectsLabel: "プロジェクト",
    ptitle: "Transformer Life Gauge", ptag: "（MATLAB；シミュレーションで検証したコンセプト）",
    pb1: "負荷電流と温度から、IEEE C57.91の熱劣化モデルを用いて変圧器の残存絶縁寿命を推定する、低コストなIoT後付け方式を設計。",
    pb2: "モデルをMATLABのオフライン・シミュレーションで検証し、残存寿命（%）と安全な過負荷容量を示すライブダッシュボードも作成。",
    pb3: "光ファイバー監視に代わる低コストな手段として、既製のIoTハードウェアを用いた中規模変圧器向けを想定。",
    skillsLabel: "スキル",
    sk1label: "電気", sk1: "回路解析、パワーシステム、パワーエレクトロニクス、制御システム",
    sk2label: "設計・シミュレーション", sk2: "MATLAB、Simulink、Proteus 8 Professional、DIALux Evo、AutoCAD、Multisim、Ultiboard、PICSimLab、Wokwi",
    sk3label: "組込み・IoT", sk3: "Arduino、ESP32、STM32、MQTT、ThingsBoard",
    sk4label: "実務", sk4: "モーター・扇風機・家庭用電気機器の修理",
    sk5label: "言語", sk5: "英語、ヒンディー語、ネパール語、ボジュプリー語（母語）；日本語 – JLPT N5合格、N4学習中",
    certsLabel: "資格・認定",
    cert1: "Industry 4.0 / 産業用IoT – NPTEL（2026） &nbsp;|&nbsp; PCB設計（Multisim、Ultiboard） – Alison",
    cert2: "MATLAB Onramp と Simulink – MathWorks &nbsp;|&nbsp; JLPT N5 – 国際交流基金（2025年12月）",
    achLabel: "実績",
    ach1: "<strong>ポスター発表 第2位</strong> – VEDA 2K25 全国学生シンポジウム（2025年9月）",
    ach2: "<strong>学業成績順位：</strong>B.Tech 第1〜4学期で2位、第5学期で1位／中等教育で3位（2020年）",
  },

  achievements: {
    label: "表彰・活動", title: "表彰と<br><em>課外活動</em>",
    scoreLabel: "スコア", gradeLabel: "評価",
    a1: { catBadge: "全国優秀賞", title: "VEDA 2K25全国シンポジウム — 優秀賞（2位）", desc: "2025年9月のエンジニアズ・デー期間中、Aditya大学で開催されたVEDA 2K25全国学生シンポジウムのポスター発表部門にて優秀賞（2位）を受賞。テーマ：EV用電動モーター技術。" },
    a2: { catBadge: "学業優秀", title: "第5学期 学科内1位（学士課程 電気電子工学）", desc: "第5学期において学科内1位を達成。第1〜4学期は2位を維持し、安定した学業成績を収めました。5学期累計CGPA：9.13／10。" },
    a3: { catBadge: "リーダーシップ", title: "VEDA 2K25 シンポジウム運営委員", desc: "Aditya大学で開催されたVEDA 2K25全国学生シンポジウムの運営委員として、エンジニアズ・デーにおける技術セッションの運営と参加者対応を担当。" },
    a4: { catBadge: "論文発表", title: "VEDA 2K24シンポジウム — 論文発表", desc: "2024年9月のエンジニアズ・デー期間中に開催されたVEDA 2K24全国技術シンポジウムにて論文発表者として参加し、全国レベルでの研究発表力を示しました。" },
    a5: { catBadge: "語学資格", title: "日本語能力（JLPT N5認定）", desc: "2025年12月、JLPT N5に合格（得点83／180）。語彙・文法ではA評価を獲得。現在はJLPT N4取得に向けて学習を継続し、実務レベルのコミュニケーション力向上を目指しています。", scoreStat: "83 ／ 180", gradeStat: "A評価・語彙＆文法", targetStat: "目標：JLPT N4（学習中）" }
  },

  quickAnswers: {
    label: "よくある質問", title: "簡潔な<br><em>回答</em>",
    q1: "転居は可能ですか？", a1: "はい \u2014 日系企業での就職を積極的に目指しており、インド国内のコア電気工学職も対象としています。",
    q2: "ビザ・就労資格について", a2: "貴社の職務に応じたスポンサーシップ要件について、喜んでご相談させていただきます \u2014 下記の連絡先セクションよりご連絡ください。",
    q3: "最短でいつから勤務可能ですか？", a3: "B.Tech最終学年（2023\u20132027年）\u2014 インターンシップは即日対応可能、フルタイム勤務は卒業後から可能です。",
    q4: "英語・日本語の実力は？", a4: "英語：Cambridge B2（業務遂行レベル）。日本語：JLPT N5取得、現在N4取得に向けて学習中。"
  },

  contact: {
    label: "お問い合わせ", tagline: "次の一歩へ<br><em>準備万端</em>",
    sub: "日系企業での就職、およびインド国内のコア電気工学職を歓迎します。",
    quickInternship: "インターンシップについて", quickProject: "プロジェクトについて", quickGeneral: "一般的なお問い合わせ",
    email: "メール", phone: "電話", linkedin: "LinkedIn", instagram: "Instagram", github: "GitHub"
  },
  footer: { copy: "© 2026 ラフル・サフ — 電気電子エンジニア", jp: "電気技術者 ・ ラフル・サフ" },

  cmdk: {
    placeholder: "コマンドを入力または検索…",
    groupActions: "アクション", groupNavigate: "移動", groupContent: "コンテンツ",
    resume: "履歴書を見る", viewProjects: "プロジェクトを見る", github: "GitHubを開く", linkedin: "LinkedInを開く",
    email: "メールを送る", toggleTheme: "テーマを切替", switchLang: "言語を切替",
    goAbout: "自己紹介へ", goExperience: "職歴へ", goEducation: "学歴へ",
    goSkills: "スキルへ", goProjects: "プロジェクトへ", goCerts: "資格・修了証へ",
    goContact: "連絡先へ", noResults: "該当する結果がありません。",
    focusMode: "フォーカスモード切替", hint: "コマンド"
  }
},

/* ========================================================================== */
hi: {
  meta: { name: "हिन्दी" },
  nav: { about: "परिचय", experience: "अनुभव", education: "शिक्षा", skills: "कौशल", projects: "प्रोजेक्ट्स", certifications: "प्रमाणपत्र", contact: "संपर्क" },
  dock: { theme: "थीम बदलें", lang: "भाषा", cmdk: "कमांड पैलेट", resume: "रिज़्यूमे", mode: "उन्नत दृश्य" },
  a11y: { skipLink: "सामग्री पर जाएँ" },
  easterEgg: { message: "आपने इसे ढूंढ लिया — इतनी बारीकी से देखने के लिए धन्यवाद। JLPT के हर स्तर को पार करते हुए, जापान की ओर बढ़ रहा हूँ।" },

  hero: {
    availability: "मई 2027 में स्नातक · जापान और भारत में इंटर्नशिप व फुल-टाइम भूमिकाओं के लिए उपलब्ध",
    eyebrow: "EEE · अंतिम वर्ष · CGPA 9.13",
    name: "राहुल<br><em>साहू</em>",
    title: "इलेक्ट्रिकल एवं इलेक्ट्रॉनिक्स इंजीनियर", titleRotateExtra: "अंतिम वर्ष का EEE छात्र|जापान लक्ष्य · JLPT N5|एम्बेडेड सिस्टम्स & IoT",
    desc: "2027 में स्नातक होने वाला अंतिम वर्ष का B.Tech EEE छात्र — नेपाल इलेक्ट्रिसिटी अथॉरिटी में 6 महीने का फील्ड प्रशिक्षण, IoT व एम्बेडेड प्रोजेक्ट्स का अनुभव, MATLAB/Simulink में दक्षता और JLPT N5 जापानी भाषा प्रमाणन के साथ — जापानी इंजीनियरिंग कंपनियों में कोर इलेक्ट्रिकल इंजीनियरिंग भूमिकाओं के लिए लक्षित।",
    stat1Label: "CGPA / 10", stat2Label: "फील्ड OJT", stat3Label: "JLPT जापान",
    ctaPrimary: "संपर्क करें", ctaOutline: "कार्य देखें", ctaResume: "रिज़्यूमे देखें", ctaGithub: "GitHub",
    badgeJp: "日本語", badgeSmall: "जापान लक्ष्य",
    scroll: "स्क्रॉल करें"
  },
  marquee: ["पावर सिस्टम्स", "MATLAB / Simulink", "日本語 · JLPT N5", "एम्बेडेड सिस्टम्स", "IoT इंजीनियरिंग", "नेपाल इलेक्ट्रिसिटी अथॉरिटी"],

  about: {
    label: "मेरे बारे में", title: "उद्देश्य के साथ<br><em>इंजीनियर</em>",
    p1: "मैं आंध्र प्रदेश स्थित Aditya College of Engineering &amp; Technology में इलेक्ट्रिकल एवं इलेक्ट्रॉनिक्स इंजीनियरिंग का अंतिम वर्ष का B.Tech छात्र हूँ — <strong>9.13/10 CGPA</strong> के साथ लगातार शीर्ष प्रदर्शन करने वालों में शामिल रहा हूँ, <strong>सेमेस्टर 5 में विभाग में प्रथम स्थान</strong> तथा <strong>सेमेस्टर 1–4 में द्वितीय स्थान</strong> प्राप्त किया है।",
    p2: "मेरी नींव फील्ड में बनी। विश्वविद्यालय से पहले, मैंने <strong>नेपाल इलेक्ट्रिसिटी अथॉरिटी में 6 महीने की ऑन-द-जॉब ट्रेनिंग</strong> पूरी की, जिसमें डिस्ट्रिब्यूशन लाइन ऑपरेशन्स, सबस्टेशन गतिविधियों और एनर्जी मीटर इंस्टॉलेशन पर सीधे काम किया — वास्तविक इंफ्रास्ट्रक्चर, वास्तविक ज़िम्मेदारी।",
    p3: "नेपाल इलेक्ट्रिसिटी अथॉरिटी की OJT से, जहाँ मैंने पावर सिस्टम्स और मीटर इंस्टॉलेशन पर सीधे काम किया, लेकर स्मार्ट फैक्ट्री मॉनिटरिंग सिस्टम और ESP32 पर Edge AI-आधारित EV चार्जिंग ऑप्टिमाइज़र जैसे IoT-आधारित प्रोजेक्ट्स बनाने तक, मुझे कोर इलेक्ट्रिकल इंजीनियरिंग को एम्बेडेड और कनेक्टेड तकनीक से जोड़ना पसंद है। अब मैं जापान या भारत में ऐसी भूमिकाएँ तलाश रहा हूँ जहाँ मैं इन कौशलों का उपयोग कर सकूँ।",
    factsLabel: "मुख्य जानकारी",
    k1: "रोल नंबर", k2: "संस्थान", k3: "डिग्री", k4: "स्नातक (अपेक्षित)", k5: "CGPA", k6: "विभागीय रैंक", k7: "फील्ड OJT", k8: "लक्षित बाज़ार", k9: "राष्ट्रीयता", k10: "स्थान",
    v3: "B.Tech — EEE", v4: "मई 2027", v6: "प्रथम (सेम 5) · द्वितीय (सेम 1–4)", v7: "नेपाल इलेक्ट्रिसिटी अथॉरिटी", v8: "जापान", v9: "नेपाली", v10: "काकीनाडा, आंध्र प्रदेश"
  },

  experience: {
    label: "करियर", title: "अनुभव एवं<br><em>पृष्ठभूमि</em>",
    e1: { type: "इंटर्नशिप · NSDC संबद्ध", date: "10 अग॰ – 16 सित॰ 2026", title: "Edge AI Based Smart EV Charging Optimiser", org: "Emertxe · NSDC / ESSCI", desc: "इंटरनेट ऑफ थिंग्स (IoT) पर ऑनलाइन इंटर्नशिप पूरी की, जिसमें प्रशिक्षक के मार्गदर्शन में बनाए गए प्रोजेक्ट Edge AI Based Smart EV Charging Station Optimizer के माध्यम से व्यावहारिक क्रियान्वयन कौशल का प्रदर्शन किया।" },
    e2: { type: "इंटर्नशिप · NSDC संबद्ध", title: "IoT इंजीनियरिंग इंटर्नशिप", org: "Emertxe · NSDC / ESSCI", desc: "C प्रोग्रामिंग की बुनियादी बातों, माइक्रोकंट्रोलर इंटरफेसिंग और SDLC-आधारित प्रोजेक्ट निर्माण को कवर करने वाला IoT सिस्टम्स का व्यावहारिक प्रशिक्षण। नेशनल स्किल डेवलपमेंट कॉरपोरेशन और ESSCI से संबद्ध।" },
    e3: { type: "इंटर्नशिप · AICTE स्वीकृत", title: "इलेक्ट्रिक व्हीकल तकनीक", org: "SkillDzire · AICTE", desc: "इलेक्ट्रिक व्हीकल तकनीक और पावरट्रेन की बुनियादी बातों पर लघु अवधि की इंटर्नशिप। AICTE-स्वीकृत पाठ्यक्रम के तहत EV आर्किटेक्चर, बैटरी मैनेजमेंट सिद्धांत और चार्जिंग सिस्टम को कवर किया।" },
    e4: { type: "ऑन-द-जॉब ट्रेनिंग · 6 महीने", title: "इलेक्ट्रिकल इंजीनियरिंग प्रशिक्षु (OJT)", org: "नेपाल इलेक्ट्रिसिटी अथॉरिटी — भरतपुर", desc: "लाइव पावर डिस्ट्रिब्यूशन इंफ्रास्ट्रक्चर में छह महीने की संरचित OJT। ओवरहेड लाइन पेट्रोलिंग, फॉल्ट पहचान, स्विचयार्ड गतिविधियाँ, ट्रांसफार्मर निरीक्षण और एनर्जी मीटर इंस्टॉलेशन का कार्य किया। एक्टिंग सेंटर चीफ Er. Rajendra Prasad Paudel द्वारा प्रमाणित।", stat: "6 महीने" },
    e5: { type: "व्यावहारिक अनुभव", date: "मार्च – अप्रैल 2020", title: "इलेक्ट्रिकल मरम्मत एवं रखरखाव प्रशिक्षु", org: "स्थानीय मरम्मत एवं रखरखाव दुकान", desc: "एक छोटी स्थानीय इलेक्ट्रिकल मरम्मत एवं रखरखाव दुकान में लगभग दो महीने काम किया — सीलिंग फैन की मरम्मत व रखरखाव सीखा, सिंगल-फेज मोटर वाइंडिंग से परिचित हुआ और रोज़मर्रा के घरेलू विद्युत उपकरणों को ठीक किया।", stat: "2 महीने" }
  },

  education: {
    label: "शैक्षणिक यात्रा", title: "शैक्षणिक<br><em>पृष्ठभूमि</em>",
    apexKicker: "स्नातक शिखर", apexActive: "अध्ययनरत",
    rankLabel: "विभागीय स्थिति", rankVal: "प्रथम स्थान (सेमेस्टर 5)",
    pedigreeKicker: "तकनीकी शैक्षणिक आधार", pedigreeSub: "कालानुक्रमिक",
    trajectory: "सेमेस्टर प्रदर्शन प्रवृत्ति (SGPA)",
    telemetry1: "मेट्रिक सत्यापित (5 सेमेस्टर)", telemetry2: "स्थिति: अंतिम वर्ष", telemetry3: "लक्ष्य: जापान",
    ed1: { badge: "अध्ययनरत · अंतिम वर्ष", degree: "B.Tech — इलेक्ट्रिकल एवं इलेक्ट्रॉनिक्स इंजीनियरिंग", school: "Aditya College of Engineering &amp; Technology (स्वायत्त) · आंध्र प्रदेश, भारत", detail: "लगातार शीर्ष प्रदर्शन करने वालों में शामिल। सेमेस्टर 5 में प्रथम, तथा सेमेस्टर 1–4 में द्वितीय स्थान। तीसरा वर्ष मई 2026 में पूरा हुआ। कोर इलेक्ट्रिकल सिस्टम्स में मज़बूत आधार।", scoreLabel: "CGPA · 5 सेमेस्टर" },
    ed2: { badge: "पूर्ण · 2022", streamTag: "व्यावसायिक स्ट्रीम", degree: "उच्चतर माध्यमिक — तकनीकी एवं व्यावसायिक (EEE)", school: "Pashupati Secondary School · रूपन्देही, नेपाल", detail: "इलेक्ट्रिकल इंजीनियरिंग की बुनियादी बातों, व्यावहारिक अनुप्रयोगों और व्यावहारिक तकनीकी कौशल पर केंद्रित तकनीकी एवं व्यावसायिक स्ट्रीम में विशेषज्ञता।", scoreLabel: "GPA" },
    ed3: { badge: "पूर्ण · 2020", streamTag: "विज्ञान एवं गणित आधार", degree: "माध्यमिक शिक्षा — तकनीकी स्ट्रीम", school: "Tribhuvan Secondary School · नेपाल", detail: "तकनीकी स्ट्रीम में प्रारंभिक माध्यमिक शिक्षा पूरी की, जिससे भविष्य की इंजीनियरिंग और व्यावसायिक पढ़ाई हेतु गणितीय एवं वैज्ञानिक आधार मज़बूत हुआ।", scoreLabel: "GPA" }
  },

  skills: {
    label: "दक्षताएँ", title: "तकनीकी<br><em>कौशल</em>",
    indexLabel: "प्रवीणता सूची", langLabel: "भाषाएँ",
    currentlyLabel: "अभी", currentlyC1: "सीख रहा हूँ — जापानी (JLPT N4: परीक्षा दी, परिणाम प्रतीक्षित)", currentlyC2: "निर्माणाधीन — EV ADAS सिस्टम", currentlyC3: "निर्माणाधीन — ट्रांसफार्मर लाइफ गेज", currentlyUpdated: "अपडेट: अक्टूबर 2026",
    t1: { name: "पावर सिस्टम्स", desc: "B.Tech EEE के पाँच सेमेस्टर में लोड-फ्लो एवं फॉल्ट विश्लेषण का अभ्यास।" },
    t3: { name: "इलेक्ट्रिकल मशीनें", desc: "ट्रांसफॉर्मर, इंडक्शन मोटर एवं जनरेटर का परीक्षण व विश्लेषण।" },
    t4: { name: "कंट्रोल सिस्टम्स", desc: "क्लोज़्ड-लूप एवं स्टेट-मशीन नियंत्रण, एम्बेडेड प्रोजेक्ट्स में व्यावहारिक रूप से लागू।", evidence: "1 प्रोजेक्ट में उपयोग", evidenceProjects: "p6" },
    t6: { name: "MATLAB / Simulink", desc: "पावर सिस्टम्स एवं कंट्रोल पाठ्यक्रम हेतु सिमुलेशन व मॉडलिंग।" },
    t8: { name: "DIALux Evo", desc: "लाइटिंग डिज़ाइन एवं प्रकाश-योजना।" },
    t9: { name: "Proteus 8 Professional", desc: "हार्डवेयर निर्माण से पहले सर्किट सिमुलेशन एवं सत्यापन।", evidence: "1 प्रोजेक्ट में उपयोग", evidenceProjects: "p5" },
    t10: { name: "Arduino / माइक्रोकंट्रोलर", desc: "व्यावहारिक हार्डवेयर प्रोजेक्ट्स में एम्बेडेड नियंत्रण।", evidence: "3 प्रोजेक्ट्स में उपयोग", evidenceProjects: "p1,p5,p10" },
    lang1: { name: "अंग्रेज़ी", level: "B2" },
    lang2: { name: "जापानी", level: "N5" },
    lang3: { name: "नेपाली", level: "धाराप्रवाह" },
    lang4: { name: "हिंदी", level: "धाराप्रवाह" },
    lang5: { name: "भोजपुरी", level: "मातृभाषा" }
  },

  projects: {
    label: "कार्य", title: "प्रमुख<br><em>प्रोजेक्ट्स</em>",
    tabCompleted: "पूर्ण", tabOngoing: "जारी", tradeoffLabel: "सीमाएँ एवं डिज़ाइन निर्णय", problemLabel: "यह क्यों बनाया", differentlyLabel: "अगर फिर से बनाता तो अलग क्या करता",
    linkCode: "कोड देखें", linkLive: "लाइव डेमो",
    statusComplete: "पूर्ण", statusProgress: "प्रगति में", statusBlocked: "अवरुद्ध", statusLive: "लाइव",
    p1: { title: "स्मार्ट फैक्ट्री IoT मॉनिटरिंग सिस्टम", subtitle: "IoT इंटर्नशिप · Arduino · ThingsBoard · MQTT", desc: "IoT इंटर्नशिप के दौरान बनाया गया दो-नोड फैक्ट्री मॉनिटरिंग सिस्टम, जिसमें मुख्य नोड और वेयरहाउस नोड MQTT के माध्यम से ThingsBoard डैशबोर्ड पर डेटा भेजते हैं, ताकि रीयल-टाइम निगरानी हो सके।", tradeoff: "कस्टम बैकएंड के बजाय MQTT + ThingsBoard चुना ताकि मॉनिटरिंग जल्द शुरू हो सके, इसके बदले डैशबोर्ड कस्टमाइज़ेशन में कुछ समझौता हुआ। नोड 2 के समानांतर काम शुरू करने के बजाय पहले नोड 1 को जानबूझकर पूरा किया गया।", problem: "फ़ैक्ट्रियों में अक्सर उपकरणों की स्थिति की रीयल-टाइम जानकारी नहीं होती, और मैनुअल जाँच से समस्याएँ देर से पकड़ में आती हैं।", whatIdDoDifferently: "नोड 1 को पूरी तरह खत्म करने के बाद नोड 2 शुरू करने के बजाय, शुरुआत से दोनों पर समानांतर काम करता ताकि दोनों के बीच की इंटीग्रेशन समस्याएँ जल्दी पकड़ में आतीं।" },
    p2: { title: "RONIN — JLPT शब्दावली ट्रेनर", subtitle: "प्रोग्रेसिव वेब ऐप · Vanilla JavaScript", desc: "बिना बिल्ड-स्टेप के लाइव PWA, जिसमें N5 और N4 शब्दावली शामिल है। इसमें SRS फ्लैशकार्ड, क्विज़, चार मिनी-गेम्स (मेमोरी मैच, कांजी मेटेओर, वर्ड चेन, JLPT मॉक टेस्ट), Jisho API डिक्शनरी सर्च, कस्टम डेक, एनालिटिक्स/हीटमैप, XP गेमिफिकेशन, पूर्ण ऑफ़लाइन सपोर्ट, और मल्टी-डिवाइस टच कंट्रोल्स शामिल हैं। प्रोडक्शन-स्तरीय थीमिंग, लाइट/डार्क मोड और एक्सेसिबिलिटी के साथ निर्मित।", tradeoff: "फ्रेमवर्क के बजाय बिना-बिल्ड Vanilla JavaScript चुनी ताकि हल्का, निर्भरता-रहित और तुरंत लोड होने वाला ऑफ़लाइन PWA बन सके, भले ही इससे फ्रेमवर्क की कुछ सुविधाएँ छूट गई हों।", problem: "अधिकतर JLPT शब्दावली ऐप्स को इंटरनेट की ज़रूरत होती है और वे यह नहीं समझते कि सीखने वाले को वास्तव में किन शब्दों में दिक्कत हो रही है।", whatIdDoDifferently: "शुरुआत में ही एक हल्का बैकएंड सिंक विकल्प जोड़ता, क्योंकि अभी सारा डेटा केवल लोकल स्टोरेज में है — डिवाइस बदलने पर प्रगति खो जाती है।" },
    p4: { title: "ट्रांसफार्मर लाइफ गेज", subtitle: "सर्किट सिमुलेशन", desc: "सिमुलेशन चरण पूरा हो चुका है। डिज़ाइन को अंतिम रूप देने से पहले कुछ छोटी सर्किट संबंधी खामियाँ अभी ठीक की जानी बाकी हैं।", tradeoff: "हार्डवेयर में निवेश से पहले जानबूझकर केवल सिमुलेशन-आधारित सत्यापन तक सीमित रखा, ताकि जल्दी प्रोटोटाइप बनाने के बजाय पहले मॉडल की सटीकता सुनिश्चित की जा सके।", problem: "ट्रांसफार्मर का इंसुलेशन वर्षों की थर्मल स्ट्रेस से चुपचाप घिसता है, और जब तक बाहरी लक्षण दिखते हैं तब तक अक्सर योजना बनाने में देर हो चुकी होती है।", whatIdDoDifferently: "सर्किट को अंतिम रूप देने से पहले ही एजिंग मॉडल को प्रकाशित IEEE लॉस-ऑफ़-लाइफ कर्व के विरुद्ध सत्यापित करता — इस बार यह क्रम उल्टा रहा।" },
    p5: { title: "सोलर मॉनिटरिंग सिस्टम", subtitle: "Arduino Uno · Proteus", desc: "पैनल वोल्टेज, चार्जिंग करंट, बैटरी वोल्टेज, बैटरी SOC, आउटपुट पावर, और उत्पन्न ऊर्जा को मापने वाला रीयल-टाइम सोलर एनर्जी मॉनिटरिंग सिस्टम — सभी डेटा 20×4 LCD पर प्रदर्शित। पूर्ण एवं पूरी तरह सिमुलेटेड।", tradeoff: "कनेक्टेड IoT डैशबोर्ड के बजाय स्व-निहित Arduino + LCD डिस्प्ले चुना, जिससे रिमोट विज़िबिलिटी में कमी आई लेकिन यूनिट बिना किसी इंटरनेट निर्भरता के लगातार काम करती रहती है।", problem: "बिना मॉनिटरिंग वाला सोलर इंस्टॉलेशन हफ़्तों तक कम प्रदर्शन करता रह सकता है, बिना किसी के ध्यान दिए।", whatIdDoDifferently: "SD कार्ड पर बुनियादी डेटा लॉगिंग जोड़ता — अभी सारी रीडिंग केवल लाइव हैं, इसलिए बिजली जाने पर उस दिन का इतिहास खो जाता है।" },
    p6: { title: "EV ADAS सिस्टम", subtitle: "STM32 (Blue Pill) · PICSimLab · Python / Matplotlib", desc: "Emertxe में ऑटोमोटिव एम्बेडेड सिस्टम्स इंटर्नशिप के दौरान बनाया गया STM32-आधारित EV कंट्रोल एवं ADAS स्टेट मशीन, जो रीयल-टाइम Python/Matplotlib डैशबोर्ड से जुड़ा है और PICSimLab में सिमुलेटेड है। कार्यात्मक रूप से तैयार; फ़िलहाल एक माइक्रोकंट्रोलर कॉन्फ़िगरेशन समस्या पर काम चल रहा है।", tradeoff: "Arduino के बजाय STM32 चुना ताकि ऑटोमोटिव-ग्रेड टाइमिंग एवं इंटरप्ट हैंडलिंग मिल सके — इससे 8-बिट MCU से अधिक प्रोसेसिंग क्षमता मिली, लेकिन कॉन्फ़िगरेशन जटिल हो गया, जो वर्तमान कॉन्फ़िगरेशन समस्या का कारण भी है।", problem: "EV की कंट्रोल लॉजिक और ड्राइवर-असिस्ट फ़ीचर्स अक्सर अलग-अलग विकसित और टेस्ट किए जाते हैं, जिससे इंटीग्रेशन की खामियाँ काफ़ी देर बाद पता चलती हैं।", whatIdDoDifferently: "बाकी सिस्टम जोड़ने से पहले STM32 के इंटरप्ट/टाइमर व्यवहार को ठीक से समझ लेता — वर्तमान समस्या की जड़ शुरुआत में बनाई गई एक कॉन्फ़िगरेशन धारणा में है।" },
    p10: { title: "Edge AI आधारित स्मार्ट EV चार्जिंग स्टेशन ऑप्टिमाइज़र", subtitle: "ESP32 · Edge AI · Wokwi · ThingsBoard · MQTT", desc: "मल्टी-बे EV स्टेशन के लिए बुद्धिमान, ऑन-डिवाइस चार्जिंग नियंत्रण। तीन-बे वाला एक सिमुलेटेड इलेक्ट्रिक वाहन चार्जिंग स्टेशन, जिसमें हर बे ऑन-डिवाइस Edge AI से आगमन की माँग और सत्र की अवधि का अनुमान लगाता है, और एक स्थानीय ऑप्टिमाइज़ेशन एल्गोरिदम रीयल-टाइम में चार्जिंग को अनुमति देता, धीमा करता या टालता है — सब कुछ MQTT पर ThingsBoard के माध्यम से समन्वित। पूरी तरह ESP32 पर बनाया गया और Wokwi में सिमुलेटेड; डिवाइस पर किसी मशीन-लर्निंग रनटाइम की आवश्यकता नहीं।", tradeoff: "अनुमान और ऑप्टिमाइज़ेशन लॉजिक को क्लाउड के बजाय सीधे ESP32 पर चलाया, ताकि चार्जिंग निर्णय रीयल-टाइम और कनेक्टिविटी से स्वतंत्र रहें, और ऐसा हल्का तरीका अपनाया जिसे डिवाइस पर मशीन-लर्निंग रनटाइम की ज़रूरत नहीं — मॉडल की जटिलता कुछ कम करके सरलता को प्राथमिकता दी।", problem: "जब कई वाहन एक साथ प्लग-इन करते हैं तो EV चार्जिंग स्टेशन की सप्लाई पर ओवरलोड हो सकता है, और हर चार्जिंग निर्णय के लिए क्लाउड पर निर्भर रहने से देरी और विफलता का एकल बिंदु जुड़ जाता है।", whatIdDoDifferently: "मैं कंट्रोल लॉजिक को असली चार्जर और करंट सेंसिंग वाले वास्तविक हार्डवेयर पर परखता — अभी तक यह केवल Wokwi के सिमुलेशन में ही सिद्ध हुआ है।" }
  },

  certifications: {
    label: "प्रमाणपत्र", title: "प्रमाणपत्र एवं<br><em>प्रशिक्षण</em>", verified: "सत्यापित", viewCert: "प्रमाणपत्र देखें", verifyNptel: "NPTEL से सत्यापित करें ↗", aboutJlpt: "JLPT के बारे में ↗",
    c1: { issuer: "SkillDzire · APSCHE", title: "AutoCAD से इलेक्ट्रिकल सिस्टम डिज़ाइन", desc: "वायरिंग डायग्राम, लोड कैलकुलेशन और वास्तविक पावर डिस्ट्रिब्यूशन प्लानिंग सहित AutoCAD से इलेक्ट्रिकल लेआउट डिज़ाइन किए।", date: "दिसंबर 2025 – मार्च 2026 · दीर्घकालिक", id: "ID: 93fq34859p" },
    c2: { issuer: "Emertxe · NSDC / ESSCI", title: "इंटरनेट ऑफ थिंग्स (IoT)", desc: "Arduino, MQTT और ThingsBoard का उपयोग कर रीयल-टाइम मॉनिटरिंग, ऑटोमेशन और SDLC-आधारित डेवलपमेंट के साथ स्मार्ट फैक्ट्री IoT सिस्टम बनाया।", date: "मार्च – अप्रैल 2026", id: "ID: EI26_015" },
    c3: { issuer: "SkillDzire · AICTE", title: "इलेक्ट्रिक व्हीकल तकनीक इंटर्नशिप", desc: "बैटरी सिस्टम, मोटर कंट्रोल और चार्जिंग इंफ्रास्ट्रक्चर अवधारणाओं सहित EV तकनीकों का व्यावहारिक अनुभव प्राप्त किया।", date: "मई 2025 – जुलाई 2025 · दीर्घकालिक", id: "ID: SDST-25-00033" },
    c4: { issuer: "JLPT · जापान फाउंडेशन", title: "जापानी भाषा प्रवीणता — N5", desc: "जापानी भाषा प्रवीणता परीक्षा N5 उत्तीर्ण की, जिसमें बुनियादी पठन, श्रवण और संचार कौशल प्रदर्शित किया।", date: "दिसंबर 2025 · स्कोर: 83 / 180", id: "पंजीकरण: 25B3010401-51110 · उत्तीर्ण" },
    c5: { issuer: "नेपाल इलेक्ट्रिसिटी अथॉरिटी", title: "6-महीने की इलेक्ट्रिकल इंजीनियरिंग OJT", desc: "सबस्टेशन, मेंटेनेंस और रीयल-टाइम इलेक्ट्रिकल ऑपरेशन्स पर काम करते हुए पावर डिस्ट्रिब्यूशन सिस्टम्स में 6-महीने की फील्ड ट्रेनिंग पूरी की।", date: "जून – दिसंबर 2022 · भरतपुर", id: "जारी: 21 दिसंबर, 2022" },
    c6: { issuer: "NPTEL · IIT खड़गपुर", title: "Introduction to Industry 4.0 and Industrial Internet of Things", desc: "NPTEL / IIT खड़गपुर के 12-सप्ताह के Industry 4.0 एवं औद्योगिक IoT कोर्स को पूर्ण किया, Elite ग्रेड (राष्ट्रीय स्तर पर शीर्ष 5%) के साथ कुल 85% स्कोर प्राप्त किया।", date: "जन. – अप्रैल 2026", id: "रोल नंबर: NPTEL26CS38S1266200256" },
    c7: { issuer: "Emertxe · NSDC / ESSCI", title: "इंटरनेट ऑफ थिंग्स (IoT) — Edge AI प्रोजेक्ट", desc: "IoT पर ऑनलाइन इंटर्नशिप पूरी की और प्रोजेक्ट Edge AI Based Smart EV Charging Station Optimizer के माध्यम से व्यावहारिक क्रियान्वयन कौशल का प्रदर्शन किया।", date: "10 अग॰ – 16 सित॰ 2026", id: "ID: EI26_017" },
  },

  evidence: { title: "इनमें प्रयुक्त", closeLabel: "बंद करें" },
  resume: {
    printBtn: "PDF के रूप में सहेजें",
    printBtnJa: "PDF सहेजें (जापानी)",
    closeLabel: "रिज़्यूमे बंद करें",
    headline: "B.Tech इलेक्ट्रिकल एवं इलेक्ट्रॉनिक्स इंजीनियरिंग | नवलपरासी (पश्चिम), नेपाल",
    summaryLabel: "सारांश",
    summary: "अंतिम वर्ष का B.Tech इलेक्ट्रिकल एवं इलेक्ट्रॉनिक्स इंजीनियरिंग छात्र (CGPA 9.13/10), जिसके पास यूटिलिटी वितरण रखरखाव, EV सिस्टम और औद्योगिक IoT का व्यावहारिक अनुभव है। दिसंबर 2026 से ऑटोमेशन, पावर सिस्टम या इलेक्ट्रिकल डिज़ाइन में 4 महीने की इंटर्नशिप की तलाश।",
    educationLabel: "शिक्षा",
    ed1deg: "B.Tech, इलेक्ट्रिकल एवं इलेक्ट्रॉनिक्स इंजीनियरिंग – CGPA 9.13/10", ed1school: "आदित्य कॉलेज ऑफ इंजीनियरिंग एंड टेक्नोलॉजी (स्वायत्त), सुरमपालेम, आंध्र प्रदेश", ed1years: "2023 – 2027",
    ed2deg: "उच्च माध्यमिक (तकनीकी एवं व्यावसायिक – इलेक्ट्रिकल इंजीनियरिंग) – GPA 3.43/4", ed2school: "श्री पशुपति माध्यमिक विद्यालय, रुपन्देही, नेपाल", ed2years: "2020 – 2022",
    ed3deg: "माध्यमिक (विज्ञान सहित तकनीकी धारा) – GPA 3.92/4", ed3school: "त्रिभुवन माध्यमिक विद्यालय, नवलपरासी (पश्चिम), नेपाल", ed3years: "2016 – 2020",
    experienceLabel: "अनुभव",
    ex1role: "एम्बेडेड एवं IoT इंटर्न", ex1org: "Emertxe", ex1years: "अगस्त 2026 – सितंबर 2026", ex1sub: "Edge AI Based Smart EV Charging Station Optimizer",
    ex1b1: "ESP32 (Wokwi) पर तीन-बे EV चार्जिंग स्टेशन का सिमुलेशन बनाया, जिसमें ऑन-डिवाइस Edge AI आगमन की माँग और सत्र की अवधि का अनुमान लगाता है।",
    ex1b2: "हर बे के लिए चार्जिंग को रीयल-टाइम में अनुमति देने, धीमा करने या टालने वाला प्राथमिकता-आधारित एल्गोरिदम लागू किया, और MQTT पर ThingsBoard के माध्यम से टेलीमेट्री व नियंत्रण किया।",
    ex2role: "IoT इंटर्न", ex2org: "Emertxe", ex2years: "मार्च 2026 – अप्रैल 2026", ex2sub: "Smart Factory IoT Monitoring System",
    ex2b1: "Arduino Uno और PICSimLab पर स्मार्ट फैक्ट्री सिमुलेशन बनाया, जिसमें दो एम्बेडेड नोड उत्पादन और वेयरहाउस की स्थितियों की निगरानी करते हैं।",
    ex2b2: "MQTT के ज़रिए ThingsBoard Cloud पर रीयल-टाइम डेटा भेजा; रिमोट डिवाइस नियंत्रण (RPC) और लाइव डैशबोर्ड लागू किए।",
    ex3role: "ऑन-द-जॉब प्रशिक्षु", ex3org: "नेपाल इलेक्ट्रिसिटी अथॉरिटी, भरतपुर वितरण केंद्र", ex3years: "जून 2022 – दिसंबर 2022", ex3sub: "",
    ex3b1: "वितरण रखरखाव और फॉल्ट बहाली में सहयोग दिया; सर्विस केबल बदलने, एनर्जी मीटर लगाने और HT लाइन पेट्रोलिंग में सहायता की।",
    ex3b2: "सबस्टेशन संचालन का अनुभव प्राप्त किया।",
    projectsLabel: "प्रोजेक्ट्स",
    ptitle: "Transformer Life Gauge", ptag: "(MATLAB; सिमुलेशन से सत्यापित कॉन्सेप्ट)",
    pb1: "लोड करंट और तापमान से ट्रांसफ़ॉर्मर की शेष इन्सुलेशन आयु का अनुमान लगाने वाला कम लागत का IoT रेट्रोफिट कॉन्सेप्ट, IEEE C57.91 थर्मल एजिंग मॉडल के आधार पर डिज़ाइन किया।",
    pb2: "मॉडल को MATLAB में ऑफ़लाइन सिमुलेशन और शेष आयु (%) तथा सुरक्षित ओवरलोड क्षमता दिखाने वाले लाइव डैशबोर्ड के रूप में सत्यापित किया।",
    pb3: "फाइबर-ऑप्टिक मॉनिटरिंग के कम लागत विकल्प के रूप में, ऑफ-द-शेल्फ IoT हार्डवेयर का उपयोग करते हुए मध्यम आकार के ट्रांसफ़ॉर्मरों को लक्ष्य बनाया।",
    skillsLabel: "कौशल",
    sk1label: "इलेक्ट्रिकल", sk1: "सर्किट विश्लेषण, पावर सिस्टम्स, पावर इलेक्ट्रॉनिक्स, कंट्रोल सिस्टम्स",
    sk2label: "डिज़ाइन व सिमुलेशन", sk2: "MATLAB, Simulink, Proteus 8 Professional, DIALux Evo, AutoCAD, Multisim, Ultiboard, PICSimLab, Wokwi",
    sk3label: "एम्बेडेड व IoT", sk3: "Arduino, ESP32, STM32, MQTT, ThingsBoard",
    sk4label: "व्यावहारिक", sk4: "मोटर, पंखों और घरेलू उपकरणों की इलेक्ट्रिकल मरम्मत",
    sk5label: "भाषाएँ", sk5: "अंग्रेज़ी, हिन्दी, नेपाली, भोजपुरी (मातृभाषा); जापानी – JLPT N5 उत्तीर्ण, N4 की तैयारी",
    certsLabel: "प्रमाणपत्र",
    cert1: "Industry 4.0 / औद्योगिक IoT – NPTEL (2026) &nbsp;|&nbsp; PCB डिज़ाइन (Multisim, Ultiboard) – Alison",
    cert2: "MATLAB Onramp और Simulink – MathWorks &nbsp;|&nbsp; JLPT N5 – जापान फ़ाउंडेशन (दिसंबर 2025)",
    achLabel: "उपलब्धियाँ",
    ach1: "<strong>द्वितीय पुरस्कार, पोस्टर प्रेजेंटेशन</strong> – VEDA 2K25 राष्ट्रीय स्तरीय विद्यार्थी संगोष्ठी (सितंबर 2025)",
    ach2: "<strong>शैक्षणिक रैंक:</strong> B.Tech में सेमेस्टर 1–4 में द्वितीय और सेमेस्टर 5 में प्रथम; माध्यमिक स्तर पर तृतीय (2020)",
  },

  achievements: {
    label: "उपलब्धियाँ", title: "उपलब्धियाँ एवं<br><em>गतिविधियाँ</em>",
    scoreLabel: "स्कोर", gradeLabel: "ग्रेड",
    a1: { catBadge: "राष्ट्रीय पुरस्कार", title: "द्वितीय पुरस्कार — VEDA 2K25 राष्ट्रीय संगोष्ठी", desc: "सितंबर 2025 में इंजीनियर्स डे के दौरान Aditya विश्वविद्यालय में आयोजित VEDA 2K25 राष्ट्रीय स्तरीय छात्र संगोष्ठी में पोस्टर प्रेजेंटेशन में द्वितीय पुरस्कार प्राप्त किया। प्रोजेक्ट: EV अनुप्रयोगों हेतु इलेक्ट्रिक मोटर तकनीकें।" },
    a2: { catBadge: "शैक्षणिक उत्कृष्टता", title: "सेमेस्टर 5 में प्रथम स्थान, B.Tech EEE", desc: "सेमेस्टर 5 में विभाग में प्रथम स्थान प्राप्त किया। सेमेस्टर 1–4 में लगातार द्वितीय स्थान बनाए रखते हुए निरंतर शैक्षणिक उत्कृष्टता दिखाई। पाँच सेमेस्टर के बाद कुल CGPA: 9.13/10।" },
    a3: { catBadge: "नेतृत्व", title: "संगोष्ठी समन्वयक — VEDA 2K25", desc: "Aditya विश्वविद्यालय में आयोजित VEDA 2K25 राष्ट्रीय स्तरीय छात्र संगोष्ठी में इवेंट समन्वयक के रूप में कार्य किया, इंजीनियर्स डे के लिए तकनीकी सत्रों और प्रतिभागी समन्वय का प्रबंधन किया।" },
    a4: { catBadge: "पेपर प्रेजेंटेशन", title: "पेपर प्रेजेंटेशन — VEDA 2K24 संगोष्ठी", desc: "सितंबर 2024 में इंजीनियर्स डे के दौरान आयोजित VEDA 2K24 राष्ट्रीय स्तरीय तकनीकी संगोष्ठी में पेपर प्रेजेंटर के रूप में भाग लिया, राष्ट्रीय स्तर पर शोध संप्रेषण कौशल प्रदर्शित किया।" },
    a5: { catBadge: "भाषा प्रमाणपत्र", title: "जापानी भाषा प्रवीणता (JLPT N5 प्रमाणित)", desc: "दिसंबर 2025 में JLPT N5 सफलतापूर्वक उत्तीर्ण किया (स्कोर 83/180), शब्दावली और व्याकरण में A ग्रेड प्राप्त किया। वर्तमान में व्यावसायिक संचार एवं कार्यस्थल तत्परता बढ़ाने हेतु JLPT N4 की तैयारी कर रहा हूँ।", scoreStat: "83 / 180", gradeStat: "ग्रेड A · शब्दावली एवं व्याकरण", targetStat: "लक्ष्य: JLPT N4 — जारी" }
  },

  quickAnswers: {
    label: "पूछने से पहले", title: "त्वरित<br><em>उत्तर</em>",
    q1: "स्थानांतरण के लिए तैयार हैं?", a1: "हाँ \u2014 जापानी इंजीनियरिंग नियुक्तियों के साथ-साथ भारत में कोर EEE भूमिकाओं को भी सक्रिय रूप से लक्षित कर रहा हूँ।",
    q2: "वीज़ा / कार्य प्राधिकरण?", a2: "आपकी विशिष्ट भूमिका हेतु प्रायोजन आवश्यकताओं पर चर्चा करने में खुशी होगी \u2014 नीचे दिए गए संपर्क सेक्शन के माध्यम से संपर्क करें।",
    q3: "सबसे जल्दी कब उपलब्ध हैं?", a3: "B.Tech का अंतिम वर्ष (2023\u20132027) \u2014 इंटर्नशिप के लिए तुरंत उपलब्ध, और स्नातक होने के बाद पूर्णकालिक भूमिकाओं के लिए उपलब्ध।",
    q4: "अंग्रेज़ी / जापानी में दक्षता?", a4: "अंग्रेज़ी: Cambridge B2 (व्यावसायिक कार्य प्रवीणता)। जापानी: JLPT N5, वर्तमान में N4 की तैयारी कर रहा हूँ।"
  },

  contact: {
    label: "संपर्क करें", tagline: "अगले कदम के लिए<br><em>तैयार</em>",
    sub: "जापानी इंजीनियरिंग नियुक्तियों और भारत में कोर EEE भूमिकाओं के लिए उपलब्ध।",
    quickInternship: "इंटर्नशिप के बारे में पूछें", quickProject: "प्रोजेक्ट के बारे में पूछें", quickGeneral: "सामान्य पूछताछ",
    email: "ईमेल", phone: "फ़ोन", linkedin: "LinkedIn", instagram: "Instagram", github: "GitHub"
  },
  footer: { copy: "© 2026 राहुल साहू — इलेक्ट्रिकल एवं इलेक्ट्रॉनिक्स इंजीनियर", jp: "電気技術者 ・ ラフル・サフ" },

  cmdk: {
    placeholder: "कमांड टाइप करें या खोजें…",
    groupActions: "क्रियाएँ", groupNavigate: "नेविगेट करें", groupContent: "सामग्री",
    resume: "रिज़्यूमे देखें", viewProjects: "प्रोजेक्ट्स देखें", github: "GitHub खोलें", linkedin: "LinkedIn खोलें",
    email: "ईमेल भेजें", toggleTheme: "थीम बदलें", switchLang: "भाषा बदलें",
    goAbout: "परिचय पर जाएँ", goExperience: "अनुभव पर जाएँ", goEducation: "शिक्षा पर जाएँ",
    goSkills: "कौशल पर जाएँ", goProjects: "प्रोजेक्ट्स पर जाएँ", goCerts: "प्रमाणपत्र पर जाएँ",
    goContact: "संपर्क पर जाएँ", noResults: "कोई परिणाम नहीं मिला।",
    focusMode: "फोकस मोड टॉगल करें", hint: "कमांड"
  }
}

};
