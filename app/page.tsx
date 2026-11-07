import { LightboxImage } from "@/components/image-lightbox";
import { Experience } from "@/components/experience";
import { DeferredPhysicsLab } from "@/components/deferred-physics-lab";
import Image from "next/image";
import { ProjectExplorer } from "@/components/project-explorer";
import { SiteHeader } from "@/components/site-header";
import { achievements, concepts, profile, projects, skillGroups } from "@/data/portfolio";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none"><path d="M3 13 13 3M4 3h9v9" stroke="currentColor" strokeWidth="1.4" /></svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none"><path d="M2.5 8h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.4" /></svg>
  );
}

function Chapter({ number, label, light = false }: { number: string; label: string; light?: boolean }) {
  return <p className={`chapter-label${light ? " chapter-label--light" : ""}`}><span>{number}</span><i />{label}</p>;
}

function ProjectArtwork({ tone }: { tone: string }) {
  return (
    <div className={`project-art project-art--${tone}`} aria-hidden="true">
      {tone === "red" && <svg viewBox="0 0 500 270"><rect x="103" y="28" width="184" height="220" rx="2" transform="rotate(-6 103 28)" fill="#17191d" stroke="#e8e4dc" strokeOpacity=".34" /><path d="M132 83h114M128 112h148M125 141h88M121 171h117" stroke="#a7a9ac" strokeOpacity=".48" strokeWidth="2" /><path d="M126 108h75M122 167h104" stroke="#d93636" strokeWidth="4" /><rect x="247" y="102" width="112" height="38" fill="none" stroke="#d93636" strokeWidth="1.5" /><path d="M359 121h54m-11-11 11 11-11 11" fill="none" stroke="#f2a65a" strokeWidth="1.5" /><circle cx="374" cy="121" r="43" fill="#d93636" fillOpacity=".08" /></svg>}
      {tone === "bone" && <><div className="project-art__terminal"><span>adi@linux:~$</span><b>./script3_disk_auditor.sh</b><small>[scan] permissions checked<br />[scan] disk usage reviewed<br />[done] report generated</small><i>_</i></div><span className="project-art__index">SYSTEM / AUDIT</span></>}
      {tone === "amber" && <svg viewBox="0 0 500 270"><path d="M54 212h392M70 190 128 156l53 13 64-83 58 41 55-74 71 44" fill="none" stroke="#f2a65a" strokeWidth="2" /><path d="M70 190 128 156l53 13 64-83 58 41 55-74 71 44v115H70z" fill="url(#physicsFill)" opacity=".45" /><defs><linearGradient id="physicsFill" x1=".4" x2=".4" y1="0" y2="1"><stop stopColor="#f2a65a" stopOpacity=".35"/><stop offset="1" stopColor="#f2a65a" stopOpacity="0"/></linearGradient></defs>{[[128,156],[181,169],[245,86],[303,127],[358,53],[429,97]].map(([cx,cy])=><circle key={cx} cx={cx} cy={cy} r="4" fill="#e8e4dc" />)}</svg>}
      {tone === "graphite" && <svg viewBox="0 0 500 270"><path d="M75 201c31-101 87-148 161-141 70 6 124 48 189 7" fill="none" stroke="#d93636" strokeWidth="2" strokeDasharray="3 8" /><path d="M75 201c31-101 87-148 161-141 70 6 124 48 189 7" fill="none" stroke="#e8e4dc" strokeOpacity=".46" strokeWidth=".7" /><circle cx="75" cy="201" r="6" fill="#f2a65a"/><circle cx="425" cy="67" r="6" fill="#d93636"/><path d="M75 215h350M75 55v160" stroke="#a7a9ac" strokeOpacity=".32" strokeWidth="1"/><path d="m116 210 7-8 7 8m251-115 7-8 7 8" fill="none" stroke="#a7a9ac" strokeOpacity=".52"/></svg>}
      {tone === "teal" && <svg viewBox="0 0 500 270"><rect x="82" y="38" width="336" height="196" rx="3" fill="#101417" stroke="#86c2b5" strokeOpacity=".5"/><path d="M82 82h336M82 132h336M82 182h336" stroke="#a7a9ac" strokeOpacity=".24"/><text x="105" y="66" fill="#86c2b5" fontSize="11" letterSpacing="2">HOSTEL MENU / WEEKLY PLAN</text><text x="105" y="112" fill="#e8e4dc" fontSize="13">BREAKFAST</text><text x="105" y="162" fill="#e8e4dc" fontSize="13">LUNCH</text><text x="105" y="212" fill="#e8e4dc" fontSize="13">DINNER</text><circle cx="369" cy="106" r="8" fill="#f2a65a"/><circle cx="369" cy="156" r="8" fill="#d93636"/><circle cx="369" cy="206" r="8" fill="#86c2b5"/></svg>}
      <span className="project-art__corner">FIELD NOTE / {tone === "red" ? "01" : tone === "bone" ? "02" : tone === "amber" ? "03" : tone === "graphite" ? "04" : "05"}</span>
    </div>
  );
}

export default function Home() {
  return (
    <div id="top" className="site-shell">
      <Experience />
      <SiteHeader />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__copy">
            <Chapter number="01" label="THE SIGNAL" />
            <p className="hero__eyebrow"><span className="signal-dot" /> COMPUTER SCIENCE / GAMING TECHNOLOGY</p>
            <h1 id="hero-title" className="hero__title"><span>From curiosity</span><span>to <em>code.</em></span></h1>
            <p className="hero__tagline">From ideas to experiences.</p>
            <p className="hero__summary">I turn curiosity into things people can interact with — one project, experiment, and new question at a time.</p>
            <div className="hero__actions">
              <a className="button button--solid" href="#work">Explore selected work <Arrow /></a>
              <a className="text-link" href="#story">Meet the person <span>↓</span></a>
            </div>
            <div className="hero__meta">
              <div><small>STUDYING</small><span>{profile.degree}</span></div>
              <div><small>AT</small><span>{profile.university}</span></div>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__visual-halo" />
            <figure className="hero__portrait">
              <Image src="/images/adi-speaking.jpg" alt="Adi Midla speaking at an event, holding a microphone" fill sizes="(max-width: 620px) 72vw, (max-width: 800px) 36vw, 48vw" loading="eager" fetchPriority="high" />
            </figure>
            <div className="hero__visual-top"><span>FIG. 01</span><span>HUMAN / MACHINE</span></div>
            <div className="hero__visual-side" aria-hidden="true">LEARNING THROUGH MAKING — 2026</div>
            <div className="hero__caption"><span>01 / 08</span><span>STUDENT · BUILDER · CURIOUS</span></div>
            <span className="hero__orbit-word">FORM / FORCE / FEELING</span>
          </div>
          <a className="hero__scroll" href="#story" aria-label="Scroll to my story"><span>SCROLL TO BEGIN</span><i /></a>
        </section>

        <section id="story" className="section story-section" aria-labelledby="story-title">
          <div className="section-shell">
            <Chapter number="02" label="THE HUMAN LAYER" />
            <div className="story-grid">
              <div className="story-marker" data-reveal aria-label="Adi Midla, Computer Science student at VIT Bhopal University">
                <span className="story-marker__index">PERSON / BEFORE PIXELS</span>
                <span className="story-marker__monogram" aria-hidden="true">AM</span>
                <strong>Curiosity is a starting point.</strong>
                <span className="story-marker__meta">COMPUTER SCIENCE · GAMING TECHNOLOGY</span>
              </div>
              <div className="story-copy">
                <h2 id="story-title" className="section-title" data-reveal>Every builder starts somewhere. <em>Mine started with curiosity.</em></h2>
                <div className="story-copy__text" data-reveal>
                  <p>I’m a third-year B.Tech Computer Science and Engineering student specialising in Gaming Technology at VIT Bhopal University.</p>
                  <p>I’m drawn to the point where technology becomes something people can use, see, move through, or remember. Software, game development, and immersive experiences give me different ways to explore that idea.</p>
                  <p>I’m still learning, and my projects are part of that process. I care about making things I can explain, improving them through experimentation, and staying honest about what is finished and what is still an idea.</p>
                </div>
                <div className="story-facts" data-reveal>
                  <div><small>01 / EDUCATION</small><strong>{profile.degree}</strong><span>{profile.university} · {profile.year}</span></div>
                  <div><small>02 / CAMPUS</small><strong>Finance Team</strong><span>E-Cell, VIT Bhopal University</span></div>
                </div>
              </div>
            </div>
            <blockquote className="story-quote" data-reveal data-scroll-glow>“I enjoy exploring how technology can become something you can <em>experience.</em>”</blockquote>
          </div>
        </section>

        <section id="toolkit" className="section toolkit-section" aria-labelledby="toolkit-title">
          <div className="section-shell">
            <Chapter number="03" label="THE MIND / MY TOOLKIT" />
            <div className="toolkit-intro">
              <h2 id="toolkit-title" className="section-title" data-reveal>A toolkit in <em>motion.</em></h2>
              <p data-reveal>Areas I’m learning and working with — grouped by the kinds of problems they help me explore.</p>
            </div>
            <div className="skill-list">
              {skillGroups.map((group) => (
                <article className="skill-row" key={group.number} data-reveal>
                  <span className="skill-row__number">{group.number}</span>
                  <h3>{group.title}</h3>
                  <div className="skill-row__tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
                  <p>{group.note}</p>
                  <span className="skill-row__mark" aria-hidden="true">↗</span>
                </article>
              ))}
            </div>
            <p className="toolkit-note" data-reveal><span className="signal-dot" /> This is a record of current interests and practice, not a set of proficiency scores.</p>
          </div>
        </section>

        <section id="work" className="section work-section" aria-labelledby="work-title">
          <div className="section-shell">
            <Chapter number="04" label="THE LAB / SELECTED WORK" />
            <div className="work-heading">
              <h2 id="work-title" className="section-title" data-reveal>Work in progress.<br /><em>Learning in public.</em></h2>
              <p data-reveal>Projects, coursework, and prototypes that show what I’m trying, how I’m thinking, and where I’m still exploring.</p>
            </div>
            <ProjectExplorer>
              {projects.map((project) => (
                <article className={`project-card project-card--${project.tone}`} key={project.number} data-project-kind={project.filter} data-reveal>
                  <div className="project-card__head"><span>{project.number} / PROJECT</span><span className="project-status"><i />{project.status}</span></div>
                  {project.image ? (
                    <figure className="project-art project-art--image">
                      <LightboxImage src={project.image} alt={project.imageAlt} sizes="(max-width: 620px) 100vw, (max-width: 1000px) 90vw, 38vw" />
                    </figure>
                  ) : <ProjectArtwork tone={project.tone} />}
                  <div className="project-card__content">
                    <p className="project-card__category">{project.category}</p>
                    <h3>{project.title}</h3>
                    <p className="project-card__summary">{project.summary}</p>
                    <ul className="tag-list" aria-label="Technologies and topics">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
                    <details className="project-details">
                      <summary><span>What’s inside</span><b aria-hidden="true">+</b></summary>
                      <p>{project.details}</p>
                    </details>
                    {project.repo ? <a className="project-link" href={project.repo} target="_blank" rel="noreferrer">View repository <Arrow diagonal /></a> : <span className="project-link project-link--quiet">No public demo supplied</span>}
                  </div>
                </article>
              ))}
            </ProjectExplorer>
            <div className="concepts-note" data-reveal>
              <div><small>IDEAS / STILL TAKING SHAPE</small><h3>Some things begin as questions.</h3></div>
              <div className="concepts-note__items">{concepts.map((concept) => <article key={concept.title}><p>{concept.kind}</p><strong>{concept.title}</strong><span>{concept.text}</span></article>)}</div>
            </div>
          </div>
        </section>

        <section id="physics-lab" className="section physics-section" aria-labelledby="physics-title">
          <div className="section-shell">
            <Chapter number="04.1" label="A SMALL INTERACTIVE STUDY" />
            <div className="physics-heading">
              <div><h2 id="physics-title" className="section-title" data-reveal>Physics, made <em>playable.</em></h2><p data-reveal>A tiny projectile-motion model. Change the inputs and watch the path respond.</p></div>
              <span className="physics-equation" aria-label="horizontal distance equals initial velocity times cosine of angle times time">x = v₀ cos θ · t</span>
            </div>
            <DeferredPhysicsLab />
            <p className="physics-caption"><span>INTERACTIVE FIELD NOTE / 01</span><span>Ideal projectile model · air resistance not included</span></p>
          </div>
        </section>

        <section id="proof" className="section proof-section" aria-labelledby="proof-title">
          <div className="section-shell">
            <Chapter number="05" label="PROOF OF WORK" />
            <div className="proof-heading"><h2 id="proof-title" className="section-title" data-reveal>Small milestones.<br /><em>Real people, real rooms.</em></h2><p data-reveal>Recognition and learning experiences that have shaped the journey so far.</p></div>
            <div className="proof-grid">
              {achievements.map((item) => (
                <article className={`proof-card${item.image ? "" : " proof-card--plain"}`} key={item.number} data-reveal>
                  {item.image ? <figure className="proof-card__image"><LightboxImage src={item.image} alt={item.alt} sizes="(max-width: 760px) 100vw, 32vw" /></figure> : <div className="proof-card__seal" aria-hidden="true"><span>TOP</span><strong>30</strong><small>IN-NEC</small></div>}
                  <div className="proof-card__copy"><span className="proof-card__number">{item.number} / RECORD</span><p>{item.label}</p><h3>{item.title}</h3><span className="proof-card__detail">{item.detail}</span></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="beyond" className="section beyond-section" aria-labelledby="beyond-title">
          <div className="section-shell">
            <Chapter number="06" label="BEYOND THE CODE" />
            <div className="beyond-layout">
              <div className="beyond-copy">
                <h2 id="beyond-title" className="section-title" data-reveal>A life outside<br />the <em>terminal.</em></h2>
                <p data-reveal>Technology takes up a lot of my curiosity, but it isn’t all of it. I make room for the things that help me reset, notice more, and keep learning. Campus events and team projects keep those ideas connected to people.</p>
              </div>
              <div className="beyond-notes" data-reveal>
                <article><span>01 / RESET</span><h3>Room to recharge</h3><p>Gaming, basketball, books, and time away from a screen help keep curiosity fresh.</p></article>
                <article><span>02 / PRACTICE</span><h3>Learn by making</h3><p>Small software and game experiments turn questions into something I can test and improve.</p></article>
                <article><span>03 / COMMUNITY</span><h3>Build with people</h3><p>Campus teams and workshops connect technology to the people who learn and use it.</p></article>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section" aria-labelledby="contact-title">
          <div className="section-shell">
            <Chapter number="07" label="THE NEXT CHAPTER" />
            <div className="contact-layout">
              <div>
                <p className="contact-overline" data-reveal>STILL LEARNING. STILL EXPERIMENTING. STILL BUILDING.</p>
                <h2 id="contact-title" className="contact-title" data-reveal>Let’s make<br /><em>something matter.</em></h2>
                <p className="contact-copy" data-reveal>I’m interested in software development, game technology, and interactive experiences. I’m open to internships and collaborations where I can contribute, learn, and keep building.</p>
                <a className="button button--solid contact-button" href={`mailto:${profile.email}?subject=Let%27s%20talk%20about%20your%20portfolio`}>Start a conversation <Arrow diagonal /></a>
              </div>
              <div className="contact-links" data-reveal>
                <a href={`mailto:${profile.email}`}><span>EMAIL</span><strong>{profile.email}</strong><Arrow diagonal /></a>
                <a href={profile.github} target="_blank" rel="noreferrer"><span>GITHUB</span><strong>github.com/adimidla20</strong><Arrow diagonal /></a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer"><span>LINKEDIN</span><strong>linkedin.com/in/adi-midla</strong><Arrow diagonal /></a>
                <p className="resume-note"><i /> Résumé available on request</p>
              </div>
            </div>
            <footer className="site-footer"><span>ADI MIDLA / PERSONAL ARCHIVE</span><span>FROM CURIOSITY TO CODE. FROM IDEAS TO EXPERIENCES.</span><a href="#top">BACK TO TOP ↑</a><small>© {new Date().getFullYear()} ADI MIDLA</small></footer>
          </div>
        </section>
      </main>
    </div>
  );
}

