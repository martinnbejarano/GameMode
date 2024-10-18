import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SpecificGame } from "./pages/SpecificGame";
import { Layout } from "./components/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SpecificGame />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
