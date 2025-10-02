import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; 
import "../styles/App.css";



function Especialidades() {
  const [especialidades, setEspecialidades] = useState([]);
  const [form, setForm] = useState({ nombre: "" });
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:5000/api/especialidades"; // tu backend

  // Obtener especialidades
  const fetchEspecialidades = () => {
    axios
      .get(API_URL)
      .then((res) => setEspecialidades(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  // Cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ nombre: "",  especialidad_id: "" });
    setEditingId(null);
  };

  // Crear o actualizar especialidad
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) return;

    if (editingId) {
      axios
        .put(`${API_URL}/${editingId}`, form)
        .then(() => {
          fetchEspecialidades();
          setForm({ nombre: "" });
          setEditingId(null);
        });
    } else {
      axios.post(API_URL, form).then(() => {
        fetchEspecialidades();
        setForm({ nombre: "" });
      });
    }
  };

  // Editar especialidad
  const handleEdit = (esp) => {
    setForm({ nombre: esp.nombre });
    setEditingId(esp.especialidad_id); // ✅ usar especialidad_id
  };

  

  // Eliminar especialidad
  // Eliminar especialidad (reemplaza tu handleDelete actual)
  const handleDelete = (id) => {
  if (!window.confirm("¿Estás segura de eliminar esta especialidad?")) return;

  axios.delete(`${API_URL}/${id}`)
    .then(() => {
      fetchEspecialidades();
      alert("🗑️ Especialidad eliminada");
    })
    .catch((err) => {
      console.error("❌ Error al eliminar especialidad:", err);
      alert("❌ Error al eliminar la especialidad. Revisa la consola.");
    });
  };


  // Columnas para la tabla genérica
  const columns = [
    { header: "ID", accessor: "especialidad_id" },
    { header: "Nombre", accessor: "nombre" },
    { header: "Acciones", accessor: "acciones" },
  ];

  /// Preparar data incluyendo botones de acciones
const dataWithActions = especialidades.map((esp) => ({
  ...esp,
  acciones: (
    <div className="action-buttons-container">
      {/* Botón de Editar */}
      <button 
        className="btn-action btn-edit" 
        onClick={() => handleEdit(esp)} 
        title="Editar Especialidad"
      >
        <FaEdit />
      </button>
      
      {/* Botón de Eliminar */}
      <button 
        className="btn-action btn-delete" 
        onClick={() => handleDelete(esp.especialidad_id)} 
        title="Eliminar Especialidad"
      >
        <FaTrashAlt />
      </button>
    </div>
  ),
}));

  return (
    <div>
      <h2>Especialidades</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre de la especialidad"
          required
        />
        <button
          type="submit"
        >
          {editingId ? "Actualizar" : "Agregar"}
        </button>
        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancelar
          </button>
        )}
      </form>

      <Table columns={columns} data={dataWithActions} />
    </div>
  );
}

export default Especialidades;
