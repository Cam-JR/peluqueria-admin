import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Servicios from "./pages/Servicios";
import Peluqueros from "./pages/Peluqueros";
import Citas from "./pages/Citas";
import Especialidades from "./pages/Especialidades";
import "./styles/App.css";

function App() {
  return (
    <div className="app-container">
      <div className="main-content">
        <Sidebar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/peluqueros" element={<Peluqueros />} />
            <Route path="/citas" element={<Citas />} />
            <Route path="/especialidades" element={<Especialidades />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
