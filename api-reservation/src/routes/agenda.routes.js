import { Router } from "express";
import { getAgendas, getAgendasInDate, getAgendasInfo, newAgenda } from "../controllers/agenda.js";
import { verifyDisponibility } from "../middlewares/verifyDisponibility.js";

const router = Router();

router.get("/", getAgendas);
router.get("/info", getAgendasInfo);
router.get("/query/", getAgendasInDate);
router.post("/:idCourt", [verifyDisponibility] ,newAgenda);

export default router;