import express from "express";
import { getMetodosPago } from "../controllers/metodosPagoController.js";

const router = express.Router();

router.get("/", getMetodosPago);

export default router;
