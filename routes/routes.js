import express from "express";
import Prevention from "sqlstring";

import DB from "../database/connection.js";
import { getPoll } from "../controllers/polls.js";

const router = express.Router();

router.get("/", getPoll);

export default router;