import { ITrade } from "./../types/Trade";
import Trade from "../models/Trade";
import bianceAPI from "../config/biance";
import logger from "../utils/logger";

const saveData = async (symbol: string, trades: any): Promise<ITrade[]> => {
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

const getTrades = async (
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

const getTradesFromDB = async (symbol: string): Promise<ITrade> => {
  const response = await Trade.find({ symbol });
};
