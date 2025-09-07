// controllers/estadosController.js
import { db } from "../config/db.js";

export const getEstados = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT estado_id, nombre FROM estados_cita");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estados" });
  }
};
