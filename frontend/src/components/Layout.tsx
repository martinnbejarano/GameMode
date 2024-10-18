import { Outlet } from "react-router-dom";
export const Layout = () => {
  return (
    <div className="bg-secondaryv1">
      <header className="h-16 bg-primaryv1 shadow-lg" />
      <main className="min-h-screen m-4 md:m-16">
        <Outlet />
      </main>
      <footer className="h-32 shadow-lg" />
    </div>
  );
};
