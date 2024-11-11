import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "./GameGallery.css";

interface Props {
  images: string[];
}

export const GameGallery = ({ images }: Props) => {
  console.log(images);

  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      className="w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} className="w-full h-full">
          <img
            src={`/public/images/${image}`}
            alt={`Imagen ${index + 1}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
