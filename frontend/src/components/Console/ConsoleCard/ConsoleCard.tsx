import React from "react";
import "./ConsoleCard.css";

interface ConsoleCardProps {
  title: string;
  description: string;
  image: string;
  reverse: boolean;
}

export const ConsoleCard: React.FC<ConsoleCardProps> = ({
  title,
  description,
  image,
  reverse,
}) => {
  return (
    <article
      className={`consola_contenedor-consolas ${reverse ? "reverse" : ""}`}
    >
      <div className="consola_contenedor-consolas_text">
        <h2 className="consola_contenedor-consolas_text-titulo text-2xl font-bold">
          {title}
        </h2>
        <p className="consola_contenedor-consolas_text-p">{description}</p>
      </div>
      <div className="consola_contenedor-consolas_imagen">
        <img
          className="consola_contenedor-consolas_imagen-marcas rounded-sm"
          src={image}
          alt={title}
        />
      </div>
    </article>
  );
};
