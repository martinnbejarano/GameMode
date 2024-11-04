import "./HomeSection.css";
import { useFetch } from "../../Hooks";
import { Carousel } from "../index";
import { useEffect } from "react";
import { Game } from "../../interfaces/Game";
import { useState } from "react";
import toast from "react-hot-toast";
import { axi } from "../../utils/axiosInstance";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const HomeSection: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGames = async () => {
    try {
      const response = await axi.get("/company/games");
      setGames(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los juegos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <ResponsiveCarousel
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          showStatus={false}
        >
          {games.map((game) => (
            <div key={game._id}>
              {game.images && game.images[0] && (
                <img
                  src={game.images[0] as string}
                  alt={game.name}
                  style={{
                    height: "400px",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
          ))}
        </ResponsiveCarousel>
      )}

      <section className="catalogo">
        <div className="catalogo_subtitulo">
          <h2 className="catalogo_subtitulo-h2">No pares de jugar</h2>
        </div>
        <div className="catalogo_imagen_fondo">
          <h3 className="catalogo_imagen_fondo_texto sombra-txt">
            El mayor catálogo de juegos y entretenimiento
          </h3>
          <a
            className="btn btn-success mi-btn-catalogo btn-catalogo"
            href="juegos.html"
          >
            Ver Juegos
          </a>
          <img
            className="catalogo_imagen_fondo_control wow animate__ animate__fadeInUpBig animated"
            src="..\public\images\pngwing.com.png"
            alt="Logo Joystick"
            style={{ visibility: "visible", animationName: "fadeInUpBig" }}
          />
        </div>
        <p className="catalogo_texto">
          Nadie tiene más contenido para tu consola. Consigue los últimos
          lanzamientos, taquillazos en exclusiva, pases de temporada, contenido
          complementario, juegos independientes y mucho más... a precios
          excelentes.
        </p>
      </section>
    </>
  );
};

export default HomeSection;
