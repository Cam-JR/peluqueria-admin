import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; // 👈 Importar el provider
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Servicios from "./pages/Servicios";
import Peluqueros from "./pages/Peluqueros";
import Citas from "./pages/Citas";
import Especialidades from "./pages/Especialidades";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute"; // 👈 Importar la ruta protegida
import "./styles/App.css";

// Componente Wrapper para las rutas del panel con Sidebar (Layout Privado)
const PrivateLayout = () => (
  <div className="main-content">
    <Sidebar />
    <div className="page-content">
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="servicios" element={<Servicios />} />
        <Route path="peluqueros" element={<Peluqueros />} />
        <Route path="citas" element={<Citas />} />
        <Route path="especialidades" element={<Especialidades />} />
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider> {/* 👈 Envolver toda la app con el AuthProvider */}
      <Routes>
        {/* RUTA PÚBLICA: Login */}
        <Route path="/login" element={<Login />} />
        
        {/* RUTAS PROTEGIDAS: Envolver con ProtectedRoute */}
        <Route 
          path="/*" 
          element={
            <ProtectedRoute> {/* 👈 Proteger todas las rutas */}
              <div className="app-container">
                <PrivateLayout />
              </div>
            </ProtectedRoute>
          } 
        />

        {/* Redirigir la ruta raíz a login o dashboard según autenticación */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;