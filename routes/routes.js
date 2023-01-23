import express from "express";

import { getPollUnitResult, getLgaSummary, homePage } from "../controllers/polls.js";

const router = express.Router();


router.get("/", homePage);
router.get("/result/:id/lga", getLgaSummary);
router.get("/result/:id/polling_unit", getPollUnitResult);

export default router;