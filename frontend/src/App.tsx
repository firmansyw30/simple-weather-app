import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/city/Jakarta" replace />} />
        <Route path="/city/:city" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
