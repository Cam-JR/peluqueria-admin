// controllers/metodosPagoController.js
import { db } from "../config/db.js";

export const getMetodosPago = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT metodo_pago_id, nombre FROM metodos_pago");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener métodos de pago" });
  }
};
