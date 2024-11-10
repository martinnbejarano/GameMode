import { Button, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { Review } from "../../../interfaces/Review";
import "./GameReviews.css";

interface Props {
  reviews: Review[];
  onSubmitReview: (review: string, rating: number) => void;
}

export const GameReviews = ({ reviews, onSubmitReview }: Props) => {
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);

  return (
    <section className="reviews-section">
      <article className="review-form">
        <div className="usr-info">
          <img src="/public/images/profilePic.jpeg" className="user-avatar" />
          <div>
            <h4 className="user-name">User123</h4>
            <div className="rating-selector">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`star-button ${star <= rating ? "active" : ""}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>
        <Textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Comparte detalles sobre tu experiencia en el juego"
          className="review-textarea"
        />
        <div className="review-submit">
          <Button onClick={() => onSubmitReview(newReview, rating)}>
            Enviar
          </Button>
        </div>
      </article>

      {Array.isArray(reviews) && reviews.length > 0 ? (
        reviews.map((review, index) => (
          <article key={index} className="review-item">
            <img src={review.userAvatar} className="user-avatar" />
            <div>
              <div className="review-header">
                <h4 className="user-name">{review.userName}</h4>
                <div className="review-meta">
                  <span className="review-rating">
                    {"⭐️".repeat(review.rating)}
                  </span>
                  <span className="review-date">{review.date}</span>
                </div>
              </div>
              <p className="review-content">{review.content}</p>
            </div>
          </article>
        ))
      ) : (
        <div className="no-reviews">
          <p>No hay reseñas disponibles para este juego todavía.</p>
        </div>
      )}
    </section>
  );
};
