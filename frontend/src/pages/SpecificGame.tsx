import { useParams } from "react-router-dom";
import { useFetch } from "../Hooks";
import { Game } from "../interfaces/Game";
import { Review } from "../interfaces/Review";
import {
  GameHeader,
  GameGallery,
  GameInfo,
  SystemRequirements,
  GameReviews,
} from "../components/GameDetails";

export const SpecificGame = () => {
  const { id } = useParams();
  const { data: game, loading, error } = useFetch<Game>(`/games/${id}`);
  const { data: reviews } = useFetch<Review[]>(`/games/${id}/reviews`);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Cargando...
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center">Error: {error.message}</div>
    );
  if (!game)
    return (
      <div className="text-red-500 text-center">No se encontró el juego</div>
    );

  const handleSubmitReview = async (content: string, rating: number) => {
    // Implementar lógica para enviar review
  };

  return (
    <div className="mt-[60px] p-8 text-primaryFont">
      <GameHeader game={game} />

      <div className="flex flex-col lg:flex-row gap-8">
        <GameGallery images={game.images as string[]} />
        <GameInfo game={game} />
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Requisitos del Sistema</h3>
        <SystemRequirements
          minimumRequirements={game.minimumSystemRequirements}
          recommendedRequirements={game.recommendedSystemRequirements}
        />
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Reseñas</h3>
        <GameReviews
          reviews={reviews || []}
          onSubmitReview={handleSubmitReview}
        />
      </div>
    </div>
  );
};
