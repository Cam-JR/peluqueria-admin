import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";

function Citas() {
  const [citas, setCitas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [peluqueros, setPeluqueros] = useState([]);
  const [metodosPago, setMetodosPago] = useState([]);
  const [estados, setEstados] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    cliente_id: "",
    cliente_nombre: "",
    cliente_apellido: "",
    cliente_telefono: "",
    servicio_id: "",
    peluquero_id: "",
    metodo_pago_id: "",
    estado_id: "",
    observaciones: "",
    fecha: "",
    hora: "",
  });

  // ---------- Fetch API ----------
  const fetchCitas = () => {
    axios.get("http://localhost:5000/api/citas")
      .then(res => setCitas(res.data))
      .catch(err => console.error(err));
  };

  const fetchClientes = () => {
    axios.get("http://localhost:5000/api/clientes")
      .then(res => setClientes(res.data))
      .catch(err => console.error(err));
  };

  const fetchServicios = () => {
    axios.get("http://localhost:5000/api/servicios")
      .then(res => setServicios(res.data))
      .catch(err => console.error(err));
  };

  const fetchPeluqueros = () => {
    axios.get("http://localhost:5000/api/peluqueros")
      .then(res => setPeluqueros(res.data))
      .catch(err => console.error(err));
  };

  const fetchMetodosPago = () => {
    axios.get("http://localhost:5000/api/metodos_pago")
      .then(res => setMetodosPago(res.data))
      .catch(err => console.error(err));
  };

  const fetchEstados = () => {
    axios.get("http://localhost:5000/api/estados_cita")
      .then(res => setEstados(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCitas();
    fetchClientes();
    fetchServicios();
    fetchPeluqueros();
    fetchMetodosPago();
    fetchEstados();
  }, []);

  // ---------- Handlers ----------
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cliente_id") {
      const cliente = clientes.find(c => c.cliente_id.toString() === value);
      setForm({
        ...form,
        cliente_id: value,
        cliente_nombre: cliente ? cliente.nombre : "",
        cliente_apellido: cliente ? cliente.apellido : "",
        cliente_telefono: cliente ? cliente.telefono : "",
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const crearCita = (clienteId) => {
      const payload = { ...form, cliente_id: clienteId };
      if (editingId) {
        axios.put(`http://localhost:5000/api/citas/${editingId}`, payload)
          .then(() => {
            fetchCitas();
            resetForm();
          });
      } else {
        axios.post("http://localhost:5000/api/citas", payload)
          .then(() => {
            fetchCitas();
            resetForm();
          });
      }
    };

    if (!form.cliente_id) {
      axios.post("http://localhost:5000/api/clientes", {
        nombre: form.cliente_nombre,
        apellido: form.cliente_apellido,
        telefono: form.cliente_telefono,
      }).then(res => {
        const newClienteId = res.data.insertId;
        crearCita(newClienteId);
        fetchClientes();
      }).catch(err => console.error(err));
    } else {
      crearCita(form.cliente_id);
    }
  };

  const handleEdit = (cita) => {
    setForm({
      cliente_id: cita.cliente_id || "",
      cliente_nombre: cita.cliente_nombre || "",
      cliente_apellido: cita.cliente_apellido || "",
      cliente_telefono: cita.cliente_telefono || "",
      servicio_id: cita.servicio_id || "",
      peluquero_id: cita.peluquero_id || "",
      metodo_pago_id: cita.metodo_pago_id || "",
      estado_id: cita.estado_id || "",
      observaciones: cita.observaciones || "",
      fecha: cita.fecha || "",
      hora: cita.hora || "",
    });
    setEditingId(cita.cita_id);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/citas/${id}`)
      .then(() => fetchCitas())
      .catch(err => console.error(err));
  };

  const resetForm = () => {
    setForm({
      cliente_id: "",
      cliente_nombre: "",
      cliente_apellido: "",
      cliente_telefono: "",
      servicio_id: "",
      peluquero_id: "",
      metodo_pago_id: "",
      estado_id: "",
      observaciones: "",
      fecha: "",
      hora: "",
    });
    setEditingId(null);
  };

  // ---------- Table ----------
  const columns = [
    { header: "ID", accessor: "cita_id" },
    { header: "Cliente", accessor: "cliente_nombre" },
    { header: "Apellido", accessor: "cliente_apellido" },
    { header: "Teléfono", accessor: "cliente_telefono" },
    { header: "Servicio", accessor: "servicio" },
    { header: "Peluquero", accessor: "peluquero" },
    { header: "Método de pago", accessor: "metodo_pago" },
    { header: "Estado", accessor: "estado" },
    { header: "Fecha", accessor: "fecha" },
    { header: "Hora", accessor: "hora" },
    { header: "Observaciones", accessor: "observaciones" },
    { header: "Acciones", accessor: "acciones" },
  ];

  const dataWithActions = citas.map((c) => ({
    ...c,
    fecha: new Date(c.fecha).toLocaleDateString(),
    acciones: (
      <>
        <button onClick={() => handleEdit(c)}>✏️</button>
        <button onClick={() => handleDelete(c.cita_id)}>🗑️</button>
      </>
    ),
  }));

  return (
    <div>
      <h2>Citas</h2>
      <form onSubmit={handleSubmit} className="form">
        {/* Cliente */}
        <select name="cliente_id" value={form.cliente_id} onChange={handleChange}>
          <option value="">-- Nuevo Cliente --</option>
          {clientes.map(c => (
            <option key={c.cliente_id} value={c.cliente_id}>
              {c.nombre} {c.apellido} ({c.telefono})
            </option>
          ))}
        </select>

        <input name="cliente_nombre" value={form.cliente_nombre} onChange={handleChange} placeholder="Nombre" required />
        <input name="cliente_apellido" value={form.cliente_apellido} onChange={handleChange} placeholder="Apellido" required />
        <input name="cliente_telefono" value={form.cliente_telefono} onChange={handleChange} placeholder="Teléfono" required />

        {/* Servicio */}
        <select name="servicio_id" value={form.servicio_id} onChange={handleChange} required>
          <option value="">-- Selecciona Servicio --</option>
          {servicios.map(s => <option key={s.servicio_id} value={s.servicio_id}>{s.nombre}</option>)}
        </select>

        {/* Peluquero */}
        <select name="peluquero_id" value={form.peluquero_id} onChange={handleChange} required>
          <option value="">-- Selecciona Peluquero --</option>
          {peluqueros.map(p => <option key={p.peluquero_id} value={p.peluquero_id}>{p.nombre_completo}</option>)}
        </select>

        {/* Método de pago */}
        <select name="metodo_pago_id" value={form.metodo_pago_id} onChange={handleChange} required>
          <option value="">-- Selecciona Método de Pago --</option>
          {metodosPago.map(mp => (
            <option key={mp.metodo_pago_id} value={mp.metodo_pago_id}>{mp.nombre}</option>
          ))}
        </select>

        {/* Estado */}
        <select name="estado_id" value={form.estado_id} onChange={handleChange} required>
          <option value="">-- Selecciona Estado --</option>
          {estados.map(e => (
            <option key={e.estado_id} value={e.estado_id}>{e.nombre}</option>
          ))}
        </select>

        <input type="text" name="observaciones" value={form.observaciones} onChange={handleChange} placeholder="Observaciones" />
        <input type="date" name="fecha" value={form.fecha} onChange={handleChange} required />
        <input type="time" name="hora" value={form.hora} onChange={handleChange} required />

        <button type="submit">{editingId ? "Actualizar" : "Agregar"}</button>
      </form>

      <Table columns={columns} data={dataWithActions} />
    </div>
  );
}

export default Citas;
