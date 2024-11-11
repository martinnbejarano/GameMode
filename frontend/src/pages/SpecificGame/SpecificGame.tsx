import { useParams } from "react-router-dom";
import { useFetch } from "../../Hooks";
import { Game } from "../../interfaces/Game";
import { Review } from "../../interfaces/Review";
import {
  GameHeader,
  GameInfo,
  SystemRequirements,
  GameReviews,
} from "../../components/GameDetails";
import { axi } from "../../utils/axiosInstance";
import toast from "react-hot-toast";

export const SpecificGame = () => {
  const { id } = useParams();
  const { data: game, loading, error } = useFetch<Game>(`/games/${id}`);
  const { data: reviews, refetch: refetchReviews } = useFetch<{
    success: boolean;
    data: Review[];
  }>(`/games/${id}/reviews`);

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
    try {
      await axi.post(`/users/reviews/${id}/`, {
        content,
        rating,
      });
      toast.success("Reseña enviada con éxito");
      await refetchReviews();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col gap-4 text-primaryFont mt-[60px] p-8">
      <GameHeader game={game} />

      <section className="flex flex-col gap-8 items-start lg:flex-row">
        <div className="w-full lg:w-2/3">
          <img
            src={`/public/images/${game.images[0]}`}
            alt={game.name}
            className="w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden"
          />
        </div>
        <GameInfo game={game} />
      </section>

      <section>
        <SystemRequirements
          minimumRequirements={game.minimumSystemRequirements}
          recommendedRequirements={game.recommendedSystemRequirements}
        />
      </section>

      <section className="flex flex-col gap-4 md:gap-8 mt-8 md:mt-12">
        <GameReviews
          reviews={reviews?.data || []}
          onSubmitReview={handleSubmitReview}
        />
      </section>
    </div>
  );
};
