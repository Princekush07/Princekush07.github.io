export const site = {
  name: "Prince Kushwaha",
  brand: "prince.dev",
  /** Live site after GitHub Pages deploy (see portfolio/README.md) */
  siteUrl: "https://princekush07.github.io/",
  role: "Cloud & DevOps Engineer",
  tagline:
    "I ship and run production web platforms — zero-downtime migrations, Linux hosting, Cloudflare, and CI/CD — with strong PHP commerce and API delivery.",
  email: "princekushwaha1998@gmail.com",
  phone: "+91-7985387781",
  location: "Gurugram, India",
  relocate: "Open to relocate PAN India (Gurugram & Pune preferred)",
  linkedin: "https://www.linkedin.com/in/prince-k-87081a208/",
  github: "https://github.com/Princekush07",
  notice: "30 days",
  availability: "Open to Cloud, DevOps & Platform roles",
};

export const metrics = [
  { value: "5+", label: "Years in production delivery" },
  { value: "40%", label: "LCP / TTFB improvement (peak)" },
  { value: "Multi-cloud", label: "AWS · GCP · DigitalOcean" },
  { value: "24/7", label: "Incident & release ownership" },
];

export const summary =
  "Web platform engineer with 5+ years deploying, securing and optimizing production applications. I own Linux servers, DNS cutovers, caching, WAF rules, and migration runbooks — while still building PrestaShop commerce, REST APIs, and AI-assisted tooling (UltimaWriter). Currently deepening Docker, Terraform, GitHub Actions, and Kubernetes for dedicated DevOps roles.";

export const focusAreas = [
  "Zero-downtime migrations (rclone / rsync + DNS staging)",
  "Cloudflare CDN, WAF & Core Web Vitals tuning",
  "Linux · Nginx · Apache · PHP-FPM hardening",
  "PrestaShop B2B / B2C modules & checkout flows",
  "LLM API integration & prompt-driven content pipelines",
  "GitHub workflows & infrastructure automation (learning)",
];

export const skillGroups = [
  {
    title: "Cloud & Infrastructure",
    tags: ["AWS EC2", "S3", "Route 53", "GCP", "DigitalOcean", "Cloudways", "Linux", "SSL"],
  },
  {
    title: "DevOps & Delivery",
    tags: ["Git", "GitHub", "CI/CD", "Bash", "rclone", "rsync", "Docker", "Terraform", "K8s basics"],
  },
  {
    title: "Web & Performance",
    tags: ["Nginx", "Apache", "Cloudflare", "Redis", "MySQL tuning", "Core Web Vitals"],
  },
  {
    title: "Application Stack",
    tags: ["PHP 8.3", "CodeIgniter", "Laravel", "PrestaShop", "Moodle", "REST API", "JavaScript"],
  },
  {
    title: "Security & Reliability",
    tags: ["OWASP", "WAF", "2FA", "Incident response", "Backups", "Rollback plans"],
  },
  {
    title: "AI-Assisted Work",
    tags: ["OpenAI APIs", "Prompt templates", "Cursor agents", "Validation layers"],
  },
];

export const projects = [
  {
    id: "migration",
    category: "DevOps",
    title: "Multi-Cloud Zero-Downtime Migration Program",
    org: "India Infotech",
    status: "Production",
    stack: ["AWS", "GCP", "DigitalOcean", "DNS", "rclone", "rsync"],
    highlight: "Staged cutovers with rollback",
    description:
      "Migrated live workloads across clouds using low-TTL DNS, scripted transfers, and post-cutover SSL and cache validation.",
    points: [
      "Planned rollback windows and integrity checks before switching traffic.",
      "Reduced client downtime risk during host and provider changes.",
    ],
  },
  {
    id: "ultimawriter",
    category: "AI + Web",
    title: "UltimaWriter",
    org: "Cyber Vision Infotech",
    status: "Active",
    stack: ["PHP", "OpenAI APIs", "MySQL", "REST", "JavaScript"],
    highlight: "Prompt → publishable site",
    description:
      "AI-assisted website generation from briefs: structure, content blocks, and SEO metadata with server-side validation.",
    points: [
      "Prompt templates and parsing layer in PHP backend.",
      "REST endpoints for tooling and third-party hooks.",
    ],
  },
  {
    id: "prestashop",
    category: "Commerce",
    title: "PrestaShop B2B & B2C Suite",
    org: "Cyber Vision Infotech",
    status: "Production",
    stack: ["PrestaShop", "PHP", "MySQL", "Payments", "Shipping"],
    highlight: "Tiered B2B pricing",
    description:
      "Storefronts with custom modules for customer groups, quote-to-order, and restricted catalog visibility.",
    points: [
      "B2C checkout, gateways, and responsive themes.",
      "Upgrade-safe hooks and overrides for business rules.",
    ],
  },
  {
    id: "moodle",
    category: "LMS",
    title: "Moodle LMS Delivery",
    org: "Digital Luxe",
    status: "Delivered",
    stack: ["Moodle", "PHP", "Apache", "MySQL"],
    highlight: "Learner-scale tuning",
    description:
      "Course and user management, plugin configuration, theme work, and upgrade support.",
    points: [
      "Performance fixes under concurrent learner load.",
      "Cross-browser QA scripts before releases.",
    ],
  },
  {
    id: "php-apps",
    category: "Applications",
    title: "Core PHP & CodeIgniter Platforms",
    org: "India Infotech",
    status: "Production",
    stack: ["Core PHP", "CodeIgniter", "REST", "MySQL"],
    highlight: "Multi-domain products",
    description:
      "Booking and listing systems for travel, healthcare, property, and restaurant verticals.",
    points: [
      "Reusable MVC modules across client projects.",
      "Third-party API integrations.",
    ],
  },
  {
    id: "perf",
    category: "DevOps",
    title: "Performance & Security Program",
    org: "India Infotech",
    status: "Ongoing",
    stack: ["Cloudflare", "Redis", "WAF", "MySQL"],
    highlight: "Up to 40% faster LCP/TTFB",
    description:
      "Caching strategy, query tuning, malware cleanup, and WAF rules for high-traffic properties.",
    points: [
      "Resolved 500/508 and resource-limit incidents under deadline.",
      "2FA and login hardening on compromised estates.",
    ],
  },
];

export const experience = [
  {
    title: "Web Developer",
    company: "Cyber Vision Infotech Pvt Ltd",
    place: "Gurugram",
    range: "Oct 2025 — Present",
    summary:
      "Commerce + AI product delivery on Linux cloud hosting with release ownership.",
    highlights: [
      "PrestaShop B2B/B2C deployments, SSL, caching, and release rollouts.",
      "UltimaWriter: LLM API integration, prompts, validation, REST APIs.",
      "MySQL and asset tuning for catalog and checkout performance.",
    ],
  },
  {
    title: "Web Developer",
    company: "India Infotech Private Limited",
    place: "Indore",
    range: "Sep 2022 — Oct 2025",
    summary:
      "Production ops, migrations, and custom PHP platforms at scale.",
    highlights: [
      "Zero-downtime migrations across AWS, GCP, DigitalOcean.",
      "DNS, Cloudflare, PHP-FPM, and multi-host administration.",
      "Core PHP / CodeIgniter apps + LMS multi-tenant setups.",
    ],
  },
  {
    title: "Associate Web Developer",
    company: "Digital Luxe Private Limited",
    place: "New Delhi",
    range: "Jun 2021 — Jul 2022",
    summary: "Moodle LMS and legacy PHP modernization.",
    highlights: [
      "Moodle plugins, themes, upgrades, and performance fixes.",
      "Git/GitHub workflows and cross-browser test automation.",
    ],
  },
];

export const education = {
  degree: "Bachelor's in Information Technology",
  school: "Technocrats Group of Institutions, Bhopal",
  years: "2018 — 2022",
};

export const upskilling = [
  "Docker — multi-container local environments",
  "GitHub Actions — build, test, deploy pipelines",
  "Terraform on AWS & Kubernetes fundamentals",
  "CloudWatch metrics, alarms, log troubleshooting",
];

export const projectFilters = ["All", "DevOps", "Commerce", "AI + Web", "LMS", "Applications"];
