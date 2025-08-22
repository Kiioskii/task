import { Router } from "express";
import {
  analyzeTrades,
  checkSavedTrades,
  fetchTrades,
} from "../controllers/tradeControllers";
const router = Router();

router.post("/trades/fetch", fetchTrades);
router.get("/trades/analyze", analyzeTrades);
router.get("trades/database", checkSavedTrades);

export default router;
