import mongoose from "mongoose";
import logger from "../utils/logger";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    logger.info("Connected to DB successfully");
  } catch (err: any) {
    logger.error(`Connection to DB: ${err.message}`);
  }
};

export default connectDB;
