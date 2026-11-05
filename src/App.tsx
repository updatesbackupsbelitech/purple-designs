import BackToTop from './components/BackToTop'
import WhatsAppButton from './components/WhatsAppButton'
import About from './sections/About'
import Contact from './sections/Contact'
import Hero from './sections/Hero'
import Navbar from './sections/Navbar'
import Projects from './sections/Projects'
import Services from './sections/Services'

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
        <Contact />
      </main>
      <WhatsAppButton />
      <BackToTop />
    </>
  )
}

export default App