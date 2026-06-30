import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const API_BASE_URL = 'http://localhost:5000/api/reviews'

function Dashboard() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        const response = await fetch(API_BASE_URL)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const result = await response.json()
        setReviews(result.data || [])
        setError(null)
      } catch (err) {
        console.error('Failed to fetch reviews:', err)
        setError('Could not load reviews. Is the backend server running on port 5000?')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const renderRatingStars = (rating) => '★'.repeat(rating) + '☆'.repeat(5 - rating)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '3rem 2rem', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: '1rem' }}>Dashboard</h1>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '2rem' }}>
          Live guest reviews pulled from the backend API.
        </p>

        {loading && (
          <p style={{ color: '#888', fontStyle: 'italic' }}>Loading reviews...</p>
        )}

        {error && (
          <div style={{
            background: '#fde8e8',
            border: '1px solid #f5b5b5',
            color: '#c0392b',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem'
          }}>
            {error}
          </div>
        )}

        {!loading && !error && reviews.length === 0 && (
          <p style={{ color: '#888' }}>No reviews found yet.</p>
        )}

        {!loading && !error && reviews.length > 0 && (
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            {reviews.map((review) => (
              <div
                key={review._id}
                style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '10px',
                  padding: '1.25rem 1.5rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  background: '#fff'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ margin: 0, color: '#2c3e50' }}>{review.hotelName}</h3>
                  <span style={{ color: '#f5a623', fontSize: '1.1rem' }}>
                    {renderRatingStars(review.rating)}
                  </span>
                </div>
                <p style={{ margin: '0.5rem 0', color: '#444', lineHeight: '1.6' }}>
                  {review.review}
                </p>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#999' }}>
                  — {review.guestName}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Dashboard