// src/controllers/peluquerosController.js
import { db } from "../config/db.js";

// Obtener todos los peluqueros
export const getPeluqueros = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.peluquero_id, p.nombre, p.apellido, p.telefono,
             p.especialidad_id, e.nombre AS especialidad_nombre
      FROM peluqueros p
      LEFT JOIN especialidades e 
      ON p.especialidad_id = e.especialidad_id
    `);

    res.json(rows);
  } catch (error) {
    console.error("❌ Error en getPeluqueros:", error);
    res.status(500).json({ error: error.message });
  }
};


// Crear peluquero
export const createPeluquero = async (req, res) => {
  try {
    const { nombre, apellido, telefono, especialidad_id } = req.body;

    const [result] = await db.query(
      `INSERT INTO peluqueros (nombre, apellido, telefono, especialidad_id) 
       VALUES (?, ?, ?, ?)`,
      [nombre, apellido, telefono, especialidad_id]
    );

    res.status(201).json({ 
      message: "✅ Peluquero creado exitosamente", 
      peluquero_id: result.insertId 
    });
  } catch (error) {
    console.error("❌ Error en createPeluquero:", error);
    res.status(500).json({ error: error.message });
  }
};

// Actualizar peluquero
export const updatePeluquero = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, telefono, especialidad_id } = req.body;

  if (!nombre || !apellido)
    return res.status(400).json({ message: "Nombre y apellido son obligatorios" });

  try {
    const [result] = await db.query(
      `UPDATE peluqueros 
       SET nombre = ?, apellido = ?, telefono = ?, especialidad_id = ?
       WHERE peluquero_id = ?`,
      [nombre, apellido, telefono, especialidad_id, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Peluquero no encontrado" });

    res.json({ message: "✅ Peluquero actualizado" });
  } catch (error) {
    console.error("❌ Error al actualizar peluquero:", error);
    res.status(500).json({ error: error.message });
  }
};

// Eliminar peluquero
export const deletePeluquero = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query(
      "DELETE FROM peluqueros WHERE peluquero_id = ?",
      [id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Peluquero no encontrado" });

    res.json({ message: "🗑️ Peluquero eliminado" });
  } catch (error) {
    console.error("❌ Error al eliminar peluquero:", error);
    res.status(500).json({ error: error.message });
  }
};
