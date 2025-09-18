import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCut,
  FaUserTie,
  FaCalendarAlt,
  FaStar,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import "./Sidebar.css";
import logo from "../assets/logo.svg";

function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botón hamburguesa solo en pantallas pequeñas */}
      <div className="hamburger" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "active" : ""}`}>
        {/* Logo y título arriba */}
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="sidebar-logo" />
          <div>Panel Peluquería</div>
        </div>

        {/* Menú */}
        <ul>
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              <FaTachometerAlt />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/servicios" onClick={() => setIsOpen(false)}>
              <FaCut />
              Servicios
            </Link>
          </li>
          <li>
            <Link to="/peluqueros" onClick={() => setIsOpen(false)}>
              <FaUserTie />
              Peluqueros
            </Link>
          </li>
          <li>
            <Link to="/citas" onClick={() => setIsOpen(false)}>
              <FaCalendarAlt />
              Citas
            </Link>
          </li>
          <li>
            <Link to="/especialidades" onClick={() => setIsOpen(false)}>
              <FaStar />
              Especialidades
            </Link>
          </li>
        </ul>

        {/* Cerrar sesión abajo */}
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt style={{ marginRight: "8px" }} />
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
