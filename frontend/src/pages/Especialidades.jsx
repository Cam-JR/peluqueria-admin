import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";

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
  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => fetchEspecialidades());
  };

  // Columnas para la tabla genérica
  const columns = [
    { header: "ID", accessor: "especialidad_id" },
    { header: "Nombre", accessor: "nombre" },
    { header: "Acciones", accessor: "acciones" },
  ];

  // Preparar data incluyendo botones de acciones
  const dataWithActions = especialidades.map((esp) => ({
    ...esp,
    acciones: (
      <>
        <button onClick={() => handleEdit(esp)}>✏️</button>
        <button onClick={() => handleDelete(esp.especialidad_id)}>🗑️</button>
      </>
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
