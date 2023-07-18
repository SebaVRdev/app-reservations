import { Router } from "express";
import { getAgendas, newAgenda } from "../controllers/agenda.js";

const router = Router();

router.get("/", getAgendas);
router.post("/:idCourt", newAgenda);

export default router;