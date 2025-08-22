import { NextFunction, Request, Response } from "express";

import {
  analyzeTradesService,
  getTrades,
  getTradesFromDB,
  saveData,
} from "../services/tradeServices";

export const fetchTrades = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { symbol, startTime, endTime } = req.params;
    if (!symbol) return res.status(400).json({ message: "Symbol is required" });
    const formattedStart = new Date(startTime).getTime();
    const formattedEnd = new Date(endTime).getTime();

    const response = await getTrades(symbol, formattedStart, formattedEnd);
    await saveData(symbol, response);
    res.json({ message: "Success" });
  } catch (err: any) {
    next(err);
  }
};

export const checkSavedTrades = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { symbol } = req.params;
    if (!symbol) return res.status(400).json({ message: "Symbol is required" });

    const response = await getTradesFromDB(symbol);
    res.json({ message: "Success", data: response });
  } catch (err: any) {
    next(err);
  }
};

// Controller to analyze trades
// Recife data through params
// Params: symbol, startTime, endTime
// startTime & endTime -> Recommended form "DD.MM.YYYY"
export const analyzeTrades = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { symbol, startTime, endTime } = req.params;
    if (!symbol) return res.status(400).json({ message: "Symbol is required" });
    const formattedStart = new Date(startTime).getTime();
    const formattedEnd = new Date(endTime).getTime();

    const response = await analyzeTradesService(
      symbol,
      formattedStart,
      formattedEnd
    );

    res.json(response);
  } catch (err: any) {
    next(err);
  }
};
