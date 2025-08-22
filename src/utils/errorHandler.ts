import { Request, Response, NextFunction } from "express";
import logger from "./logger";

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`1Application error: ${error.message}`);
  res.status(400).json({ error: error.message });
};

export default errorHandler;
