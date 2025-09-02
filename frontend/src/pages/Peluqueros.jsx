import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";

function Peluqueros() {
  const [peluqueros, setPeluqueros] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/peluqueros")
      .then((res) => setPeluqueros(res.data))
      .catch((err) => console.error(err));
  }, []);

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Nombre", accessor: "nombre" },
    { header: "Especialidad", accessor: "especialidad" },
  ];

  return (
    <div>
      <h2>Peluqueros</h2>
      <Table columns={columns} data={peluqueros} />
    </div>
  );
}

export default Peluqueros;
