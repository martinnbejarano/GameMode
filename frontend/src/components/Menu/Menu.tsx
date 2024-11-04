import { useFetch } from "../../Hooks";
import { Carousel } from "../index";

const url = "/games";

interface MenuProps {
  // props específicas del menú si las hay
}

interface Game {
  _id: string;
  name: string;
  coverPicture: string;
  gallery: string[];
  price: number;
}

const Menu: React.FC<MenuProps> = () => {
  const { data, loading, error } = useFetch<Game[]>(url);

  /* if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;
*/
  return (
    <>
      {data && (
        <Carousel
          data={data.map((game) => game.coverPicture)}
          loading={loading}
          error={error || undefined}
        />
      )}
    </>
  );
};

export default Menu;
