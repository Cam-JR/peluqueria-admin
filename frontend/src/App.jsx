import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Servicios from "./pages/Servicios";
import Peluqueros from "./pages/Peluqueros";
import Citas from "./pages/Citas";
import Especialidades from "./pages/Especialidades";
import Login from "./pages/Login";
import "./styles/App.css";

// Componente Wrapper para las rutas del panel con Sidebar (Layout Privado)
const PrivateLayout = () => (
    <div className="main-content">
        <Sidebar />
        <div className="page-content">
            <Routes>
                {/* RUTAS CON EL SIDEBAR */}
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="servicios" element={<Servicios />} />
                <Route path="peluqueros" element={<Peluqueros />} />
                <Route path="citas" element={<Citas />} />
                <Route path="especialidades" element={<Especialidades />} />
                
                {/* Redirigir la ruta '/' dentro del layout privado a /dashboard */}
                <Route path="/" element={<Navigate to="dashboard" replace />} />
                
                {/* Redirige rutas no encontradas a dashboard (o a una página 404) */}
                <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
        </div>
    </div>
);


function App() {
  return (
    // ¡CORRECTO! Routes es el contenedor raíz para manejar las vistas
    <Routes>
        
        {/* RUTA DEL LOGIN: Login renderizado directamente, fuera de cualquier div.app-container */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* RUTAS PRIVADAS: Solo aquí se introduce el div.app-container que define el layout del sidebar */}
        <Route 
            path="*" 
            element={
                <div className="app-container">
                    <PrivateLayout />
                </div>
            } 
        />

    </Routes>
  );
}

export default App;