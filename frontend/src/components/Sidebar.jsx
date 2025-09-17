import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCut,
  FaUserTie,
  FaCalendarAlt,
  FaStar,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css";
import logo from "../assets/logo.svg";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      {/* Logo y título arriba */}
      <div className="sidebar-header">
        <img src={logo} alt="Logo" className="sidebar-logo" />
        <div>Panel Peluquería</div>
      </div>

      {/* Menú */}
      <ul>
        <li>
          <Link to="/">
            <FaTachometerAlt />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/servicios">
            <FaCut />
            Servicios
          </Link>
        </li>
        <li>
          <Link to="/peluqueros">
            <FaUserTie />
            Peluqueros
          </Link>
        </li>
        <li>
          <Link to="/citas">
            <FaCalendarAlt />
            Citas
          </Link>
        </li>
        <li>
          <Link to="/especialidades">
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
  );
}

export default Sidebar;
