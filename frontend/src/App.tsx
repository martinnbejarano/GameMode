import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NextUIProvider>
        <AppRoutes />
        <Toaster />
      </NextUIProvider>
    </BrowserRouter>
  );
}

export default App;
