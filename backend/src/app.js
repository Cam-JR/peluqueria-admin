import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import mysql from "mysql2";

// Importar rutas
import serviciosRoutes from "./routes/serviciosRoutes.js";
import citasRoutes from "./routes/citasRoutes.js";
import clientesRoutes from "./routes/clientesRoutes.js";
import peluquerosRoutes from "./routes/peluquerosRoutes.js";
import especialidadesRoutes from "./routes/especialidadesRoutes.js"; 
import metodosPagoRoutes from "./routes/metodosPagoRoutes.js";
import estadosRoutes from "./routes/estadosRoutes.js";

// Configuración de dotenv (para leer el .env desde /backend aunque app.js esté en /src)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar con MySQL:", err.message);
  } else {
    console.log("✅ Conexión con MySQL exitosa!");
  }
});

// Rutas
app.use("/api/servicios", serviciosRoutes);
app.use("/api/peluqueros", peluquerosRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/citas", citasRoutes);
app.use("/api/especialidades", especialidadesRoutes);
app.use("/api/metodos-pago", metodosPagoRoutes);
app.use("/api/estados", estadosRoutes);

// Servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
