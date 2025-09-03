import { db } from "../config/db.js";

// 📌 Obtener todos los peluqueros con sus especialidades
export const getPeluqueros = (req, res) => {
  const q = `
    SELECT p.peluquero_id, p.nombre, p.apellido, p.telefono,
           IFNULL(e.nombre, 'Sin especialidad') AS especialidad
    FROM peluqueros p
    LEFT JOIN peluquero_especialidad pe ON p.peluquero_id = pe.peluquero_id
    LEFT JOIN especialidades e ON pe.especialidad_id = e.especialidad_id
  `;
  db.query(q, (err, data) => {
    if (err) {
      console.log("❌ Error en query:", err);
      return res.status(500).json(err);
    }
    res.json(data);
  });
};


// 📌 Obtener peluquero por ID (con especialidad)
export const getPeluqueroById = (req, res) => {
  const { id } = req.params;
  const q = `
    SELECT p.peluquero_id, p.nombre, p.apellido, p.telefono,
           e.especialidad_id, e.nombre AS especialidad
    FROM peluqueros p
    LEFT JOIN peluquero_especialidad pe ON p.peluquero_id = pe.peluquero_id
    LEFT JOIN especialidades e ON pe.especialidad_id = e.especialidad_id
    WHERE p.peluquero_id = ?
  `;
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data[0]);
  });
};

// 📌 Crear peluquero con especialidad opcional
export const createPeluquero = (req, res) => {
  const { nombre, apellido, telefono, especialidad_id } = req.body;
  const q = "INSERT INTO peluqueros (nombre, apellido, telefono) VALUES (?)";
  const values = [nombre, apellido, telefono];

  db.query(q, [values], (err, result) => {
    if (err) return res.status(500).json(err);

    const peluqueroId = result.insertId;

    if (especialidad_id) {
      const q2 = "INSERT INTO peluquero_especialidad (peluquero_id, especialidad_id) VALUES (?, ?)";
      db.query(q2, [peluqueroId, especialidad_id], (err2) => {
        if (err2) return res.status(500).json(err2);
        res.json({ message: "✅ Peluquero creado con especialidad" });
      });
    } else {
      res.json({ message: "✅ Peluquero creado" });
    }
  });
};

// 📌 Actualizar peluquero
export const updatePeluquero = (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, telefono, especialidad_id } = req.body;
  const q = "UPDATE peluqueros SET nombre=?, apellido=?, telefono=? WHERE peluquero_id=?";

  db.query(q, [nombre, apellido, telefono, id], (err) => {
    if (err) return res.status(500).json(err);

    if (especialidad_id) {
      const q2 = `
        INSERT INTO peluquero_especialidad (peluquero_id, especialidad_id)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE especialidad_id=VALUES(especialidad_id)
      `;
      db.query(q2, [id, especialidad_id], (err2) => {
        if (err2) return res.status(500).json(err2);
        res.json({ message: "✅ Peluquero y especialidad actualizados" });
      });
    } else {
      res.json({ message: "✅ Peluquero actualizado" });
    }
  });
};

// 📌 Eliminar peluquero (y su relación de especialidad)
export const deletePeluquero = (req, res) => {
  const { id } = req.params;

  // 1️⃣ Borrar la relación en peluquero_especialidad
  const q1 = "DELETE FROM peluquero_especialidad WHERE peluquero_id = ?";
  db.query(q1, [id], (err) => {
    if (err) return res.status(500).json(err);

    // 2️⃣ Borrar el peluquero
    const q2 = "DELETE FROM peluqueros WHERE peluquero_id = ?";
    db.query(q2, [id], (err2) => {
      if (err2) return res.status(500).json(err2);
      res.json({ message: "✅ Peluquero eliminado junto con sus especialidades" });
    });
  });
};
