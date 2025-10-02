import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; 
import "../components/Servicios.css";

import Table from "../components/Table";

function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [form, setForm] = useState({ nombre: "", precio: "", duracion: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchServicios = () => {
    axios.get("http://localhost:5000/api/servicios")
      .then((res) => setServicios(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => { fetchServicios(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      axios.put(`http://localhost:5000/api/servicios/${editingId}`, form)
        .then(() => {
          fetchServicios();
          setForm({ nombre: "", precio: "", duracion: "" });
          setEditingId(null);
        });
    } else {
      axios.post("http://localhost:5000/api/servicios", form)
        .then(() => {
          fetchServicios();
          setForm({ nombre: "", precio: "", duracion: "" });
        });
    }
  };

  const handleEdit = (servicio) => {
    setForm({
      nombre: servicio.nombre,
      precio: servicio.precio,
      duracion: servicio.duracion
    });
    setEditingId(servicio.servicio_id); // ✅ usar servicio_id
  };

const handleDeleteServicio = (id) => {
  if (!window.confirm("¿Estás segura de eliminar este servicio?")) return;

  axios
    .delete(`http://localhost:5000/api/servicios/${id}`)
    .then(() => {
      fetchServicios(); // refrescar la lista
      alert("🗑️ Servicio eliminado");
    })
    .catch((err) => {
      console.error("❌ Error al eliminar servicio:", err);
      alert("❌ Error al eliminar el servicio. Revisa la consola.");
    });
  };


  

  const columns = [
    { header: "ID", accessor: "servicio_id" }, // ✅ usar servicio_id
    { header: "Nombre", accessor: "nombre" },
    { header: "Precio (S/.)", accessor: "precio" },
    { header: "Duración (min)", accessor: "duracion" },
    { header: "Acciones", accessor: "acciones" },
  ];

  const dataWithActions = servicios.map((s) => ({
    ...s,
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
      <h2>Servicios</h2>
      <form onSubmit={handleSubmit} className="form">
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
        <input name="precio" type="number" value={form.precio} onChange={handleChange} placeholder="Precio" required />
        <input name="duracion" type="number" value={form.duracion} onChange={handleChange} placeholder="Duración (min)" required />
        <button type="submit">{editingId ? "Actualizar" : "Agregar"}</button>
      </form>
      <Table columns={columns} data={dataWithActions} />
    </div>
  );
}

export default Servicios;
