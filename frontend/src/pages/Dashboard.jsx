import { FaUserTie, FaCalendarAlt, FaStar, FaCut } from "react-icons/fa";
import "../styles/Dashboard.css";


export default function Dashboard() {
  const stats = [
    { title: "Peluqueros", value: 8, icon: <FaUserTie />, color: "#6c63ff" },
    { title: "Servicios", value: 22, icon: <FaCut />, color: "#28c76f" },
    { title: "Citas", value: 25, icon: <FaCalendarAlt />, color: "#ff6584" },
    { title: "Especialidades", value: 7, icon: <FaStar />, color: "#f9a826" },
   ];

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard</h2>
      <p>Aquí podrás gestionar servicios, peluqueros, servicios y citas.</p>
      <div className="dashboard-grid">
        {stats.map((stat, index) => (
          <div className="card" key={index} style={{ borderLeft: `5px solid ${stat.color}` }}>
            <div className="card-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="card-info">
              <h2>{stat.value}</h2>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
