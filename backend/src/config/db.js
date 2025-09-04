// src/config/db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 🚀 Probar conexión (en una IIFE async)
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Conexión a MySQL exitosa");
    connection.release();
  } catch (error) {
    console.error("❌ Error al conectar con MySQL:", error);
  }
})();
