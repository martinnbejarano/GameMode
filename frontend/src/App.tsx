import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { NextUIProvider } from "@nextui-org/react";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NextUIProvider>
          <AppRoutes />
        </NextUIProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
