import { useState } from "react";
import { Button, Textarea } from "@nextui-org/react";
import { useAuthStore } from "../../../store/authStore";
import { Link } from "react-router-dom";
import { Review } from "../../../interfaces/Review";

interface Props {
  reviews: {
    success: boolean;
    data: Review[];
  };
  onSubmitReview: (content: string, rating: number) => void;
}

export const GameReviews = ({ reviews, onSubmitReview }: Props) => {
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useAuthStore();

  const isAuthenticated = !!user;
  const userType = user?.type;
  const canReview = isAuthenticated && userType === "user";
  const defaultAvatar = "../../public/images/profilePic.jpeg";

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="reviews-section">
      {!isAuthenticated ? (
        <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center">
          <p className="text-gray-700">
            Debes{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-800">
              iniciar sesión
            </Link>{" "}
            o{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-800">
              registrarte
            </Link>{" "}
            aquí para poder dejar un comentario
          </p>
        </div>
      ) : canReview ? (
        <article className="review-form mb-8">
          <div className="usr-info">
            <img
              src={user.profilePicture || defaultAvatar}
              className="user-avatar w-12 h-12 rounded-full"
              alt="User avatar"
            />
            <div>
              <h4 className="user-name font-semibold">{user.username}</h4>
              <div className="rating-selector flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`star-button text-xl ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
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
            className="review-textarea mt-4"
          />
          <div className="review-submit mt-4">
            <Button
              onClick={() => {
                if (newReview.trim() && rating > 0) {
                  onSubmitReview(newReview, rating);
                  setNewReview("");
                  setRating(0);
                }
              }}
              className="bg-primary text-white"
              disabled={!newReview.trim() || rating === 0}
            >
              Enviar reseña
            </Button>
          </div>
        </article>
      ) : (
        <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center">
          <p className="text-gray-700">
            Solo los usuarios pueden dejar reseñas
          </p>
        </div>
      )}
      <div className="reviews-list space-y-6">
        {reviews.data && reviews.data.length > 0 ? (
          reviews.data.map((review, index) => (
            <article
              key={index}
              className="review-item bg-white p-4 rounded-lg shadow"
            >
              <div className="flex items-start gap-4">
                <img
                  src={review.user.profilePicture || defaultAvatar}
                  className="w-12 h-12 rounded-full"
                  alt={`${review.user.username}'s avatar`}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{review.user.username}</h4>
                      <div className="text-yellow-400">
                        {"★".repeat(review.rating)}
                        <span className="text-gray-300">
                          {"★".repeat(5 - review.rating)}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700">{review.content}</p>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No hay reseñas disponibles para este juego todavía.</p>
          </div>
        )}
      </div>
    </section>
  );
};
