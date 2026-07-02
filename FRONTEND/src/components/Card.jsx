import "./Card.css";

function Card({ title, description, image }) {
  return (
    <div className="card">
      {image && (
        <div className="card-image-wrapper">
          <img src={image} alt={title} className="card-image" />
        </div>
      )}

      <div className="card-content">
        <h3>{title}</h3>

        <p>{description}</p>

        <button className="card-btn">
          Learn More →
        </button>
      </div>
    </div>
  );
}

export default Card;