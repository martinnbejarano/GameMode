const HomeSection: React.FC = () => {
  return (
    <section className="catalogo">
      <div className="catalogo_subtitulo">
        <h2 className="catalogo_subtitulo-h2"> No pares de jugar </h2>
      </div>
      <h2>No pares de jugar</h2>
      <div>
        <h3 className="catalogo_imagen_fondo_texto sombra-txt">
          El mayor catálogo de juegos y entretenimiento
        </h3>
        <a
          className="btn btn-success mi-btn-catalogo  btn-catalogo"
          href="juegos.html"
        >
          Ver Juegos
        </a>
        <img
          className="catalogo_imagen_fondo_control wow animate__ animate__fadeInUpBig  animated"
          src="imagenes/pngwing.com.png"
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
  );
};

export default HomeSection;
