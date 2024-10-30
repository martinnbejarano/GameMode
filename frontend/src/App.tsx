import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <AppRoutes />
    </BrowserRouter>
  );
}
