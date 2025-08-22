import express, { Application } from "express";
import dotenv from "dotenv";
import errorHandler from "./utils/errorHandler";
import connectDB from "./config/db";
dotenv.config();

const app: Application = express();
app.use(express.json());

app.use(errorHandler);

connectDB();

export default app;
