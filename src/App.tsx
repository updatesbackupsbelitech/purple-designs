import Navbar from './sections/Navbar'

interface PlaceholderProps {
  id: string
  title: string
  background: string
}

// TEMPORARY: lets us test the Navbar. Removed section by section from Step 6.
function Placeholder({ id, title, background }: PlaceholderProps) {
  return (
    <section
      id={id}
      style={{ minHeight: '100vh', paddingBlock: 'var(--space-section)', background }}
    >
      <div className="container">
        <h2>{title}</h2>
      </div>
    </section>
  )
}

function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main">
        <Placeholder id="home" title="Home (Hero goes here)" background="var(--color-lilac)" />
        <Placeholder id="about" title="About" background="var(--color-white)" />
        <Placeholder id="services" title="Services" background="var(--color-beige)" />
        <Placeholder id="projects" title="Projects" background="var(--color-white)" />
        <Placeholder id="contact" title="Contact" background="var(--color-beige)" />
      </main>
    </>
  )
}

export default App