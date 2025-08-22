import express, { Application } from "express";
import dotenv from "dotenv";
import errorHandler from "./utils/errorHandler";
import connectDB from "./config/db";
import router from "./routes/tradeRoutes";
dotenv.config();

const app: Application = express();
app.use(express.json());

app.use("/", router);

app.use(errorHandler);

connectDB();

export default app;
