import "./HomeSection.css";
import { useFetch } from "../../Hooks";
import Carousel from "../Carousel/Carousel";
import { Game } from "../../interfaces/Game";

const HomeSection: React.FC = () => {
  // Cambiamos el tipo genérico a Game[] directamente
  const { data, loading, error } = useFetch<Game[]>("/games");

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Tomamos los primeros 3 juegos directamente del array data
  const featuredGames = data?.slice(0, 2) || [];

  return (
    <>
      <Carousel games={featuredGames} />
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
            href="/games"
          >
            Ver Juegos
          </a>
          <img
            className="catalogo_imagen_fondo_control"
            src="../public/images/pngwing.com.png"
            alt="control"
          />
        </div>
        <div>
          <p className="catalogo_texto">
            Nadie tiene más contenido para tu consola. Consigue los últimos
            lanzamientos, taquillazos en exclusiva, pases de temporada,
            contenido complementario, juegos independientes y mucho más... a
            precios excelentes.
          </p>
        </div>
      </section>
    </>
  );
};

export default HomeSection;
