import mongoose, { Document, Schema } from "mongoose";
import { ITrade } from "../types/Trade";

export interface TradeDocument extends ITrade, Document {}
const TradeSchema: Schema<TradeDocument> = new Schema({
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  timestamp: { type: Date, required: true },
});

export default mongoose.model<TradeDocument>("Trade", TradeSchema);
