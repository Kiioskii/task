import axios from "axios";

const URL = "https://api2.binance.com";

const bianceAPI = axios.create({
  url: URL,
  timeout: 5000,
});

export default bianceAPI;
