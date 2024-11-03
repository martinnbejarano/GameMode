import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Chip,
} from "@nextui-org/react";
import { axi } from "../utils/axiosInstance";
import { Game } from "../interfaces/Game";
import { toast } from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaShoppingCart,
  FaDollarSign,
  FaHeart,
  FaStar,
} from "react-icons/fa";
import { ClipLoader } from "react-spinners";

export const CompanyGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingGameId, setDeletingGameId] = useState<string | null>(null);

  const fetchGames = async () => {
    try {
      const response = await axi.get("/company/games");
      setGames(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los juegos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleDelete = async (gameId: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este juego?")) {
      setDeletingGameId(gameId);
      try {
        await axi.delete(`/company/games/${gameId}`);
        toast.success("Juego eliminado exitosamente");
        fetchGames();
      } catch (error) {
        console.error(error);
        toast.error("Error al eliminar el juego");
      } finally {
        setDeletingGameId(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Mis Juegos</h2>
        <Link to="/company/add-game">
          <Button className="bg-primaryv2 text-white font-semibold">
            Publicar nuevo juego
          </Button>
        </Link>
      </div>

      <Table
        aria-label="Tabla de juegos"
        classNames={{
          wrapper: "shadow-md rounded-xl overflow-hidden bg-white",
          th: "bg-gray-100 text-gray-800 font-semibold",
          td: "py-4",
        }}
      >
        <TableHeader>
          <TableColumn>NOMBRE</TableColumn>
          <TableColumn>CATEGORÍA</TableColumn>
          <TableColumn>PRECIO</TableColumn>
          <TableColumn>PLATAFORMAS</TableColumn>
          <TableColumn>MÉTRICAS</TableColumn>
          <TableColumn>ACCIONES</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={loading ? "Cargando..." : "No hay juegos disponibles"}
          isLoading={loading}
        >
          {games.map((game) => (
            <TableRow key={game._id} className="hover:bg-gray-50">
              <TableCell className="font-medium">{game.name}</TableCell>
              <TableCell>
                <Chip
                  size="sm"
                  className="bg-blue-100 text-blue-800 border-none"
                >
                  {game.category}
                </Chip>
              </TableCell>
              <TableCell className="font-medium">
                ${game.price.toFixed(2)}
              </TableCell>
              <TableCell>
                <div className="flex gap-1 flex-wrap">
                  {game.platforms.map((platform) => (
                    <Chip
                      key={platform}
                      size="sm"
                      className="bg-gray-100 text-gray-800 border-none"
                    >
                      {platform}
                    </Chip>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <FaEye className="text-gray-500" />
                    <span className="text-sm">{game.views || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaShoppingCart className="text-gray-500" />
                    <span className="text-sm">{game.totalSales || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaDollarSign className="text-gray-500" />
                    <span className="text-sm">
                      ${((game.totalSales || 0) * game.price).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaHeart className="text-gray-500" />
                    <span className="text-sm">{game.wishlistCount || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-gray-500" />
                    <span className="text-sm">
                      {game.averageRating?.toFixed(1) || "N/A"}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Button
                  isIconOnly
                  variant="light"
                  color="danger"
                  aria-label="Eliminar"
                  onClick={() => game._id && handleDelete(game._id)}
                  isLoading={deletingGameId === game._id}
                >
                  <MdDelete className="text-xl" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
