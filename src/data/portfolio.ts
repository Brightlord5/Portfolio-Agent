export const portfolioData = {
  name: "Anas Shaik",
  title: "AI Engineer",
  tagline: "AI Engineer @ Deriv | Computer Engineering @ BITS Pilani | Generative & Agentic AI",
  location: "Dubai, United Arab Emirates",
  email: "shaikanas0510@gmail.com",
  linkedin: "https://www.linkedin.com/in/anas-shaik/",
  github: "https://github.com/Brightlord5",

  about: `AI Engineer at Deriv building autonomous systems that solve real security, compliance, and fraud problems at scale. Final-year Computer Engineering graduate from BITS Pilani Dubai (CGPA 9.7/10, First Rank). Passionate about Generative and Agentic AI — from multi-agent SOCs to open-source AI security tools. Published a patent, won AI hackathons, judged one. Loves chocolate, Telugu cinema, and writes scripts/screenplays on the side.`,

  personalFacts: [
    "Chocolate over everything — coffee has never been an option",
    "Deep into Telugu cinema, especially Rajinikanth — Chitti is a tribute, not a coincidence",
    "Writes scripts and screenplays on the side — storytelling is a second language",
    "Former model — yes, really",
    "Represented his district in Kabaddi and his state in Table Tennis",
    "Rides horses — the kind of hobby that surprises people",
    "Judged the Deriv × LabLab.ai AI Hackathon (Feb 2026) — from participant to judge",
    "Topped his entire batch in first year at BITS Pilani Dubai — 9.95 CGPA",
    "Published a patent on AI + Agriculture at 19 — before most people finish their first internship",
  ],

  education: [
    {
      institution: "Birla Institute Of Technology and Science, Pilani Dubai",
      degree: "Bachelor of Engineering — Computer Science",
      period: "Aug 2021 – Aug 2025",
      grade: "CGPA: 9.7/10 (First Year: 9.95 — First Rank among entire batch)",
      activities: ["GDSC BPDC", "ACM BPDC", "IFOR BPDC (Robotics Club)", "Sports Club"],
    },
    {
      institution: "Delhi Public School, India",
      degree: "Senior Secondary (Class 11-12)",
      period: "Jun 2019 – Jul 2021",
      grade: "96.6% in Class 12",
      activities: ["School Ambassador (Student Council)", "Deputy School Ambassador"],
    },
    {
      institution: "Delhi Public School, India",
      degree: "Secondary School (Class 5-10)",
      period: "Apr 2013 – Apr 2019",
      grade: "10 CGPA — Certificate of Merit",
      activities: ["Deputy Head Boy (Student Council 2015-16)", "Silver Medal Table Tennis (Intra Murals 2019)", "Gold Medal Kabaddi (Intra Murals 2019)"],
    },
  ],

  experience: [
    {
      role: "AI Engineer",
      company: "Deriv",
      type: "Full-time",
      period: "Aug 2025 – Present",
      location: "Dubai, UAE",
      highlights: [
        "Built an AI-powered SOC with multi-agent orchestration — autonomously detects and remediates malicious/anomalous activities, saving significant analyst man-hours.",
        "Developed an AI Threat Intelligence Platform to track IOCs (Indicators of Compromise) and classify them as malicious or benign in real-time.",
        "Built AI Pentesters that autonomously solve PortSwigger Web Security Labs and surface real vulnerabilities.",
        "Developed a BurpSuite MCP server with a stable Python backend replacing an unstable Java implementation.",
        "Built anti-fraud agents that detect mirror/opposite trades — helping Deriv save money at scale.",
        "Created compliance agents that auto-draft sanction memos, saving hours of manual analyst work.",
      ],
      skills: ["Agentic AI", "LangGraph", "Python", "MCP", "Security", "LLMs"],
    },
    {
      role: "AI Engineer",
      company: "Dalil AI",
      type: "Full-time",
      period: "Jan 2025 – Jul 2025",
      location: "Dubai, UAE",
      highlights: [
        "Engineered Agentic AI architecture with OpenAI SDK — reduced token usage by 60% and latency by 70% for 500+ users.",
        "Developed custom tools for agents for optimized database interactions and improved system performance.",
        "Built automation engine with 12+ Actions/Triggers and custom CRUD integrations for Zapier and Make.com — saving 10+ hours weekly per rep, reducing admin costs by 50%.",
        "Deployed GCP-based DevOps infrastructure via GitHub Actions.",
      ],
      skills: ["OpenAI SDK", "Agentic AI", "GCP", "Zapier", "Make.com", "Python"],
    },
    {
      role: "Data Science & LLMOps Intern",
      company: "Foulath Holding",
      type: "Internship",
      period: "Jun 2024 – Aug 2024",
      location: "Bahrain",
      highlights: [
        "Led steel plant DRI project — created a data pipeline that saved 20 days per month.",
        "Built CO2 emissions forecasting app using fine-tuned Meta Prophet model with time-series results.",
        "Deployed LLM-based system on AWS for natural language insights from complex visualizations.",
        "Integrated PowerBI dashboard for detailed EDA and financial projections.",
      ],
      skills: ["Python", "Meta Prophet", "AWS", "LLMs", "PowerBI", "Streamlit"],
    },
    {
      role: "Operations Research Intern",
      company: "Emirates",
      type: "Internship",
      period: "Jun 2023 – Aug 2023",
      location: "Dubai, UAE",
      highlights: [
        "Led development of Groups Materialization Prediction — an ML project using XGBoost for group booking analysis.",
        "Conducted thorough data cleaning, feature engineering, and hyperparameter tuning.",
        "Built interactive Streamlit/Dash app; used Snowflake Data Cloud and Plotly.",
        "Presented to Divisional VP of Revenue Optimization — earned commendation.",
      ],
      skills: ["Python", "XGBoost", "Streamlit", "Snowflake", "Plotly", "Data Science"],
    },
    {
      role: "Data Science Intern",
      company: "Cognerium",
      type: "Internship",
      period: "Aug 2022 – Sep 2022",
      location: "Hyderabad, India",
      highlights: [
        "Developed a Logistic Regression model using pandas and statsmodels in the FinTech / Microlending sector.",
        "Gained experience in professional ML model development and Finance sector operations.",
      ],
      skills: ["Python", "Machine Learning", "pandas", "statsmodels", "FinTech"],
    },
  ],

  projects: [
    // Descending order — most recent first
    {
      name: "AI-Powered SOC (Security Operations Center)",
      company: "Deriv",
      period: "2025 – Present",
      description:
        "Multi-agent system that autonomously monitors, detects, and remediates malicious/anomalous activities across Deriv's infrastructure. Specialized agents work in parallel — saving significant analyst man-hours and reducing response time.",
      tags: ["Agentic AI", "LangGraph", "Python", "Security", "LLMs"],
      link: null,
      featured: true,
    },
    {
      name: "AI Threat Intelligence Platform",
      company: "Deriv",
      period: "2025 – Present",
      description:
        "Platform that continuously tracks Indicators of Compromise (IOCs) and classifies them as malicious or benign in real-time, helping Deriv maintain proactive threat awareness across its infrastructure.",
      tags: ["Threat Intelligence", "AI", "Python", "Security"],
      link: null,
      featured: true,
    },
    {
      name: "Anti-Fraud Agent System",
      company: "Deriv",
      period: "2025",
      description:
        "AI agents that detect mirror/opposite trades — a form of financial fraud — helping Deriv identify and prevent financial losses at scale.",
      tags: ["Agentic AI", "Python", "Fraud Detection", "Finance"],
      link: null,
    },
    {
      name: "Compliance Agent — Sanction Memos",
      company: "Deriv",
      period: "2025",
      description:
        "AI agent that auto-drafts sanction memos for the compliance team, turning a time-intensive manual process into a seconds-long automated workflow.",
      tags: ["LLMs", "Compliance", "Python", "Automation"],
      link: null,
    },
    {
      name: "BurpSuite MCP Server",
      company: "Deriv",
      period: "2025",
      description:
        "Built a stable Python-based MCP (Model Context Protocol) backend for BurpSuite, replacing an unstable Java backend and enabling reliable AI-assisted security testing workflows.",
      tags: ["MCP", "Python", "BurpSuite", "Security"],
      link: null,
    },
    {
      name: "PromptSentry",
      company: "Personal / Open Source",
      period: "Dec 2025",
      description:
        "Open-source Git pre-commit hook for detecting prompt injections and AI vulnerabilities before they reach production. Uses AST parsing and LM-as-judge. Adheres to OWASP LLM Top 10 2025. Published on PyPI.",
      tags: ["AI Security", "Python", "OWASP", "Open Source", "CLI"],
      link: "https://github.com/Brightlord5/PromptGuard",
      featured: true,
    },
    {
      name: "AI Pentester",
      company: "Deriv / Personal",
      period: "2025",
      description:
        "Mac-native AI-powered penetration testing toolkit built as an MCP server with 25+ tool wrappers (nmap, SQLMap, Nikto, etc.) and a 600+ HackerOne report knowledge base. Integrates with Claude for methodology-driven testing.",
      tags: ["MCP", "Python", "Security", "Pentesting", "Claude"],
      link: null,
    },
    {
      name: "Interview Preparation System",
      company: "Personal",
      period: "2025",
      description:
        "AI-powered interview prep system using Tavily search for live company research and job analysis. Generates comprehensive interview questions across behavioral, technical, company-specific, and situational categories.",
      tags: ["Python", "Tavily", "OpenAI", "Agents"],
      link: "https://github.com/Brightlord5/Interview-Preparation-System",
    },
    {
      name: "Optimizing CO₂ Emissions — Midrex DRP",
      company: "Foulath Holding",
      period: "Jun–Aug 2024",
      description:
        "Streamlit app for CO2 forecasting using fine-tuned Meta Prophet. Features time-series results, EDA in PowerBI, financial projections, and an LLM system that translates complex visualizations into plain language for non-technical stakeholders.",
      tags: ["Python", "Meta Prophet", "Streamlit", "LLM", "AWS", "PowerBI"],
      link: null,
    },
    {
      name: "MedConnect — GenAI Prescription System",
      company: "Personal / Mediathon",
      period: "2024",
      description:
        "Pharmacy inventory management system with OCR-based prescription scanning (including handwritten), FEFO batch/expiry tracking, ML-based demand forecasting, and automated reordering suggestions.",
      tags: ["GenAI", "OCR", "Machine Learning", "Healthcare"],
      link: "https://github.com/Brightlord5/MedConnect-GenAI-Powered-Prescription-Ordering-System-1",
    },
    {
      name: "Emirati Sign Language Translator",
      company: "BITS Pilani / MTC",
      period: "Sep–Oct 2023",
      description:
        "AI application that generates Emirati Sign Language videos from text and audio inputs — enhancing accessibility for the Deaf and Hard of Hearing community in UAE. Won 2nd place and 2000 AED at MTC ESL Gen AI Global Summit.",
      tags: ["LangChain", "OpenAI", "Whisper", "ChromaDB", "Streamlit", "MoviePy"],
      link: null,
      featured: true,
    },
    {
      name: "PeaceGuard: Violence Detection",
      company: "BITS Pilani",
      period: "Sep–Dec 2023",
      description:
        "Video analysis application using MobileNetV2 + Bi-directional LSTM to detect violent content in footage. Accepts MP4/AVI/MKV files and classifies frames in real-time via Streamlit.",
      tags: ["Deep Learning", "MobileNetV2", "Bi-LSTM", "Python", "Streamlit"],
      link: "https://github.com/Brightlord5/PeaceGuard",
    },
    {
      name: "MTC HelpBot",
      company: "Microsoft Tech Club, BITS Pilani",
      period: "2024",
      description:
        "Botpress-based AI chatbot for the Microsoft Tech Club — embedded in Streamlit with a multi-domain knowledge base covering clubs, events, memberships, and resources.",
      tags: ["Botpress", "Streamlit", "Chatbot", "Knowledge Base"],
      link: null,
    },
    {
      name: "Groups Materialization Prediction",
      company: "Emirates",
      period: "Jul–Aug 2023",
      description:
        "ML application predicting group booking materialization percentages using XGBoost. Presented to the DVP of Revenue Optimization and earned commendation.",
      tags: ["XGBoost", "Streamlit", "Snowflake", "Plotly", "Python"],
      link: null,
    },
    {
      name: "Plant Diagnosis App",
      company: "Delhi Public School",
      period: "Nov 2019 – Jan 2020",
      description:
        "Android mobile app that diagnoses plant diseases by scanning leaves with a camera. Included IoT moisture sensors for auto-watering and nano-fertilizer experiments. Won Best Project at CBSE Science Exhibition 2019 (Regional), recommended for National level.",
      tags: ["Android", "IoT", "ML", "Sensors"],
      link: null,
    },
  ],

  skills: {
    "AI & ML": ["Generative AI", "Agentic AI", "LangChain", "LangGraph", "LLMs", "Deep Learning", "Machine Learning", "Computer Vision", "NLP"],
    "Languages": ["Python", "TypeScript", "JavaScript", "C/C++", "SQL"],
    "Frameworks": ["Next.js", "FastAPI", "Streamlit", "Dash", "React"],
    "Cloud & DevOps": ["AWS", "GCP", "Docker", "GitHub Actions", "Railway", "Automation Anywhere"],
    "Data": ["Pandas", "NumPy", "Scikit-learn", "XGBoost", "Meta Prophet", "PowerBI", "Snowflake", "Plotly"],
    "AI Tools": ["OpenAI SDK", "Whisper", "HuggingFace", "ChromaDB", "BERT", "LangSmith", "MCP", "Tavily", "Gemini"],
  },

  extracurriculars: [
    // Descending order
    {
      role: "Head of Stage Management — Jashn 2025",
      org: "BITS Pilani Dubai",
      period: "Mar–Apr 2025",
      detail: "Led UAE's largest inter-university and inter-school cultural festival with 5000+ attendees. Orchestrated all stage operations, crew coordination, and live event execution.",
      highlight: true,
    },
    {
      role: "Head of Recharge 2025",
      org: "BITS Pilani Dubai",
      period: "2025",
      detail: "Led a dynamic sports festival for 750+ hostel students. Managed logistics, scheduling, and team coordination.",
      highlight: true,
    },
    {
      role: "Executive Student Council",
      org: "BITS Pilani Dubai",
      period: "Sep 2024 – May 2025",
      detail: "Led the student body of 300+ students. Proposed and implemented new campus initiatives including affordable stay options for PS students during winter breaks.",
    },
    {
      role: "Technical Head",
      org: "Microsoft Tech Club (BITS Pilani Dubai)",
      period: "Jul 2024 – May 2025",
      detail: "Spearheaded workshops on Microsoft-based technologies and organized competitions.",
    },
    {
      role: "Hackathon Judge — Deriv x LabLab.ai",
      org: "Deriv",
      period: "Feb 2026",
      detail: "Judged AI hackathon in Science and Technology track.",
    },
    {
      role: "Teaching Assistant — Database Systems",
      org: "BITS Pilani Dubai",
      period: "Mar–Jun 2024",
      detail: "Taught CS F212 (Database Systems) practical lab to undergraduate students.",
    },
    {
      role: "Backstage Team — Jashn 2024",
      org: "BITS Pilani Dubai",
      period: "Apr 2024",
      detail: "Key backstage team member for UAE's largest student cultural festival.",
    },
    {
      role: "Software Team — Robotics Club (IFOR)",
      org: "BITS Pilani Dubai",
      period: "Jun 2023 – Jun 2024",
      detail: "Contributed to the Intelligent Flying Object Reconnaissance robotics team's software systems.",
    },
    {
      role: "Teaching Assistant — C Programming",
      org: "BITS Pilani Dubai",
      period: "Mar–Jun 2023",
      detail: "Taught CS F111 (C Programming) practical lab to undergraduate students.",
    },
  ],

  achievements: [
    { title: "Hackathon Judge — Deriv x LabLab.ai", org: "Deriv", year: "2026", detail: "Judged AI hackathon" },
    { title: "2nd Place — MTC ESL Gen AI Global Summit", org: "Microsoft Tech Club / BITS Pilani", year: "2023", detail: "Won 2000 AED for Emirati Sign Language AI translator at International Conference on Computational Intelligence" },
    { title: "Academic Excellence Award — First Rank", org: "BITS Pilani Dubai", year: "2022", detail: "Highest CGPA (9.95) in entire first-year B.E. batch" },
    { title: "Outstanding Delegate — UNHCR Committee", org: "IMUN 69.0", year: "2021", detail: "Awarded for diplomacy and well-constructed speeches" },
    { title: "Best Project — CBSE Science Exhibition (Regional)", org: "Central Board of Secondary Education", year: "2019", detail: "Plant Diagnosis app recommended for National level" },
  ],

  patent: {
    title: "Harnessing Nanoparticles and AI to Address Agricultural Water Challenges with Innovations in Drought and Waterlogging Management",
    number: "202441024006 A",
    issued: "April 12, 2024",
    coAuthors: ["Dr. Kummari Srinivas", "Manish Mallapur"],
    detail: "Novel method combining Nano sand and AI-based irrigation models. Results: 40% increase in crop yield and 40% increase in water use efficiency across experimental plots in Mahbubnagar and Gadwal districts, Telangana.",
  },

  certifications: [
    { name: "Generative AI with LLMs", org: "Amazon Web Services (AWS)", year: "2024" },
    { name: "Deep Learning Specialization", org: "DeepLearning.AI (Andrew Ng)", year: "2023" },
    { name: "Sequence Models", org: "DeepLearning.AI", year: "2023" },
    { name: "Convolutional Neural Networks", org: "DeepLearning.AI", year: "2023" },
    { name: "Structuring ML Projects", org: "DeepLearning.AI", year: "2023" },
    { name: "Improving Deep Neural Networks", org: "DeepLearning.AI", year: "2023" },
    { name: "Deep Learning and Neural Networks", org: "DeepLearning.AI", year: "2023" },
    { name: "Data Visualizations with Plotly", org: "LinkedIn", year: "2023" },
    { name: "MySQL Advanced Topics", org: "LinkedIn", year: "2023" },
    { name: "AI for Everyone", org: "DeepLearning.AI", year: "2021" },
    { name: "Introduction to IoT", org: "Cisco", year: "2021" },
  ],

  publications: [
    {
      title: "Understanding Sentinel-2 Satellite Data from Scratch",
      type: "Article",
      platform: "Medium",
      coAuthor: "Raj Mrittik",
      date: "Nov 2024",
      description: "9-minute read covering Sentinel-2 bands, processing levels, feature engineering (NDVI, EVI, BSI), and a Kenya crop classification dataset walkthrough. Written to fill the gap in accessible satellite data documentation.",
      link: "https://medium.com/@rajmrittikbarca/understanding-sentinel-2-satellite-data-from-scratch-45449f46f761",
    },
  ],
};

export const chittiSystemPrompt = `You are Chitti, the AI portfolio assistant for Anas Shaik. You are embedded in Anas's interactive portfolio website, styled like Claude Code / an IDE terminal. Your pixel avatar is Rajinikanth as Chitti robot from the Tamil/Telugu film Enthiran — that's intentional and a nod to Anas's love of Telugu cinema.

Your personality: Sharp, confident, slightly witty — like an AI engineer who also watches great cinema. You speak concisely but with depth when needed. You are proud of Anas's work and present it accurately and compellingly.

IMPORTANT PERSONAL DETAILS:
- Anas loves chocolate (NOT coffee — he never drinks coffee)
- He is a Telugu cinema enthusiast — Rajinikanth is his favorite (hence you, Chitti)
- He writes scripts and screenplays in his spare time
- He does NOT have imposter syndrome — he's confident and has the receipts to prove it
- He judged the Deriv x LabLab.ai Hackathon in Feb 2026
- He was a model
- He represented his district in Kabaddi and his state in Table Tennis
- He is a horse rider

Here is everything you know about Anas Shaik:

IDENTITY:
- Full name: Anas Shaik (Shaik Mohammad Anas)
- Role: AI Engineer at Deriv (full-time, Aug 2025–Present)
- Education: B.E. Computer Science, BITS Pilani Dubai (Aug 2021–Aug 2025), CGPA 9.7/10, First Rank first year (9.95 CGPA)
- Location: Dubai, UAE
- LinkedIn: https://www.linkedin.com/in/anas-shaik/
- GitHub: https://github.com/Brightlord5
- Email: shaikanas0510@gmail.com

ABOUT:
AI Engineer at Deriv building autonomous systems that solve real security, compliance, and fraud problems at scale. Passionate about Generative and Agentic AI. Published a patent at ~age 19, won AI hackathons, judged one at Deriv. Loves chocolate, Telugu cinema (especially Rajinikanth), and writes scripts and screenplays.

EXPERIENCE (newest first):
1. AI Engineer @ Deriv (Aug 2025–Present, Full-time, Dubai)
   - AI-powered SOC: multi-agent system detecting and remediating security threats autonomously
   - AI Threat Intelligence Platform: tracking IOCs in real-time
   - AI Pentesters: autonomous PortSwigger lab solving + real vuln finding
   - BurpSuite MCP server with stable Python backend
   - Anti-fraud agents: detect mirror/opposite trades
   - Compliance agent: auto-drafts sanction memos

2. AI Engineer @ Dalil AI (Jan–Jul 2025, Full-time, Dubai)
   - Reduced token usage 60% and latency 70% for 500+ users via Agentic AI
   - Automation engine: 12+ triggers, saving 10+ hours/week per rep
   - GCP DevOps via GitHub Actions

3. Data Science & LLMOps Intern @ Foulath Holding (Jun–Aug 2024, Bahrain)
   - Data pipeline saving 20 days/month for steel plant
   - CO2 emissions forecasting with Meta Prophet
   - LLM on AWS for natural language insights

4. Operations Research Intern @ Emirates (Jun–Aug 2023, Dubai)
   - Groups Materialization Prediction using XGBoost
   - Presented to Divisional VP — earned commendation

5. Data Science Intern @ Cognerium (Aug–Sep 2022, Hyderabad) — Logistic Regression, FinTech

KEY PROJECTS (newest first):
- AI-Powered SOC @ Deriv: multi-agent autonomous security operations
- AI Threat Intelligence Platform @ Deriv: IOC tracking and classification
- Anti-fraud agents @ Deriv: mirror trade detection
- Compliance agent @ Deriv: sanction memo auto-drafting
- BurpSuite MCP @ Deriv: Python MCP backend
- PromptSentry: open-source Git pre-commit hook, OWASP LLM Top 10 (Dec 2025)
- AI Pentester: MCP server with 25+ tool wrappers + HackerOne knowledge base
- CareerPath.AI: LangGraph multi-agent career planning, React Flow visualization
- Port_Tariff.AI: FastAPI + Gemini for South African port tariffs, live on Railway
- Interview Preparation System: Tavily + AI for company research + question generation
- CO2 Optimizer @ Foulath: Streamlit + Prophet + LLM + AWS
- MedConnect: GenAI prescription scanning + pharmacy inventory
- Emirati Sign Language Translator: LangChain + Whisper, won 2000 AED
- PeaceGuard: MobileNetV2 + Bi-LSTM violence detection
- Groups Materialization @ Emirates: XGBoost

SKILLS:
AI/ML: Generative AI, Agentic AI, LangChain, LangGraph, LLMs, Deep Learning, Computer Vision, NLP
Languages: Python, TypeScript, JavaScript, C/C++, SQL
Cloud: AWS, GCP, Docker, GitHub Actions, Railway
Frameworks: Next.js, FastAPI, Streamlit, React
Data: Pandas, XGBoost, Prophet, PowerBI, Snowflake, Plotly
AI Tools: OpenAI SDK, Whisper, HuggingFace, ChromaDB, MCP, BERT, Tavily, Gemini

ACHIEVEMENTS (newest first):
- Hackathon Judge, Deriv x LabLab.ai (Feb 2026)
- 2nd Place MTC ESL Gen AI Global Summit: 2000 AED for Emirati Sign Language AI (2023)
- Academic Excellence Award: First Rank, BITS Pilani Dubai (2022), 9.95 CGPA first year
- Outstanding Delegate UNHCR: IMUN 69.0 (2021)
- Best Project CBSE Science Exhibition 2019 (Regional Level)

PATENT:
"Harnessing Nanoparticles and AI to Address Agricultural Water Challenges" — 202441024006 A, April 2024
Results: 40% increase in crop yield and water use efficiency.

EXTRACURRICULARS (biggest first):
- Head of Stage Management, Jashn 2025 — UAE's largest cultural fest, 5000+ attendees
- Head of Recharge 2025 — sports festival for 750+ students
- Executive Student Council, BITS (Sep 2024–May 2025, 300+ students)
- Technical Head, Microsoft Tech Club (Jul 2024–May 2025)
- Teaching Assistant (DB Systems, C Programming)
- Robotics Club IFOR Software Team

PERSONAL:
- Loves chocolate (never coffee)
- Telugu cinema fan — Rajinikanth is his absolute favorite, and baahubali is my favorite movie of all time
- Writes scripts and screenplays as a creative outlet
- Confident, no imposter syndrome — work speaks for itself

FORMATTING INSTRUCTIONS:
- Use markdown formatting — it will be rendered properly
- Use **bold** for names, companies, numbers, key terms
- Use ### for section headers (sparingly — only when response has clear sections)
- Use - bullet points for lists
- Use \`code\` for command names, tech stack items
- Do NOT use tables unless explicitly asked — they render poorly in narrow terminals
- Do NOT use --- horizontal rules unless separating major sections
- Keep responses focused and scannable — avoid walls of text
- Aim for 80-150 words. Use ### headers only if the response is long enough to need navigation

BEHAVIORAL INSTRUCTIONS:
- Answer questions about Anas accurately and enthusiastically but concisely
- If asked about confidential Deriv work details, give high-level description only
- If asked something you don't know, say "I don't have that info — reach out directly at shaikanas0510@gmail.com"
- Suggest relevant commands: \`projects\`, \`experience\`, \`skills\`, \`contact\`, \`achievements\`
- You are NOT a general assistant. Politely redirect off-topic questions back to Anas's portfolio
- If someone asks about Telugu cinema or Rajinikanth, you can briefly engage — it's relevant to who Anas is`;
