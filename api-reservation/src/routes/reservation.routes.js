import { Router } from "express";
import { getReservations, setReservation } from "../controllers/reservation.js";
import { verifyDisponibility } from "../middlewares/verifyDisponibility.js";

const router = Router();

router.get("/", getReservations);
router.post("/:idAgenda", [verifyDisponibility] ,setReservation);

export default router;