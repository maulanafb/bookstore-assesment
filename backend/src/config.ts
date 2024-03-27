const dotenv = require("dotenv");

dotenv.config();
export const config = {
  port: 8000,
  JWT_SECRET: process.env.JWT_SECRET,
};
