import express from "express";
import { 
    getEspecialidades, 
    getEspecialidadById, 
    createEspecialidad, 
    updateEspecialidad, 
    deleteEspecialidad 
} from "../controllers/especialidadesController.js";

const router = express.Router();

// Rutas
router.get("/", getEspecialidades);           // GET /especialidades
router.get("/:id", getEspecialidadById);     // GET /especialidades/:id
router.post("/", createEspecialidad);        // POST /especialidades
router.put("/:id", updateEspecialidad);      // PUT /especialidades/:id
router.delete("/:id", deleteEspecialidad);   // DELETE /especialidades/:id

export default router;
