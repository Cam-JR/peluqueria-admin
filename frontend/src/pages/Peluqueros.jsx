import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";

function Peluqueros() {
  const [peluqueros, setPeluqueros] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    especialidad_id: "",
  });
  const [editingId, setEditingId] = useState(null);

  // ==============================
  // Fetch data
  // ==============================
  const fetchPeluqueros = () => {
    axios
      .get("http://localhost:5000/api/peluqueros")
      .then((res) => setPeluqueros(res.data))
      .catch((err) => console.error(err));
  };

  const fetchEspecialidades = () => {
    axios
      .get("http://localhost:5000/api/especialidades")
      .then((res) => setEspecialidades(res.data))
      .catch((err) => console.error(err));
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      axios
        .put(`http://localhost:5000/api/peluqueros/${editingId}`, form)
        .then(() => {
          fetchPeluqueros();
          setForm({ nombre: "", apellido: "", telefono: "", especialidad_id: "" });
          setEditingId(null);
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .post("http://localhost:5000/api/peluqueros", form)
        .then(() => {
          fetchPeluqueros();
          setForm({ nombre: "", apellido: "", telefono: "", especialidad_id: "" });
        })
        .catch((err) => console.error(err));
    }
  };

  const handleEdit = (peluquero) => {
    setForm({
      nombre: peluquero.nombre,
      apellido: peluquero.apellido,
      telefono: peluquero.telefono,
      especialidad_id: "", // no cargamos múltiples especialidades por ahora
    });
    setEditingId(peluquero.peluquero_id);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/peluqueros/${id}`)
      .then(() => fetchPeluqueros())
      .catch((err) => console.error(err));
  };

  // ==============================
  // Table config
  // ==============================
  const columns = [
    { header: "ID", accessor: "peluquero_id" },
    { header: "Nombre", accessor: "nombre" },
    { header: "Apellido", accessor: "apellido" },
    { header: "Teléfono", accessor: "telefono" },
    { header: "Especialidades", accessor: "especialidad" },
    { header: "Acciones", accessor: "acciones" },
  ];

  const dataWithActions = peluqueros.map((p) => ({
    ...p,
    acciones: (
      <>
        <button onClick={() => handleEdit(p)}>✏️</button>
        <button onClick={() => handleDelete(p.peluquero_id)}>🗑️</button>
      </>
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
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <input
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
          placeholder="Apellido"
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
          <option value="">Seleccione especialidad</option>
          {especialidades.map((e) => (
            <option key={e.especialidad_id} value={e.especialidad_id}>
              {e.nombre}
            </option>
          ))}
        </select>
        <button type="submit">
          {editingId ? "Actualizar" : "Agregar"}
        </button>
      </form>

      <Table columns={columns} data={dataWithActions} />
    </div>
  );
}

export default Peluqueros;
