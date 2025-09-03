import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/servicios">Servicios</Link></li>
        <li><Link to="/peluqueros">Peluqueros</Link></li>
        <li><Link to="/citas">Citas</Link></li>
        <li><Link to="/especialidades">Especialidades</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
