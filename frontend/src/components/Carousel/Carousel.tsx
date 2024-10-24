import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

/*const data: string[] = [
  "https://via.placeholder.com/600x400?text=Slide+1",
  "https://via.placeholder.com/600x400?text=Slide+2",
  "https://via.placeholder.com/600x400?text=Slide+3",
];*/

interface CarouselProps<T> {
  data: T[];
  loading: boolean;
  error?: Error;
}

export const Carousel = <T,>({ data, loading, error }: CarouselProps<T>) => {
  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>UPS! Hay un error: {error.message}</div>;
  }
  return (
    <ResponsiveCarousel>
      {data.map((item, index) => (
        <div key={index}>
          <img src={item as string} alt={`Slide ${index}`} />
        </div>
      ))}
    </ResponsiveCarousel>
  );
};
