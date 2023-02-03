import express from "express";

import { getPollUnitResult, getLgaSummary, homePage, getLga, storeResult } from "../controllers/polls.js";

const router = express.Router();


router.get("/", homePage);
router.get("/lga_info", getLga);
router.post("/create", storeResult);
router.post("/result/lga", getLgaSummary);
router.get("/result/:id/polling_unit", getPollUnitResult);

export default router;