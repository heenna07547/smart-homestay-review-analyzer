import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Login() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '3rem 2rem', maxWidth: '400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: '1rem' }}>Login</h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#555' }}>
          Sign in to access your personalized review dashboard and saved comparisons.
        </p>
      </main>
      <Footer />
    </div>
  )
}

export default Login