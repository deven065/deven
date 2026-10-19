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
import MotionEffects from "./components/MotionEffects";

const experience = [
  {
    role: "Freelance Full Stack Developer",
    company: "Deven Digital Labs",
    period: "Oct 2025 - Present",
    location: "Remote",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    points: [
      "Design, build, and deploy responsive business websites and web applications with Next.js, React, and Tailwind CSS.",
      "Own the full client lifecycle: requirements discovery, solution design, development, deployment, and handover.",
      "Translate business goals into clear, conversion-focused user experiences that strengthen clients' online presence.",
    ],
  },
  {
    role: "Software Development Engineer (Contract)",
    company: "BMG Interiors",
    period: "Feb 2026 - May 2026",
    location: "Remote",
    stack: ["Next.js", "React", "MariaDB"],
    points: [
      "Partnered directly with the co-founder to take a production Next.js website from discovery to launch in under three weeks.",
      "Independently owned design, development, testing, and deployment, keeping delivery tightly aligned with business requirements.",
      "Contributed to a 20% improvement in client conversion and decision-making effectiveness.",
      "Built the company's internal CRM alongside the website (see Selected Projects).",
    ],
  },
  {
    role: "Data Analyst",
    company: "HUDL",
    period: "Feb 2024 - Jun 2024",
    location: "Mumbai, India",
    stack: ["Dashboards", "Data analysis", "Reporting"],
    points: [
      "Built operational dashboards for lead tracking and sales pipeline management.",
      "Worked with senior managers to turn raw business data into clear, actionable insights for decision-making.",
    ],
  },
];

const projects = [
  {
    title: "ProofPath: AI Career Evidence Coach",
    period: "Kurukshetra Hackathon",
    status: "Hackathon project",
    stack: ["React", "Framer Motion", "Java", "Spring Boot", "NeonDB (PostgreSQL)", "Groq AI", "GitHub Webhooks"],
    situation:
      "Students list skills on a resume that their public code does not clearly show, and have no way to see how a real job posting compares with their actual work.",
    action:
      "Built an AI career coach that compares a real job posting with evidence in a student's GitHub repository, links every conclusion to the exact file and commit, explains each gap, and reassesses affected skills automatically when new code is pushed.",
    result:
      "A working, deployed product for the AI Career Coach challenge that turns job requirements into traceable, evidence-backed feedback.",
    repo: "https://github.com/deven065/JobApplication",
    live: "https://proofpath-ai.netlify.app/",
  },
  {
    title: "Solo Levelling",
    period: "Personal project",
    status: "Full-stack app",
    stack: ["React", "Framer Motion", "Tailwind CSS", "Java", "NeonDB (PostgreSQL)", "Groq AI"],
    situation:
      "Self-improvement tools often feel like chores, and users lose motivation when progress is not visible or rewarding.",
    action:
      "Built a gamified levelling system inspired by Solo Leveling's System, with a Java backend, a NeonDB (PostgreSQL) data layer, an animated React interface, and Groq AI integration.",
    result:
      "A polished, deployed full-stack app that turns personal progress into an engaging, game-like experience.",
    repo: "https://github.com/deven065/Solo-Levelling",
    live: "https://solo-levelling-325.netlify.app/",
  },
  {
    title: "BMG Interiors CRM",
    period: "Feb - May 2026",
    status: "Production",
    stack: ["React", "Next.js", "MariaDB"],
    situation:
      "An interiors business was managing client records, operations, and lead follow-ups without a structured system.",
    action:
      "Designed and built responsive CRM interfaces on a MariaDB backend, optimized queries, and iterated on workflows with internal stakeholders.",
    result:
      "Improved decision-making by 25% and lead follow-ups by 20%.",
    repo: "https://github.com/deven065/bmginteriors-crm",
  },
  {
    title: "AI Subscription E-commerce Platform",
    period: "2025",
    status: "Client delivery",
    stack: ["Next.js", "TypeScript", "React", "Supabase"],
    situation:
      "A client needed a scalable storefront for selling AI subscription plans, from plan discovery through account management.",
    action:
      "Implemented authentication, database operations, a customer dashboard, plan management, and a Stripe-ready checkout flow on Supabase.",
    result:
      "Delivered a type-safe, production-ready codebase prepared for client-managed deployment and payment integration.",
  },
  {
    title: "SocietiQ",
    period: "In development",
    status: "SaaS product",
    stack: ["React", "Tailwind CSS", "Firebase Auth", "Realtime Database"],
    situation:
      "Residential societies often run residents, staff, notices, accounting, and maintenance on disconnected manual processes.",
    action:
      "Architected a multi-society SaaS platform with admin and member roles, secure authentication, free core tools, and tiered Pro and Advanced plans.",
    result:
      "A scalable, role-driven foundation that unifies community operations and subscription services in one product.",
    repo: "https://github.com/deven065/SocietiQ",
  },
  {
    title: "FlatMate",
    period: "May 2025",
    status: "Full-stack app",
    stack: ["React", "Tailwind CSS", "Firebase Auth", "Realtime Database"],
    situation:
      "A residential society needed a secure digital workflow for member records, expenses, maintenance payments, and announcements.",
    action:
      "Built role-based authentication, protected admin routes, member and finance workflows, and an accessible dark mode.",
    result:
      "A working society-management application with separate, secure experiences for administrators and members.",
    repo: "https://github.com/deven065/FlatMate",
  },
  {
    title: "Chef Claude",
    period: "Nov - Dec 2024",
    status: "AI application",
    stack: ["React", "JavaScript", "Hugging Face API", "Vercel"],
    situation:
      "People often have ingredients on hand but lack practical ideas for turning them into a complete meal.",
    action:
      "Built a React app that sends a user's ingredients to a Hugging Face model and renders generated recipe suggestions.",
    result:
      "Deployed on Vercel as a practical AI-assisted recipe tool that responds to real user input.",
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
      <MotionEffects />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <header className="site-header" data-reveal="fade">
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
            <p className="eyebrow" data-reveal="up" data-delay="0">
              <span className="status-dot" aria-hidden="true" />
              Open to full-time software engineering roles
            </p>
            <p className="hero-intro" data-reveal="up" data-delay="1">Hello, I&apos;m</p>
            <h1 id="hero-title" data-reveal="up" data-delay="2">Deven Rikame</h1>
            <p className="hero-role" data-reveal="up" data-delay="3">
              Full Stack Developer <span>/</span> Software Development Engineer
            </p>
            <p className="hero-summary" data-reveal="up" data-delay="4">
              Mumbai-based software developer with hands-on experience building
              and delivering production websites, CRM systems, SaaS products,
              and AI-powered applications. I work across frontend, backend,
              databases, authentication, and deployment using React, Next.js,
              TypeScript, Node.js, Firebase, Supabase, and SQL.
            </p>
            <div className="hero-actions" data-reveal="up" data-delay="5">
              <a className="button button-primary" href="#projects">
                Explore my work <ArrowUpRight size={18} />
              </a>
              <a
                className="button button-secondary"
                href="/Deven_Resume.pdf"
                download
              >
                <Download size={18} /> Download resume
              </a>
            </div>
            <div className="hero-links" aria-label="Contact links" data-reveal="up" data-delay="6">
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

          <aside className="profile-card" aria-label="Portrait of Deven Rikame" data-reveal="scale" data-delay="2">
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
          <div className="section-heading" data-reveal="up">
            <p className="section-number">01 / About</p>
            <h2>Business understanding meets hands-on engineering.</h2>
          </div>
          <div className="about-grid">
            <p className="lead-copy" data-reveal="left">
              My path into software started with a commerce background and data
              analysis, then grew into full-stack development through structured
              training and real client work. That mix helps me understand both
              the product goal and the engineering required to deliver it.
            </p>
            <div className="about-details" data-reveal="right" data-delay="1">
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
          <div className="section-heading" data-reveal="up">
            <p className="section-number">02 / Experience</p>
            <h2>Professional experience delivering software that works for the business.</h2>
          </div>
          <div className="timeline">
            {experience.map((item, index) => (
              <article
                className="timeline-item"
                key={`${item.company}-${item.role}`}
                data-reveal="up"
                data-delay={index % 3}
              >
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
                    <ul className="tag-list" aria-label={`${item.company} technologies`}>
                      {item.stack.map((tech) => <li key={tech}>{tech}</li>)}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section-shell content-section">
          <div className="section-heading heading-row" data-reveal="up">
            <div>
              <p className="section-number">03 / Selected projects</p>
              <h2>Production systems and products, with measurable outcomes.</h2>
            </div>
            <p className="heading-note">
              Each project outlines the problem, what I built, and the
              outcome. Source code is linked where available.
            </p>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <article
                className={`project-card ${index === 0 ? "featured" : ""}`}
                key={project.title}
                data-reveal="up"
                data-delay={index % 2}
              >
                <div className="project-topline">
                  <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="project-status">{project.status}</span>
                </div>
                <div className="project-title-row">
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.period}</p>
                  </div>
                  <div className="project-links">
                  {project.live && (
                    <a
                      className="icon-link"
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${project.title} live demo`}
                    >
                      <ArrowUpRight size={20} />
                    </a>
                  )}
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
                </div>
                <div className="star-story">
                  <div>
                    <span>Problem</span>
                    <p>{project.situation}</p>
                  </div>
                  <div>
                    <span>What I built</span>
                    <p>{project.action}</p>
                  </div>
                  <div className="result">
                    <span>Impact</span>
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
          <div className="section-heading" data-reveal="up">
            <p className="section-number">04 / Technical skills</p>
            <h2>A practical full-stack toolkit.</h2>
          </div>
          <div className="skills-grid">
            {skills.map((group, index) => (
              <article
                className="skill-group"
                key={group.label}
                data-reveal="up"
                data-delay={index % 3}
              >
                <h3>{group.label}</h3>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="section-shell content-section">
          <div className="section-heading" data-reveal="up">
            <p className="section-number">05 / Education</p>
            <h2>Education and continuous development.</h2>
          </div>
          <div className="education-list">
            {education.map((item, index) => (
              <article key={item.program} data-reveal="up" data-delay={index % 2}>
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
          <div className="section-shell contact-inner" data-reveal="up">
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
            <a href="/Deven_Resume.pdf" target="_blank">Resume</a>
          </div>
        </div>
      </footer>
    </>
  );
}
