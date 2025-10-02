import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; 
import "../components/Peluqueros.css";

import Table from "../components/Table";

function Peluqueros() {
  const [peluqueros, setPeluqueros] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [form, setForm] = useState({
    nombre_completo: "",
    telefono: "",
    especialidad_id: "",
  });
  const [editingId, setEditingId] = useState(null);

  // ==============================
  // Fetch data
  // ==============================
  const fetchPeluqueros = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/peluqueros");
      setPeluqueros(res.data);
    } catch (err) {
      console.error("❌ Error al obtener peluqueros:", err);
    }
  };

  const fetchEspecialidades = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/especialidades");
      setEspecialidades(res.data);
    } catch (err) {
      console.error("❌ Error al obtener especialidades:", err);
    }
  };

  useEffect(() => {
    fetchPeluqueros();
    fetchEspecialidades();
  }, []);

  // ==============================
  // Handlers
  // ==============================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ nombre_completo: "", telefono: "", especialidad_id: "" });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      especialidad_id:
        form.especialidad_id === "" ? null : Number(form.especialidad_id),
    };

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/peluqueros/${editingId}`,
          payload
        );
        alert("✅ Peluquero actualizado");
      } else {
        await axios.post("http://localhost:5000/api/peluqueros", payload);
        alert("✅ Peluquero agregado");
      }
      fetchPeluqueros();
      resetForm();
    } catch (err) {
      console.error("❌ Error al guardar:", err);
      alert("❌ Error al guardar. Revisa la consola.");
    }
  };

  const handleEdit = (peluquero) => {
    setForm({
      nombre_completo: peluquero.nombre_completo || "",
      telefono: peluquero.telefono || "",
      especialidad_id: peluquero.especialidad_id ?? "",
    });
    setEditingId(peluquero.peluquero_id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás segura de eliminar este peluquero?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/peluqueros/${id}`);
      fetchPeluqueros();
      alert("🗑️ Peluquero eliminado");
    } catch (err) {
      console.error("❌ Error al eliminar:", err);
      alert("❌ Error al eliminar. Revisa la consola.");
    }
  };

  // ==============================
  // Table config
  // ==============================
  const columns = [
    { header: "ID", accessor: "peluquero_id" },
    { header: "Nombre Completo", accessor: "nombre_completo" },
    { header: "Teléfono", accessor: "telefono" },
    { header: "Especialidad", accessor: "especialidad_nombre" },
    { header: "Acciones", accessor: "acciones" },
  ];

  const dataWithActions = peluqueros.map((p) => ({
  ...p,
  acciones: (
    // Reutilizamos el contenedor que ya tiene la alineación y espaciado definidos
    <div className="action-buttons-container">
      {/* Botón de Editar */}
      <button 
        className="btn-action btn-edit" 
        onClick={() => handleEdit(p)} 
        title="Editar Peluquero"
      >
        <FaEdit />
      </button>
      
      {/* Botón de Eliminar */}
      <button 
        className="btn-action btn-delete" 
        onClick={() => handleDelete(p.peluquero_id)} 
        title="Eliminar Peluquero"
      >
        <FaTrashAlt />
      </button>
    </div>
  ),
}));

  // ==============================
  // Render
  // ==============================
  return (
    <div>
      <h2>Peluqueros</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          name="nombre_completo"
          value={form.nombre_completo}
          onChange={handleChange}
          placeholder="Nombre completo"
          required
        />
        <input
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
        />
        <select
          name="especialidad_id"
          value={form.especialidad_id}
          onChange={handleChange}
          required
        >
          <option value="">-- Seleccione especialidad --</option>
          {especialidades.map((e) => (
            <option key={e.especialidad_id} value={e.especialidad_id}>
              {e.nombre}
            </option>
          ))}
        </select>
        <button type="submit">
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

export default Peluqueros;
