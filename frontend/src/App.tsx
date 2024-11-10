import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { NextUIProvider } from "@nextui-org/react";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NextUIProvider>
        <AppRoutes />
      </NextUIProvider>
    </BrowserRouter>
  );
}

export default App;
