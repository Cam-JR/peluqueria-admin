import express from "express";
import cors from "cors";
import serviciosRoutes from "./routes/serviciosRoutes.js";
import peluquerosRoutes from "./routes/peluquerosRoutes.js";
import citasRoutes from "./routes/citasRoutes.js";

const app = express();

app.use(cors());

// Middleware obligatorio para JSON
app.use(express.json());

app.use((req, res, next) => {
    console.log("Headers:", req.headers);
    console.log("Body recibido:", req.body);
    next();
});


app.use("/api/servicios", serviciosRoutes);
app.use("/api/peluqueros", peluquerosRoutes);
app.use("/api/citas", citasRoutes);

app.listen(5000, () => console.log("Servidor corriendo en puerto 5000"));
