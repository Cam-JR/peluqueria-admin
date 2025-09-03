import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";

function Citas() {
  const [citas, setCitas] = useState([]);
  const [form, setForm] = useState({
    cliente_nombre: "",
    cliente_telefono: "",
    servicio_id: "",
    peluquero_id: "",
    fecha: "",
    hora: "",
    estado: "pendiente",
  });
  const [editingId, setEditingId] = useState(null);
  const [servicios, setServicios] = useState([]);
  const [peluqueros, setPeluqueros] = useState([]);

  const fetchCitas = () => {
    axios.get("http://localhost:5000/api/citas")
      .then((res) => setCitas(res.data))
      .catch((err) => console.error(err));
  };

  const fetchServicios = () => {
    axios.get("http://localhost:5000/api/servicios").then((res) => setServicios(res.data));
  };

  const fetchPeluqueros = () => {
    axios.get("http://localhost:5000/api/peluqueros").then((res) => setPeluqueros(res.data));
  };

  useEffect(() => {
    fetchCitas();
    fetchServicios();
    fetchPeluqueros();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      axios.put(`http://localhost:5000/api/citas/${editingId}`, form)
        .then(() => {
          fetchCitas();
          setForm({ cliente_nombre: "", cliente_telefono: "", servicio_id: "", peluquero_id: "", fecha: "", hora: "", estado: "pendiente" });
          setEditingId(null);
        });
    } else {
      axios.post("http://localhost:5000/api/citas", form)
        .then(() => {
          fetchCitas();
          setForm({ cliente_nombre: "", cliente_telefono: "", servicio_id: "", peluquero_id: "", fecha: "", hora: "", estado: "pendiente" });
        });
    }
  };

  const handleEdit = (cita) => {
    setForm(cita);
    setEditingId(cita.id);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/citas/${id}`)
      .then(() => fetchCitas());
  };

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Cliente", accessor: "cliente_nombre" },
    { header: "Teléfono", accessor: "cliente_telefono" },
    { header: "Servicio", accessor: "servicio" },
    { header: "Peluquero", accessor: "peluquero" },
    { header: "Fecha", accessor: "fecha" },
    { header: "Hora", accessor: "hora" },
    { header: "Estado", accessor: "estado" },
    { header: "Acciones", accessor: "acciones" },
  ];

  const dataWithActions = citas.map((c) => ({
    ...c,
    acciones: (
      <>
        <button onClick={() => handleEdit(c)}>✏️</button>
        <button onClick={() => handleDelete(c.id)}>🗑️</button>
      </>
    ),
  }));

  return (
    <div>
      <h2>Citas</h2>
      <form onSubmit={handleSubmit} className="form">
        <input name="cliente_nombre" value={form.cliente_nombre} onChange={handleChange} placeholder="Cliente" required />
        <input name="cliente_telefono" value={form.cliente_telefono} onChange={handleChange} placeholder="Teléfono" required />
        
        <select name="servicio_id" value={form.servicio_id} onChange={handleChange} required>
          <option value="">-- Selecciona Servicio --</option>
          {servicios.map((s) => <option key={s.id} value={s.id}>{s.nombre}</option>)}
        </select>
        
        <select name="peluquero_id" value={form.peluquero_id} onChange={handleChange} required>
          <option value="">-- Selecciona Peluquero --</option>
          {peluqueros.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
        </select>
        
        <input type="date" name="fecha" value={form.fecha} onChange={handleChange} required />
        <input type="time" name="hora" value={form.hora} onChange={handleChange} required />
        
        <select name="estado" value={form.estado} onChange={handleChange}>
          <option value="pendiente">Pendiente</option>
          <option value="confirmada">Confirmada</option>
          <option value="cancelada">Cancelada</option>
        </select>
        
        <button type="submit">{editingId ? "Actualizar" : "Agregar"}</button>
      </form>
      <Table columns={columns} data={dataWithActions} />
    </div>
  );
}

export default Citas;
