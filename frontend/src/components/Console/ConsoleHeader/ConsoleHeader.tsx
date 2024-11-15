import React from "react";
import "./ConsoleHeader.css";

export const ConsoleHeader: React.FC = () => {
  return (
    <article className="consola-contenedor">
      <div className="consola-contenedor_texto">
        <h1 className="consola-contenedor_texto_h1 text-2xl font-bold">
          Elegí la consola que más va con vos
        </h1>
      </div>
      <div className="consola-contenedor_img">
        <img
          className="consola-contenedor_img_controles"
          src="https://i.blogs.es/558511/amazon-ofertas/1366_521.jpeg"
          alt="controles de las consolas"
        />
      </div>
    </article>
  );
};
