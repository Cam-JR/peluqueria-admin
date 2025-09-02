import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Servicios from "./pages/Servicios";
import Peluqueros from "./pages/Peluqueros";
import Citas from "./pages/Citas";
import "./styles/App.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/peluqueros" element={<Peluqueros />} />
            <Route path="/citas" element={<Citas />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
