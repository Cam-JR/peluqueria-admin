import { db } from "../config/db.js";

// Obtener todas las especialidades
export const getEspecialidades = async (req, res) => {
    try {
        const [results] = await db.query("SELECT * FROM especialidades");
        res.json(results);
    } catch (error) {
        console.error("❌ Error al obtener especialidades:", error);
        res.status(500).json({ error: error.message });
    }
};

// Obtener una especialidad por ID
export const getEspecialidadById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query(
            "SELECT * FROM especialidades WHERE especialidad_id = ?",
            [id]
        );
        if (results.length === 0)
            return res.status(404).json({ message: "Especialidad no encontrada" });
        res.json(results[0]);
    } catch (error) {
        console.error("❌ Error al obtener especialidad:", error);
        res.status(500).json({ error: error.message });
    }
};

// Crear nueva especialidad
export const createEspecialidad = async (req, res) => {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ message: "El nombre es obligatorio" });

    try {
        const [results] = await db.query(
            "INSERT INTO especialidades (nombre) VALUES (?)",
            [nombre]
        );
        res.status(201).json({ message: "Especialidad creada", especialidad_id: results.insertId });
    } catch (error) {
        console.error("❌ Error al crear especialidad:", error);
        res.status(500).json({ error: error.message });
    }
};

// Actualizar especialidad
export const updateEspecialidad = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ message: "El nombre es obligatorio" });

    try {
        const [results] = await db.query(
            "UPDATE especialidades SET nombre = ? WHERE especialidad_id = ?",
            [nombre, id]
        );
        if (results.affectedRows === 0)
            return res.status(404).json({ message: "Especialidad no encontrada" });
        res.json({ message: "Especialidad actualizada" });
    } catch (error) {
        console.error("❌ Error al actualizar especialidad:", error);
        res.status(500).json({ error: error.message });
    }
};

// Eliminar especialidad
export const deleteEspecialidad = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query(
            "DELETE FROM especialidades WHERE especialidad_id = ?",
            [id]
        );
        if (results.affectedRows === 0)
            return res.status(404).json({ message: "Especialidad no encontrada" });
        res.json({ message: "Especialidad eliminada" });
    } catch (error) {
        console.error("❌ Error al eliminar especialidad:", error);
        res.status(500).json({ error: error.message });
    }
};
