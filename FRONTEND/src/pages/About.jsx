import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function About() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="page-title">About Us</h1>
        <p className="page-copy">
          We help travelers make better choices by analyzing homestay reviews using natural language processing and data visualization. Our platform aggregates feedback from multiple sources to provide unbiased insights.
        </p>
      </main>
      <Footer />
    </div>
  )
}

export default About
