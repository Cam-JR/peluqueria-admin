import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";

function Citas() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/citas")
      .then((res) => setCitas(res.data))
      .catch((err) => console.error(err));
  }, []);

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Cliente", accessor: "cliente_nombre" },
    { header: "Teléfono", accessor: "cliente_telefono" },
    { header: "Servicio", accessor: "servicio" },
    { header: "Peluquero", accessor: "peluquero" },
    { header: "Fecha", accessor: "fecha" },
    { header: "Hora", accessor: "hora" },
    { header: "Estado", accessor: "estado" },
  ];

  return (
    <div>
      <h2>Citas</h2>
      <Table columns={columns} data={citas} />
    </div>
  );
}

export default Citas;
