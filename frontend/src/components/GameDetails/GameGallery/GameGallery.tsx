import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "./GameGallery.css";

interface Props {
  images: string[];
}

export const GameGallery = ({ images }: Props) => {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      className="game-gallery"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={`/public/images/${image}`}
            alt={`Imagen ${index + 1}`}
            className="gallery-image"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
