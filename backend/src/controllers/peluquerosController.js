import { db } from "../config/db.js";

// Obtener todos los peluqueros
export const getPeluqueros = (req, res) => {
  db.query("SELECT * FROM peluqueros", (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
};

// Obtener peluquero por id
export const getPeluqueroById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM peluqueros WHERE id = ?", [id], (err, data) => {
    if (err) return res.json(err);
    res.json(data[0]);
  });
};

// Crear un peluquero
export const createPeluquero = (req, res) => {
  const { nombre, especialidad } = req.body;
  const q = "INSERT INTO peluqueros (nombre, especialidad) VALUES (?)";
  const values = [nombre, especialidad];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    res.json({ message: "Peluquero creado exitosamente" });
  });
};

// Actualizar peluquero
export const updatePeluquero = (req, res) => {
  const { id } = req.params;
  const { nombre, especialidad } = req.body;
  const q = "UPDATE peluqueros SET nombre = ?, especialidad = ? WHERE id = ?";
  db.query(q, [nombre, especialidad, id], (err, data) => {
    if (err) return res.json(err);
    res.json({ message: "Peluquero actualizado" });
  });
};

// Eliminar peluquero
export const deletePeluquero = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM peluqueros WHERE id = ?", [id], (err, data) => {
    if (err) return res.json(err);
    res.json({ message: "Peluquero eliminado" });
  });
};
