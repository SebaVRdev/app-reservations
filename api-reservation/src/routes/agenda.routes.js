import { Router } from "express";
import { getAgendas, getAgendasInDate, getAgendasInfo, newAgendaSave } from "../controllers/agenda.js";
import { verifyCourt, verifyExistAgenda } from "../middlewares/verifyDisponibility.js";

const router = Router();

router.get("/", getAgendas);
router.get("/info", getAgendasInfo);
router.get("/query/", getAgendasInDate);
router.post("/:idCourt", [verifyCourt, verifyExistAgenda] , newAgendaSave);

export default router;