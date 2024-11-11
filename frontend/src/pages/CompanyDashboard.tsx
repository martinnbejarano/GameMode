import { useFetch } from "../Hooks/useFetch";
import Sales from "../components/Charts/Sales";
import Views from "../components/Charts/Views";
import UserActions from "../components/Charts/UserActions";
import Wishlist from "../components/Charts/Wishlist";
import { FaShoppingCart, FaHeart, FaEye, FaDollarSign } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
interface GameStatsResponse {
  success: boolean;
  data: {
    games: {
      _id: string;
      name: string;
      revenue: number;
      totalSales: number;
      views: number;
      wishlistCount: number;
      conversionRate: string;
    }[];
    totals: {
      totalRevenue: number;
      totalSales: number;
      totalViews: number;
      totalWishlists: number;
    };
  };
}

export const CompanyDashboard = () => {
  const { data, loading, error } = useFetch<GameStatsResponse>(
    "/company/games-stats"
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error al cargar las estadísticas: {error.message}
      </div>
    );
  }

  if (!data?.data) {
    return null;
  }

  const { totals, games } = data.data;

  return (
    <div className="flex flex-col gap-8 p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Ventas"
          value={totals.totalSales.toString()}
          icon={<FaShoppingCart />}
          color="bg-blue-500"
        />
        <KPICard
          title="Visualizaciones"
          value={totals.totalViews.toLocaleString()}
          icon={<FaEye />}
          color="bg-indigo-500"
        />
        <KPICard
          title="Wishlists"
          value={totals.totalWishlists.toLocaleString()}
          icon={<FaHeart />}
          color="bg-red-500"
        />
        <KPICard
          title="Ganancias Totales"
          value={`$${totals.totalRevenue.toLocaleString()}`}
          icon={<FaDollarSign />}
          color="bg-emerald-500"
        />
      </div>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Sales data={games} />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Views data={games} />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <UserActions data={games} />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Wishlist data={games} />
        </div>
      </main>
    </div>
  );
};

interface KPICardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const KPICard = ({ title, value, icon, color }: KPICardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
        </div>
        <div className={`${color} p-3 rounded-lg text-white`}>{icon}</div>
      </div>
    </div>
  );
};
