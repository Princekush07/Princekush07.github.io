import { useEffect, useMemo, useRef, useState } from "react";
import {
  education,
  experience,
  focusAreas,
  metrics,
  projectFilters,
  projects,
  site,
  skillGroups,
  summary,
  upskilling,
} from "./data/content.js";

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

function useReveal(deps = []) {
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, deps);
}

const profilePhoto = `${import.meta.env.BASE_URL}profile.png`;

function HeroProfile({ name, role }) {
  const shellRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event) => {
    const el = shellRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px * 10, y: py * -10 });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      className="hero__visual"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <div className="hero-tech-banner" aria-hidden="true">
        <div className="hero-tech-banner__grid" />
        <p className="hero-tech-banner__title">BUILDING AI SYSTEMS</p>
        <ul className="hero-tech-banner__tags">
          <li>Python</li>
          <li>FastAPI</li>
          <li>Node.js</li>
          <li>AWS</li>
          <li>LLM</li>
        </ul>
      </div>
      <div
        ref={shellRef}
        className="profile-shell"
        style={{
          transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        }}
      >
        <div className="profile-ring" aria-hidden="true" />
        <div className="profile-avatar">
          <img
            src={profilePhoto}
            alt={`Professional portrait of ${name}`}
            width={280}
            height={280}
            loading="eager"
            decoding="async"
          />
          <span className="profile-avatar__status" title="Open to opportunities" />
        </div>
        <div className="profile-card__footer">
          <strong>{name}</strong>
          <span>{role}</span>
        </div>
      </div>
      <div className="ops-panel" aria-hidden="true">
        <div className="ops-panel__row"><span>api</span><em>REST · JWT</em></div>
        <div className="ops-panel__row"><span>llm</span><em>validated</em></div>
        <div className="ops-panel__row"><span>build</span><em>CI green</em></div>
        <div className="ops-panel__bar" />
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [openJob, setOpenJob] = useState(0);

  useReveal([filter, menuOpen]);

  const filteredProjects = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="page">
      <div className="page__glow page__glow--a" aria-hidden="true" />
      <div className="page__glow page__glow--b" aria-hidden="true" />

      <header className="header">
        <a className="brand" href="#top" onClick={(e) => { e.preventDefault(); scrollTo("top"); }}>
          <span className="brand__monogram" aria-hidden="true">PK</span>
          {site.brand}
        </a>
        <nav className={`nav ${menuOpen ? "nav--open" : ""}`} aria-label="Primary">
          {NAV.map((item) => (
            <button key={item.id} type="button" className="nav__link" onClick={() => scrollTo(item.id)}>
              {item.label}
            </button>
          ))}
          <a className="nav__cta" href={`mailto:${site.email}`}>Email me</a>
        </nav>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </header>

      <main id="top">
        <section className="hero" data-reveal>
          <div className="hero__content">
            <p className="pill">{site.availability}</p>
            <h1>
              Hi, I&apos;m <span className="hero__name">{site.name}</span>
            </h1>
            <p className="hero__role">
              <span className="type-cursor">{site.role}</span>
            </p>
            <p className="hero__meta hero__meta--role">{site.roleSub}</p>
            <p className="hero__lead">{site.tagline}</p>
            <div className="hero__actions">
              <button type="button" className="btn btn--primary" onClick={() => scrollTo("projects")}>
                View my work
              </button>
              <a className="btn btn--ghost" href={site.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="btn btn--ghost" href={site.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="btn btn--ghost" href={site.roadmap} target="_blank" rel="noreferrer">
                Learning roadmap
              </a>
            </div>
            <p className="hero__meta">
              {site.location} · {site.relocate}
            </p>
          </div>
          <HeroProfile name={site.name} role={site.role} />
        </section>

        <section className="metrics" aria-label="Highlights" data-reveal>
          {metrics.map((m) => (
            <article key={m.label} className="metric">
              <p className="metric__value">{m.value}</p>
              <p className="metric__label">{m.label}</p>
            </article>
          ))}
        </section>

        <section id="about" className="section" data-reveal>
          <div className="section__head">
            <p className="section__index">01 · About</p>
            <h2>Application architecture, APIs, and AI-powered delivery</h2>
          </div>
          <div className="about-grid">
            <p className="about-grid__text">{summary}</p>
            <ul className="focus-list">
              {focusAreas.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="skills" className="section" data-reveal>
          <div className="section__head">
            <p className="section__index">02 · Skills</p>
            <h2>Stack aligned with AI application &amp; Python full stack roles</h2>
          </div>
          <div className="bento">
            {skillGroups.map((group) => (
              <article key={group.title} className="bento__card">
                <h3>{group.title}</h3>
                <div className="chips">
                  {group.tags.map((tag) => (
                    <span key={tag} className="chip">{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="upskill">
            <h3>Current learning path</h3>
            <ul>
              {upskilling.map((u) => <li key={u}>{u}</li>)}
            </ul>
          </div>
        </section>

        <section id="projects" className="section" data-reveal>
          <div className="section__head">
            <p className="section__index">03 · Projects</p>
            <h2>Selected work from resume &amp; production</h2>
          </div>
          <div className="filters" role="tablist" aria-label="Filter projects">
            {projectFilters.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                className={`filter ${filter === f ? "filter--active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="project-grid">
            {filteredProjects.map((p) => (
              <article key={p.id} className="project-card">
                <header>
                  <span className="project-card__cat">{p.category}</span>
                  <span className="project-card__status">{p.status}</span>
                </header>
                <h3>{p.title}</h3>
                <p className="project-card__org">{p.org}</p>
                <p className="project-card__desc">{p.description}</p>
                <p className="project-card__highlight">{p.highlight}</p>
                <ul>
                  {p.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
                <div className="chips chips--sm">
                  {p.stack.map((s) => <span key={s} className="chip">{s}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section" data-reveal>
          <div className="section__head">
            <p className="section__index">04 · Experience</p>
            <h2>Career timeline</h2>
          </div>
          <div className="jobs">
            {experience.map((job, i) => (
              <article key={job.company} className={`job ${openJob === i ? "job--open" : ""}`}>
                <button type="button" className="job__toggle" onClick={() => setOpenJob(i)}>
                  <div>
                    <h3>{job.title}</h3>
                    <p>{job.company} · {job.place}</p>
                  </div>
                  <time>{job.range}</time>
                </button>
                <div className="job__body">
                  <p>{job.summary}</p>
                  <ul>
                    {job.highlights.map((h) => <li key={h}>{h}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <p className="edu">
            <strong>{education.degree}</strong> — {education.school} ({education.years})
          </p>
        </section>

        <section id="contact" className="section section--contact" data-reveal>
          <div className="contact-card">
            <p className="section__index">05 · Contact</p>
            <h2>Let&apos;s talk about your next app, API, or AI feature</h2>
            <p>
              Notice period: <strong>{site.notice}</strong>. Best reached by email or LinkedIn.
            </p>
            <div className="hero__actions">
              <a className="btn btn--primary" href={`mailto:${site.email}`}>{site.email}</a>
              <a className="btn btn--ghost" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="btn btn--ghost" href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <a href={site.roadmap} target="_blank" rel="noreferrer">30-day learning roadmap</a>
        <span>{site.role}</span>
      </footer>
    </div>
  );
}
