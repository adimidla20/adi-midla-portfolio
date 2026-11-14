export const profile = {
  name: "Adi Midla",
  university: "VIT Bhopal University",
  degree: "B.Tech Computer Science and Engineering (Gaming Technology)",
  year: "Third year",
  email: "adimidlaofficial@gmail.com",
  github: "https://github.com/adimidla20",
  linkedin: "https://www.linkedin.com/in/adi-midla",
};

export const skillGroups = [
  {
    number: "01",
    title: "Programming",
    items: ["C++", "Python", "Java"],
    note: "Building fluency through coursework and projects.",
  },
  {
    number: "02",
    title: "Computer science",
    items: ["Data structures & algorithms", "Software engineering", "Problem solving"],
    note: "Foundations for turning a problem into a clear system.",
  },
  {
    number: "03",
    title: "Interactive worlds",
    items: ["Unity", "Game development", "XR / Virtual reality"],
    note: "Exploring how software becomes an experience you can move through.",
  },
  {
    number: "04",
    title: "On the web & beyond",
    items: ["Web development", "AI exploration", "Emerging technology"],
    note: "Curious about the tools changing how people build and interact.",
  },
];

export const projects = [
  {
    number: "01",
    filter: "software",
    title: "ExamScannerAI",
    category: "Applied AI · Computer vision",
    status: "Backend prototype",
    tone: "red",
    repo: "https://github.com/adimidla20/ExamScannerAI",
    summary:
      "A document processing backend that turns exam paper images into structured question data.",
    details:
      "The current repository describes an image upload flow, OpenCV preprocessing, Tesseract OCR, text cleanup, question detection, and JSON responses through FastAPI. The README marks the frontend as planned, so this is presented as a backend prototype.",
    stack: ["Python", "FastAPI", "OpenCV", "Tesseract OCR"],
    image: null,
    imageAlt: null,
  },
  {
    number: "02",
    filter: "software",
    title: "Open Source Audit",
    category: "Linux · Shell scripting",
    status: "Course project",
    tone: "bone",
    repo: "https://github.com/adimidla20/oss-audit-24BCG10117",
    summary:
      "A study of Git and open-source software, supported by a set of practical Bash utilities.",
    details:
      "The repository includes five scripts for system identity, package inspection, disk auditing, log analysis, and a manifesto generator, alongside a written project report.",
    stack: ["Bash", "Linux", "Git", "Technical writing"],
    image: null,
    imageAlt: null,
  },
  {
    number: "03",
    filter: "interactive",
    title: "Game Physics Experiments",
    category: "Game technology · C#",
    status: "Experiments",
    tone: "amber",
    repo: "https://github.com/adimidla20/Gamephysics_projects",
    summary:
      "Small explorations of motion, vectors, collisions, and particle effects.",
    details:
      "A collection of experiments that makes game physics ideas visible through code. The repository is a learning archive, rather than a single released game.",
    stack: ["C#", "Vectors", "Collisions", "Particles"],
    image: null,
    imageAlt: null,
  },
  {
    number: "04",
    filter: "interactive",
    title: "VR Parkour Game",
    category: "XR · Game development",
    status: "Learning prototype",
    tone: "graphite",
    repo: null,
    summary:
      "An exploration of how movement, physical interactions, and guidance can shape a VR parkour experience.",
    details:
      "The gallery shows the castle approach, elevated obstacle route, medieval village level, and a headset session. This Unity XR learning prototype explores movement and environment design with the XR Interaction Toolkit. No public demo link was supplied.",
    stack: ["Unity", "XR Interaction Toolkit", "VR"],
    image: null,
    imageAlt: null,
    gallery: [
      { src: "/images/vr-parkour-castle.jpg", alt: "Castle entrance and stone steps in the VR parkour game.", label: "CASTLE" },
      { src: "/images/vr-parkour-obstacles.jpg", alt: "Elevated wooden parkour obstacles across a village course.", label: "OBSTACLES" },
      { src: "/images/vr-parkour-village.jpg", alt: "A medieval village level viewed from above in the VR game.", label: "VILLAGE" },
      { src: "/images/adi-vr-playtest.png", alt: "Adi wearing a VR headset and holding the motion controllers.", label: "VR SESSION" },
    ],
  },
  {
    number: "05",
    filter: "planning",
    title: "Hostel Menu Planner",
    category: "Student life · planning concept",
    status: "In progress",
    tone: "teal",
    repo: null,
    summary:
      "A planned student-facing app for checking hostel meals by day, meal, and dietary label.",
    details:
      "Planned flow: browse the weekly menu by day and meal, with clear dietary labels. Proposed architecture: React for the interface and Firebase Firestore to store menu items and publish updates. The concept is still in progress, so these features and technologies are planned rather than implemented.",
    stack: ["React (planned)", "Firebase Firestore (planned)", "Weekly menu UX"],
    image: null,
    imageAlt: null,
  },
];

export const concepts = [
  {
    title: "Escape the Quiet Room",
    kind: "VR concept / learning exercise",
    text: "A single player escape room idea built around environmental puzzles, teleportation, and comfortable VR movement.",
  },
  {
    title: "Float Quest: The Lost Inventor",
    kind: "Educational game concept",
    text: "An exploration of floating and sinking inspired by Archimedes’ principle, with raft building as a possible learning mechanic.",
  },
];

export const achievements = [
  {
    number: "01",
    title: "Google Cloud Arcade",
    label: "Programme completed",
    detail: "Completed the Google Cloud Arcade programme.",
    image: "/images/google-cloud-arcade.jpg",
    alt: "Google Cloud Arcade backpack, shirt, and programme items",
    pdf: null,
  },
  {
    number: "02",
    title: "Digital India Awareness Workshop",
    label: "IIT (BHU), Varanasi · 31 January 2026",
    detail:
      "Participated in the NeGD workshop “Ignites Innovation,” focused on Digital India pillars, e-Governance, and cybersecurity.",
    image: "/images/iit-bhu-workshop.jpg",
    alt: "Students at the Digital India Awareness Workshop at IIT (BHU)",
    pdf: { src: "/documents/digital-india-awareness-workshop.pdf", title: "Digital India Awareness Workshop", label: "Open workshop PDF" },
  },
  {
    number: "03",
    title: "IN-NEC Top 30",
    label: "Team recognition",
    detail:
      "The E-Cell VIT Bhopal team reached the National Entrepreneurship Challenge Top 30.",
    image: "/images/nec-team.webp",
    alt: "Students gathered beneath the Illuminate changemakers display at an event.",
    pdf: null,
  },
];

