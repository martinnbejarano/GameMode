import { useFetch } from "../../Hooks";

const url = "https://api.example.com/data";
// User ejemplo
// const userUrl = "https://api.example.com/user";

interface Data {
  name: string;
  lastName: string;
  age: number;
}

const Menu: React.FC = () => {
  const { data, loading, error } = useFetch<Data>(url);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>UPS! Hay un error: {error.message}</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default Menu;
