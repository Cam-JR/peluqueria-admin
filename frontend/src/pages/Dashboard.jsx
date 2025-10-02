import { FaUserTie, FaCalendarAlt, FaStar, FaCut, FaSync } from "react-icons/fa";
import { useData } from "../context/DataContext";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const { 
    peluqueros, 
    servicios, 
    citas, 
    especialidades, 
    loading, 
    error,
    refreshData 
  } = useData();

  const stats = [
    { 
      title: "Peluqueros", 
      value: peluqueros.length, 
      icon: <FaUserTie />, 
      color: "#6c63ff" 
    },
    { 
      title: "Servicios", 
      value: servicios.length, 
      icon: <FaCut />, 
      color: "#28c76f" 
    },
    { 
      title: "Citas", 
      value: citas.length, 
      icon: <FaCalendarAlt />, 
      color: "#ff6584" 
    },
    { 
      title: "Especialidades", 
      value: especialidades.length, 
      icon: <FaStar />, 
      color: "#f9a826" 
    },
  ];

  const handleRefresh = () => {
    refreshData('all');
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <p>Cargando datos del dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="dashboard-error">
          <p>{error}</p>
          <button onClick={fetchAllData} className="retry-btn">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2 className="dashboard-title">Dashboard</h2>
          <p>Resumen general de tu peluquería</p>
        </div>
        <button 
          onClick={handleRefresh} 
          className="refresh-btn"
          title="Actualizar datos"
        >
          <FaSync />
        </button>
      </div>

      <div className="dashboard-grid">
        {stats.map((stat, index) => (
          <div 
            className="stat-card" 
            key={index} 
            style={{ borderLeft: `5px solid ${stat.color}` }}
          >
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

      {/* Información adicional del dashboard */}
      <div className="dashboard-info">
        <h3>Resumen General</h3>
        <div className="info-grid">
          <div className="info-item">
            <span>Total de peluqueros activos:</span>
            <strong>{peluqueros.length}</strong>
          </div>
          <div className="info-item">
            <span>Servicios disponibles:</span>
            <strong>{servicios.length}</strong>
          </div>
          <div className="info-item">
            <span>Citas programadas:</span>
            <strong>{citas.length}</strong>
          </div>
          <div className="info-item">
            <span>Especialidades únicas:</span>
            <strong>{especialidades.length}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}