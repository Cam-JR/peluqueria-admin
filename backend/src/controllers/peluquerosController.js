// backend/src/controllers/peluquerosController.js
import { db } from "../config/db.js";

// ==========================================
// GET all peluqueros
// ==========================================
export const getPeluqueros = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.peluquero_id, p.nombre_completo, p.telefono,
             p.especialidad_id, e.nombre AS especialidad_nombre
      FROM peluqueros p
      LEFT JOIN especialidades e 
      ON p.especialidad_id = e.especialidad_id
    `);
    res.json(rows);
  } catch (err) {
    console.error("❌ Error en getPeluqueros:", err);
    res.status(500).json({ error: "Error al obtener peluqueros" });
  }
};

// ==========================================
// GET peluquero by ID
// ==========================================
export const getPeluqueroById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.peluquero_id, p.nombre_completo, p.telefono,
              p.especialidad_id, e.nombre AS especialidad_nombre
       FROM peluqueros p
       LEFT JOIN especialidades e 
       ON p.especialidad_id = e.especialidad_id
       WHERE p.peluquero_id = ?`,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Peluquero no encontrado" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Error en getPeluqueroById:", err);
    res.status(500).json({ error: "Error al obtener peluquero" });
  }
};

// ==========================================
// CREATE peluquero
// ==========================================
export const createPeluquero = async (req, res) => {
  try {
    const { nombre_completo, telefono, especialidad_id } = req.body;

    const [result] = await pool.query(
      `INSERT INTO peluqueros (nombre_completo, telefono, especialidad_id) VALUES (?, ?, ?)`,
      [nombre_completo, telefono, especialidad_id]
    );

    res.json({
      peluquero_id: result.insertId,
      nombre_completo,
      telefono,
      especialidad_id,
    });
  } catch (err) {
    console.error("❌ Error en createPeluquero:", err);
    res.status(500).json({ error: "Error al crear peluquero" });
  }
};

// ==========================================
// UPDATE peluquero
// ==========================================
export const updatePeluquero = async (req, res) => {
  try {
    const { nombre_completo, telefono, especialidad_id } = req.body;
    const { id } = req.params;

    const [result] = await pool.query(
      `UPDATE peluqueros 
       SET nombre_completo = ?, telefono = ?, especialidad_id = ?
       WHERE peluquero_id = ?`,
      [nombre_completo, telefono, especialidad_id, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Peluquero no encontrado" });
    }

    res.json({ peluquero_id: id, nombre_completo, telefono, especialidad_id });
  } catch (err) {
    console.error("❌ Error en updatePeluquero:", err);
    res.status(500).json({ error: "Error al actualizar peluquero" });
  }
};

// ==========================================
// DELETE peluquero
// ==========================================
export const deletePeluquero = async (req, res) => {
  try {
    const [result] = await pool.query(
      `DELETE FROM peluqueros WHERE peluquero_id = ?`,
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Peluquero no encontrado" });
    }

    res.json({ message: "🗑️ Peluquero eliminado" });
  } catch (err) {
    console.error("❌ Error en deletePeluquero:", err);
    res.status(500).json({ error: "Error al eliminar peluquero" });
  }
};
