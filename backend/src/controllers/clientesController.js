import { db } from "../config/db.js";

// Obtener todos los clientes
export const getClientes = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM clientes");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener cliente por id
export const getClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM clientes WHERE cliente_id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Cliente no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear cliente
export const createCliente = async (req, res) => {
  try {
    const { nombre, apellido, telefono } = req.body;
    const [result] = await db.query(
      "INSERT INTO clientes (nombre, apellido, telefono) VALUES (?, ?, ?)",
      [nombre, apellido, telefono]
    );
    res.json({ message: "Cliente creado", insertId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar cliente
export const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, telefono } = req.body;
    const [result] = await db.query(
      "UPDATE clientes SET nombre = ?, apellido = ?, telefono = ? WHERE cliente_id = ?",
      [nombre, apellido, telefono, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Cliente no encontrado" });
    res.json({ message: "Cliente actualizado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar cliente
export const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("DELETE FROM clientes WHERE cliente_id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Cliente no encontrado" });
    res.json({ message: "Cliente eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
