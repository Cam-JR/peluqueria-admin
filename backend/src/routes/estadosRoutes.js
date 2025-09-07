import express from "express";
import { getEstados } from "../controllers/estadosController.js";

const router = express.Router();

router.get("/", getEstados);

export default router;
