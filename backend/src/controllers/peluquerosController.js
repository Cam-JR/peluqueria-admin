import { db } from "../config/db.js";

// ==========================================
// GET all peluqueros
// ==========================================
export const getPeluqueros = async (req, res) => {
  try {
    console.log("📌 Entrando a getPeluqueros...");

    const [rows] = await db.query(`
      SELECT p.peluquero_id, p.nombre_completo, p.telefono,
             p.especialidad_id, e.nombre AS especialidad_nombre
      FROM peluqueros p
      LEFT JOIN especialidades e 
      ON p.especialidad_id = e.especialidad_id
    `);

    console.log("✅ Resultado de DB:", rows);
    res.json(rows);
  } catch (err) {
    console.error("❌ Error en getPeluqueros:", err.message);
    res.status(500).json({ error: "Error al obtener peluqueros", detalle: err.message });
  }
};

// ==========================================
// GET peluquero by ID
// ==========================================
export const getPeluqueroById = async (req, res) => {
  try {
    console.log("📌 Entrando a getPeluqueroById con ID:", req.params.id);

    const [rows] = await db.query("SELECT * FROM peluqueros WHERE peluquero_id = ?", [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Peluquero no encontrado" });
    }

    console.log("✅ Peluquero encontrado:", rows[0]);
    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Error en getPeluqueroById:", err.message);
    res.status(500).json({ error: "Error al obtener peluquero", detalle: err.message });
  }
};

// ==========================================
// CREATE peluquero
// ==========================================
export const createPeluquero = async (req, res) => {
  try {
    console.log("📌 Entrando a createPeluquero con body:", req.body);

    const { nombre_completo, telefono, especialidad_id } = req.body;

    const [result] = await db.query(
      "INSERT INTO peluqueros (nombre_completo, telefono, especialidad_id) VALUES (?, ?, ?)",
      [nombre_completo, telefono, especialidad_id]
    );

    console.log("✅ Peluquero creado con ID:", result.insertId);
    res.status(201).json({ id: result.insertId, nombre_completo, telefono, especialidad_id });
  } catch (err) {
    console.error("❌ Error en createPeluquero:", err.message);
    res.status(500).json({ error: "Error al crear peluquero", detalle: err.message });
  }
};

// ==========================================
// UPDATE peluquero
// ==========================================
export const updatePeluquero = async (req, res) => {
  try {
    console.log("📌 Entrando a updatePeluquero con ID:", req.params.id, "body:", req.body);

    const { nombre_completo, telefono, especialidad_id } = req.body;

    const [result] = await db.query(
      "UPDATE peluqueros SET nombre_completo=?, telefono=?, especialidad_id=? WHERE peluquero_id=?",
      [nombre_completo, telefono, especialidad_id, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Peluquero no encontrado" });
    }

    console.log("✅ Peluquero actualizado:", req.params.id);
    res.json({ id: req.params.id, nombre_completo, telefono, especialidad_id });
  } catch (err) {
    console.error("❌ Error en updatePeluquero:", err.message);
    res.status(500).json({ error: "Error al actualizar peluquero", detalle: err.message });
  }
};

// ==========================================
// DELETE peluquero
// ==========================================
export const deletePeluquero = async (req, res) => {
  try {
    console.log("📌 Entrando a deletePeluquero con ID:", req.params.id);

    const [result] = await db.query("DELETE FROM peluqueros WHERE peluquero_id = ?", [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Peluquero no encontrado" });
    }

    console.log("✅ Peluquero eliminado:", req.params.id);
    res.json({ message: "Peluquero eliminado" });
  } catch (err) {
    console.error("❌ Error en deletePeluquero:", err.message);
    res.status(500).json({ error: "Error al eliminar peluquero", detalle: err.message });
  }
};
