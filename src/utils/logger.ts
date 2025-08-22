import { createLogger, transports, format } from "winston";

//Function to create and saves logs
const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.simple()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "/logs/app.log" }),
  ],
});

export default logger;
