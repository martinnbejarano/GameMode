import { Outlet, Link, useLocation } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { GiGamepad } from "react-icons/gi";
import { IoMdCreate } from "react-icons/io";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdOutlinePointOfSale } from "react-icons/md";

export const CompanyLayout = () => {
  const location = useLocation();

  const links = [
    { to: "/company/dashboard", label: "Dashboard", icon: MdSpaceDashboard },
    { to: "/company/my-games", label: "Mis juegos", icon: GiGamepad },
    {
      to: "/company/add-game",
      label: "Publicar juego",
      icon: IoAddCircleSharp,
    },
    {
      to: "/company/edit-games",
      label: "Editar juegos",
      icon: IoMdCreate,
    },
    {
      to: "/company/sales",
      label: "Ventas",
      icon: MdOutlinePointOfSale,
    },
  ];

  return (
    <div className="flex min-h-screen z-10">
      <aside className="fixed flex flex-col items-center gap-4 pt-24 min-h-screen h-full w-16 md:w-56 bg-primaryv1 text-white p-2">
        {links.map(({ to, label, icon: Icon }, index) => (
          <Link
            key={index}
            to={to}
            className={`flex gap-2 items-center p-2 w-full hover:bg-white hover:cursor-pointer rounded-md transition-colors group relative
              ${location.pathname === to ? "bg-white" : ""}`}
          >
            <Icon
              className={`text-2xl transition-colors
              ${
                location.pathname === to
                  ? "text-primaryv1"
                  : "group-hover:text-primaryv1"
              }`}
            />
            <span
              className={`text-xl font-semibold transition-colors hidden md:inline
              ${
                location.pathname === to
                  ? "text-primaryv1"
                  : "group-hover:text-primaryv1"
              }`}
            >
              {label}
            </span>
            {location.pathname === to && (
              <div className="absolute left-0 top-0 h-full w-1 bg-primaryv2 rounded-l-md" />
            )}
          </Link>
        ))}
      </aside>
      <main className="flex-1 p-4 pt-24 pl-20 md:pl-64">
        <Outlet />
      </main>
    </div>
  );
};
