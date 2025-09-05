import { db } from "../config/db.js";

// Obtener todas las citas
export const getCitas = async (req, res) => {
  try {
    const q = `
      SELECT 
        c.cita_id, 
        c.fecha, 
        c.hora, 
        c.observaciones,
        cl.cliente_id,
        CONCAT(cl.nombre, ' ', cl.apellido) AS cliente_nombre_completo,
        cl.telefono AS cliente_telefono,
        s.servicio_id,
        s.nombre AS servicio,
        p.peluquero_id,
        p.nombre_completo AS peluquero_nombre_completo,
        p.telefono AS peluquero_telefono,
        mp.metodo_pago_id,
        mp.nombre AS metodo_pago,
        e.estado_id,
        e.nombre AS estado
      FROM citas c
      LEFT JOIN clientes cl ON c.cliente_id = cl.cliente_id
      LEFT JOIN servicios s ON c.servicio_id = s.servicio_id
      LEFT JOIN peluqueros p ON c.peluquero_id = p.peluquero_id
      LEFT JOIN metodos_pago mp ON c.metodo_pago_id = mp.metodo_pago_id
      LEFT JOIN estados_cita e ON c.estado_id = e.estado_id
    `;
    const [rows] = await db.query(q);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener cita por id
export const getCitaById = async (req, res) => {
  try {
    const { id } = req.params;
    const q = `
      SELECT 
        c.cita_id, 
        c.fecha, 
        c.hora, 
        c.observaciones,
        cl.cliente_id,
        CONCAT(cl.nombre, ' ', cl.apellido) AS cliente_nombre_completo,
        cl.telefono AS cliente_telefono,
        s.servicio_id,
        s.nombre AS servicio,
        p.peluquero_id,
        p.nombre_completo AS peluquero_nombre_completo,
        p.telefono AS peluquero_telefono,
        mp.metodo_pago_id,
        mp.nombre AS metodo_pago,
        e.estado_id,
        e.nombre AS estado
      FROM citas c
      LEFT JOIN clientes cl ON c.cliente_id = cl.cliente_id
      LEFT JOIN servicios s ON c.servicio_id = s.servicio_id
      LEFT JOIN peluqueros p ON c.peluquero_id = p.peluquero_id
      LEFT JOIN metodos_pago mp ON c.metodo_pago_id = mp.metodo_pago_id
      LEFT JOIN estados_cita e ON c.estado_id = e.estado_id
      WHERE c.cita_id = ?
    `;
    const [rows] = await db.query(q, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear citas

export const createCita = async (req, res) => {
  try {
    const {
      fecha,
      hora,
      servicio_id,
      peluquero_id,
      cliente_id,
      cliente_nombre,
      cliente_apellido,
      cliente_telefono,
      metodo_pago_id,
      estado_id,
      observaciones
    } = req.body;

    let idCliente = cliente_id;

    // Si no existe cliente_id, creamos un cliente nuevo
    if (!idCliente) {
      const [result] = await db.query(
        "INSERT INTO clientes (nombre, apellido, telefono) VALUES (?, ?, ?)",
        [cliente_nombre, cliente_apellido, cliente_telefono]
      );
      idCliente = result.insertId;
    }

    // Crear la cita con el cliente_id
    const q = `
      INSERT INTO citas (fecha, hora, servicio_id, peluquero_id, cliente_id, metodo_pago_id, estado_id, observaciones) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await db.query(q, [fecha, hora, servicio_id, peluquero_id, idCliente, metodo_pago_id, estado_id, observaciones]);

    res.json({ message: "Cita creada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateCita = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fecha,
      hora,
      servicio_id,
      peluquero_id,
      cliente_id,
      cliente_nombre,
      cliente_apellido,
      cliente_telefono,
      metodo_pago_id,
      estado_id,
      observaciones
    } = req.body;

    let idCliente = cliente_id;

    // Crear cliente si no existe
    if (!idCliente) {
      const [result] = await db.query(
        "INSERT INTO clientes (nombre, apellido, telefono) VALUES (?, ?, ?)",
        [cliente_nombre, cliente_apellido, cliente_telefono]
      );
      idCliente = result.insertId;
    }

    const q = `
      UPDATE citas 
      SET fecha = ?, hora = ?, servicio_id = ?, peluquero_id = ?, cliente_id = ?, metodo_pago_id = ?, estado_id = ?, observaciones = ?
      WHERE cita_id = ?
    `;
    const [result] = await db.query(q, [fecha, hora, servicio_id, peluquero_id, idCliente, metodo_pago_id, estado_id, observaciones, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }

    res.json({ message: "Cita actualizada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Eliminar una cita
export const deleteCita = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("DELETE FROM citas WHERE cita_id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }
    res.json({ message: "Cita eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};