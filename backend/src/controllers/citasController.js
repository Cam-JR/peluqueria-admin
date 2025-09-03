import { db } from "../config/db.js";

// Obtener todas las citas
export const getCitas = (req, res) => {
  const q = `
    SELECT 
      c.cita_id, 
      c.fecha, 
      c.hora, 
      c.observaciones,
      s.nombre AS servicio, 
      p.nombre AS peluquero, 
      p.apellido AS peluquero_apellido
    FROM citas c
    JOIN servicios s ON c.servicio_id = s.servicio_id
    JOIN peluqueros p ON c.peluquero_id = p.peluquero_id
  `;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
};

// Obtener cita por id
export const getCitaById = (req, res) => {
  const { id } = req.params;
  const q = `
    SELECT 
      c.cita_id, 
      c.fecha, 
      c.hora, 
      c.observaciones,
      s.nombre AS servicio, 
      p.nombre AS peluquero, 
      p.apellido AS peluquero_apellido
    FROM citas c
    JOIN servicios s ON c.servicio_id = s.servicio_id
    JOIN peluqueros p ON c.peluquero_id = p.peluquero_id
    WHERE c.cita_id = ?
  `;
  db.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    res.json(data[0]);
  });
};

// Crear una cita
export const createCita = (req, res) => {
  const { fecha, hora, servicio_id, peluquero_id, cliente_id, metodo_pago_id, estado_id, observaciones } = req.body;
  const q = `
    INSERT INTO citas (fecha, hora, servicio_id, peluquero_id, cliente_id, metodo_pago_id, estado_id, observaciones) 
    VALUES (?)
  `;
  const values = [fecha, hora, servicio_id, peluquero_id, cliente_id, metodo_pago_id, estado_id, observaciones];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    res.json({ message: "Cita creada exitosamente" });
  });
};

// Actualizar una cita
export const updateCita = (req, res) => {
  const { id } = req.params;
  const { fecha, hora, servicio_id, peluquero_id, cliente_id, metodo_pago_id, estado_id, observaciones } = req.body;
  const q = `
    UPDATE citas 
    SET fecha = ?, hora = ?, servicio_id = ?, peluquero_id = ?, cliente_id = ?, metodo_pago_id = ?, estado_id = ?, observaciones = ?
    WHERE cita_id = ?
  `;
  db.query(q, [fecha, hora, servicio_id, peluquero_id, cliente_id, metodo_pago_id, estado_id, observaciones, id], (err, data) => {
    if (err) return res.json(err);
    res.json({ message: "Cita actualizada" });
  });
};

// Eliminar una cita
export const deleteCita = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM citas WHERE cita_id = ?", [id], (err, data) => {
    if (err) return res.json(err);
    res.json({ message: "Cita eliminada" });
  });
};
