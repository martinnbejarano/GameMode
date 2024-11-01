import Sales from "../components/Charts/Sales";
import Views from "../components/Charts/Views";
import UserActions from "../components/Charts/UserActions";
import Wishlist from "../components/Charts/Wishlist";
import { FaShoppingCart, FaHeart, FaEye, FaDollarSign } from "react-icons/fa";

export const CompanyDashboard = () => {
  return (
    <div className="flex flex-col gap-8 p-6 bg-gray-50">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex gap-4">
          <select className="px-4 py-2 rounded-lg border">
            <option>Último mes</option>
            <option>Últimos 3 meses</option>
            <option>Último año</option>
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Ventas"
          value="161"
          icon={<FaShoppingCart />}
          trend="+12%"
          color="bg-blue-500"
        />
        <KPICard
          title="Visualizaciones"
          value="2,845"
          icon={<FaEye />}
          trend="+5%"
          color="bg-indigo-500"
        />
        <KPICard
          title="Wishlists"
          value="207"
          icon={<FaHeart />}
          trend="+8%"
          color="bg-red-500"
        />
        <KPICard
          title="Ganancias Totales"
          value="$12,845"
          icon={<FaDollarSign />}
          trend="+15%"
          color="bg-emerald-500"
        />
      </div>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Sales />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Views />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <UserActions />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Wishlist />
        </div>
      </main>
    </div>
  );
};

interface KPICardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  color: string;
}

const KPICard = ({ title, value, icon, trend, color }: KPICardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          <p
            className={`text-sm mt-2 ${
              trend.includes("+") ? "text-green-500" : "text-red-500"
            }`}
          >
            {trend} vs mes anterior
          </p>
        </div>
        <div className={`${color} p-3 rounded-lg text-white`}>{icon}</div>
      </div>
    </div>
  );
};
