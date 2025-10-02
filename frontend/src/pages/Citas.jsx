import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; 
import "../styles/App.css";


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
    axios
      .get("http://localhost:5000/api/citas")
      .then((res) => setCitas(res.data))
      .catch((err) => console.error(err));
  };

  const fetchClientes = () => {
    axios
      .get("http://localhost:5000/api/clientes")
      .then((res) => setClientes(res.data))
      .catch((err) => console.error(err));
  };

  const fetchServicios = () => {
    axios
      .get("http://localhost:5000/api/servicios")
      .then((res) => setServicios(res.data))
      .catch((err) => console.error(err));
  };

  const fetchPeluqueros = () => {
    axios
      .get("http://localhost:5000/api/peluqueros")
      .then((res) => setPeluqueros(res.data))
      .catch((err) => console.error(err));
  };

  const fetchMetodosPago = () => {
    axios
      .get("http://localhost:5000/api/metodos-pago")
      .then((res) => setMetodosPago(res.data))
      .catch((err) => console.error(err));
  };

  const fetchEstados = () => {
    axios
      .get("http://localhost:5000/api/estados")
      .then((res) => setEstados(res.data))
      .catch((err) => console.error(err));
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

    // Cuando seleccionan un cliente del select, completar campos automáticamente
    if (name === "cliente_id") {
      if (!value) {
        // si se selecciona la opción vacía -> limpiar datos del cliente
        setForm({
          ...form,
          cliente_id: "",
          cliente_nombre: "",
          cliente_apellido: "",
          cliente_telefono: "",
        });
        return;
      }

      const cliente = clientes.find(
        (c) => c.cliente_id.toString() === value.toString()
      );
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

    const crearOActualizar = (clienteId) => {
      // siempre mandamos los campos del cliente (nombre/apellido/teléfono)
      const payload = {
        fecha: form.fecha,
        hora: form.hora,
        servicio_id: form.servicio_id,
        peluquero_id: form.peluquero_id,
        cliente_id: clienteId || null,
        cliente_nombre: form.cliente_nombre,
        cliente_apellido: form.cliente_apellido,
        cliente_telefono: form.cliente_telefono,
        metodo_pago_id: form.metodo_pago_id,
        estado_id: form.estado_id,
        observaciones: form.observaciones,
      };

      if (editingId) {
        axios
          .put(`http://localhost:5000/api/citas/${editingId}`, payload)
          .then(() => {
            fetchCitas();
            fetchClientes();
            resetForm();
          })
          .catch((err) => console.error(err));
      } else {
        axios
          .post("http://localhost:5000/api/citas", payload)
          .then(() => {
            fetchCitas();
            fetchClientes();
            resetForm();
          })
          .catch((err) => console.error(err));
      }
    };

    // Si no hay cliente_id, crear cliente antes
    if (!form.cliente_id) {
      axios
        .post("http://localhost:5000/api/clientes", {
          nombre: form.cliente_nombre,
          apellido: form.cliente_apellido,
          telefono: form.cliente_telefono,
        })
        .then((res) => {
          // algunos controladores devuelven insertId, otros { insertId } en data; adaptamos:
          const newClienteId =
            res.data.insertId ?? (res.data && res.data.insertId) ?? null;
          crearOActualizar(newClienteId);
          fetchClientes();
        })
        .catch((err) => console.error(err));
    } else {
      crearOActualizar(form.cliente_id);
    }
  };

  const handleEdit = (cita) => {
    // Preferimos datos desde el listado de clientes (si está cargado)
    const clienteFromList = clientes.find(
      (c) => Number(c.cliente_id) === Number(cita.cliente_id)
    );

    let nombre = "";
    let apellido = "";
    let telefono = "";

    if (clienteFromList) {
      nombre = clienteFromList.nombre || "";
      apellido = clienteFromList.apellido || "";
      telefono = clienteFromList.telefono || "";
    } else if (cita.cliente_nombre_completo) {
      // si el cliente no está en el array (caso raro), dividimos el nombre completo
      const partes = cita.cliente_nombre_completo.split(" ");
      nombre = partes[0] || "";
      apellido = partes.slice(1).join(" ") || "";
      telefono = cita.cliente_telefono || "";
    } else {
      // fallback a campos separados si existen
      nombre = cita.cliente_nombre || "";
      apellido = cita.cliente_apellido || "";
      telefono = cita.cliente_telefono || "";
    }

    setForm({
      cliente_id: cita.cliente_id || "",
      cliente_nombre: nombre,
      cliente_apellido: apellido,
      cliente_telefono: telefono,
      servicio_id: cita.servicio_id || "",
      peluquero_id: cita.peluquero_id || "",
      metodo_pago_id: cita.metodo_pago_id || "",
      estado_id: cita.estado_id || "",
      observaciones: cita.observaciones || "",
      fecha: cita.fecha ? cita.fecha.split("T")[0] : cita.fecha || "",
      hora: cita.hora || "",
    });

    setEditingId(cita.cita_id);
  };

   const handleDelete = (id) => {
  // confirmación nativa
  if (!window.confirm("¿Estás segura de eliminar esta cita?")) return;

  axios
    .delete(`http://localhost:5000/api/citas/${id}`)
    .then(() => {
      fetchCitas();               // refresca la lista
      alert("🗑️ Cita eliminada"); // feedback al usuario
    })
    .catch((err) => {
      console.error("❌ Error al eliminar cita:", err);
      alert("❌ Error al eliminar la cita. Revisa la consola.");
    });
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
    { header: "Cliente", accessor: "cliente_nombre_completo" },
    { header: "Teléfono", accessor: "cliente_telefono" },
    { header: "Servicio", accessor: "servicio" },
    { header: "Peluquero", accessor: "peluquero_nombre_completo" },
    { header: "Método de pago", accessor: "metodo_pago" },
    { header: "Estado", accessor: "estado" },
    { header: "Fecha", accessor: "fecha" },
    { header: "Hora", accessor: "hora" },
    { header: "Observaciones", accessor: "observaciones" },
    { header: "Acciones", accessor: "acciones" },
  ];

 const dataWithActions = citas.map((c) => ({
  ...c,
  fecha: c.fecha ? new Date(c.fecha).toLocaleDateString() : "",
  acciones: (
    <div className="action-buttons-container">
      {/* Botón de Editar */}
      <button 
        className="btn-action btn-edit" 
        onClick={() => handleEdit(c)} 
        title="Editar Cita"
      >
        <FaEdit />
      </button>
      
      {/* Botón de Eliminar */}
      <button 
        className="btn-action btn-delete" 
        onClick={() => handleDelete(c.cita_id)} 
        title="Eliminar Cita"
      >
        <FaTrashAlt />
      </button>
    </div>
  ),
}));

  return (
    <div>
      <h2>Citas</h2>
      <form onSubmit={handleSubmit} className="form">
        {/* Lista de Clientes */}
        <select
          name="cliente_id"
          value={form.cliente_id}
          onChange={handleChange}
        >
          <option value="">-- Nuevo Cliente --</option>
          {clientes.map((c) => (
            <option key={c.cliente_id} value={c.cliente_id}>
              {c.nombre} {c.apellido} ({c.telefono})
            </option>
          ))}
        </select>

        {/* Datos del Cliente (se rellenan al seleccionar cliente o al editar) */}
        <input
          name="cliente_nombre"
          value={form.cliente_nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <input
          name="cliente_apellido"
          value={form.cliente_apellido}
          onChange={handleChange}
          placeholder="Apellido"
          required
        />
        <input
          name="cliente_telefono"
          value={form.cliente_telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          required
        />

        {/* Servicio */}
        <select
          name="servicio_id"
          value={form.servicio_id}
          onChange={handleChange}
          required
        >
          <option value="">-- Selecciona Servicio --</option>
          {servicios.map((s) => (
            <option key={s.servicio_id} value={s.servicio_id}>
              {s.nombre}
            </option>
          ))}
        </select>

        {/* Peluquero */}
        <select
          name="peluquero_id"
          value={form.peluquero_id}
          onChange={handleChange}
          required
        >
          <option value="">-- Selecciona Peluquero --</option>
          {peluqueros.map((p) => (
            <option key={p.peluquero_id} value={p.peluquero_id}>
              {p.nombre_completo}
            </option>
          ))}
        </select>

        {/* Método de pago */}
        <select
          name="metodo_pago_id"
          value={form.metodo_pago_id}
          onChange={handleChange}
          required
        >
          <option value="">-- Selecciona Método de Pago --</option>
          {metodosPago.map((mp) => (
            <option key={mp.metodo_pago_id} value={mp.metodo_pago_id}>
              {mp.nombre}
            </option>
          ))}
        </select>

        {/* Estado */}
        <select
          name="estado_id"
          value={form.estado_id}
          onChange={handleChange}
          required
        >
          <option value="">-- Selecciona Estado --</option>
          {estados.map((e) => (
            <option key={e.estado_id} value={e.estado_id}>
              {e.nombre}
            </option>
          ))}
        </select>

        {/* Observaciones */}
        <input
          type="text"
          name="observaciones"
          value={form.observaciones}
          onChange={handleChange}
          placeholder="Observaciones"
        />

        {/* Fecha y Hora */}
        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="hora"
          value={form.hora}
          onChange={handleChange}
          required
        />

        {/* 1. Botón Principal (Actualizar o Agregar) */}
    <button type="submit" className="btn btn-primary">
        {/* Aquí podemos añadir un icono para claridad visual */}
        {editingId ? "Actualizar" : "Agregar"}
    </button>
    
    {/* 2. Botón Secundario (Cancelar, solo visible en modo edición) */}
    {editingId && (
        <button 
            type="button" 
            onClick={resetForm} 
            className="btn btn-secondary"
        >
            Cancelar
        </button>
    )}
      </form>

       

      <Table columns={columns} data={dataWithActions} />
    </div>
  );
}

export default Citas;
