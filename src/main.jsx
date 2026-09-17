import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const technicalEvents = [
  {
    id: "ai-prompt",
    name: "AI Prompt Challenge",
    icon: "◉",
    tagline: "Prompt. Generate. Conquer.",
    description: "Use creative prompting and AI reasoning to solve challenge-based tasks.",
    rules: ["Individual or team entry as specified by organizers.", "Original prompts and outputs are expected.", "Judging is based on creativity, relevance and result quality."]
  },
  {
    id: "startup-pitch",
    name: "Startup Pitch",
    icon: "🚀",
    tagline: "Innovate. Pitch. Win.",
    description: "Present a practical startup idea and convince the judges that it can make an impact.",
    rules: ["Present a clear problem and solution.", "Explain the value proposition and target users.", "Time limits and pitch format will be announced by coordinators."]
  },
  {
    id: "uiux",
    name: "UI/UX Design",
    icon: "✦",
    tagline: "Imagine. Design. Build.",
    description: "Design a useful, attractive digital interface with a strong user experience.",
    rules: ["Bring or use the tools permitted by organizers.", "Design should be original.", "Judging considers usability, creativity and visual hierarchy."]
  },
  {
    id: "reverse-coding",
    name: "Reverse Coding",
    icon: "</>",
    tagline: "Decode. Debug. Dominate.",
    description: "Analyze a given program or output and reconstruct the required logic.",
    rules: ["Read the challenge carefully before coding.", "Use only permitted languages/tools.", "Correctness and efficiency contribute to the score."]
  },
  {
    id: "paper",
    name: "Paper Presentation",
    icon: "▤",
    tagline: "Research. Present. Excel.",
    description: "Present a technical topic clearly with research-backed ideas and practical relevance.",
    rules: ["Topic and submission format will be communicated separately.", "Cite external sources where appropriate.", "Presentation quality, technical depth and clarity are evaluated."]
  }
];

const nonTechnicalEvents = [
  {
    id: "reel-rush",
    name: "Reel Rush",
    icon: "▶",
    tagline: "Shoot. Edit. Viral.",
    description: "Create a short-form video that is creative, engaging and suitable for the given challenge.",
    rules: ["Content must follow the organizers' theme and safety rules.", "Use original or permitted media.", "Judging considers creativity, storytelling and editing."]
  },
  {
    id: "mystery-box",
    name: "Mystery Box",
    icon: "◇",
    tagline: "Unbox. Solve. Surprise.",
    description: "Think fast and creatively when you receive an unexpected challenge.",
    rules: ["Follow the challenge instructions exactly.", "Teamwork and problem-solving matter.", "The judges' decision will be final."]
  },
  {
    id: "doodle-dash",
    name: "Doodle Dash",
    icon: "✎",
    tagline: "Sketch. Race. Create.",
    description: "Turn a prompt into an original visual idea under a time limit.",
    rules: ["The drawing must be created during the event.", "Follow the announced prompt.", "Creativity, interpretation and presentation are considered."]
  }
];

const allEvents = [...technicalEvents, ...nonTechnicalEvents];

const coordinators = {
  faculty: "Dr. M. G. Kavitha",
  facultyPhone: "9994703151",
  students: [
    ["Sharbu Nisha", "8807316036"],
    ["Mubharak", "7904775276"],
    ["Fathima", "7904596722"],
    ["Sanjaya", "8870493766"]
  ]
};

const OFFICIAL_EMAIL = "imperior2k26@gmail.com";

function Countdown() {
  const target = Date.UTC(2026, 8, 25, 4, 30, 0);
  const [remaining, setRemaining] = useState(() => Math.max(0, target - Date.now()));

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(Math.max(0, target - Date.now())), 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  if (remaining === 0) return <div className="countdown-live">IMPERIOR 2K26 IS LIVE</div>;
  const totalSeconds = Math.floor(remaining / 1000);
  const values = [
    Math.floor(totalSeconds / 86400),
    Math.floor((totalSeconds % 86400) / 3600),
    Math.floor((totalSeconds % 3600) / 60),
    totalSeconds % 60
  ];
  return <div className="countdown" aria-label="Countdown to IMPERIOR 2K26"><span className="countdown-label">COUNTDOWN TO IMPERIOR 2K26</span><div>{values.map((value, index) => <span className="countdown-unit" key={index}><b>{String(value).padStart(2, "0")}</b><small>{["DAYS", "HOURS", "MINUTES", "SECONDS"][index]}</small></span>)}</div></div>;
}

function IntroOverlay({ onClose }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 850);
    return () => window.clearTimeout(timer);
  }, []);

  return <div className={`intro-overlay ${loading ? "is-loading" : "is-ready"}`} role="dialog" aria-label="IMPERIOR 2K26 brochure intro">
    <div className="intro-loader"><span /> LOADING IMPERIOR 2K26</div>
    <div className="intro-browser">
      <div className="intro-browser-bar"><span className="browser-dots"><i /><i /><i /></span><span className="browser-title">IMPERIOR 2K26 • UCE PATTUKKOTTAI</span><button onClick={onClose} aria-label="Close intro">×</button></div>
      <div className="intro-page"><img src="/sy.jpeg" alt="IMPERIOR 2K26 brochure" /></div>
    </div>
  </div>;
}

function App() {
  const [activeEvent, setActiveEvent] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [introOpen, setIntroOpen] = useState(true);

  useEffect(() => {
    document.body.style.overflow = activeEvent ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeEvent]);

  const openRegistrationForm = () => {
    const registrationTab = window.open("https://forms.gle/Y7eBwXvXgbhYTWQB6", "_blank");
    if (registrationTab) registrationTab.opener = null;
  };

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app">
      {introOpen && <IntroOverlay onClose={() => setIntroOpen(false)} />}
      <div className="scanlines" aria-hidden="true" />
      <header className="navbar">
        <button className="brand" onClick={() => scrollTo("home")} aria-label="Go to home">
          <span className="brand-mark">A</span>
          <span>
            <b>IMPERIOR</b>
            <small>2K26 • UCE PATTUKKOTTAI</small>
          </span>
        </button>

        <button className="menu-btn" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle navigation">☰</button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <button onClick={() => scrollTo("home")}>Home</button>
          <button onClick={() => scrollTo("events")}>Events</button>
          <button onClick={() => scrollTo("venue")}>Venue</button>
          <button className="nav-register" onClick={openRegistrationForm}>Register Now</button>
        </nav>
      </header>

      <main>
        <section id="home" className="hero section-shell">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <div className="eyebrow">UNIVERSITY COLLEGE OF ENGINEERING • PATTUKKOTTAI</div>
            <p className="constituent">A Constituent College of Anna University, Chennai</p>
            <p className="department">DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING <span>(AI &amp; ML)</span></p>
            <p className="presents">PROUDLY PRESENTS</p>

            <h1><span>IMPERIOR</span><strong>2K26</strong></h1>
            <p className="hero-tagline">Ideas Today <i>|</i> Innovations Tomorrow</p>

            <div className="date-badge">
              <span>25</span>
              <div><b>SEPTEMBER</b><small>2026</small></div>
            </div>

            <Countdown />

            <div className="hero-actions">
              <button className="primary-btn" onClick={openRegistrationForm}>Register Now ↗</button>
              <button className="ghost-btn" onClick={() => scrollTo("events")}>Explore Events ↓</button>
            </div>
          </div>

          <div className="hero-side-card">
            <span className="mini-label">EVENT MODE</span>
            <b>NATIONAL LEVEL</b>
            <p>Technical + Non-Technical</p>
            <div className="live-dot"><span /> Registration Open</div>
          </div>
        </section>

        <section className="quick-info">
          <div><span>◷</span><p><small>DATE</small><b>25 September 2026</b></p></div>
          <div><span>⌖</span><p><small>VENUE</small><b>Computer Lab</b></p></div>
          <div><span>◉</span><p><small>TIME</small><b>10:00 A.M onwards</b></p></div>
          <div><span>₹</span><p><small>REGISTRATION</small><b>₹150 / participant</b></p></div>
        </section>

        <section id="events" className="content-section section-shell">
          <SectionHeading kicker="01 / COMPETE" title="EVENT ARENA" subtitle="Choose exactly 3 events from the symposium lineup." />

          <div className="event-category">
            <div className="category-title">
              <span>TECHNICAL EVENTS</span>
              <em>05 EVENTS</em>
            </div>
            <div className="event-grid">
              {technicalEvents.map(event => (
                <EventCard key={event.id} event={event} onDetails={setActiveEvent} />
              ))}
            </div>
          </div>

          <div className="event-category">
            <div className="category-title">
              <span>NON-TECHNICAL EVENTS</span>
              <em>03 EVENTS</em>
            </div>
            <div className="event-grid three">
              {nonTechnicalEvents.map(event => (
                <EventCard key={event.id} event={event} onDetails={setActiveEvent} />
              ))}
            </div>
          </div>
        </section>

        <section className="registration-banner section-shell">
          <div>
            <span className="eyebrow">READY TO ENTER?</span>
            <h2>MAKE YOUR MOVE.</h2>
            <p>Register for exactly 3 events and compete for the overall winner shield.</p>
          </div>
          <button className="primary-btn" onClick={openRegistrationForm}>Register for ₹150 ↗</button>
        </section>

        <section id="venue" className="content-section section-shell">
          <SectionHeading kicker="03 / CONNECT" title="VENUE & CONTACT" subtitle="Everything you need before you arrive." />
          <div className="contact-layout">
            <div className="venue-card">
              <div className="venue-icon">⌖</div>
              <div>
                <small>VENUE</small>
                <h3>COMPUTER LAB</h3>
                <p>University College of Engineering, Pattukkottai</p>
              </div>
            </div>
            <div className="venue-card">
              <div className="venue-icon">◷</div>
              <div>
                <small>TIME</small>
                <h3>10:00 A.M ONWARDS</h3>
                <p>25 September 2026</p>
              </div>
            </div>
          </div>

          <div className="coordinator-board">
            <div className="coord-col">
              <small>FACULTY COORDINATION</small>
              <h3>{coordinators.faculty}</h3>
              <a href={`tel:${coordinators.facultyPhone}`}>{coordinators.facultyPhone}</a>
            </div>
            <div className="coord-col">
              <small>STUDENT COORDINATORS</small>
              {coordinators.students.map(([name, phone]) => (
                <p key={name}><b>{name}</b><a href={`tel:${phone}`}>{phone}</a></p>
              ))}
            </div>
            <div className="coord-col">
              <small>SYMPOSIUM EMAIL</small>
              <a className="email-link" href={`mailto:${OFFICIAL_EMAIL}`}>{OFFICIAL_EMAIL}</a>
              <small className="email-note">Official registration-response account.</small>
            </div>
          </div>
        </section>

        <section className="social-strip section-shell">
          <div>
            <span className="instagram">◎</span>
            <div><small>FOLLOW IMPERIOR</small><b>@imperior2k26</b></div>
          </div>
          <a href="https://www.instagram.com/imperior2k26/" target="_blank" rel="noreferrer">Open Instagram ↗</a>
        </section>
      </main>

      <footer>
        <div className="footer-inner section-shell">
          <div>
            <b>IMPERIOR <span>2K26</span></b>
            <p>University College of Engineering, Pattukkottai</p>
          </div>
          <div className="footer-links">
            <button onClick={() => scrollTo("events")}>Events</button>
            <button onClick={openRegistrationForm}>Register</button>
          </div>
          <p className="copyright">© 2026 IMPERIOR 2K26 • Create • Innovate • Lead</p>
        </div>
      </footer>

      {activeEvent && (
        <EventModal event={activeEvent} onClose={() => setActiveEvent(null)} onRegister={() => {
          setActiveEvent(null);
          openRegistrationForm();
        }} />
      )}
    </div>
  );
}

function SectionHeading({ kicker, title, subtitle }) {
  return (
    <div className="section-heading">
      <span>{kicker}</span>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

function EventCard({ event, onDetails }) {
  return (
    <article className="event-card">
      <div className="event-top"><span className="event-icon">{event.icon}</span><span className="event-code">IM-26</span></div>
      <h3>{event.name}</h3>
      <p>{event.tagline}</p>
      <button onClick={() => onDetails(event)}>View Details <span>→</span></button>
    </article>
  );
}

function EventModal({ event, onClose, onRegister }) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal event-modal" onMouseDown={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-icon">{event.icon}</div>
        <span className="eyebrow">EVENT DETAILS</span>
        <h2>{event.name}</h2>
        <p className="modal-tagline">{event.tagline}</p>
        <p>{event.description}</p>
        <h4>Event guidelines</h4>
        <ul>{event.rules.map(rule => <li key={rule}>{rule}</li>)}</ul>
        <button className="primary-btn full" onClick={onRegister}>Select during registration ↗</button>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
