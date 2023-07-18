// Centralizacion de todas las rutas para hacer el llamado desde aca
import { Router } from "express";
import reservationRoutes from "./reservation.routes.js";
import courtRoutes from "./court.routes.js";


const router = Router();

router.use("/reservation", reservationRoutes);
router.use("/cancha", courtRoutes);

export default router;