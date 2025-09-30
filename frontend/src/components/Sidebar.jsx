import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaCut, 
  FaUserTie,
  FaCalendarAlt,
  FaStar,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css"; // 👈 Asegúrate de importar el CSS aquí

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [ 
    { to: "/dashboard", icon: FaTachometerAlt, label: "Dashboard" },
    { to: "/peluqueros", icon: FaUserTie, label: "Peluqueros" }, 
    { to: "/servicios", icon: FaCut, label: "Servicios" }, 
    { to: "/citas", icon: FaCalendarAlt, label: "Citas" },
    { to: "/especialidades", icon: FaStar, label: "Especialidades" },
  ];

  return (
    <>
      {/* Botón de toggle ARRIBA del todo */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
       
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <FaCut className="header-icon" />
          <span className="title">Panel 
            <br />Peluquería</span>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} onClick={toggleSidebar}>
                  <item.icon /> {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn">
            <FaSignOutAlt /> 
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  );
}
