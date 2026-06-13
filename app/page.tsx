import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";

const experience = [
  {
    role: "Freelance Full Stack Developer",
    company: "Deven Digital Labs",
    period: "October 2025 - Present",
    location: "Remote",
    points: [
      "Build and deliver responsive business websites using Next.js, React, and Tailwind CSS.",
      "Own the complete client lifecycle from requirement gathering and solution design through development, deployment, and handover.",
      "Translate business goals into conversion-focused user experiences that strengthen clients' online presence.",
    ],
  },
  {
    role: "Software Development Engineer",
    company: "BMG Interiors - Freelance",
    period: "February 2026 - May 2026",
    location: "Remote",
    points: [
      "Designed and deployed a production Next.js website in under three weeks, working directly with the co-founder from discovery to launch.",
      "Managed design, development, testing, and deployment independently while keeping the solution aligned with business requirements.",
      "Improved client conversion and decision-making effectiveness by 20%, according to project outcomes reported in the engagement.",
    ],
  },
  {
    role: "Data Analyst",
    company: "HUDL",
    period: "February 2024 - June 2024",
    location: "Goregaon, Mumbai",
    points: [
      "Built operational dashboards for lead tracking and pipeline management.",
      "Collaborated with senior managers to turn business data into clear, actionable insights.",
    ],
  },
];

const projects = [
  {
    title: "BMG Interiors CRM",
    period: "February - May 2026",
    status: "Production project",
    stack: ["React", "Next.js", "MariaDB"],
    situation:
      "The interiors team needed a more structured way to manage client information, operations, and lead follow-ups.",
    action:
      "Developed responsive CRM interfaces, integrated MariaDB for structured storage, optimized queries, and refined workflows with internal stakeholders.",
    result:
      "Improved decision-making by 25% and lead follow-ups by 20%, based on the outcomes recorded for the project.",
    repo: "https://github.com/deven065/bmginteriors-crm",
  },
  {
    title: "AI Subscription E-commerce Platform",
    period: "2025",
    status: "Freelance delivery",
    stack: ["Next.js", "TypeScript", "React", "Supabase"],
    situation:
      "A client needed a scalable storefront for selling AI subscription plans with a simple path from plan discovery to account management.",
    action:
      "Built authentication, user and database operations, a customer dashboard, plan management, and a Stripe-ready checkout flow with Supabase.",
    result:
      "Delivered a production-ready, type-safe codebase designed for client-managed deployment and future payment integration.",
  },
  {
    title: "SocietiQ",
    period: "Active development",
    status: "SaaS product",
    stack: ["React", "Tailwind CSS", "Firebase Auth", "Realtime Database"],
    situation:
      "Residential societies often manage residents, staff, notices, accounting, and maintenance records through disconnected manual processes.",
    action:
      "Designed a multi-society SaaS platform with admin/member access, secure authentication, free core tools, and tiered Pro and Advanced plans.",
    result:
      "Created a scalable product foundation that brings community operations and subscription-based services into one role-driven platform.",
    repo: "https://github.com/deven065/SocietiQ",
  },
  {
    title: "FlatMate",
    period: "May 2025",
    status: "Full-stack project",
    stack: ["React", "Tailwind CSS", "Firebase Auth", "Realtime Database"],
    situation:
      "A single residential society needed a secure digital workflow for member records, expenses, maintenance payments, and announcements.",
    action:
      "Implemented role-based authentication, protected admin routes, real-time role retrieval, member and finance workflows, and accessible dark mode.",
    result:
      "Produced a working society management application with separate, secure experiences for administrators and members.",
    repo: "https://github.com/deven065/FlatMate",
  },
  {
    title: "Chef Claude",
    period: "November - December 2024",
    status: "AI application",
    stack: ["React", "JavaScript", "Hugging Face API", "Vercel"],
    situation:
      "People often have ingredients at home but need practical ideas for turning them into complete meals.",
    action:
      "Built a React application that sends available ingredients to a Hugging Face model and presents dynamically generated recipe suggestions.",
    result:
      "Delivered and deployed a practical AI-assisted recipe experience that generates useful ideas from real user input.",
    repo: "https://github.com/deven065/chef-ai",
  },
];

const skills = [
  {
    label: "Languages",
    items: ["JavaScript", "TypeScript", "Java", "HTML", "CSS"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Responsive UI"],
  },
  {
    label: "Backend & APIs",
    items: ["Node.js", "Express", "REST APIs", "Zod", "Axios"],
  },
  {
    label: "Data & Cloud",
    items: ["Supabase", "MongoDB", "MySQL", "MariaDB", "Firebase"],
  },
  {
    label: "Tools",
    items: ["Git", "Docker", "Vercel", "VS Code", "IntelliJ"],
  },
];

const education = [
  {
    program: "Full Stack Developer Program",
    school: "100xDevs",
    period: "August 2024 - July 2025",
    location: "Bangalore, India",
  },
  {
    program: "Bachelor of Commerce",
    school: "Shri Bhausaheb Vartak College",
    period: "July 2019 - April 2022",
    location: "Borivali, Mumbai",
  },
  {
    program: "Higher Secondary Certificate (HSC)",
    school: "Shri Bhausaheb Vartak College",
    period: "2018 - April 2019",
    location: "Borivali, Mumbai",
  },
  {
    program: "Secondary School Certificate (SSC)",
    school: "St. Francis High School",
    period: "June 2016 - April 2017",
    location: "Malad, Mumbai",
  },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Deven Rikame",
  jobTitle: "Full Stack Developer",
  email: "mailto:devenrikame55@gmail.com",
  telephone: "+91 9833703389",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/in/dev55",
    "https://github.com/deven065",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Firebase",
    "Supabase",
    "MongoDB",
    "MariaDB",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <header className="site-header">
        <nav className="nav-shell" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="Deven Rikame, home">
            DR<span>.</span>
          </a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
          </div>
          <a className="nav-cta" href="mailto:devenrikame55@gmail.com">
            Let&apos;s talk <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" aria-hidden="true" />
              Open to full-time software engineering roles
            </p>
            <p className="hero-intro">Hello, I&apos;m</p>
            <h1 id="hero-title">Deven Rikame</h1>
            <p className="hero-role">
              Full Stack Developer <span>/</span> Software Development Engineer
            </p>
            <p className="hero-summary">
              Mumbai-based software developer with hands-on experience building
              and delivering production websites, CRM systems, SaaS products,
              and AI-powered applications. I work across frontend, backend,
              databases, authentication, and deployment using React, Next.js,
              TypeScript, Node.js, Firebase, Supabase, and SQL.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Explore my work <ArrowUpRight size={18} />
              </a>
              <a
                className="button button-secondary"
                href="/Deven_Rikame_Resume.pdf"
                download
              >
                <Download size={18} /> Download resume
              </a>
            </div>
            <div className="hero-links" aria-label="Contact links">
              <a href="mailto:devenrikame55@gmail.com">
                <Mail size={17} /> devenrikame55@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/dev55"
                target="_blank"
                rel="noreferrer"
              >
                <BriefcaseBusiness size={17} /> LinkedIn
              </a>
              <a
                href="https://github.com/deven065"
                target="_blank"
                rel="noreferrer"
              >
                <Code2 size={17} /> GitHub
              </a>
            </div>
          </div>

          <aside className="profile-card" aria-label="Portrait of Deven Rikame">
            <div className="profile-frame">
              <Image
                src="/deven-rikame-profile.jpeg"
                alt="Deven Rikame, Full Stack Developer and Software Development Engineer"
                fill
                preload
                sizes="(max-width: 920px) 620px, 390px"
                className="profile-photo"
              />
              <div className="profile-shade" aria-hidden="true" />
              <div className="profile-caption">
                <span className="profile-status">
                  <span className="status-dot" aria-hidden="true" />
                  Available to join
                </span>
                <strong>Deven Rikame</strong>
                <p>Full Stack Developer · SDE</p>
              </div>
            </div>
            <div className="profile-facts" aria-label="Professional highlights">
              <div>
                <span>Focus</span>
                <strong>Full-stack products</strong>
              </div>
              <div>
                <span>Core stack</span>
                <strong>React · Next.js · TypeScript</strong>
              </div>
              <div>
                <span>Based in</span>
                <strong>Mumbai, India</strong>
              </div>
            </div>
          </aside>
        </section>

        <section id="about" className="section-shell content-section">
          <div className="section-heading">
            <p className="section-number">01 / About</p>
            <h2>Business understanding meets hands-on engineering.</h2>
          </div>
          <div className="about-grid">
            <p className="lead-copy">
              My path into software started with a commerce background and data
              analysis, then grew into full-stack development through structured
              training and real client work. That mix helps me understand both
              the product goal and the engineering required to deliver it.
            </p>
            <div className="about-details">
              <p>
                I work across the development lifecycle: gathering requirements,
                designing responsive interfaces, building APIs and database
                workflows, implementing authentication and role-based access,
                and deploying production applications.
              </p>
              <p>
                I&apos;m most effective in teams that value ownership, clear
                communication, continuous learning, and software that produces a
                measurable outcome for users or the business.
              </p>
              <div className="value-row">
                <span><CheckCircle2 size={17} /> End-to-end ownership</span>
                <span><CheckCircle2 size={17} /> Client communication</span>
                <span><CheckCircle2 size={17} /> Fast, practical learning</span>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="section-shell content-section">
          <div className="section-heading">
            <p className="section-number">02 / Experience</p>
            <h2>From business requirements to shipped software.</h2>
          </div>
          <div className="timeline">
            {experience.map((item) => (
              <article className="timeline-item" key={`${item.company}-${item.role}`}>
                <div className="timeline-meta">
                  <p>{item.period}</p>
                  <span><MapPin size={14} /> {item.location}</span>
                </div>
                <div className="timeline-content">
                  <div className="role-icon" aria-hidden="true">
                    <BriefcaseBusiness size={20} />
                  </div>
                  <div>
                    <h3>{item.role}</h3>
                    <p className="company">{item.company}</p>
                    <ul>
                      {item.points.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section-shell content-section">
          <div className="section-heading heading-row">
            <div>
              <p className="section-number">03 / Selected projects</p>
              <h2>Work explained through challenge, action, and result.</h2>
            </div>
            <p className="heading-note">
              Structured with the STAR approach so recruiters can quickly see
              the problem, my contribution, and the outcome.
            </p>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <article className={`project-card ${index === 0 ? "featured" : ""}`} key={project.title}>
                <div className="project-topline">
                  <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="project-status">{project.status}</span>
                </div>
                <div className="project-title-row">
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.period}</p>
                  </div>
                  {project.repo && (
                    <a
                      className="icon-link"
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <Code2 size={20} />
                    </a>
                  )}
                </div>
                <div className="star-story">
                  <div>
                    <span>Situation</span>
                    <p>{project.situation}</p>
                  </div>
                  <div>
                    <span>Task & action</span>
                    <p>{project.action}</p>
                  </div>
                  <div className="result">
                    <span>Result</span>
                    <p>{project.result}</p>
                  </div>
                </div>
                <ul className="tag-list" aria-label={`${project.title} technologies`}>
                  {project.stack.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section-shell content-section">
          <div className="section-heading">
            <p className="section-number">04 / Technical skills</p>
            <h2>A practical full-stack toolkit.</h2>
          </div>
          <div className="skills-grid">
            {skills.map((group) => (
              <article className="skill-group" key={group.label}>
                <h3>{group.label}</h3>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="section-shell content-section">
          <div className="section-heading">
            <p className="section-number">05 / Education</p>
            <h2>Education and continuous development.</h2>
          </div>
          <div className="education-list">
            {education.map((item) => (
              <article key={item.program}>
                <GraduationCap size={22} aria-hidden="true" />
                <div>
                  <h3>{item.program}</h3>
                  <p>{item.school}</p>
                </div>
                <div className="education-meta">
                  <span>{item.period}</span>
                  <span>{item.location}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="section-shell contact-inner">
            <p className="section-number">06 / Contact</p>
            <h2>Looking for a developer who takes ownership?</h2>
            <p>
              I&apos;m currently exploring full-time opportunities in software
              engineering, frontend development, and full-stack development.
              Let&apos;s talk about the problems your team is solving.
            </p>
            <div className="contact-actions">
              <a className="button button-light" href="mailto:devenrikame55@gmail.com">
                <Mail size={18} /> Email me
              </a>
              <a className="button button-outline-light" href="tel:+919833703389">
                <Phone size={18} /> +91 983-370-3389
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="section-shell footer-inner">
          <p>© {new Date().getFullYear()} Deven Rikame</p>
          <p>Full Stack Developer · Mumbai, India</p>
          <div>
            <a href="https://www.linkedin.com/in/dev55" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/deven065" target="_blank" rel="noreferrer">GitHub</a>
            <a href="/Deven_Rikame_Resume.pdf" target="_blank">Resume</a>
          </div>
        </div>
      </footer>
    </>
  );
}
