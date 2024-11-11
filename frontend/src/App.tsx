import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { Header } from "./components/index";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
