import express from "express";
import cors from "cors";
import serviciosRoutes from "./routes/serviciosRoutes.js";
import citasRoutes from "./routes/citasRoutes.js";
import peluquerosRoutes from "./routes/peluquerosRoutes.js";
import especialidadesRoutes from "./routes/especialidadesRoutes.js";

const app = express();

app.use(cors());

// Middleware obligatorio para JSON
app.use(express.json());

// Rutas
app.use("/api/servicios", serviciosRoutes);
app.use("/api/peluqueros", peluquerosRoutes);
app.use("/api/citas", citasRoutes);
app.use("/api/especialidades", especialidadesRoutes);

app.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});
