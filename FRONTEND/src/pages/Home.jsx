import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Card from '../components/Card'
import Footer from '../components/Footer'
import './Home.css'

function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <Hero />
      <section className="card-grid">
        <Card 
          title="Review Analysis"
          description="Get deep insights from thousands of homestay reviews using AI-powered sentiment analysis."
          image="https://picsum.photos/seed/review/300/200"
        />
        <Card 
          title="Compare Homestays"
          description="Easily compare ratings, amenities, and guest feedback across different properties."
          image="https://picsum.photos/seed/compare_homestay/300/200"
        />
        <Card 
          title="Trending Destinations"
          description="Discover top-rated homestays based on real traveler reviews and ratings."
          image="https://picsum.photos/seed/destination/300/200"
        />
      </section>
      <Footer />
    </div>
  )
}

export default Home