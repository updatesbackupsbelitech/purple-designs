import BackToTop from './components/BackToTop'
import Section from './components/Section'
import About from './sections/About'
import Hero from './sections/Hero'
import Navbar from './sections/Navbar'
import Projects from './sections/Projects'
import Services from './sections/Services'

// TEMPORARY: gives the Contact section some height until Step 10.
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
        <Projects />

        <Section id="contact" eyebrow="Get In Touch" title="Contact" tone="beige">
          <TempSpace note="Contact content arrives in Step 10." />
        </Section>
      </main>
      <BackToTop />
    </>
  )
}

export default App