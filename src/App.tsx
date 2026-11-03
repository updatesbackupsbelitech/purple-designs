import BackToTop from './components/BackToTop'
import Section from './components/Section'
import About from './sections/About'
import Hero from './sections/Hero'
import Navbar from './sections/Navbar'
import Services from './sections/Services'

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
        <About />
        <Services />

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