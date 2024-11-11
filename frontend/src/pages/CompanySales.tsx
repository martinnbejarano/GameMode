import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useFetch } from "../Hooks/useFetch";

interface Sale {
  _id: string;
  user: string;
  game: {
    _id: string;
    name: string;
    price: number;
  };
  price: number;
  purchaseDate: string;
}

interface SalesResponse {
  success: boolean;
  data: Sale[];
  count: number;
  totalRevenue: number;
}

export const CompanySales = () => {
  const { data, loading, error } = useFetch<SalesResponse>("/company/sales");
  const [sales, setSales] = useState<Sale[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  console.log(data);

  useEffect(() => {
    if (data) {
      setSales(data.data);
      setTotalRevenue(data.totalRevenue);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader />
      </div>
    );
  }

  if (error) {
    toast.error("Error al cargar las ventas");
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error al cargar las ventas
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Historial de Ventas</h2>
        <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg">
          <span className="font-semibold">Ingresos Totales:</span> $
          {totalRevenue.toLocaleString()}
        </div>
      </div>

      <Table
        aria-label="Tabla de ventas"
        classNames={{
          wrapper: "shadow-md rounded-xl overflow-hidden bg-white",
          th: "bg-gray-100 text-gray-800 font-semibold",
          td: "py-4",
        }}
      >
        <TableHeader>
          <TableColumn>JUEGO</TableColumn>
          <TableColumn>FECHA</TableColumn>
          <TableColumn>PRECIO DE VENTA</TableColumn>
          <TableColumn>ID DE TRANSACCIÓN</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={loading ? "Cargando..." : "No hay ventas disponibles"}
          isLoading={loading}
        >
          {sales.map((sale) => (
            <TableRow key={sale._id} className="hover:bg-gray-50">
              <TableCell className="font-medium">
                {sale.game?.name || "Juego no disponible"}
              </TableCell>
              <TableCell>
                {new Date(sale.purchaseDate).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell className="font-medium">
                ${sale.price.toFixed(2)}
              </TableCell>
              <TableCell className="text-gray-500">
                <span className="font-mono">{sale._id}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
