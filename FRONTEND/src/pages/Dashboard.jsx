import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const API_BASE_URL = 'http://localhost:5000/api/reviews'
const token = localStorage.getItem("token");

function Dashboard() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [guestName, setGuestName] = useState("")
  const [hotelName, setHotelName] = useState("")
  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [editGuestName, setEditGuestName] = useState("")
  const [editHotelName, setEditHotelName] = useState("")
  const [editRating, setEditRating] = useState(5)
  const [editReview, setEditReview] = useState("")

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        const response = await fetch(API_BASE_URL, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
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
  const addReview = async (e) => {
  e.preventDefault()

  try {
    const response = await fetch(API_BASE_URL, {
    headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
},
});

    const result = await response.json()

    if (!response.ok) {
      alert(result.message || "Failed to add review")
      return
    }

    setReviews([...reviews, result.data])

    setGuestName("")
    setHotelName("")
    setRating(5)
    setReviewText("")

    alert("Review Added Successfully!")
  } catch (err) {
    console.error(err)
    alert("Something went wrong")
  }
}
  const deleteReview = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    )

    if (!confirmDelete) return

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      if (!response.ok) {
        throw new Error("Failed to delete review")
      }

      setReviews(reviews.filter((review) => review._id !== id))

      alert("Review deleted successfully!")
    } catch (err) {
      console.error(err)
      alert("Could not delete review.")
    }
  }
  const startEditing = (review) => {
    setEditingId(review._id)
    setEditGuestName(review.guestName)
    setEditHotelName(review.hotelName)
    setEditRating(review.rating)
    setEditReview(review.review)
  }
  const updateReview = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        guestName: editGuestName,
        hotelName: editHotelName,
        rating: Number(editRating),
        review: editReview,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      alert("Update failed")
      return
    }

    setReviews(
      reviews.map((r) =>
        r._id === editingId ? result.data : r
      )
    )

    setEditingId(null)

    alert("Review updated successfully!")
  } catch (err) {
    console.error(err)
    alert("Something went wrong")
  }
}

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main
  style={{
    flex: 1,
    padding: '7rem 2rem 3rem',
    maxWidth: '800px',
    margin: '0 auto'
  }}
>
        <h1 style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: '1rem' }}>Dashboard</h1>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '2rem' }}>
          Live guest reviews pulled from the backend API.
        </p>
  <form
  onSubmit={addReview}
  style={{
    background: "#fff",
    color: "#2c3e50",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "30px",
    boxShadow: "0 2px 8px rgba(0,0,0,.1)",
  }}
>
  <h2
  style={{
    color: "#2c3e50",
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "20px",
  }}
  >
    Add Review</h2>

  <input
    type="text"
    placeholder="Guest Name"
    value={guestName}
    onChange={(e) => setGuestName(e.target.value)}
    required
    style={{
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  color: "#222",
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  borderRadius: "5px",
}}
  />

  <input
    type="text"
    placeholder="Hotel Name"
    value={hotelName}
    onChange={(e) => setHotelName(e.target.value)}
    required
    style={{
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  color: "#222",
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  borderRadius: "5px",
}}
  />

  <select
  value={rating}
  onChange={(e) => setRating(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    color: "#222",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "5px",
  }}
>
  <option value="1">⭐ 1</option>
  <option value="2">⭐⭐ 2</option>
  <option value="3">⭐⭐⭐ 3</option>
  <option value="4">⭐⭐⭐⭐ 4</option>
  <option value="5">⭐⭐⭐⭐⭐ 5</option>
</select>


  <textarea
    placeholder="Write Review"
    value={reviewText}
    onChange={(e) => setReviewText(e.target.value)}
    required
    style={{
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  color: "#222",
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  borderRadius: "5px",
}}
  />

  <button
    type="submit"
    style={{
      padding: "12px 20px",
      background: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    Add Review
  </button>
</form>
        {editingId && (
  <div
    style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      marginBottom: "30px",
      boxShadow: "0 2px 8px rgba(0,0,0,.1)",
    }}
  >
    <h2 style={{ color: "#2c3e50" }}>Edit Review</h2>

    <input
      type="text"
      value={editGuestName}
      onChange={(e) => setEditGuestName(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        color: "#222",
      }}
    />

    <input
      type="text"
      value={editHotelName}
      onChange={(e) => setEditHotelName(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        color: "#222",
      }}
    />

    <select
      value={editRating}
      onChange={(e) => setEditRating(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        color: "#222",
      }}
    >
      <option value="1">⭐ 1</option>
      <option value="2">⭐⭐ 2</option>
      <option value="3">⭐⭐⭐ 3</option>
      <option value="4">⭐⭐⭐⭐ 4</option>
      <option value="5">⭐⭐⭐⭐⭐ 5</option>
    </select>

    <textarea
      value={editReview}
      onChange={(e) => setEditReview(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        color: "#222",
      }}
    />

    <div style={{ display: "flex", gap: "10px" }}>
      <button
        onClick={updateReview}
        style={{
          background: "#27ae60",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Update Review
      </button>

      <button
        onClick={() => setEditingId(null)}
        style={{
          background: "#7f8c8d",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Cancel
      </button>
    </div>
  </div>
)}{loading && (
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
                <div
                  style={{
                    marginTop: "15px",
                    display: "flex",
                    gap: "10px",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    onClick={() => startEditing(review)}
                    style={{
                      background: "#3498db",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteReview(review._id)}
                    style={{
                      background: "#e74c3c",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
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