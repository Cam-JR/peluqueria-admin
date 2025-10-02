import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';


const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData debe ser usado dentro de un DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [peluqueros, setPeluqueros] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [citas, setCitas] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener todos los datos
  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Realizar todas las llamadas en paralelo
      const [peluquerosRes, serviciosRes, citasRes, especialidadesRes] = await Promise.all([
        axios.get('/api/peluqueros'),        // Ajusta estas rutas según tu backend
        axios.get('/api/servicios'),
        axios.get('/api/citas'),
        axios.get('/api/especialidades')
      ]);

      // Actualizar el estado con los datos reales
      setPeluqueros(peluquerosRes.data);
      setServicios(serviciosRes.data);
      setCitas(citasRes.data);
      setEspecialidades(especialidadesRes.data);

    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  // Función para recargar datos específicos
  const refreshData = async (type = 'all') => {
    try {
      if (type === 'peluqueros' || type === 'all') {
        const res = await axios.get('/api/peluqueros');
        setPeluqueros(res.data);
      }
      if (type === 'servicios' || type === 'all') {
        const res = await axios.get('/api/servicios');
        setServicios(res.data);
      }
      if (type === 'citas' || type === 'all') {
        const res = await axios.get('/api/citas');
        setCitas(res.data);
      }
      if (type === 'especialidades' || type === 'all') {
        const res = await axios.get('/api/especialidades');
        setEspecialidades(res.data);
      }
    } catch (err) {
      console.error('Error refreshing data:', err);
      setError('Error al actualizar los datos');
    }
  };

  // Cargar datos al inicializar
  useEffect(() => {
    fetchAllData();
  }, []);

  const value = {
    // Datos
    peluqueros,
    servicios,
    citas,
    especialidades,
    
    // Estados
    loading,
    error,
    
    // Funciones
    refreshData,
    fetchAllData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};