import { Router } from "express";
import { getReservations } from "../controllers/reservation.js";

const router = Router();

router.get("/", getReservations);

export default router;