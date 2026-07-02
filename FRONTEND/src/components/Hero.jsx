import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <h1>
          Find Your Perfect
          <span> Homestay</span>
        </h1>

        <p>
          Analyze reviews, compare ratings and discover trusted homestays
          with AI-powered insights to make smarter travel decisions.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Get Started</button>

          <button className="secondary-btn">
            Explore Reviews
          </button>
        </div>

      </div>

      <div className="hero-image">

        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
          alt="Homestay"
        />

      </div>

    </section>
  );
}

export default Hero;