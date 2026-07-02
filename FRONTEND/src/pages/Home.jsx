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
  image="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600"
/>

<Card
  title="Compare Homestays"
  description="Compare ratings, amenities and guest feedback across multiple homestays."
  image="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"
/>

<Card
  title="Trending Destinations"
  description="Discover the highest-rated stays recommended by real travellers."
  image="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600"
/>
      </section>
      <Footer />
    </div>
  )
}

export default Home