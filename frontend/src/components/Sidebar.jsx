import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/servicios">Servicios</Link></li>
        <li><Link to="/peluqueros">Peluqueros</Link></li>
        <li><Link to="/citas">Citas</Link></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
