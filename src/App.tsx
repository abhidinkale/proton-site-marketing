import { useEffect, useRef, useState } from 'react'
import './App.css'

const workflow = [
  {
    number: '01',
    title: 'Find roles that fit',
    description: 'Discover openings shaped around your experience and what you want next.',
  },
  {
    number: '02',
    title: 'Tailor your CV',
    description: 'Bring the most relevant parts of your experience forward for each role.',
  },
  {
    number: '03',
    title: 'Apply on your behalf',
    description: 'Move from a promising role to a thoughtful application without the busywork.',
  },
  {
    number: '04',
    title: 'Prepare for what’s next',
    description: 'Get focused, role-specific preparation for the conversations ahead.',
  },
]

const videoMoments = [
  {
    src: '/videos/open-opportunity-02.mp4',
    poster: '/images/open-opportunity-02-poster.png',
    eyebrow: 'Make room for the right opportunity',
    title: 'Your next move is out there.',
    description: 'Your agent keeps an eye out for roles that fit the direction you want to take.',
  },
  {
    src: '/videos/open-opportunity-03.mp4',
    poster: '/images/open-opportunity-03-poster.png',
    eyebrow: 'Take the next step with confidence',
    title: 'Show up ready for what’s next.',
    description: 'Walk into every application and interview with preparation shaped around the role.',
  },
]

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(motionPreference.matches)

    motionPreference.addEventListener('change', updatePreference)
    return () => motionPreference.removeEventListener('change', updatePreference)
  }, [])

  return prefersReducedMotion
}

function AmbientVideo({
  src,
  poster,
  prefersReducedMotion,
}: {
  src: string
  poster: string
  prefersReducedMotion: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVisible, setIsVisible] = useState(
    () => !('IntersectionObserver' in window),
  )

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return
    }

    if (!('IntersectionObserver' in window)) {
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, { rootMargin: '140px' })

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !isVisible || prefersReducedMotion) {
      video?.pause()
      return
    }

    void video.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return
      }

      console.error('Unable to play Open Opportunity background video.', error)
    })

    return () => video.pause()
  }, [isVisible, prefersReducedMotion])

  return (
    <video
      ref={videoRef}
      className="ambient-video"
      src={src}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-hidden="true"
      tabIndex={-1}
    />
  )
}

function VideoMoment({
  item,
  index,
  prefersReducedMotion,
}: {
  item: (typeof videoMoments)[number]
  index: number
  prefersReducedMotion: boolean
}) {
  const titleId = `video-moment-title-${index}`

  return (
    <section
      className={`video-moment${index % 2 === 1 ? ' video-moment--alternate' : ''}`}
      aria-labelledby={titleId}
    >
      <AmbientVideo
        src={item.src}
        poster={item.poster}
        prefersReducedMotion={prefersReducedMotion}
      />
      <div className="video-moment-copy section-frame">
        <p className="eyebrow">{item.eyebrow}</p>
        <h2 id={titleId}>{item.title}</h2>
        <p>{item.description}</p>
      </div>
      <span className="video-moment-count" aria-hidden="true">
        0{index + 2} / 03
      </span>
    </section>
  )
}

function App() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div className="page-shell">
      <main>
        <section className="hero" id="top" aria-labelledby="hero-title">
          <AmbientVideo
            src="/videos/open-opportunity-01.mp4"
            poster="/images/open-opportunity-01-poster.png"
            prefersReducedMotion={prefersReducedMotion}
          />
          <header className="site-header">
            <a className="brand" href="#top" aria-label="Open Opportunity home">
              <img src="/images/open-opportunity-mark.png" alt="" />
              <span>Open Opportunity</span>
            </a>
            <nav className="site-nav" aria-label="Main navigation">
              <a href="#how-it-works">How it works</a>
              <a href="#agent-workflow">The agent</a>
              <a className="header-action" href="#how-it-works">Explore the process</a>
            </nav>
          </header>
          <div className="hero-copy">
            <p className="eyebrow">Your career, with an agent in your corner</p>
            <h1 id="hero-title">Make finding your next job your agent’s job.</h1>
            <p className="hero-description">
              Open Opportunity finds roles, tailors your CV, applies on your behalf,
              and helps you prepare for what comes next.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#how-it-works">
                See how it works
              </a>
              <a className="text-link" href="#agent-workflow">Meet your agent</a>
            </div>
            <p className="hero-note">More time for the work only you can do.</p>
          </div>
          <a className="hero-scroll-cue" href="#agent-workflow">
            <span>Scroll to explore</span>
            <span aria-hidden="true" />
          </a>
        </section>

        <section className="agent-workflow section-frame" id="agent-workflow" aria-label="Example agent workflow">
          <div className="agent-preview">
            <div>
              <p className="preview-label">A role worth a closer look</p>
              <h2>Senior Product Designer</h2>
              <p className="preview-company">Example role · Remote</p>
            </div>
            <div className="preview-details">
              <div className="preview-task">
                <span className="task-check" aria-hidden="true">✓</span>
                <span>Experience matched to the role</span>
              </div>
              <div className="preview-task">
                <span className="task-check" aria-hidden="true">✓</span>
                <span>CV tailored for this application</span>
              </div>
              <div className="preview-progress">
                <span>Next up</span>
                <strong>Prepare to apply</strong>
              </div>
            </div>
          </div>
        </section>

        <VideoMoment
          item={videoMoments[0]}
          index={0}
          prefersReducedMotion={prefersReducedMotion}
        />

        <section className="how-it-works section-frame" id="how-it-works" aria-labelledby="workflow-title">
          <div className="section-heading">
            <p className="eyebrow">The search, handled end to end</p>
            <h2 id="workflow-title">From first search to interview prep.</h2>
            <p>
              Choose the direction. Your agent takes on the repetitive work between
              a good opening and a real conversation.
            </p>
          </div>

          <div className="workflow-list">
            {workflow.map((step) => (
              <article className="workflow-step" key={step.number}>
                <span className="step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <VideoMoment
          item={videoMoments[1]}
          index={1}
          prefersReducedMotion={prefersReducedMotion}
        />

        <section className="closing-section">
          <div className="closing-inner">
            <p className="eyebrow">Open Opportunity</p>
            <h2>Put your next move in motion.</h2>
            <a className="button button-light" href="#how-it-works">See how it works</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand" href="#top" aria-label="Open Opportunity home">
          <img src="/images/open-opportunity-mark.png" alt="" />
          <span>Open Opportunity</span>
        </a>
        <p>Your job search, with more room to be human.</p>
        <a href="#top">Back to the top</a>
        <span>© 2026 Open Opportunity</span>
      </footer>
    </div>
  )
}

export default App
