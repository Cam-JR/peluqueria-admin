// src/routes/peluquerosRoutes.js
import { Router } from "express";
import {
  getPeluqueros,
  createPeluquero,
  updatePeluquero,
  deletePeluquero
} from "../controllers/peluquerosController.js";

const router = Router();

router.get("/", getPeluqueros);
router.post("/", createPeluquero);
router.put("/:id", updatePeluquero);   // ✅ Update
router.delete("/:id", deletePeluquero); // ✅ Delete

export default router;
