import { db } from "../config/db.js";

// 📌 Crear un servicio
export const createServicio = async (req, res) => {
  try {
    const { nombre, precio, duracion } = req.body;

    if (!nombre || !precio || !duracion) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const [result] = await db.query(
      "INSERT INTO servicios (nombre, precio, duracion) VALUES (?, ?, ?)",
      [nombre, precio, duracion]
    );

    res.status(201).json({
      id: result.insertId,
      nombre,
      precio,
      duracion
    });
  } catch (error) {
    console.error("Error en createServicio:", error);
    res.status(500).json({ message: "Error al crear el servicio" });
  }
};

// 📌 Obtener todos los servicios
export const getServicios = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM servicios");
    res.json(rows);
  } catch (error) {
    console.error("Error en getServicios:", error);
    res.status(500).json({ message: "Error al obtener los servicios" });
  }
};

// 📌 Obtener un servicio por ID
export const getServicioById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query("SELECT * FROM servicios WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error en getServicioById:", error);
    res.status(500).json({ message: "Error al obtener el servicio" });
  }
};

// 📌 Actualizar un servicio
export const updateServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, duracion } = req.body;

    const [result] = await db.query(
      "UPDATE servicios SET nombre = ?, precio = ?, duracion = ? WHERE id = ?",
      [nombre, precio, duracion, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    res.json({ id, nombre, precio, duracion });
  } catch (error) {
    console.error("Error en updateServicio:", error);
    res.status(500).json({ message: "Error al actualizar el servicio" });
  }
};

// 📌 Eliminar un servicio
export const deleteServicio = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query("DELETE FROM servicios WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    res.json({ message: "Servicio eliminado correctamente" });
  } catch (error) {
    console.error("Error en deleteServicio:", error);
    res.status(500).json({ message: "Error al eliminar el servicio" });
  }
};
