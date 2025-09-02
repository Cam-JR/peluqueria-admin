import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";

function Servicios() {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/servicios")
      .then((res) => setServicios(res.data))
      .catch((err) => console.error(err));
  }, []);

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Nombre", accessor: "nombre" },
    { header: "Precio (S/.)", accessor: "precio" },
    { header: "Duración (min)", accessor: "duracion" },
  ];

  return (
    <div>
      <h2>Servicios</h2>
      <Table columns={columns} data={servicios} />
    </div>
  );
}

export default Servicios;
