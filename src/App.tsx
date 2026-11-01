import BackToTop from './components/BackToTop'
import Section from './components/Section'
import Hero from './sections/Hero'
import Navbar from './sections/Navbar'

// TEMPORARY: gives each section some height so we can test scrolling.
function TempSpace({ note }: { note: string }) {
  return <p style={{ minHeight: '60vh' }}>{note}</p>
}

function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main">
        <Hero />

        <Section id="about" eyebrow="About Us" title="About" tone="white">
          <TempSpace note="About content arrives in Step 7." />
        </Section>
        <Section id="services" eyebrow="What We Do" title="Services" tone="beige">
          <TempSpace note="Services content arrives in Step 8." />
        </Section>
        <Section id="projects" eyebrow="Our Work" title="Projects" tone="white">
          <TempSpace note="Projects content arrives in Step 9." />
        </Section>
        <Section id="contact" eyebrow="Get In Touch" title="Contact" tone="beige">
          <TempSpace note="Contact content arrives in Step 10." />
        </Section>
      </main>
      <BackToTop />
    </>
  )
}

export default App