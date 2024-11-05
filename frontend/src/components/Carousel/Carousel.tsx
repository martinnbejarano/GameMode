import React from "react";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Game } from "../../interfaces/Game";
import "./Carousel.css";

interface CarouselProps {
  games: Game[];
}

const Carousel: React.FC<CarouselProps> = ({ games }) => {
  return (
    <ResponsiveCarousel
      showThumbs={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={3000}
      showStatus={false}
    >
      {games.map((game) => (
        <div key={game._id} className="carousel-slide">
          <div className="carousel-image-container">
            {game.images && game.images[0] && (
              <img
                src={`../public/images/${game.images[0] as string}`}
                alt={game.name}
                className="carousel-image"
              />
            )}
            <div className="carousel-legend">
              <h3>{game.name}</h3>
              <p>{game.description}</p>
              <span className="price">$ {game.price}</span>
            </div>
          </div>
        </div>
      ))}
    </ResponsiveCarousel>
  );
};

export default Carousel;
