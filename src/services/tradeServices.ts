import { ITrade } from "./../types/Trade";
import Trade from "../models/Trade";
import bianceAPI from "../config/biance";
import logger from "../utils/logger";

// Service save given data to database
// @params symbol: string, trades: Array of trades from biance API
export const saveData = async (
  symbol: string,
  trades: any
): Promise<ITrade[]> => {
  const formData: ITrade[] = trades.map((t: any) => {
    return {
      symbol,
      price: parseFloat(t.price),
      quantity: parseInt(t.qty),
      timestamp: new Date(t.time),
    };
  });
  const response = await Trade.insertMany(formData);
  return response;
};

// Service return array od trades form Bianca api for given symbol
// @params symbol:string
export const getTrades = async (
  symbol: string,
  startTime: number,
  endTime: number
): Promise<void> => {
  try {
    const response = await bianceAPI.get("/", {
      params: { symbol, startTime, endTime },
    });
    return response.data;
  } catch (err: any) {
    logger.error(`Failed to fetch data: ${err.message}`);
    throw new Error("Bianca API error");
  }
};

// Service return saved trades in DB
// @params: symbol:string
export const getTradesFromDB = async (symbol: string): Promise<ITrade[]> => {
  const response = await Trade.find({ symbol }).sort({ timestamp: -1 }).lean();
  return response;
};

// Service to analyze trades
// @params symbol: string, startTime: number, endTime: number
// @return "increases" | "decreases" | "No data"
export const analyzeTradesService = async (
  symbol: string,
  startTime: number,
  endTime: number
) => {
  const startTrade = await Trade.findOne({ symbol, timestamp: startTime });
  const endTrade = await Trade.findOne({ symbol, timestamp: endTime });

  if (!startTrade || !endTrade) return "No data";
  if (endTrade.price > startTrade.price) return "increases";
  if (endTrade.price < startTrade.price) return "decreases";
};
